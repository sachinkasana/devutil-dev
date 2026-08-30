import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Base64 Encoder & Decoder Online — Free, Instant, Private | DevUtil'
  },
  description: 'Encode text or decode Base64 strings instantly in your browser. Supports standard and URL-safe Base64. No data uploaded — 100% client-side Base64 encoder and decoder. Free, no signup.',
  keywords: [
    'base64 encoder online',
    'base64 decoder online',
    'encode base64 online',
    'decode base64 string',
    'base64 converter free',
    'url safe base64',
    'base64 encode decode',
    'base64 online free'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/base64-encoder'
  },
  openGraph: {
    title: 'Base64 Encoder & Decoder Online — Free, Instant, Private',
    description: 'Encode text or decode Base64 strings instantly in your browser. Standard and URL-safe. No data uploaded.',
    url: 'https://www.devutil.dev/base64-encoder',
    type: 'website',
    siteName: 'DevUtil',
    images: [
      {
        url: 'https://www.devutil.dev/images/base64-encoder-decoder.png',
        width: 1200,
        height: 630,
        alt: 'DevUtil'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder & Decoder Online — Free, Instant, Private',
    description: 'Encode text or decode Base64 strings instantly in your browser. Standard and URL-safe. No data uploaded.',
    images: ['https://www.devutil.dev/images/base64-encoder-decoder.png']
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
