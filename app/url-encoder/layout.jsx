import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'URL Encoder & Decoder Online — Free, Instant, No Upload | DevUtil'
  },
  description: 'Encode or decode URLs instantly in your browser. Percent-encode query strings, fix broken links, and debug redirects. Free — your data never leaves your device.',
  keywords: [
    'url encoder',
    'url decoder',
    'encode url',
    'decode url',
    'percent encoding',
    'query string encoder',
    'urlencode',
    'url decode online',
    'uri encoder',
    'encodeuri',
    'encodeuricomponent',
    'url encode free'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/url-encoder'
  },
  openGraph: {
    title: 'URL Encoder & Decoder Online — Free, Instant, No Upload',
    description: 'Encode or decode URLs instantly in your browser. Percent-encode query strings, debug redirects. Free — data never uploaded.',
    url: 'https://www.devutil.dev/url-encoder',
    type: 'website',
    siteName: 'DevUtil',
    images: [
      {
        url: 'https://www.devutil.dev/images/url-encoder.png',
        width: 1200,
        height: 630,
        alt: 'DevUtil'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Encoder & Decoder Online — Free, Instant, No Upload',
    description: 'Encode or decode URLs instantly in your browser. Percent-encode query strings, debug redirects. Free — data never uploaded.',
    images: ['https://www.devutil.dev/images/url-encoder.png']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'URL Encoder',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.devutil.dev/url-encoder',
  description: 'Free URL encoder and decoder with fast client-side processing.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  }
};

export default function UrlEncoderLayout({ children }) {
  return (
    <>
      <Script
        id="url-encoder-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
