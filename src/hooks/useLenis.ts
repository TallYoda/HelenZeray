import { useContext } from 'react'
import { LenisContext } from '../providers/LenisContext'

export function useLenis() {
  return useContext(LenisContext)
}
