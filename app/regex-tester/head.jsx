export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Regex Tester',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/regex-tester',
    description: 'Free regex tester with client-side privacy and instant match results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1412'
    }
  };

  return (
    <>
      <title>Free Regex Tester Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free regex tester with client-side privacy, no signup, and instant matches to debug patterns online with live results for developers. Fast in-browser tool."
      />
      <meta
        name="keywords"
        content="regex tester,regex test,regular expression tester,regex debug,regex matcher,regex online,regex tool,regex validator,pattern tester,regex playground,regex builder"
      />
      <link rel="canonical" href="https://devutil.dev/regex-tester" />
      <meta property="og:title" content="Free Regex Tester Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free regex tester with client-side privacy, no signup, and instant matches to debug patterns online with live results for developers. Fast in-browser tool."
      />
      <meta property="og:image" content="https://devutil.dev/og.png" />
      <meta property="og:url" content="https://devutil.dev/regex-tester" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Regex Tester Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free regex tester with client-side privacy, no signup, and instant matches to debug patterns online with live results for developers. Fast in-browser tool."
      />
      <meta name="twitter:image" content="https://devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
