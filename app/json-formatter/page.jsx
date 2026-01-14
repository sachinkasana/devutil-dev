'use client';

import React, { useState } from 'react';
import { Parser as Json2CsvParser } from 'json2csv';
import { jsonrepair } from 'jsonrepair';
import { js2xml } from 'xml-js';
import YAML from 'yaml';
import { Code, Copy, Check, FileJson, Download, RefreshCw, AlignLeft, Wrench, ChevronsDownUp } from 'lucide-react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const sampleJson = `{
  "name": "DevUtil",
  "version": "1.0.0",
  "features": ["format", "minify", "validate"],
  "metadata": {
    "createdBy": "Codex",
    "active": true
  }
}`;

const sortJsonKeys = (value) => {
  if (Array.isArray(value)) {
    return value.map(sortJsonKeys);
  }
  if (value && typeof value === 'object' && value.constructor === Object) {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortJsonKeys(value[key]);
        return acc;
      }, {});
  }
  return value;
};

const getLineColumnFromPosition = (source, position) => {
  if (position == null || position < 0) return null;
  const sliced = source.slice(0, position);
  const lines = sliced.split('\n');
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;
  return { line, column };
};

const getErrorLocation = (error, source) => {
  if (!error || !source) return null;
  if (typeof error.line === 'number' && typeof error.column === 'number') {
    return { line: error.line, column: error.column };
  }
  const positionCandidates = [
    error.position,
    error.pos,
    error.index
  ].filter((value) => typeof value === 'number');
  if (positionCandidates.length > 0) {
    return getLineColumnFromPosition(source, positionCandidates[0]);
  }
  const match = String(error.message || '').match(/position\s+(\d+)/i);
  if (match) {
    const position = Number(match[1]);
    if (!Number.isNaN(position)) {
      return getLineColumnFromPosition(source, position);
    }
  }
  return null;
};

const getErrorPreview = (source, line, radius = 2) => {
  const lines = source.split('\n');
  const start = Math.max(0, line - 1 - radius);
  const end = Math.min(lines.length, line - 1 + radius + 1);
  return {
    start: start + 1,
    lines: lines.slice(start, end)
  };
};

export default function JsonFormatterPage() {
  const [input, setInput] = useState(sampleJson);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [errorLocation, setErrorLocation] = useState(null);
  const [copied, setCopied] = useState(false);
  const [sortKeys, setSortKeys] = useState(false);
  const [indent, setIndent] = useState(2);
  const [outputFormat, setOutputFormat] = useState('pretty');
  const [outputType, setOutputType] = useState('json');
  const [isConvertMenuOpen, setIsConvertMenuOpen] = useState(false);

  const getParsedJson = () => {
    const repaired = jsonrepair(input);
    return JSON.parse(repaired);
  };

  const formatJson = (minify = false) => {
    setError('');
    setErrorLocation(null);
    try {
      const parsed = getParsedJson();
      const normalized = sortKeys ? sortJsonKeys(parsed) : parsed;
      const formatted = JSON.stringify(normalized, null, minify ? 0 : indent);
      setOutput(formatted);
      setOutputType('json');
    } catch (e) {
      setError(`Invalid JSON: ${e.message}`);
      setErrorLocation(getErrorLocation(e, input));
      setOutput('');
    }
  };

  const repairJson = () => {
    setError('');
    setErrorLocation(null);
    try {
      const repaired = jsonrepair(input);
      setInput(repaired);
    } catch (e) {
      setError(`Repair error: ${e.message}`);
      setErrorLocation(getErrorLocation(e, input));
    }
  };

  const convertJson = (targetType) => {
    setError('');
    setErrorLocation(null);
    try {
      const parsed = getParsedJson();
      const normalized = sortKeys ? sortJsonKeys(parsed) : parsed;
      if (targetType === 'xml') {
        const xml = js2xml({ root: normalized }, {
          compact: true,
          spaces: outputFormat === 'pretty' ? 2 : 0
        });
        setOutput(xml);
        setOutputType('xml');
        return;
      }
      if (targetType === 'yaml') {
        const yaml = YAML.stringify(normalized, {
          indent: outputFormat === 'pretty' ? 2 : 0,
          lineWidth: 0
        });
        setOutput(yaml);
        setOutputType('yaml');
        return;
      }
      if (targetType === 'csv') {
        const rows = Array.isArray(normalized) ? normalized : [normalized];
        const parser = new Json2CsvParser({
          header: true,
          withBOM: true
        });
        const csv = parser.parse(rows);
        setOutput(csv);
        setOutputType('csv');
        return;
      }
      const formatted = JSON.stringify(normalized, null, outputFormat === 'pretty' ? indent : 0);
      setOutput(formatted);
      setOutputType('json');
    } catch (e) {
      setError(`Convert error: ${e.message}`);
      setErrorLocation(getErrorLocation(e, input));
      setOutput('');
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadOutput = () => {
    if (!output) return;
    const fileType = outputType === 'xml'
      ? 'application/xml'
      : outputType === 'yaml'
        ? 'text/yaml'
        : outputType === 'csv'
          ? 'text/csv'
          : 'application/json';
    const extension = outputType === 'xml'
      ? 'xml'
      : outputType === 'yaml'
        ? 'yaml'
        : outputType === 'csv'
          ? 'csv'
          : 'json';
    const blob = new Blob([output], { type: fileType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `output.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setErrorLocation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="JSON Formatter" />

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Description */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <FileJson className="w-7 h-7 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">JSON Formatter</h1>
          </div>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Format, validate, and repair JSON instantly in your browser with fast, private processing.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => formatJson(false)}
              data-analytics-event="json_format"
              data-analytics-label="pretty"
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <AlignLeft className="w-4 h-4" />
              <span>Format</span>
            </button>
            <button
              onClick={() => formatJson(true)}
              data-analytics-event="json_format"
              data-analytics-label="minify"
              className="flex items-center space-x-2 bg-slate-700 text-white px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Minify</span>
            </button>
            <button
              onClick={repairJson}
              data-analytics-event="json_repair"
              title="Attempts to fix common JSON issues like trailing commas, single quotes, comments, and JSONP wrappers."
              className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              <Wrench className="w-4 h-4" />
              <span>Repair JSON</span>
            </button>
            <button
              onClick={() => setInput(sampleJson)}
              data-analytics-event="json_sample"
              className="flex items-center space-x-2 bg-slate-600 text-white px-6 py-2.5 rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              <Code className="w-4 h-4" />
              <span>Load Sample</span>
            </button>
            <button
              onClick={clearAll}
              data-analytics-event="json_clear"
              className="flex items-center space-x-2 border-2 border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
            >
              <span>Clear All</span>
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsConvertMenuOpen((open) => !open)}
                data-analytics-event="json_convert_menu"
                aria-expanded={isConvertMenuOpen}
                title="Convert the current JSON into another format."
                className="flex items-center justify-between w-56 border-2 border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
              >
                <span>Convert JSON to</span>
                <ChevronsDownUp className="w-4 h-4 ml-2" />
              </button>
              {isConvertMenuOpen && (
                <ul className="absolute z-10 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setIsConvertMenuOpen(false);
                        convertJson('xml');
                      }}
                      data-analytics-event="json_convert"
                      data-analytics-label="xml"
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      JSON → XML
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setIsConvertMenuOpen(false);
                        convertJson('csv');
                      }}
                      data-analytics-event="json_convert"
                      data-analytics-label="csv"
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      JSON → CSV
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setIsConvertMenuOpen(false);
                        convertJson('yaml');
                      }}
                      data-analytics-event="json_convert"
                      data-analytics-label="yaml"
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      JSON → YAML
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-6 text-sm text-slate-700">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sortKeys}
                onChange={(e) => setSortKeys(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span title="Sorts object keys alphabetically before formatting.">Sort keys</span>
            </label>
            <div className="flex items-center space-x-2">
              <span>Indent</span>
              <select
                value={indent}
                onChange={(e) => setIndent(parseInt(e.target.value, 10))}
                className="border border-slate-300 rounded-md px-2 py-1"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span>Output</span>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                title="Choose pretty formatting or compact output."
                className="border border-slate-300 rounded-md px-2 py-1"
              >
                <option value="pretty">Pretty</option>
                <option value="compact">Compact</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6" role="alert" aria-live="polite">
            <p className="text-red-700 text-sm">{error}</p>
            {errorLocation && (
              <p className="text-red-700 text-sm mt-2">
                Line {errorLocation.line}, Column {errorLocation.column}
              </p>
            )}
          </div>
        )}

        {errorLocation && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
            <div className="text-sm font-semibold text-slate-900 mb-3">Error location</div>
            <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs overflow-auto">
              {(() => {
                const preview = getErrorPreview(input, errorLocation.line);
                return preview.lines.map((lineText, index) => {
                  const lineNumber = preview.start + index;
                  const isErrorLine = lineNumber === errorLocation.line;
                  return (
                    <div key={lineNumber} className={isErrorLine ? 'bg-red-100 rounded px-2 py-1' : ''}>
                      <span className="text-slate-400 mr-3">{String(lineNumber).padStart(3, ' ')}</span>
                      <span className="text-slate-900 whitespace-pre-wrap">{lineText || ' '}</span>
                      {isErrorLine && (
                        <div className="text-red-600 whitespace-pre-wrap">
                          <span className="text-slate-400 mr-3">{' '.padStart(3, ' ')}</span>
                          {' '.repeat(Math.max(0, errorLocation.column - 1))}^
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {/* Input/Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Input</h3>
              <span className="text-sm text-slate-500">{input.length} characters</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste JSON here..."
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
                      data-analytics-event="json_download"
                      data-analytics-label={outputType}
                      className="flex items-center space-x-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={copyToClipboard}
                      data-analytics-event="json_copy"
                      data-analytics-label={outputType}
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
              placeholder="Formatted JSON will appear here..."
              className="w-full h-64 sm:h-80 lg:h-96 p-4 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm resize-none"
            />
          </div>
        </div>

        {/* Supporting Content */}
        <section className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Overview</h3>
            <div className="text-slate-600 space-y-4">
              <p>
                Format, validate, and repair JSON in seconds. This free formatter runs in your browser.
                Paste raw API responses, load a sample, or convert JSON to CSV, XML, or YAML. Your data never leaves
                your device.
              </p>
              <p>
                Clean JSON helps with debugging, code reviews, and configs. This tool keeps everything client-side and
                shows results fast. Use it to spot syntax errors, sort keys for diffs, or make a quick minified version.
              </p>
              <p>
                Consistent formatting makes changes easy to track. The formatter keeps the data structure intact.
                Share the cleaned output or paste it into tests and fixtures.
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>Pretty-print or minify JSON with custom indentation.</li>
              <li>Auto-repair common issues like trailing commas and JSONP.</li>
              <li>Sort keys for stable diffs and predictable output ordering.</li>
              <li>Convert JSON to CSV, XML, or YAML and download instantly.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">How to Use</h3>
            <p className="text-slate-600 mb-3">
              Format in place, then copy the result into your editor or API client.
            </p>
            <ol className="list-decimal list-inside text-slate-600 space-y-2">
              <li>Paste or load your JSON payload in the input panel.</li>
              <li>Choose Format, Minify, or Repair to clean the JSON.</li>
              <li>Optionally sort keys or convert to CSV, XML, or YAML.</li>
              <li>Copy or download the output when you are done.</li>
            </ol>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Common Use Cases</h3>
            <p className="text-slate-600 mb-3">
              JSON shows up everywhere, so a reliable formatter speeds up debugging and teamwork.
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Cleaning up API responses for debugging in dev tools.</li>
              <li>Normalizing JSON configs before committing to Git.</li>
              <li>Minifying payloads to compare response sizes quickly.</li>
              <li>Converting JSON data to CSV for quick analysis.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">FAQ</h3>
            <div className="space-y-4 text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900">Is my JSON uploaded anywhere?</h4>
                <p>No. Formatting happens in your browser. Your data stays on your device.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Can it fix invalid JSON?</h4>
                <p>Yes. Repair handles common issues like trailing commas, comments, and JSONP wrappers.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Does it support large files?</h4>
                <p>It runs locally, so speed depends on your browser and device. Large files can take longer.</p>
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
              <p className="text-slate-600 text-sm">Encode or decode JSON payloads safely for transport.</p>
            </a>
            <a href="/url-encoder" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">URL Encoder</h4>
              <p className="text-slate-600 text-sm">Escape JSON query parameters for API requests.</p>
            </a>
            <a href="/jwt-decoder" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-2">JWT Decoder</h4>
              <p className="text-slate-600 text-sm">Inspect JWT header and payload JSON instantly.</p>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
