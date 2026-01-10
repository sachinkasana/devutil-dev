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
      <body>{children}</body>
    </html>
  );
}
