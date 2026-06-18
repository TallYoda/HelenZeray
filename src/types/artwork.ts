export type ArtworkCategory = 'painting'

export type Artwork = {
  id: string
  title: string
  medium: string
  dimensions?: string
  year?: string
  description?: string
  category: ArtworkCategory
  available: boolean
  thumbnail: string
  full: string
  colSpan: number
  rowSpan: number
}
