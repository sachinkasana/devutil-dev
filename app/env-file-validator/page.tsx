import type { Metadata } from 'next';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import Footer from '../../components/Footer';
import EnvFileValidatorTool from '../../components/EnvFileValidatorTool';

export const metadata: Metadata = {
  title: 'ENV File Parser & Validator — Check .env Online',
  description:
    'Paste a .env file to validate format, catch duplicate keys, and export as JSON. Free client-side env parser — secrets never leave your browser.',
  keywords: [
    'env file validator',
    'dotenv parser',
    '.env validator',
    'env to json',
    'duplicate env keys',
    'dotenv checker online'
  ],
  alternates: { canonical: 'https://www.devutil.dev/env-file-validator' },
  openGraph: {
    title: 'ENV File Parser & Validator — Check .env Online',
    description: 'Validate .env files, find duplicate keys, export JSON — private and client-side.',
    url: 'https://www.devutil.dev/env-file-validator',
    siteName: 'DevUtil',
    type: 'website',
    images: [
      {
        url: 'https://www.devutil.dev/images/env-file-validator.png',
        width: 1200,
        height: 630,
        alt: 'ENV File Validator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ENV File Parser & Validator',
    description: 'Validate .env files and export JSON in your browser.',
    images: ['https://www.devutil.dev/images/env-file-validator.png']
  },
  robots: { index: true, follow: true }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ENV File Validator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://www.devutil.dev/env-file-validator',
  description: 'Validate dotenv/.env files and export JSON client-side.'
};

export default function EnvFileValidatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header subtitle="ENV File Validator" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            ENV File Parser &amp; Validator
            <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
              Validate .env format, detect duplicate keys, and export JSON — secrets stay on your device.
            </span>
          </h1>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <EnvFileValidatorTool />
        </div>
        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-4 text-slate-600">
          <h2 className="text-2xl font-bold text-slate-900">Safe .env checks</h2>
          <p>
            Environment files often contain API keys and database URLs. This validator runs entirely in your
            browser so you can lint format and duplicates without uploading secrets to a third-party server.
          </p>
        </section>
        <RelatedTools current="env-file-validator" />
      </main>
      <Footer />
    </div>
  );
}
