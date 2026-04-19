import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Email funnel viewer. Desktop uses a left sidebar; mobile switches to a
// horizontal pill selector so no sub-scrolling is needed.
export default function EmailFunnel({ data, accent }) {
  const emails = data.emails
  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    setTyped('')
    const target = emails[active].subject
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(target.slice(0, i))
      if (i >= target.length) clearInterval(id)
    }, 24)
    return () => clearInterval(id)
  }, [active, emails])

  return (
    <div className="h-full w-full flex flex-col md:flex-row text-white">
      {/* Mobile top pills */}
      <div className="md:hidden flex gap-2 px-3 pt-3 pb-2 border-b border-white/10 overflow-x-auto">
        {emails.map((e, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase"
            style={{
              background: active === i ? accent : 'rgba(255,255,255,0.1)',
              color: active === i ? '#0b0b10' : 'rgba(255,255,255,0.85)'
            }}
          >
            Email {i + 1}
          </button>
        ))}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[240px] shrink-0 border-r border-white/10 flex-col">
        <div className="px-5 py-4 border-b border-white/10">
          <div className="text-[10px] uppercase tracking-[0.25em] opacity-60">Campaign</div>
          <div className="font-display font-semibold mt-1 text-sm">Bootcamp Warmup</div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {emails.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-full text-left px-5 py-3 border-b border-white/5 transition ${
                active === i ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                <span className="text-[10px] opacity-60">Email {i + 1}</span>
              </div>
              <div className="text-xs mt-1 line-clamp-2 leading-snug">{e.subject}</div>
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.article
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="px-4 md:px-8 py-4 md:py-7"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] opacity-60">
              From {emails[active].signoff.split('\n')[1] ?? 'Aiden'} · Day {active + 1}
            </div>
            <h1 className="font-display text-lg md:text-2xl lg:text-3xl font-bold mt-1.5 md:mt-2 leading-tight min-h-[2em]">
              {typed}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] ml-1 align-middle"
                style={{ background: accent, height: '0.9em' }}
              />
            </h1>

            {emails[active].altSubjects?.length > 0 && (
              <div className="mt-2 md:mt-3 hidden md:flex flex-wrap gap-1.5">
                {emails[active].altSubjects.map((alt, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-full border border-white/15 opacity-70"
                  >
                    alt: {alt}
                  </span>
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-3 md:mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-3 md:p-5"
            >
              <div
                className="text-xs md:text-base font-display font-semibold leading-snug"
                style={{ color: accent }}
              >
                {emails[active].header}
              </div>
              <div className="mt-2 md:mt-3 whitespace-pre-line text-[11px] md:text-sm leading-relaxed opacity-90 line-clamp-[10] md:line-clamp-none">
                {emails[active].body}
              </div>
              <div className="mt-3 md:mt-4 flex items-center gap-2 md:gap-3 flex-wrap">
                <span
                  className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold text-[11px] md:text-xs"
                  style={{ background: accent, color: '#0b0b10' }}
                >
                  {emails[active].cta}
                </span>
                <span className="text-[10px] opacity-60 hidden md:inline">Tracked click-through</span>
              </div>
              <div className="mt-3 md:mt-5 whitespace-pre-line text-[10px] md:text-xs opacity-70 italic">
                {emails[active].signoff}
              </div>
            </motion.div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  )
}
