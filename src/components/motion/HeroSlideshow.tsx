import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { heroSlides } from '../../data/heroSlides'
import { useHeroPreload } from '../../hooks/useHeroPreload'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { motionEase } from '../../utils/motion'
import HeroLoading from './HeroLoading'
import styles from './HeroSlideshow.module.css'

const DISPLAY_MS = 5200
const FADE_SEC = 2.2

type HeroSlideLayerProps = {
  slide: (typeof heroSlides)[number]
  isActive: boolean
  thumbReady: boolean
  fullReady: boolean
}

function HeroSlideLayer({ slide, isActive, thumbReady, fullReady }: HeroSlideLayerProps) {
  const showThumb = thumbReady && !fullReady
  const showFull = fullReady

  return (
    <>
      <div
        className={styles.backdrop}
        style={{
          backgroundImage: showFull
            ? `url(${slide.src})`
            : thumbReady
              ? `url(${slide.thumb})`
              : undefined,
        }}
        aria-hidden="true"
      />
      <div className={styles.frame}>
        {showThumb && (
          <img
            className={styles.imageThumb}
            src={slide.thumb}
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        )}
        {showFull && (
          <img
            className={styles.imageFull}
            src={slide.src}
            alt={isActive ? slide.alt : ''}
            decoding="async"
          />
        )}
        {isActive && showThumb && !showFull && (
          <div className={styles.sharpening} aria-hidden="true">
            <span className={styles.sharpeningRing} />
          </div>
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
  const reducedMotion = useReducedMotion()
  const { loadedThumb, loadedFull, isInitialReady, findNextReady, findPrevReady } =
    useHeroPreload()

  activeIndexRef.current = activeIndex

  const applyTransition = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndexRef.current) return
      if (!loadedThumb.has(nextIndex) && !loadedFull.has(nextIndex)) return

      const slides = slidesRef.current?.querySelectorAll('[data-hero-slide]')
      if (slides && !reducedMotion) {
        const current = slides[activeIndexRef.current] as HTMLElement
        const next = slides[nextIndex] as HTMLElement
        gsap.to(current, { opacity: 0, duration: FADE_SEC, ease: motionEase.exit })
        gsap.to(next, { opacity: 1, duration: FADE_SEC, ease: motionEase.entry })
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
    if (heroSlides.length < 2) return

    const id = window.setInterval(() => {
      applyTransition(findNextReady(activeIndexRef.current))
    }, DISPLAY_MS)

    return () => window.clearInterval(id)
  }, [applyTransition, findNextReady])

  useEffect(() => {
    const slides = slidesRef.current?.querySelectorAll('[data-hero-slide]')
    if (!slides) return

    slides.forEach((slide, index) => {
      const opacity = index === activeIndex ? 1 : 0
      if (reducedMotion) {
        ;(slide as HTMLElement).style.opacity = String(opacity)
      } else {
        gsap.set(slide, { opacity })
      }
    })
  }, [activeIndex, reducedMotion, isInitialReady])

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
