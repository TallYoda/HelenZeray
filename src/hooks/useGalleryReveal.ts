import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'
import { motionEase } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)

export function useGalleryReveal(containerRef: RefObject<HTMLElement | null>) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (reducedMotion) {
      gsap.set(container.querySelectorAll('[data-reveal-item], [data-reveal-divider]'), {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      })
      gsap.set(container.querySelectorAll('[data-reveal-image]'), { scale: 1 })
      gsap.set(container.querySelectorAll('[data-reveal-caption]'), { opacity: 1, y: 0 })
      return
    }

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const ctx = gsap.context(() => {
      const divider = container.querySelector('[data-reveal-divider]')
      if (divider) {
        gsap.fromTo(
          divider,
          { opacity: 0, y: isMobile ? 16 : 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: motionEase.entry,
            scrollTrigger: {
              trigger: divider,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          },
        )
      }

      const items = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll('[data-reveal-item]'),
      )

      items.forEach((item, index) => {
        const image = item.querySelector('[data-reveal-image]')
        const caption = item.querySelector('[data-reveal-caption]')
        const column = index % 3
        const xOffset = isMobile ? 0 : column === 0 ? -18 : column === 2 ? 18 : 0
        const yOffset = isMobile ? 22 : 36
        const delay = isMobile ? 0 : column * 0.1

        gsap.fromTo(
          item,
          { opacity: 0, y: yOffset, x: xOffset },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.95,
            delay,
            ease: motionEase.entry,
            scrollTrigger: {
              trigger: item,
              start: isMobile ? 'top 92%' : 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        )

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 1.15,
              delay: delay + 0.05,
              ease: motionEase.entry,
              scrollTrigger: {
                trigger: item,
                start: isMobile ? 'top 92%' : 'top 88%',
                toggleActions: 'play none none none',
              },
            },
          )
        }

        if (caption) {
          gsap.fromTo(
            caption,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: delay + 0.18,
              ease: motionEase.entry,
              scrollTrigger: {
                trigger: item,
                start: isMobile ? 'top 92%' : 'top 88%',
                toggleActions: 'play none none none',
              },
            },
          )
        }
      })
    }, container)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    container.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', refresh, { once: true })
    })

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [containerRef, reducedMotion])
}
