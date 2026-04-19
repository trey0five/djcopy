// 8 pages. Hero → Studio (what we do) → 4 work cases → Results → Contact.
// `kind` controls what renders inside Section.jsx:
//   'content'  — big headline page (hero, results, contact)
//   'studio'   — the combined About/Services/Process panel
//   'project'  — a full-bleed interactive case study; `layout` picks the component.

export const sections = [
  {
    id: 'hero',
    kind: 'hero',
    label: 'Home',
    eyebrow: '01 / Intro',
    title: 'DJ COPY',
    subtitle: 'Social media that actually sounds like your brand.',
    bg: 'linear-gradient(135deg, #FF5EEB 0%, #7C3AED 45%, #0EA5E9 100%)',
    accent: '#FFF1A6',
    particles: 'bubbles'
  },
  {
    id: 'studio',
    kind: 'studio',
    label: 'Studio',
    eyebrow: '02 / Studio',
    title: 'We run social from strategy to DMs.',
    subtitle: 'A small studio embedded with your team — writers, strategists, systems builders.',
    bg: 'linear-gradient(135deg, #FEF08A 0%, #F97316 60%, #DC2626 100%)',
    accent: '#1E1B4B',
    particles: 'confetti'
  },
  {
    id: 'work-emails',
    kind: 'project',
    layout: 'EmailsPage',
    label: 'Emails',
    eyebrow: '03 / Case · Emails',
    title: 'Email that books calls.',
    subtitle: 'Warmup sequences and cold outreach — written to sound like a human you\u2019d actually reply to.',
    bg: 'linear-gradient(135deg, #22D3EE 0%, #0EA5E9 50%, #1E3A8A 100%)',
    accent: '#FDE68A',
    particles: 'network'
  },
  {
    id: 'work-automation',
    kind: 'project',
    layout: 'FollowUpSystem',
    label: 'Automation',
    eyebrow: '04 / Case · Automation',
    title: 'Backend flows that protect your time.',
    subtitle: 'DMs + bookings that pre-qualify, filter ghosts, and only hand hot leads to a human.',
    bg: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #064E3B 100%)',
    accent: '#FCA5A5',
    particles: 'grid'
  },
  {
    id: 'work-systems',
    kind: 'project',
    layout: 'LeadConversion',
    label: 'Playbooks',
    eyebrow: '05 / Case · Playbooks',
    title: 'Lead conversion, built two ways.',
    subtitle: 'Pick the system that fits your traffic: plug-and-play sequences or a full CRM funnel.',
    bg: 'linear-gradient(135deg, #111827 0%, #312E81 60%, #BE185D 100%)',
    accent: '#F0ABFC',
    particles: 'sparks'
  },
  {
    id: 'work-crm',
    kind: 'project',
    layout: 'CRMStructure',
    label: 'CRM',
    eyebrow: '06 / Case · CRM',
    title: 'A CRM that feels like a cockpit.',
    subtitle: 'Lightweight, creator-friendly — pipeline, script log, and automations in one view.',
    bg: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 50%, #450A0A 100%)',
    accent: '#FEF3C7',
    particles: 'bubbles'
  },
  {
    id: 'results',
    kind: 'results',
    label: 'Results',
    eyebrow: '07 / Results',
    title: 'Numbers that compound.',
    subtitle: 'Reach, engagement, pipeline \u2014 measured every week, shown in plain english.',
    bg: 'linear-gradient(135deg, #C084FC 0%, #6D28D9 60%, #1E1B4B 100%)',
    accent: '#A7F3D0',
    particles: 'network'
  },
  {
    id: 'contact',
    kind: 'contact',
    label: 'Contact',
    eyebrow: '08 / Start',
    title: "Let's make you loud.",
    subtitle: 'Pick a time below — 15 minutes, strategy on the line, no pitch deck.',
    bg: 'linear-gradient(135deg, #FDE68A 0%, #F472B6 50%, #8B5CF6 100%)',
    accent: '#0F172A',
    particles: 'confetti'
  }
]
