import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TITLE = 'DJ COPY'

const TAGLINES = [
  'Social media that actually sounds like you.',
  'Captions that convert.',
  'DMs that qualify, not time-wasters.',
  'Content your audience saves.',
  'Systems that turn attention into pipeline.'
]

const MARQUEE = [
  'INSTAGRAM',
  'TIKTOK',
  'X · TWITTER',
  'YOUTUBE',
  'LINKEDIN',
  'CAMPAIGNS',
  'AUTOMATION',
  'GROWTH'
]

// Decorative mock social posts. Positioned around the title at every size
// (smaller + dimmer on mobile so they frame the title without stealing focus).
const POSTS = [
  {
    kind: 'reel',
    positions: {
      base: { top: '16%', right: '2%' },
      lg: { top: '14%', right: '6%' }
    },
    rotate: 4,
    handle: '@aidenr',
    platform: 'Instagram Reel',
    caption: 'The 3 things killing your close rate',
    stat: '42.1k views · 2d',
    video: `${import.meta.env.BASE_URL}videos/reel.mp4`
  },
  {
    kind: 'tweet',
    positions: {
      base: { bottom: '22%', right: '2%' },
      lg: { bottom: '18%', right: '10%' }
    },
    rotate: -3,
    handle: '@dj_copy',
    platform: 'X',
    caption: "You don't have a content problem. You have a voice problem.",
    stat: '1,847 likes · 312 reposts'
  },
  {
    kind: 'tiktok',
    positions: {
      base: { top: '26%', left: '2%' },
      lg: { top: '22%', left: '4%' }
    },
    rotate: -6,
    handle: '@kishigallery',
    platform: 'TikTok',
    caption: 'POV: the brand trailer you thought was from a Netflix doc',
    stat: '286k plays · trending',
    video: `${import.meta.env.BASE_URL}videos/tiktok.mp4`
  }
]

const CALENDLY_URL = 'https://calendly.com/dj-dylanjcopy'

