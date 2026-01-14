export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Timestamp Converter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://www.devutil.dev/timestamp-converter',
    description: 'Free Unix timestamp converter with fast client-side processing.',
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
      <title>Unix Timestamp Converter - Convert Timestamps to Dates | DevUtil</title>
      <meta
        name="description"
        content="Convert Unix timestamps to readable dates instantly. Free timestamp converter for seconds or milliseconds with client-side processing and quick copy."
      />
      <meta
        name="keywords"
        content="timestamp converter,unix timestamp,epoch converter,timestamp to date,date to timestamp,epoch time,unix time converter,convert timestamp,ms to date,seconds to date,time converter"
      />
      <link rel="canonical" href="https://www.devutil.dev/timestamp-converter" />
      <meta property="og:title" content="Unix Timestamp Converter - Convert Timestamps to Dates | DevUtil" />
      <meta
        property="og:description"
        content="Convert Unix timestamps to readable dates instantly. Free timestamp converter for seconds or milliseconds with client-side processing and quick copy."
      />
      <meta property="og:image" content="https://www.devutil.dev/og.png" />
      <meta property="og:url" content="https://www.devutil.dev/timestamp-converter" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Unix Timestamp Converter - Convert Timestamps to Dates | DevUtil" />
      <meta
        name="twitter:description"
        content="Convert Unix timestamps to readable dates instantly. Free timestamp converter for seconds or milliseconds with client-side processing and quick copy."
      />
      <meta name="twitter:image" content="https://www.devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
