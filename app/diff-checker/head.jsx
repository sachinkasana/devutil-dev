export default function Head() {
  const webApplicationLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Diff Checker',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250'
    },
    description: 'Free online diff checker to compare text and code differences. Privacy-focused tool that runs entirely in your browser.',
    featureList: [
      'Side-by-side text comparison',
      'Inline diff view',
      'Character-level differences',
      'File upload support',
      'Export to TXT/HTML',
      'Privacy-focused - no data upload'
    ],
    screenshot: 'https://www.devutil.dev/images/diff-checker.png'
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.devutil.dev'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Diff Checker',
        item: 'https://www.devutil.dev/diff-checker'
      }
    ]
  };

  return (
    <>
      <title>Diff Checker - Compare Text Differences Online | DevUtil</title>
      <meta
        name="description"
        content="Free online diff checker to compare text, code, and files. Highlights additions, deletions, and changes instantly. Privacy-focused, runs in your browser."
      />
      <meta
        name="keywords"
        content="diff checker,text compare,compare text online,text difference checker,file diff tool,code comparison tool,text diff online,compare two texts,side by side text compare,online diff tool,text comparison tool,compare documents online"
      />
      <link rel="canonical" href="https://www.devutil.dev/diff-checker" />
      <meta property="og:title" content="Free Diff Checker - Compare Text Online | DevUtil" />
      <meta
        property="og:description"
        content="Compare text differences instantly. Free online diff checker with side-by-side view. Privacy-focused, runs in your browser."
      />
      <meta property="og:image" content="https://www.devutil.dev/images/diff-checker.png" />
      <meta property="og:url" content="https://www.devutil.dev/diff-checker" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Diff Checker - Compare Text Online" />
      <meta
        name="twitter:description"
        content="Compare text differences instantly. Privacy-focused diff checker tool."
      />
      <meta name="twitter:image" content="https://www.devutil.dev/images/diff-checker.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
