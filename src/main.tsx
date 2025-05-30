import React from 'react'
import { createRoot } from 'react-dom/client'
import QuoteForm from './components/QuoteForm'

// Inicializa EmailJS
import emailjs from '@emailjs/browser'
emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID)

// Monta tu formulario en el div#root
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <QuoteForm />
    </React.StrictMode>
  )
}
