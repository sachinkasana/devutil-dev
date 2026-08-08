'use client';

import { useState } from 'react';
import { Check, Copy, ArrowLeftRight } from 'lucide-react';
import { Parser as Json2CsvParser } from 'json2csv';

type Direction = 'json-to-csv' | 'csv-to-json';

const SAMPLE_JSON = `[
  { "name": "Ada", "role": "Engineer", "active": true },
  { "name": "Grace", "role": "Architect", "active": true },
  { "name": "Alan", "role": "Researcher", "active": false }
]`;

const SAMPLE_CSV = `name,role,active
Ada,Engineer,true
Grace,Architect,true
Alan,Researcher,false`;

/**
 * Parse a single CSV line, respecting double-quoted fields and "" escapes.
 */
const parseCsvLine = (line: string): string[] => {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const ch = line[i];

    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      current += ch;
      i += 1;
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }

    if (ch === ',') {
      fields.push(current);
      current = '';
      i += 1;
      continue;
    }

    current += ch;
    i += 1;
  }

  fields.push(current);
  return fields;
};

/** Coerce common CSV cell strings into JSON-friendly primitives. */
const coerceValue = (value: string): string | number | boolean | null => {
  const trimmed = value.trim();
  if (trimmed === '') return '';
  if (/^null$/i.test(trimmed)) return null;
  if (/^true$/i.test(trimmed)) return true;
  if (/^false$/i.test(trimmed)) return false;
  if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(trimmed)) {
    const n = Number(trimmed);
    if (!Number.isNaN(n)) return n;
  }
  return value;
};

/**
 * Convert CSV text (with header row) into an array of objects.
 * Handles quoted fields and commas inside quotes.
 */
const csvToJson = (csv: string): Record<string, unknown>[] => {
  const normalized = csv.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalized.split('\n').filter((line, index, arr) => {
    // Keep blank lines only if they're not trailing
    if (line.trim() !== '') return true;
    return index < arr.length - 1 && arr.slice(index + 1).some((l) => l.trim() !== '');
  });

  if (lines.length === 0) {
    throw new Error('CSV is empty.');
  }

  const headers = parseCsvLine(lines[0]).map((h) => h.trim());
  if (headers.length === 0 || headers.every((h) => !h)) {
    throw new Error('CSV header row is missing or empty.');
  }

  if (lines.length < 2) {
    throw new Error('CSV has a header but no data rows.');
  }

  const rows: Record<string, unknown>[] = [];

  for (let r = 1; r < lines.length; r += 1) {
    const line = lines[r];
    if (line.trim() === '') continue;

    const cells = parseCsvLine(line);
    const obj: Record<string, unknown> = {};
    headers.forEach((header, index) => {
      const key = header || `column_${index + 1}`;
      obj[key] = coerceValue(cells[index] ?? '');
    });
    rows.push(obj);
  }

  if (rows.length === 0) {
    throw new Error('CSV has no data rows.');
  }

  return rows;
};

export default function JsonCsvConverterTool() {
  const [direction, setDirection] = useState<Direction>('json-to-csv');
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const inputLabel = direction === 'json-to-csv' ? 'JSON input' : 'CSV input';
  const outputLabel = direction === 'json-to-csv' ? 'CSV output' : 'JSON output';

  const handleConvert = () => {
    try {
      if (!input.trim()) {
        setError('Please enter some input to convert.');
        setOutput('');
        return;
      }

      if (direction === 'json-to-csv') {
        const parsed = JSON.parse(input);
        if (!Array.isArray(parsed)) {
          setError('JSON must be an array of objects.');
          setOutput('');
          return;
        }
        if (parsed.length === 0) {
          setError('JSON array is empty. Add at least one object.');
          setOutput('');
          return;
        }
        if (!parsed.every((row) => row !== null && typeof row === 'object' && !Array.isArray(row))) {
          setError('Every array item must be a plain object.');
          setOutput('');
          return;
        }

        const parser = new Json2CsvParser({ header: true });
        const csv = parser.parse(parsed);
        setOutput(csv);
      } else {
        const rows = csvToJson(input);
        setOutput(JSON.stringify(rows, null, 2));
      }

      setError('');
      setCopied(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to convert input.';
      setError(
        direction === 'json-to-csv' ? `Invalid JSON: ${message}` : `Invalid CSV: ${message}`
      );
      setOutput('');
    }
  };

  const handleSwap = () => {
    const nextDirection: Direction =
      direction === 'json-to-csv' ? 'csv-to-json' : 'json-to-csv';
    setDirection(nextDirection);
    setInput(output || (nextDirection === 'json-to-csv' ? SAMPLE_JSON : SAMPLE_CSV));
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
    setInput(direction === 'json-to-csv' ? SAMPLE_JSON : SAMPLE_CSV);
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
          data-analytics-event="json_csv_convert"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          Convert
        </button>
        <button
          type="button"
          onClick={handleSwap}
          data-analytics-event="json_csv_swap"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition inline-flex items-center gap-2"
        >
          <ArrowLeftRight className="w-4 h-4" />
          Swap direction
        </button>
        <button
          type="button"
          onClick={handleSample}
          data-analytics-event="json_csv_sample"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Load sample
        </button>
        <button
          type="button"
          onClick={handleClear}
          data-analytics-event="json_csv_clear"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output}
          data-analytics-event="json_csv_copy"
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
              setInput(next === 'json-to-csv' ? SAMPLE_JSON : SAMPLE_CSV);
              setOutput('');
              setError('');
              setCopied(false);
            }}
            data-analytics-event="json_csv_direction"
            className="border border-slate-300 rounded-md px-2 py-1"
          >
            <option value="json-to-csv">JSON → CSV</option>
            <option value="csv-to-json">CSV → JSON</option>
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
              direction === 'json-to-csv'
                ? 'Paste a JSON array of objects...'
                : 'Paste CSV with a header row...'
            }
            data-analytics-event="json_csv_input"
            className="w-full h-[380px] rounded-xl border border-slate-300 px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            spellCheck={false}
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
