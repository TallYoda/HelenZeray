import type { Artwork } from '../../types/artwork'
import { getArtworkAlt } from '../../utils/image'

type ArtworkCardProps = {
  artwork: Artwork
  onClick: () => void
}

export default function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  const label = artwork.year ? `${artwork.title}, ${artwork.year}` : artwork.title

  return (
    <article className="portfolio-item" data-reveal-item>
      <button
        type="button"
        className="portfolio-card"
        onClick={onClick}
        aria-label={`View ${artwork.title}`}
      >
        <div className="portfolio-image-wrap">
          <img
            data-reveal-image
            src={artwork.thumbnail}
            alt={getArtworkAlt(artwork)}
            loading="lazy"
            decoding="async"
          />
        </div>
        <p className="portfolio-caption" data-reveal-caption>
          {label}
        </p>
      </button>
    </article>
  )
}
