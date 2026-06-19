import Section from '../components/layout/Section'
import ContactForm from '../components/contact/ContactForm'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  return (
    <Section id="contact" className="contact contact-split">
      <div className={styles.contactLayout}>
        <figure className={styles.artwork}>
          <img
            src="/works/paintings/full/unnamed-feelings.jpg"
            alt="unnamed feelings"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className={styles.formWrap}>
          <h2 className={styles.formTitle}>Get in Touch</h2>
          <ContactForm />
        </div>
      </div>
    </Section>
  )
}
