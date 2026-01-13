export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'JWT Decoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/jwt-decoder',
    description: 'Free JWT decoder with client-side privacy and instant results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1587'
    }
  };

  return (
    <>
      <title>Free JWT Decoder Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free JWT decoder with client-side privacy, no signup, and instant results to inspect headers and claims online for developers and APIs. Fast in-browser tool."
      />
      <meta
        name="keywords"
        content="jwt decoder,decode jwt,jwt parser,json web token decoder,jwt claims,jwt payload,jwt header,token decoder,base64url jwt,jwt tool,inspect jwt"
      />
      <link rel="canonical" href="https://devutil.dev/jwt-decoder" />
      <meta property="og:title" content="Free JWT Decoder Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free JWT decoder with client-side privacy, no signup, and instant results to inspect headers and claims online for developers and APIs. Fast in-browser tool."
      />
      <meta property="og:image" content="https://devutil.dev/og.png" />
      <meta property="og:url" content="https://devutil.dev/jwt-decoder" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free JWT Decoder Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free JWT decoder with client-side privacy, no signup, and instant results to inspect headers and claims online for developers and APIs. Fast in-browser tool."
      />
      <meta name="twitter:image" content="https://devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
