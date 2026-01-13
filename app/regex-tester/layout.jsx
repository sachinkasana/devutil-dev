import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Free Regex Tester Online - Fast & Private | DevUtil'
  },
  description: 'Free regex tester with client-side privacy, no signup, and instant matches to debug patterns online with live results for developers. Fast in-browser tool.',
  keywords: [
    'regex tester',
    'regex test',
    'regular expression tester',
    'regex debug',
    'regex matcher',
    'regex online',
    'regex tool',
    'regex validator',
    'pattern tester',
    'regex playground',
    'regex builder'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/regex-tester'
  },
  openGraph: {
    title: 'Free Regex Tester Online - Fast & Private | DevUtil',
    description: 'Free regex tester with client-side privacy, no signup, and instant matches to debug patterns online with live results for developers. Fast in-browser tool.',
    url: 'https://www.devutil.dev/regex-tester',
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
    title: 'Free Regex Tester Online - Fast & Private | DevUtil',
    description: 'Free regex tester with client-side privacy, no signup, and instant matches to debug patterns online with live results for developers. Fast in-browser tool.',
    images: ['https://www.devutil.dev/og.png']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Regex Tester',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.devutil.dev/regex-tester',
  description: 'Free regex tester with client-side privacy and instant match results.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1412'
  }
};

export default function RegexTesterLayout({ children }) {
  return (
    <>
      <Script
        id="regex-tester-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
