import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

// Splash: three roaming white lights. After ~2s each light converges on a
// letter path (D / J / C) and traces it, leaving a crisp stroke behind — the
// three letters interlock to form a DJC monogram.

// Coordinates are in a 540 × 220 "monogram viewBox" and mapped onto the
// canvas at runtime so the result scales to any screen.
const VB_W = 540
const VB_H = 220

const LETTERS = [
  {
    key: 'D',
    paths: ['M 70 30 L 70 190 L 140 190 C 190 190 210 165 210 110 C 210 55 190 30 140 30 Z']
  },
  {
    key: 'J',
    // Two sub-paths so the light can teleport between the top bar and the
    // vertical body (the transit between them is drawn invisibly).
    paths: [
      'M 230 30 L 350 30',
      'M 290 30 L 290 150 C 290 185 252 195 230 170'
    ]
  },
  {
    key: 'C',
    paths: ['M 520 58 C 500 32 465 18 428 18 C 378 18 362 58 362 110 C 362 162 378 202 428 202 C 465 202 500 188 520 162']
  }
]

// Phase timings (ms from mount).
const T_ROAM_END = 2000
const T_TRANSIT_END = 2900
const T_TRACE_END = 5100
const T_SKIP = 5900

const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
]

function samplePath(d, stepPx = 1.5) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  el.setAttribute('d', d)
  const total = el.getTotalLength()
  const N = Math.max(60, Math.floor(total / stepPx))
  const pts = []
  for (let i = 0; i <= N; i++) {
    const p = el.getPointAtLength((i / N) * total)
    pts.push({ x: p.x, y: p.y })
  }
  return { points: pts, length: total }
}

function turn(s) {
  const choices = DIRS.filter(
    ([dx, dy]) => !(dx === s.dx && dy === s.dy) && !(dx === -s.dx && dy === -s.dy)
  )
  const [dx, dy] = choices[Math.floor(Math.random() * choices.length)]
  s.dx = dx
  s.dy = dy
  s.nextTurn = 30 + Math.random() * 110
}

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

