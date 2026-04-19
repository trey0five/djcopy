import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

// Placeholder numbers — swap with real client data once available.
const METRICS = [
  { label: 'Avg follower growth', value: 4.2, suffix: '×', prefix: '+', digits: 1 },
  { label: 'Engagement lift', value: 187, suffix: '%', prefix: '+' },
  { label: 'Pieces shipped / mo', value: 62, suffix: '' },
  { label: 'Reply time', value: 24, suffix: 'h', prefix: '<' },
  { label: 'Client retention', value: 92, suffix: '%' }
]

const TESTIMONIALS = [
  {
    quote:
      "They took over our feed in a week and we haven't touched it since. Reach tripled, DMs are qualified before they hit our inbox.",
    name: 'Aiden R.',
    role: 'High-Ticket Sales Coach'
  },
  {
    quote:
      "The weekly report alone is worth it. We finally know which content actually drives pipeline — no more posting into the void.",
    name: 'Melanie K.',
    role: 'Travel Creator'
  },
  {
    quote:
      "It sounds exactly like us. Nobody on my team can tell which captions were written by DJ Copy and which weren't.",
    name: 'Kishi M.',
    role: 'Kishigallery'
  }
]

// Fake weekly report bars — trending-up illusion for the mock chart.
const REPORT_WEEKS = [
  { label: 'Reach', values: [38, 52, 61, 74, 88] },
  { label: 'Replies', values: [12, 18, 24, 33, 41] },
  { label: 'Pipeline $', values: [22, 30, 44, 52, 68] }
]

export default function Results({ accent }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4, once: false })
  const [quoteIdx, setQuoteIdx] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(
      () => setQuoteIdx((i) => (i + 1) % TESTIMONIALS.length),
      5000
    )
    return () => clearInterval(id)
  }, [inView])

  return (
    <div ref={ref} className="w-full h-full flex flex-col gap-3 md:gap-5">
      {/* Metric counters */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
        {METRICS.map((m, i) => (
          <MetricTile key={m.label} metric={m} delay={0.1 + i * 0.08} accent={accent} inView={inView} />
        ))}
      </div>

      <div className="grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-3 md:gap-5 flex-1 min-h-0">
        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl p-4 md:p-6 border border-white/10 flex flex-col justify-between relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
        >
          <div
            aria-hidden
            className="absolute -top-16 -left-10 h-48 w-48 rounded-full blur-3xl opacity-30"
            style={{ background: accent }}
          />

          <div className="relative z-10 min-h-0">
            <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: accent }}>
              What clients say
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="mt-3 md:mt-4"
              >
                <div
                  className="font-display text-xl md:text-2xl lg:text-3xl font-semibold leading-tight"
                >
                  &ldquo;{TESTIMONIALS[quoteIdx].quote}&rdquo;
                </div>
                <div className="mt-3 md:mt-4 text-xs md:text-sm opacity-80">
                  <div className="font-semibold">{TESTIMONIALS[quoteIdx].name}</div>
                  <div className="opacity-70">{TESTIMONIALS[quoteIdx].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 mt-4 flex gap-1.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setQuoteIdx(i)}
                aria-label={`Quote ${i + 1}`}
                className="h-1 rounded-full transition-all"
                style={{
                  width: quoteIdx === i ? 28 : 10,
                  background: quoteIdx === i ? accent : 'rgba(255,255,255,0.3)'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Weekly report mock */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-2xl p-4 md:p-5 border border-white/10 relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
        >
          <div className="flex items-center justify-between">
            <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: accent }}>
              Weekly report
            </div>
            <div className="text-[10px] opacity-60 tracking-widest uppercase">Wk 1 → Wk 5</div>
          </div>

          <div className="mt-3 md:mt-4 space-y-3">
            {REPORT_WEEKS.map((row, ri) => (
              <div key={row.label}>
                <div className="flex items-baseline justify-between">
                  <div className="text-[11px] md:text-xs font-semibold opacity-90">
                    {row.label}
                  </div>
                  <div className="text-[11px] opacity-60 tabular-nums">
                    +{Math.round(((row.values[4] - row.values[0]) / row.values[0]) * 100)}%
                  </div>
                </div>
                <div className="mt-1.5 flex items-end gap-1 md:gap-1.5 h-10 md:h-12">
                  {row.values.map((v, vi) => (
                    <motion.div
                      key={vi}
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: v / 100 } : { scaleY: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.7 + ri * 0.12 + vi * 0.05,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="flex-1 rounded-sm origin-bottom"
                      style={{
                        background:
                          vi === row.values.length - 1
                            ? accent
                            : 'rgba(255,255,255,0.35)'
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 md:mt-4 text-[10px] uppercase tracking-widest opacity-70">
            Sent every Friday · reach · replies · revenue
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function MetricTile({ metric, delay, accent, inView }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) {
      setN(0)
      return
    }
    const t = setTimeout(() => {
      const start = performance.now()
      const duration = 1100
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration)
        setN(metric.value * easeOut(p))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay * 1000)
    return () => clearTimeout(t)
  }, [inView, delay, metric.value])

  const display = metric.digits
    ? n.toFixed(metric.digits)
    : Math.round(n).toLocaleString()

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/10 relative overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)' }}
    >
      <div
        aria-hidden
        className="absolute -top-10 -right-6 h-24 w-24 rounded-full blur-2xl opacity-30"
        style={{ background: accent }}
      />
      <div className="relative font-display text-2xl md:text-4xl font-bold tabular-nums" style={{ color: accent }}>
        {metric.prefix ?? ''}
        {display}
        {metric.suffix}
      </div>
      <div className="relative text-[10px] md:text-[11px] uppercase tracking-widest opacity-75 mt-1">
        {metric.label}
      </div>
    </motion.div>
  )
}

const easeOut = (t) => 1 - Math.pow(1 - t, 3)
