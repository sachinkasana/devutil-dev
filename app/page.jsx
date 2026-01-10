import React from 'react';
import { Code, Hash, Key, FileJson, RefreshCw, Search, Braces, Lock } from 'lucide-react';

export const metadata = {
  title: 'Developer Utilities',
  description: 'Essential developer tools: JSON formatter, Base64, UUID, hashes, regex, URL encode, JWT decode, and timestamps.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Developer Utilities',
    description: 'Essential developer tools: JSON formatter, Base64, UUID, hashes, regex, URL encode, JWT decode, and timestamps.',
    url: '/'
  },
  twitter: {
    title: 'Developer Utilities',
    description: 'Essential developer tools: JSON formatter, Base64, UUID, hashes, regex, URL encode, JWT decode, and timestamps.'
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
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">DevUtil</h1>
                <p className="text-xs text-slate-500">Essential Developer Tools</p>
              </div>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="space-y-6">
          <h2 className="text-5xl font-extrabold text-slate-900">
            Essential Developer
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Utilities & Tools
            </span>
          </h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <a
                key={tool.name}
                href={tool.href}
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

      {/* Features Section */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Why Choose DevUtil?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Privacy First</h4>
              <p className="text-slate-600">
                All processing happens locally in your browser. Your data never touches our servers.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <RefreshCw className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Lightning Fast</h4>
              <p className="text-slate-600">
                Instant results with no server roundtrips. Tools load and process data in milliseconds.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Code className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Always Free</h4>
              <p className="text-slate-600">
                No subscriptions, no hidden fees, no account required. Use all tools completely free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-lg">DevUtil</span>
              </div>
              <p className="text-sm">
                Essential developer tools and utilities. Built with privacy in mind.
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Popular Tools</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/json-formatter" className="hover:text-white transition-colors">JSON Formatter</a></li>
                <li><a href="/base64-encoder" className="hover:text-white transition-colors">Base64 Encoder</a></li>
                <li><a href="/uuid-generator" className="hover:text-white transition-colors">UUID Generator</a></li>
                <li><a href="/hash-generator" className="hover:text-white transition-colors">Hash Generator</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">More Tools</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/regex-tester" className="hover:text-white transition-colors">Regex Tester</a></li>
                <li><a href="/url-encoder" className="hover:text-white transition-colors">URL Encoder</a></li>
                <li><a href="/jwt-decoder" className="hover:text-white transition-colors">JWT Decoder</a></li>
                <li><a href="/timestamp-converter" className="hover:text-white transition-colors">Timestamp Converter</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">About</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="https://github.com" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>© 2026 DevUtil.dev - All rights reserved. Made with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
