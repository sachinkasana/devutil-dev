export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'JSON Formatter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/json-formatter',
    description: 'Free online JSON formatter to validate, beautify, and minify JSON client-side with instant results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <title>Free JSON Formatter Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free online JSON formatter to validate, beautify, and minify JSON client-side. Private in-browser processing, no registration, instant results."
      />
      <meta
        name="keywords"
        content="json formatter, json beautifier, json minifier, json validator, format json online, pretty print json, json repair"
      />
      <link rel="canonical" href="https://devutil.dev/json-formatter" />
      <meta property="og:title" content="Free JSON Formatter Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free online JSON formatter to validate, beautify, and minify JSON client-side. Private in-browser processing, no registration, instant results."
      />
      <meta property="og:url" content="https://devutil.dev/json-formatter" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free JSON Formatter Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free online JSON formatter to validate, beautify, and minify JSON client-side. Private in-browser processing, no registration, instant results."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
