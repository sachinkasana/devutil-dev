import Script from 'next/script';

export const metadata = {
  title: {
    absolute: 'Diff Checker - Compare Text Differences Online | DevUtil'
  },
  description: 'Free online diff checker to compare text, code, and files. Highlights additions, deletions, and changes instantly. Privacy-focused, runs in your browser.',
  keywords: [
    'diff checker',
    'text compare',
    'compare text online',
    'text difference checker',
    'file diff tool',
    'code comparison tool',
    'text diff online',
    'compare two texts',
    'side by side text compare',
    'online diff tool',
    'text comparison tool',
    'compare documents online'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/diff-checker'
  },
  openGraph: {
    title: 'Free Diff Checker - Compare Text Online',
    description: 'Compare text differences instantly. Free online diff checker with side-by-side view. Privacy-focused, runs in your browser.',
    url: 'https://www.devutil.dev/diff-checker',
    type: 'website',
    siteName: 'DevUtil',
    images: [
      {
        url: 'https://www.devutil.dev/images/diff-checker.png',
        width: 1200,
        height: 630,
        alt: 'Diff checker tool preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Diff Checker - Compare Text Online',
    description: 'Compare text differences instantly. Privacy-focused diff checker tool.',
    images: ['https://www.devutil.dev/images/diff-checker.png']
  }
};

const webApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Diff Checker',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description: 'Free online diff checker to compare text and code differences. Privacy-focused tool that runs entirely in your browser.',
  featureList: [
    'Side-by-side text comparison',
    'Inline diff view',
    'Character-level differences',
    'File upload support',
    'Export to TXT/HTML',
    'Privacy-focused - no data upload'
  ],
  screenshot: 'https://www.devutil.dev/images/diff-checker.png'
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.devutil.dev'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Diff Checker',
      item: 'https://www.devutil.dev/diff-checker'
    }
  ]
};

export default function DiffCheckerLayout({ children }) {
  return (
    <>
      <Script
        id="diff-checker-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationLd) }}
      />
      <Script
        id="diff-checker-breadcrumb-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  );
}
