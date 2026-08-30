import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Regex Tester Online — Test & Debug Regular Expressions Free | DevUtil'
  },
  description: 'Test and debug regular expressions in real time with live match highlighting. Supports all JavaScript regex flags — g, i, m, s, u. Free online regex tester — no data uploaded.',
  keywords: [
    'regex tester online',
    'regular expression tester',
    'test regex online',
    'regex debugger online',
    'javascript regex tester',
    'regex validator online',
    'regex match tester',
    'online regex checker'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/regex-tester'
  },
  openGraph: {
    title: 'Regex Tester Online — Test & Debug Regular Expressions Free',
    description: 'Test and debug regular expressions in real time with live match highlighting. Free online regex tester — no data uploaded.',
    url: 'https://www.devutil.dev/regex-tester',
    type: 'website',
    siteName: 'DevUtil',
    images: [
      {
        url: 'https://www.devutil.dev/images/regex-tester.png',
        width: 1200,
        height: 630,
        alt: 'DevUtil'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regex Tester Online — Test & Debug Regular Expressions Free',
    description: 'Test and debug regular expressions in real time with live match highlighting. Free online regex tester — no data uploaded.',
    images: ['https://www.devutil.dev/images/regex-tester.png']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Regex Tester',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  url: 'https://www.devutil.dev/regex-tester',
  description: 'Free regex tester with live matches and fast client-side processing.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
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
