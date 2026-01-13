export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'URL Encoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/url-encoder',
    description: 'Free online URL encoder and decoder with client-side processing and instant results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <title>Free URL Encoder Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free online URL encoder and decoder with client-side privacy. No registration, instant results, and your data never leaves the browser."
      />
      <meta
        name="keywords"
        content="url encoder, url decoder, encode url online, decode url, query string encoder, percent encoding"
      />
      <link rel="canonical" href="https://devutil.dev/url-encoder" />
      <meta property="og:title" content="Free URL Encoder Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free online URL encoder and decoder with client-side privacy. No registration, instant results, and your data never leaves the browser."
      />
      <meta property="og:url" content="https://devutil.dev/url-encoder" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free URL Encoder Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free online URL encoder and decoder with client-side privacy. No registration, instant results, and your data never leaves the browser."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
