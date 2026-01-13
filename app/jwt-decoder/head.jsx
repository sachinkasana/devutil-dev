export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'JWT Decoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/jwt-decoder',
    description: 'Free online JWT decoder with client-side processing and instant results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <title>Free JWT Decoder Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free online JWT decoder with client-side privacy. No registration, instant results, and your token never leaves the browser."
      />
      <meta
        name="keywords"
        content="jwt decoder, decode jwt, jwt parser, json web token decoder, jwt claims"
      />
      <link rel="canonical" href="https://devutil.dev/jwt-decoder" />
      <meta property="og:title" content="Free JWT Decoder Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free online JWT decoder with client-side privacy. No registration, instant results, and your token never leaves the browser."
      />
      <meta property="og:url" content="https://devutil.dev/jwt-decoder" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free JWT Decoder Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free online JWT decoder with client-side privacy. No registration, instant results, and your token never leaves the browser."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
