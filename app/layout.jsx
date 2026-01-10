import './globals.css';

export const metadata = {
  metadataBase: new URL('https://devutil.dev'),
  title: {
    default: 'DevUtil',
    template: '%s | DevUtil'
  },
  description: 'Essential developer tools and utilities for developers.',
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
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-slate-900 px-3 py-2 rounded shadow"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
