import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import NumberBaseConverterTool from '../../components/NumberBaseConverterTool';

export const metadata: Metadata = {
  title: 'Free Number Base Converter Online - Binary Octal Decimal Hex | DevUtil',
  description:
    'Convert between binary, octal, decimal, and hexadecimal instantly in your browser. Update any field to sync the others with private client-side conversion.',
  keywords: [
    'number base converter',
    'binary to decimal',
    'hex to decimal',
    'octal converter',
    'hexadecimal converter',
    'base converter online',
    'bin oct dec hex',
    'radix converter'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/number-base-converter'
  },
  openGraph: {
    title: 'Free Number Base Converter Online - Binary Octal Decimal Hex | DevUtil',
    description:
      'Convert between binary, octal, decimal, and hex instantly. Free, private, and fully client-side.',
    url: 'https://www.devutil.dev/number-base-converter',
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
    title: 'Free Number Base Converter Online - Binary Octal Decimal Hex | DevUtil',
    description: 'Convert between binary, octal, decimal, and hex instantly in your browser.',
    images: [
      {
        url: 'https://www.devutil.dev/images/devutil-home.png',
        alt: 'Number Base Converter preview'
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
  name: 'Number Base Converter',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  image: 'https://www.devutil.dev/images/devutil-home.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description:
    'Free number base converter for binary, octal, decimal, and hexadecimal that runs entirely in your browser.',
  url: 'https://www.devutil.dev/number-base-converter',
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
      name: 'Number Base Converter',
      item: 'https://www.devutil.dev/number-base-converter'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What number bases are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This converter supports binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16). Changing any field updates the other three.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is conversion done in my browser?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All conversion runs fully in your browser. Your numbers stay on your device and are never uploaded to a server.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I convert hex to decimal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type a hexadecimal value in the Hex field (with or without a 0x prefix). The Decimal field updates automatically with the base-10 equivalent.'
      }
    }
  ]
};

export default function NumberBaseConverterPage() {
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

      <Header subtitle="Number Base Converter" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Free Number Base Converter
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Convert binary, octal, decimal, and hex instantly with private client-side processing.
            </span>
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <NumberBaseConverterTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-10 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is a number base converter?</h2>
            <p>
              A number base converter translates the same integer between different radices—binary
              for bitmasks, octal for permissions, decimal for everyday math, and hexadecimal for
              memory addresses and colors.
            </p>
            <p>
              Enter a value in any field and the other bases update immediately, with clear errors
              when digits are invalid for that base.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why convert between bases?</h2>
            <p>
              Developers constantly move between bases when debugging flags, reading dumps, or
              checking bitmask math. Doing it in the browser avoids mental arithmetic mistakes and
              one-off scripts.
            </p>
            <p>
              Optional prefixes like <code className="rounded bg-slate-100 px-1">0x</code> for hex
              are accepted and stripped during conversion.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to use this converter</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Type a value in Binary, Octal, Decimal, or Hex.</li>
              <li>Watch the other fields update automatically.</li>
              <li>Use Copy next to any field, or load the sample to try it out.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Privacy-first by default</h2>
            <p>
              All conversion happens in your browser. No numbers are uploaded, stored remotely, or
              used for training.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              What number bases are supported?
            </h3>
            <p>
              This converter supports binary (base 2), octal (base 8), decimal (base 10), and
              hexadecimal (base 16). Changing any field updates the other three.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              Is conversion done in my browser?
            </h3>
            <p>
              Yes. All conversion runs fully in your browser. Your numbers stay on your device and
              are never uploaded to a server.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              How do I convert hex to decimal?
            </h3>
            <p>
              Type a hexadecimal value in the Hex field (with or without a 0x prefix). The Decimal
              field updates automatically with the base-10 equivalent.
            </p>
          </div>
        </section>

        <RelatedTools current="number-base-converter" />
      </main>

      <Footer />
    </div>
  );
}
