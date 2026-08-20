'use client';

import { useMemo, useState } from 'react';

/** Minimal semver parse: major.minor.patch[-prerelease][+build] */
type Parsed = {
  major: number;
  minor: number;
  patch: number;
  prerelease: string[];
  raw: string;
};

function parseVersion(input: string): Parsed | null {
  const raw = input.trim().replace(/^v/i, '');
  const match = raw.match(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/
  );
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ? match[4].split('.') : [],
    raw
  };
}

function cmpIdent(a: string, b: string): number {
  const an = /^\d+$/.test(a);
  const bn = /^\d+$/.test(b);
  if (an && bn) return Number(a) - Number(b);
  if (an) return -1;
  if (bn) return 1;
  return a < b ? -1 : a > b ? 1 : 0;
}

function compare(a: Parsed, b: Parsed): number {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  if (a.patch !== b.patch) return a.patch - b.patch;
  if (!a.prerelease.length && b.prerelease.length) return 1;
  if (a.prerelease.length && !b.prerelease.length) return -1;
  const len = Math.max(a.prerelease.length, b.prerelease.length);
  for (let i = 0; i < len; i += 1) {
    if (a.prerelease[i] === undefined) return -1;
    if (b.prerelease[i] === undefined) return 1;
    const c = cmpIdent(a.prerelease[i], b.prerelease[i]);
    if (c !== 0) return c;
  }
  return 0;
}

function stripBuild(v: string) {
  return v.split('+')[0];
}

/** Expand simple caret / tilde / comparator ranges into test functions */
function satisfies(versionStr: string, rangeStr: string): { ok: boolean; detail: string } {
  const version = parseVersion(stripBuild(versionStr));
  if (!version) return { ok: false, detail: 'Version is not valid semver (need X.Y.Z).' };

  const range = rangeStr.trim();
  if (!range || range === '*' || range === 'x' || range === 'X') {
    return { ok: true, detail: 'Any version (*) matches.' };
  }

  // Split on || for OR groups
  const groups = range.split(/\s*\|\|\s*/).map((g) => g.trim()).filter(Boolean);
  for (const group of groups) {
    const result = satisfiesAnd(version, group);
    if (result.ok) return { ok: true, detail: result.detail };
  }
  return { ok: false, detail: `Does not satisfy range "${range}".` };
}

function satisfiesAnd(version: Parsed, group: string): { ok: boolean; detail: string } {
  // hyphen range: 1.2.3 - 2.3.4
  const hyphen = group.match(
    /^((?:v)?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)\s+-\s+((?:v)?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)$/i
  );
  if (hyphen) {
    const lo = parseVersion(stripBuild(hyphen[1]));
    const hi = parseVersion(stripBuild(hyphen[2]));
    if (!lo || !hi) return { ok: false, detail: 'Invalid hyphen range.' };
    const ok = compare(version, lo) >= 0 && compare(version, hi) <= 0;
    return {
      ok,
      detail: ok
        ? `Within inclusive range ${lo.raw} – ${hi.raw}.`
        : `Outside inclusive range ${lo.raw} – ${hi.raw}.`
    };
  }

  const parts = group.split(/\s+/).filter(Boolean);
  const failures: string[] = [];
  for (const part of parts) {
    const check = checkComparator(version, part);
    if (!check.ok) failures.push(check.detail);
  }
  if (failures.length) return { ok: false, detail: failures.join(' ') };
  return { ok: true, detail: `Satisfies "${group}".` };
}

function checkComparator(version: Parsed, token: string): { ok: boolean; detail: string } {
  let t = token.trim();
  if (!t) return { ok: true, detail: '' };

  if (t.startsWith('^')) {
    const base = parseVersion(normalizePartial(t.slice(1)));
    if (!base) return { ok: false, detail: `Invalid caret base in ${token}.` };
    const upper = caretUpper(base);
    const ok = compare(version, base) >= 0 && compare(version, upper) < 0;
    return {
      ok,
      detail: ok
        ? `Matches caret ^${base.raw} (≥ ${base.raw} < ${formatVer(upper)}).`
        : `Fails caret ^${base.raw}.`
    };
  }

  if (t.startsWith('~')) {
    const base = parseVersion(normalizePartial(t.slice(1)));
    if (!base) return { ok: false, detail: `Invalid tilde base in ${token}.` };
    const upper = { ...base, minor: base.minor + 1, patch: 0, prerelease: [] as string[] };
    const ok = compare(version, base) >= 0 && compare(version, upper) < 0;
    return {
      ok,
      detail: ok
        ? `Matches tilde ~${base.raw} (≥ ${base.raw} < ${formatVer(upper)}).`
        : `Fails tilde ~${base.raw}.`
    };
  }

  const m = t.match(/^(>=|<=|>|<|=)?\s*(v?\d+(?:\.\d+)?(?:\.\d+)?(?:-[0-9A-Za-z.-]+)?)$/i);
  if (!m) return { ok: false, detail: `Unsupported comparator "${token}".` };
  const op = m[1] || '=';
  const base = parseVersion(normalizePartial(m[2]));
  if (!base) return { ok: false, detail: `Invalid version in ${token}.` };
  const c = compare(version, base);
  const ok =
    (op === '=' && c === 0) ||
    (op === '>' && c > 0) ||
    (op === '>=' && c >= 0) ||
    (op === '<' && c < 0) ||
    (op === '<=' && c <= 0);
  return { ok, detail: ok ? `Passes ${op}${base.raw}.` : `Fails ${op}${base.raw}.` };
}

