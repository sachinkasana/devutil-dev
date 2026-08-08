import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import RelatedTools from '../../../components/RelatedTools';

export const metadata = {
  title: 'How to Format SQL Queries Online — DevUtil Guide',
  description:
    'Beautify messy SQL for code review and debugging. Learn when to minify SQL and format queries privately in your browser.',
  alternates: { canonical: 'https://www.devutil.dev/guides/format-sql-online' }
};

export default function FormatSqlGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="Guides" />
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-slate">
        <p className="text-sm text-slate-500">
          <a href="/guides" className="text-blue-600 hover:underline">Guides</a> / Format SQL Online
        </p>
        <h1>How to Format SQL Queries Online</h1>
        <p>
          Long SQL strings from ORMs, logs, or BI tools are painful to read. Formatting adds consistent
          indentation and clause breaks so joins, filters, and aggregations are easier to review.
        </p>
        <p>
          <a className="font-semibold text-blue-600" href="/sql-formatter">Open the free SQL Formatter →</a>
        </p>

        <h2>Beautify vs minify</h2>
        <p>
          Use <strong>beautify</strong> when editing, reviewing PRs, or documenting queries. Use{' '}
          <strong>minify</strong> when you need a compact one-liner for logs, env vars, or generated code.
        </p>

        <h2>Privacy tip</h2>
        <p>
          Production SQL can contain customer IDs or sensitive filters. Prefer a client-side formatter so query
          text is never uploaded.
        </p>

        <h2>Next steps</h2>
        <ul>
          <li>Compare query versions with the <a href="/diff-checker">Diff Checker</a></li>
          <li>Test patterns in WHERE clauses with the <a href="/regex-tester">Regex Tester</a></li>
          <li>Format related payloads with the <a href="/json-formatter">JSON Formatter</a></li>
        </ul>

        <RelatedTools current="sql-formatter" />
      </main>
      <Footer />
    </div>
  );
}
