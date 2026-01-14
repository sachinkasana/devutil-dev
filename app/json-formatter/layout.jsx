import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Free JSON Formatter & Validator Online - Format, Minify, Beautify JSON | DevUtil'
  },
  description: 'Free online JSON formatter, validator, and beautifier. Format, minify, repair JSON instantly with 100% client-side processing. No data upload required.',
  keywords: [
    'json formatter',
    'json beautifier',
    'json validator',
    'pretty print json',
    'json minifier',
    'format json online',
    'fix json',
    'json repair',
    'json editor',
    'json lint',
    'json parser'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/json-formatter'
  },
  openGraph: {
    title: 'Free JSON Formatter & Validator Online - Format, Minify, Beautify JSON | DevUtil',
    description: 'Free online JSON formatter, validator, and beautifier. Format, minify, repair JSON instantly with 100% client-side processing. No data upload required.',
    url: 'https://www.devutil.dev/json-formatter',
    type: 'website',
    siteName: 'DevUtil',
    images: [
      {
        url: 'https://www.devutil.dev/og.png',
        width: 1200,
        height: 630,
        alt: 'DevUtil'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Formatter & Validator Online - Format, Minify, Beautify JSON | DevUtil',
    description: 'Free online JSON formatter, validator, and beautifier. Format, minify, repair JSON instantly with 100% client-side processing. No data upload required.',
    images: ['https://www.devutil.dev/og.png']
  }
};

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

export default function JsonFormatterLayout({ children }) {
  return (
    <>
      <Script
        id="json-formatter-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="json-formatter-faq-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Script
        id="json-formatter-breadcrumb-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  );
}
