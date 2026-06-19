import CV from '../components/about/CV'
import Section from '../components/layout/Section'

export default function ExhibitionsSection() {
  return (
    <Section id="exhibitions" className="cv-section exhibitions-section">
      <div className="section-header cv-section-header">
        <h2>Exhibitions</h2>
      </div>
      <div className="cv-content">
        <CV />
      </div>
    </Section>
  )
}
