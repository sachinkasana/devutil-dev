import Script from 'next/script';

export const metadata = {
  title: 'Free UUID Generator Online - Fast & Private | DevUtil',
  description: 'Free UUID v4 generator with client-side privacy, no signup, and instant results to create unique IDs online for APIs, databases, and tests. Fast in-browser tool',
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
    canonical: '/uuid-generator'
  },
  openGraph: {
    title: 'Free UUID Generator Online - Fast & Private | DevUtil',
    description: 'Free UUID v4 generator with client-side privacy, no signup, and instant results to create unique IDs online for APIs, databases, and tests. Fast in-browser tool',
    url: '/uuid-generator',
    type: 'website',
    siteName: 'DevUtil',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'DevUtil'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free UUID Generator Online - Fast & Private | DevUtil',
    description: 'Free UUID v4 generator with client-side privacy, no signup, and instant results to create unique IDs online for APIs, databases, and tests. Fast in-browser tool',
    images: ['/og.png']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'UUID Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: 'https://devutil.dev/uuid-generator',
  description: 'Free UUID v4 generator with client-side privacy and instant results.',
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
