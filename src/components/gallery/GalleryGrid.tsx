import type { Artwork } from '../../types/artwork'
import ArtworkCard from './ArtworkCard'

type GalleryGridProps = {
  artworks: Artwork[]
  onSelect: (artwork: Artwork) => void
}

export default function GalleryGrid({ artworks, onSelect }: GalleryGridProps) {
  if (artworks.length === 0) return null

  return (
    <div className="portfolio-grid" aria-label="Paintings">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          onClick={() => onSelect(artwork)}
        />
      ))}
    </div>
  )
}
