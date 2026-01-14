export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'JSON Formatter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    url: 'https://www.devutil.dev/json-formatter',
    description: 'Free online JSON formatter and validator to beautify, minify, and repair JSON with client-side processing.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1820'
    }
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is my JSON uploaded anywhere?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Formatting happens in your browser. Your data stays on your device.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a JSON formatter and validator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A formatter changes layout. A validator checks syntax rules and flags errors.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I format JSON without uploading data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. This tool works offline once loaded, and it never sends JSON to a server.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I fix JSON syntax errors?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use Repair for common issues, or read the line and column in the error panel.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it support large files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It runs locally, so speed depends on your browser and device. Large files can take longer.'
        }
      }
    ]
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.devutil.dev/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Developer Tools',
        item: 'https://www.devutil.dev/'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'JSON Formatter',
        item: 'https://www.devutil.dev/json-formatter'
      }
    ]
  };

  return (
    <>
      <title>Free JSON Formatter & Validator Online - Format, Minify, Beautify JSON | DevUtil</title>
      <meta
        name="description"
        content="Free online JSON formatter, validator, and beautifier. Format, minify, repair JSON instantly with 100% client-side processing. No data upload required."
      />
      <meta
        name="keywords"
        content="json formatter,json beautifier,json validator,pretty print json,json minifier,format json online,fix json,json repair,json editor,json lint,json parser"
      />
      <link rel="canonical" href="https://www.devutil.dev/json-formatter" />
      <meta property="og:title" content="Free JSON Formatter & Validator Online - Format, Minify, Beautify JSON | DevUtil" />
      <meta
        property="og:description"
        content="Free online JSON formatter, validator, and beautifier. Format, minify, repair JSON instantly with 100% client-side processing. No data upload required."
      />
      <meta property="og:image" content="https://www.devutil.dev/og.png" />
      <meta property="og:url" content="https://www.devutil.dev/json-formatter" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free JSON Formatter & Validator Online - Format, Minify, Beautify JSON | DevUtil" />
      <meta
        name="twitter:description"
        content="Free online JSON formatter, validator, and beautifier. Format, minify, repair JSON instantly with 100% client-side processing. No data upload required."
      />
      <meta name="twitter:image" content="https://www.devutil.dev/og.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
