import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Artwork } from '../../types/artwork'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { motionEase, motionScrub } from '../../utils/motion'
import styles from './ScrollGallery.module.css'

gsap.registerPlugin(ScrollTrigger)

type ScrollGalleryProps = {
  artworks: Artwork[]
  onSelect?: (artwork: Artwork) => void
}

export default function ScrollGallery({ artworks, onSelect }: ScrollGalleryProps) {
  const rootRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion) return

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-slide]'))

      slides.forEach((slide, index) => {
        const image = slide.querySelector('[data-image]')
        const text = slide.querySelector('[data-text]')
        const imageWrap = slide.querySelector('[data-image-wrap]')
        const isLast = index === slides.length - 1

        if (imageWrap) {
          gsap.to(imageWrap, {
            yPercent: 12,
            ease: motionEase.scroll,
            scrollTrigger: {
              trigger: slide,
              start: 'top bottom',
              end: 'bottom top',
              scrub: motionScrub.parallax,
            },
          })
        }

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.1, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              ease: motionEase.scroll,
              scrollTrigger: {
                trigger: slide,
                start: 'top bottom',
                end: 'top 38%',
                scrub: motionScrub.cinematic,
              },
            },
          )

          if (!isLast) {
            gsap.to(image, {
              scale: 0.98,
              opacity: 0,
              ease: motionEase.scroll,
              scrollTrigger: {
                trigger: slide,
                start: 'bottom 58%',
                end: 'bottom top',
                scrub: motionScrub.cinematic,
              },
            })
          }
        }

        if (text) {
          gsap.fromTo(
            text,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: motionEase.scroll,
              scrollTrigger: {
                trigger: slide,
                start: 'top 78%',
                end: 'top 42%',
                scrub: motionScrub.text,
              },
            },
          )

          if (!isLast) {
            gsap.to(text, {
              y: -18,
              opacity: 0,
              ease: motionEase.scroll,
              scrollTrigger: {
                trigger: slide,
                start: 'bottom 68%',
                end: 'bottom top',
                scrub: motionScrub.text,
              },
            })
          }
        }
      })
    }, root)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    const images = root.querySelectorAll('img')
    images.forEach((img) => {
      if (img.complete) return
      img.addEventListener('load', refresh, { once: true })
    })

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [artworks, reducedMotion])

  if (reducedMotion) {
    return (
      <section ref={rootRef} className={styles.gallery} aria-label="Works gallery">
        <div className={styles.intro}>
          <p className={styles.introLabel}>Selected works</p>
          <h2 className={styles.introTitle}>Works</h2>
          <p className={styles.introCopy}>
            Oil and acrylic on canvas — intimate figurative portraits exploring
            gesture, identity, and the psychology of unguarded expression.
          </p>
        </div>
        <div className={styles.staticList}>
          {artworks.map((artwork) => (
            <article key={artwork.id} className={styles.staticSlide}>
              <button
                type="button"
                className={styles.imageButton}
                onClick={() => onSelect?.(artwork)}
                aria-label={`View ${artwork.title}`}
              >
                <img src={artwork.full} alt={artwork.title} loading="lazy" decoding="async" />
              </button>
              <div className={styles.meta}>
                <p className={styles.label}>{artwork.year ?? '—'}</p>
                <h3 className={styles.title}>{artwork.title}</h3>
                <p className={styles.medium}>{artwork.medium}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={rootRef} className={styles.gallery} aria-label="Works gallery">
      <div className={styles.intro}>
        <p className={styles.introLabel}>Selected works</p>
        <h2 className={styles.introTitle}>Works</h2>
        <p className={styles.introCopy}>
          Oil and acrylic on canvas — intimate figurative portraits exploring
          gesture, identity, and the psychology of unguarded expression.
        </p>
      </div>

      {artworks.map((artwork) => (
        <article key={artwork.id} className={styles.slide} data-slide>
          <div className={styles.sticky}>
            <div className={styles.media} data-image-wrap>
              <button
                type="button"
                className={styles.imageButton}
                onClick={() => onSelect?.(artwork)}
                aria-label={`View ${artwork.title}`}
              >
                <img
                  data-image
                  src={artwork.full}
                  alt={artwork.title}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </div>
            <div className={styles.meta} data-text>
              <p className={styles.label}>{artwork.year ?? '—'}</p>
              <h3 className={styles.title}>{artwork.title}</h3>
              <p className={styles.medium}>{artwork.medium}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
