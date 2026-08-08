export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'UUID v4 & v7 Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://www.devutil.dev/uuid-generator',
    description: 'Free UUID v4 and v7 (time-ordered) generator with fast client-side processing.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <title>UUID v4 & v7 Generator - Generate Unique IDs Online Free | DevUtil</title>
      <meta
        name="description"
        content="Generate UUID v4 and UUID v7 (time-ordered) or GUID values instantly. Free online UUID generator — bulk create up to 500 IDs, fully client-side."
      />
      <meta
        name="keywords"
        content="uuid generator,uuid v4,uuid v7,guid generator,unique id generator,generate uuid,uuid online,uuid list,random uuid,uuid tool,uuid v4 online,uuid v7 generator,create uuid,time ordered uuid"
      />
      <link rel="canonical" href="https://www.devutil.dev/uuid-generator" />
      <meta property="og:title" content="UUID v4 & v7 Generator - Generate Unique IDs Online Free | DevUtil" />
      <meta
        property="og:description"
        content="Generate UUID v4 and UUID v7 (time-ordered) or GUID values instantly. Free online UUID generator — bulk create up to 500 IDs, fully client-side."
      />
      <meta property="og:image" content="https://www.devutil.dev/images/uuid-generator.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content="https://www.devutil.dev/uuid-generator" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="UUID v4 & v7 Generator - Generate Unique IDs Online Free | DevUtil" />
      <meta
        name="twitter:description"
        content="Generate UUID v4 and UUID v7 (time-ordered) or GUID values instantly. Free online UUID generator — bulk create up to 500 IDs, fully client-side."
      />
      <meta name="twitter:image" content="https://www.devutil.dev/images/uuid-generator.png" />
      <meta name="twitter:image:alt" content="UUID Generator preview" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
