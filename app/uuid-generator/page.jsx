'use client';

import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, Key, Home, RefreshCw, Download, Trash2 } from 'lucide-react';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

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

  useEffect(() => {
    generateUUIDs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">DevUtil</h1>
                  <p className="text-xs text-slate-500">UUID Generator</p>
                </div>
              </a>
            </div>
            <a
              href="/"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">All Tools</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Description */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Key className="w-8 h-8 text-purple-600" />
            <h2 className="text-4xl font-bold text-slate-900">UUID Generator</h2>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Generate universally unique identifiers (UUIDs) version 4 instantly. Perfect for databases, APIs, and unique keys.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of UUIDs
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
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
              className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate</span>
            </button>
            {uuids.length > 0 && (
              <>
                <button
                  onClick={copyAll}
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
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={clearAll}
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
            <p className="text-slate-600 text-sm">
              The probability of generating duplicate UUIDs is negligibly small, making them ideal for distributed systems.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Common Uses</h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span><strong>Database Primary Keys:</strong> Unique identifiers for records</span>
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
              <p className="text-sm text-slate-600">Generate up to 100 UUIDs at once</p>
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
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2026 DevUtil.dev - All rights reserved.</p>
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
