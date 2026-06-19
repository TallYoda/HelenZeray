import { useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { lenisConfig } from '../utils/motion'
import { LenisContext } from './LenisContext'

gsap.registerPlugin(ScrollTrigger)

type LenisProviderProps = {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const reducedMotion = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      setLenis(null)
      return
    }

    const instance = new Lenis({
      duration: lenisConfig.duration,
      easing: lenisConfig.easing,
      smoothWheel: true,
      touchMultiplier: 1.15,
    })

    document.documentElement.classList.add('lenis', 'lenis-smooth')
    setLenis(instance)

    instance.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => {
      instance.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      instance.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      setLenis(null)
    }
  }, [reducedMotion])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
