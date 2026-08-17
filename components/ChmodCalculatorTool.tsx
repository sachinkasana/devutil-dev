'use client';

import { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';

type Role = 'owner' | 'group' | 'other';
type Perm = 'read' | 'write' | 'execute';

type Bits = Record<Role, Record<Perm, boolean>>;

const ROLES: { key: Role; label: string }[] = [
  { key: 'owner', label: 'Owner (u)' },
  { key: 'group', label: 'Group (g)' },
  { key: 'other', label: 'Others (o)' }
];

const PERMS: { key: Perm; label: string; bit: number }[] = [
  { key: 'read', label: 'Read (r)', bit: 4 },
  { key: 'write', label: 'Write (w)', bit: 2 },
  { key: 'execute', label: 'Execute (x)', bit: 1 }
];

const EMPTY: Bits = {
  owner: { read: false, write: false, execute: false },
  group: { read: false, write: false, execute: false },
  other: { read: false, write: false, execute: false }
};

const DEFAULT: Bits = {
  owner: { read: true, write: true, execute: true },
  group: { read: true, write: false, execute: true },
  other: { read: true, write: false, execute: true }
};

function roleToDigit(role: Bits[Role]): number {
  return PERMS.reduce((sum, p) => sum + (role[p.key] ? p.bit : 0), 0);
}

function bitsToOctal(bits: Bits): string {
  return `${roleToDigit(bits.owner)}${roleToDigit(bits.group)}${roleToDigit(bits.other)}`;
}

function digitToRole(digit: number): Bits[Role] {
  return {
    read: (digit & 4) !== 0,
    write: (digit & 2) !== 0,
    execute: (digit & 1) !== 0
  };
}

function octalToBits(octal: string): Bits | null {
  const cleaned = octal.trim().replace(/^0+/, '') || '0';
  if (!/^[0-7]{3,4}$/.test(cleaned) && !/^[0-7]{1,3}$/.test(cleaned)) {
    // allow 3 digits primarily; also 4 with sticky/setuid ignored for display simplicity
  }
  const digits = cleaned.length === 4 ? cleaned.slice(1) : cleaned.padStart(3, '0');
  if (!/^[0-7]{3}$/.test(digits)) return null;
  return {
    owner: digitToRole(Number(digits[0])),
    group: digitToRole(Number(digits[1])),
    other: digitToRole(Number(digits[2]))
  };
}

function bitsToSymbolic(bits: Bits): string {
  const part = (role: Bits[Role]) =>
    `${role.read ? 'r' : '-'}${role.write ? 'w' : '-'}${role.execute ? 'x' : '-'}`;
  return `-${part(bits.owner)}${part(bits.group)}${part(bits.other)}`;
}

function bitsToChmod(bits: Bits): string {
  return `chmod ${bitsToOctal(bits)}`;
}

const PRESETS: { label: string; octal: string; hint: string }[] = [
  { label: '755', octal: '755', hint: 'dirs / scripts' },
  { label: '644', octal: '644', hint: 'files' },
  { label: '600', octal: '600', hint: 'private keys' },
  { label: '700', octal: '700', hint: 'private dir' },
  { label: '777', octal: '777', hint: 'world writable' },
  { label: '444', octal: '444', hint: 'read-only' }
];

export default function ChmodCalculatorTool() {
  const [bits, setBits] = useState<Bits>(DEFAULT);
  const [octalInput, setOctalInput] = useState('755');
  const [octalError, setOctalError] = useState('');
  const [copied, setCopied] = useState('');

  const octal = useMemo(() => bitsToOctal(bits), [bits]);
  const symbolic = useMemo(() => bitsToSymbolic(bits), [bits]);
  const command = useMemo(() => bitsToChmod(bits), [bits]);

  const toggle = (role: Role, perm: Perm) => {
    setBits((prev) => {
      const next = {
        ...prev,
        [role]: { ...prev[role], [perm]: !prev[role][perm] }
      };
      setOctalInput(bitsToOctal(next));
      setOctalError('');
      return next;
    });
  };

  const applyOctal = (raw: string) => {
    setOctalInput(raw);
    const parsed = octalToBits(raw);
    if (!parsed) {
      setOctalError('Enter a 3-digit octal mode like 755 or 644.');
      return;
    }
    setOctalError('');
    setBits(parsed);
  };

  const applyPreset = (value: string) => {
    applyOctal(value);
  };

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const clearAll = () => {
    setBits(EMPTY);
    setOctalInput('000');
    setOctalError('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.octal}
            type="button"
            onClick={() => applyPreset(p.octal)}
            data-analytics-event="chmod_preset"
            data-analytics-label={p.octal}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm hover:bg-slate-100"
          >
            <span className="font-mono font-semibold">{p.label}</span>
            <span className="ml-2 text-xs text-slate-500">{p.hint}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={clearAll}
          data-analytics-event="chmod_clear"
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="py-2 pr-4 font-medium">Who</th>
              {PERMS.map((p) => (
                <th key={p.key} className="py-2 px-2 font-medium">
                  {p.label}
                </th>
              ))}
              <th className="py-2 pl-2 font-medium">Digit</th>
            </tr>
          </thead>
          <tbody>
            {ROLES.map((role) => (
              <tr key={role.key} className="border-b border-slate-100">
                <td className="py-3 pr-4 font-semibold text-slate-900">{role.label}</td>
                {PERMS.map((p) => (
                  <td key={p.key} className="py-3 px-2">
                    <input
                      type="checkbox"
                      checked={bits[role.key][p.key]}
                      onChange={() => toggle(role.key, p.key)}
                      data-analytics-event="chmod_toggle"
                      data-analytics-label={`${role.key}_${p.key}`}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600"
                      aria-label={`${role.label} ${p.label}`}
                    />
                  </td>
                ))}
                <td className="py-3 pl-2 font-mono text-lg font-bold text-blue-700">
                  {roleToDigit(bits[role.key])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Octal mode</span>
          <input
            value={octalInput}
            onChange={(e) => applyOctal(e.target.value)}
            data-analytics-event="chmod_octal_input"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-lg"
            placeholder="755"
            inputMode="numeric"
          />
          {octalError ? <p className="text-sm text-red-600">{octalError}</p> : null}
        </label>

        <div className="grid gap-3">
          {[
            { key: 'octal', label: 'Octal', value: octal },
            { key: 'symbolic', label: 'Symbolic (ls -l)', value: symbolic },
            { key: 'command', label: 'Command', value: command }
          ].map((row) => (
            <div
              key={row.key}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {row.label}
                </p>
                <p className="font-mono text-base font-semibold text-slate-900">{row.value}</p>
              </div>
              <button
                type="button"
                onClick={() => copy(row.value, row.key)}
                data-analytics-event="chmod_copy"
                data-analytics-label={row.key}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
              >
                {copied === row.key ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
