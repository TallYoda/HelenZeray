import type { FormEvent } from 'react'
import { useState } from 'react'
import styles from './ContactForm.module.css'

const UNDER_CONSTRUCTION_MESSAGE =
  'The contact form is still under construction. Please check back soon.'

export default function ContactForm() {
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedback(UNDER_CONSTRUCTION_MESSAGE)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        <label>
          <span>First Name *</span>
          <input type="text" name="first_name" required autoComplete="given-name" />
        </label>
        <label>
          <span>Last Name</span>
          <input type="text" name="last_name" autoComplete="family-name" />
        </label>
        <label>
          <span>Email *</span>
          <input type="email" name="user_email" required autoComplete="email" />
        </label>
        <label>
          <span>Phone</span>
          <input type="tel" name="phone" autoComplete="tel" />
        </label>
      </div>

      <label className={styles.full}>
        <span>Message *</span>
        <textarea name="message" rows={5} required />
      </label>

      <div className={styles.actions}>
        <button type="submit">Submit</button>
        {feedback && <p className={styles.feedback}>{feedback}</p>}
      </div>
    </form>
  )
}
