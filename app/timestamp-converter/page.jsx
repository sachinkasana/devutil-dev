'use client';

import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, RefreshCw, Home, Clock } from 'lucide-react';

export default function TimestampConverter() {
  const [currentTime, setCurrentTime] = useState(null);
  const [timestamp, setTimestamp] = useState('');
  const [humanDate, setHumanDate] = useState('');
  const [mode, setMode] = useState('toHuman');
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(Date.now());
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mode === 'toHuman' && timestamp) {
      convertToHuman();
    } else if (mode === 'toTimestamp' && humanDate) {
      convertToTimestamp();
    }
  }, [timestamp, humanDate, mode]);

  const convertToHuman = () => {
    setError('');
    try {
      const ts = parseInt(timestamp, 10);
      if (Number.isNaN(ts)) {
        setError('Invalid timestamp');
        return;
      }

      // Handle both seconds and milliseconds
      const date = ts.toString().length <= 10 ? new Date(ts * 1000) : new Date(ts);

      if (Number.isNaN(date.getTime())) {
        setError('Invalid timestamp');
        return;
      }

      setHumanDate(date.toISOString().slice(0, 16));
    } catch (e) {
      setError(e.message);
    }
  };

  const convertToTimestamp = () => {
    setError('');
    try {
      const date = new Date(humanDate);
      if (Number.isNaN(date.getTime())) {
        setError('Invalid date');
        return;
      }
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
    } catch (e) {
      setError(e.message);
    }
  };

  const copyToClipboard = async (text, type) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const useCurrentTime = () => {
    if (!currentTime) return;
    const seconds = Math.floor(currentTime / 1000);
    setTimestamp(seconds.toString());
    setMode('toHuman');
  };

  const clearAll = () => {
    setTimestamp('');
    setHumanDate('');
    setError('');
  };

  const formatDate = (date) => {
    return {
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      relative: getRelativeTime(date)
    };
  };

  const getRelativeTime = (date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`;
    return `${Math.floor(seconds / 31536000)} years ago`;
  };

  const currentTimestamp = currentTime ? Math.floor(currentTime / 1000) : null;
  const currentDate = currentTime ? new Date(currentTime) : null;

  let convertedDate = null;
  if (timestamp && !error && mode === 'toHuman') {
    const ts = parseInt(timestamp, 10);
    convertedDate = ts.toString().length <= 10 ? new Date(ts * 1000) : new Date(ts);
  }

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
                  <p className="text-xs text-slate-500">Timestamp Converter</p>
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
            <RefreshCw className="w-8 h-8 text-teal-600" />
            <h2 className="text-4xl font-bold text-slate-900">Timestamp Converter</h2>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Convert Unix timestamps to human-readable dates and vice versa.
          </p>
        </div>

        {/* Current Time Display */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="w-6 h-6" />
            <h3 className="text-xl font-semibold">Current Time</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-sm opacity-90 mb-2">Unix Timestamp (seconds)</div>
              <div className="flex items-center justify-center space-x-2">
                <code className="text-3xl font-bold font-mono bg-white/20 px-4 py-2 rounded-lg">
                  {isMounted && currentTimestamp !== null ? currentTimestamp : '--'}
                </code>
                <button
                  onClick={() => currentTimestamp !== null && copyToClipboard(currentTimestamp.toString(), 'current-ts')}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  disabled={currentTimestamp === null}
                >
                  {copied === 'current-ts' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-2">Human Readable</div>
              <div className="flex items-center justify-center space-x-2">
                <code className="text-xl font-mono bg-white/20 px-4 py-2 rounded-lg">
                  {isMounted && currentDate ? currentDate.toLocaleString() : '--'}
                </code>
                <button
                  onClick={() => currentDate && copyToClipboard(currentDate.toISOString(), 'current-date')}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  disabled={!currentDate}
                >
                  {copied === 'current-date' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 inline-flex">
            <button
              onClick={() => {
                setMode('toHuman');
                setHumanDate('');
              }}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                mode === 'toHuman'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Timestamp → Date
            </button>
            <button
              onClick={() => {
                setMode('toTimestamp');
                setTimestamp('');
              }}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                mode === 'toTimestamp'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Date → Timestamp
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={useCurrentTime}
              className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Use Current Time</span>
            </button>
            <button
              onClick={clearAll}
              className="flex items-center space-x-2 border-2 border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
            >
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Converter Input/Output */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          {mode === 'toHuman' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Unix Timestamp (seconds or milliseconds)
                </label>
                <input
                  type="text"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="Enter timestamp... e.g., 1704067200"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg font-mono text-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              {humanDate && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Human Readable Date
                  </label>
                  <input
                    type="datetime-local"
                    value={humanDate}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg font-mono text-lg"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Date and Time
                </label>
                <input
                  type="datetime-local"
                  value={humanDate}
                  onChange={(e) => setHumanDate(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg font-mono text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {timestamp && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Unix Timestamp (seconds)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={timestamp}
                      readOnly
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg font-mono text-lg"
                    />
                    <button
                      onClick={() => copyToClipboard(timestamp, 'result')}
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {copied === 'result' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Detailed Output */}
        {convertedDate && !error && mode === 'toHuman' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Date Formats</h3>
            <div className="space-y-3">
              {Object.entries(formatDate(convertedDate)).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between bg-slate-50 rounded-lg p-4">
                  <div className="flex-1">
                    <div className="text-sm text-slate-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    <code className="text-sm text-slate-900 font-mono">{value}</code>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, key)}
                    className="ml-4 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {copied === key ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">About Unix Timestamps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">What is a Unix Timestamp?</h4>
              <p className="text-slate-600 mb-4">
                A Unix timestamp is the number of seconds that have elapsed since the Unix epoch (January 1, 1970, 00:00:00 UTC).
                It's a simple way to represent time as a single number.
              </p>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Formats</h4>
              <ul className="space-y-2 text-slate-600">
                <li>✅ <strong>Seconds:</strong> 10 digits (e.g., 1704067200)</li>
                <li>✅ <strong>Milliseconds:</strong> 13 digits (e.g., 1704067200000)</li>
                <li>✅ <strong>ISO 8601:</strong> 2024-01-01T00:00:00Z</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Common Uses</h4>
              <ul className="space-y-2 text-slate-600">
                <li>✅ Database date storage</li>
                <li>✅ API timestamps</li>
                <li>✅ Log file timestamps</li>
                <li>✅ Session expiration</li>
                <li>✅ File modification times</li>
                <li>✅ Event scheduling</li>
              </ul>
              <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                <p className="text-sm text-teal-800">
                  <strong>Tip:</strong> Most programming languages work with Unix timestamps in seconds,
                  but JavaScript uses milliseconds.
                </p>
              </div>
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
