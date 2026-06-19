import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from './useLenis'

const HEADER_OFFSET = -96

export function useHashScroll() {
  const { hash, pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (pathname !== '/' || !hash) return

    const id = hash.slice(1)
    const target = document.getElementById(id)
    if (!target) return

    requestAnimationFrame(() => {
      if (lenis) {
        lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.4 })
        return
      }

      target.scrollIntoView({ behavior: 'smooth' })
    })
  }, [hash, pathname, lenis])
}
