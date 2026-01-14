export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Hash Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://www.devutil.dev/hash-generator',
    description: 'Free hash generator for MD5, SHA-1, SHA-256, and SHA-512 with fast client-side processing.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1670'
    }
  };

  return (
    <>
      <title>Free Hash Generator - MD5, SHA-1, SHA-256 Online Tool | DevUtil</title>
      <meta
        name="description"
        content="Free hash generator for MD5, SHA-1, SHA-256, and SHA-512. Hash text instantly in your browser with no uploads, no signup, and fast client-side processing."
      />
      <meta
        name="keywords"
        content="hash generator,md5 hash,sha1 hash,sha256 hash,sha512 hash,checksum tool,hash text,hash file,hash online,crypto hash,generate hash"
      />
      <link rel="canonical" href="https://www.devutil.dev/hash-generator" />
      <meta property="og:title" content="Free Hash Generator - MD5, SHA-1, SHA-256 Online Tool | DevUtil" />
      <meta
        property="og:description"
        content="Free hash generator for MD5, SHA-1, SHA-256, and SHA-512. Hash text instantly in your browser with no uploads, no signup, and fast client-side processing."
      />
      <meta property="og:image" content="https://www.devutil.dev/og.png" />
      <meta property="og:url" content="https://www.devutil.dev/hash-generator" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Hash Generator - MD5, SHA-1, SHA-256 Online Tool | DevUtil" />
      <meta
        name="twitter:description"
        content="Free hash generator for MD5, SHA-1, SHA-256, and SHA-512. Hash text instantly in your browser with no uploads, no signup, and fast client-side processing."
      />
      <meta name="twitter:image" content="https://www.devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
