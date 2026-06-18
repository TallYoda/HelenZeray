import type { Artwork } from '../../types/artwork'
import ArtworkCard from './ArtworkCard'
import WorksCategoryIntro from './WorksCategoryIntro'

type GalleryGridProps = {
  artworks: Artwork[]
  onSelect: (artwork: Artwork) => void
}

export default function GalleryGrid({ artworks, onSelect }: GalleryGridProps) {
  if (artworks.length === 0) return null

  return (
    <div className="works-categories">
      <section className="works-category-group" aria-label="Paintings">
        <WorksCategoryIntro category="painting" isFirst />
        <div className="portfolio-grid">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onClick={() => onSelect(artwork)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
