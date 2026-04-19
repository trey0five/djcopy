import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

// Intro splash: logo pops in at center, pauses, then explodes into a cloud
// of engagement emoji flying outward — a quick visual "this is a social
// studio" before the site appears behind it.

const EMOJI = ['❤️', '👍', '💬', '✨', '🔥', '💯', '😍', '⭐', '🚀', '📈']
const PARTICLES = 44

// Skip after this long even if animation hangs. Tap also skips.
const AUTO_DISMISS_MS = 4000
const EXPLOSION_AT_MS = 1900

export default function Splash({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [exploded, setExploded] = useState(false)

  // Pre-compute particle end vectors so they don't re-randomise on re-render
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLES }).map((_, i) => {
      const baseAngle = (i / PARTICLES) * Math.PI * 2
      const jitter = (Math.random() - 0.5) * ((Math.PI * 2) / PARTICLES) * 0.8
      const angle = baseAngle + jitter
      const distance = 360 + Math.random() * 340
      return {
        emoji: EMOJI[Math.floor(Math.random() * EMOJI.length)],
        endX: Math.cos(angle) * distance,
        endY: Math.sin(angle) * distance,
        size: 22 + Math.random() * 32,
        delay: Math.random() * 0.22,
        rot: (Math.random() - 0.5) * 520,
        duration: 1.2 + Math.random() * 0.7
      }
    })
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setExploded(true), EXPLOSION_AT_MS)
    const t2 = setTimeout(() => setVisible(false), AUTO_DISMISS_MS)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[200] grid place-items-center cursor-pointer select-none overflow-hidden"
          style={{
            // Same gradient family as the hero section so the splash feels
            // like the site's own intro, not a separate screen.
            background:
              'linear-gradient(135deg, #FF5EEB 0%, #7C3AED 45%, #0EA5E9 100%)'
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onClick={() => setVisible(false)}
        >
          {/* Soft radial backdrop behind the logo — expands out as the
              explosion fires to feel like a shockwave. */}
          <motion.div
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 600,
              height: 600,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)'
            }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={
              exploded
                ? { scale: 2.4, opacity: [0.6, 0] }
                : { scale: 1, opacity: 0.5 }
            }
            transition={{ duration: exploded ? 1.1 : 0.7, ease: 'easeOut' }}
          />

          {/* Logo */}
          <motion.img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="DJ Copy"
            className="relative z-10 w-[min(82vw,640px)] h-auto block"
            style={{ filter: 'drop-shadow(0 20px 60px rgba(255,255,255,0.15))' }}
            initial={{ scale: 0, rotate: -8, opacity: 0 }}
            animate={
              exploded
                ? { scale: 1.22, opacity: 0, rotate: 0 }
                : { scale: 1, rotate: 0, opacity: 1 }
            }
            transition={
              exploded
                ? {
                    scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.7, delay: 0.15 }
                  }
                : {
                    scale: { type: 'spring', stiffness: 170, damping: 13 },
                    opacity: { duration: 0.35 },
                    rotate: { type: 'spring', stiffness: 170, damping: 13 }
                  }
            }
          />

          {/* Emoji particles — only mount when explosion fires */}
          {exploded &&
            particles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ fontSize: p.size, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  x: p.endX,
                  y: p.endY,
                  opacity: [0, 1, 1, 0],
                  scale: [0.3, 1.3, 1, 0.5],
                  rotate: p.rot
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: [0.2, 0.7, 0.3, 1],
                  times: [0, 0.18, 0.72, 1]
                }}
              >
                {p.emoji}
              </motion.div>
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
