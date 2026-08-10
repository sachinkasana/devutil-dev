import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Unix Timestamp Converter Online — Epoch to Date Free | DevUtil'
  },
  description: 'Free Unix timestamp converter: epoch to date and date to epoch. Supports seconds and milliseconds. Instant, client-side — no signup.',
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
    title: 'Unix Timestamp Converter Online — Epoch to Date Free | DevUtil',
    description: 'Convert Unix timestamps to dates (and back) instantly. Seconds or milliseconds. Free client-side converter — no signup.',
    url: 'https://www.devutil.dev/timestamp-converter',
    type: 'website',
    siteName: 'DevUtil',
    images: [
      {
        url: 'https://www.devutil.dev/images/timestamp-converter.png',
        width: 1200,
        height: 630,
        alt: 'Unix timestamp converter'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unix Timestamp Converter Online — Epoch to Date Free | DevUtil',
    description: 'Convert Unix timestamps to dates (and back) instantly. Seconds or milliseconds. Free client-side converter — no signup.',
    images: ['https://www.devutil.dev/images/timestamp-converter.png']
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
