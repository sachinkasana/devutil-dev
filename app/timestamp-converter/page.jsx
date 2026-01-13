'use client';

import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, RefreshCw, Clock } from 'lucide-react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

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
      <Header subtitle="Timestamp Converter" />

      {/* Main Content */}
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Description */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <RefreshCw className="w-7 h-7 text-teal-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Timestamp Converter</h1>
          </div>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Convert timestamps instantly with fast, private in-browser processing.
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
                  data-analytics-event="timestamp_copy"
                  data-analytics-label="current-ts"
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  disabled={currentTimestamp === null}
                  aria-label="Copy current timestamp"
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
                  data-analytics-event="timestamp_copy"
                  data-analytics-label="current-date"
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  disabled={!currentDate}
                  aria-label="Copy current date"
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
              data-analytics-event="timestamp_mode"
              data-analytics-label="toHuman"
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
              data-analytics-event="timestamp_mode"
              data-analytics-label="toTimestamp"
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
              data-analytics-event="timestamp_use_current"
              className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Use Current Time</span>
            </button>
            <button
              onClick={clearAll}
              data-analytics-event="timestamp_clear"
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
                      data-analytics-event="timestamp_copy"
                      data-analytics-label="result"
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      aria-label="Copy timestamp"
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
                    data-analytics-event="timestamp_copy"
                    data-analytics-label={key}
                    className="ml-4 text-blue-600 hover:text-blue-700 transition-colors"
                    aria-label={`Copy ${key} format`}
                  >
                    {copied === key ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supporting Content */}
        <section className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Overview</h3>
            <div className="text-slate-600 space-y-4">
              <p>
                Convert Unix timestamps to human-readable dates and back with a free, online timestamp converter that
                runs entirely in your browser. Handle seconds, milliseconds, and ISO strings without sending data to a
                server.
              </p>
              <p>
                Developers use timestamps to debug logs, validate API responses, and schedule jobs. This tool keeps
                everything client-side for privacy, so your data never leaves the browser and results appear instantly
                with no registration. Convert, copy, and compare formats in seconds.
              </p>
              <p>
                It is especially handy when you need to translate milliseconds from JavaScript or compare UTC and local
                time in distributed systems. Keep the converter open while you trace incidents or validate time-based
                logic during QA.
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>Convert between seconds, milliseconds, and ISO 8601.</li>
              <li>View the current time in multiple formats.</li>
              <li>Copy converted values with a single click.</li>
              <li>Local processing keeps timestamps private.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">How to Use</h3>
            <p className="text-slate-600 mb-3">
              Enter a timestamp once and get multiple formats instantly for debugging and documentation.
            </p>
            <ol className="list-decimal list-inside text-slate-600 space-y-2">
              <li>Enter a Unix timestamp or a human-readable date.</li>
              <li>Select whether the value is in seconds or milliseconds.</li>
              <li>Convert to see ISO, UTC, and local formats instantly.</li>
              <li>Copy the output values for logs or API requests.</li>
            </ol>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Common Use Cases</h3>
            <p className="text-slate-600 mb-3">
              Timestamp conversion is useful when reconciling logs, metrics, and user-reported issues.
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Debugging API responses and log timestamps.</li>
              <li>Converting milliseconds from JavaScript Date objects.</li>
              <li>Scheduling jobs with epoch-based time values.</li>
              <li>Validating token expiration or cache TTLs.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">FAQ</h3>
            <div className="space-y-4 text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900">Seconds or milliseconds?</h4>
                <p>Most systems use seconds, while JavaScript uses milliseconds by default. Choose the correct unit before converting.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Is any data sent to a server?</h4>
                <p>No. Conversions run locally in your browser. Your time values stay private.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Why are UTC and local times different?</h4>
                <p>UTC is timezone-agnostic; local time reflects your system timezone. The offset changes with daylight saving time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">Related Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/uuid-generator" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">UUID Generator</h4>
              <p className="text-slate-600 text-sm">Generate IDs while correlating time-based events.</p>
            </a>
            <a href="/hash-generator" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">Hash Generator</h4>
              <p className="text-slate-600 text-sm">Hash timestamps for checksums or cache keys.</p>
            </a>
            <a href="/json-formatter" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">JSON Formatter</h4>
              <p className="text-slate-600 text-sm">Inspect API responses with timestamp fields.</p>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
