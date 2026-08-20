import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import SemverCalculatorTool from '../../components/SemverCalculatorTool';

export const metadata: Metadata = {
  title: 'Semver Calculator — Check if Version Matches Range',
  description:
    'Free semver calculator: test whether a version satisfies a range like ^1.2.0, ~2.0.0, or >=1 <2. Built for npm and package maintainers. 100% client-side.',
  keywords: [
    'semver calculator',
    'semver range checker',
    'npm version range',
    'caret tilde semver',
    'does version satisfy range',
    'semantic versioning tool'
  ],
  alternates: { canonical: 'https://www.devutil.dev/semver-calculator' },
  openGraph: {
    title: 'Semver Calculator — Check if Version Matches Range',
    description: 'Test ^, ~, comparators, and hyphen ranges against a version — in your browser.',
    url: 'https://www.devutil.dev/semver-calculator',
    siteName: 'DevUtil',
    type: 'website',
    images: [
      {
        url: 'https://www.devutil.dev/images/semver-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Semver Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Semver Calculator',
    description: 'Check if 1.2.3 satisfies ^1.2.0 and other npm ranges.',
    images: ['https://www.devutil.dev/images/semver-calculator.png']
  },
  robots: { index: true, follow: true }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Semver Calculator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://www.devutil.dev/semver-calculator',
  description: 'Check whether a semantic version satisfies a range.'
};

export default function SemverCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header subtitle="Semver Calculator" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Semver Calculator
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Check if a version matches a semantic version range (^, ~, &gt;=, hyphen, ||).
            </span>
          </h1>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <SemverCalculatorTool />
        </div>
        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-4 text-slate-600">
          <h2 className="text-2xl font-bold text-slate-900">For npm &amp; package maintainers</h2>
          <p>
            Dependency ranges like <code className="text-slate-800">^1.2.0</code> are easy to misread.
            Paste a concrete version and a range to see whether it satisfies — useful when debugging lockfiles
            and peer dependency conflicts.
          </p>
        </section>
        <RelatedTools current="semver-calculator" />
      </main>
      <Footer />
    </div>
  );
}
