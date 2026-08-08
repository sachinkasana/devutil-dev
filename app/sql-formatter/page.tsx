import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import SqlFormatterTool from '../../components/SqlFormatterTool';

export const metadata: Metadata = {
  title: 'Free SQL Formatter & Beautifier Online - Format and Minify SQL | DevUtil',
  description: 'Beautify, format, and minify SQL queries instantly. Improve readability with proper indentation and keyword casing. 100% client-side SQL formatter.',
  keywords: [
    'sql formatter',
    'sql beautifier',
    'format sql online',
    'sql minifier',
    'pretty sql',
    'sql query formatter',
    'sql beautify tool',
    'sql formatting tool'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/sql-formatter'
  },
  openGraph: {
    title: 'Free SQL Formatter & Beautifier Online - Format and Minify SQL | DevUtil',
    description: 'Beautify and minify SQL queries with clean indentation, clause breaks, and keyword styling.',
    url: 'https://www.devutil.dev/sql-formatter',
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
    title: 'Free SQL Formatter & Beautifier Online - Format and Minify SQL | DevUtil',
    description: 'Beautify and minify SQL queries with clean indentation and keyword styling.',
    images: [
      {
        url: 'https://www.devutil.dev/images/devutil-home.png',
        alt: 'SQL Formatter preview'
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
  name: 'SQL Formatter',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  image: 'https://www.devutil.dev/images/devutil-home.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description: 'Free SQL formatter and beautifier for formatting and minifying SQL queries in your browser.',
  url: 'https://www.devutil.dev/sql-formatter',
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
      name: 'SQL Formatter',
      item: 'https://www.devutil.dev/sql-formatter'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does an SQL formatter do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An SQL formatter restructures SQL queries with consistent line breaks and indentation so they are easier to read and review.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I minify SQL with this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can minify SQL to remove extra whitespace and get a compact one-line query.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is my SQL uploaded to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The SQL formatter runs fully in your browser and does not upload your data.'
      }
    }
  ]
};

export default function SqlFormatterPage() {
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

      <Header subtitle="SQL Formatter" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Free SQL Formatter &amp; Beautifier
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Format messy SQL into readable queries or minify it to a compact one-liner. Fast, free, and private.
            </span>
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <SqlFormatterTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-10 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why format SQL?</h2>
            <p>
              Clean SQL is easier to review, debug, and maintain. A formatter adds predictable indentation, clause
              breaks, and spacing so you can quickly scan joins, filters, and aggregations.
            </p>
            <p>
              This reduces review time and makes query changes safer because logic is clearer when the structure is
              consistent.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Beautify and minify workflows</h2>
            <p>
              Use beautify when editing queries, doing code review, or documenting SQL in pull requests. Use minify
              when you need compact SQL for logs, environment variables, or generated code.
            </p>
            <p>
              You can switch between both modes instantly and copy output with one click.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to use this SQL formatter</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Paste your SQL query in the input panel.</li>
              <li>Choose indentation size and keyword casing options.</li>
              <li>Click Beautify SQL or Minify SQL.</li>
              <li>Copy the output and use it in your project.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Privacy-first by default</h2>
            <p>
              Query text is processed in your browser only. No SQL is sent to servers, stored remotely, or used for
              training.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
            <h3 className="text-lg font-semibold text-slate-900 mt-4 mb-2">What does an SQL formatter do?</h3>
            <p>
              An SQL formatter restructures SQL queries with consistent line breaks and indentation so they are easier
              to read and review.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Can I minify SQL with this tool?</h3>
            <p>
              Yes. You can minify SQL to remove extra whitespace and get a compact one-line query.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Is my SQL uploaded to a server?</h3>
            <p>
              No. The SQL formatter runs fully in your browser and does not upload your data.
            </p>
          </div>
        </section>

        <RelatedTools current="sql-formatter" />
      </main>

      <Footer />
    </div>
  );
}
