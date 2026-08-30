import React from 'react';
import {
  Code,
  Hash,
  Key,
  FileJson,
  Database,
  RefreshCw,
  Search,
  Braces,
  Lock,
  ShieldCheck,
  FileText,
  QrCode,
  Palette,
  FileDiff,
  FileCode,
  Clock,
  CaseSensitive,
  FileType,
  Binary,
  FolderCog,
  Globe2,
  FileKey2,
  GitBranch
} from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export const metadata = {
  title: 'Free Developer Utility Tools Online — 26 Browser-Based Tools',
  description:
    '26 free developer utility tools that run entirely in your browser — JSON formatter, SQL formatter, JWT decoder, Base64 encoder, UUID generator, chmod calculator, regex tester & more. No signup. Your data never leaves your device.',
  keywords: [
    'free developer utility tools',
    'developer utility tools',
    'developer utilities',
    'free online developer tools',
    'developer tools',
    'json formatter',
    'http status codes',
    'env file validator',
    'semver calculator',
    'jwt decoder',
    'chmod calculator',
    'yaml to json',
    'cron generator',
    'base64 encoder',
    'uuid generator',
    'regex tester',
    'rgb color picker'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Free Developer Utility Tools Online — 26 Browser-Based Tools',
    description:
      '26 free developer utility tools that run entirely in your browser — JSON formatter, JWT decoder, Base64, UUID generator, chmod calculator & more. No signup. Your data never leaves your device.',
    url: '/',
    images: [
      {
        url: 'https://www.devutil.dev/images/devutil-home.png',
        width: 1200,
        height: 630,
        alt: 'DevUtil — free developer utility tools'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Developer Utility Tools Online — 26 Browser-Based Tools',
    description:
      '26 free developer utility tools that run in your browser — JSON, JWT, Base64, UUID, chmod & more. No signup. Data never leaves your device.',
    images: ['https://www.devutil.dev/images/devutil-home.png']
  }
};

const tools = [
  {
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data instantly',
    icon: FileJson,
    href: '/json-formatter',
    color: 'bg-blue-500',
    popular: true,
    category: 'Formatters'
  },
  {
    name: 'SQL Formatter',
    description: 'Beautify and minify SQL queries instantly',
    icon: Database,
    href: '/sql-formatter',
    color: 'bg-violet-500',
    popular: true,
    category: 'Formatters'
  },
  {
    name: 'XML Formatter',
    description: 'Beautify, validate, and minify XML documents',
    icon: FileCode,
    href: '/xml-formatter',
    color: 'bg-fuchsia-500',
    popular: true,
    category: 'Formatters'
  },
  {
    name: 'YAML ↔ JSON Converter',
    description: 'Convert between YAML and JSON instantly',
    icon: FileType,
    href: '/yaml-json-converter',
    color: 'bg-lime-600',
    popular: true,
    category: 'Converters'
  },
  {
    name: 'Base64 Encoder',
    description: 'Encode and decode Base64 strings with ease',
    icon: Lock,
    href: '/base64-encoder',
    color: 'bg-green-500',
    popular: true,
    category: 'Encoders'
  },
  {
    name: 'Diff Checker',
    description: 'Compare text differences with highlighted changes',
    icon: FileDiff,
    href: '/diff-checker',
    color: 'bg-sky-500',
    popular: true,
    category: 'Text'
  },
  {
    name: 'Cron Generator',
    description: 'Build and explain standard cron expressions',
    icon: Clock,
    href: '/cron-generator',
    color: 'bg-rose-500',
    popular: true,
    category: 'Generators'
  },
  {
    name: 'Case Converter',
    description: 'camelCase, snake_case, kebab-case, and more',
    icon: CaseSensitive,
    href: '/case-converter',
    color: 'bg-yellow-600',
    category: 'Text'
  },
  {
    name: 'HTML Entity Encoder',
    description: 'Encode and decode HTML entities safely',
    icon: Binary,
    href: '/html-entity-encoder',
    color: 'bg-stone-600',
    category: 'Encoders'
  },
  {
    name: 'Markdown Preview',
    description: 'Live Markdown editor with HTML preview',
    icon: FileText,
    href: '/markdown-preview',
    color: 'bg-neutral-700',
    popular: true,
    category: 'Text'
  },
  {
    name: 'Number Base Converter',
    description: 'Convert binary, octal, decimal, and hex',
    icon: Hash,
    href: '/number-base-converter',
    color: 'bg-blue-700',
    category: 'Converters'
  },
  {
    name: 'JSON ↔ CSV Converter',
    description: 'Convert JSON arrays to CSV and back',
    icon: FileJson,
    href: '/json-csv-converter',
    color: 'bg-green-700',
    popular: true,
    category: 'Converters'
  },
  {
    name: 'UUID Generator',
    description: 'Generate UUID v4 & v7 identifiers instantly',
    icon: Key,
    href: '/uuid-generator',
    color: 'bg-purple-500',
    popular: true,
    category: 'Generators'
  },
  {
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256 hashes',
    icon: Hash,
    href: '/hash-generator',
    color: 'bg-orange-500',
    category: 'Generators'
  },
  {
    name: 'Password Generator',
    description: 'Create strong, secure passwords instantly',
    icon: ShieldCheck,
    href: '/password-generator',
    color: 'bg-emerald-500',
    category: 'Generators'
  },
  {
    name: 'Regex Tester',
    description: 'Test and debug regular expressions live',
    icon: Search,
    href: '/regex-tester',
    color: 'bg-red-500',
    category: 'Text'
  },
  {
    name: 'URL Encoder',
    description: 'Encode and decode URL components',
    icon: Code,
    href: '/url-encoder',
    color: 'bg-indigo-500',
    category: 'Encoders'
  },
  {
    name: 'JWT Decoder',
    description: 'Decode, verify HS256, and sign JWTs',
    icon: Braces,
    href: '/jwt-decoder',
    color: 'bg-pink-500',
    popular: true,
    category: 'Converters'
  },
  {
    name: 'chmod Calculator',
    description: 'Unix permissions — 755, 644, and more',
    icon: FolderCog,
    href: '/chmod-calculator',
    color: 'bg-zinc-700',
    popular: true,
    category: 'Converters'
  },
  {
    name: 'HTTP Status Codes',
    description: 'Searchable 200, 404, 429, 502 reference',
    icon: Globe2,
    href: '/http-status-codes',
    color: 'bg-sky-700',
    popular: true,
    category: 'Reference'
  },
  {
    name: 'ENV File Validator',
    description: 'Validate .env, find dupes, export JSON',
    icon: FileKey2,
    href: '/env-file-validator',
    color: 'bg-lime-700',
    popular: true,
    category: 'Validators'
  },
  {
    name: 'Semver Calculator',
    description: 'Check if a version matches ^ / ~ ranges',
    icon: GitBranch,
    href: '/semver-calculator',
    color: 'bg-orange-700',
    popular: true,
    category: 'Converters'
  },
  {
    name: 'Timestamp Converter',
    description: 'Convert Unix timestamps to human dates',
    icon: RefreshCw,
    href: '/timestamp-converter',
    color: 'bg-teal-500',
    category: 'Converters'
  },
  {
    name: 'QR Code Generator',
    description: 'Create QR codes for URLs, WiFi, and vCards',
    icon: QrCode,
    href: '/qr-code-generator',
    color: 'bg-amber-500',
    popular: true,
    category: 'Generators'
  },
  {
    name: 'Color Picker',
    description: 'Pick colors and convert HEX, RGB, HSL',
    icon: Palette,
    href: '/color-picker',
    color: 'bg-cyan-500',
    category: 'Generators'
  },
  {
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for designs',
    icon: FileText,
    href: '/lorem-ipsum-generator',
    color: 'bg-slate-500',
    category: 'Text'
  }
];

const hubLinks = [
  { href: '/json-formatter', label: 'JSON Formatter' },
  { href: '/sql-formatter', label: 'SQL Formatter' },
  { href: '/xml-formatter', label: 'XML Formatter' },
  { href: '/yaml-json-converter', label: 'YAML ↔ JSON' },
  { href: '/json-csv-converter', label: 'JSON ↔ CSV' },
  { href: '/cron-generator', label: 'Cron Generator' },
  { href: '/markdown-preview', label: 'Markdown Preview' },
  { href: '/case-converter', label: 'Case Converter' },
  { href: '/number-base-converter', label: 'Number Base Converter' },
  { href: '/html-entity-encoder', label: 'HTML Entity Encoder' },
  { href: '/base64-encoder', label: 'Base64 Encoder' },
  { href: '/diff-checker', label: 'Diff Checker' },
  { href: '/uuid-generator', label: 'UUID Generator' },
  { href: '/hash-generator', label: 'Hash Generator' },
  { href: '/regex-tester', label: 'Regex Tester' },
  { href: '/url-encoder', label: 'URL Encoder' },
  { href: '/jwt-decoder', label: 'JWT Decoder' },
  { href: '/chmod-calculator', label: 'chmod Calculator' },
  { href: '/http-status-codes', label: 'HTTP Status Codes' },
  { href: '/env-file-validator', label: 'ENV File Validator' },
  { href: '/semver-calculator', label: 'Semver Calculator' },
  { href: '/timestamp-converter', label: 'Timestamp Converter' },
  { href: '/password-generator', label: 'Password Generator' },
  { href: '/lorem-ipsum-generator', label: 'Lorem Ipsum Generator' },
  { href: '/qr-code-generator', label: 'QR Code Generator' },
  { href: '/color-picker', label: 'Color Picker' },
  { href: '/guides', label: 'Guides' }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="Essential Developer Tools" showGithub />

      <main id="main-content">
        <section className="w-full px-3 sm:px-4 lg:px-6 py-10 text-center">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Free Developer
              <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Utilities &amp; Tools
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
              26 free developer utility tools that run in your browser. Format JSON, decode JWTs, convert
              Base64, generate UUIDs, calculate chmod — zero signup, zero data upload.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-500">
              <span className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                100% Client-Side
              </span>
              <span className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1">
                <Lock className="w-4 h-4" />
                Privacy First
              </span>
              <span className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1">
                <RefreshCw className="w-4 h-4" />
                Always Free · {tools.length} Tools
              </span>
            </div>
          </div>
        </section>

        <section className="w-full px-3 sm:px-4 lg:px-6 pb-16">
          <div className="mb-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Explore the Toolbox</h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600">
              Formatters, converters, encoders, and generators — pick a utility and get started in seconds.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <a
                  key={tool.name}
                  href={tool.href}
                  data-analytics-event="tool_open"
                  data-analytics-label={tool.name}
                  className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-slate-300"
                >
                  {tool.popular && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Popular
                      </span>
                    </div>
                  )}
                  <div className="space-y-4">
                    <div
                      className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">{tool.description}</p>
                    </div>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <span>Open Tool</span>
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section className="bg-white border-t border-slate-200 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-600 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900">
              Free Developer Tools &amp; Utilities Online
            </h2>
            <p>
              DevUtil is a fast toolkit for everyday developer tasks. Each tool runs in your browser, so data stays on
              your device. Format JSON, SQL, and XML; convert YAML ↔ JSON or JSON ↔ CSV; preview Markdown; build cron
              schedules; transform text case; encode HTML entities; generate UUID v4/v7; and test regex patterns —
              without installing anything. New here? Start with the{' '}
              <a className="text-blue-600 font-semibold hover:underline" href="/guides">
                developer guides
              </a>{' '}
              or see{' '}
              <a className="text-blue-600 font-semibold hover:underline" href="/whats-new">
                what&apos;s new
              </a>
              .
            </p>
            <p>
              Use DevUtil as a lightweight hub for common workflows. Format a JSON response, then jump to the YAML
              converter for config files. Decode a JWT and open the JSON formatter to inspect the payload. Build a cron
              expression, then compare config diffs. These links keep your flow moving and reduce copy-paste errors.
            </p>
            <p>
              The toolkit focuses on simple, single-purpose utilities with clear actions, practical defaults, and instant
              results. If you need a quick formatter, converter, encoder, or generator, pick a tool below and get
              started in seconds.
            </p>
            <p className="text-center leading-8">
              {hubLinks.map((link, index) => (
                <React.Fragment key={link.href}>
                  {index > 0 && ' · '}
                  <a className="text-blue-600 hover:text-blue-700 font-semibold" href={link.href}>
                    {link.label}
                  </a>
                </React.Fragment>
              ))}
            </p>
          </div>
        </section>

        <section className="bg-white border-t border-slate-200 py-16">
          <div className="w-full px-3 sm:px-4 lg:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-12">
              Why Choose DevUtil?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Privacy First</h3>
                <p className="text-slate-600">
                  All processing happens locally in your browser. Your data never touches our servers.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <RefreshCw className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Lightning Fast</h3>
                <p className="text-slate-600">
                  Instant results with no server roundtrips. Tools load and process data in milliseconds.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Code className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Always Free</h3>
                <p className="text-slate-600">
                  No subscriptions, no hidden fees, no account required. Use all tools completely free.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="full" />
    </div>
  );
}