export default function Splash({ onDone }) {
  const canvasRef = useRef(null)
  const [visible, setVisible] = useState(true)
  const skip = useCallback(() => setVisible(false), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let w = 0
    let h = 0
    let scale = 1
    let offsetX = 0
    let offsetY = 0
    let lights = []
    let startAt = performance.now()

    // Pre-sample letter paths (in viewBox coords).
    const letters = LETTERS.map((l) => {
      const subs = l.paths.map((d) => samplePath(d))
      const totalLen = subs.reduce((a, s) => a + s.length, 0)
      return { key: l.key, subs, totalLen }
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Fit monogram to ~72% of viewport width (or full height, whichever
      // comes first).
      const targetW = Math.min(w * 0.78, 680)
      const targetH = targetW * (VB_H / VB_W)
      const maxH = h * 0.5
      if (targetH > maxH) {
        const adjustedH = maxH
        const adjustedW = adjustedH * (VB_W / VB_H)
        scale = adjustedW / VB_W
        offsetX = (w - adjustedW) / 2
        offsetY = (h - adjustedH) / 2
      } else {
        scale = targetW / VB_W
        offsetX = (w - targetW) / 2
        offsetY = (h - targetH) / 2
      }

      // Reset canvas to black so the fade layer starts clean.
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)

      // Seed 3 lights, one per letter.
      lights = letters.map((letter) => {
        const [dx, dy] = DIRS[Math.floor(Math.random() * DIRS.length)]
        return {
          letter,
          x: Math.random() * w,
          y: Math.random() * h,
          dx,
          dy,
          speed: 2.4 + Math.random() * 1.4,
          nextTurn: 20 + Math.random() * 80,
          // captured when roam phase ends
          roamEndX: 0,
          roamEndY: 0,
          // trace progress
          currentSub: -1,
          prevDrawX: 0,
          prevDrawY: 0
        }
      })
    }
    resize()
    window.addEventListener('resize', resize)

    const map = (vx, vy) => ({
      x: offsetX + vx * scale,
      y: offsetY + vy * scale
    })

    const draw = (now) => {
      const t = now - startAt

      // Phase-dependent fade.
      let fade
      if (t < T_ROAM_END) fade = 0.11
      else if (t < T_TRANSIT_END) fade = 0.32
      else fade = 0
      if (fade > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${fade})`
        ctx.fillRect(0, 0, w, h)
      }

      for (const s of lights) {
        if (t < T_ROAM_END) {
          // Roam: snake-style 90° movement with occasional turns.
          const prevX = s.x
          const prevY = s.y
          s.x += s.dx * s.speed
          s.y += s.dy * s.speed

          let wrapped = false
          if (s.x < -2) { s.x = w + 2; wrapped = true }
          else if (s.x > w + 2) { s.x = -2; wrapped = true }
          if (s.y < -2) { s.y = h + 2; wrapped = true }
          else if (s.y > h + 2) { s.y = -2; wrapped = true }

          if (!wrapped) {
            strokeLine(ctx, prevX, prevY, s.x, s.y, 2, 'rgba(255,255,255,0.9)')
          }

          s.nextTurn -= 1
          if (s.nextTurn <= 0) turn(s)
        } else if (t < T_TRANSIT_END) {
          // Transit: smoothly home to the letter's first sample point.
          if (s.roamEndX === 0 && s.roamEndY === 0) {
            s.roamEndX = s.x
            s.roamEndY = s.y
          }
          const k = easeInOut((t - T_ROAM_END) / (T_TRANSIT_END - T_ROAM_END))
          const startPt = map(s.letter.subs[0].points[0].x, s.letter.subs[0].points[0].y)
          s.x = s.roamEndX + (startPt.x - s.roamEndX) * k
          s.y = s.roamEndY + (startPt.y - s.roamEndY) * k
          // No stroke during transit; the glow below marks the head.
        } else if (t < T_TRACE_END) {
          // Trace: walk the letter's sub-paths in order, drawing segments.
          const k = easeInOut((t - T_TRANSIT_END) / (T_TRACE_END - T_TRANSIT_END))
          const pos = k * s.letter.totalLen

          // Figure out which sub-path + local progress.
          let remaining = pos
          let subIdx = 0
          for (; subIdx < s.letter.subs.length - 1; subIdx++) {
            if (remaining <= s.letter.subs[subIdx].length) break
            remaining -= s.letter.subs[subIdx].length
          }
          const sub = s.letter.subs[subIdx]
          const localT = Math.min(1, remaining / sub.length)
          const idx = Math.min(sub.points.length - 1, Math.floor(localT * (sub.points.length - 1)))
          const vp = sub.points[idx]
          const pt = map(vp.x, vp.y)

          if (s.currentSub !== subIdx) {
            // First point of this sub-path: no stroke (avoids a line across
            // the monogram when jumping between J's bar and body).
            s.currentSub = subIdx
            s.prevDrawX = pt.x
            s.prevDrawY = pt.y
          } else {
            strokeLine(ctx, s.prevDrawX, s.prevDrawY, pt.x, pt.y, 4, 'rgba(255,255,255,1)')
            s.prevDrawX = pt.x
            s.prevDrawY = pt.y
          }
          s.x = pt.x
          s.y = pt.y
        }

        // Glowing head overlay — visible in every phase.
        drawHead(ctx, s.x, s.y, t)
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    const auto = setTimeout(skip, T_SKIP)
    const onKey = () => skip()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(auto)
      window.removeEventListener('keydown', onKey)
    }
  }, [skip])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          onClick={skip}
          className="fixed inset-0 z-[200] bg-black cursor-pointer select-none"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: (T_SKIP - 1400) / 1000 }}
            className="absolute bottom-6 inset-x-0 text-center text-[10px] tracking-[0.4em] uppercase text-white/50"
          >
            Tap to enter
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function strokeLine(ctx, x0, y0, x1, y1, width, color) {
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.stroke()
}

function drawHead(ctx, x, y, t) {
  // Additive glow at the head so the lights read as points of light, not
  // just thin lines.
  const pulse = 0.7 + 0.3 * Math.sin(t / 140)
  const r = 14 * pulse
  const prev = ctx.globalCompositeOperation
  ctx.globalCompositeOperation = 'lighter'
  const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
  grad.addColorStop(0, 'rgba(255,255,255,0.95)')
  grad.addColorStop(0.3, 'rgba(255,255,255,0.5)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalCompositeOperation = prev
}
