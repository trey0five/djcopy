import { useRef } from 'react'
import { sections } from './sections'
import { projects } from './projects'
import Section from './Section'
import Nav from './Nav'
import Hero from './Hero'
import Studio from './Studio'
import Results from './Results'
import Contact from './Contact'
import EmailsPage from './projects/EmailsPage'
import FollowUpSystem from './projects/FollowUpSystem'
import LeadConversion from './projects/LeadConversion'
import CRMStructure from './projects/CRMStructure'

const LAYOUTS = { EmailsPage, FollowUpSystem, LeadConversion, CRMStructure }

const PROJECT_BY_LAYOUT = {
  FollowUpSystem: 'followup-system',
  LeadConversion: 'lead-conversion',
  CRMStructure: 'crm-structure'
}

function renderChildren(section) {
  if (section.kind === 'hero') {
    return <Hero accent={section.accent} />
  }
  if (section.kind === 'studio') {
    return <Studio accent={section.accent} />
  }
  if (section.kind === 'results') {
    return <Results accent={section.accent} />
  }
  if (section.kind === 'contact') {
    return <Contact accent={section.accent} />
  }
  if (section.kind === 'project') {
    const Layout = LAYOUTS[section.layout]
    if (!Layout) return null
    if (section.layout === 'EmailsPage') {
      return <EmailsPage accent={section.accent} />
    }
    const project = projects.find((p) => p.id === PROJECT_BY_LAYOUT[section.layout])
    if (!project) return null
    return <Layout data={project.data} accent={section.accent} />
  }
  return null
}

export default function App() {
  const containerRef = useRef(null)
  return (
    <>
      <Nav containerRef={containerRef} />
      <main ref={containerRef} className="snap-container">
        {sections.map((s, i) => (
          <Section key={s.id} data={s} index={i}>
            {renderChildren(s)}
          </Section>
        ))}
      </main>
    </>
  )
}
