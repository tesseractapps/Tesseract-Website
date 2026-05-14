import { useEffect } from 'react';

const GTM_ID = 'GTM-TXGJDB6N';

export default function GTMLoader() {
  useEffect(() => {
    const load = () => {
      if (document.getElementById('gtm-script')) return;

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

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(load, { timeout: 1000 });
    } else {
      setTimeout(load, 1000);
    }
  }, []);

  return null;
}
