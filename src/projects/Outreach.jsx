import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Two-email outreach sequence. Desktop: both visible side by side.
// Mobile: one visible at a time with a pill toggle.
export default function Outreach({ data, accent }) {
  const [tick, setTick] = useState(0)
  const [mobileActive, setMobileActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-full w-full flex flex-col text-white">
      {/* Mobile toggle */}
      <div className="md:hidden flex gap-2 px-3 pt-3 pb-2">
        {data.emails.map((e, i) => (
          <button
            key={e.label}
            onClick={() => setMobileActive(i)}
            className="flex-1 rounded-full px-2 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase"
            style={{
              background: mobileActive === i ? accent : 'rgba(255,255,255,0.1)',
              color: mobileActive === i ? '#0b0b10' : 'rgba(255,255,255,0.85)'
            }}
          >
            {i === 0 ? 'Initial' : 'Follow-up'}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Mobile: single card */}
        <div className="md:hidden p-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileActive}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EmailCard email={data.emails[mobileActive]} accent={accent} tick={tick} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop: side by side, equal height */}
        <div className="hidden md:grid md:grid-cols-2 gap-5 p-6 md:p-8 items-stretch">
          {data.emails.map((e, i) => (
            <motion.div
              key={e.label}
              initial={{ opacity: 0, y: 30, rotate: i === 0 ? -1 : 1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="h-full"
            >
              <EmailCard email={e} accent={accent} tick={tick} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EmailCard({ email: e, accent, tick }) {
  const subjectIdx = tick % e.subjects.length
  return (
    <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden flex flex-col">
      <div
        className="px-3 md:px-4 py-2 md:py-2.5 text-[10px] tracking-[0.25em] uppercase font-semibold shrink-0"
        style={{
          background: `linear-gradient(90deg, ${accent}33, transparent)`,
          color: accent
        }}
      >
        {e.label}
      </div>

      <div className="p-3 md:p-5 flex-1 flex flex-col min-h-0">
        {/* Subject block — fixed-ish height so both cards align */}
        <div className="shrink-0">
          <div className="text-[10px] opacity-60">Subject</div>
          <motion.div
            key={subjectIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="font-display text-xs md:text-base font-semibold mt-1 min-h-[2.5em] leading-snug line-clamp-2"
          >
            {e.subjects[subjectIdx]}
          </motion.div>

          <div className="mt-2 md:mt-3 flex flex-wrap gap-1">
            {e.subjects.map((_, si) => (
              <span
                key={si}
                className="h-1 rounded-full transition-all"
                style={{
                  width: subjectIdx === si ? 18 : 6,
                  background: subjectIdx === si ? accent : 'rgba(255,255,255,0.2)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Header — two-line clamp so both cards' headers occupy same rows */}
        <div
          className="mt-3 md:mt-4 font-display font-semibold text-xs md:text-sm leading-snug min-h-[2.5em] line-clamp-2 shrink-0"
          style={{ color: accent }}
        >
          {e.header}
        </div>

        {/* Body — fills the remaining space with identical clamp on both */}
        <div className="mt-1.5 md:mt-2 text-[11px] md:text-xs whitespace-pre-line opacity-90 leading-relaxed flex-1 min-h-0 overflow-hidden line-clamp-[8] md:line-clamp-[10]">
          {e.body}
        </div>

        {/* Footer — fixed at bottom */}
        <div className="mt-2.5 md:mt-4 shrink-0">
          <div
            className="inline-flex px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-[11px] md:text-xs font-semibold max-w-full"
            style={{ background: accent, color: '#0b0b10' }}
          >
            <span className="truncate">{e.cta}</span>
          </div>
          <div className="text-[10px] opacity-60 mt-1 md:mt-1.5 hidden md:block min-h-[1.2em] line-clamp-1">
            {e.ctaSub}
          </div>
        </div>

        <div className="mt-2 md:mt-3 whitespace-pre-line text-[10px] md:text-[11px] italic opacity-70 min-h-[2.4em] line-clamp-2 shrink-0">
          {e.signoff}
        </div>
      </div>
    </div>
  )
}
