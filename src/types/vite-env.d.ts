
interface ImportMetaEnv {
  readonly VITE_EMAILJS_USER_ID: string
  readonly VITE_EMAILJS_SERVICE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_ID: string
  // añade aquí más VITE_… si las tienes
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
declare module 'virtual:pwa-register' {
  export function registerSW(options?: {
    immediate?: boolean
    onNeedRefresh?: (update: () => void) => void
    onOfflineReady?: () => void
  }): () => void
}