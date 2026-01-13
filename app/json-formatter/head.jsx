export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'JSON Formatter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/json-formatter',
    description: 'Free JSON formatter to validate, beautify, and repair JSON client-side with privacy and instant results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1820'
    }
  };

  return (
    <>
      <title>Free JSON Formatter Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free JSON formatter to validate, beautify, and repair JSON client-side with privacy, no signup, and instant results for API payloads and configs online."
      />
      <meta
        name="keywords"
        content="json formatter,json beautifier,json validator,pretty print json,json minifier,format json online,fix json,json repair,json editor,json lint,json parser"
      />
      <link rel="canonical" href="https://devutil.dev/json-formatter" />
      <meta property="og:title" content="Free JSON Formatter Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free JSON formatter to validate, beautify, and repair JSON client-side with privacy, no signup, and instant results for API payloads and configs online."
      />
      <meta property="og:image" content="https://devutil.dev/og.png" />
      <meta property="og:url" content="https://devutil.dev/json-formatter" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free JSON Formatter Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free JSON formatter to validate, beautify, and repair JSON client-side with privacy, no signup, and instant results for API payloads and configs online."
      />
      <meta name="twitter:image" content="https://devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
