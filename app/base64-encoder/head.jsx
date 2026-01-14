export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Base64 Encoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://www.devutil.dev/base64-encoder',
    description: 'Free online Base64 encoder and decoder with fast client-side processing.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1510'
    }
  };

  return (
    <>
      <title>Free Base64 Encoder Decoder Online - Encode & Decode Base64 | DevUtil</title>
      <meta
        name="description"
        content="Free online Base64 encoder and decoder. Encode or decode text, JSON, or files instantly in your browser. 100% client-side, no signup or data upload."
      />
      <meta
        name="keywords"
        content="base64 encoder,base64 decoder,base64 encode,base64 decode,base64 converter,online base64,data uri encoder,base64 tool,encode text,decode text,base64 file"
      />
      <link rel="canonical" href="https://www.devutil.dev/base64-encoder" />
      <meta property="og:title" content="Free Base64 Encoder Decoder Online - Encode & Decode Base64 | DevUtil" />
      <meta
        property="og:description"
        content="Free online Base64 encoder and decoder. Encode or decode text, JSON, or files instantly in your browser. 100% client-side, no signup or data upload."
      />
      <meta property="og:image" content="https://www.devutil.dev/og.png" />
      <meta property="og:url" content="https://www.devutil.dev/base64-encoder" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Base64 Encoder Decoder Online - Encode & Decode Base64 | DevUtil" />
      <meta
        name="twitter:description"
        content="Free online Base64 encoder and decoder. Encode or decode text, JSON, or files instantly in your browser. 100% client-side, no signup or data upload."
      />
      <meta name="twitter:image" content="https://www.devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
