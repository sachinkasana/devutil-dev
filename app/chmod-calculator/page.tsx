import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import ChmodCalculatorTool from '../../components/ChmodCalculatorTool';

export const metadata: Metadata = {
  title: 'Free chmod Calculator Online — Unix File Permissions (755, 644)',
  description:
    'Free chmod calculator and Unix permissions converter. Toggle read/write/execute for owner, group, and others — get octal (755), symbolic mode, and the chmod command. 100% client-side.',
  keywords: [
    'chmod calculator',
    'unix permissions calculator',
    'chmod 755',
    'chmod 644',
    'file permissions calculator',
    'linux permissions',
    'octal permissions'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/chmod-calculator'
  },
  openGraph: {
    title: 'Free chmod Calculator Online — Unix File Permissions',
    description:
      'Convert between checkboxes, octal modes like 755/644, and chmod commands. Private and client-side.',
    url: 'https://www.devutil.dev/chmod-calculator',
    siteName: 'DevUtil',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.devutil.dev/images/chmod-calculator.png',
        width: 1200,
        height: 630,
        alt: 'chmod Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free chmod Calculator Online — Unix File Permissions',
    description: 'Calculate chmod 755, 644, and more instantly in your browser.',
    images: ['https://www.devutil.dev/images/chmod-calculator.png']
  },
  robots: { index: true, follow: true }
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'chmod Calculator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  image: 'https://www.devutil.dev/images/chmod-calculator.png',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Free online chmod calculator for Unix/Linux file permissions with octal and symbolic output.',
  url: 'https://www.devutil.dev/chmod-calculator',
  publisher: { '@type': 'Organization', name: 'DevUtil', url: 'https://www.devutil.dev/' }
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.devutil.dev' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'chmod Calculator',
      item: 'https://www.devutil.dev/chmod-calculator'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does chmod 755 mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '755 means owner can read, write, and execute; group and others can read and execute but not write. It is a common mode for directories and executable scripts.'
      }
    },
    {
      '@type': 'Question',
      name: 'What does chmod 644 mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '644 means owner can read and write; group and others can only read. It is the usual mode for regular files like documents and source code.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does this chmod calculator upload my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All permission math runs in your browser. Nothing is sent to a server.'
      }
    }
  ]
};

export default function ChmodCalculatorPage() {
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

      <Header subtitle="chmod Calculator" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Free chmod Calculator
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Unix/Linux file permissions — octal (755), symbolic mode, and ready-to-run chmod commands.
            </span>
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <ChmodCalculatorTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-8 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is a chmod calculator?</h2>
            <p>
              A chmod calculator converts between human-friendly permission checkboxes and the octal
              numbers used by the Unix <code className="text-slate-800">chmod</code> command. Each digit
              is the sum of read (4), write (2), and execute (1) for owner, group, and others.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Common modes</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>755</strong> — directories and scripts you want others to run
              </li>
              <li>
                <strong>644</strong> — normal files
              </li>
              <li>
                <strong>600</strong> — private files (SSH keys, env files)
              </li>
              <li>
                <strong>700</strong> — private directories
              </li>
            </ul>
          </div>
        </section>

        <RelatedTools current="chmod-calculator" />
      </main>
      <Footer />
    </div>
  );
}
