import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import RelatedTools from '../../../components/RelatedTools';

export const metadata = {
  title: 'YAML vs JSON — When to Use Each (With Converter)',
  description:
    'Compare YAML and JSON for configs, APIs, and Kubernetes. Convert between formats instantly in your browser.',
  alternates: { canonical: 'https://www.devutil.dev/guides/yaml-vs-json' }
};

export default function YamlVsJsonGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="Guides" />
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-slate">
        <p className="text-sm text-slate-500">
          <a href="/guides" className="text-blue-600 hover:underline">Guides</a> / YAML vs JSON
        </p>
        <h1>YAML vs JSON — When to Use Each</h1>
        <p>
          JSON is the default for APIs and many app configs. YAML is popular for Kubernetes, CI pipelines, and
          human-edited infrastructure files because it is less noisy for nested structures.
        </p>
        <p>
          <a className="font-semibold text-blue-600" href="/yaml-json-converter">Convert YAML ↔ JSON now →</a>
        </p>

        <h2>Quick comparison</h2>
        <ul>
          <li><strong>JSON</strong> — strict syntax, ubiquitous in HTTP APIs, easy to parse everywhere</li>
          <li><strong>YAML</strong> — indentation-based, supports comments, nicer for long configs</li>
          <li><strong>Interchange</strong> — most YAML documents map cleanly to JSON data structures</li>
        </ul>

        <h2>When to convert</h2>
        <p>
          Convert YAML to JSON when an API or library expects JSON. Convert JSON to YAML when you want a readable
          config checked into git with comments added afterward.
        </p>

        <h2>Related tools</h2>
        <ul>
          <li><a href="/json-formatter">JSON Formatter</a></li>
          <li><a href="/xml-formatter">XML Formatter</a></li>
          <li><a href="/diff-checker">Diff Checker</a> to review config changes</li>
        </ul>

        <RelatedTools current="yaml-json-converter" />
      </main>
      <Footer />
    </div>
  );
}
