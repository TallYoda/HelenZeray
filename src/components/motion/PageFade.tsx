import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { motionEase } from '../../utils/motion'

type PageFadeProps = {
  children: ReactNode
}

export default function PageFade({ children }: PageFadeProps) {
  const rootRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { opacity: 0 },
        { opacity: 1, duration: 1.1, ease: motionEase.entry },
      )
    }, root)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <main ref={rootRef} className="home-page home-page--editorial">
      {children}
    </main>
  )
}
