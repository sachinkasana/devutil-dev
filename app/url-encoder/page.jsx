'use client';

import React, { useState } from 'react';
import { Code, Copy, Check, Link2, Download } from 'lucide-react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function URLEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [encodeType, setEncodeType] = useState('component');

  const encode = () => {
    setError('');
    try {
      let encoded;
      if (encodeType === 'component') {
        encoded = encodeURIComponent(input);
      } else if (encodeType === 'uri') {
        encoded = encodeURI(input);
      } else {
        // Full encode
        encoded = input.split('').map((c) => {
          const code = c.charCodeAt(0);
          return code > 127 || (code >= 32 && code <= 126 && !'#$&+,/:;=?@'.includes(c))
            ? c
            : '%' + code.toString(16).toUpperCase().padStart(2, '0');
        }).join('');
      }
      setOutput(encoded);
    } catch (e) {
      setError(`Encoding error: ${e.message}`);
      setOutput('');
    }
  };

  const decode = () => {
    setError('');
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (e) {
      setError(`Decoding error: ${e.message}`);
      setOutput('');
    }
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      encode();
    } else {
      decode();
    }
  };

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadOutput = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'encode' ? 'encoded-url.txt' : 'decoded-url.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    if (mode === 'encode') {
      setInput('https://example.com/search?q=hello world&category=news');
    } else {
      setInput('https://example.com/search?q=hello%20world&category=news');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const parseURL = () => {
    try {
      const url = new URL(input);
      const params = {};
      url.searchParams.forEach((value, key) => {
        params[key] = value;
      });

      return {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        params: params
      };
    } catch (e) {
      return null;
    }
  };

  const urlParts = mode === 'encode' && input ? parseURL() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="URL Encoder/Decoder" />

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Description */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Link2 className="w-7 h-7 text-indigo-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">URL Encoder & Decoder</h1>
          </div>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Encode or decode URLs instantly with fast, private in-browser processing.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 inline-flex">
            <button
              onClick={() => {
                setMode('encode');
                clearAll();
              }}
              data-analytics-event="url_mode"
              data-analytics-label="encode"
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                mode === 'encode'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => {
                setMode('decode');
                clearAll();
              }}
              data-analytics-event="url_mode"
              data-analytics-label="decode"
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                mode === 'decode'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Decode
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <button
              onClick={handleProcess}
              data-analytics-event="url_process"
              data-analytics-label={mode === 'encode' ? 'encode' : 'decode'}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-white transition-colors font-medium ${
                mode === 'encode'
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Link2 className="w-4 h-4" />
              <span>{mode === 'encode' ? 'Encode' : 'Decode'}</span>
            </button>

            <button
              onClick={loadSample}
              data-analytics-event="url_sample"
              data-analytics-label={mode === 'encode' ? 'encode' : 'decode'}
              className="flex items-center space-x-2 bg-slate-600 text-white px-6 py-2.5 rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              <Code className="w-4 h-4" />
              <span>Load Sample</span>
            </button>
            <button
              onClick={clearAll}
              data-analytics-event="url_clear"
              className="flex items-center space-x-2 border-2 border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
            >
              <span>Clear All</span>
            </button>
          </div>

          {/* Encoding Type Selection */}
          {mode === 'encode' && (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-slate-700">Encode Type:</span>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="encodeType"
                  value="component"
                  checked={encodeType === 'component'}
                  onChange={(e) => setEncodeType(e.target.value)}
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="text-sm text-slate-700">Component (recommended)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="encodeType"
                  value="uri"
                  checked={encodeType === 'uri'}
                  onChange={(e) => setEncodeType(e.target.value)}
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="text-sm text-slate-700">Full URI</span>
              </label>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6" role="alert" aria-live="polite">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Input/Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                {mode === 'encode' ? 'Text to Encode' : 'URL to Decode'}
              </h3>
              <span className="text-sm text-slate-500">{input.length} characters</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === 'encode'
                  ? 'Enter URL or text to encode...'
                  : 'Paste encoded URL to decode...'
              }
              className="w-full h-64 p-4 border border-slate-300 rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Output */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Output</h3>
              <div className="flex items-center space-x-2">
                {output && (
                  <>
                    <button
                      onClick={downloadOutput}
                      data-analytics-event="url_download"
                      data-analytics-label={mode === 'encode' ? 'encoded' : 'decoded'}
                      className="flex items-center space-x-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={copyToClipboard}
                      data-analytics-event="url_copy"
                      data-analytics-label={mode === 'encode' ? 'encoded' : 'decoded'}
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
                  </>
                )}
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="w-full h-64 p-4 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm resize-none"
            />
          </div>
        </div>

        {/* URL Parser */}
        {urlParts && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">URL Breakdown</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm text-slate-600">Protocol:</div>
                <div className="col-span-2 font-mono text-sm text-slate-900">{urlParts.protocol}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm text-slate-600">Hostname:</div>
                <div className="col-span-2 font-mono text-sm text-slate-900">{urlParts.hostname}</div>
              </div>
              {urlParts.port && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm text-slate-600">Port:</div>
                  <div className="col-span-2 font-mono text-sm text-slate-900">{urlParts.port}</div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm text-slate-600">Path:</div>
                <div className="col-span-2 font-mono text-sm text-slate-900">{urlParts.pathname || '/'}</div>
              </div>
              {urlParts.search && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm text-slate-600">Query String:</div>
                  <div className="col-span-2 font-mono text-sm text-slate-900">{urlParts.search}</div>
                </div>
              )}
              {urlParts.hash && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm text-slate-600">Hash:</div>
                  <div className="col-span-2 font-mono text-sm text-slate-900">{urlParts.hash}</div>
                </div>
              )}
              {Object.keys(urlParts.params).length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-slate-700 mb-2">Query Parameters:</div>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    {Object.entries(urlParts.params).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2 text-sm">
                        <code className="bg-blue-100 px-2 py-1 rounded text-blue-900">{key}</code>
                        <span className="text-slate-500">=</span>
                        <code className="bg-green-100 px-2 py-1 rounded text-green-900">{value}</code>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Supporting Content */}
        <section className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Overview</h3>
            <div className="text-slate-600 space-y-4">
              <p>
                Encode or decode URLs instantly with a free, online URL encoder that runs entirely in your browser.
                Safely transform query parameters, path segments, and full URLs so requests remain valid and readable.
              </p>
              <p>
                Developers rely on URL encoding to prevent malformed requests, fix copy-paste issues, and prepare data
                for API calls. This tool processes everything client-side, so your URLs stay private and you get
                immediate results without registration. Switch between encoding modes and inspect URL parts to debug
                faster.
              </p>
              <p>
                Use this encoder when you are building query strings, sharing links, or troubleshooting redirect flows.
                Having both encode and decode in one place makes it easy to spot mistakes in parameters before
                shipping.
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>Encode or decode full URLs and individual parameters.</li>
              <li>Inspect protocol, host, path, and query pieces instantly.</li>
              <li>Copy results with one click for rapid testing.</li>
              <li>Runs fully in-browser for speed and privacy.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">How to Use</h3>
            <p className="text-slate-600 mb-3">
              Use URL encoding whenever a parameter contains spaces, punctuation, or non-ASCII characters.
            </p>
            <ol className="list-decimal list-inside text-slate-600 space-y-2">
              <li>Select Encode or Decode based on your input.</li>
              <li>Paste a full URL or a single parameter value.</li>
              <li>Click Convert to view the encoded or decoded result.</li>
              <li>Copy the output or inspect the URL breakdown.</li>
            </ol>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Common Use Cases</h3>
            <p className="text-slate-600 mb-3">
              Encoded URLs reduce errors when parameters are built dynamically in apps or services.
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Encoding query strings for API requests.</li>
              <li>Decoding URLs copied from logs or emails.</li>
              <li>Sanitizing user input for safe redirects.</li>
              <li>Building clean, shareable links with parameters.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">FAQ</h3>
            <div className="space-y-4 text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900">What is the difference between encodeURI and encodeURIComponent?</h4>
                <p>encodeURIComponent is for individual parameters, while encodeURI keeps URL structure intact. Use the latter for full URLs.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Is my URL sent to a server?</h4>
                <p>No. Encoding and decoding happen locally in your browser. Your URLs remain private.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Why does a space become %20?</h4>
                <p>Special characters are represented by percent-encoded hex values in URLs. This ensures safe transmission over HTTP.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">Related Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/base64-encoder" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">Base64 Encoder</h4>
              <p className="text-slate-600 text-sm">Encode payloads before adding them to URLs.</p>
            </a>
            <a href="/json-formatter" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">JSON Formatter</h4>
              <p className="text-slate-600 text-sm">Format JSON before embedding in query parameters.</p>
            </a>
            <a href="/regex-tester" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">Regex Tester</h4>
              <p className="text-slate-600 text-sm">Validate encoded URLs with custom patterns.</p>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
