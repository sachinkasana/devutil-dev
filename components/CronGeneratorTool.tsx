'use client';

import { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';

type FieldKey = 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek';

type CronFields = Record<FieldKey, string>;

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const PRESETS: Array<{ label: string; fields: CronFields }> = [
  {
    label: 'Every minute',
    fields: { minute: '*', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' }
  },
  {
    label: 'Hourly',
    fields: { minute: '0', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' }
  },
  {
    label: 'Daily',
    fields: { minute: '0', hour: '0', dayOfMonth: '*', month: '*', dayOfWeek: '*' }
  },
  {
    label: 'Weekly',
    fields: { minute: '0', hour: '0', dayOfMonth: '*', month: '*', dayOfWeek: '0' }
  },
  {
    label: 'Monthly',
    fields: { minute: '0', hour: '0', dayOfMonth: '1', month: '*', dayOfWeek: '*' }
  }
];

const FIELD_META: Array<{
  key: FieldKey;
  label: string;
  hint: string;
  options: Array<{ value: string; label: string }>;
}> = [
  {
    key: 'minute',
    label: 'Minute',
    hint: '0–59',
    options: [
      { value: '*', label: 'Every minute (*)' },
      { value: '*/5', label: 'Every 5 minutes' },
      { value: '*/15', label: 'Every 15 minutes' },
      { value: '0', label: '0' },
      { value: '15', label: '15' },
      { value: '30', label: '30' },
      { value: '45', label: '45' }
    ]
  },
  {
    key: 'hour',
    label: 'Hour',
    hint: '0–23',
    options: [
      { value: '*', label: 'Every hour (*)' },
      { value: '*/2', label: 'Every 2 hours' },
      { value: '0', label: 'Midnight (0)' },
      { value: '6', label: '6 AM' },
      { value: '9', label: '9 AM' },
      { value: '12', label: 'Noon (12)' },
      { value: '18', label: '6 PM' }
    ]
  },
  {
    key: 'dayOfMonth',
    label: 'Day of month',
    hint: '1–31',
    options: [
      { value: '*', label: 'Every day (*)' },
      { value: '1', label: '1st' },
      { value: '15', label: '15th' },
      { value: 'L', label: 'Last day (L)' }
    ]
  },
  {
    key: 'month',
    label: 'Month',
    hint: '1–12',
    options: [
      { value: '*', label: 'Every month (*)' },
      ...MONTH_NAMES.map((name, index) => ({
        value: String(index + 1),
        label: name
      }))
    ]
  },
  {
    key: 'dayOfWeek',
    label: 'Day of week',
    hint: '0–6 (Sun–Sat)',
    options: [
      { value: '*', label: 'Every day (*)' },
      ...DAY_NAMES.map((name, index) => ({
        value: String(index),
        label: name
      })),
      { value: '1-5', label: 'Weekdays (1–5)' }
    ]
  }
];

const isValidPart = (value: string, min: number, max: number, allowL = false): boolean => {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed === '*') return true;
  if (allowL && trimmed.toUpperCase() === 'L') return true;

  if (trimmed.includes(',')) {
    return trimmed.split(',').every((part) => isValidPart(part.trim(), min, max, allowL));
  }

  if (trimmed.includes('/')) {
    const [range, step] = trimmed.split('/');
    const stepNum = Number(step);
    if (!Number.isInteger(stepNum) || stepNum <= 0) return false;
    if (range === '*') return true;
    return isValidPart(range, min, max, allowL);
  }

  if (trimmed.includes('-')) {
    const [start, end] = trimmed.split('-');
    const startNum = Number(start);
    const endNum = Number(end);
    return (
      Number.isInteger(startNum) &&
      Number.isInteger(endNum) &&
      startNum >= min &&
      endNum <= max &&
      startNum <= endNum
    );
  }

  const num = Number(trimmed);
  return Number.isInteger(num) && num >= min && num <= max;
};

const validateCronFields = (fields: CronFields): string | null => {
  if (!isValidPart(fields.minute, 0, 59)) return 'Invalid minute field (0–59).';
  if (!isValidPart(fields.hour, 0, 23)) return 'Invalid hour field (0–23).';
  if (!isValidPart(fields.dayOfMonth, 1, 31, true)) return 'Invalid day-of-month field (1–31).';
  if (!isValidPart(fields.month, 1, 12)) return 'Invalid month field (1–12).';
  if (!isValidPart(fields.dayOfWeek, 0, 6)) return 'Invalid day-of-week field (0–6).';
  return null;
};

const describeList = (items: string[]): string => {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
};

const expandPart = (
  value: string,
  min: number,
  max: number,
  labels?: string[]
): string => {
  const trimmed = value.trim();
  if (trimmed === '*') return 'every';

  if (trimmed.includes(',')) {
    const parts = trimmed.split(',').map((part) => expandPart(part.trim(), min, max, labels));
    return describeList(parts);
  }

  if (trimmed.includes('/')) {
    const [range, step] = trimmed.split('/');
    const stepLabel = step === '1' ? '' : step;
    if (range === '*') {
      return stepLabel ? `every ${stepLabel}` : 'every';
    }
    return `every ${step} starting from ${expandPart(range, min, max, labels)}`;
  }

  if (trimmed.includes('-')) {
    const [start, end] = trimmed.split('-').map(Number);
    if (labels === DAY_NAMES) {
      return `${DAY_NAMES[start] ?? start} through ${DAY_NAMES[end] ?? end}`;
    }
    if (labels === MONTH_NAMES) {
      return `${MONTH_NAMES[start - 1] ?? start} through ${MONTH_NAMES[end - 1] ?? end}`;
    }
    return `${start} through ${end}`;
  }

  if (trimmed.toUpperCase() === 'L') return 'the last day';

  const num = Number(trimmed);
  if (labels === DAY_NAMES) return DAY_NAMES[num] ?? trimmed;
  if (labels === MONTH_NAMES) return MONTH_NAMES[num - 1] ?? trimmed;
  return trimmed;
};

const explainCron = (fields: CronFields): string => {
  const minute = fields.minute.trim();
  const hour = fields.hour.trim();
  const dayOfMonth = fields.dayOfMonth.trim();
  const month = fields.month.trim();
  const dayOfWeek = fields.dayOfWeek.trim();

  if (
    minute === '*' &&
    hour === '*' &&
    dayOfMonth === '*' &&
    month === '*' &&
    dayOfWeek === '*'
  ) {
    return 'Runs every minute.';
  }

  let timePart = '';
  if (minute === '0' && hour === '*') {
    timePart = 'at minute 0 of every hour';
  } else if (minute === '*' && hour === '*') {
    timePart = 'every minute of every hour';
  } else if (minute.startsWith('*/') && hour === '*') {
    timePart = `every ${minute.slice(2)} minutes`;
  } else if (hour === '*') {
    timePart = `at minute ${expandPart(minute, 0, 59)} of every hour`;
  } else if (minute === '0') {
    timePart = `at ${expandPart(hour, 0, 23)}:00`;
  } else if (minute === '*') {
    timePart = `every minute during hour ${expandPart(hour, 0, 23)}`;
  } else {
    timePart = `at ${expandPart(hour, 0, 23)}:${minute.padStart(2, '0')}`;
  }

  const dateParts: string[] = [];

  if (dayOfMonth !== '*') {
    dateParts.push(`on day ${expandPart(dayOfMonth, 1, 31)} of the month`);
  }

  if (month !== '*') {
    dateParts.push(`in ${expandPart(month, 1, 12, MONTH_NAMES)}`);
  }

  if (dayOfWeek !== '*') {
    dateParts.push(`on ${expandPart(dayOfWeek, 0, 6, DAY_NAMES)}`);
  }

  if (dateParts.length === 0) {
    return `Runs ${timePart}.`;
  }

  return `Runs ${timePart} ${dateParts.join(' ')}.`;
};

const parseCronString = (value: string): CronFields | null => {
  const parts = value.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4]
  };
};

