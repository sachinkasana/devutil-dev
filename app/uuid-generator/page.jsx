'use client';

import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, Key, RefreshCw, Download, Trash2 } from 'lucide-react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';

const MAX_QUANTITY = 500;
const QUICK_QUANTITIES = [1, 10, 50, 100, 500];

function bytesToUuid(bytes) {
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function getRandomBytes(length) {
  const bytes = new Uint8Array(length);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i++) {
      bytes[i] = (Math.random() * 256) | 0;
    }
  }
  return bytes;
}

/** UUID v4 (random) — RFC 9562 */
function generateUUIDv4() {
  const bytes = getRandomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // RFC 9562 variant
  return bytesToUuid(bytes);
}

/**
 * UUID v7 (time-ordered) — RFC 9562
 * - 48-bit Unix timestamp in milliseconds
 * - version nibble 7
 * - RFC 9562 variant bits
 * - remaining bits from crypto.getRandomValues
 */
function generateUUIDv7() {
  const bytes = getRandomBytes(16);
  const now = Date.now();

  // 48-bit big-endian Unix timestamp (ms)
  bytes[0] = (now / 2 ** 40) & 0xff;
  bytes[1] = (now / 2 ** 32) & 0xff;
  bytes[2] = (now / 2 ** 24) & 0xff;
  bytes[3] = (now / 2 ** 16) & 0xff;
  bytes[4] = (now / 2 ** 8) & 0xff;
  bytes[5] = now & 0xff;

  bytes[6] = (bytes[6] & 0x0f) | 0x70; // version 7
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // RFC 9562 variant

  return bytesToUuid(bytes);
}

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [version, setVersion] = useState('v4');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);

  const generateUUID = () => (version === 'v7' ? generateUUIDv7() : generateUUIDv4());

  const formatUUID = (uuid) => {
    let formatted = uuid;
    if (!hyphens) {
      formatted = uuid.replace(/-/g, '');
    }
    return uppercase ? formatted.toUpperCase() : formatted;
  };

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: quantity }, () => formatUUID(generateUUID()));
    setUuids(newUuids);
  };

  const copyToClipboard = async (uuid, index) => {
    await navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    const allUuids = uuids.join('\n');
    await navigator.clipboard.writeText(allUuids);
    setCopiedIndex('all');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadUUIDs = () => {
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setUuids([]);
  };

  const setQuantityClamped = (value) => {
    setQuantity(Math.max(1, Math.min(MAX_QUANTITY, parseInt(value, 10) || 1)));
  };

  useEffect(() => {
    generateUUIDs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="UUID Generator" />

      {/* Main Content */}
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-8">
        {/* Title & Description */}
        <div className="mb-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Key className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              UUID v4 &amp; v7 Generator
              <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
                Generate UUID v4, UUID v7 (time-ordered), or GUID values instantly in your browser.
              </span>
            </h1>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                UUID Version
              </label>
              <div className="flex rounded-lg border border-slate-300 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setVersion('v4')}
                  className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                    version === 'v4'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  v4 (random)
                </button>
                <button
                  type="button"
                  onClick={() => setVersion('v7')}
                  className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors border-l border-slate-300 ${
                    version === 'v7'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  v7 (time-ordered)
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of UUIDs (1–{MAX_QUANTITY})
              </label>
              <input
                type="number"
                min="1"
                max={MAX_QUANTITY}
                value={quantity}
                onChange={(e) => setQuantityClamped(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {QUICK_QUANTITIES.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setQuantity(n)}
                    className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                      quantity === n
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-slate-700">Uppercase</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hyphens}
                  onChange={(e) => setHyphens(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-slate-700">Include hyphens</span>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={generateUUIDs}
              data-analytics-event="uuid_generate"
              className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate</span>
            </button>
            {uuids.length > 0 && (
              <>
                <button
                  onClick={copyAll}
                  data-analytics-event="uuid_copy_all"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {copiedIndex === 'all' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy All</span>
                    </>
                  )}
                </button>
                <button
                  onClick={downloadUUIDs}
                  data-analytics-event="uuid_download"
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={clearAll}
                  data-analytics-event="uuid_clear"
                  className="flex items-center space-x-2 border-2 border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Generated UUIDs */}
        {uuids.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Generated UUIDs ({uuids.length})
              </h3>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors group"
                >
                  <code className="font-mono text-sm text-slate-900 flex-1">{uuid}</code>
                  <button
                    onClick={() => copyToClipboard(uuid, index)}
                    data-analytics-event="uuid_copy_one"
                    className="ml-4 flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    {copiedIndex === index ? (
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Sections */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">What is UUID?</h3>
            <p className="text-slate-600 mb-4">
              A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems.
              The term GUID (Globally Unique Identifier) is also used, particularly in Microsoft systems.
            </p>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">UUID v4 Format</h4>
            <p className="text-slate-600 mb-2">
              Version 4 UUIDs are randomly generated and have the format:
            </p>
            <code className="block bg-slate-100 p-3 rounded-lg font-mono text-sm text-slate-900 mb-4">
              xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
            </code>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">UUID v7 Format</h4>
            <p className="text-slate-600 mb-2">
              Version 7 UUIDs are time-ordered (48-bit Unix timestamp in ms plus random bits), ideal as database keys:
            </p>
            <code className="block bg-slate-100 p-3 rounded-lg font-mono text-sm text-slate-900 mb-4">
              xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx
            </code>
            <p className="text-slate-600 text-sm">
              The probability of generating duplicate UUIDs is negligibly small, making them ideal for distributed systems.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Common Uses</h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>Database Primary Keys:</strong> Unique identifiers for records (v7 sorts by time)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>API Request IDs:</strong> Track individual API calls</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>Session IDs:</strong> Identify user sessions</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>File Names:</strong> Generate unique file identifiers</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>Transaction IDs:</strong> Track financial transactions</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>Event Tracking:</strong> Unique event identifiers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Bulk Generation</h4>
              <p className="text-sm text-slate-600">Generate up to {MAX_QUANTITY} UUIDs at once</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Copy className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Easy Copy</h4>
              <p className="text-sm text-slate-600">Copy individual or all UUIDs instantly</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Download</h4>
              <p className="text-sm text-slate-600">Export UUIDs as a text file</p>
            </div>
          </div>
        </div>

        {/* Supporting Content */}
        <section className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Overview</h3>
            <div className="text-slate-600 space-y-4">
              <p>
                Generate UUID v4 and UUID v7 (time-ordered) values instantly with a free online UUID / GUID
                generator that runs entirely in your browser. Create one or hundreds of universally unique
                identifiers for databases, APIs, test fixtures, and client-side keys without sending data to a server.
              </p>
              <p>
                UUIDs help developers avoid collisions when creating records across distributed systems. This tool
                delivers fast, client-side generation so IDs stay private and results appear immediately with no
                registration. Adjust casing, toggle hyphens, and copy in a single click to keep your workflow moving.
              </p>
              <p>
                When you need repeatable, consistent IDs for sample data or load testing, bulk generation saves time.
                You can also generate UUIDs for front-end keys without waiting on backend endpoints or exposing
                internal services.
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>Generate UUID v4 or v7 in batches up to {MAX_QUANTITY} at a time.</li>
              <li>Switch between uppercase and lowercase output.</li>
              <li>Include or remove hyphens for compact IDs.</li>
              <li>Copy or download UUID lists instantly.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">How to Use</h3>
            <p className="text-slate-600 mb-3">
              Generate IDs on demand and paste them directly into your schema, seed scripts, or API payloads.
            </p>
            <ol className="list-decimal list-inside text-slate-600 space-y-2">
              <li>Select UUID v4 (random) or v7 (time-ordered).</li>
              <li>Choose how many UUIDs you want to generate (up to {MAX_QUANTITY}).</li>
              <li>Toggle uppercase or hyphen options if needed.</li>
              <li>Click Generate to refresh the list instantly.</li>
              <li>Copy or download the IDs for your project.</li>
            </ol>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Common Use Cases</h3>
            <p className="text-slate-600 mb-3">
              UUIDs are a safe default when you need uniqueness across systems or environments.
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Creating primary keys for database records (prefer v7 when sort order by time matters).</li>
              <li>Generating unique IDs for API requests or jobs.</li>
              <li>Seeding test data and fixtures quickly.</li>
              <li>Creating client-side keys for UI components.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">FAQ</h3>
            <div className="space-y-4 text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900">Which UUID versions are supported?</h4>
                <p>
                  UUID v4 (random) and UUID v7 (time-ordered per RFC 9562). v4 is ideal for general uniqueness;
                  v7 embeds a millisecond timestamp so IDs roughly sort by creation time.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Are UUIDs guaranteed to be unique?</h4>
                <p>They are statistically unique; collisions are extremely unlikely. For most applications, v4 or v7 is safe.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Is any data stored or sent?</h4>
                <p>No. IDs are generated locally in your browser. Nothing is transmitted or stored.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">Related Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/hash-generator" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">Hash Generator</h4>
              <p className="text-slate-600 text-sm">Create hashes to fingerprint generated IDs.</p>
            </a>
            <a href="/regex-tester" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">Regex Tester</h4>
              <p className="text-slate-600 text-sm">Validate UUID formats with quick regex checks.</p>
            </a>
            <a href="/timestamp-converter" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">Timestamp Converter</h4>
              <p className="text-slate-600 text-sm">Convert times when correlating IDs and logs.</p>
            </a>
          </div>
        </section>
      </main>
      <RelatedTools current="uuid-generator" />

      <Footer />
    </div>
  );
}
