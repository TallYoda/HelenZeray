import { useCallback, useEffect, useState } from 'react'
import type { Artwork } from '../types/artwork'

export function useLightbox(artworks: Artwork[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const activeIndex = activeId
    ? artworks.findIndex((artwork) => artwork.id === activeId)
    : -1
  const activeArtwork = activeIndex >= 0 ? artworks[activeIndex] : null

  const goNext = useCallback(() => {
    if (artworks.length === 0) return
    const nextIndex =
      activeIndex < 0 ? 0 : (activeIndex + 1) % artworks.length
    setActiveId(artworks[nextIndex].id)
  }, [activeIndex, artworks])

  const goPrev = useCallback(() => {
    if (artworks.length === 0) return
    const prevIndex =
      activeIndex < 0
        ? artworks.length - 1
        : (activeIndex - 1 + artworks.length) % artworks.length
    setActiveId(artworks[prevIndex].id)
  }, [activeIndex, artworks])

  useEffect(() => {
    if (!activeArtwork) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveId(null)
      }
      if (event.key === 'ArrowRight') {
        goNext()
      }
      if (event.key === 'ArrowLeft') {
        goPrev()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeArtwork, goNext, goPrev])

  return {
    activeArtwork,
    openArtwork: (artwork: Artwork) => setActiveId(artwork.id),
    closeArtwork: () => setActiveId(null),
    goNext,
    goPrev,
    canNavigate: artworks.length > 1,
  }
}
