export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Regex Tester',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://www.devutil.dev/regex-tester',
    description: 'Free regex tester with live matches and fast client-side processing.',
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
      <title>Regex Tester Online - Test Regular Expressions Live | DevUtil</title>
      <meta
        name="description"
        content="Test regular expressions live with a free regex tester. See matches, groups, and highlights instantly. Client-side, private, and fast in your browser."
      />
      <meta
        name="keywords"
        content="regex tester,regex test,regular expression tester,regex debug,regex matcher,regex online,regex tool,regex validator,pattern tester,regex playground,regex builder"
      />
      <link rel="canonical" href="https://www.devutil.dev/regex-tester" />
      <meta property="og:title" content="Regex Tester Online - Test Regular Expressions Live | DevUtil" />
      <meta
        property="og:description"
        content="Test regular expressions live with a free regex tester. See matches, groups, and highlights instantly. Client-side, private, and fast in your browser."
      />
      <meta property="og:image" content="https://www.devutil.dev/og.png" />
      <meta property="og:url" content="https://www.devutil.dev/regex-tester" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Regex Tester Online - Test Regular Expressions Live | DevUtil" />
      <meta
        name="twitter:description"
        content="Test regular expressions live with a free regex tester. See matches, groups, and highlights instantly. Client-side, private, and fast in your browser."
      />
      <meta name="twitter:image" content="https://www.devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
