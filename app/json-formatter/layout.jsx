import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Free JSON Formatter Online - Fast & Private | DevUtil'
  },
  description: 'Free JSON formatter to validate, beautify, and repair JSON client-side with privacy, no signup, and instant results for API payloads and configs online.',
  keywords: [
    'json formatter',
    'json beautifier',
    'json validator',
    'pretty print json',
    'json minifier',
    'format json online',
    'fix json',
    'json repair',
    'json editor',
    'json lint',
    'json parser'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/json-formatter'
  },
  openGraph: {
    title: 'Free JSON Formatter Online - Fast & Private | DevUtil',
    description: 'Free JSON formatter to validate, beautify, and repair JSON client-side with privacy, no signup, and instant results for API payloads and configs online.',
    url: 'https://www.devutil.dev/json-formatter',
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
    title: 'Free JSON Formatter Online - Fast & Private | DevUtil',
    description: 'Free JSON formatter to validate, beautify, and repair JSON client-side with privacy, no signup, and instant results for API payloads and configs online.',
    images: ['https://www.devutil.dev/og.png']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JSON Formatter',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.devutil.dev/json-formatter',
  description: 'Free JSON formatter to validate, beautify, and repair JSON client-side with privacy and instant results.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1820'
  }
};

export default function JsonFormatterLayout({ children }) {
  return (
    <>
      <Script
        id="json-formatter-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
