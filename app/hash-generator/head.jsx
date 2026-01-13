export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Hash Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/hash-generator',
    description: 'Free online hash generator for MD5, SHA-1, SHA-256, and SHA-512 with client-side processing.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <title>Free Hash Generator Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free online hash generator for MD5, SHA-1, SHA-256, and SHA-512. Client-side privacy, no registration, instant results."
      />
      <meta
        name="keywords"
        content="hash generator, md5 hash, sha1 hash, sha256 hash, sha512 hash, checksum tool, hash text online"
      />
      <link rel="canonical" href="https://devutil.dev/hash-generator" />
      <meta property="og:title" content="Free Hash Generator Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free online hash generator for MD5, SHA-1, SHA-256, and SHA-512. Client-side privacy, no registration, instant results."
      />
      <meta property="og:url" content="https://devutil.dev/hash-generator" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Hash Generator Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free online hash generator for MD5, SHA-1, SHA-256, and SHA-512. Client-side privacy, no registration, instant results."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
