// This optional code is used to register a service worker.
// register() is not called by default.

import { registerSW } from 'virtual:pwa-register';

export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    // The service worker URL is the same as the origin
    const updateSW = registerSW({
      onNeedRefresh() {
        const update = confirm('New content available. Reload?');
        if (update) {
          updateSW(true);
        }
      },
      onOfflineReady() {
        console.log('App ready to work offline');
      },
    });
  }
};