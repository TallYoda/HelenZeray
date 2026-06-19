import Footer from '../components/layout/Footer'
import HeroSlideshow from '../components/motion/HeroSlideshow'
import PageFade from '../components/motion/PageFade'
import { useHashScroll } from '../hooks/useHashScroll'
import AboutSection from '../sections/AboutSection'
import ContactSection from '../sections/ContactSection'
import ExhibitionsSection from '../sections/ExhibitionsSection'
import PressSection from '../sections/PressSection'
import WorksSection from '../sections/WorksSection'

export default function HomePage() {
  useHashScroll()

  return (
    <>
      <HeroSlideshow />
      <PageFade>
        <WorksSection />
        <PressSection />
        <ExhibitionsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </PageFade>
    </>
  )
}
