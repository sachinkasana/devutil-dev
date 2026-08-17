import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import RelatedTools from '../../../components/RelatedTools';

export const metadata = {
  title: 'How to Format JSON Online (Safely)',
  description:
    'Learn how to format, validate, and minify JSON in your browser without uploading data. Fix common JSON errors with a free private formatter.',
  alternates: { canonical: 'https://www.devutil.dev/guides/format-json-online' }
};

export default function FormatJsonGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="Guides" />
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-slate">
        <p className="text-sm text-slate-500">
          <a href="/guides" className="text-blue-600 hover:underline">Guides</a> / Format JSON Online
        </p>
        <h1>How to Format JSON Online (Safely)</h1>
        <p>
          Messy or minified JSON is hard to debug. A JSON formatter adds indentation and line breaks so you can
          inspect API responses, config files, and payloads quickly — without installing an editor plugin.
        </p>
        <p>
          <a className="font-semibold text-blue-600" href="/json-formatter">Open the free JSON Formatter →</a>
        </p>

        <h2>Why format JSON in the browser?</h2>
        <p>
          Online formatters are convenient, but many upload your payload to a server. That is risky for tokens,
          PII, or internal API data. DevUtil formats JSON entirely in your browser, so the content never leaves
          your device.
        </p>

        <h2>Step-by-step</h2>
        <ol>
          <li>Open the <a href="/json-formatter">JSON Formatter</a>.</li>
          <li>Paste raw or minified JSON.</li>
          <li>Beautify to pretty-print, or minify for compact output.</li>
          <li>Fix validation errors if the parser highlights syntax issues.</li>
          <li>Copy the result back into your editor, ticket, or docs.</li>
        </ol>

        <h2>Common JSON errors</h2>
        <ul>
          <li>Trailing commas after the last property</li>
          <li>Single quotes instead of double quotes</li>
          <li>Unquoted object keys</li>
          <li>Unescaped backslashes in Windows paths or regex</li>
        </ul>

        <h2>Related workflows</h2>
        <ul>
          <li>Convert structured data with the <a href="/json-csv-converter">JSON ↔ CSV Converter</a></li>
          <li>Compare two payloads with the <a href="/diff-checker">Diff Checker</a></li>
          <li>Move configs with the <a href="/yaml-json-converter">YAML ↔ JSON Converter</a></li>
        </ul>

        <RelatedTools current="json-formatter" />
      </main>
      <Footer />
    </div>
  );
}
