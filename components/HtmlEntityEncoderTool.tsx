'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

type Mode = 'encode' | 'decode';

const SAMPLE_PLAIN = `<div class="card" data-id='42'>& hello "world"</div>`;
const SAMPLE_ENCODED =
  '&lt;div class=&quot;card&quot; data-id=&#39;42&#39;&gt;&amp; hello &quot;world&quot;&lt;/div&gt;';

const ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00A0'
};

const encodeHtmlEntities = (input: string): string =>
  input.replace(/[&<>"']/g, (char) => ENTITY_MAP[char] ?? char);

const decodeHtmlEntities = (input: string): string =>
  input
    .replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (match, entity: string) => {
      if (entity[0] === '#') {
        const code =
          entity[1].toLowerCase() === 'x'
            ? parseInt(entity.slice(2), 16)
            : parseInt(entity.slice(1), 10);
        if (Number.isNaN(code)) return match;
        try {
          return String.fromCodePoint(code);
        } catch {
          return match;
        }
      }
      const named = NAMED_ENTITIES[entity.toLowerCase()];
      return named ?? match;
    });

export default function HtmlEntityEncoderTool() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState(SAMPLE_PLAIN);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    const result =
      mode === 'encode' ? encodeHtmlEntities(input) : decodeHtmlEntities(input);
    setOutput(result);
    setCopied(false);
  };

  const handleModeChange = (next: Mode) => {
    setMode(next);
    setInput(next === 'encode' ? SAMPLE_PLAIN : SAMPLE_ENCODED);
    setOutput('');
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
    setCopied(false);
  };

  const handleSwap = () => {
    if (!output) return;
    setInput(output);
    setOutput('');
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    setCopied(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-slate-300 overflow-hidden">
          <button
            type="button"
            onClick={() => handleModeChange('encode')}
            data-analytics-event="html_entity_encode_mode"
            className={`px-4 py-2 text-sm font-semibold transition ${
              mode === 'encode'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Encode
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('decode')}
            data-analytics-event="html_entity_decode_mode"
            className={`px-4 py-2 text-sm font-semibold transition ${
              mode === 'decode'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Decode
          </button>
        </div>
        <button
          type="button"
          onClick={handleConvert}
          data-analytics-event="html_entity_convert"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        <button
          type="button"
          onClick={handleSwap}
          disabled={!output}
          data-analytics-event="html_entity_swap"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Use output as input
        </button>
        <button
          type="button"
          onClick={handleClear}
          data-analytics-event="html_entity_clear"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output}
          data-analytics-event="html_entity_copy"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition inline-flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Output'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">
            {mode === 'encode' ? 'Plain text / HTML' : 'Encoded entities'}
          </label>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Paste text containing <, >, &, quotes...'
                : 'Paste HTML entities like &lt; &amp; &quot;...'
            }
            data-analytics-event="html_entity_input"
            className="w-full h-[320px] rounded-xl border border-slate-300 px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-slate-500">Characters: {input.length}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Output</label>
          <textarea
            value={output}
            readOnly
            placeholder={
              mode === 'encode'
                ? 'Encoded HTML entities appear here...'
                : 'Decoded text appears here...'
            }
            className="w-full h-[320px] rounded-xl border border-slate-300 px-4 py-3 text-sm font-mono bg-slate-50"
          />
          <p className="text-xs text-slate-500">Characters: {output.length}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Encoding and decoding run entirely in your browser. No content is uploaded.
      </div>
    </div>
  );
}
