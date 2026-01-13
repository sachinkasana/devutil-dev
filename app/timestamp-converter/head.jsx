export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Timestamp Converter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/timestamp-converter',
    description: 'Free online timestamp converter with client-side processing and instant results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <title>Free Timestamp Converter Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free online timestamp converter with client-side privacy. No registration, instant results, and your data never leaves the browser."
      />
      <meta
        name="keywords"
        content="timestamp converter, unix timestamp, epoch converter, timestamp to date, date to timestamp"
      />
      <link rel="canonical" href="https://devutil.dev/timestamp-converter" />
      <meta property="og:title" content="Free Timestamp Converter Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free online timestamp converter with client-side privacy. No registration, instant results, and your data never leaves the browser."
      />
      <meta property="og:url" content="https://devutil.dev/timestamp-converter" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Timestamp Converter Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free online timestamp converter with client-side privacy. No registration, instant results, and your data never leaves the browser."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
