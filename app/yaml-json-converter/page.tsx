import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import YamlJsonConverterTool from '../../components/YamlJsonConverterTool';

export const metadata: Metadata = {
  title: 'Free YAML to JSON Converter Online — Bidirectional & Private',
  description:
    'Convert YAML to JSON and JSON to YAML instantly in your browser. Free YAML↔JSON converter — no signup, data never leaves your device.',
  keywords: [
    'yaml to json',
    'json to yaml',
    'yaml json converter',
    'convert yaml online',
    'yaml to json converter',
    'json yaml converter',
    'online yaml converter',
    'bidirectional yaml json'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/yaml-json-converter'
  },
  openGraph: {
    title: 'Free YAML to JSON Converter Online — Bidirectional & Private',
    description:
      'Convert YAML to JSON and JSON to YAML instantly. Free, private, and fully client-side.',
    url: 'https://www.devutil.dev/yaml-json-converter',
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
    title: 'Free YAML to JSON Converter Online — Bidirectional & Private',
    description: 'Convert YAML to JSON and JSON to YAML instantly in your browser.',
    images: [
      {
        url: 'https://www.devutil.dev/images/devutil-home.png',
        alt: 'YAML JSON Converter preview'
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
  name: 'YAML JSON Converter',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  image: 'https://www.devutil.dev/images/devutil-home.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description:
    'Free bidirectional YAML to JSON and JSON to YAML converter that runs entirely in your browser.',
  url: 'https://www.devutil.dev/yaml-json-converter',
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
      name: 'YAML JSON Converter',
      item: 'https://www.devutil.dev/yaml-json-converter'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is YAML to JSON conversion used for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'YAML to JSON conversion is commonly used when moving configuration between tools that prefer different formats, such as Kubernetes manifests, CI configs, API payloads, and application settings.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does this tool upload my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Conversion runs fully in your browser. Your YAML and JSON stay on your device and are never uploaded to a server.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I convert JSON back to YAML?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Switch the direction to JSON → YAML (or use Swap direction) to convert JSON into readable YAML with your chosen indentation.'
      }
    }
  ]
};

export default function YamlJsonConverterPage() {
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

      <Header subtitle="YAML ↔ JSON Converter" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Free YAML to JSON Converter
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Convert YAML ↔ JSON instantly with indent options, copy support, and private client-side
              processing.
            </span>
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <YamlJsonConverterTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-10 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is a YAML to JSON converter?</h2>
            <p>
              A YAML to JSON converter transforms human-friendly YAML into structured JSON that APIs, web
              apps, and many developer tools expect. The reverse direction turns JSON payloads into YAML
              that is easier to edit in config files and documentation.
            </p>
            <p>
              Both formats represent the same data model—objects, arrays, strings, numbers, and booleans—so
              conversion preserves structure while changing syntax and whitespace.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why convert between YAML and JSON?</h2>
            <p>
              Teams often keep configs in YAML for readability, then need JSON for HTTP APIs, JavaScript
              apps, or tooling that only accepts JSON. Converting locally avoids round-trips through
              scripts or temporary files.
            </p>
            <p>
              Use 2-space or 4-space indentation to match your project style, then copy the result into
              pull requests, manifests, or test fixtures.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to use this converter</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Choose YAML → JSON or JSON → YAML (or swap direction).</li>
              <li>Paste your input into the left panel.</li>
              <li>Select indent size and click Convert.</li>
              <li>Copy the output or fix any validation errors shown.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Privacy-first by default</h2>
            <p>
              All parsing and serialization happen in your browser. No YAML or JSON is uploaded, stored
              remotely, or used for training.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              What is YAML to JSON conversion used for?
            </h3>
            <p>
              YAML to JSON conversion is commonly used when moving configuration between tools that prefer
              different formats, such as Kubernetes manifests, CI configs, API payloads, and application
              settings.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              Does this tool upload my data?
            </h3>
            <p>
              No. Conversion runs fully in your browser. Your YAML and JSON stay on your device and are
              never uploaded to a server.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              Can I convert JSON back to YAML?
            </h3>
            <p>
              Yes. Switch the direction to JSON → YAML (or use Swap direction) to convert JSON into
              readable YAML with your chosen indentation.
            </p>
          </div>
        </section>

        <RelatedTools current="yaml-json-converter" />
      </main>

      <Footer />
    </div>
  );
}
