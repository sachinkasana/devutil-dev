import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'JWT Decoder Online — Decode, Verify & Sign JSON Web Tokens Free | DevUtil'
  },
  description:
    'Free JWT decoder and verifier. Paste any JWT to decode header and payload, verify HS256/384/512 signatures, and sign new tokens — all in your browser. Token never leaves your device.',
  keywords: [
    'jwt decoder online',
    'decode jwt token online',
    'jwt verifier',
    'json web token decoder',
    'verify jwt hs256',
    'jwt token decoder free',
    'jwt generator online',
    'decode jwt free'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/jwt-decoder'
  },
  openGraph: {
    title: 'JWT Decoder Online — Decode, Verify & Sign JSON Web Tokens Free',
    description:
      'Free JWT decoder and verifier. Decode header and payload, verify HS256/384/512, and sign tokens in your browser.',
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
    title: 'JWT Decoder Online — Decode, Verify & Sign JSON Web Tokens Free',
    description: 'Free JWT decoder and verifier. Decode, verify HS256, and sign tokens in your browser.',
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
