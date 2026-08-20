'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, AlertTriangle } from 'lucide-react';

type EnvEntry = {
  line: number;
  key: string;
  value: string;
  raw: string;
  exportPrefixed: boolean;
};

type EnvIssue = {
  line: number;
  severity: 'error' | 'warning';
  message: string;
};

const SAMPLE = `# App config
NODE_ENV=development
PORT=3000
DATABASE_URL="postgres://user:pass@localhost:5432/app"
API_KEY=dev-secret-key
FEATURE_FLAG=true
# Duplicate key example below (will warn)
PORT=3001
`;

function parseEnv(text: string): { entries: EnvEntry[]; issues: EnvIssue[] } {
  const entries: EnvEntry[] = [];
  const issues: EnvIssue[] = [];
  const lines = text.split(/\r?\n/);
  const seen = new Map<string, number>();

  lines.forEach((rawLine, idx) => {
    const line = idx + 1;
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    let working = trimmed;
    let exportPrefixed = false;
    if (working.startsWith('export ')) {
      exportPrefixed = true;
      working = working.slice(7).trim();
    }

    const eq = working.indexOf('=');
    if (eq === -1) {
      issues.push({ line, severity: 'error', message: 'Missing "=" — expected KEY=VALUE.' });
      return;
    }

    const key = working.slice(0, eq).trim();
    let value = working.slice(eq + 1);

    if (!key) {
      issues.push({ line, severity: 'error', message: 'Empty key name.' });
      return;
    }
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
      issues.push({
        line,
        severity: 'error',
        message: `Invalid key "${key}". Use letters, numbers, underscore; must not start with a number.`
      });
    }

    if (
      (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
      (value.startsWith("'") && value.endsWith("'") && value.length >= 2)
    ) {
      value = value.slice(1, -1);
    } else if (value.includes(' #')) {
      // unquoted inline comment
      value = value.split(' #')[0].trimEnd();
    }

    if (value === '') {
      issues.push({ line, severity: 'warning', message: `Key "${key}" has an empty value.` });
    }

    if (seen.has(key)) {
      issues.push({
        line,
        severity: 'warning',
        message: `Duplicate key "${key}" (also on line ${seen.get(key)}). Later value wins in most loaders.`
      });
    } else {
      seen.set(key, line);
    }

    entries.push({ line, key, value, raw: rawLine, exportPrefixed });
  });

  return { entries, issues };
}

export default function EnvFileValidatorTool() {
  const [input, setInput] = useState(SAMPLE);
  const [copied, setCopied] = useState('');

  const { entries, issues } = useMemo(() => parseEnv(input), [input]);

  const asObject = useMemo(() => {
    const obj: Record<string, string> = {};
    entries.forEach((e) => {
      obj[e.key] = e.value;
    });
    return obj;
  }, [entries]);

  const jsonOut = useMemo(() => JSON.stringify(asObject, null, 2), [asObject]);

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const errors = issues.filter((i) => i.severity === 'error').length;
  const warnings = issues.filter((i) => i.severity === 'warning').length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setInput(SAMPLE)}
          data-analytics-event="env_sample"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
        >
          Load sample
        </button>
        <button
          type="button"
          onClick={() => setInput('')}
          data-analytics-event="env_clear"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => copy(jsonOut, 'json')}
          data-analytics-event="env_copy"
          data-analytics-label="json"
          disabled={!entries.length}
          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {copied === 'json' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          Copy as JSON
        </button>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">.env contents</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={12}
          data-analytics-event="env_input"
          spellCheck={false}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm"
          placeholder={'NODE_ENV=production\nAPI_KEY="..."'}
        />
      </label>

      <div className="flex flex-wrap gap-3 text-sm">
        <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
          {entries.length} keys
        </span>
        <span className="rounded-full bg-red-50 px-3 py-1 font-medium text-red-700">
          {errors} errors
        </span>
        <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-800">
          {warnings} warnings
        </span>
      </div>

      {issues.length > 0 ? (
        <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="flex items-center gap-2 font-semibold text-slate-900">
            <AlertTriangle className="h-4 w-4 text-amber-600" /> Issues
          </h3>
          <ul className="space-y-1 text-sm">
            {issues.map((issue, i) => (
              <li
                key={`${issue.line}-${i}`}
                className={issue.severity === 'error' ? 'text-red-700' : 'text-amber-800'}
              >
                Line {issue.line}: {issue.message}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          No issues found.
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-2 text-sm font-semibold">
            Parsed keys
          </div>
          <div className="max-h-80 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-white text-slate-500">
                <tr>
                  <th className="px-3 py-2 font-medium">Line</th>
                  <th className="px-3 py-2 font-medium">Key</th>
                  <th className="px-3 py-2 font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={`${e.line}-${e.key}`} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-mono text-xs text-slate-500">{e.line}</td>
                    <td className="px-3 py-2 font-mono font-semibold">{e.key}</td>
                    <td className="px-3 py-2 font-mono text-slate-700 break-all">{e.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2">
            <span className="text-sm font-semibold">JSON export</span>
            <button
              type="button"
              onClick={() => copy(jsonOut, 'json2')}
              data-analytics-event="env_copy"
              data-analytics-label="json_panel"
              className="inline-flex items-center gap-1 text-sm text-blue-600"
            >
              {copied === 'json2' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              Copy
            </button>
          </div>
          <pre className="max-h-80 overflow-auto p-4 font-mono text-xs text-slate-800">{jsonOut}</pre>
        </div>
      </div>
    </div>
  );
}
