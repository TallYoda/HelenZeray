import Footer from '../components/layout/Footer'
import { useHashScroll } from '../hooks/useHashScroll'
import AboutSection from '../sections/AboutSection'
import ContactSection from '../sections/ContactSection'
import CVSection from '../sections/CVSection'
import PressSection from '../sections/PressSection'
import WorksSection from '../sections/WorksSection'

export default function HomePage() {
  useHashScroll()

  return (
    <main id="top" className="home-page">
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Painter · Portraiture · Psychology</p>
          <h1>
            Helen Zeray is a contemporary painter based in Tel Aviv, originally
            from Addis Ababa. Her work examines human psychology, identity, and
            the tension between how we present ourselves and what emerges in
            unguarded moments.
          </h1>
          <p className="lede">
            Working in oil and acrylic on canvas, she traces the subtle language
            of gesture and expression — transforming everyday figures into
            luminous, symbolic portraits where emotion, vulnerability, and
            self-representation intersect.
          </p>
        </div>
      </section>

      <WorksSection />
      <AboutSection />
      <CVSection />
      <PressSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
