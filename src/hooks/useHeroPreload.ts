import { useEffect, useState } from 'react'
import { heroSlides } from '../data/heroSlides'

export function useHeroPreload() {
  const [loadedThumb, setLoadedThumb] = useState<ReadonlySet<number>>(() => new Set())
  const [loadedFull, setLoadedFull] = useState<ReadonlySet<number>>(() => new Set())

  useEffect(() => {
    const markThumb = (index: number) => {
      setLoadedThumb((prev) => {
        if (prev.has(index)) return prev
        const next = new Set(prev)
        next.add(index)
        return next
      })
    }

    const markFull = (index: number) => {
      setLoadedFull((prev) => {
        if (prev.has(index)) return prev
        const next = new Set(prev)
        next.add(index)
        return next
      })
    }

    const cleaners: Array<() => void> = []

    heroSlides.forEach((slide, index) => {
      const thumb = new Image()
      thumb.decoding = 'async'
      thumb.src = slide.thumb
      if (thumb.complete) markThumb(index)
      else {
        thumb.onload = () => markThumb(index)
        thumb.onerror = () => markThumb(index)
      }

      const full = new Image()
      full.decoding = 'async'
      full.src = slide.src
      if (full.complete) markFull(index)
      else {
        full.onload = () => markFull(index)
        full.onerror = () => markFull(index)
      }

      cleaners.push(() => {
        thumb.onload = null
        thumb.onerror = null
        full.onload = null
        full.onerror = null
      })
    })

    return () => cleaners.forEach((clean) => clean())
  }, [])

  const findNextReady = (current: number, preferFull = true) => {
    const pool = preferFull ? loadedFull : loadedThumb
    for (let step = 1; step <= heroSlides.length; step++) {
      const index = (current + step) % heroSlides.length
      if (pool.has(index)) return index
    }

    if (preferFull) return findNextReady(current, false)
    return current
  }

  const findPrevReady = (current: number, preferFull = true) => {
    const pool = preferFull ? loadedFull : loadedThumb
    for (let step = 1; step <= heroSlides.length; step++) {
      const index = (current - step + heroSlides.length) % heroSlides.length
      if (pool.has(index)) return index
    }

    if (preferFull) return findPrevReady(current, false)
    return current
  }

  const isInitialReady = loadedThumb.has(0) || loadedFull.has(0)

  return {
    loadedThumb,
    loadedFull,
    isInitialReady,
    findNextReady,
    findPrevReady,
    total: heroSlides.length,
  }
}