export default function Hero({ accent }) {
  const [tagIdx, setTagIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setTagIdx((i) => (i + 1) % TAGLINES.length),
      3200
    )
    return () => clearInterval(id)
  }, [])

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    } else {
      window.open(CALENDLY_URL, '_blank')
    }
    return false
  }

  const letters = Array.from(TITLE)

  return (
    <div className="h-full w-full flex flex-col relative">
      {/* Floating social post cards — smaller + more transparent on mobile so
          they frame the title without stealing focus. */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {POSTS.map((p, i) => (
          <PostCard key={i} post={p} accent={accent} delay={1.2 + i * 0.18} />
        ))}
      </div>

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-[11px] md:text-xs tracking-[0.4em] uppercase relative z-10"
        style={{ color: accent }}
      >
        Social studio · since 2024
      </motion.div>

      {/* Title — letter-by-letter reveal. Anchored to top on mobile so the
          title clears the floating Reel / TikTok post cards that sit in
          the upper-middle zone; centered on desktop where there's room. */}
      <div className="mt-3 md:mt-4 flex-1 flex flex-col justify-start md:justify-center relative z-10">
        <h1
          aria-label={TITLE}
          className="font-display font-black leading-[0.85] tracking-tight select-none"
          style={{ fontSize: 'clamp(4.5rem, 19vw, 16rem)' }}
        >
          <span className="flex flex-wrap" aria-hidden>
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: '40%', rotate: -6, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.25 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="inline-block"
                style={{ textShadow: `0 6px 40px ${accent}55` }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Rotating tagline. Frosted-glass card on mobile only. The card
            auto-sizes to the current sentence via an invisible sizer +
            framer-motion's layout animation, so short lines get a small
            card and long ones get a larger one. */}
        <motion.div
          layout
          transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          className="mt-6 md:mt-10 max-w-4xl self-start rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg md:bg-transparent md:border-transparent md:backdrop-blur-none md:rounded-none md:shadow-none"
        >
          <div className="relative overflow-hidden px-4 py-3 md:p-0">
            {/* Invisible sizer — gives the card its height equal to the
                current tagline's natural height, so the card shrinks and
                grows with each sentence. */}
            <p
              aria-hidden
              className="invisible font-display font-bold text-xl md:text-3xl lg:text-4xl leading-snug"
              style={{ paddingBottom: '0.18em' }}
            >
              {TAGLINES[tagIdx]}
            </p>
            <AnimatePresence initial={false}>
              <motion.p
                key={tagIdx}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 px-4 py-3 md:p-0 font-display font-bold text-xl md:text-3xl lg:text-4xl leading-snug"
                style={{
                  color: accent,
                  textShadow: `0 0 28px ${accent}66, 0 3px 14px rgba(0,0,0,0.3)`,
                  paddingBottom: '0.18em'
                }}
              >
                {TAGLINES[tagIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
        >
          <button
            onClick={openCalendly}
            className="group relative inline-flex items-center justify-center gap-3 px-6 md:px-7 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base tracking-[0.15em] uppercase overflow-hidden transition-transform active:scale-95 self-start"
            style={{ background: accent, color: '#0b0b10' }}
          >
            <span className="relative z-10">Book a strategy call</span>
            <span
              className="relative z-10 transition-transform group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${accent}` }}
              animate={{ scale: [1, 1.35, 1.35], opacity: [0.6, 0, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          </button>

          <div className="flex items-center gap-2 text-xs md:text-sm opacity-80">
            <span className="inline-block h-px w-6" style={{ background: accent }} />
            <span className="tracking-[0.2em] uppercase">15 min · no pitch deck</span>
          </div>
        </motion.div>
      </div>

      {/* Platforms marquee — alternating filled / outlined words so the row
          reads like a kinetic ticker instead of a plain text strip. */}
      <div className="relative -mx-4 md:-mx-14 lg:-mx-20 mt-6 md:mt-8 z-10">
        <div
          className="relative flex overflow-hidden py-3 md:py-4"
          style={{
            borderTop: `1px solid rgba(255,255,255,0.12)`,
            borderBottom: `1px solid rgba(255,255,255,0.12)`,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.12) 100%)'
          }}
        >
          <motion.div
            className="flex shrink-0 whitespace-nowrap items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            style={{ lineHeight: 1.4 }}
          >
            {[...MARQUEE, ...MARQUEE].map((word, i) => {
              const filled = i % 2 === 0
              return (
                <span
                  key={i}
                  className="inline-flex items-center font-display font-black tracking-[0.15em] uppercase"
                  style={{ fontSize: 'clamp(1.7rem, 5.8vw, 3.2rem)' }}
                >
                  <span
                    className="px-4 md:px-6"
                    style={{
                      color: accent,
                      fontSize: '1.25em',
                      filter: `drop-shadow(0 0 8px ${accent}88)`
                    }}
                  >
                    ✦
                  </span>
                  <span
                    className="px-3 py-[0.05em]"
                    style={
                      filled
                        ? {
                            color: accent,
                            textShadow: `0 0 22px ${accent}77, 0 2px 10px rgba(0,0,0,0.35)`
                          }
                        : {
                            color: 'transparent',
                            WebkitTextStroke: '1.5px #ffffff',
                            paintOrder: 'stroke fill'
                          }
                    }
                  >
                    {word}
                  </span>
                </span>
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function PostCard({ post, accent, delay }) {
  // Responsive positioning via CSS vars: mobile uses `base`, desktop uses `lg`.
  const b = post.positions.base
  const l = post.positions.lg
  const styleVars = {
    '--top-base': b.top ?? 'auto',
    '--bottom-base': b.bottom ?? 'auto',
    '--left-base': b.left ?? 'auto',
    '--right-base': b.right ?? 'auto',
    '--top-lg': l.top ?? 'auto',
    '--bottom-lg': l.bottom ?? 'auto',
    '--left-lg': l.left ?? 'auto',
    '--right-lg': l.right ?? 'auto',
    top: 'var(--top-base)',
    bottom: 'var(--bottom-base)',
    left: 'var(--left-base)',
    right: 'var(--right-base)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: post.rotate * 1.6, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotate: post.rotate, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="hero-post absolute w-[140px] sm:w-[170px] md:w-[210px] lg:w-[260px] xl:w-[300px] pointer-events-none opacity-80 lg:opacity-95"
      style={styleVars}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6 + (post.rotate % 3), repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-xl md:rounded-2xl p-2.5 md:p-4 border border-white/15 shadow-2xl backdrop-blur-md"
        style={{ background: 'rgba(15, 15, 20, 0.6)' }}
      >
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
            <div
              className="h-5 w-5 md:h-6 md:w-6 rounded-full grid place-items-center text-[9px] md:text-[10px] font-bold shrink-0"
              style={{ background: accent, color: '#0b0b10' }}
            >
              {post.handle[1].toUpperCase()}
            </div>
            <div className="text-[10px] md:text-xs font-semibold truncate">{post.handle}</div>
          </div>
          <div className="text-[8px] md:text-[9px] tracking-[0.25em] uppercase opacity-60 shrink-0">
            {post.platform}
          </div>
        </div>

        {post.kind === 'reel' && (
          <div
            className="mt-2 md:mt-3 aspect-[9/12] rounded-md md:rounded-lg relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accent}33, rgba(0,0,0,0.4))`
            }}
          >
            {post.video && (
              <video
                src={post.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] md:text-[10px] font-semibold flex items-center justify-between z-10">
              <span className="px-1.5 py-0.5 rounded-full bg-black/55 backdrop-blur-sm">
                ▶ {post.stat}
              </span>
            </div>
          </div>
        )}

        {post.kind === 'tweet' && (
          <>
            <div className="mt-2 md:mt-3 text-[11px] md:text-sm leading-snug line-clamp-3 md:line-clamp-none">
              {post.caption}
            </div>
            <div className="mt-2 md:mt-3 text-[9px] md:text-[10px] opacity-70 tracking-wider">
              {post.stat}
            </div>
          </>
        )}

        {post.kind === 'tiktok' && (
          <div
            className="mt-2 md:mt-3 aspect-[9/14] rounded-md md:rounded-lg relative overflow-hidden"
            style={{
              background: `linear-gradient(160deg, ${accent}22, rgba(0,0,0,0.5))`
            }}
          >
            {post.video && (
              <video
                src={post.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {/* Soft overlay for caption legibility */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-16"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0))'
              }}
            />
            <div className="absolute bottom-1.5 left-1.5 right-1.5 z-10">
              <div className="text-[10px] md:text-[11px] font-semibold line-clamp-2">
                {post.caption}
              </div>
              <div className="mt-1 text-[8px] md:text-[9px] opacity-90">{post.stat}</div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
