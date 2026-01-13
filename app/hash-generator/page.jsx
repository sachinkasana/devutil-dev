'use client';

import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, Hash, Upload } from 'lucide-react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: ''
  });
  const [copied, setCopied] = useState('');

  const generateHashes = async (text) => {
    if (!text) {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    try {
      // SHA-256
      const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
      const sha256Hash = Array.from(new Uint8Array(sha256Buffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      // SHA-1
      const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
      const sha1Hash = Array.from(new Uint8Array(sha1Buffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      // SHA-512
      const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
      const sha512Hash = Array.from(new Uint8Array(sha512Buffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      // MD5 (using a simple implementation)
      const md5Hash = simpleMD5(text);

      setHashes({
        md5: md5Hash,
        sha1: sha1Hash,
        sha256: sha256Hash,
        sha512: sha512Hash
      });
    } catch (error) {
      console.error('Error generating hashes:', error);
    }
  };

  // Simple MD5 implementation
  const simpleMD5 = (str) => {
    const rotateLeft = (value, shift) => (value << shift) | (value >>> (32 - shift));
    const addUnsigned = (x, y) => {
      const lsw = (x & 0xFFFF) + (y & 0xFFFF);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    };

    const utf8Encode = (text) => {
      return unescape(encodeURIComponent(text));
    };

    const convertToWordArray = (text) => {
      const wordArray = [];
      const length = text.length;
      for (let i = 0; i < length; i++) {
        wordArray[i >> 2] |= (text.charCodeAt(i) & 0xFF) << ((i % 4) * 8);
      }
      return wordArray;
    };

    const md5Cycle = (x, k) => {
      let a = x[0];
      let b = x[1];
      let c = x[2];
      let d = x[3];

      const ff = (a1, b1, c1, d1, x1, s, ac) => {
        a1 = addUnsigned(a1, addUnsigned(addUnsigned((b1 & c1) | (~b1 & d1), x1), ac));
        return addUnsigned(rotateLeft(a1, s), b1);
      };

      const gg = (a1, b1, c1, d1, x1, s, ac) => {
        a1 = addUnsigned(a1, addUnsigned(addUnsigned((b1 & d1) | (c1 & ~d1), x1), ac));
        return addUnsigned(rotateLeft(a1, s), b1);
      };

      const hh = (a1, b1, c1, d1, x1, s, ac) => {
        a1 = addUnsigned(a1, addUnsigned(addUnsigned(b1 ^ c1 ^ d1, x1), ac));
        return addUnsigned(rotateLeft(a1, s), b1);
      };

      const ii = (a1, b1, c1, d1, x1, s, ac) => {
        a1 = addUnsigned(a1, addUnsigned(addUnsigned(c1 ^ (b1 | ~d1), x1), ac));
        return addUnsigned(rotateLeft(a1, s), b1);
      };

      a = ff(a, b, c, d, k[0], 7, 0xD76AA478);
      d = ff(d, a, b, c, k[1], 12, 0xE8C7B756);
      c = ff(c, d, a, b, k[2], 17, 0x242070DB);
      b = ff(b, c, d, a, k[3], 22, 0xC1BDCEEE);
      a = ff(a, b, c, d, k[4], 7, 0xF57C0FAF);
      d = ff(d, a, b, c, k[5], 12, 0x4787C62A);
      c = ff(c, d, a, b, k[6], 17, 0xA8304613);
      b = ff(b, c, d, a, k[7], 22, 0xFD469501);
      a = ff(a, b, c, d, k[8], 7, 0x698098D8);
      d = ff(d, a, b, c, k[9], 12, 0x8B44F7AF);
      c = ff(c, d, a, b, k[10], 17, 0xFFFF5BB1);
      b = ff(b, c, d, a, k[11], 22, 0x895CD7BE);
      a = ff(a, b, c, d, k[12], 7, 0x6B901122);
      d = ff(d, a, b, c, k[13], 12, 0xFD987193);
      c = ff(c, d, a, b, k[14], 17, 0xA679438E);
      b = ff(b, c, d, a, k[15], 22, 0x49B40821);

      a = gg(a, b, c, d, k[1], 5, 0xF61E2562);
      d = gg(d, a, b, c, k[6], 9, 0xC040B340);
      c = gg(c, d, a, b, k[11], 14, 0x265E5A51);
      b = gg(b, c, d, a, k[0], 20, 0xE9B6C7AA);
      a = gg(a, b, c, d, k[5], 5, 0xD62F105D);
      d = gg(d, a, b, c, k[10], 9, 0x02441453);
      c = gg(c, d, a, b, k[15], 14, 0xD8A1E681);
      b = gg(b, c, d, a, k[4], 20, 0xE7D3FBC8);
      a = gg(a, b, c, d, k[9], 5, 0x21E1CDE6);
      d = gg(d, a, b, c, k[14], 9, 0xC33707D6);
      c = gg(c, d, a, b, k[3], 14, 0xF4D50D87);
      b = gg(b, c, d, a, k[8], 20, 0x455A14ED);
      a = gg(a, b, c, d, k[13], 5, 0xA9E3E905);
      d = gg(d, a, b, c, k[2], 9, 0xFCEFA3F8);
      c = gg(c, d, a, b, k[7], 14, 0x676F02D9);
      b = gg(b, c, d, a, k[12], 20, 0x8D2A4C8A);

      a = hh(a, b, c, d, k[5], 4, 0xFFFA3942);
      d = hh(d, a, b, c, k[8], 11, 0x8771F681);
      c = hh(c, d, a, b, k[11], 16, 0x6D9D6122);
      b = hh(b, c, d, a, k[14], 23, 0xFDE5380C);
      a = hh(a, b, c, d, k[1], 4, 0xA4BEEA44);
      d = hh(d, a, b, c, k[4], 11, 0x4BDECFA9);
      c = hh(c, d, a, b, k[7], 16, 0xF6BB4B60);
      b = hh(b, c, d, a, k[10], 23, 0xBEBFBC70);
      a = hh(a, b, c, d, k[13], 4, 0x289B7EC6);
      d = hh(d, a, b, c, k[0], 11, 0xEAA127FA);
      c = hh(c, d, a, b, k[3], 16, 0xD4EF3085);
      b = hh(b, c, d, a, k[6], 23, 0x04881D05);
      a = hh(a, b, c, d, k[9], 4, 0xD9D4D039);
      d = hh(d, a, b, c, k[12], 11, 0xE6DB99E5);
      c = hh(c, d, a, b, k[15], 16, 0x1FA27CF8);
      b = hh(b, c, d, a, k[2], 23, 0xC4AC5665);

      a = ii(a, b, c, d, k[0], 6, 0xF4292244);
      d = ii(d, a, b, c, k[7], 10, 0x432AFF97);
      c = ii(c, d, a, b, k[14], 15, 0xAB9423A7);
      b = ii(b, c, d, a, k[5], 21, 0xFC93A039);
      a = ii(a, b, c, d, k[12], 6, 0x655B59C3);
      d = ii(d, a, b, c, k[3], 10, 0x8F0CCC92);
      c = ii(c, d, a, b, k[10], 15, 0xFFEFF47D);
      b = ii(b, c, d, a, k[1], 21, 0x85845DD1);
      a = ii(a, b, c, d, k[8], 6, 0x6FA87E4F);
      d = ii(d, a, b, c, k[15], 10, 0xFE2CE6E0);
      c = ii(c, d, a, b, k[6], 15, 0xA3014314);
      b = ii(b, c, d, a, k[13], 21, 0x4E0811A1);
      a = ii(a, b, c, d, k[4], 6, 0xF7537E82);
      d = ii(d, a, b, c, k[11], 10, 0xBD3AF235);
      c = ii(c, d, a, b, k[2], 15, 0x2AD7D2BB);
      b = ii(b, c, d, a, k[9], 21, 0xEB86D391);

      x[0] = addUnsigned(a, x[0]);
      x[1] = addUnsigned(b, x[1]);
      x[2] = addUnsigned(c, x[2]);
      x[3] = addUnsigned(d, x[3]);
    };

    const utf8String = utf8Encode(str);
    const wordArray = convertToWordArray(utf8String);
    const bitLength = utf8String.length * 8;

    wordArray[bitLength >> 5] |= 0x80 << (bitLength % 32);
    wordArray[(((bitLength + 64) >>> 9) << 4) + 14] = bitLength;

    const state = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476];

    for (let i = 0; i < wordArray.length; i += 16) {
      const block = wordArray.slice(i, i + 16);
      md5Cycle(state, block);
    }

    return state.map((word) =>
      [0, 8, 16, 24].map((shift) =>
        ((word >>> shift) & 0xFF).toString(16).padStart(2, '0')
      ).join('')
    ).join('');
  };

  useEffect(() => {
    generateHashes(input);
  }, [input]);

  const copyToClipboard = async (text, type) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const loadSample = () => {
    setInput('Hello, World! This is a sample text to hash.');
  };

  const clearAll = () => {
    setInput('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setInput(text);
      }
    };
    reader.readAsText(file);
  };

  const hashTypes = [
    { name: 'MD5', key: 'md5', color: 'border-orange-500', description: '128-bit hash (not secure for passwords)' },
    { name: 'SHA-1', key: 'sha1', color: 'border-red-500', description: '160-bit hash (legacy, avoid for security)' },
    { name: 'SHA-256', key: 'sha256', color: 'border-green-500', description: '256-bit hash (recommended)' },
    { name: 'SHA-512', key: 'sha512', color: 'border-blue-500', description: '512-bit hash (most secure)' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="Hash Generator" />

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Description */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Hash className="w-7 h-7 text-orange-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Hash Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Generate hashes instantly for text or files with private, in-browser processing.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Upload File</span>
              <input
                type="file"
                onChange={handleFileUpload}
                data-analytics-event="hash_upload"
                data-analytics-label="open"
                className="hidden"
                accept="text/*"
              />
            </label>
            <button
              onClick={loadSample}
              data-analytics-event="hash_sample"
              className="flex items-center space-x-2 bg-slate-600 text-white px-6 py-2.5 rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              <Code className="w-4 h-4" />
              <span>Load Sample</span>
            </button>
            <button
              onClick={clearAll}
              data-analytics-event="hash_clear"
              className="flex items-center space-x-2 border-2 border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
            >
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-900">Input Text</h3>
            <span className="text-sm text-slate-500">{input.length} characters</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="w-full h-32 sm:h-40 p-4 border border-slate-300 rounded-xl font-mono text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
          />
        </div>

        {/* Hash Results */}
        <div className="space-y-4">
          {hashTypes.map((type) => (
            <div
              key={type.key}
              className={`bg-white rounded-xl shadow-sm border-l-4 ${type.color} p-6`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="text-lg font-bold text-slate-900">{type.name}</h3>
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {hashes[type.key].length ? `${hashes[type.key].length * 4} bits` : '0 bits'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{type.description}</p>
                  <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm break-all">
                    {hashes[type.key] || <span className="text-slate-400">Hash will appear here...</span>}
                  </div>
                </div>
                {hashes[type.key] && (
                  <button
                    onClick={() => copyToClipboard(hashes[type.key], type.key)}
                    data-analytics-event="hash_copy"
                    data-analytics-label={type.key}
                    className="ml-4 flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {copied === type.key ? (
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
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">About Hash Functions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">What are Hash Functions?</h4>
              <p className="text-slate-600 mb-4">
                Hash functions are algorithms that convert input data of any size into a fixed-size string of characters.
                They are one-way functions, meaning you cannot reverse the process to get the original input.
              </p>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Common Uses</h4>
              <ul className="space-y-2 text-slate-600">
                <li>✅ Password storage (with salting)</li>
                <li>✅ File integrity verification</li>
                <li>✅ Digital signatures</li>
                <li>✅ Data deduplication</li>
                <li>✅ Checksum validation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Security Notes</h4>
              <ul className="space-y-3 text-slate-600">
                <li>
                  <strong className="text-red-600">MD5:</strong> Not secure for cryptographic purposes. Use only for checksums.
                </li>
                <li>
                  <strong className="text-orange-600">SHA-1:</strong> Deprecated for security. Avoid for new applications.
                </li>
                <li>
                  <strong className="text-green-600">SHA-256:</strong> Secure and widely used. Recommended for most applications.
                </li>
                <li>
                  <strong className="text-blue-600">SHA-512:</strong> Most secure. Use for high-security applications.
                </li>
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
                Generate cryptographic hashes instantly with a free, online hash generator that runs in your browser.
                Create MD5, SHA-1, SHA-256, or SHA-512 digests from text or files to verify integrity, compare payloads,
                or build consistent identifiers without sending data anywhere.
              </p>
              <p>
                Developers rely on hashes for checksums, cache keys, and signature inputs. This tool keeps everything
                client-side, so your inputs stay private and results appear instantly with no registration. Use it for
                quick validation during debugging, or generate hashes for documentation and test fixtures.
              </p>
              <p>
                Hashing is also useful when you need deterministic fingerprints for comparisons across environments.
                Generate multiple algorithms at once to verify consistency and choose the right digest for your
                security or caching needs.
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>Hash text or uploaded files using common algorithms.</li>
              <li>Compare outputs across MD5, SHA-1, SHA-256, and SHA-512.</li>
              <li>Copy or download results with a single click.</li>
              <li>Local processing keeps sensitive data on your device.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">How to Use</h3>
            <p className="text-slate-600 mb-3">
              Hashes are deterministic, so the same input always yields the same output. Use that to compare values.
            </p>
            <ol className="list-decimal list-inside text-slate-600 space-y-2">
              <li>Paste text or upload a file to hash.</li>
              <li>Select the hash algorithms you need.</li>
              <li>Review the generated digests instantly.</li>
              <li>Copy or download the results for your workflow.</li>
            </ol>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Common Use Cases</h3>
            <p className="text-slate-600 mb-3">
              Quick hashing is helpful when validating transfers, comparing builds, or confirming payload integrity.
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Verifying file integrity across environments.</li>
              <li>Creating cache keys or content fingerprints.</li>
              <li>Checking API payload consistency during debugging.</li>
              <li>Generating test data for security or QA checks.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">FAQ</h3>
            <div className="space-y-4 text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900">Are hashes reversible?</h4>
                <p>No. Hashes are one-way digests and cannot be decoded back to the original input. Use encryption if you need reversibility.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Which algorithm should I use?</h4>
                <p>Use SHA-256 or SHA-512 for modern security needs; MD5 and SHA-1 are legacy. For checksums, choose the algorithm your system expects.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Is my data uploaded?</h4>
                <p>No. Hashing happens locally in your browser for privacy. Your text and files stay on your device.</p>
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
              <p className="text-slate-600 text-sm">Encode data before hashing or transport.</p>
            </a>
            <a href="/uuid-generator" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">UUID Generator</h4>
              <p className="text-slate-600 text-sm">Create unique IDs to hash or store alongside checksums.</p>
            </a>
            <a href="/jwt-decoder" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">JWT Decoder</h4>
              <p className="text-slate-600 text-sm">Inspect JWTs before verifying signatures.</p>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
