import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import CaseConverterTool from '../../components/CaseConverterTool';

export const metadata: Metadata = {
  title: 'Free Case Converter Online - camelCase, snake_case, kebab-case & More | DevUtil',
  description:
    'Convert text to camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, and more instantly. Free client-side case converter.',
  keywords: [
    'case converter',
    'camelCase converter',
    'snake_case converter',
    'kebab-case converter',
    'PascalCase converter',
    'text case converter',
    'constant case',
    'title case converter'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/case-converter'
  },
  openGraph: {
    title: 'Free Case Converter Online - camelCase, snake_case, kebab-case & More | DevUtil',
    description:
      'Instantly convert text between camelCase, PascalCase, snake_case, kebab-case, and more.',
    url: 'https://www.devutil.dev/case-converter',
    siteName: 'DevUtil',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.devutil.dev/images/devutil-home.png',
        width: 1200,
        height: 630,
        alt: 'DevUtil'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Case Converter Online - camelCase, snake_case, kebab-case & More | DevUtil',
    description: 'Convert text between popular programming and writing case formats instantly.',
    images: [
      {
        url: 'https://www.devutil.dev/images/devutil-home.png',
        alt: 'Case Converter preview'
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  }
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Case Converter',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  image: 'https://www.devutil.dev/images/devutil-home.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description:
    'Free online case converter for camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and more.',
  url: 'https://www.devutil.dev/case-converter',
  publisher: {
    '@type': 'Organization',
    name: 'DevUtil',
    url: 'https://www.devutil.dev/'
  }
};

const breadcrumbSchema = {
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
      name: 'Case Converter',
      item: 'https://www.devutil.dev/case-converter'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What case formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool supports camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, Sentence case, lower case, and UPPER CASE.'
      }
    },
    {
      '@type': 'Question',
      name: 'Will my text leave my browser?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All case conversion happens locally in your browser. Your text is never uploaded to a server.'
      }
    },
    {
      '@type': 'Question',
      name: 'How does camelCase conversion work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The converter splits your text on spaces, punctuation, hyphens, underscores, and camelCase boundaries, lowercases each word, then joins them with the first word lowercase and later words capitalized.'
      }
    }
  ]
};

export default function CaseConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header subtitle="Case Converter" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Free Case Converter
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Instantly convert text to camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE,
              and more.
            </span>
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <CaseConverterTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-10 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is a case converter?</h2>
            <p>
              A case converter transforms text between naming conventions used in code and writing—such as
              camelCase for JavaScript variables, snake_case for Python and databases, and kebab-case for
              URLs and CSS classes.
            </p>
            <p>
              Instead of rewriting identifiers by hand, paste once and copy any format you need with one
              click.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why convert text case formats?</h2>
            <p>
              Consistent naming improves readability and reduces bugs during refactoring. When you move
              between languages or rename API fields, a case converter speeds up the mechanical work while
              you focus on logic.
            </p>
            <p>
              It also helps content editors switch between Title Case headlines, Sentence case blurbs, and
              UPPER CASE labels without manual editing.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to use this case converter</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Paste or type text into the input box.</li>
              <li>Watch all case formats update instantly.</li>
              <li>Click Copy next to the format you need.</li>
              <li>Clear the input when you are done.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Privacy-first by default</h2>
            <p>
              Conversion is entirely client-side. Your text never leaves the browser and is not stored or
              analyzed remotely.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              What case formats are supported?
            </h3>
            <p>
              This tool supports camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case,
              Sentence case, lower case, and UPPER CASE.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              Will my text leave my browser?
            </h3>
            <p>
              No. All case conversion happens locally in your browser. Your text is never uploaded to a
              server.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              How does camelCase conversion work?
            </h3>
            <p>
              The converter splits your text on spaces, punctuation, hyphens, underscores, and camelCase
              boundaries, lowercases each word, then joins them with the first word lowercase and later
              words capitalized.
            </p>
          </div>
        </section>

        <RelatedTools current="case-converter" />
      </main>

      <Footer />
    </div>
  );
}
