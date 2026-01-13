import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Free URL Encoder Online - Fast & Private | DevUtil'
  },
  description: 'Free URL encoder/decoder with client-side privacy, no signup, and instant results to encode query strings online fast for developers and APIs. In-browser tool.',
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
    title: 'Free URL Encoder Online - Fast & Private | DevUtil',
    description: 'Free URL encoder/decoder with client-side privacy, no signup, and instant results to encode query strings online fast for developers and APIs. In-browser tool.',
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
    title: 'Free URL Encoder Online - Fast & Private | DevUtil',
    description: 'Free URL encoder/decoder with client-side privacy, no signup, and instant results to encode query strings online fast for developers and APIs. In-browser tool.',
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
  description: 'Free URL encoder and decoder with client-side privacy and instant results.',
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
