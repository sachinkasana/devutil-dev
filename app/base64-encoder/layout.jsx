import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Free Base64 Encoder Online - Fast & Private | DevUtil'
  },
  description: 'Free Base64 encoder/decoder with client-side privacy, no signup, and instant results to encode text, JSON, or files online for developers. Fast in-browser tool.',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'base64 encode',
    'base64 decode',
    'base64 converter',
    'online base64',
    'data uri encoder',
    'base64 tool',
    'encode text',
    'decode text',
    'base64 file'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/base64-encoder'
  },
  openGraph: {
    title: 'Free Base64 Encoder Online - Fast & Private | DevUtil',
    description: 'Free Base64 encoder/decoder with client-side privacy, no signup, and instant results to encode text, JSON, or files online for developers. Fast in-browser tool.',
    url: 'https://www.devutil.dev/base64-encoder',
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
    title: 'Free Base64 Encoder Online - Fast & Private | DevUtil',
    description: 'Free Base64 encoder/decoder with client-side privacy, no signup, and instant results to encode text, JSON, or files online for developers. Fast in-browser tool.',
    images: ['https://www.devutil.dev/og.png']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Base64 Encoder',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.devutil.dev/base64-encoder',
  description: 'Free Base64 encoder and decoder with client-side privacy and instant results.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1510'
  }
};

export default function Base64EncoderLayout({ children }) {
  return (
    <>
      <Script
        id="base64-encoder-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
