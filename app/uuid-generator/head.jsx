export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'UUID Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/uuid-generator',
    description: 'Free UUID v4 generator with client-side privacy and instant results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1325'
    }
  };

  return (
    <>
      <title>Free UUID Generator Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free UUID v4 generator with client-side privacy, no signup, and instant results to create unique IDs online for APIs, databases, and tests. Fast in-browser tool"
      />
      <meta
        name="keywords"
        content="uuid generator,uuid v4,guid generator,unique id generator,generate uuid,uuid online,uuid list,random uuid,uuid tool,uuid v4 online,create uuid"
      />
      <link rel="canonical" href="https://devutil.dev/uuid-generator" />
      <meta property="og:title" content="Free UUID Generator Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free UUID v4 generator with client-side privacy, no signup, and instant results to create unique IDs online for APIs, databases, and tests. Fast in-browser tool"
      />
      <meta property="og:image" content="https://devutil.dev/og.png" />
      <meta property="og:url" content="https://devutil.dev/uuid-generator" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free UUID Generator Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free UUID v4 generator with client-side privacy, no signup, and instant results to create unique IDs online for APIs, databases, and tests. Fast in-browser tool"
      />
      <meta name="twitter:image" content="https://devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
