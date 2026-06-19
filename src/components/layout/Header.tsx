import { useEffect, useState, type MouseEvent } from 'react'
import { useLenis } from '../../hooks/useLenis'

const HEADER_OFFSET = -72

const navItems = [
  { href: '#works', label: 'Works', id: 'works' },
  { href: '#press', label: 'Press', id: 'press' },
  { href: '#exhibitions', label: 'Exhibitions', id: 'exhibitions' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#contact', label: 'Contact', id: 'contact' },
] as const

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState(() => {
    const hash = window.location.hash ? window.location.hash.slice(1) : 'works'
    return hash || 'works'
  })
  const lenis = useLenis()

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash ? window.location.hash.slice(1) : 'works'
      setActiveId(hash || 'works')
    }

    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const handleClose = () => setIsOpen(false)

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    if (!href.startsWith('#')) return

    event.preventDefault()
    handleClose()
    setActiveId(id)
    window.history.pushState(null, '', href)

    const target = document.getElementById(id)
    if (!target) return

    if (lenis) {
      lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.2 })
      return
    }

    target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="site-header site-header--light">
      <div className="header-inner">
        <a
          className="brand"
          href="#works"
          onClick={(event) => handleNavClick(event, '#works', 'works')}
        >
          Helen Zeray
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav ${isOpen ? 'is-open' : ''}`}>
          {navItems.map(({ href, label, id }) => (
            <a
              key={id}
              href={href}
              className={activeId === id ? 'is-active' : undefined}
              onClick={(event) => handleNavClick(event, href, id)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
