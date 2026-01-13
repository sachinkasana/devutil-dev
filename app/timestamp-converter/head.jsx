export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Timestamp Converter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/timestamp-converter',
    description: 'Free timestamp converter with client-side privacy and instant results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1106'
    }
  };

  return (
    <>
      <title>Free Timestamp Converter Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free timestamp converter with client-side privacy, no signup, and instant results to convert Unix time online for logs, APIs, and debugging. In-browser tool."
      />
      <meta
        name="keywords"
        content="timestamp converter,unix timestamp,epoch converter,timestamp to date,date to timestamp,epoch time,unix time converter,convert timestamp,ms to date,seconds to date,time converter"
      />
      <link rel="canonical" href="https://devutil.dev/timestamp-converter" />
      <meta property="og:title" content="Free Timestamp Converter Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free timestamp converter with client-side privacy, no signup, and instant results to convert Unix time online for logs, APIs, and debugging. In-browser tool."
      />
      <meta property="og:image" content="https://devutil.dev/og.png" />
      <meta property="og:url" content="https://devutil.dev/timestamp-converter" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Timestamp Converter Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free timestamp converter with client-side privacy, no signup, and instant results to convert Unix time online for logs, APIs, and debugging. In-browser tool."
      />
      <meta name="twitter:image" content="https://devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
