 // src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import emailjs from 'emailjs-com'


console.log('Env vars:', {
  user: import.meta.env.VITE_EMAILJS_USER_ID,
  svc: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  tpl: import.meta.env.VITE_EMAILJS_TEMPLATE_ID
})

// 1) Inicializa EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID)

// 2) Registra el service worker del plugin (sin bucles)
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

// 3) Renderiza tu App sólo UNA vez
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
