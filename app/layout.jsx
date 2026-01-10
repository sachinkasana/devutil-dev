import './globals.css';
import Script from 'next/script';
import Analytics from '../components/Analytics';

export const metadata = {
  metadataBase: new URL('https://devutil.dev'),
  title: {
    default: 'DevUtil',
    template: '%s | DevUtil'
  },
  description: 'Essential developer tools and utilities for developers.',
  verification: {
    google: 'h1FX8R7sRO-6jVd0dATODfLF_ablZtF6f5BnxP1zxOc'
  },
  openGraph: {
    type: 'website',
    siteName: 'DevUtil',
    title: 'DevUtil',
    description: 'Essential developer tools and utilities for developers.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevUtil',
    description: 'Essential developer tools and utilities for developers.'
  },
  icons: {
    icon: '/favicon.svg'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-60HX9JGQBJ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-60HX9JGQBJ');
          `}
        </Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-slate-900 px-3 py-2 rounded shadow"
        >
          Skip to content
        </a>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
