import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../projects'
import EmailFunnel from './EmailFunnel'
import Outreach from './Outreach'

const funnel = projects.find((p) => p.id === 'email-funnel')
const outreach = projects.find((p) => p.id === 'outreach')

export default function EmailsPage({ accent }) {
  const [tab, setTab] = useState(0)
  const tabs = [
    { label: 'Warmup Sequence', short: 'Warmup', sub: 'Bootcamp · 3 emails' },
    { label: 'Cold Outreach', short: 'Outreach', sub: 'Kishigallery · 2 touches' }
  ]

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex items-center gap-2 px-3 md:px-4 pt-2 md:pt-3">
        <div
          className="relative inline-flex items-center rounded-full p-1"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            layout
            className="absolute top-1 bottom-1 rounded-full"
            style={{
              background: accent,
              left: tab === 0 ? 4 : '50%',
              right: tab === 1 ? 4 : '50%'
            }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          />
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setTab(i)}
              className="relative z-10 px-3 md:px-4 py-1 md:py-1.5 text-[10px] md:text-[11px] font-semibold tracking-[0.15em] md:tracking-[0.2em] uppercase transition-colors whitespace-nowrap"
              style={{ color: tab === i ? '#0b0b10' : 'rgba(255,255,255,0.85)' }}
            >
              <span className="md:hidden">{t.short}</span>
              <span className="hidden md:inline">{t.label}</span>
            </button>
          ))}
        </div>
        <div className="text-[10px] uppercase tracking-widest opacity-60 hidden md:block">
          · {tabs[tab].sub}
        </div>
      </div>

      <div className="flex-1 min-h-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: tab === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: tab === 0 ? 30 : -30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {tab === 0 ? (
              <EmailFunnel data={funnel.data} accent={accent} />
            ) : (
              <Outreach data={outreach.data} accent={accent} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
