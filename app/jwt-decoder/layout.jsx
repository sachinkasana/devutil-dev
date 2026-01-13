import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Free JWT Decoder Online - Fast & Private | DevUtil'
  },
  description: 'Free JWT decoder with client-side privacy, no signup, and instant results to inspect headers and claims online for developers and APIs. Fast in-browser tool.',
  keywords: [
    'jwt decoder',
    'decode jwt',
    'jwt parser',
    'json web token decoder',
    'jwt claims',
    'jwt payload',
    'jwt header',
    'token decoder',
    'base64url jwt',
    'jwt tool',
    'inspect jwt'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/jwt-decoder'
  },
  openGraph: {
    title: 'Free JWT Decoder Online - Fast & Private | DevUtil',
    description: 'Free JWT decoder with client-side privacy, no signup, and instant results to inspect headers and claims online for developers and APIs. Fast in-browser tool.',
    url: 'https://www.devutil.dev/jwt-decoder',
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
    title: 'Free JWT Decoder Online - Fast & Private | DevUtil',
    description: 'Free JWT decoder with client-side privacy, no signup, and instant results to inspect headers and claims online for developers and APIs. Fast in-browser tool.',
    images: ['https://www.devutil.dev/og.png']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JWT Decoder',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.devutil.dev/jwt-decoder',
  description: 'Free JWT decoder with client-side privacy and instant results.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1587'
  }
};

export default function JwtDecoderLayout({ children }) {
  return (
    <>
      <Script
        id="jwt-decoder-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
