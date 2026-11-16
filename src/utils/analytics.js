// Sends an event to Google Analytics (gtag is loaded in public/index.html).
// Does nothing if gtag isn't available, e.g. in tests or with an ad blocker.
export function trackEvent(name, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}
