import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import JsonCsvConverterTool from '../../components/JsonCsvConverterTool';

export const metadata: Metadata = {
  title: 'Free JSON to CSV Converter Online - Bidirectional JSON ↔ CSV',
  description:
    'Convert JSON arrays to CSV and CSV back to JSON instantly in your browser. Handle quoted fields, copy output, and keep data private with client-side conversion.',
  keywords: [
    'json to csv',
    'csv to json',
    'json csv converter',
    'convert json online',
    'json to csv converter',
    'csv json converter',
    'online csv converter',
    'bidirectional json csv'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/json-csv-converter'
  },
  openGraph: {
    title: 'Free JSON to CSV Converter Online - Bidirectional JSON ↔ CSV',
    description:
      'Convert JSON arrays to CSV and CSV back to JSON instantly. Free, private, and fully client-side.',
    url: 'https://www.devutil.dev/json-csv-converter',
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
    title: 'Free JSON to CSV Converter Online - Bidirectional JSON ↔ CSV',
    description: 'Convert JSON arrays to CSV and CSV back to JSON instantly in your browser.',
    images: [
      {
        url: 'https://www.devutil.dev/images/devutil-home.png',
        alt: 'JSON CSV Converter preview'
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
  name: 'JSON CSV Converter',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  image: 'https://www.devutil.dev/images/devutil-home.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description:
    'Free bidirectional JSON to CSV and CSV to JSON converter that runs entirely in your browser.',
  url: 'https://www.devutil.dev/json-csv-converter',
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
      name: 'JSON CSV Converter',
      item: 'https://www.devutil.dev/json-csv-converter'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What JSON format works best for CSV conversion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use a JSON array of objects with consistent keys, for example [{"name":"Ada","role":"Engineer"}]. Nested objects and arrays of primitives are not ideal for flat CSV.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I convert CSV back to JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Switch the direction to CSV → JSON (or use Swap direction). The first row is treated as headers, and quoted fields with commas are parsed correctly.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is my data uploaded anywhere?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Conversion runs fully in your browser. Your JSON and CSV stay on your device and are never uploaded to a server.'
      }
    }
  ]
};

export default function JsonCsvConverterPage() {
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

      <Header subtitle="JSON ↔ CSV Converter" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Free JSON to CSV Converter
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Convert JSON ↔ CSV instantly with quoted-field support, copy output, and private
              client-side processing.
            </span>
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <JsonCsvConverterTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-10 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is a JSON to CSV converter?</h2>
            <p>
              A JSON to CSV converter flattens an array of objects into spreadsheet-friendly rows
              and columns. The reverse direction rebuilds a JSON array from a CSV header plus data
              rows.
            </p>
            <p>
              Flat object keys map cleanly to columns. Nested structures usually need preprocessing
              before CSV export.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why convert between JSON and CSV?</h2>
            <p>
              APIs often return JSON while analysts and spreadsheets expect CSV. Converting locally
              lets you move data between tools without uploading sensitive rows to a third-party
              service.
            </p>
            <p>
              Quoted CSV fields with commas and escaped quotes are parsed carefully so round-trips
              stay faithful.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to use this converter</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Choose JSON → CSV or CSV → JSON (or swap direction).</li>
              <li>Paste your input into the left panel (or load the sample).</li>
              <li>Click Convert, then copy the output or fix any validation errors.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Privacy-first by default</h2>
            <p>
              All parsing and serialization happen in your browser. No JSON or CSV is uploaded,
              stored remotely, or used for training.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              What JSON format works best for CSV conversion?
            </h3>
            <p>
              Use a JSON array of objects with consistent keys, for example{' '}
              {`[{"name":"Ada","role":"Engineer"}]`}. Nested objects and arrays of primitives are
              not ideal for flat CSV.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              Can I convert CSV back to JSON?
            </h3>
            <p>
              Yes. Switch the direction to CSV → JSON (or use Swap direction). The first row is
              treated as headers, and quoted fields with commas are parsed correctly.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              Is my data uploaded anywhere?
            </h3>
            <p>
              No. Conversion runs fully in your browser. Your JSON and CSV stay on your device and
              are never uploaded to a server.
            </p>
          </div>
        </section>

        <RelatedTools current="json-csv-converter" />
      </main>

      <Footer />
    </div>
  );
}
