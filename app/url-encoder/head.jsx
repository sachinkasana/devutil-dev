export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'URL Encoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://devutil.dev/url-encoder',
    description: 'Free URL encoder and decoder with client-side privacy and instant results.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1198'
    }
  };

  return (
    <>
      <title>Free URL Encoder Online - Fast & Private | DevUtil</title>
      <meta
        name="description"
        content="Free URL encoder/decoder with client-side privacy, no signup, and instant results to encode query strings online fast for developers and APIs. In-browser tool."
      />
      <meta
        name="keywords"
        content="url encoder,url decoder,encode url,decode url,percent encoding,query string encoder,urlencode,url decode online,uri encoder,encodeuri,encodeuricomponent"
      />
      <link rel="canonical" href="https://devutil.dev/url-encoder" />
      <meta property="og:title" content="Free URL Encoder Online - Fast & Private | DevUtil" />
      <meta
        property="og:description"
        content="Free URL encoder/decoder with client-side privacy, no signup, and instant results to encode query strings online fast for developers and APIs. In-browser tool."
      />
      <meta property="og:image" content="https://devutil.dev/og.png" />
      <meta property="og:url" content="https://devutil.dev/url-encoder" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free URL Encoder Online - Fast & Private | DevUtil" />
      <meta
        name="twitter:description"
        content="Free URL encoder/decoder with client-side privacy, no signup, and instant results to encode query strings online fast for developers and APIs. In-browser tool."
      />
      <meta name="twitter:image" content="https://devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
