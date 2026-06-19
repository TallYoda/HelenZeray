import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { motionEase, motionScrub } from '../../utils/motion'
import styles from './ScrollHero.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(content, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        content,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.25,
          ease: motionEase.entry,
          delay: 0.12,
        },
      )

      gsap.to(content, {
        y: -36,
        ease: motionEase.scroll,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: motionScrub.cinematic,
        },
      })

      const background = section.querySelector('[data-hero-bg]')
      if (background) {
        gsap.to(background, {
          y: 48,
          ease: motionEase.scroll,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: motionScrub.parallax,
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className={styles.hero} id="top">
      <div className={styles.bg} data-hero-bg aria-hidden="true" />
      <div ref={contentRef} className={styles.inner}>
        <p className={styles.eyebrow}>Painter · Portraiture · Psychology</p>
        <h1 className={styles.title}>
          Helen Zeray is a contemporary painter based in Tel Aviv, originally
          from Addis Ababa. Her work examines human psychology, identity, and
          the tension between how we present ourselves and what emerges in
          unguarded moments.
        </h1>
        <p className={styles.lede}>
          Working in oil and acrylic on canvas, she traces the subtle language
          of gesture and expression — transforming everyday figures into
          luminous, symbolic portraits where emotion, vulnerability, and
          self-representation intersect.
        </p>
      </div>
    </section>
  )
}
