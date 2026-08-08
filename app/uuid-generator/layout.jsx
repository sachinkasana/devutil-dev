import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'UUID v4 & v7 Generator - Generate Unique IDs Online Free | DevUtil'
  },
  description: 'Generate UUID v4 and UUID v7 (time-ordered) or GUID values instantly. Free online UUID generator — bulk create up to 500 IDs, fully client-side.',
  keywords: [
    'uuid generator',
    'uuid v4',
    'uuid v7',
    'guid generator',
    'unique id generator',
    'generate uuid',
    'uuid online',
    'uuid list',
    'random uuid',
    'uuid tool',
    'uuid v4 online',
    'uuid v7 generator',
    'create uuid',
    'time ordered uuid'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/uuid-generator'
  },
  openGraph: {
    title: 'UUID v4 & v7 Generator - Generate Unique IDs Online Free | DevUtil',
    description: 'Generate UUID v4 and UUID v7 (time-ordered) or GUID values instantly. Free online UUID generator — bulk create up to 500 IDs, fully client-side.',
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
    title: 'UUID v4 & v7 Generator - Generate Unique IDs Online Free | DevUtil',
    description: 'Generate UUID v4 and UUID v7 (time-ordered) or GUID values instantly. Free online UUID generator — bulk create up to 500 IDs, fully client-side.',
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
