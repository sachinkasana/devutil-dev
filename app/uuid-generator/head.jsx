export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'UUID Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://www.devutil.dev/uuid-generator',
    description: 'Free UUID v4 generator with fast client-side processing.',
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
      <title>UUID Generator v4 - Generate Unique IDs Online Free | DevUtil</title>
      <meta
        name="description"
        content="Generate UUID v4 values instantly with a free online UUID generator. Fast, private, client-side tool for unique IDs you can copy or download."
      />
      <meta
        name="keywords"
        content="uuid generator,uuid v4,guid generator,unique id generator,generate uuid,uuid online,uuid list,random uuid,uuid tool,uuid v4 online,create uuid"
      />
      <link rel="canonical" href="https://www.devutil.dev/uuid-generator" />
      <meta property="og:title" content="UUID Generator v4 - Generate Unique IDs Online Free | DevUtil" />
      <meta
        property="og:description"
        content="Generate UUID v4 values instantly with a free online UUID generator. Fast, private, client-side tool for unique IDs you can copy or download."
      />
      <meta property="og:image" content="https://www.devutil.dev/og.png" />
      <meta property="og:url" content="https://www.devutil.dev/uuid-generator" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="UUID Generator v4 - Generate Unique IDs Online Free | DevUtil" />
      <meta
        name="twitter:description"
        content="Generate UUID v4 values instantly with a free online UUID generator. Fast, private, client-side tool for unique IDs you can copy or download."
      />
      <meta name="twitter:image" content="https://www.devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
