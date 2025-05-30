// src/services/quoteService.ts
import emailjs from 'emailjs-com'

export async function sendQuote(form: HTMLFormElement) {
  return emailjs.sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    form,
    import.meta.env.VITE_EMAILJS_USER_ID
  )
}
