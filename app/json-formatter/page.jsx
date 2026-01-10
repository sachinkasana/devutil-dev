'use client';

import React, { useState } from 'react';
import { Parser as Json2CsvParser } from 'json2csv';
import { jsonrepair } from 'jsonrepair';
import { js2xml } from 'xml-js';
import YAML from 'yaml';
import { Code, Copy, Check, FileJson, Home, Download, RefreshCw, AlignLeft, Wrench, ChevronsDownUp } from 'lucide-react';

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
                  <p className="text-xs text-slate-500">JSON Formatter</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Description */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <FileJson className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-slate-900">JSON Formatter</h2>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Validate, beautify, and minify JSON instantly. All processing stays in your browser.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => formatJson(false)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <AlignLeft className="w-4 h-4" />
              <span>Format</span>
            </button>
            <button
              onClick={() => formatJson(true)}
              className="flex items-center space-x-2 bg-slate-700 text-white px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Minify</span>
            </button>
            <button
              onClick={repairJson}
              title="Attempts to fix common JSON issues like trailing commas, single quotes, comments, and JSONP wrappers."
              className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              <Wrench className="w-4 h-4" />
              <span>Repair JSON</span>
            </button>
            <button
              onClick={() => setInput(sampleJson)}
              className="flex items-center space-x-2 bg-slate-600 text-white px-6 py-2.5 rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              <Code className="w-4 h-4" />
              <span>Load Sample</span>
            </button>
            <button
              onClick={clearAll}
              className="flex items-center space-x-2 border-2 border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
            >
              <span>Clear All</span>
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsConvertMenuOpen((open) => !open)}
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
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
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
              className="w-full h-96 p-4 border border-slate-300 rounded-xl font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
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
                      className="flex items-center space-x-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={copyToClipboard}
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
              className="w-full h-96 p-4 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm resize-none"
            />
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
