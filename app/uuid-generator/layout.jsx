import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'UUID Generator v4 - Generate Unique IDs Online Free | DevUtil'
  },
  description: 'Generate UUID v4 values instantly with a free online UUID generator. Fast, private, client-side tool for unique IDs you can copy or download.',
  keywords: [
    'uuid generator',
    'uuid v4',
    'guid generator',
    'unique id generator',
    'generate uuid',
    'uuid online',
    'uuid list',
    'random uuid',
    'uuid tool',
    'uuid v4 online',
    'create uuid'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/uuid-generator'
  },
  openGraph: {
    title: 'UUID Generator v4 - Generate Unique IDs Online Free | DevUtil',
    description: 'Generate UUID v4 values instantly with a free online UUID generator. Fast, private, client-side tool for unique IDs you can copy or download.',
    url: 'https://www.devutil.dev/uuid-generator',
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
    title: 'UUID Generator v4 - Generate Unique IDs Online Free | DevUtil',
    description: 'Generate UUID v4 values instantly with a free online UUID generator. Fast, private, client-side tool for unique IDs you can copy or download.',
    images: ['https://www.devutil.dev/og.png']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'UUID Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.devutil.dev/uuid-generator',
  description: 'Free UUID v4 generator with fast client-side processing.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1325'
  }
};

export default function UuidGeneratorLayout({ children }) {
  return (
    <>
      <Script
        id="uuid-generator-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
