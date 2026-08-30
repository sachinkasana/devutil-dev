import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'UUID Generator Online — Free UUID v4 & v7 Generator | DevUtil'
  },
  description: 'Generate UUID v4 (random) and UUID v7 (time-ordered) identifiers instantly. Bulk generate up to 500 UUIDs in one click. Free, no login, 100% client-side UUID generator.',
  keywords: [
    'uuid generator online',
    'generate uuid online',
    'uuid v4 generator',
    'uuid v7 generator',
    'random uuid generator',
    'guid generator online',
    'bulk uuid generator',
    'free uuid generator'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/uuid-generator'
  },
  openGraph: {
    title: 'UUID Generator Online — Free UUID v4 & v7 Generator',
    description: 'Generate UUID v4 (random) and UUID v7 (time-ordered) instantly. Bulk generate up to 500 UUIDs. Free, client-side.',
    url: 'https://www.devutil.dev/uuid-generator',
    type: 'website',
    siteName: 'DevUtil',
    images: [
      {
        url: 'https://www.devutil.dev/images/uuid-generator.png',
        width: 1200,
        height: 630,
        alt: 'DevUtil'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UUID Generator Online — Free UUID v4 & v7 Generator',
    description: 'Generate UUID v4 (random) and UUID v7 (time-ordered) instantly. Bulk generate up to 500 UUIDs. Free, client-side.',
    images: ['https://www.devutil.dev/images/uuid-generator.png']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'UUID v4 & v7 Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.devutil.dev/uuid-generator',
  description: 'Free UUID v4 and v7 (time-ordered) generator with fast client-side processing.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
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