export default function CronGeneratorTool() {
  const [fields, setFields] = useState<CronFields>({
    minute: '0',
    hour: '*',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*'
  });
  const [pasteValue, setPasteValue] = useState('');
  const [pasteError, setPasteError] = useState('');
  const [copied, setCopied] = useState(false);

  const expression = `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
  const validationError = useMemo(() => validateCronFields(fields), [fields]);
  const explanation = useMemo(
    () => (validationError ? '' : explainCron(fields)),
    [fields, validationError]
  );

  const updateField = (key: FieldKey, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setCopied(false);
  };

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setFields(preset.fields);
    setPasteError('');
    setCopied(false);
  };

  const handlePasteExplain = () => {
    const parsed = parseCronString(pasteValue);
    if (!parsed) {
      setPasteError('Enter a standard 5-field cron expression (minute hour day month weekday).');
      return;
    }
    const error = validateCronFields(parsed);
    if (error) {
      setPasteError(error);
      return;
    }
    setFields(parsed);
    setPasteError('');
    setCopied(false);
  };

  const handleCopy = async () => {
    if (validationError) return;
    await navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => applyPreset(preset)}
            data-analytics-event="cron_preset"
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:border-slate-400 transition"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {FIELD_META.map((field) => (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">
              {field.label}
              <span className="ml-1 font-normal text-slate-500">({field.hint})</span>
            </label>
            <select
              value={
                field.options.some((option) => option.value === fields[field.key])
                  ? fields[field.key]
                  : '__custom__'
              }
              onChange={(event) => {
                if (event.target.value !== '__custom__') {
                  updateField(field.key, event.target.value);
                }
              }}
              data-analytics-event={`cron_${field.key}`}
              className="w-full border border-slate-300 rounded-md px-2 py-2 text-sm"
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              {!field.options.some((option) => option.value === fields[field.key]) && (
                <option value="__custom__">Custom: {fields[field.key]}</option>
              )}
            </select>
            <input
              type="text"
              value={fields[field.key]}
              onChange={(event) => updateField(field.key, event.target.value)}
              data-analytics-event={`cron_${field.key}_custom`}
              className="w-full border border-slate-300 rounded-md px-2 py-2 text-sm font-mono"
              placeholder="* or custom"
            />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Cron expression
            </p>
            <p className="mt-1 font-mono text-lg text-slate-900">{expression}</p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            disabled={Boolean(validationError)}
            data-analytics-event="cron_copy"
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition inline-flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        {validationError ? (
          <p className="text-sm text-red-700">{validationError}</p>
        ) : (
          <p className="text-sm text-slate-700">{explanation}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-900">
          Paste a cron expression to explain
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={pasteValue}
            onChange={(event) => setPasteValue(event.target.value)}
            placeholder="e.g. 0 9 * * 1-5"
            data-analytics-event="cron_paste_input"
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handlePasteExplain}
            data-analytics-event="cron_paste_explain"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
          >
            Explain
          </button>
        </div>
        {pasteError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {pasteError}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Uses the standard 5-field cron format (minute hour day-of-month month day-of-week). No
        seconds field. All processing stays in your browser.
      </div>
    </div>
  );
}
