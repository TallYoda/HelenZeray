import type { FormEvent } from 'react'
import { useState } from 'react'

const UNDER_CONSTRUCTION_MESSAGE =
  'The contact form is still under construction. Please reach out via Instagram @helenzeray1 in the meantime.'

export default function ContactForm() {
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedback(UNDER_CONSTRUCTION_MESSAGE)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input type="text" name="user_name" required />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="user_email" required />
      </label>
      <label className="full">
        <span>Message</span>
        <textarea name="message" rows={6} required />
      </label>
      <div className="form-actions">
        <button type="submit">Send message</button>
        {feedback && <p className="form-feedback info">{feedback}</p>}
      </div>
    </form>
  )
}
