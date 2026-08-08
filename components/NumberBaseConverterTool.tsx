'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

type BaseKey = 'binary' | 'octal' | 'decimal' | 'hex';

type Values = Record<BaseKey, string>;
type Errors = Partial<Record<BaseKey, string>>;

const BASES: { key: BaseKey; label: string; radix: number; placeholder: string }[] = [
  { key: 'binary', label: 'Binary (base 2)', radix: 2, placeholder: 'e.g. 1010' },
  { key: 'octal', label: 'Octal (base 8)', radix: 8, placeholder: 'e.g. 12' },
  { key: 'decimal', label: 'Decimal (base 10)', radix: 10, placeholder: 'e.g. 10' },
  { key: 'hex', label: 'Hexadecimal (base 16)', radix: 16, placeholder: 'e.g. A or 0xA' }
];

const EMPTY: Values = { binary: '', octal: '', decimal: '', hex: '' };

const SAMPLE: Values = {
  binary: '1010',
  octal: '12',
  decimal: '10',
  hex: 'A'
};

const DIGITS: Record<number, RegExp> = {
  2: /^[01]+$/i,
  8: /^[0-7]+$/i,
  10: /^[0-9]+$/i,
  16: /^[0-9a-f]+$/i
};

/** Strip optional 0b / 0o / 0x prefixes and whitespace. */
const normalizeInput = (raw: string, radix: number): string => {
  let value = raw.trim().replace(/\s+/g, '');
  if (radix === 16) {
    value = value.replace(/^0x/i, '');
  } else if (radix === 2) {
    value = value.replace(/^0b/i, '');
  } else if (radix === 8) {
    value = value.replace(/^0o/i, '');
  }
  return value;
};

const toValues = (n: bigint): Values => ({
  binary: n.toString(2),
  octal: n.toString(8),
  decimal: n.toString(10),
  hex: n.toString(16).toUpperCase()
});

export default function NumberBaseConverterTool() {
  const [values, setValues] = useState<Values>(SAMPLE);
  const [errors, setErrors] = useState<Errors>({});
  const [copied, setCopied] = useState<BaseKey | null>(null);

  const handleChange = (key: BaseKey, raw: string) => {
    const meta = BASES.find((b) => b.key === key)!;
    const next = { ...values, [key]: raw };

    if (!raw.trim()) {
      setValues({ ...EMPTY, [key]: raw });
      setErrors({});
      return;
    }

    const normalized = normalizeInput(raw, meta.radix);

    if (!normalized) {
      setValues(next);
      setErrors({ [key]: 'Enter a value after the prefix.' });
      return;
    }

    if (!DIGITS[meta.radix].test(normalized)) {
      setValues(next);
      setErrors({
        [key]: `Invalid ${meta.label.split(' ')[0].toLowerCase()} digits.`
      });
      return;
    }

    try {
      let big: bigint;
      if (meta.radix === 10) {
        big = BigInt(normalized);
      } else if (meta.radix === 16) {
        big = BigInt(`0x${normalized}`);
      } else if (meta.radix === 8) {
        big = BigInt(`0o${normalized}`);
      } else {
        big = BigInt(`0b${normalized}`);
      }

      if (big < BigInt(0)) {
        setValues(next);
        setErrors({ [key]: 'Negative numbers are not supported.' });
        return;
      }

      const converted = toValues(big);
      setValues({ ...converted, [key]: raw });
      setErrors({});
    } catch {
      setValues(next);
      setErrors({ [key]: 'Unable to parse this value.' });
    }
  };

  const handleCopy = async (key: BaseKey) => {
    const text = values[key];
    if (!text) return;
    const meta = BASES.find((b) => b.key === key)!;
    const toCopy = normalizeInput(text, meta.radix) || text;
    await navigator.clipboard.writeText(
      key === 'hex' ? toCopy.toUpperCase() : toCopy
    );
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClear = () => {
    setValues(EMPTY);
    setErrors({});
    setCopied(null);
  };

  const handleSample = () => {
    setValues(SAMPLE);
    setErrors({});
    setCopied(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSample}
          data-analytics-event="number_base_sample"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Load sample
        </button>
        <button
          type="button"
          onClick={handleClear}
          data-analytics-event="number_base_clear"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BASES.map(({ key, label, placeholder }) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-semibold text-slate-900" htmlFor={`base-${key}`}>
              {label}
            </label>
            <div className="flex gap-2">
              <input
                id={`base-${key}`}
                type="text"
                value={values[key]}
                onChange={(event) => handleChange(key, event.target.value)}
                placeholder={placeholder}
                spellCheck={false}
                data-analytics-event={`number_base_input_${key}`}
                className={`w-full rounded-xl border px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors[key]
                    ? 'border-red-300 bg-red-50'
                    : 'border-slate-300'
                }`}
              />
              <button
                type="button"
                onClick={() => handleCopy(key)}
                disabled={!values[key] || Boolean(errors[key])}
                data-analytics-event={`number_base_copy_${key}`}
                className="shrink-0 px-3 py-2 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition inline-flex items-center gap-1.5"
                aria-label={`Copy ${label}`}
              >
                {copied === key ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === key ? 'Copied' : 'Copy'}
              </button>
            </div>
            {errors[key] && (
              <p className="text-xs text-red-600">{errors[key]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Conversion runs locally in your browser. Hex values may include an optional{' '}
        <code className="rounded bg-slate-200 px-1">0x</code> prefix.
      </div>
    </div>
  );
}
