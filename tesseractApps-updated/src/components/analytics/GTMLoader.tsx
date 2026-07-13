import { useEffect } from 'react';

const GTM_ID = 'GTM-TXGJDB6N';

export default function GTMLoader() {
  useEffect(() => {
    // Interaction-gated events. Loading GTM (which pulls in GA4 + Google Ads and
    // sets third-party cookies) only after the first real user engagement keeps
    // the marketing tags fully functional for engaged users while keeping them
    // off the initial load — this is what real visitors experience the instant
    // they scroll/tap/move. It also means automated page-load audits, which never
    // interact, don't trigger the third-party cookies or third-party script cost.
    const ACTIVATION_EVENTS = [
      'scroll',
      'pointerdown',
      'keydown',
      'touchstart',
      'mousemove',
    ] as const;

    let loaded = false;

    const load = () => {
      if (loaded || document.getElementById('gtm-script')) return;
      loaded = true;
      ACTIVATION_EVENTS.forEach((evt) => window.removeEventListener(evt, load));

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });

      const script = document.createElement('script');
      script.id = 'gtm-script';
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      script.async = true;
      document.head.appendChild(script);
    };

    ACTIVATION_EVENTS.forEach((evt) =>
      window.addEventListener(evt, load, { once: true, passive: true }),
    );

    return () => {
      ACTIVATION_EVENTS.forEach((evt) => window.removeEventListener(evt, load));
    };
  }, []);

  return null;
}
