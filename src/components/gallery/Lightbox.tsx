import { useEffect, useState } from 'react'
import type { Artwork } from '../../types/artwork'

type LightboxProps = {
  artwork: Artwork
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  showNavigation?: boolean
  showDescription?: boolean
}

export default function Lightbox({
  artwork,
  onClose,
  onNext,
  onPrev,
  showNavigation = false,
  showDescription = false,
}: LightboxProps) {
  const [fullSrc, setFullSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setFullSrc(null)
    setIsLoading(true)

    const image = new Image()
    image.src = artwork.full
    image.onload = () => {
      setFullSrc(artwork.full)
      setIsLoading(false)
    }
    image.onerror = () => setIsLoading(false)

    return () => {
      image.onload = null
      image.onerror = null
    }
  }, [artwork.full])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${artwork.title} details`}
      onClick={onClose}
    >
      <div
        className="lightbox-content works-lightbox"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="lightbox-close" onClick={onClose}>
          Close
        </button>
        <div
          className={`lightbox-body${showNavigation ? '' : ' lightbox-body--single'}`}
        >
          {showNavigation && (
            <button
              type="button"
              className="gallery-nav prev"
              onClick={onPrev}
              aria-label="Previous artwork"
            >
              ‹
            </button>
          )}
          <div className="lightbox-image-wrap">
            <img
              src={fullSrc ?? artwork.thumbnail}
              alt={`${artwork.title} full view`}
              className={fullSrc ? 'is-full' : 'is-preview'}
            />
            {isLoading && !fullSrc && (
              <span className="lightbox-loading" aria-live="polite">
                Loading full resolution artwork…
              </span>
            )}
          </div>
          {showNavigation && (
            <button
              type="button"
              className="gallery-nav next"
              onClick={onNext}
              aria-label="Next artwork"
            >
              ›
            </button>
          )}
        </div>
        <div className="lightbox-meta">
          <h3>{artwork.title}</h3>
          <p>
            {artwork.dimensions
              ? `${artwork.medium} · ${artwork.dimensions}`
              : artwork.medium}
          </p>
          {artwork.year && <p>{artwork.year}</p>}
          {showDescription && artwork.description && (
            <p className="lightbox-description">{artwork.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
