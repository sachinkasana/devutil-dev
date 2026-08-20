import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import HttpStatusCodesTool from '../../components/HttpStatusCodesTool';

export const metadata: Metadata = {
  title: 'HTTP Status Codes Reference — What is 429, 502, 404?',
  description:
    'Free searchable HTTP status code reference. Look up 200, 301, 404, 429, 500, 502, and more — with plain-English meaning, when to use them, and examples. 100% client-side.',
  keywords: [
    'http status codes',
    'what is 429 status code',
    'http 502',
    'http 404 meaning',
    'status code reference',
    'http error codes',
    '429 too many requests'
  ],
  alternates: { canonical: 'https://www.devutil.dev/http-status-codes' },
  openGraph: {
    title: 'HTTP Status Codes Reference — What is 429, 502, 404?',
    description: 'Searchable HTTP status codes with descriptions, use cases, and examples.',
    url: 'https://www.devutil.dev/http-status-codes',
    siteName: 'DevUtil',
    type: 'website',
    images: [
      {
        url: 'https://www.devutil.dev/images/http-status-codes.png',
        width: 1200,
        height: 630,
        alt: 'HTTP Status Codes'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTTP Status Codes Reference',
    description: 'Look up 429, 502, 404 and more — searchable, with examples.',
    images: ['https://www.devutil.dev/images/http-status-codes.png']
  },
  robots: { index: true, follow: true }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HTTP Status Codes Reference',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://www.devutil.dev/http-status-codes',
  description: 'Searchable HTTP status code reference for developers.'
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is HTTP 429?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '429 Too Many Requests means the client hit a rate limit. APIs often include a Retry-After header.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is HTTP 502?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '502 Bad Gateway means a proxy or gateway received an invalid response from an upstream server.'
      }
    }
  ]
};

export default function HttpStatusCodesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header subtitle="HTTP Status Codes" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            HTTP Status Codes Reference
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Searchable guide to 200, 301, 404, 429, 500, 502, and more — with use cases and examples.
            </span>
          </h1>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <HttpStatusCodesTool />
        </div>
        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-4 text-slate-600">
          <h2 className="text-2xl font-bold text-slate-900">Why bookmark a status code reference?</h2>
          <p>
            Developers constantly search “what is 429 status code” or “HTTP 502 meaning” while debugging APIs
            and gateways. This page keeps the common codes in one private, searchable list — no signup, no
            tracking of what you search.
          </p>
        </section>
        <RelatedTools current="http-status-codes" />
      </main>
      <Footer />
    </div>
  );
}
