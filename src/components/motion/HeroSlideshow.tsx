import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { heroSlides } from '../../data/heroSlides'
import { useHeroPreload } from '../../hooks/useHeroPreload'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { motionEase } from '../../utils/motion'
import HeroLoading from './HeroLoading'
import styles from './HeroSlideshow.module.css'

const DISPLAY_MS = 5200
const FADE_SEC = 2.4

type HeroSlideLayerProps = {
  slide: (typeof heroSlides)[number]
  isActive: boolean
  thumbReady: boolean
  fullReady: boolean
  reducedMotion: boolean
}

function HeroSlideLayer({
  slide,
  isActive,
  thumbReady,
  fullReady,
  reducedMotion,
}: HeroSlideLayerProps) {
  const thumbRef = useRef<HTMLImageElement>(null)
  const fullRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (reducedMotion || !fullReady || !fullRef.current) return

    const thumb = thumbRef.current
    const full = fullRef.current

    const ctx = gsap.context(() => {
      gsap.fromTo(full, { opacity: 0 }, { opacity: 1, duration: 1.35, ease: motionEase.entry })
      if (thumb) {
        gsap.to(thumb, { opacity: 0, duration: 1.35, ease: motionEase.exit })
      }
    })

    return () => ctx.revert()
  }, [fullReady, reducedMotion])

  const backdropImage = fullReady ? slide.src : thumbReady ? slide.thumb : undefined

  return (
    <>
      <div
        className={styles.backdrop}
        style={{ backgroundImage: backdropImage ? `url(${backdropImage})` : undefined }}
        aria-hidden="true"
      />
      <div className={styles.frame}>
        {thumbReady && (
          <img
            ref={thumbRef}
            className={styles.imageThumb}
            src={slide.thumb}
            alt=""
            aria-hidden="true"
            decoding="async"
            style={{ opacity: fullReady ? 0 : 1 }}
          />
        )}
        {fullReady && (
          <img
            ref={fullRef}
            className={styles.imageFull}
            src={slide.src}
            alt={isActive ? slide.alt : ''}
            decoding="async"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          />
        )}
      </div>
    </>
  )
}

export default function HeroSlideshow() {
  const rootRef = useRef<HTMLElement>(null)
  const slidesRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const initializedRef = useRef(false)
  const reducedMotion = useReducedMotion()
  const { loadedThumb, loadedFull, isInitialReady, findNextReady, findPrevReady } =
    useHeroPreload()

  activeIndexRef.current = activeIndex

  const applyTransition = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndexRef.current) return
      if (!loadedThumb.has(nextIndex) && !loadedFull.has(nextIndex)) return

      const slides = slidesRef.current?.querySelectorAll('[data-hero-slide]')
      if (!slides) return

      const current = slides[activeIndexRef.current] as HTMLElement
      const next = slides[nextIndex] as HTMLElement

      if (!reducedMotion) {
        gsap.killTweensOf(slides)

        gsap
          .timeline({ defaults: { duration: FADE_SEC, ease: motionEase.exit } })
          .to(current, { opacity: 0, scale: 1.02 }, 0)
          .fromTo(
            next,
            { opacity: 0, scale: 0.98 },
            { opacity: 1, scale: 1, ease: motionEase.entry },
            0,
          )
      }

      setActiveIndex(nextIndex)
    },
    [loadedThumb, loadedFull, reducedMotion],
  )

  const goNext = useCallback(() => {
    applyTransition(findNextReady(activeIndexRef.current))
  }, [applyTransition, findNextReady])

  const goPrev = useCallback(() => {
    applyTransition(findPrevReady(activeIndexRef.current))
  }, [applyTransition, findPrevReady])

  useEffect(() => {
    const slides = slidesRef.current?.querySelectorAll('[data-hero-slide]')
    if (!slides || initializedRef.current) return

    slides.forEach((slide, index) => {
      gsap.set(slide, {
        opacity: index === 0 ? 1 : 0,
        scale: 1,
      })
    })
    initializedRef.current = true
  }, [])

  useEffect(() => {
    if (!isInitialReady || reducedMotion) return

    const slides = slidesRef.current?.querySelectorAll('[data-hero-slide]')
    const first = slides?.[0] as HTMLElement | undefined
    if (!first) return

    gsap.fromTo(
      first,
      { opacity: 0, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 1.4, ease: motionEase.entry },
    )
  }, [isInitialReady, reducedMotion])

  useEffect(() => {
    if (heroSlides.length < 2) return

    const id = window.setInterval(() => {
      applyTransition(findNextReady(activeIndexRef.current))
    }, DISPLAY_MS)

    return () => window.clearInterval(id)
  }, [applyTransition, findNextReady])

  useEffect(() => {
    if (!reducedMotion) return

    const slides = slidesRef.current?.querySelectorAll('[data-hero-slide]')
    slides?.forEach((slide, index) => {
      ;(slide as HTMLElement).style.opacity = index === activeIndex ? '1' : '0'
    })
  }, [activeIndex, reducedMotion])

  return (
    <section ref={rootRef} className={styles.hero} id="top" aria-label="Featured works">
      <HeroLoading visible={!isInitialReady} />

      <div ref={slidesRef} className={styles.slides}>
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
            <HeroSlideLayer
              slide={slide}
              isActive={index === activeIndex}
              thumbReady={loadedThumb.has(index)}
              fullReady={loadedFull.has(index)}
              reducedMotion={reducedMotion}
            />
          </div>
        ))}
      </div>

      <div className={styles.veil} aria-hidden="true" />

      <div className={styles.controls}>
        <button type="button" className={styles.control} onClick={goPrev} aria-label="Previous slide">
          ‹
        </button>
        <button type="button" className={styles.control} onClick={goNext} aria-label="Next slide">
          ›
        </button>
      </div>
    </section>
  )
}
