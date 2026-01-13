export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'UUID Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/uuid-generator',
    description: 'Free online UUID generator that creates UUID v4 values client-side with instant results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <title>Free UUID Generator Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free online UUID generator for UUID v4 values with client-side privacy. No registration, instant results, data never leaves your browser."
      />
      <meta
        name="keywords"
        content="uuid generator, uuid v4, generate uuid online, unique id generator, guid generator"
      />
      <link rel="canonical" href="https://devutil.dev/uuid-generator" />
      <meta property="og:title" content="Free UUID Generator Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free online UUID generator for UUID v4 values with client-side privacy. No registration, instant results, data never leaves your browser."
      />
      <meta property="og:url" content="https://devutil.dev/uuid-generator" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free UUID Generator Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free online UUID generator for UUID v4 values with client-side privacy. No registration, instant results, data never leaves your browser."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
