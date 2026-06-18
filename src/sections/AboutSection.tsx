import Section from '../components/layout/Section'
import Biography from '../components/about/Biography'
import ArtistStatement from '../components/about/ArtistStatement'

export default function AboutSection() {
  return (
    <Section id="about" className="about">
      <div className="section-header about-section-header">
        <div>
          <h2>About</h2>
          <p className="section-eyebrow">Studio · Practice · Voice</p>
        </div>
      </div>
      <div className="about-grid">
        <div className="about-top">
          <figure className="about-portrait">
            <img
              src="/about/thumbs/portrait.jpg"
              alt="Helen Zeray"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <Biography />
        </div>
        <ArtistStatement />
      </div>
    </Section>
  )
}
