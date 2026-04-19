import { useEffect } from 'react'
import { motion } from 'framer-motion'

const CALENDLY_URL = 'https://calendly.com/dj-dylanjcopy'
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'
const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css'

function useCalendly() {
  useEffect(() => {
    if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = CALENDLY_CSS
      document.head.appendChild(link)
    }
    if (!document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`)) {
      const s = document.createElement('script')
      s.src = CALENDLY_SCRIPT
      s.async = true
      document.body.appendChild(s)
    }
  }, [])
}

export default function Contact({ accent }) {
  useCalendly()

  const openPopup = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    } else {
      window.open(CALENDLY_URL, '_blank')
    }
    return false
  }

  return (
    <div className="w-full h-full grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 md:gap-6">
      {/* Pitch + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-2xl p-4 md:p-6 border border-black/10 flex flex-col justify-between min-h-0"
        style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)' }}
      >
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: accent }}>
            Book a call
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold mt-2 leading-tight">
            15 minutes. Real strategy. No pitch deck.
          </h3>
          <p className="text-xs md:text-sm opacity-85 mt-3 leading-relaxed">
            Tell us about your brand — we'll come back with one thing we'd change first and
            whether we're the right fit to run it. No obligation either way.
          </p>
        </div>

        <div className="mt-4 md:mt-6 space-y-2">
          <button
            onClick={openPopup}
            className="w-full rounded-full px-4 py-2.5 md:py-3 font-semibold text-xs md:text-sm tracking-[0.15em] uppercase shadow-lg transition hover:opacity-90"
            style={{ background: '#0b0b10', color: '#ffffff' }}
          >
            Open scheduler →
          </button>
          <a
            href="mailto:dj@dylanjcopy.com"
            className="block text-center rounded-full px-4 py-2 md:py-2.5 font-semibold text-xs tracking-[0.15em] uppercase border transition hover:bg-black/5"
            style={{ borderColor: 'rgba(11,11,16,0.4)', color: '#0b0b10' }}
          >
            Or email us
          </a>
        </div>

        <div className="mt-4 text-[10px] uppercase tracking-widest opacity-70">
          Reply within 24 hours · Mon–Fri
        </div>
      </motion.div>

      {/* Calendly — desktop inline, mobile handled by the popup button above */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="hidden md:block rounded-2xl overflow-hidden border border-black/10 min-h-0"
        style={{ background: '#ffffff' }}
      >
        <div
          className="calendly-inline-widget"
          data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=0f172a&primary_color=7c3aed`}
          style={{ minWidth: 320, width: '100%', height: '100%' }}
        />
      </motion.div>
    </div>
  )
}
