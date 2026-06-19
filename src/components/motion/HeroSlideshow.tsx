import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { heroSlides } from '../../data/heroSlides'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { motionEase } from '../../utils/motion'
import styles from './HeroSlideshow.module.css'

const DISPLAY_MS = 5200
const FADE_SEC = 2.2

export default function HeroSlideshow() {
  const rootRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion || heroSlides.length < 2) return

    const slides = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-hero-slide]'))

    slides.forEach((slide, index) => {
      gsap.set(slide, { opacity: index === 0 ? 1 : 0 })
    })

    let index = 0
    let timeoutId = 0

    const goTo = (nextIndex: number) => {
      const current = slides[index]
      const next = slides[nextIndex]
      if (!current || !next) return

      gsap.to(current, {
        opacity: 0,
        duration: FADE_SEC,
        ease: motionEase.exit,
      })
      gsap.to(next, {
        opacity: 1,
        duration: FADE_SEC,
        ease: motionEase.entry,
      })

      index = nextIndex
      setActiveIndex(nextIndex)
    }

    const schedule = () => {
      timeoutId = window.setTimeout(() => {
        goTo((index + 1) % slides.length)
        schedule()
      }, DISPLAY_MS)
    }

    schedule()

    return () => {
      window.clearTimeout(timeoutId)
      gsap.killTweensOf(slides)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (!reducedMotion || heroSlides.length < 2) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length)
    }, DISPLAY_MS)

    return () => window.clearInterval(intervalId)
  }, [reducedMotion])

  return (
    <section ref={rootRef} className={styles.hero} id="top" aria-label="Featured works">
      <div className={styles.slides}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={[
              styles.slide,
              reducedMotion && index === activeIndex ? styles.isActive : '',
            ]
              .filter(Boolean)
              .join(' ')}
            data-hero-slide
            aria-hidden={index !== activeIndex}
          >
            <div
              className={styles.backdrop}
              style={{ backgroundImage: `url(${slide.src})` }}
              aria-hidden="true"
            />
            <div className={styles.frame}>
              <img src={slide.src} alt={slide.alt} decoding="async" fetchPriority={index === 0 ? 'high' : 'low'} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.veil} aria-hidden="true" />
    </section>
  )
}
