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

// Decorative mock social posts. Positioned around the title on desktop to
// signal what DJ Copy actually makes without cluttering the message.
const POSTS = [
  {
    kind: 'reel',
    top: '8%',
    right: '6%',
    rotate: 4,
    handle: '@aidenr',
    platform: 'Instagram Reel',
    caption: 'The 3 things killing your close rate',
    stat: '42.1k views · 2d'
  },
  {
    kind: 'tweet',
    bottom: '18%',
    right: '10%',
    rotate: -3,
    handle: '@dj_copy',
    platform: 'X',
    caption: "You don't have a content problem. You have a voice problem.",
    stat: '1,847 likes · 312 reposts'
  },
  {
    kind: 'tiktok',
    top: '18%',
    left: '4%',
    rotate: -6,
    handle: '@kishigallery',
    platform: 'TikTok',
    caption: 'POV: the brand trailer you thought was from a Netflix doc',
    stat: '286k plays · trending'
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
      {/* Floating social post cards — desktop only */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden>
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

      {/* Title — letter-by-letter reveal */}
      <div className="mt-3 md:mt-4 flex-1 flex flex-col justify-center relative z-10">
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

        {/* Rotating tagline */}
        <div className="mt-6 md:mt-10 h-[3.2em] md:h-[2.4em] relative overflow-hidden max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={tagIdx}
              initial={{ y: '60%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-60%', opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 font-display font-medium text-xl md:text-3xl lg:text-4xl leading-tight"
            >
              {TAGLINES[tagIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

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

      {/* Platforms marquee */}
      <div className="relative -mx-4 md:-mx-14 lg:-mx-20 mt-6 md:mt-8 pb-2 md:pb-4 z-10">
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex shrink-0 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          >
            {[...MARQUEE, ...MARQUEE].map((word, i) => (
              <span
                key={i}
                className="inline-flex items-center font-display font-bold tracking-[0.25em] uppercase"
                style={{ fontSize: 'clamp(1.4rem, 4.8vw, 2.8rem)' }}
              >
                <span className="px-6" style={{ color: accent }}>✦</span>
                <span className="px-3 opacity-90">{word}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function PostCard({ post, accent, delay }) {
  const base = {
    top: post.top,
    bottom: post.bottom,
    left: post.left,
    right: post.right
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: post.rotate * 1.6, scale: 0.9 }}
      animate={{ opacity: 0.95, y: 0, rotate: post.rotate, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="absolute w-[260px] xl:w-[300px] pointer-events-none"
      style={base}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6 + (post.rotate % 3), repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-2xl p-4 border border-white/15 shadow-2xl backdrop-blur-md"
        style={{ background: 'rgba(15, 15, 20, 0.55)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-6 w-6 rounded-full grid place-items-center text-[10px] font-bold"
              style={{ background: accent, color: '#0b0b10' }}
            >
              {post.handle[1].toUpperCase()}
            </div>
            <div className="text-xs font-semibold">{post.handle}</div>
          </div>
          <div className="text-[9px] tracking-[0.25em] uppercase opacity-60">
            {post.platform}
          </div>
        </div>

        {post.kind === 'reel' && (
          <div
            className="mt-3 aspect-[9/12] rounded-lg relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accent}33, rgba(0,0,0,0.4))`
            }}
          >
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-12 w-12 rounded-full bg-white/90 grid place-items-center">
                <div
                  className="w-0 h-0"
                  style={{
                    borderLeft: '12px solid #0b0b10',
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    marginLeft: '3px'
                  }}
                />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] font-semibold">
              {post.stat}
            </div>
          </div>
        )}

        {post.kind === 'tweet' && (
          <>
            <div className="mt-3 text-sm leading-snug">{post.caption}</div>
            <div className="mt-3 text-[10px] opacity-70 tracking-wider">{post.stat}</div>
          </>
        )}

        {post.kind === 'tiktok' && (
          <>
            <div
              className="mt-3 aspect-[9/14] rounded-lg relative overflow-hidden"
              style={{
                background: `linear-gradient(160deg, ${accent}22, rgba(0,0,0,0.5))`
              }}
            >
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-[11px] font-semibold">{post.caption}</div>
                <div className="mt-1 text-[9px] opacity-80">{post.stat}</div>
              </div>
            </div>
          </>
        )}

        {!['reel', 'tweet', 'tiktok'].includes(post.kind) && (
          <div className="mt-3 text-sm">{post.caption}</div>
        )}
      </motion.div>
    </motion.div>
  )
}
