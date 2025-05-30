import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Inicializa EmailJS
import emailjs from '@emailjs/browser';
emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);

// Registra el SW (PWA)
import { registerSW } from 'virtual:pwa-register';
registerSW({ immediate: true });

// Monta tu App en #root
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
