import { ChevronRight } from 'lucide-react';

const tools = [
  { key: 'json-formatter', name: 'JSON Formatter', href: '/json-formatter', description: 'Format, validate, and beautify JSON data instantly' },
  { key: 'sql-formatter', name: 'SQL Formatter', href: '/sql-formatter', description: 'Beautify and minify SQL queries instantly' },
  { key: 'xml-formatter', name: 'XML Formatter', href: '/xml-formatter', description: 'Beautify, validate, and minify XML documents' },
  { key: 'yaml-json-converter', name: 'YAML ↔ JSON Converter', href: '/yaml-json-converter', description: 'Convert between YAML and JSON instantly' },
  { key: 'json-csv-converter', name: 'JSON ↔ CSV Converter', href: '/json-csv-converter', description: 'Convert JSON arrays to CSV and back' },
  { key: 'base64-encoder', name: 'Base64 Encoder', href: '/base64-encoder', description: 'Encode and decode Base64 strings with ease' },
  { key: 'diff-checker', name: 'Diff Checker', href: '/diff-checker', description: 'Compare text differences with highlighted changes' },
  { key: 'cron-generator', name: 'Cron Generator', href: '/cron-generator', description: 'Build and explain standard cron expressions' },
  { key: 'markdown-preview', name: 'Markdown Preview', href: '/markdown-preview', description: 'Live Markdown editor with HTML preview' },
  { key: 'case-converter', name: 'Case Converter', href: '/case-converter', description: 'Convert text between camelCase, snake_case, and more' },
  { key: 'number-base-converter', name: 'Number Base Converter', href: '/number-base-converter', description: 'Convert binary, octal, decimal, and hex' },
  { key: 'html-entity-encoder', name: 'HTML Entity Encoder', href: '/html-entity-encoder', description: 'Encode and decode HTML entities safely' },
  { key: 'uuid-generator', name: 'UUID Generator', href: '/uuid-generator', description: 'Generate UUID v4 & v7 identifiers' },
  { key: 'hash-generator', name: 'Hash Generator', href: '/hash-generator', description: 'Generate MD5, SHA-1, SHA-256 hashes' },
  { key: 'password-generator', name: 'Password Generator', href: '/password-generator', description: 'Create strong, secure passwords instantly' },
  { key: 'regex-tester', name: 'Regex Tester', href: '/regex-tester', description: 'Test and debug regular expressions live' },
  { key: 'url-encoder', name: 'URL Encoder', href: '/url-encoder', description: 'Encode and decode URL components' },
  { key: 'jwt-decoder', name: 'JWT Decoder', href: '/jwt-decoder', description: 'Decode and verify JSON Web Tokens' },
  { key: 'timestamp-converter', name: 'Timestamp Converter', href: '/timestamp-converter', description: 'Convert Unix timestamps to human dates' },
  { key: 'qr-code-generator', name: 'QR Code Generator', href: '/qr-code-generator', description: 'Create QR codes for URLs, WiFi, and vCards' },
  { key: 'color-picker', name: 'Color Picker', href: '/color-picker', description: 'Pick colors and convert HEX, RGB, HSL' },
  { key: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', href: '/lorem-ipsum-generator', description: 'Generate placeholder text for designs' }
];

const relatedMap = {
  'json-formatter': ['json-csv-converter', 'yaml-json-converter', 'xml-formatter', 'diff-checker'],
  'sql-formatter': ['json-formatter', 'xml-formatter', 'diff-checker', 'regex-tester'],
  'xml-formatter': ['json-formatter', 'yaml-json-converter', 'html-entity-encoder', 'sql-formatter'],
  'yaml-json-converter': ['json-formatter', 'json-csv-converter', 'xml-formatter', 'diff-checker'],
  'json-csv-converter': ['json-formatter', 'yaml-json-converter', 'diff-checker', 'case-converter'],
  'base64-encoder': ['json-formatter', 'url-encoder', 'html-entity-encoder', 'hash-generator'],
  'diff-checker': ['json-formatter', 'markdown-preview', 'case-converter', 'sql-formatter'],
  'cron-generator': ['timestamp-converter', 'regex-tester', 'uuid-generator', 'number-base-converter'],
  'markdown-preview': ['html-entity-encoder', 'diff-checker', 'lorem-ipsum-generator', 'case-converter'],
  'case-converter': ['regex-tester', 'markdown-preview', 'json-csv-converter', 'html-entity-encoder'],
  'number-base-converter': ['hash-generator', 'uuid-generator', 'cron-generator', 'color-picker'],
  'html-entity-encoder': ['markdown-preview', 'url-encoder', 'xml-formatter', 'base64-encoder'],
  'uuid-generator': ['hash-generator', 'password-generator', 'timestamp-converter', 'cron-generator'],
  'hash-generator': ['uuid-generator', 'password-generator', 'number-base-converter', 'base64-encoder'],
  'password-generator': ['hash-generator', 'uuid-generator', 'jwt-decoder', 'base64-encoder'],
  'regex-tester': ['case-converter', 'cron-generator', 'markdown-preview', 'diff-checker'],
  'url-encoder': ['html-entity-encoder', 'base64-encoder', 'json-formatter', 'regex-tester'],
  'jwt-decoder': ['base64-encoder', 'json-formatter', 'url-encoder', 'timestamp-converter'],
  'timestamp-converter': ['cron-generator', 'uuid-generator', 'jwt-decoder', 'hash-generator'],
  'qr-code-generator': ['url-encoder', 'base64-encoder', 'color-picker', 'markdown-preview'],
  'color-picker': ['qr-code-generator', 'number-base-converter', 'lorem-ipsum-generator', 'case-converter'],
  'lorem-ipsum-generator': ['markdown-preview', 'case-converter', 'color-picker', 'diff-checker']
};

const toolIndex = new Map(tools.map((tool) => [tool.key, tool]));

export default function RelatedTools({ current }) {
  const relatedKeys =
    relatedMap[current] ||
    tools.filter((tool) => tool.key !== current).slice(0, 4).map((tool) => tool.key);
  const relatedTools = relatedKeys.map((key) => toolIndex.get(key)).filter(Boolean);

  return (
    <section className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Related Tools</h2>
        <a href="/" className="text-sm text-blue-600 hover:underline">
          All tools
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedTools.map((tool) => (
          <a
            key={tool.key}
            href={tool.href}
            className="group border border-slate-200 rounded-xl p-4 bg-white hover:border-slate-300 hover:shadow-sm transition"
          >
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">{tool.name}</h3>
            <p className="text-xs text-slate-600 mt-1">{tool.description}</p>
            <span className="mt-3 inline-flex items-center text-xs text-blue-600">
              Open Tool <ChevronRight className="w-3 h-3 ml-1" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
