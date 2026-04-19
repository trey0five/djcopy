import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function LeadConversion({ data, accent }) {
  const { core, options } = data
  const [active, setActive] = useState(0)
  const opt = options[active]

  return (
    <div className="h-full w-full overflow-y-auto p-3 md:p-8 text-white">
      {/* Core pillars */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        {core.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 + i * 0.06 }}
            whileHover={{ y: -4 }}
            className="rounded-lg md:rounded-xl border border-white/10 bg-white/[0.04] p-2.5 md:p-4"
          >
            <div
              className="h-6 w-6 md:h-7 md:w-7 rounded-md md:rounded-lg grid place-items-center text-[10px] md:text-[11px] font-bold"
              style={{ background: accent, color: '#0b0b10' }}
            >
              {i + 1}
            </div>
            <div className="font-display font-semibold mt-1.5 md:mt-2 text-xs md:text-sm leading-tight">{c.title}</div>
            <div className="text-[10px] md:text-[11px] opacity-70 mt-1 md:mt-1.5 leading-relaxed">{c.copy}</div>
          </motion.div>
        ))}
      </div>

      {/* Toggle */}
      <div className="mt-4 md:mt-5 flex items-center justify-center">
        <div
          className="relative inline-flex items-center rounded-full p-1"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            layout
            className="absolute top-1 bottom-1 rounded-full"
            style={{
              background: accent,
              left: active === 0 ? 4 : '50%',
              right: active === 1 ? 4 : '50%'
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          />
          {options.map((o, i) => (
            <button
              key={o.label}
              onClick={() => setActive(i)}
              className="relative z-10 px-3 md:px-5 py-1.5 md:py-2 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
              style={{ color: active === i ? '#0b0b10' : 'rgba(255,255,255,0.8)' }}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Option detail */}
      <div className="mt-3 md:mt-5 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            exit={{ clipPath: 'inset(0 0 0 100%)', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            className="relative rounded-xl md:rounded-2xl p-4 md:p-7 overflow-hidden border"
            style={{
              borderColor: `${accent}44`,
              background: `linear-gradient(160deg, ${accent}14, transparent)`
            }}
          >
            <div
              aria-hidden
              className="absolute -top-16 -right-10 h-48 w-48 rounded-full blur-3xl opacity-40"
              style={{ background: accent }}
            />
            <div
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: accent }}
            >
              {opt.label}
            </div>
            <h3 className="font-display text-base md:text-2xl font-bold mt-1 leading-tight">{opt.name}</h3>
            <div className="text-[11px] md:text-xs opacity-70 mt-1">{opt.best}</div>

            <div className="mt-3 md:mt-4 grid md:grid-cols-2 gap-1.5 md:gap-2">
              {opt.includes.map((inc, si) => (
                <motion.div
                  key={si}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + si * 0.05 }}
                  className="flex gap-2 text-[11px] md:text-xs"
                >
                  <span
                    className="mt-1 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ background: accent }}
                  />
                  <span className="opacity-90 leading-snug">{inc}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-3 md:mt-4 flex flex-wrap gap-1.5">
              {opt.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: `${accent}22`, color: accent }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
