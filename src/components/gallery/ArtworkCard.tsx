import type { Artwork } from '../../types/artwork'
import { getArtworkAlt } from '../../utils/image'

type ArtworkCardProps = {
  artwork: Artwork
  onClick: () => void
  showInstallationDetails?: boolean
  installationPair?: boolean
}

export default function ArtworkCard({
  artwork,
  onClick,
  showInstallationDetails = false,
  installationPair = false,
}: ArtworkCardProps) {
  const meta = [artwork.medium, artwork.dimensions, artwork.year]
    .filter(Boolean)
    .join(' · ')

  return (
    <div
      className={[
        'portfolio-item',
        showInstallationDetails ? 'portfolio-item--installation' : '',
        installationPair ? 'portfolio-item--installation-pair' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="card">
        <button
          type="button"
          className="card-img-wrapper"
          onClick={onClick}
          aria-label={`View ${artwork.title}`}
        >
          <img
            src={artwork.thumbnail}
            alt={getArtworkAlt(artwork)}
            loading="lazy"
            decoding="async"
          />
        </button>

        <div className="card-body">
          <h3 className="card-title">{artwork.title}</h3>
          {artwork.available && (
            <p className="card-availability">Available for sale</p>
          )}
          {meta && <p className="card-text">{meta}</p>}
          {showInstallationDetails && artwork.description && (
            <p className="card-description">{artwork.description}</p>
          )}
          <button
            type="button"
            className="portfolio-view-btn"
            onClick={onClick}
          >
            View work
          </button>
        </div>
      </div>
    </div>
  )
}
