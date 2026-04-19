import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

// Flowchart. Desktop: 4 columns, hover to focus, click to replay.
// Mobile: pill selector + single lane visible.
export default function FollowUpSystem({ data, accent }) {
  const flows = data.flows
  const [hovered, setHovered] = useState(null)
  const [mobileIdx, setMobileIdx] = useState(0)
  const [nonces, setNonces] = useState(() => flows.map(() => 0))
  const bumpLane = (i) =>
    setNonces((prev) => prev.map((n, idx) => (idx === i ? n + 1 : n)))
  const bumpAll = () => setNonces((prev) => prev.map((n) => n + 1))

  // Hold animations until the section actually enters the viewport, so the
  // cascade runs fresh each time the user scrolls onto page 4.
  const viewRef = useRef(null)
  const inView = useInView(viewRef, { amount: 0.4 })

  return (
    <div ref={viewRef} className="h-full w-full flex flex-col text-white">
      {/* Mobile lane pills — 2x2 so all four stay visible */}
      <div className="md:hidden grid grid-cols-2 gap-1.5 px-3 pt-3 pb-2">
        {flows.map((f, i) => (
          <button
            key={f.title}
            onClick={() => setMobileIdx(i)}
            className="rounded-full px-2 py-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase leading-tight"
            style={{
              background: mobileIdx === i ? accent : 'rgba(255,255,255,0.1)',
              color: mobileIdx === i ? '#0b0b10' : 'rgba(255,255,255,0.85)'
            }}
          >
            {f.title}
          </button>
        ))}
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex items-center justify-between px-6 md:px-8 pt-4">
        <div className="text-[10px] tracking-[0.3em] uppercase opacity-60">
          Hover a lane · click to replay that lane
        </div>
        <button
          onClick={bumpAll}
          className="text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition"
        >
          ↻ Replay all
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-3 md:p-6">
        {/* Mobile: single lane */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${mobileIdx}-${nonces[mobileIdx]}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Lane flow={flows[mobileIdx]} accent={accent} nonce={nonces[mobileIdx]} delayBase={0} play={inView} />
            </motion.div>
          </AnimatePresence>
          <button
            onClick={() => bumpLane(mobileIdx)}
            className="mt-3 text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border border-white/20"
          >
            ↻ Replay lane
          </button>
        </div>

        {/* Desktop: 4 lanes */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {flows.map((flow, fi) => {
            const dim = hovered !== null && hovered !== fi
            return (
              <motion.div
                key={flow.title}
                onMouseEnter={() => setHovered(fi)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => bumpLane(fi)}
                animate={{ opacity: dim ? 0.35 : 1, scale: hovered === fi ? 1.02 : 1 }}
                transition={{ duration: 0.3 }}
                className="relative cursor-pointer"
              >
                <Lane flow={flow} accent={accent} nonce={nonces[fi]} delayBase={fi * 1.7} play={inView} />
                <motion.div
                  aria-hidden
                  className="absolute -inset-2 rounded-xl blur-2xl opacity-0 pointer-events-none -z-10"
                  style={{ background: accent }}
                  animate={{ opacity: hovered === fi ? 0.25 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Lane({ flow, accent, nonce, delayBase, play }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 relative overflow-hidden">
      {/* Lane header — fades in once the lane's turn arrives */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: play ? 1 : 0 }}
        transition={{ duration: 0.4, delay: play ? delayBase : 0 }}
      >
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase opacity-70">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          {flow.kind}
        </div>
        <h3
          className="font-display text-base md:text-lg font-bold mt-1.5"
          style={{ color: accent }}
        >
          {flow.title}
        </h3>
        <p className="text-[11px] opacity-70 mt-0.5">{flow.trigger}</p>
      </motion.div>

      <div className="mt-3 md:mt-4 space-y-0">
        {flow.steps.map((step, si) => (
          <Node
            key={`${nonce}-${si}`}
            step={step}
            index={si}
            total={flow.steps.length}
            delay={delayBase + 0.35 + si * 0.28}
            accent={accent}
            play={play}
          />
        ))}
      </div>
    </div>
  )
}

// Per-node entrance: blurred text slide + dot scale with overshoot +
// expanding pulse ring + gradient connector with a traveling light pulse.
// All animations are gated on `play` so they only fire once the section
// enters the viewport.
function Node({ step, index, total, delay, accent, play }) {
  const NODE_DUR = 0.7
  const CONNECT_DELAY = 0.35
  const CONNECT_DUR = 0.45
  const PULSE_DELAY = 0.25

  return (
    <motion.div
      initial={{ opacity: 0, x: -18, filter: 'blur(6px)' }}
      animate={
        play
          ? { opacity: 1, x: 0, filter: 'blur(0px)' }
          : { opacity: 0, x: -18, filter: 'blur(6px)' }
      }
      transition={{
        duration: play ? NODE_DUR : 0.25,
        delay: play ? delay : 0,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative flex gap-2.5 py-1.5"
    >
      <div className="relative flex flex-col items-center" style={{ width: 12 }}>
        {/* Pulse ring */}
        <motion.span
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full"
          style={{ border: `2px solid ${accent}` }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={
            play
              ? { scale: [0.6, 2.8, 3.2], opacity: [0, 0.6, 0] }
              : { scale: 0.6, opacity: 0 }
          }
          transition={{
            duration: play ? 1.1 : 0.2,
            delay: play ? delay + PULSE_DELAY : 0,
            ease: 'easeOut'
          }}
        />
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={play ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
          transition={
            play
              ? { type: 'spring', stiffness: 230, damping: 13, delay: delay + 0.1 }
              : { duration: 0.2 }
          }
          className="relative z-10 h-3 w-3 rounded-full border-2"
          style={{
            borderColor: accent,
            background: `${accent}55`,
            boxShadow: `0 0 10px ${accent}aa, 0 0 2px ${accent}`
          }}
        />
        {/* Connector */}
        {index < total - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: play ? 1 : 0 }}
            transition={{
              duration: play ? CONNECT_DUR : 0.2,
              delay: play ? delay + CONNECT_DELAY : 0,
              ease: [0.65, 0, 0.35, 1]
            }}
            className="relative w-px flex-1 origin-top"
            style={{
              background: `linear-gradient(to bottom, ${accent}, ${accent}22)`,
              minHeight: 20,
              boxShadow: `0 0 6px ${accent}66`
            }}
          >
            {/* Traveling light */}
            <motion.span
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: 6,
                height: 6,
                background: accent,
                boxShadow: `0 0 10px ${accent}, 0 0 20px ${accent}88`
              }}
              initial={{ top: '-4px', opacity: 0 }}
              animate={
                play
                  ? { top: ['-4px', '100%'], opacity: [0, 1, 1, 0] }
                  : { top: '-4px', opacity: 0 }
              }
              transition={
                play
                  ? {
                      duration: CONNECT_DUR + 0.1,
                      delay: delay + CONNECT_DELAY,
                      ease: [0.55, 0, 0.3, 1],
                      times: [0, 0.1, 0.85, 1]
                    }
                  : { duration: 0.2 }
              }
            />
          </motion.div>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, x: -4 }}
        animate={play ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
        transition={{
          duration: play ? 0.5 : 0.25,
          delay: play ? delay + 0.2 : 0,
          ease: 'easeOut'
        }}
        className="text-xs opacity-90 flex-1 pt-[1px] leading-snug"
      >
        {step}
      </motion.div>
    </motion.div>
  )
}
