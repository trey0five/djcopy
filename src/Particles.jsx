import { useEffect, useRef } from 'react'

// Lightweight canvas particle systems. One component, many flavors.
// type: 'bubbles' | 'confetti' | 'network' | 'sparks' | 'grid'
export default function Particles({ type = 'bubbles', color = '#ffffff', active = true }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Seed particles per type
    const seed = () => {
      particles = []
      if (type === 'bubbles') {
        const n = 36
        for (let i = 0; i < n; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: 6 + Math.random() * 40,
            vy: -(0.15 + Math.random() * 0.6),
            vx: (Math.random() - 0.5) * 0.3,
            a: 0.08 + Math.random() * 0.25
          })
        }
      } else if (type === 'confetti') {
        const n = 70
        for (let i = 0; i < n; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            s: 6 + Math.random() * 8,
            rot: Math.random() * Math.PI,
            vrot: (Math.random() - 0.5) * 0.08,
            vx: (Math.random() - 0.5) * 0.6,
            vy: -(0.3 + Math.random() * 0.9),
            hue: Math.floor(Math.random() * 360),
            a: 0.65 + Math.random() * 0.3
          })
        }
      } else if (type === 'network') {
        const n = 42
        for (let i = 0; i < n; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: 1.5 + Math.random() * 1.5
          })
        }
      } else if (type === 'sparks') {
        const n = 90
        for (let i = 0; i < n; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vy: -(0.6 + Math.random() * 1.8),
            r: 0.6 + Math.random() * 1.8,
            life: Math.random(),
            decay: 0.002 + Math.random() * 0.006
          })
        }
      } else if (type === 'grid') {
        const gap = 44
        for (let y = gap / 2; y < h; y += gap) {
          for (let x = gap / 2; x < w; x += gap) {
            particles.push({
              x, y,
              ox: x, oy: y,
              phase: Math.random() * Math.PI * 2,
              speed: 0.6 + Math.random() * 0.9
            })
          }
        }
      }
    }
    seed()

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)

      if (type === 'bubbles') {
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          if (p.y + p.r < 0) { p.y = h + p.r; p.x = Math.random() * w }
          if (p.x < -p.r) p.x = w + p.r
          if (p.x > w + p.r) p.x = -p.r
          ctx.beginPath()
          ctx.fillStyle = hexA(color, p.a)
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        }
      } else if (type === 'confetti') {
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          p.rot += p.vrot
          if (p.y + p.s < 0) { p.y = h + p.s; p.x = Math.random() * w }
          if (p.x < -p.s) p.x = w + p.s
          if (p.x > w + p.s) p.x = -p.s
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.a})`
          ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2)
          ctx.restore()
        }
      } else if (type === 'network') {
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
        // lines between nearby particles
        ctx.lineWidth = 1
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i]
            const b = particles[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const d2 = dx * dx + dy * dy
            if (d2 < 140 * 140) {
              const alpha = 0.35 * (1 - d2 / (140 * 140))
              ctx.strokeStyle = hexA(color, alpha)
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }
        for (const p of particles) {
          ctx.beginPath()
          ctx.fillStyle = hexA(color, 0.85)
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        }
      } else if (type === 'sparks') {
        for (const p of particles) {
          p.y += p.vy
          p.life -= p.decay
          if (p.life <= 0 || p.y < -5) {
            p.x = Math.random() * w
            p.y = h + Math.random() * 40
            p.life = 1
          }
          ctx.beginPath()
          ctx.fillStyle = hexA(color, 0.9 * p.life)
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
          // trail
          ctx.strokeStyle = hexA(color, 0.25 * p.life)
          ctx.lineWidth = p.r
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x, p.y + 10)
          ctx.stroke()
        }
      } else if (type === 'grid') {
        const time = t * 0.001
        for (const p of particles) {
          const pulse = (Math.sin(time * p.speed + p.phase) + 1) / 2
          const r = 1 + pulse * 3
          ctx.beginPath()
          ctx.fillStyle = hexA(color, 0.2 + pulse * 0.5)
          ctx.arc(p.ox, p.oy, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }
    if (active) raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [type, color, active])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: type === 'network' ? 'screen' : 'normal' }}
    />
  )
}

function hexA(hex, a) {
  // accept #RRGGBB or rgb strings; fall back to white
  if (hex?.startsWith('#') && hex.length === 7) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return `rgba(255,255,255,${a})`
}
