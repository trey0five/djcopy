import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const services = [
  { name: 'Strategy', blurb: 'Pillars, voice, and the calendar your team can actually ship.' },
  { name: 'Content', blurb: 'Reels, captions, graphics. Written in your voice, not a template.' },
  { name: 'Community', blurb: 'DMs, comments, replies — handled with care, on brand, on time.' }
]

const process = [
  { step: 'Listen', blurb: 'Onboarding deep-dive + a week of audience research.' },
  { step: 'Write', blurb: 'Scripts, captions, and sequences mapped to each pillar.' },
  { step: 'Ship', blurb: 'Post cadence, stories, and replies run on a fixed loop.' },
  { step: 'Measure', blurb: 'Weekly report on reach, replies, and pipeline.' }
]

const panelStyle = {
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(8px)'
}

export default function Studio({ accent }) {
  const [tab, setTab] = useState(0)
  const [step, setStep] = useState(0)

  // Auto-advance the 4-beat loop every 3s so the section feels alive.
  // Manual clicks reset the timer and keep the cycle going from there.
  useEffect(() => {
    const id = setTimeout(() => setStep((s) => (s + 1) % process.length), 3000)
    return () => clearTimeout(id)
  }, [step])

  const Who = (
    <div className="rounded-2xl p-4 md:p-6 border border-black/10 h-full" style={panelStyle}>
      <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: accent }}>Who</div>
      <h3 className="font-display text-lg md:text-2xl font-bold mt-1.5 md:mt-2 leading-tight">
        Operators who have actually run social.
      </h3>
      <p className="text-xs md:text-sm opacity-85 mt-2 md:mt-3 leading-relaxed">
        A small studio — writers, editors, systems builders — embedded with your team. We plug in,
        learn your voice, and run the feed like it was ours.
      </p>
      <div className="mt-3 md:mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { n: '12+', l: 'Brands' },
          { n: '5yr', l: 'Avg tenure' },
          { n: '24h', l: 'Reply SLA' }
        ].map((s) => (
          <div key={s.l} className="rounded-lg p-1.5 md:p-2" style={{ background: 'rgba(0,0,0,0.08)' }}>
            <div className="font-display font-bold text-sm md:text-base">{s.n}</div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-70">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  )

  const What = (
    <div className="rounded-2xl p-4 md:p-6 border border-black/10 h-full" style={panelStyle}>
      <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: accent }}>What</div>
      <h3 className="font-display text-lg md:text-2xl font-bold mt-1.5 md:mt-2 leading-tight">
        Full-stack social.
      </h3>
      <div className="mt-2 md:mt-3 space-y-1.5 md:space-y-2">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
            whileHover={{ x: 4 }}
            className="rounded-lg p-2.5 md:p-3 cursor-default"
            style={{ background: 'rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              <div className="font-display font-bold text-sm md:text-base">{s.name}</div>
            </div>
            <div className="text-[11px] md:text-xs opacity-80 mt-0.5 md:mt-1">{s.blurb}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const How = (
    <div className="rounded-2xl p-4 md:p-6 border border-black/10 h-full" style={panelStyle}>
      <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: accent }}>How</div>
      <h3 className="font-display text-lg md:text-2xl font-bold mt-1.5 md:mt-2 leading-tight">
        A four-beat loop.
      </h3>
      <div className="mt-2 md:mt-3 flex items-center gap-1">
        {process.map((p, i) => (
          <button
            key={p.step}
            onClick={() => setStep(i)}
            className="relative flex-1 rounded-md px-1.5 md:px-2 py-1 md:py-1.5 text-[9px] md:text-[10px] font-semibold uppercase tracking-widest transition overflow-hidden"
            style={{
              background: step === i ? accent : 'rgba(0,0,0,0.08)',
              color: step === i ? '#ffffff' : 'inherit'
            }}
          >
            <span className="relative z-10">{i + 1}. {p.step}</span>
            {step === i && (
              <motion.span
                aria-hidden
                className="absolute bottom-0 left-0 h-0.5 bg-white/60"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-3 md:mt-4 rounded-lg p-3 md:p-4"
        style={{ background: 'rgba(0,0,0,0.08)' }}
      >
        <div className="font-display text-base md:text-lg font-bold">{process[step].step}</div>
        <div className="text-xs md:text-sm opacity-85 mt-1 md:mt-1.5 leading-relaxed">
          {process[step].blurb}
        </div>
      </motion.div>
      <div className="mt-2 md:mt-3 text-[9px] md:text-[10px] uppercase tracking-widest opacity-70">
        Repeats weekly · reported every Friday
      </div>
    </div>
  )

  const panels = [Who, What, How]
  const labels = ['Who', 'What', 'How']

  return (
    <div className="w-full h-full flex flex-col">
      {/* Mobile: tabs + single panel */}
      <div className="lg:hidden flex flex-col flex-1 min-h-0">
        <div
          className="relative inline-flex items-center self-start rounded-full p-1 mb-3"
          style={{ background: 'rgba(0,0,0,0.15)' }}
        >
          <motion.div
            layout
            className="absolute top-1 bottom-1 rounded-full"
            style={{ background: accent, width: 'calc(33.33% - 2px)', left: `calc(${tab * 33.33}% + 2px)` }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          />
          {labels.map((l, i) => (
            <button
              key={l}
              onClick={() => setTab(i)}
              className="relative z-10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: tab === i ? '#ffffff' : 'inherit' }}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {panels[tab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop: 3-up grid */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          {Who}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          {What}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          {How}
        </motion.div>
      </div>
    </div>
  )
}
