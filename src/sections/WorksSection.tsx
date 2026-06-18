import Section from '../components/layout/Section'
import { artworks } from '../data/artworks'
import { useLightbox } from '../hooks/useLightbox'
import { useScrollLock } from '../hooks/useScrollLock'
import GalleryGrid from '../components/gallery/GalleryGrid'
import Lightbox from '../components/gallery/Lightbox'

export default function WorksSection() {
  const { activeArtwork, openArtwork, closeArtwork, goNext, goPrev, canNavigate } =
    useLightbox(artworks)

  useScrollLock(Boolean(activeArtwork))

  return (
    <Section id="works" className="works">
      <div className="works-header">
        <h2>Works</h2>
        <p>
          Oil and acrylic on canvas — intimate figurative portraits exploring
          gesture, identity, and the psychology of unguarded expression.
        </p>
      </div>

      <GalleryGrid artworks={artworks} onSelect={openArtwork} />

      {activeArtwork && (
        <Lightbox
          artwork={activeArtwork}
          onClose={closeArtwork}
          onNext={goNext}
          onPrev={goPrev}
          showNavigation={canNavigate}
        />
      )}
    </Section>
  )
}
