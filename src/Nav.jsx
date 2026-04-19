import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sections } from './sections'

export default function Nav({ containerRef }) {
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / el.clientHeight)
      setActive(idx)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [containerRef])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const go = (i) => {
    const el = containerRef.current
    if (!el) return
    el.scrollTo({ top: i * el.clientHeight, behavior: 'smooth' })
  }

  const pick = (i) => {
    setMenuOpen(false)
    // Slight delay so the menu exit doesn't collide with the scroll animation.
    setTimeout(() => go(i), 120)
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-10 py-3 md:py-5 mix-blend-difference text-white pointer-events-none">
        <div className="font-display font-bold tracking-[0.25em] text-xs md:text-sm pointer-events-auto">
          DJ·COPY
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs tracking-[0.2em] uppercase pointer-events-auto">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              className={`transition-opacity ${active === i ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger — opted out of the header's mix-blend-difference
            so it stays legible against any section's gradient. */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="md:hidden pointer-events-auto flex flex-col gap-[5px] items-center justify-center h-10 w-10 rounded-full bg-black/55 backdrop-blur-sm border border-white/15 shadow-lg"
          style={{ mixBlendMode: 'normal' }}
        >
          <span className="h-[2px] w-5 bg-white rounded-full" />
          <span className="h-[2px] w-5 bg-white rounded-full" />
          <span className="h-[2px] w-5 bg-white rounded-full" />
        </button>
      </header>

      {/* Desktop dot rail */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {sections.map((s, i) => (
          <button
            key={s.id}
            aria-label={s.label}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              active === i ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Mobile bottom dot rail */}
      <div className="fixed bottom-3 inset-x-0 z-40 flex md:hidden justify-center gap-1.5 pointer-events-none">
        {sections.map((s, i) => (
          <button
            key={s.id}
            aria-label={s.label}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-500 pointer-events-auto ${
              active === i ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div className="font-display font-bold tracking-[0.25em] text-xs text-white">
                DJ·COPY
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="p-2 -mr-2 text-white"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="5" y1="5" x2="17" y2="17" />
                  <line x1="17" y1="5" x2="5" y2="17" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 min-h-0 overflow-y-auto px-6 pt-4 pb-10">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => pick(i)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.035 }}
                  className="w-full text-left py-3 border-b border-white/10 flex items-baseline gap-4"
                >
                  <span className="text-[10px] tracking-[0.3em] uppercase opacity-50 w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display text-3xl font-bold leading-none transition-opacity ${
                      active === i ? 'text-white opacity-100' : 'text-white opacity-70'
                    }`}
                  >
                    {s.label}
                  </span>
                  {active === i && (
                    <span className="ml-auto text-[10px] tracking-[0.3em] uppercase opacity-70">
                      Here
                    </span>
                  )}
                </motion.button>
              ))}
            </nav>

            <div className="px-6 pb-6 text-[10px] tracking-[0.3em] uppercase opacity-50 text-white">
              Tap to jump
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
