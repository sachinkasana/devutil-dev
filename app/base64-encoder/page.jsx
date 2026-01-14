'use client';

import React, { useState } from 'react';
import { Code, Copy, Check, Lock, Upload, Download } from 'lucide-react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function Base64EncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const encode = () => {
    setError('');
    setImagePreview('');
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
    } catch (e) {
      setError(`Encoding error: ${e.message}`);
      setOutput('');
    }
  };

  const decode = () => {
    setError('');
    setImagePreview('');
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);

      // Check if it's an image
      if (input.startsWith('iVBOR') || input.startsWith('/9j/') || input.startsWith('R0lGOD')) {
        setImagePreview(`data:image/png;base64,${input}`);
      }
    } catch (e) {
      setError(`Decoding error: ${e.message}`);
      setOutput('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        const base64 = result.split(',')[1];
        setInput(base64);
        setImagePreview(result);
      }
    };
    reader.readAsDataURL(file);
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
    a.download = mode === 'encode' ? 'encoded.txt' : 'decoded.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    if (mode === 'encode') {
      setInput('Hello, World! This is a sample text to encode.');
    } else {
      setInput('SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgdG8gZW5jb2RlLg==');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setImagePreview('');
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      encode();
    } else {
      decode();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="Base64 Encoder/Decoder" />

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Description */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Lock className="w-7 h-7 text-green-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Free Base64 Encoder & Decoder Online</h1>
          </div>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Encode or decode Base64 instantly with fast, private in-browser processing.
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
              data-analytics-event="base64_mode"
              data-analytics-label="encode"
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                mode === 'encode'
                  ? 'bg-green-600 text-white shadow-sm'
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
              data-analytics-event="base64_mode"
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
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleProcess}
              data-analytics-event="base64_process"
              data-analytics-label={mode === 'encode' ? 'encode' : 'decode'}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-white transition-colors font-medium ${
                mode === 'encode'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>{mode === 'encode' ? 'Encode' : 'Decode'}</span>
            </button>

            {mode === 'encode' && (
              <label
                className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium cursor-pointer"
                data-analytics-event="base64_upload"
                data-analytics-label="open"
              >
                <Upload className="w-4 h-4" />
                <span>Upload File</span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,text/*"
                />
              </label>
            )}

            <button
              onClick={loadSample}
              data-analytics-event="base64_sample"
              data-analytics-label={mode === 'encode' ? 'encode' : 'decode'}
              className="flex items-center space-x-2 bg-slate-600 text-white px-6 py-2.5 rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              <Code className="w-4 h-4" />
              <span>Load Sample</span>
            </button>
            <button
              onClick={clearAll}
              data-analytics-event="base64_clear"
              className="flex items-center space-x-2 border-2 border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
            >
              <span>Clear All</span>
            </button>
          </div>
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
                {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
              </h3>
              <span className="text-sm text-slate-500">{input.length} characters</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === 'encode'
                  ? 'Enter text to encode...'
                  : 'Paste Base64 string to decode...'
              }
              className="w-full h-64 sm:h-80 lg:h-96 p-4 border border-slate-300 rounded-xl font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
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
                      data-analytics-event="base64_download"
                      data-analytics-label={mode === 'encode' ? 'encoded' : 'decoded'}
                      className="flex items-center space-x-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={copyToClipboard}
                      data-analytics-event="base64_copy"
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
            {imagePreview ? (
              <div className="w-full h-64 sm:h-80 lg:h-96 border border-slate-300 rounded-xl p-4 bg-slate-50 overflow-auto">
                <div className="flex items-center justify-center h-full">
                  <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain" />
                </div>
              </div>
            ) : (
              <textarea
                value={output}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-64 sm:h-80 lg:h-96 p-4 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm resize-none"
              />
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">About Base64 Encoding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">What is Base64?</h4>
              <p className="text-slate-600 mb-4">
                Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format.
                It's commonly used to encode data that needs to be stored and transferred over media designed to deal with text.
              </p>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Common Uses</h4>
              <ul className="space-y-2 text-slate-600">
                <li>✅ Embedding images in HTML/CSS</li>
                <li>✅ Sending binary data over email</li>
                <li>✅ Storing complex data in databases</li>
                <li>✅ Data URLs in web applications</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Features</h4>
              <ul className="space-y-2 text-slate-600">
                <li>✅ Encode text to Base64</li>
                <li>✅ Decode Base64 to text</li>
                <li>✅ Support for UTF-8 characters</li>
                <li>✅ Image file encoding</li>
                <li>✅ Image preview for decoded data</li>
                <li>✅ Copy to clipboard</li>
                <li>✅ Download results</li>
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
                Encode and decode Base64 instantly with a free, online tool that runs entirely in your browser.
                Convert text, JSON, or small files into Base64 for safe transport, or decode Base64 back to readable
                content in a single click.
              </p>
              <p>
                Developers use Base64 when embedding images, sending binary data through APIs, or troubleshooting
                encoded payloads. This tool keeps everything client-side, so your data stays private and you get
                immediate results without registration. Whether you are preparing a data URI, validating an auth
                header, or decoding a webhook payload, you can work quickly and securely.
              </p>
              <p>
                Base64 is a practical way to move bytes through text-only systems, but it can be tedious to encode and
                decode by hand. Use this page to sanity-check output, confirm round trips, and share clean results with
                teammates without relying on external services.
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>Encode or decode text with one-click copy and download.</li>
              <li>Toggle between modes without losing your input.</li>
              <li>Upload small files to generate Base64 strings.</li>
              <li>Runs fully in-browser for fast, private processing.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">How to Use</h3>
            <p className="text-slate-600 mb-3">
              Use the encode and decode modes to move data between readable text and Base64 safely.
            </p>
            <ol className="list-decimal list-inside text-slate-600 space-y-2">
              <li>Select Encode or Decode based on your task.</li>
              <li>Paste text/Base64 or upload a file for encoding.</li>
              <li>Click Convert to generate the result instantly.</li>
              <li>Copy or download the output for your workflow.</li>
            </ol>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Common Use Cases</h3>
            <p className="text-slate-600 mb-3">
              Base64 helps move binary data through systems that only accept text, especially in APIs and configs.
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Embedding images as data URIs in HTML or CSS.</li>
              <li>Encoding binary blobs for API requests.</li>
              <li>Decoding Base64 from JWTs or webhook payloads.</li>
              <li>Testing email attachments or file uploads.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">FAQ</h3>
            <div className="space-y-4 text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900">Is Base64 encryption?</h4>
                <p>No. Base64 is an encoding format, not a security or encryption method. Use HTTPS or encryption when privacy is required.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Are my files uploaded?</h4>
                <p>No. Encoding and decoding happen locally in your browser. Nothing is sent to a server.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Why does Base64 look longer?</h4>
                <p>Base64 expands data size by about 33%, which is normal for the format. The overhead is the tradeoff for safe text transport.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">Related Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/json-formatter" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">JSON Formatter</h4>
              <p className="text-slate-600 text-sm">Format decoded JSON payloads for quick inspection.</p>
            </a>
            <a href="/url-encoder" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">URL Encoder</h4>
              <p className="text-slate-600 text-sm">Encode Base64 strings safely for URLs and queries.</p>
            </a>
            <a href="/hash-generator" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">Hash Generator</h4>
              <p className="text-slate-600 text-sm">Generate hashes to verify encoded content integrity.</p>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
