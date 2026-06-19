import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import type { Artwork } from '../../types/artwork'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { motionEase } from '../../utils/motion'
import styles from './Lightbox.module.css'

type LightboxProps = {
  artwork: Artwork
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  showNavigation?: boolean
}

function formatDimensions(dimensions?: string) {
  if (!dimensions) return null
  return dimensions
}

export default function Lightbox({
  artwork,
  onClose,
  onNext,
  onPrev,
  showNavigation = false,
}: LightboxProps) {
  const [fullSrc, setFullSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const overlayRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight' && showNavigation) onNext()
      if (event.key === 'ArrowLeft' && showNavigation) onPrev()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, onNext, onPrev, showNavigation])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.55, ease: motionEase.entry },
      )
    }, overlay)

    return () => ctx.revert()
  }, [artwork.id, reducedMotion])

  const titleLine = artwork.year
    ? `${artwork.title.toUpperCase()} , ${artwork.year}`
    : artwork.title.toUpperCase()

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${artwork.title} details`}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>

      <div className={styles.layout}>
        <aside className={styles.meta}>
          <h2 className={styles.title}>{titleLine}</h2>

          <div className={styles.details}>
            <p>{artwork.medium}</p>
            {formatDimensions(artwork.dimensions) && <p>{artwork.dimensions}</p>}
          </div>
        </aside>

        <div className={styles.media}>
          <div className={styles.imageFrame}>
            <img
              src={fullSrc ?? artwork.thumbnail}
              alt={`${artwork.title} full view`}
              className={fullSrc ? styles.imageFull : styles.imagePreview}
            />
            {isLoading && !fullSrc && (
              <span className={styles.loading} aria-live="polite">
                Loading…
              </span>
            )}
          </div>
        </div>
      </div>

      {showNavigation && (
        <button
          type="button"
          className={styles.next}
          onClick={onNext}
          aria-label="Next artwork"
        >
          ›
        </button>
      )}
    </div>
  )
}