function normalizePartial(input: string): string {
  const raw = input.trim().replace(/^v/i, '');
  const parts = raw.split('-');
  const core = parts[0].split('.');
  while (core.length < 3) core.push('0');
  const pre = parts[1] ? `-${parts[1]}` : '';
  return `${core[0]}.${core[1]}.${core[2]}${pre}`;
}

function caretUpper(base: Parsed): Parsed {
  if (base.major > 0) {
    return { major: base.major + 1, minor: 0, patch: 0, prerelease: [], raw: '' };
  }
  if (base.minor > 0) {
    return { major: 0, minor: base.minor + 1, patch: 0, prerelease: [], raw: '' };
  }
  return { major: 0, minor: 0, patch: base.patch + 1, prerelease: [], raw: '' };
}

function formatVer(v: Parsed) {
  return `${v.major}.${v.minor}.${v.patch}`;
}

const EXAMPLES = [
  { version: '1.2.3', range: '^1.2.0' },
  { version: '1.2.5', range: '~1.2.0' },
  { version: '1.9.0', range: '>=1.0.0 <2.0.0' },
  { version: '1.5.0', range: '1.2.0 - 1.8.0' }
];

export default function SemverCalculatorTool() {
  const [version, setVersion] = useState('1.2.3');
  const [range, setRange] = useState('^1.2.0');

  const result = useMemo(() => satisfies(version, range), [version, range]);
  const parsed = useMemo(() => parseVersion(stripBuild(version)), [version]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={`${ex.version}-${ex.range}`}
            type="button"
            onClick={() => {
              setVersion(ex.version);
              setRange(ex.range);
            }}
            data-analytics-event="semver_example"
            data-analytics-label={ex.range}
            className="rounded-lg border border-slate-200 px-3 py-1.5 font-mono text-xs hover:bg-slate-50"
          >
            {ex.version} ∈ {ex.range}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Version</span>
          <input
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            data-analytics-event="semver_version"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm"
            placeholder="1.2.3"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Range</span>
          <input
            value={range}
            onChange={(e) => setRange(e.target.value)}
            data-analytics-event="semver_range"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm"
            placeholder="^1.2.0"
          />
        </label>
      </div>

      <div
        className={`rounded-xl border px-4 py-4 ${
          result.ok ? 'border-green-200 bg-green-50 text-green-900' : 'border-red-200 bg-red-50 text-red-900'
        }`}
      >
        <p className="text-lg font-semibold" data-analytics-event="semver_result">
          {result.ok ? 'Satisfies range' : 'Does not satisfy'}
        </p>
        <p className="mt-1 text-sm opacity-90">{result.detail}</p>
      </div>

      {parsed ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Parsed version</p>
          <p className="mt-1 font-mono">
            major={parsed.major} minor={parsed.minor} patch={parsed.patch}
            {parsed.prerelease.length ? ` prerelease=${parsed.prerelease.join('.')}` : ''}
          </p>
        </div>
      ) : (
        <p className="text-sm text-amber-700">Enter a full semver like 1.2.3 or 1.2.3-beta.1</p>
      )}

      <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600 space-y-2">
        <p className="font-semibold text-slate-900">Supported ranges</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <code>^1.2.3</code> — compatible with version (same major)
          </li>
          <li>
            <code>~1.2.3</code> — approximately equivalent (same major.minor)
          </li>
          <li>
            <code>&gt;=1.0.0 &lt;2.0.0</code> — comparator sets
          </li>
          <li>
            <code>1.2.0 - 1.8.0</code> — inclusive hyphen ranges
          </li>
          <li>
            <code>^1.0.0 || ^2.0.0</code> — OR groups
          </li>
        </ul>
      </div>
    </div>
  );
}
