import { soloExhibitions, groupExhibitions, education } from '../../data/cv'

type CvGroupProps = {
  title: string
  items: { year: string; text: string }[]
}

function CvGroup({ title, items }: CvGroupProps) {
  return (
    <div className="cv-group">
      <p className="cv-title">{title}</p>
      <ul className="cv-list">
        {items.map((item) => (
          <li key={item.text}>
            <span className="cv-year">{item.year}</span>
            <span className="cv-entry">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CV() {
  return (
    <div className="cv-layout">
      <div className="cv-grid">
        <CvGroup title="Solo Exhibitions" items={soloExhibitions} />
        <CvGroup title="Group Exhibitions" items={groupExhibitions} />
        <CvGroup title="Education" items={education} />
      </div>
    </div>
  )
}
