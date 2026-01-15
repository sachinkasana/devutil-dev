import React from 'react';
import { Code, Hash, Key, FileJson, RefreshCw, Search, Braces, Lock, ShieldCheck, FileText, QrCode, Palette } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export const metadata = {
  title: 'Free Developer Tools & Utilities Online - DevUtil',
  description: 'Essential developer tools: JSON formatter, Base64, UUID, hashes, regex, URL encode, JWT decode, timestamps, QR codes, color picker, password generator, and lorem ipsum.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Free Developer Tools & Utilities Online - DevUtil',
    description: 'Essential developer tools: JSON formatter, Base64, UUID, hashes, regex, URL encode, JWT decode, timestamps, QR codes, color picker, password generator, and lorem ipsum.',
    url: '/',
    images: [
      {
        url: 'https://www.devutil.dev/og.png',
        width: 1200,
        height: 630,
        alt: 'DevUtil'
      }
    ]
  },
  twitter: {
    title: 'Free Developer Tools & Utilities Online - DevUtil',
    description: 'Essential developer tools: JSON formatter, Base64, UUID, hashes, regex, URL encode, JWT decode, timestamps, QR codes, color picker, password generator, and lorem ipsum.',
    images: ['https://www.devutil.dev/og.png']
  }
};

const tools = [
  {
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data instantly',
    icon: FileJson,
    href: '/json-formatter',
    color: 'bg-blue-500',
    popular: true
  },
  {
    name: 'Base64 Encoder',
    description: 'Encode and decode Base64 strings with ease',
    icon: Lock,
    href: '/base64-encoder',
    color: 'bg-green-500',
    popular: true
  },
  {
    name: 'UUID Generator',
    description: 'Generate unique identifiers (v4) instantly',
    icon: Key,
    href: '/uuid-generator',
    color: 'bg-purple-500',
    popular: true
  },
  {
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256 hashes',
    icon: Hash,
    href: '/hash-generator',
    color: 'bg-orange-500'
  },
  {
    name: 'Password Generator',
    description: 'Create strong, secure passwords instantly',
    icon: ShieldCheck,
    href: '/password-generator',
    color: 'bg-emerald-500'
  },
  {
    name: 'Regex Tester',
    description: 'Test and debug regular expressions live',
    icon: Search,
    href: '/regex-tester',
    color: 'bg-red-500'
  },
  {
    name: 'URL Encoder',
    description: 'Encode and decode URL components',
    icon: Code,
    href: '/url-encoder',
    color: 'bg-indigo-500'
  },
  {
    name: 'JWT Decoder',
    description: 'Decode and verify JSON Web Tokens',
    icon: Braces,
    href: '/jwt-decoder',
    color: 'bg-pink-500'
  },
  {
    name: 'Timestamp Converter',
    description: 'Convert Unix timestamps to human dates',
    icon: RefreshCw,
    href: '/timestamp-converter',
    color: 'bg-teal-500'
  },
  {
    name: 'QR Code Generator',
    description: 'Create QR codes for URLs, WiFi, and vCards',
    icon: QrCode,
    href: '/qr-code-generator',
    color: 'bg-amber-500',
    popular: true
  },
  {
    name: 'Color Picker',
    description: 'Pick colors and convert HEX, RGB, HSL',
    icon: Palette,
    href: '/color-picker',
    color: 'bg-cyan-500'
  },
  {
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for designs',
    icon: FileText,
    href: '/lorem-ipsum-generator',
    color: 'bg-slate-500'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="Essential Developer Tools" showGithub />

      <main id="main-content">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
              Free Developer
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Utilities & Tools
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Fast, free, and privacy-focused tools for developers.
              All processing happens in your browser—no data leaves your device.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>100% Client-Side</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Privacy First</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Always Free</span>
              </div>
            </div>
          </div>
        </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Explore the Toolbox
          </h2>
          <p className="mt-2 text-slate-600">
            Pick a utility to get started in seconds.
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
                  <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {tool.description}
                    </p>
                  </div>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <span>Open Tool</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

        {/* Hub Content */}
        <section className="bg-white border-t border-slate-200 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-600 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900">
              Free Developer Tools & Utilities Online
            </h2>
            <p>
              DevUtil is a fast toolkit for everyday developer tasks. Each tool runs in your browser, so data stays on
              your device. You can format JSON, encode Base64, generate UUIDs, and test regex patterns without
              installing anything. You can also generate secure passwords or fast placeholder text for mockups. The
              tools load fast and work well on mobile.
            </p>
            <p>
              Use DevUtil as a lightweight hub for common workflows. Format a JSON response, then jump to the URL
              encoder to clean up query strings. Decode a JWT and open the JSON formatter to inspect the payload. These
              links keep your flow moving and reduce copy-paste errors.
            </p>
            <p>
              The toolkit focuses on simple, single-purpose utilities. Each page has clear actions, practical defaults,
              and instant results. If you need a quick formatter, converter, or validator, pick a tool below and get
              started in seconds.
            </p>
            <p className="text-center">
              <a className="text-blue-600 hover:text-blue-700 font-semibold" href="/json-formatter">JSON Formatter</a>
              {' · '}
              <a className="text-blue-600 hover:text-blue-700 font-semibold" href="/base64-encoder">Base64 Encoder</a>
              {' · '}
              <a className="text-blue-600 hover:text-blue-700 font-semibold" href="/uuid-generator">UUID Generator</a>
              {' · '}
              <a className="text-blue-600 hover:text-blue-700 font-semibold" href="/hash-generator">Hash Generator</a>
              {' · '}
              <a className="text-blue-600 hover:text-blue-700 font-semibold" href="/regex-tester">Regex Tester</a>
              {' · '}
              <a className="text-blue-600 hover:text-blue-700 font-semibold" href="/url-encoder">URL Encoder</a>
              {' · '}
              <a className="text-blue-600 hover:text-blue-700 font-semibold" href="/jwt-decoder">JWT Decoder</a>
              {' · '}
              <a className="text-blue-600 hover:text-blue-700 font-semibold" href="/timestamp-converter">Timestamp Converter</a>
              {' · '}
              <a className="text-blue-600 hover:text-blue-700 font-semibold" href="/password-generator">Password Generator</a>
              {' · '}
              <a className="text-blue-600 hover:text-blue-700 font-semibold" href="/lorem-ipsum-generator">Lorem Ipsum Generator</a>
              {' · '}
              <a className="text-blue-600 hover:text-blue-700 font-semibold" href="/qr-code-generator">QR Code Generator</a>
              {' · '}
              <a className="text-blue-600 hover:text-blue-700 font-semibold" href="/color-picker">Color Picker</a>
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white border-t border-slate-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
