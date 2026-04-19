import { useEffect, useState } from 'react'
import { sections } from './sections'

export default function Nav({ containerRef }) {
  const [active, setActive] = useState(0)

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

  const go = (i) => {
    const el = containerRef.current
    if (!el) return
    el.scrollTo({ top: i * el.clientHeight, behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-10 py-3 md:py-5 mix-blend-difference text-white pointer-events-none">
        <div className="font-display font-bold tracking-[0.25em] text-xs md:text-sm pointer-events-auto">
          DJ·COPY
        </div>
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
        <div className="md:hidden text-[10px] tracking-[0.25em] opacity-70 pointer-events-auto">
          {String(active + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
        </div>
      </header>

      {/* Dot rail — desktop only */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
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

      {/* Bottom dot rail — mobile only */}
      <div className="fixed bottom-3 inset-x-0 z-50 flex md:hidden justify-center gap-1.5 pointer-events-none">
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
    </>
  )
}
