export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'JWT Decoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://www.devutil.dev/jwt-decoder',
    description: 'Free JWT decoder with fast client-side processing.',
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
      <title>JWT Decoder Online - Decode & Verify JSON Web Tokens | DevUtil</title>
      <meta
        name="description"
        content="Decode and verify JSON Web Tokens online. Inspect header and payload instantly with a free JWT decoder. Client-side, private, no uploads."
      />
      <meta
        name="keywords"
        content="jwt decoder,decode jwt,jwt parser,json web token decoder,jwt claims,jwt payload,jwt header,token decoder,base64url jwt,jwt tool,inspect jwt"
      />
      <link rel="canonical" href="https://www.devutil.dev/jwt-decoder" />
      <meta property="og:title" content="JWT Decoder Online - Decode & Verify JSON Web Tokens | DevUtil" />
      <meta
        property="og:description"
        content="Decode and verify JSON Web Tokens online. Inspect header and payload instantly with a free JWT decoder. Client-side, private, no uploads."
      />
      <meta property="og:image" content="https://www.devutil.dev/og.png" />
      <meta property="og:url" content="https://www.devutil.dev/jwt-decoder" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="JWT Decoder Online - Decode & Verify JSON Web Tokens | DevUtil" />
      <meta
        name="twitter:description"
        content="Decode and verify JSON Web Tokens online. Inspect header and payload instantly with a free JWT decoder. Client-side, private, no uploads."
      />
      <meta name="twitter:image" content="https://www.devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
