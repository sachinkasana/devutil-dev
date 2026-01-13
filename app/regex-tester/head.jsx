export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Regex Tester',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/regex-tester',
    description: 'Free online regex tester with live matching, client-side processing, and instant results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <title>Free Regex Tester Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free online regex tester with client-side privacy, no registration, and instant results. Test patterns with live highlighting in your browser."
      />
      <meta
        name="keywords"
        content="regex tester, regex test online, regular expression tester, regex debug, regex matcher"
      />
      <link rel="canonical" href="https://devutil.dev/regex-tester" />
      <meta property="og:title" content="Free Regex Tester Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free online regex tester with client-side privacy, no registration, and instant results. Test patterns with live highlighting in your browser."
      />
      <meta property="og:url" content="https://devutil.dev/regex-tester" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Regex Tester Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free online regex tester with client-side privacy, no registration, and instant results. Test patterns with live highlighting in your browser."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
