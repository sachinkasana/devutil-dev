import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import XmlFormatterTool from '../../components/XmlFormatterTool';

export const metadata: Metadata = {
  title: 'Free XML Formatter & Beautifier Online - Format, Minify & Validate XML | DevUtil',
  description:
    'Beautify, minify, and validate XML instantly in your browser. Choose 2 or 4 space indentation. Free, private XML formatter.',
  keywords: [
    'xml formatter',
    'xml beautifier',
    'format xml online',
    'xml minifier',
    'xml validator',
    'pretty print xml',
    'xml formatter tool',
    'beautify xml'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/xml-formatter'
  },
  openGraph: {
    title: 'Free XML Formatter & Beautifier Online - Format, Minify & Validate XML | DevUtil',
    description: 'Beautify, minify, and validate XML with clean indentation. Fully client-side.',
    url: 'https://www.devutil.dev/xml-formatter',
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
    title: 'Free XML Formatter & Beautifier Online - Format, Minify & Validate XML | DevUtil',
    description: 'Beautify, minify, and validate XML instantly in your browser.',
    images: [
      {
        url: 'https://www.devutil.dev/images/devutil-home.png',
        alt: 'XML Formatter preview'
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
  name: 'XML Formatter',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  image: 'https://www.devutil.dev/images/devutil-home.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description:
    'Free XML formatter, beautifier, minifier, and validator that runs entirely in your browser.',
  url: 'https://www.devutil.dev/xml-formatter',
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
      name: 'XML Formatter',
      item: 'https://www.devutil.dev/xml-formatter'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does an XML formatter do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An XML formatter beautifies XML by adding consistent indentation and line breaks so nested elements are easier to read and review.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I minify XML too?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Use Minify XML to remove unnecessary whitespace and produce a compact XML string.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is my XML sent to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Formatting, minifying, and validation all run in your browser. Your XML is never uploaded.'
      }
    }
  ]
};

export default function XmlFormatterPage() {
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

      <Header subtitle="XML Formatter" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Free XML Formatter &amp; Beautifier
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Beautify messy XML, minify for compact payloads, and validate parse errors—fast and private.
            </span>
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <XmlFormatterTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-10 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why format XML?</h2>
            <p>
              Compact or poorly indented XML is hard to debug. A formatter adds predictable nesting so you
              can scan elements, attributes, and hierarchies quickly during code review or API testing.
            </p>
            <p>
              Clean XML also makes diffs clearer in pull requests and helps catch structural mistakes before
              they reach production.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Beautify, minify, and validate</h2>
            <p>
              Beautify when editing configuration or SOAP responses. Minify when you need a smaller payload
              for storage or transport. Validate when you suspect unbalanced tags or malformed markup.
            </p>
            <p>
              Choose 2-space or 4-space indentation to match your project conventions, then copy the output
              with one click.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to use this XML formatter</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Paste XML into the input panel.</li>
              <li>Select indentation size.</li>
              <li>Click Beautify XML, Minify XML, or Validate.</li>
              <li>Copy the formatted output or fix any parse errors shown.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Privacy-first by default</h2>
            <p>
              XML never leaves your browser. Formatting and validation are local-only—nothing is uploaded
              or stored remotely.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              What does an XML formatter do?
            </h3>
            <p>
              An XML formatter beautifies XML by adding consistent indentation and line breaks so nested
              elements are easier to read and review.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Can I minify XML too?</h3>
            <p>
              Yes. Use Minify XML to remove unnecessary whitespace and produce a compact XML string.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              Is my XML sent to a server?
            </h3>
            <p>
              No. Formatting, minifying, and validation all run in your browser. Your XML is never
              uploaded.
            </p>
          </div>
        </section>

        <RelatedTools current="xml-formatter" />
      </main>

      <Footer />
    </div>
  );
}
