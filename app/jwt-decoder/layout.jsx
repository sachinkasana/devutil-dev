import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'JWT Decoder & Verifier — Decode, Verify HS256 & Sign Online | DevUtil'
  },
  description:
    'Decode JWTs, verify HS256/384/512 signatures with a secret, and generate signed tokens. Free, client-side JWT tool — tokens never leave your browser.',
  keywords: [
    'jwt decoder',
    'jwt verifier',
    'decode jwt',
    'verify jwt hs256',
    'jwt generator',
    'json web token decoder',
    'jwt claims',
    'jwt payload'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/jwt-decoder'
  },
  openGraph: {
    title: 'JWT Decoder & Verifier — Decode, Verify & Sign Online',
    description:
      'Decode JWTs, verify HMAC signatures, and sign tokens in your browser. Private and free.',
    url: 'https://www.devutil.dev/jwt-decoder',
    type: 'website',
    siteName: 'DevUtil',
    images: [
      {
        url: 'https://www.devutil.dev/images/jwt-decoder.png',
        width: 1200,
        height: 630,
        alt: 'JWT Decoder'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Decoder & Verifier Online',
    description: 'Decode, verify HS256, and sign JWTs client-side.',
    images: ['https://www.devutil.dev/images/jwt-decoder.png']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JWT Decoder & Verifier',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.devutil.dev/jwt-decoder',
  description: 'Free JWT decoder, HMAC verifier, and signer with client-side processing.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
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
