import type { Artwork } from '../types/artwork'

export function getArtworkAlt(artwork: Artwork) {
  return `${artwork.title} — ${artwork.medium}`
}

