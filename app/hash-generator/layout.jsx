import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Free Hash Generator - MD5, SHA-1, SHA-256 Online Tool | DevUtil'
  },
  description: 'Free hash generator for MD5, SHA-1, SHA-256, and SHA-512. Hash text instantly in your browser with no uploads, no signup, and fast client-side processing.',
  keywords: [
    'hash generator',
    'md5 hash',
    'sha1 hash',
    'sha256 hash',
    'sha512 hash',
    'checksum tool',
    'hash text',
    'hash file',
    'hash online',
    'crypto hash',
    'generate hash'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/hash-generator'
  },
  openGraph: {
    title: 'Free Hash Generator - MD5, SHA-1, SHA-256 Online Tool | DevUtil',
    description: 'Free hash generator for MD5, SHA-1, SHA-256, and SHA-512. Hash text instantly in your browser with no uploads, no signup, and fast client-side processing.',
    url: 'https://www.devutil.dev/hash-generator',
    type: 'website',
    siteName: 'DevUtil',
    images: [
      {
        url: 'https://www.devutil.dev/og.png',
        width: 1200,
        height: 630,
        alt: 'DevUtil'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Hash Generator - MD5, SHA-1, SHA-256 Online Tool | DevUtil',
    description: 'Free hash generator for MD5, SHA-1, SHA-256, and SHA-512. Hash text instantly in your browser with no uploads, no signup, and fast client-side processing.',
    images: ['https://www.devutil.dev/og.png']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Hash Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.devutil.dev/hash-generator',
  description: 'Free hash generator for MD5, SHA-1, SHA-256, and SHA-512 with fast client-side processing.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1670'
  }
};

export default function HashGeneratorLayout({ children }) {
  return (
    <>
      <Script
        id="hash-generator-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
