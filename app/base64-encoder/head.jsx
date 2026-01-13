export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Base64 Encoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/base64-encoder',
    description: 'Free Base64 encoder and decoder with client-side privacy and instant results.',
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
      <title>Free Base64 Encoder Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free Base64 encoder/decoder with client-side privacy, no signup, and instant results to encode text, JSON, or files online for developers. Fast in-browser tool."
      />
      <meta
        name="keywords"
        content="base64 encoder,base64 decoder,base64 encode,base64 decode,base64 converter,online base64,data uri encoder,base64 tool,encode text,decode text,base64 file"
      />
      <link rel="canonical" href="https://devutil.dev/base64-encoder" />
      <meta property="og:title" content="Free Base64 Encoder Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free Base64 encoder/decoder with client-side privacy, no signup, and instant results to encode text, JSON, or files online for developers. Fast in-browser tool."
      />
      <meta property="og:image" content="https://devutil.dev/og.png" />
      <meta property="og:url" content="https://devutil.dev/base64-encoder" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Base64 Encoder Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free Base64 encoder/decoder with client-side privacy, no signup, and instant results to encode text, JSON, or files online for developers. Fast in-browser tool."
      />
      <meta name="twitter:image" content="https://devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
