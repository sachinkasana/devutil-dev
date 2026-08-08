import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import HtmlEntityEncoderTool from '../../components/HtmlEntityEncoderTool';

export const metadata: Metadata = {
  title: 'Free HTML Entity Encoder & Decoder Online - Encode & Decode Entities | DevUtil',
  description:
    'Encode special characters to HTML entities (&lt;, &gt;, &amp;, &quot;) and decode them back instantly. Free, private, client-side HTML entity tool.',
  keywords: [
    'html entity encoder',
    'html entity decoder',
    'encode html entities',
    'decode html entities',
    'html escape',
    'html special characters',
    'convert to html entities',
    'html entity converter'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/html-entity-encoder'
  },
  openGraph: {
    title: 'Free HTML Entity Encoder & Decoder Online - Encode & Decode Entities | DevUtil',
    description:
      'Encode and decode HTML entities instantly in your browser. Free and private.',
    url: 'https://www.devutil.dev/html-entity-encoder',
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
    title: 'Free HTML Entity Encoder & Decoder Online - Encode & Decode Entities | DevUtil',
    description: 'Encode and decode HTML entities instantly in your browser.',
    images: [
      {
        url: 'https://www.devutil.dev/images/devutil-home.png',
        alt: 'HTML Entity Encoder preview'
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
  name: 'HTML Entity Encoder',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  image: 'https://www.devutil.dev/images/devutil-home.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description:
    'Free HTML entity encoder and decoder for converting special characters to entities and back.',
  url: 'https://www.devutil.dev/html-entity-encoder',
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
      name: 'HTML Entity Encoder',
      item: 'https://www.devutil.dev/html-entity-encoder'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are HTML entities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HTML entities are escaped representations of characters that have special meaning in HTML, such as &lt; for <, &gt; for >, &amp; for &, and &quot; for ".'
      }
    },
    {
      '@type': 'Question',
      name: 'When should I encode HTML entities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Encode entities when inserting untrusted or special-character text into HTML so browsers display the characters instead of interpreting them as markup.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is encoding the same as escaping for XSS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HTML entity encoding is one important part of XSS prevention for HTML text contexts, but secure apps also need context-aware escaping, CSP, and validated frameworks—encoding alone is not a complete security strategy.'
      }
    }
  ]
};

export default function HtmlEntityEncoderPage() {
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

      <Header subtitle="HTML Entity Encoder" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Free HTML Entity Encoder &amp; Decoder
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Encode special characters to HTML entities or decode them back—fast, free, and private.
            </span>
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <HtmlEntityEncoderTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-10 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is an HTML entity encoder?</h2>
            <p>
              An HTML entity encoder converts characters like &lt;, &gt;, &amp;, and quotes into their
              entity forms (&amp;lt;, &amp;gt;, &amp;amp;, &amp;quot;) so they display as text instead of
              being parsed as HTML markup.
            </p>
            <p>
              Decoding reverses the process—turning entities back into readable characters for editing or
              debugging.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">When developers need entity encoding</h2>
            <p>
              Use encoding when pasting sample HTML into docs, preparing safe display text, or checking how
              escaped content looks in templates. Decode when you receive entity-encoded strings from APIs
              or CMS fields and need the original text.
            </p>
            <p>
              Toggle Encode/Decode mode, convert, and copy the result—no scripts or build steps required.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to use this encoder</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Choose Encode or Decode mode.</li>
              <li>Paste your text into the input panel.</li>
              <li>Click Encode or Decode to generate output.</li>
              <li>Copy the result, or use output as input to reverse the conversion.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Privacy-first by default</h2>
            <p>
              Encoding and decoding run only in your browser. Your content is never uploaded, logged, or
              stored on a server.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What are HTML entities?</h3>
            <p>
              HTML entities are escaped representations of characters that have special meaning in HTML,
              such as &amp;lt; for &lt;, &amp;gt; for &gt;, &amp;amp; for &amp;, and &amp;quot; for &quot;.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              When should I encode HTML entities?
            </h3>
            <p>
              Encode entities when inserting untrusted or special-character text into HTML so browsers
              display the characters instead of interpreting them as markup.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              Is encoding the same as escaping for XSS?
            </h3>
            <p>
              HTML entity encoding is one important part of XSS prevention for HTML text contexts, but
              secure apps also need context-aware escaping, CSP, and validated frameworks—encoding alone is
              not a complete security strategy.
            </p>
          </div>
        </section>

        <RelatedTools current="html-entity-encoder" />
      </main>

      <Footer />
    </div>
  );
}
