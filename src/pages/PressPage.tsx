import { Link } from 'react-router-dom'
import Section from '../components/layout/Section'
import { publications } from '../data/publications'

export default function PressPage() {
  return (
    <main id="top">
      <Section className="press-section">
        <div className="section-header">
          <div>
            <h2>Press</h2>
            <p className="section-eyebrow">Publications · Profiles · Interviews</p>
            <p>
              Selected features and editorial coverage. Helen&apos;s work has been
              profiled internationally through gallery platforms and editorial
              publications.
            </p>
          </div>
        </div>

        <div className="press-list">
          {publications.map((item) => (
            <article key={item.id} className="press-card">
              <p className="press-meta">
                {item.outlet} · {item.year}
              </p>
              <h3>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </h3>
              <p>{item.description}</p>
              <a
                className="press-link"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                Read article
              </a>
            </article>
          ))}
        </div>

        <p className="press-note">
          View the full painting portfolio on the{' '}
          <Link to="/works">Works</Link> page.
        </p>
      </Section>
    </main>
  )
}
