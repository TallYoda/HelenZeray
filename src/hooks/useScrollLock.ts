import { useEffect } from 'react'
import { useLenis } from './useLenis'

export function useScrollLock(isLocked: boolean) {
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      if (isLocked) {
        lenis.stop()
      } else {
        lenis.start()
      }
      return
    }

    if (!isLocked) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLocked, lenis])
}
