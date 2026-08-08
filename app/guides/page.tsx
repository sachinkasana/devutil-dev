import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { GUIDES, SITE, TOOLS } from '../seo-config';

export const metadata = {
  title: 'Developer Guides — JSON, SQL, Cron, YAML | DevUtil',
  description:
    'Practical guides for everyday developer tasks: format JSON and SQL, understand cron expressions, and choose between YAML and JSON — with free private tools.',
  alternates: { canonical: `${SITE.url}/guides` },
  openGraph: {
    title: 'Developer Guides | DevUtil',
    description: 'Learn formatting, conversion, and scheduling workflows with free client-side tools.',
    url: `${SITE.url}/guides`,
    images: [{ url: `${SITE.url}/images/devutil-home.png`, width: 1200, height: 630, alt: 'DevUtil Guides' }]
  }
};

const guideList = Object.entries(GUIDES).map(([slug, guide]) => ({
  slug,
  ...guide,
  toolTitle: TOOLS[guide.tool]?.shortTitle
}));

export default function GuidesHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="Guides" />
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Developer Guides</h1>
        <p className="text-slate-600 mb-10 max-w-3xl">
          Short, practical articles that help you get work done faster — then jump into a free DevUtil tool that
          runs entirely in your browser.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {guideList.map((guide) => (
            <a
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-sm transition"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-2">{guide.shortTitle}</h2>
              <p className="text-sm text-slate-600 mb-4">{guide.description}</p>
              <span className="text-sm font-medium text-blue-600">
                Read guide → related tool: {guide.toolTitle}
              </span>
            </a>
          ))}
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Prefer the tools directly?</h2>
          <p className="text-slate-600 mb-4">
            Browse the full toolbox — formatters, converters, encoders, and generators — all free and private.
          </p>
          <a href="/" className="text-blue-600 font-medium hover:underline">
            Open all tools
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
