'use client';

import { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';

type CaseFormat =
  | 'camelCase'
  | 'PascalCase'
  | 'snake_case'
  | 'kebab-case'
  | 'CONSTANT_CASE'
  | 'Title Case'
  | 'Sentence case'
  | 'lower case'
  | 'UPPER CASE';

const FORMATS: CaseFormat[] = [
  'camelCase',
  'PascalCase',
  'snake_case',
  'kebab-case',
  'CONSTANT_CASE',
  'Title Case',
  'Sentence case',
  'lower case',
  'UPPER CASE'
];

const SAMPLE =
  'hello world! convert_this-Text into manyCases for developers.';

/** Split text into word tokens, respecting camelCase / PascalCase boundaries. */
const tokenize = (input: string): string[] => {
  if (!input.trim()) return [];

  const withBoundaries = input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[_\-.]+/g, ' ')
    .replace(/[^a-zA-Z0-9\s]+/g, ' ')
    .trim();

  return withBoundaries
    .split(/\s+/)
    .map((word) => word.toLowerCase())
    .filter(Boolean);
};

const toCamelCase = (words: string[]) =>
  words
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');

const toPascalCase = (words: string[]) =>
  words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');

const toTitleCase = (words: string[]) =>
  words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const toSentenceCase = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const lower = trimmed.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

const convertCase = (input: string, format: CaseFormat): string => {
  if (!input.trim()) return '';

  switch (format) {
    case 'lower case':
      return input.toLowerCase();
    case 'UPPER CASE':
      return input.toUpperCase();
    case 'Sentence case':
      return toSentenceCase(input);
    default:
      break;
  }

  const words = tokenize(input);
  if (words.length === 0) return '';

  switch (format) {
    case 'camelCase':
      return toCamelCase(words);
    case 'PascalCase':
      return toPascalCase(words);
    case 'snake_case':
      return words.join('_');
    case 'kebab-case':
      return words.join('-');
    case 'CONSTANT_CASE':
      return words.join('_').toUpperCase();
    case 'Title Case':
      return toTitleCase(words);
    default:
      return input;
  }
};

export default function CaseConverterTool() {
  const [input, setInput] = useState(SAMPLE);
  const [copiedFormat, setCopiedFormat] = useState<CaseFormat | null>(null);

  const results = useMemo(() => {
    const map = {} as Record<CaseFormat, string>;
    for (const format of FORMATS) {
      map[format] = convertCase(input, format);
    }
    return map;
  }, [input]);

  const handleCopy = async (format: CaseFormat) => {
    const value = results[format];
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleClear = () => {
    setInput('');
    setCopiedFormat(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setInput(SAMPLE)}
          data-analytics-event="case_sample"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Load sample
        </button>
        <button
          type="button"
          onClick={handleClear}
          data-analytics-event="case_clear"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Clear
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-900">Input text</label>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type or paste text to convert..."
          data-analytics-event="case_input"
          className="w-full h-32 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-xs text-slate-500">Characters: {input.length}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {FORMATS.map((format) => (
          <div
            key={format}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {format}
              </p>
              <button
                type="button"
                onClick={() => handleCopy(format)}
                disabled={!results[format]}
                data-analytics-event="case_copy"
                className="px-2.5 py-1 rounded-md border border-slate-300 text-slate-700 text-xs font-semibold hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition inline-flex items-center gap-1.5"
              >
                {copiedFormat === format ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copiedFormat === format ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="font-mono text-sm text-slate-900 break-all min-h-[1.25rem]">
              {results[format] || '—'}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Case conversion runs instantly in your browser. Your text never leaves this device.
      </div>
    </div>
  );
}
