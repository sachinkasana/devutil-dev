export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Base64 Encoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/base64-encoder',
    description: 'Free online Base64 encoder and decoder with client-side processing and instant results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <title>Free Base64 Encoder Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free online Base64 encoder and decoder with client-side privacy. No registration, instant results, and your data never leaves the browser."
      />
      <meta
        name="keywords"
        content="base64 encoder, base64 decoder, base64 encode online, base64 decode, base64 converter, data uri encoder"
      />
      <link rel="canonical" href="https://devutil.dev/base64-encoder" />
      <meta property="og:title" content="Free Base64 Encoder Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free online Base64 encoder and decoder with client-side privacy. No registration, instant results, and your data never leaves the browser."
      />
      <meta property="og:url" content="https://devutil.dev/base64-encoder" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Base64 Encoder Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free online Base64 encoder and decoder with client-side privacy. No registration, instant results, and your data never leaves the browser."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
