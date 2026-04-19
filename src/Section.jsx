import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Particles from './Particles'

export default function Section({ data, index, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const hasEntered = useInView(ref, { amount: 0.3, once: true })

  // Detect small / touch-coarse viewports once. Mobile Safari can't run the
  // full-section curtain transform smoothly alongside scroll-snap, so we
  // swap to a lightweight fade-only entrance there.
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
      : false
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px), (pointer: coarse)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  const even = index % 2 === 0

  // On mobile, no entrance animation at all — content renders at its final
  // state immediately. Safari's scroll-snap pipeline can't share the frame
  // with a JS-driven transform on the same element without stutter.
  const contentStyle = isMobile ? undefined : 'diagonal'
  const contentFrom =
    contentStyle === 'diagonal'
      ? { x: even ? '-15%' : '15%', y: '14%', opacity: 0 }
      : { opacity: 1 }
  const contentTo =
    contentStyle === 'diagonal' ? { x: 0, y: 0, opacity: 1 } : { opacity: 1 }

  const curtainFrom = { x: 0, y: 0 }
  const curtainTo = { x: even ? '120%' : '-120%', y: '-120%' }

  // Cursor-following glow (desktop only — ignored by touch devices).
  const mx = useMotionValue(-9999)
  const my = useMotionValue(-9999)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  const isProject = data.kind === 'project'
  const isStudio = data.kind === 'studio'
  const isContact = data.kind === 'contact'
  const isResults = data.kind === 'results'
  const isHero = data.kind === 'hero'
  const isCompactContent = isStudio || isContact || isResults || isHero

  return (
    <section
      id={data.id}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(-9999); my.set(-9999) }}
      className="snap-section grain"
      style={{ background: data.bg }}
    >
      {data.particles && data.particles !== 'none' && (
        <Particles type={data.particles} color={data.accent} active={inView} />
      )}

      <motion.div
        aria-hidden
        className="absolute -top-32 -right-32 h-[380px] w-[380px] md:h-[520px] md:w-[520px] rounded-full blur-3xl opacity-40"
        style={{ background: data.accent }}
        animate={hasEntered ? { scale: 1 } : { scale: 0.85 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -left-24 h-[320px] w-[320px] md:h-[420px] md:w-[420px] rounded-full blur-3xl opacity-30"
        style={{ background: data.accent }}
        animate={hasEntered ? { scale: 1 } : { scale: 0.9 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
      />

      {/* Cursor spotlight — desktop only */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full z-10 hidden md:block"
        style={{
          width: 360,
          height: 360,
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          background: `radial-gradient(circle, ${data.accent}33 0%, transparent 60%)`,
          mixBlendMode: 'screen'
        }}
      />

      {/* Diagonal curtain wipe. CSS-transition driven (not framer-motion) so
          the transform lives on the compositor and doesn't compete with
          mobile Safari's scroll pipeline on the main thread. */}
      <div
        aria-hidden
        className={`section-curtain ${inView ? 'section-curtain--out' : ''}`}
        style={{
          background: data.accent,
          ['--curtain-x']: even ? '120%' : '-120%'
        }}
      />

      <motion.div
        className={`relative z-30 h-full w-full flex flex-col ${
          isProject ? 'pt-24 md:pt-44 pb-6 md:pb-10'
            : isContact ? 'pt-24 md:pt-40 pb-8 md:pb-10'
            : isStudio || isResults ? 'pt-24 md:pt-44 pb-6 md:pb-10'
            : isHero ? 'pt-24 md:pt-44 pb-6 md:pb-8'
            : 'justify-center pt-24 md:pt-44'
        } px-4 md:px-14 lg:px-20`}
        initial={contentFrom}
        animate={inView ? contentTo : contentFrom}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        style={isMobile ? undefined : { willChange: 'transform, opacity' }}
      >
        {isProject ? (
          <ProjectHeader data={data} />
        ) : isHero ? null : (
          <>
            <div
              className="font-display text-xs md:text-base tracking-[0.3em] uppercase opacity-80"
              style={{ color: data.accent }}
            >
              {data.eyebrow}
            </div>
            <h1
              className={`font-display font-bold leading-[0.95] mt-2 md:mt-3 ${
                data.id === 'hero'
                  ? 'text-5xl sm:text-7xl md:text-[9rem] lg:text-[12rem]'
                  : isContact
                    ? 'text-3xl sm:text-4xl md:text-4xl lg:text-5xl'
                    : isCompactContent
                      ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
                      : 'text-4xl sm:text-5xl md:text-7xl lg:text-8xl'
              }`}
            >
              {data.title}
            </h1>
            <p className={`max-w-2xl opacity-90 ${isContact ? 'mt-1.5 md:mt-2 text-sm md:text-base' : isCompactContent ? 'mt-2 md:mt-3 text-sm md:text-lg' : 'mt-4 md:mt-8 text-base md:text-2xl'}`}>
              {data.subtitle}
            </p>
            {index === 0 && (
              <div className="mt-8 md:mt-12 flex items-center gap-3 text-xs md:text-sm tracking-widest uppercase">
                <span className="inline-block h-px w-8 md:w-10" style={{ background: data.accent }} />
                Scroll
              </div>
            )}
          </>
        )}

        {children && (
          <div className={isProject || isContact || isResults || isHero ? (isHero ? 'flex-1 min-h-0' : 'mt-3 md:mt-4 flex-1 min-h-0') : 'mt-4 md:mt-6 w-full'}>
            {isProject ? (
              <div
                className="h-full w-full rounded-xl md:rounded-2xl overflow-hidden relative border"
                style={{
                  background: 'rgba(8,8,12,0.82)',
                  borderColor: `${data.accent}33`,
                  boxShadow: `0 20px 60px -20px ${data.accent}55, inset 0 0 0 1px rgba(255,255,255,0.04)`
                }}
              >
                {children}
              </div>
            ) : (
              children
            )}
          </div>
        )}
      </motion.div>

      <div
        className="absolute bottom-3 md:bottom-5 right-4 md:right-6 z-30 font-display text-[10px] md:text-sm tracking-widest opacity-70"
        style={{ color: data.accent }}
      >
        {String(index + 1).padStart(2, '0')} / 08
      </div>
    </section>
  )
}

function ProjectHeader({ data }) {
  return (
    <div className="flex items-start md:items-end justify-between gap-3 md:gap-6 flex-col md:flex-row md:flex-wrap">
      <div>
        <div
          className="font-display text-[10px] md:text-sm tracking-[0.3em] uppercase opacity-80"
          style={{ color: data.accent }}
        >
          {data.eyebrow}
        </div>
        <h1 className="font-display font-bold leading-[0.98] mt-1.5 md:mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl">
          {data.title}
        </h1>
      </div>
      {data.subtitle && (
        <p className="max-w-md text-xs md:text-base opacity-85 leading-relaxed hidden md:block">
          {data.subtitle}
        </p>
      )}
    </div>
  )
}
