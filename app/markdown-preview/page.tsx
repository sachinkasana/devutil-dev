import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import MarkdownPreviewTool from '../../components/MarkdownPreviewTool';

export const metadata: Metadata = {
  title: 'Free Markdown Preview Online - Live Markdown to HTML',
  description:
    'Preview Markdown as HTML instantly in your browser. Support for headings, lists, links, code blocks, and blockquotes with safe client-side rendering.',
  keywords: [
    'markdown preview',
    'markdown to html',
    'live markdown preview',
    'markdown editor online',
    'md preview',
    'markdown viewer',
    'online markdown previewer',
    'safe markdown renderer'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/markdown-preview'
  },
  openGraph: {
    title: 'Free Markdown Preview Online - Live Markdown to HTML',
    description:
      'Preview Markdown as HTML instantly. Free, private, and fully client-side.',
    url: 'https://www.devutil.dev/markdown-preview',
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
    title: 'Free Markdown Preview Online - Live Markdown to HTML',
    description: 'Preview Markdown as HTML instantly in your browser.',
    images: [
      {
        url: 'https://www.devutil.dev/images/devutil-home.png',
        alt: 'Markdown Preview preview'
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
  name: 'Markdown Preview',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  image: 'https://www.devutil.dev/images/devutil-home.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description:
    'Free live Markdown previewer that converts Markdown to safe HTML entirely in your browser.',
  url: 'https://www.devutil.dev/markdown-preview',
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
      name: 'Markdown Preview',
      item: 'https://www.devutil.dev/markdown-preview'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a Markdown previewer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Markdown previewer shows how Markdown text will look when rendered as HTML. You type or paste Markdown on one side and see headings, lists, links, and code formatting update live on the other.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does this tool upload my Markdown?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Rendering runs fully in your browser. Your Markdown stays on your device and is never uploaded to a server.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I copy HTML output?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Use Copy HTML to copy the generated markup, or Copy Markdown to copy your source. Raw HTML in the input is escaped for safety.'
      }
    }
  ]
};

export default function MarkdownPreviewPage() {
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

      <Header subtitle="Markdown Preview" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Free Markdown Preview
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Live Markdown to HTML with safe client-side rendering, copy support, and no uploads.
            </span>
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <MarkdownPreviewTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-10 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is a Markdown preview?</h2>
            <p>
              A Markdown preview turns plain-text Markdown into formatted HTML so you can check
              headings, emphasis, lists, links, and code blocks before publishing docs or READMEs.
            </p>
            <p>
              This tool uses a lightweight client-side renderer: raw HTML in your input is escaped,
              and only generated tags from Markdown syntax are shown in the preview.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why preview Markdown online?</h2>
            <p>
              Drafting docs, GitHub issues, or blog posts is faster when you can see formatting
              immediately. A split view catches broken links, list mistakes, and code fence issues
              without leaving the browser.
            </p>
            <p>
              Copy Markdown for editors that accept MD, or copy HTML when you need markup for a CMS
              or email template.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to use this previewer</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Paste or type Markdown in the left panel (or load the sample).</li>
              <li>Watch the live HTML preview update on the right.</li>
              <li>Copy Markdown or Copy HTML when you are ready.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Privacy-first by default</h2>
            <p>
              All rendering happens in your browser. No Markdown is uploaded, stored remotely, or
              used for training.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              What is a Markdown previewer?
            </h3>
            <p>
              A Markdown previewer shows how Markdown text will look when rendered as HTML. You type
              or paste Markdown on one side and see headings, lists, links, and code formatting
              update live on the other.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              Does this tool upload my Markdown?
            </h3>
            <p>
              No. Rendering runs fully in your browser. Your Markdown stays on your device and is
              never uploaded to a server.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              Can I copy HTML output?
            </h3>
            <p>
              Yes. Use Copy HTML to copy the generated markup, or Copy Markdown to copy your source.
              Raw HTML in the input is escaped for safety.
            </p>
          </div>
        </section>

        <RelatedTools current="markdown-preview" />
      </main>

      <Footer />
    </div>
  );
}
