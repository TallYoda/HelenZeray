import { useState } from 'react'
import type { Artwork } from '../../types/artwork'
import { getArtworkAlt } from '../../utils/image'
import styles from './ArtworkCard.module.css'

type ArtworkCardProps = {
  artwork: Artwork
  onClick: () => void
  priority?: boolean
}

export default function ArtworkCard({ artwork, onClick, priority = false }: ArtworkCardProps) {
  const [loaded, setLoaded] = useState(false)
  const label = artwork.year ? `${artwork.title}, ${artwork.year}` : artwork.title

  const handleImageRef = (node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) {
      setLoaded(true)
    }
  }

  return (
    <article className="portfolio-item" data-reveal-item>
      <button
        type="button"
        className="portfolio-card"
        onClick={onClick}
        aria-label={`View ${artwork.title}`}
      >
        <div className={`portfolio-image-wrap ${styles.wrap} ${loaded ? styles.isLoaded : styles.isLoading}`}>
          {!loaded && (
            <div className={styles.loader} aria-hidden="true">
              <span className={styles.loaderSweep} />
              <span className={styles.loaderRing} />
            </div>
          )}
          <img
            ref={handleImageRef}
            data-reveal-image
            className={loaded ? styles.imageLoaded : styles.imagePending}
            src={artwork.thumbnail}
            alt={getArtworkAlt(artwork)}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
          />
        </div>
        <p className="portfolio-caption" data-reveal-caption>
          {label}
        </p>
      </button>
    </article>
  )
}
