import type { ArtworkCategory } from '../types/artwork'

type WorkSection = {
  title: string
  description?: string
}

export const workSections: Record<ArtworkCategory, WorkSection> = {
  painting: {
    title: 'Paintings',
    description:
      'Oil and acrylic on canvas — intimate figurative portraits that trace the tension between self-presentation and unguarded emotion.',
  },
}
