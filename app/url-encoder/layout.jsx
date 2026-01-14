import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'URL Encoder Decoder - Encode & Decode URLs Online Free | DevUtil'
  },
  description: 'Free URL encoder and decoder. Encode or decode URLs and query strings instantly in your browser. Safe, fast, and 100% client-side.',
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
    'encodeuricomponent'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/url-encoder'
  },
  openGraph: {
    title: 'URL Encoder Decoder - Encode & Decode URLs Online Free | DevUtil',
    description: 'Free URL encoder and decoder. Encode or decode URLs and query strings instantly in your browser. Safe, fast, and 100% client-side.',
    url: 'https://www.devutil.dev/url-encoder',
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
    title: 'URL Encoder Decoder - Encode & Decode URLs Online Free | DevUtil',
    description: 'Free URL encoder and decoder. Encode or decode URLs and query strings instantly in your browser. Safe, fast, and 100% client-side.',
    images: ['https://www.devutil.dev/og.png']
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
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1198'
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
