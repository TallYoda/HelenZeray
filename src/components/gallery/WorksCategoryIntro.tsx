import { workSections } from '../../data/workSections'
import type { ArtworkCategory } from '../../types/artwork'

type WorksCategoryIntroProps = {
  category: ArtworkCategory
  isFirst?: boolean
}

export default function WorksCategoryIntro({
  category,
  isFirst = false,
}: WorksCategoryIntroProps) {
  const section = workSections[category]

  return (
    <div
      className={[
        'works-category-intro',
        isFirst ? 'works-category-intro--first' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <h3>{section.title}</h3>
      {section.description && <p>{section.description}</p>}
    </div>
  )
}
