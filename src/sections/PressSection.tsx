import { useState } from 'react'
import { createPortal } from 'react-dom'
import Section from '../components/layout/Section'
import { publications } from '../data/publications'

export default function PressSection() {
  const [activePreview, setActivePreview] = useState<string | null>(null)
  const activeItem = publications.find((item) => item.id === activePreview)

  const clearPreview = (currentTarget: HTMLElement, relatedTarget: EventTarget | null) => {
    if (relatedTarget instanceof Node && currentTarget.contains(relatedTarget)) {
      return
    }
    setActivePreview(null)
  }

  return (
    <>
      {activeItem &&
        createPortal(
          <div className="press-preview-overlay" aria-hidden="true">
            <img
              src={activeItem.previewImage}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>,
          document.body,
        )}

      <Section id="press" className="press-section">
        <div className="section-header">
          <h2>Press</h2>
        </div>

        <div className="press-list">
          {publications.map((item) => (
            <article
              key={item.id}
              className="press-card"
              onMouseEnter={() => setActivePreview(item.id)}
              onMouseLeave={() => setActivePreview(null)}
              onFocusCapture={() => setActivePreview(item.id)}
              onBlurCapture={(event) =>
                clearPreview(event.currentTarget, event.relatedTarget)
              }
            >
              <div className="press-card-content">
                <p className="press-meta">
                  {item.outlet} · {item.year}
                </p>
                <h3>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                </h3>
                <a
                  className="press-link"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read article
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  )
}
