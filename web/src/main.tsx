import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

async function retireLegacyOfflineCache() {
  const appScope = new URL('./', document.baseURI).href

  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(
      registrations
        .filter((registration) => registration.scope === appScope)
        .map((registration) => registration.unregister()),
    )
  }

  if ('caches' in window) {
    const cacheNames = await caches.keys()
    await Promise.all(
      cacheNames
        .filter((name) => name.startsWith('tt27-'))
        .map((name) => caches.delete(name)),
    )
  }
}

void retireLegacyOfflineCache().catch(() => {
  // Cache cleanup is best-effort and should never block the app.
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
