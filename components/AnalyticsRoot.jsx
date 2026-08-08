import Script from 'next/script';
import { Suspense } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import {
  GA_ID,
  UMAMI_SCRIPT_URL,
  UMAMI_WEBSITE_ID
} from '../lib/analytics-config';
import Analytics from './Analytics';

/**
 * Loads GA4 + Umami tags and mounts client-side SPA/event tracking.
 * IDs must come from a non-client module so Script tags get real strings.
 */
export default function AnalyticsRoot() {
  return (
    <>
      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                anonymize_ip: true,
                send_page_view: false
              });
            `}
          </Script>
        </>
      ) : null}

      {UMAMI_WEBSITE_ID ? (
        <Script
          defer
          src={UMAMI_SCRIPT_URL}
          data-website-id={UMAMI_WEBSITE_ID}
          data-domains="devutil.dev,www.devutil.dev"
          strategy="afterInteractive"
        />
      ) : null}

      <Suspense fallback={null}>
        <Analytics />
      </Suspense>

      <VercelAnalytics />
    </>
  );
}
