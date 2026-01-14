'use client';

import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, Search, BookOpen } from 'lucide-react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState({ g: true, i: false, m: false });
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const commonPatterns = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', test: 'user@example.com, test@test.org' },
    { name: 'URL', pattern: 'https?://[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*', test: 'https://example.com https://test.org/path' },
    { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}', test: '(123) 456-7890, 123-456-7890, 1234567890' },
    { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}', test: '2024-01-15, 2023-12-31' },
    { name: 'Hex Color', pattern: '#[0-9A-Fa-f]{6}', test: '#FF5733 #00ff00 #123abc' },
    { name: 'IPv4', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b', test: '192.168.1.1 10.0.0.1 255.255.255.0' },
    { name: 'Credit Card', pattern: '\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}', test: '1234-5678-9012-3456, 1234 5678 9012 3456' },
    { name: 'Username', pattern: '^[a-zA-Z0-9_]{3,16}$', test: 'user123, john_doe, test_user' }
  ];

  useEffect(() => {
    testRegex();
  }, [pattern, flags, testString]);

  const testRegex = () => {
    setError('');
    setMatches([]);

    if (!pattern || !testString) return;

    try {
      const flagString = Object.entries(flags)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join('');

      const regex = new RegExp(pattern, flagString);
      const foundMatches = [];

      if (flags.g) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }

      setMatches(foundMatches);
    } catch (e) {
      setError(e.message);
    }
  };

  const highlightMatches = () => {
    if (!testString || matches.length === 0) {
      return testString;
    }

    const result = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
      result.push(
        <span key={`text-${i}`}>{testString.slice(lastIndex, match.index)}</span>
      );
      result.push(
        <span key={`match-${i}`} className="bg-yellow-200 border border-yellow-400 rounded px-1">
          {match.text}
        </span>
      );
      lastIndex = match.index + match.text.length;
    });

    result.push(
      <span key="text-end">{testString.slice(lastIndex)}</span>
    );

    return result;
  };

  const loadPattern = (p) => {
    setPattern(p.pattern);
    setTestString(p.test);
  };

  const copyPattern = async () => {
    const flagString = Object.entries(flags)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join('');
    const regexString = `/${pattern}/${flagString}`;
    await navigator.clipboard.writeText(regexString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="Regex Tester" />

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Description */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Search className="w-7 h-7 text-red-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Regex Tester Online</h1>
          </div>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Test and debug regex patterns instantly with private, in-browser matching.
          </p>
        </div>

        {/* Regex Pattern Input */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-900">Regular Expression</h3>
            {pattern && (
              <button
                onClick={copyPattern}
                data-analytics-event="regex_copy_pattern"
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <span className="text-slate-600 font-mono text-lg">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <span className="text-slate-600 font-mono text-lg">/</span>
          </div>

          {/* Flags */}
          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-slate-700">Flags:</span>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={flags.g}
                onChange={(e) => setFlags({ ...flags, g: e.target.checked })}
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
              />
              <span className="text-sm text-slate-700">
                <code className="bg-slate-100 px-1.5 py-0.5 rounded">g</code> global
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={flags.i}
                onChange={(e) => setFlags({ ...flags, i: e.target.checked })}
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
              />
              <span className="text-sm text-slate-700">
                <code className="bg-slate-100 px-1.5 py-0.5 rounded">i</code> case insensitive
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={flags.m}
                onChange={(e) => setFlags({ ...flags, m: e.target.checked })}
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
              />
              <span className="text-sm text-slate-700">
                <code className="bg-slate-100 px-1.5 py-0.5 rounded">m</code> multiline
              </span>
            </label>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3" role="alert" aria-live="polite">
              <p className="text-red-700 text-sm">Error: {error}</p>
            </div>
          )}
        </div>

        {/* Test String */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-900">Test String</h3>
            <div className="text-sm text-slate-600">
              {matches.length} {matches.length === 1 ? 'match' : 'matches'}
            </div>
          </div>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter test string..."
            className="w-full h-32 sm:h-40 p-4 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none mb-4"
          />

          {/* Highlighted Results */}
          {testString && (
            <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap break-words">
              {highlightMatches()}
            </div>
          )}
        </div>

        {/* Matches Details */}
        {matches.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Match Details</h3>
            <div className="space-y-3">
              {matches.map((match, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium text-slate-700">Match {i + 1}:</span>
                      <code className="ml-2 bg-yellow-100 px-2 py-1 rounded text-sm">
                        {match.text}
                      </code>
                    </div>
                    <span className="text-xs text-slate-500">Index: {match.index}</span>
                  </div>
                  {match.groups.length > 0 && match.groups.some((g) => g) && (
                    <div className="mt-2 text-sm">
                      <span className="text-slate-600">Groups: </span>
                      {match.groups.map((group, j) => group && (
                        <code key={j} className="ml-1 bg-blue-100 px-2 py-1 rounded text-xs">
                          ${j + 1}: {group}
                        </code>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Common Patterns */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-900">Common Patterns</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonPatterns.map((p, i) => (
              <button
                key={i}
                onClick={() => loadPattern(p)}
                data-analytics-event="regex_load_pattern"
                data-analytics-label={p.name}
                className="text-left p-4 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all group"
              >
                <div className="font-medium text-slate-900 mb-1">{p.name}</div>
                <code className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded block overflow-x-auto">
                  {p.pattern}
                </code>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Character Classes</h4>
              <ul className="space-y-2 text-slate-600 font-mono">
                <li><code className="bg-slate-100 px-1 rounded">.</code> Any character</li>
                <li><code className="bg-slate-100 px-1 rounded">\d</code> Digit (0-9)</li>
                <li><code className="bg-slate-100 px-1 rounded">\w</code> Word character</li>
                <li><code className="bg-slate-100 px-1 rounded">\s</code> Whitespace</li>
                <li><code className="bg-slate-100 px-1 rounded">\D</code> Non-digit</li>
                <li><code className="bg-slate-100 px-1 rounded">\W</code> Non-word</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Quantifiers</h4>
              <ul className="space-y-2 text-slate-600 font-mono">
                <li><code className="bg-slate-100 px-1 rounded">*</code> 0 or more</li>
                <li><code className="bg-slate-100 px-1 rounded">+</code> 1 or more</li>
                <li><code className="bg-slate-100 px-1 rounded">?</code> 0 or 1</li>
                <li><code className="bg-slate-100 px-1 rounded">{'{n}'}</code> Exactly n</li>
                <li><code className="bg-slate-100 px-1 rounded">{'{n,}'}</code> n or more</li>
                <li><code className="bg-slate-100 px-1 rounded">{'{n,m}'}</code> Between n and m</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Anchors</h4>
              <ul className="space-y-2 text-slate-600 font-mono">
                <li><code className="bg-slate-100 px-1 rounded">^</code> Start of string</li>
                <li><code className="bg-slate-100 px-1 rounded">$</code> End of string</li>
                <li><code className="bg-slate-100 px-1 rounded">\b</code> Word boundary</li>
                <li><code className="bg-slate-100 px-1 rounded">\B</code> Non-word boundary</li>
                <li><code className="bg-slate-100 px-1 rounded">|</code> OR operator</li>
                <li><code className="bg-slate-100 px-1 rounded">()</code> Capture group</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Supporting Content */}
        <section className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Overview</h3>
            <div className="text-slate-600 space-y-4">
              <p>
                Test and debug regular expressions instantly with a free, online regex tester that runs entirely in
                your browser. See real-time matches, highlights, and capture groups as you iterate on patterns without
                leaving your editor.
              </p>
              <p>
                Developers use regex to validate inputs, parse logs, and transform text, but small mistakes can be
                painful to track down. This tool keeps everything client-side for privacy and speed, so your test data
                never leaves the browser and results appear instantly with no registration. Iterate quickly until your
                pattern is solid.
              </p>
              <p>
                Whether you are building validators, scrapers, or data pipelines, a visual tester shortens the feedback
                loop. Tune your expression until the exact substrings are highlighted, then copy the final pattern into
                your codebase with confidence.
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>Live match highlighting with capture groups.</li>
              <li>Toggle common flags to test global or case-insensitive matches.</li>
              <li>Copy the final regex pattern in one click.</li>
              <li>Fast, private in-browser processing for sensitive text.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">How to Use</h3>
            <p className="text-slate-600 mb-3">
              Build patterns iteratively and confirm matches before adding them to production code.
            </p>
            <ol className="list-decimal list-inside text-slate-600 space-y-2">
              <li>Enter your regex pattern and select the flags.</li>
              <li>Paste sample text to test against the pattern.</li>
              <li>Review matches and captured groups in real time.</li>
              <li>Copy the final regex when it behaves correctly.</li>
            </ol>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Common Use Cases</h3>
            <p className="text-slate-600 mb-3">
              Regex shines when you need flexible text validation or extraction across large datasets.
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Validating emails, UUIDs, or custom identifiers.</li>
              <li>Parsing server logs or error messages quickly.</li>
              <li>Extracting query parameters from URLs.</li>
              <li>Cleaning up CSV or multiline text data.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">FAQ</h3>
            <div className="space-y-4 text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900">Which regex flavor is supported?</h4>
                <p>The tester uses JavaScript RegExp syntax, matching what you use in the browser. That keeps results consistent with frontend code.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Is my test data private?</h4>
                <p>Yes. All matching happens locally in your browser. Nothing is transmitted or stored.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Can I test flags like global or multiline?</h4>
                <p>Yes. Toggle the common flags to match your runtime behavior. The output updates instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">Related Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/url-encoder" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">URL Encoder</h4>
              <p className="text-slate-600 text-sm">Encode matched URL fragments safely.</p>
            </a>
            <a href="/uuid-generator" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">UUID Generator</h4>
              <p className="text-slate-600 text-sm">Generate UUIDs to validate with your regex.</p>
            </a>
            <a href="/json-formatter" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">JSON Formatter</h4>
              <p className="text-slate-600 text-sm">Clean JSON strings before pattern matching.</p>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
