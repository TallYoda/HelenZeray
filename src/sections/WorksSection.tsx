import { useRef } from 'react'
import Section from '../components/layout/Section'
import GalleryGrid from '../components/gallery/GalleryGrid'
import Lightbox from '../components/gallery/Lightbox'
import { artworks } from '../data/artworks'
import { useGalleryReveal } from '../hooks/useGalleryReveal'
import { useLightbox } from '../hooks/useLightbox'
import { useScrollLock } from '../hooks/useScrollLock'

export default function WorksSection() {
  const worksRef = useRef<HTMLDivElement>(null)
  const { activeArtwork, openArtwork, closeArtwork, goNext, goPrev, canNavigate } =
    useLightbox(artworks)

  useScrollLock(Boolean(activeArtwork))
  useGalleryReveal(worksRef)

  return (
    <Section id="works" className="works works-grid">
      <div ref={worksRef}>
        <div className="section-divider" data-reveal-divider>
          <span>Paintings</span>
        </div>
        <GalleryGrid artworks={artworks} onSelect={openArtwork} />
      </div>

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
