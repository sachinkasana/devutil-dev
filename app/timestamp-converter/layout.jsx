import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Free Timestamp Converter Online - Fast & Private | DevUtil'
  },
  description: 'Free timestamp converter with client-side privacy, no signup, and instant results to convert Unix time online for logs, APIs, and debugging. In-browser tool.',
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
    title: 'Free Timestamp Converter Online - Fast & Private | DevUtil',
    description: 'Free timestamp converter with client-side privacy, no signup, and instant results to convert Unix time online for logs, APIs, and debugging. In-browser tool.',
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
    title: 'Free Timestamp Converter Online - Fast & Private | DevUtil',
    description: 'Free timestamp converter with client-side privacy, no signup, and instant results to convert Unix time online for logs, APIs, and debugging. In-browser tool.',
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
  description: 'Free timestamp converter with client-side privacy and instant results.',
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
