import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Unix Timestamp Converter - Convert Timestamps to Dates | DevUtil'
  },
  description: 'Convert Unix timestamps to readable dates instantly. Free timestamp converter for seconds or milliseconds with client-side processing and quick copy.',
  keywords: [
    'timestamp converter',
    'unix timestamp',
    'epoch converter',
    'timestamp to date',
    'date to timestamp',
    'epoch time',
    'unix time converter',
    'convert timestamp',
    'ms to date',
    'seconds to date',
    'time converter'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/timestamp-converter'
  },
  openGraph: {
    title: 'Unix Timestamp Converter - Convert Timestamps to Dates | DevUtil',
    description: 'Convert Unix timestamps to readable dates instantly. Free timestamp converter for seconds or milliseconds with client-side processing and quick copy.',
    url: 'https://www.devutil.dev/timestamp-converter',
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
    title: 'Unix Timestamp Converter - Convert Timestamps to Dates | DevUtil',
    description: 'Convert Unix timestamps to readable dates instantly. Free timestamp converter for seconds or milliseconds with client-side processing and quick copy.',
    images: ['https://www.devutil.dev/og.png']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Timestamp Converter',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.devutil.dev/timestamp-converter',
  description: 'Free Unix timestamp converter with fast client-side processing.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1106'
  }
};

export default function TimestampConverterLayout({ children }) {
  return (
    <>
      <Script
        id="timestamp-converter-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
