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
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Link2 className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">URL Encoder & Decoder</h2>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Encode and decode URL components with support for full URLs and query parameters.
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

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">About URL Encoding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">What is URL Encoding?</h4>
              <p className="text-slate-600 mb-4">
                URL encoding converts characters into a format that can be transmitted over the Internet.
                Special characters are replaced with a "%" followed by two hexadecimal digits.
              </p>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Common Use Cases</h4>
              <ul className="space-y-2 text-slate-600">
                <li>✅ Encoding query parameters in URLs</li>
                <li>✅ Passing data in URL strings</li>
                <li>✅ API request parameters</li>
                <li>✅ Form data submission</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Encoding Types</h4>
              <ul className="space-y-3 text-slate-600">
                <li>
                  <strong className="text-indigo-600">encodeURIComponent:</strong> Encodes all special characters.
                  Use for query parameters and path segments.
                </li>
                <li>
                  <strong className="text-blue-600">encodeURI:</strong> Encodes most characters but preserves URL structure.
                  Use for full URLs.
                </li>
              </ul>
              <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-4">Common Encodings</h4>
              <ul className="space-y-2 text-slate-600 font-mono text-sm">
                <li>space → %20</li>
                <li>! → %21</li>
                <li># → %23</li>
                <li>$ → %24</li>
                <li>& → %26</li>
                <li>@ → %40</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
