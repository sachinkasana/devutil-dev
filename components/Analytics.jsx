'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_ID = 'G-60HX9JGQBJ';

const trackEvent = (eventName, label) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, {
    event_category: 'engagement',
    event_label: label || undefined
  });
};

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    window.gtag('config', GA_ID, { page_path: url });
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target?.closest?.('[data-analytics-event]');
      if (!target) return;
      const eventName = target.getAttribute('data-analytics-event');
      const label = target.getAttribute('data-analytics-label') || target.textContent?.trim();
      if (eventName) {
        trackEvent(eventName, label);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
