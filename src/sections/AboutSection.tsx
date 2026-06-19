import Section from '../components/layout/Section'
import Biography from '../components/about/Biography'

export default function AboutSection() {
  return (
    <Section id="about" className="about">
      <div className="section-header about-section-header">
        <h2>About</h2>
      </div>
      <div className="about-grid">
        <div className="about-top">
          <figure className="about-portrait">
            <img
              src="/about/portrait.jpeg"
              alt="Helen Zeray"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <Biography />
        </div>
      </div>
    </Section>
  )
}
