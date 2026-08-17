import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import CronGeneratorTool from '../../components/CronGeneratorTool';

export const metadata: Metadata = {
  title: 'Free Cron Expression Generator Online - Build & Explain Cron',
  description:
    'Build standard 5-field cron expressions with a visual editor, presets, and human-readable explanations. Paste a cron string to decode it instantly.',
  keywords: [
    'cron generator',
    'cron expression generator',
    'crontab generator',
    'cron builder',
    'cron schedule',
    'cron explainer',
    'crontab syntax',
    'online cron tool'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/cron-generator'
  },
  openGraph: {
    title: 'Free Cron Expression Generator Online - Build & Explain Cron',
    description:
      'Create and explain standard 5-field cron expressions with presets and a visual builder.',
    url: 'https://www.devutil.dev/cron-generator',
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
    title: 'Free Cron Expression Generator Online - Build & Explain Cron',
    description: 'Build and explain standard 5-field cron expressions in your browser.',
    images: [
      {
        url: 'https://www.devutil.dev/images/devutil-home.png',
        alt: 'Cron Generator preview'
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
  name: 'Cron Expression Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  image: 'https://www.devutil.dev/images/devutil-home.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description:
    'Free cron expression generator and explainer for standard 5-field crontab schedules.',
  url: 'https://www.devutil.dev/cron-generator',
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
      name: 'Cron Generator',
      item: 'https://www.devutil.dev/cron-generator'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a cron expression?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A cron expression is a compact schedule string that tells cron when to run a job. The standard 5-field format covers minute, hour, day of month, month, and day of week.'
      }
    },
    {
      '@type': 'Question',
      name: 'What timezone do cron jobs use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most system cron daemons use the server local timezone. Cloud schedulers may use UTC or a configured timezone—always check your platform documentation.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is this a standard 5-field cron format?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. This tool uses the classic minute hour day-of-month month day-of-week format and does not include a seconds field.'
      }
    }
  ]
};

export default function CronGeneratorPage() {
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

      <Header subtitle="Cron Generator" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Free Cron Expression Generator
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Build standard 5-field cron schedules with presets, visual fields, and plain-English
              explanations.
            </span>
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <CronGeneratorTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-10 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is a cron expression generator?</h2>
            <p>
              A cron expression generator helps you create crontab schedules without memorizing field
              syntax. Pick minute, hour, day, month, and weekday values—or start from presets like hourly,
              daily, weekly, and monthly.
            </p>
            <p>
              The tool also explains expressions in plain English so you can verify schedules before adding
              them to servers, CI pipelines, or cloud job runners.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why use a visual cron builder?</h2>
            <p>
              Cron typos can trigger jobs too often or never at all. A visual builder reduces mistakes by
              letting you adjust each field and immediately see the resulting expression and explanation.
            </p>
            <p>
              Paste an existing cron string to decode schedules you inherited from another team or
              documentation.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to use this cron generator</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Choose a preset or set each field (minute, hour, day, month, weekday).</li>
              <li>Review the generated expression and human-readable explanation.</li>
              <li>Copy the cron string into your crontab or scheduler.</li>
              <li>Optionally paste an existing expression to explain it.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Privacy-first by default</h2>
            <p>
              Schedule building and explanations run in your browser only. Nothing is uploaded or stored
              on a server.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What is a cron expression?</h3>
            <p>
              A cron expression is a compact schedule string that tells cron when to run a job. The
              standard 5-field format covers minute, hour, day of month, month, and day of week.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              What timezone do cron jobs use?
            </h3>
            <p>
              Most system cron daemons use the server local timezone. Cloud schedulers may use UTC or a
              configured timezone—always check your platform documentation.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
              Is this a standard 5-field cron format?
            </h3>
            <p>
              Yes. This tool uses the classic minute hour day-of-month month day-of-week format and does
              not include a seconds field.
            </p>
          </div>
        </section>

        <RelatedTools current="cron-generator" />
      </main>

      <Footer />
    </div>
  );
}
