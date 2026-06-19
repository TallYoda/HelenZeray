export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-name">Helen Zeray</p>
          <p className="footer-tagline">Visual artist · Tel Aviv, Israel</p>
        </div>

        <div className="footer-contact">
          <a
            className="footer-contact-link"
            href="https://www.artamine.com/pages/artist/helen-zeray"
            target="_blank"
            rel="noreferrer"
          >
            <span>Artamine</span>
          </a>
        </div>
      </div>

      <p className="footer-copy">
        © {year} Helen Zeray. All rights reserved.
      </p>
    </footer>
  )
}
