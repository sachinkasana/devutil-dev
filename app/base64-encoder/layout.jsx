import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Free Base64 Encoder Decoder Online - Encode & Decode Base64 | DevUtil'
  },
  description: 'Free online Base64 encoder and decoder. Encode or decode text, JSON, or files instantly in your browser. 100% client-side, no signup or data upload.',
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
    title: 'Free Base64 Encoder Decoder Online - Encode & Decode Base64 | DevUtil',
    description: 'Free online Base64 encoder and decoder. Encode or decode text, JSON, or files instantly in your browser. 100% client-side, no signup or data upload.',
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
    title: 'Free Base64 Encoder Decoder Online - Encode & Decode Base64 | DevUtil',
    description: 'Free online Base64 encoder and decoder. Encode or decode text, JSON, or files instantly in your browser. 100% client-side, no signup or data upload.',
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
  description: 'Free online Base64 encoder and decoder with fast client-side processing.',
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
