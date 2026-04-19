import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// CRM dashboard. Desktop shows all panels at once; mobile uses a tab switcher
// between Pipeline / Leads / Scripts / Automations so each fits the viewport.
export default function CRMStructure({ data, accent }) {
  const { leads, scripts, pipeline, automations } = data
  const [nonce, setNonce] = useState(0)
  const [tab, setTab] = useState(0)

  const tabs = [
    { key: 'pipeline', label: 'Pipeline' },
    { key: 'leads', label: 'Leads' },
    { key: 'scripts', label: 'Scripts' },
    { key: 'auto', label: 'Auto' }
  ]

  const Pipeline = (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
      {pipeline.map((p, i) => (
        <CountTile key={`${nonce}-${p.label}`} tile={p} delay={0.08 + i * 0.06} accent={accent} />
      ))}
    </div>
  )

  const Leads = (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div
        className="px-3 md:px-4 py-2 md:py-2.5 text-[10px] tracking-[0.3em] uppercase font-semibold flex items-center justify-between"
        style={{ background: `${accent}11`, color: accent }}
      >
        <span>1 · Lead Capture Tracker</span>
        <span className="opacity-50 text-[9px] hidden md:inline">Zapier → Airtable</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] md:text-xs">
          <thead>
            <tr className="text-[9px] uppercase tracking-widest opacity-60 border-b border-white/10">
              {['Name', 'Handle', 'Source', 'Interest', 'Status'].map((h) => (
                <th key={h} className="text-left px-2 md:px-3 py-1.5 md:py-2 font-normal whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((row, ri) => (
              <motion.tr
                key={`${nonce}-${row.name}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + ri * 0.15 }}
                className="border-b border-white/5"
              >
                <td className="px-2 md:px-3 py-1.5 md:py-2 font-medium whitespace-nowrap">{row.name}</td>
                <td className="px-2 md:px-3 py-1.5 md:py-2 opacity-80 whitespace-nowrap">{row.handle}</td>
                <td className="px-2 md:px-3 py-1.5 md:py-2 opacity-80 whitespace-nowrap">{row.source}</td>
                <td className="px-2 md:px-3 py-1.5 md:py-2">
                  <LevelPill level={row.level} accent={accent} />
                </td>
                <td className="px-2 md:px-3 py-1.5 md:py-2 whitespace-nowrap">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">
                    {row.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const Scripts = (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div
        className="px-3 md:px-4 py-2 md:py-2.5 text-[10px] tracking-[0.3em] uppercase font-semibold"
        style={{ background: `${accent}11`, color: accent }}
      >
        2 · Story & DM Script Log
      </div>
      <div className="grid md:grid-cols-2 gap-2 md:gap-3 p-2.5 md:p-3">
        {scripts.map((s, si) => (
          <motion.div
            key={`${nonce}-${si}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + si * 0.1 }}
            className="rounded-lg border border-white/10 p-2.5 md:p-3 bg-black/20"
          >
            <div className="flex items-center justify-between text-[9px] opacity-60 uppercase tracking-widest">
              <span>{s.platform}</span>
              <span>{s.date}</span>
            </div>
            <div className="text-[11px] md:text-xs mt-1 leading-snug">{s.script}</div>
            <div className="flex items-center justify-between mt-1.5 text-[10px]">
              <span
                className="px-1.5 py-0.5 rounded-full"
                style={{ background: `${accent}22`, color: accent }}
              >
                {s.result}
              </span>
              <span className="opacity-60 truncate ml-2">{s.notes}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const Auto = (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div
        className="px-3 md:px-4 py-2 md:py-2.5 text-[10px] tracking-[0.3em] uppercase font-semibold"
        style={{ background: `${accent}11`, color: accent }}
      >
        3 · Automations
      </div>
      <ul className="p-3 md:p-4 space-y-1.5 md:space-y-2">
        {automations.map((a, i) => (
          <motion.li
            key={`${nonce}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
            className="flex items-start gap-2 text-[11px] md:text-xs"
          >
            <span
              className="mt-1 h-1.5 w-1.5 rounded-full shrink-0"
              style={{ background: accent }}
            />
            <span className="opacity-90 leading-snug">{a}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )

  const mobilePanels = [Pipeline, Leads, Scripts, Auto]

  return (
    <div className="h-full w-full flex flex-col text-white">
      {/* Mobile tab bar */}
      <div className="md:hidden flex items-center justify-between gap-2 px-3 pt-3 pb-2">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setTab(i)}
              className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase"
              style={{
                background: tab === i ? accent : 'rgba(255,255,255,0.1)',
                color: tab === i ? '#0b0b10' : 'rgba(255,255,255,0.85)'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setNonce((n) => n + 1)}
          className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded-full border border-white/20 shrink-0"
        >
          ↻
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-3 md:p-8">
        {/* Desktop: everything at once */}
        <div className="hidden md:block space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-60">
              Live pipeline · auto-synced
            </div>
            <button
              onClick={() => setNonce((n) => n + 1)}
              className="text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition"
            >
              ↻ Replay
            </button>
          </div>
          {Pipeline}
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">{Leads}</div>
            {Auto}
          </div>
          {Scripts}
        </div>

        {/* Mobile: active tab */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-${nonce}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {mobilePanels[tab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function CountTile({ tile, delay, accent }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now()
      const duration = 900
      const raf = (now) => {
        const p = Math.min(1, (now - start) / duration)
        setN(Math.round(tile.value * easeOut(p)))
        if (p < 1) requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }, delay * 1000)
    return () => clearTimeout(t)
  }, [delay, tile.value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-lg md:rounded-xl border border-white/10 p-2.5 md:p-3 bg-gradient-to-br from-white/5 to-transparent"
    >
      <div className="font-display text-xl md:text-2xl font-bold" style={{ color: accent }}>
        {tile.prefix ? '$' : ''}
        {n.toLocaleString()}
      </div>
      <div className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-60 mt-0.5">
        {tile.label}
      </div>
    </motion.div>
  )
}

function LevelPill({ level, accent }) {
  const colors = {
    Hot: '#F43F5E',
    Warm: accent,
    Cold: '#60A5FA',
    Closed: '#34D399'
  }
  const c = colors[level] ?? '#94A3B8'
  return (
    <span
      className="text-[10px] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap"
      style={{ background: `${c}22`, color: c }}
    >
      {level}
    </span>
  )
}

const easeOut = (t) => 1 - Math.pow(1 - t, 3)
