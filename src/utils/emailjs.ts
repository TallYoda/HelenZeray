import emailjs from '@emailjs/browser'

export async function sendContactForm(form: HTMLFormElement) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'Email service is not configured yet. Add EmailJS keys to continue.'
    )
  }

  return emailjs.sendForm(serviceId, templateId, form, { publicKey })
}

