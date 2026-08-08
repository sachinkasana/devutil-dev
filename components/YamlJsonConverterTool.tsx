'use client';

import { useState } from 'react';
import { Check, Copy, ArrowLeftRight } from 'lucide-react';
import YAML from 'yaml';

type Direction = 'yaml-to-json' | 'json-to-yaml';

const SAMPLE_YAML = `name: DevUtil
version: 1.0.0
features:
  - format
  - convert
  - validate
metadata:
  active: true
  tags:
    - yaml
    - json`;

const SAMPLE_JSON = `{
  "name": "DevUtil",
  "version": "1.0.0",
  "features": ["format", "convert", "validate"],
  "metadata": {
    "active": true,
    "tags": ["yaml", "json"]
  }
}`;

export default function YamlJsonConverterTool() {
  const [direction, setDirection] = useState<Direction>('yaml-to-json');
  const [input, setInput] = useState(SAMPLE_YAML);
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const inputLabel = direction === 'yaml-to-json' ? 'YAML input' : 'JSON input';
  const outputLabel = direction === 'yaml-to-json' ? 'JSON output' : 'YAML output';

  const handleConvert = () => {
    try {
      if (!input.trim()) {
        setError('Please enter some input to convert.');
        setOutput('');
        return;
      }

      if (direction === 'yaml-to-json') {
        const parsed = YAML.parse(input);
        setOutput(JSON.stringify(parsed, null, indent));
      } else {
        const parsed = JSON.parse(input);
        setOutput(YAML.stringify(parsed, { indent, lineWidth: 0 }));
      }
      setError('');
      setCopied(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to convert input.';
      setError(
        direction === 'yaml-to-json'
          ? `Invalid YAML: ${message}`
          : `Invalid JSON: ${message}`
      );
      setOutput('');
    }
  };

  const handleSwap = () => {
    const nextDirection: Direction =
      direction === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json';
    setDirection(nextDirection);
    setInput(output || (nextDirection === 'yaml-to-json' ? SAMPLE_YAML : SAMPLE_JSON));
    setOutput('');
    setError('');
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!output) return;
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

  const handleSample = () => {
    setInput(direction === 'yaml-to-json' ? SAMPLE_YAML : SAMPLE_JSON);
    setOutput('');
    setError('');
    setCopied(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleConvert}
          data-analytics-event="yaml_json_convert"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          Convert
        </button>
        <button
          type="button"
          onClick={handleSwap}
          data-analytics-event="yaml_json_swap"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition inline-flex items-center gap-2"
        >
          <ArrowLeftRight className="w-4 h-4" />
          Swap direction
        </button>
        <button
          type="button"
          onClick={handleSample}
          data-analytics-event="yaml_json_sample"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Load sample
        </button>
        <button
          type="button"
          onClick={handleClear}
          data-analytics-event="yaml_json_clear"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output}
          data-analytics-event="yaml_json_copy"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition inline-flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Output'}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2 text-slate-700">
          Direction
          <select
            value={direction}
            onChange={(event) => {
              const next = event.target.value as Direction;
              setDirection(next);
              setInput(next === 'yaml-to-json' ? SAMPLE_YAML : SAMPLE_JSON);
              setOutput('');
              setError('');
              setCopied(false);
            }}
            data-analytics-event="yaml_json_direction"
            className="border border-slate-300 rounded-md px-2 py-1"
          >
            <option value="yaml-to-json">YAML → JSON</option>
            <option value="json-to-yaml">JSON → YAML</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-slate-700">
          Indent
          <select
            value={indent}
            onChange={(event) => setIndent(Number(event.target.value))}
            data-analytics-event="yaml_json_indent"
            className="border border-slate-300 rounded-md px-2 py-1"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">{inputLabel}</label>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={
              direction === 'yaml-to-json'
                ? 'Paste YAML here...'
                : 'Paste JSON here...'
            }
            data-analytics-event="yaml_json_input"
            className="w-full h-[380px] rounded-xl border border-slate-300 px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-slate-500">Characters: {input.length}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">{outputLabel}</label>
          <textarea
            value={output}
            readOnly
            placeholder="Converted output appears here..."
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
        Conversion runs locally in your browser. Nothing is uploaded.
      </div>
    </div>
  );
}
