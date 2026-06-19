import { useEffect } from 'react'
import { useLenis } from './useLenis'

const SECTION_IDS = ['works', 'press', 'exhibitions', 'about', 'contact'] as const
const HEADER_OFFSET = 96

export type ScrollSectionId = (typeof SECTION_IDS)[number] | ''

function getActiveSection(): ScrollSectionId {
  const scrollY = window.scrollY + HEADER_OFFSET

  for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
    const id = SECTION_IDS[i]
    const el = document.getElementById(id)
    if (el && scrollY >= el.offsetTop) {
      return id
    }
  }

  return ''
}

export function useScrollSpy(onChange: (id: ScrollSectionId) => void) {
  const lenis = useLenis()

  useEffect(() => {
    let frame = 0

    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        onChange(getActiveSection())
      })
    }

    update()

    if (lenis) {
      lenis.on('scroll', update)
      return () => {
        lenis.off('scroll', update)
        cancelAnimationFrame(frame)
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      cancelAnimationFrame(frame)
    }
  }, [lenis, onChange])
}
