import { biographyParagraphs } from '../../data/biography'

export default function Biography() {
  return (
    <div className="about-block">
      {biographyParagraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  )
}
