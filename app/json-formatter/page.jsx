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
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Free Online JSON Formatter & Validator</h1>
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
                data-analytics-event="json_sort_keys"
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span title="Sorts object keys alphabetically before formatting.">Sort keys</span>
            </label>
            <div className="flex items-center space-x-2">
              <span>Indent</span>
              <select
                value={indent}
                onChange={(e) => setIndent(parseInt(e.target.value, 10))}
                data-analytics-event="json_indent"
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
                data-analytics-event="json_output_format"
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
        <section className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is a JSON Formatter?</h2>
            <div className="text-slate-600 space-y-4">
              <p>
                A JSON formatter takes raw JSON and makes it easy to read. It adds spacing, line breaks, and
                indentation. This is also called a JSON beautifier or pretty printer. The data stays the same.
              </p>
              <p>
                A JSON formatter is helpful when you get a compact API response. You can scan keys, check nesting, and
                spot missing commas. It also makes diffs smaller and clearer during reviews.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is JSON?</h2>
            <div className="text-slate-600 space-y-4">
              <p>
                JSON stands for JavaScript Object Notation. It is a lightweight format for data exchange. It uses
                objects, arrays, strings, numbers, booleans, and null. Most APIs use JSON because it is simple and
                readable.
              </p>
              <p>
                JSON is strict about syntax. Keys must be in double quotes. Trailing commas are not allowed. A single
                mistake can break a response. A JSON validator helps you catch these issues fast.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why Format JSON?</h2>
            <div className="text-slate-600 space-y-4">
              <p>
                Formatting JSON makes it easier to scan. You can read nested objects without getting lost. It also
                makes errors easier to spot. A clean layout helps you compare changes in a pull request.
              </p>
              <p>
                Formatting is also useful when you share data. Clean JSON is easier for teammates to review. It is
                faster to paste into tests, mocks, and fixtures.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to Format JSON Online</h2>
            <p className="text-slate-600 mb-3">
              Use this free JSON formatter to format JSON online in seconds. It runs fully in your browser.
            </p>
            <ol className="list-decimal list-inside text-slate-600 space-y-2">
              <li>Paste or load your JSON payload in the input panel.</li>
              <li>Choose Format, Minify, or Repair to clean the JSON.</li>
              <li>Optionally sort keys or convert to CSV, XML, or YAML.</li>
              <li>Copy or download the output when you are done.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">JSON Validator - Check JSON Syntax</h2>
            <div className="text-slate-600 space-y-4">
              <p>
                A JSON validator checks syntax rules. It catches missing quotes, extra commas, and broken brackets.
                This tool highlights the error line and column to speed up fixes.
              </p>
              <p>
                Use the Repair button to fix common issues. It can handle trailing commas, comments, and JSONP
                wrappers. If repair fails, the error panel shows where the JSON broke.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">JSON Beautifier Features</h2>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>Pretty-print or minify JSON with custom indentation.</li>
              <li>Auto-repair common issues like trailing commas and JSONP.</li>
              <li>Sort keys for stable diffs and predictable output ordering.</li>
              <li>Convert JSON to CSV, XML, or YAML and download instantly.</li>
              <li>Run 100% client-side so data never leaves your device.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Format JSON vs Minify JSON</h2>
            <div className="text-slate-600 space-y-4">
              <p>
                Formatting adds whitespace so people can read the data. Minifying removes whitespace to reduce size.
                Both keep the same values. Use format for debugging and reviews. Use minify for production payloads.
              </p>
              <p>
                You can switch between pretty and compact output at any time. This makes it easy to compare readability
                and file size without switching tools.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Common JSON Formatting Errors</h2>
            <div className="text-slate-600 space-y-4">
              <p>
                The most common error is a trailing comma. JSON does not allow commas after the last item in an array
                or object. Another common issue is single quotes around keys or strings. JSON needs double quotes.
              </p>
              <p>
                Missing braces or brackets are also frequent. A JSON validator can show where the structure breaks.
                Use the error preview to jump to the exact line and column.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Common JSON Errors and How to Fix Them</h2>
            <div className="text-slate-600 space-y-4">
              <p>
                If you see "Unexpected token", check the character before the error. It is often an extra comma or a
                missing quote. If you see "Unexpected end of JSON input", the data is cut off. Make sure the payload is
                complete.
              </p>
              <p>
                If a value looks like true or false but is quoted, it becomes a string. Remove the quotes if you want a
                boolean. If numbers are quoted, convert them back to numbers for correct types.
              </p>
              <p>
                For large payloads, format first and then scan sections. Sorting keys can help you compare objects. Use
                minify only when you are done editing.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">JSON Formatter Best Practices</h2>
            <div className="text-slate-600 space-y-4">
              <p>
                Stick to consistent indentation. Two spaces is common and easy to scan. Avoid tabs in JSON output so it
                looks the same in every editor. Keep keys in a stable order if you want clean diffs.
              </p>
              <p>
                Format JSON before you commit it to version control. This avoids noisy changes later. For API responses,
                format only the part you need and remove sensitive data before sharing.
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>Use two or four spaces and keep it consistent.</li>
              <li>Remove trailing commas and comments before shipping.</li>
              <li>Validate JSON after edits to catch syntax issues early.</li>
              <li>Minify only for final payloads or performance checks.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">JSON vs XML vs YAML</h2>
            <div className="text-slate-600 space-y-4">
              <p>
                JSON is compact and strict. It is ideal for APIs and data transfer. XML is more verbose and uses tags.
                It can include attributes but is harder to read. YAML is very readable and often used for configs.
              </p>
              <p>
                If you need a config file that humans edit, YAML can be nice. If you need fast parsing and strict
                structure, JSON is a better choice. This tool lets you convert between JSON, XML, and YAML quickly.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Examples: Format, Minify, Repair</h2>
            <div className="text-slate-600 space-y-5">
              <div>
                <h3 className="font-semibold text-slate-900">Example: Format API Response</h3>
                <p>Paste a compact response and format it for easy review.</p>
                <pre className="mt-3 rounded-lg bg-slate-50 p-4 text-xs overflow-auto">
                  <code>{`{\"user\":{\"id\":12,\"name\":\"Ava\",\"roles\":[\"admin\",\"editor\"]},\"active\":true}`}</code>
                </pre>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Example: Minify JSON for Production</h3>
                <p>Minify JSON to reduce size before you ship.</p>
                <pre className="mt-3 rounded-lg bg-slate-50 p-4 text-xs overflow-auto">
                  <code>{`{\n  \"theme\": \"dark\",\n  \"flags\": {\n    \"beta\": false,\n    \"logging\": true\n  }\n}`}</code>
                </pre>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Example: Repair Invalid JSON</h3>
                <p>Repair handles trailing commas and other common issues.</p>
                <pre className="mt-3 rounded-lg bg-slate-50 p-4 text-xs overflow-auto">
                  <code>{`{\n  \"name\": \"DevUtil\",\n  \"features\": [\"format\", \"minify\",],\n}`}</code>
                </pre>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Keyboard Shortcuts</h2>
            <div className="text-slate-600 space-y-4">
              <p>
                You can use standard editor shortcuts inside the input and output panels. Use copy and paste to move
                data quickly. Use search in your browser to find keys in large JSON outputs.
              </p>
              <ul className="space-y-2">
                <li>Copy: Ctrl+C (Windows/Linux) or Cmd+C (Mac)</li>
                <li>Paste: Ctrl+V (Windows/Linux) or Cmd+V (Mac)</li>
                <li>Find: Ctrl+F (Windows/Linux) or Cmd+F (Mac)</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why Use Our JSON Formatter?</h2>
            <div className="text-slate-600 space-y-4">
              <p>
                This JSON formatting tool is fast and private. It runs in your browser, so nothing is uploaded. You
                get instant results with no login and no tracking of your data.
              </p>
              <p>
                The formatter is simple and focused. It covers the core workflow: format, validate, repair, and export.
                It also supports JSON to CSV, XML, and YAML conversions for quick sharing.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">FAQ</h2>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-900">Is my JSON uploaded anywhere?</h3>
                <p>No. Formatting happens in your browser. Your data stays on your device.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">What is the difference between a JSON formatter and validator?</h3>
                <p>A formatter changes layout. A validator checks syntax rules and flags errors.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Can I format JSON without uploading data?</h3>
                <p>Yes. This tool works offline once loaded, and it never sends JSON to a server.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">How do I fix JSON syntax errors?</h3>
                <p>Use Repair for common issues, or read the line and column in the error panel.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Does it support large files?</h3>
                <p>It runs locally, so speed depends on your browser and device. Large files can take longer.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/base64-encoder" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-2">Base64 Encoder</h3>
              <p className="text-slate-600 text-sm">Encode or decode JSON payloads safely for transport.</p>
            </a>
            <a href="/url-encoder" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-2">URL Encoder</h3>
              <p className="text-slate-600 text-sm">Escape JSON query parameters for API requests.</p>
            </a>
            <a href="/jwt-decoder" className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-2">JWT Decoder</h3>
              <p className="text-slate-600 text-sm">Inspect JWT header and payload JSON instantly.</p>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
