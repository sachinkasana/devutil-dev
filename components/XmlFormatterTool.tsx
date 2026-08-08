'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { js2xml, xml2js } from 'xml-js';

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<root><user id="1"><name>Ada Lovelace</name><roles><role>admin</role><role>editor</role></roles></user><user id="2"><name>Grace Hopper</name><roles><role>viewer</role></roles></user></root>`;

export default function XmlFormatterTool() {
  const [input, setInput] = useState(SAMPLE_XML);
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const parseXml = (value: string) => {
    return xml2js(value, {
      compact: false,
      ignoreComment: false,
      alwaysChildren: true
    });
  };

  const handleBeautify = () => {
    try {
      if (!input.trim()) {
        setError('Please enter XML to format.');
        setOutput('');
        return;
      }
      const parsed = parseXml(input);
      const formatted = js2xml(parsed, {
        compact: false,
        spaces: indent,
        ignoreComment: false
      });
      setOutput(formatted.trim());
      setError('');
      setCopied(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid XML. Unable to format.');
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      if (!input.trim()) {
        setError('Please enter XML to minify.');
        setOutput('');
        return;
      }
      const parsed = parseXml(input);
      const minified = js2xml(parsed, {
        compact: false,
        spaces: 0,
        ignoreComment: false
      });
      setOutput(minified.replace(/>\s+</g, '><').trim());
      setError('');
      setCopied(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid XML. Unable to minify.');
      setOutput('');
    }
  };

  const handleValidate = () => {
    try {
      if (!input.trim()) {
        setError('Please enter XML to validate.');
        setOutput('');
        return;
      }
      parseXml(input);
      setError('');
      setOutput('Valid XML ✓');
      setCopied(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid XML.');
      setOutput('');
    }
  };

  const handleCopy = async () => {
    if (!output || output === 'Valid XML ✓') return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleBeautify}
          data-analytics-event="xml_beautify"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          Beautify XML
        </button>
        <button
          type="button"
          onClick={handleMinify}
          data-analytics-event="xml_minify"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Minify XML
        </button>
        <button
          type="button"
          onClick={handleValidate}
          data-analytics-event="xml_validate"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Validate
        </button>
        <button
          type="button"
          onClick={() => {
            setInput(SAMPLE_XML);
            setError('');
          }}
          data-analytics-event="xml_sample"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Load sample
        </button>
        <button
          type="button"
          onClick={handleClear}
          data-analytics-event="xml_clear"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output || output === 'Valid XML ✓'}
          data-analytics-event="xml_copy"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition inline-flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Output'}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2 text-slate-700">
          Indent
          <select
            value={indent}
            onChange={(event) => setIndent(Number(event.target.value))}
            data-analytics-event="xml_indent"
            className="border border-slate-300 rounded-md px-2 py-1"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Input XML</label>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste XML here..."
            data-analytics-event="xml_input"
            className="w-full h-[380px] rounded-xl border border-slate-300 px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-slate-500">Characters: {input.length}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Formatted output</label>
          <textarea
            value={output}
            readOnly
            placeholder="Beautified or minified XML appears here..."
            className="w-full h-[380px] rounded-xl border border-slate-300 px-4 py-3 text-sm font-mono bg-slate-50"
          />
          <p className="text-xs text-slate-500">Characters: {output.length}</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        XML formatting and validation run locally in your browser. No XML is uploaded.
      </div>
    </div>
  );
}
