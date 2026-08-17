import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata = {
  title: "What's New — New Tools & SEO Updates",
  description:
    'See the latest DevUtil tools: JWT verify & sign, chmod calculator, SQL/XML formatters, YAML↔JSON, cron, Markdown, JSON↔CSV, UUID v7, and privacy-first analytics.',
  alternates: { canonical: 'https://www.devutil.dev/whats-new' }
};

const updates = [
  {
    title: 'JWT verify/sign + chmod calculator',
    items: [
      'JWT tool now verifies HS256/384/512 and can sign/generate tokens client-side',
      'New chmod Calculator for Unix permissions (755, 644, presets, symbolic + command)'
    ]
  },
  {
    title: 'New high-demand tools',
    items: [
      'SQL Formatter, XML Formatter, YAML ↔ JSON Converter',
      'Cron Generator, Case Converter, HTML Entity Encoder',
      'Markdown Preview, Number Base Converter, JSON ↔ CSV Converter',
      'UUID Generator now supports v4 and time-ordered v7 (bulk up to 500)'
    ]
  },
  {
    title: 'Guides for search & learning',
    items: [
      'How to format JSON online safely',
      'How to format SQL online',
      'Cron expression examples',
      'YAML vs JSON — when to use each'
    ]
  },
  {
    title: 'Privacy-first analytics',
    items: [
      'GA4 + Umami + Vercel Analytics for product insights',
      'Tool inputs are still never uploaded — only aggregate usage events'
    ]
  }
];

export default function WhatsNewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="What's New" />
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">What&apos;s New on DevUtil</h1>
        <p className="text-slate-600 mb-8">
          DevUtil is growing into a full privacy-first toolbox for everyday developer work. Share this page when
          launching on Product Hunt, Reddit, Indie Hackers, or with your team.
        </p>

        <div className="space-y-6">
          {updates.map((section) => (
            <section key={section.title} className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">{section.title}</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="/" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
            Explore all tools
          </a>
          <a href="/guides" className="px-5 py-3 rounded-lg border border-slate-300 bg-white font-medium hover:bg-slate-50">
            Read guides
          </a>
        </div>

        <section className="mt-12 text-sm text-slate-600 space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Share / launch links</h2>
          <p>Website: <a className="text-blue-600" href="https://www.devutil.dev">https://www.devutil.dev</a></p>
          <p>GitHub: <a className="text-blue-600" href="https://github.com/sachinkasana/devutil-dev">sachinkasana/devutil-dev</a></p>
          <p>Tagline: Free privacy-first developer utilities — format, convert, encode, generate — 100% in your browser.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
