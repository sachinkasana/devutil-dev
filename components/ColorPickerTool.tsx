'use client';

import { useMemo, useState } from 'react';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '').trim();
  if (![3, 6].includes(clean.length)) return null;
  const normalized = clean.length === 3
    ? clean.split('').map((char) => char + char).join('')
    : clean;
  const intVal = parseInt(normalized, 16);
  if (Number.isNaN(intVal)) return null;
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255
  };
};

const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

const rgbToHsl = (r: number, g: number, b: number) => {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const delta = max - min;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta) % 6;
        break;
      case gNorm:
        h = (bNorm - rNorm) / delta + 2;
        break;
      default:
        h = (rNorm - gNorm) / delta + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const hslToRgb = (h: number, s: number, l: number) => {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h < 120) {
    r = x; g = c; b = 0;
  } else if (h < 180) {
    r = 0; g = c; b = x;
  } else if (h < 240) {
    r = 0; g = x; b = c;
  } else if (h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
};

const mix = (a: number, b: number, weight: number) => Math.round(a + (b - a) * weight);

const buildPalette = (r: number, g: number, b: number) => {
  const steps = [0.9, 0.7, 0.5, 0.3, 0.15, 0, 0.15, 0.3, 0.5, 0.7];
  return steps.map((step, index) => {
    const target = index < 5 ? 255 : 0;
    const weight = index < 5 ? step : step;
    const mixed = {
      r: mix(r, target, weight),
      g: mix(g, target, weight),
      b: mix(b, target, weight)
    };
    return rgbToHex(mixed.r, mixed.g, mixed.b);
  });
};

export default function ColorPickerTool() {
  const [hex, setHex] = useState('#2563EB');
  const [rgb, setRgb] = useState({ r: 37, g: 99, b: 235 });
  const [hsl, setHsl] = useState({ h: 220, s: 82, l: 53 });
  const [error, setError] = useState('');

  const updateFromHex = (value: string) => {
    setHex(value);
    const parsed = hexToRgb(value);
    if (!parsed) {
      setError('Enter a valid hex value like #2563EB.');
      return;
    }
    setError('');
    setRgb(parsed);
    setHsl(rgbToHsl(parsed.r, parsed.g, parsed.b));
  };

  const updateFromRgb = (next: { r: number; g: number; b: number }) => {
    const clamped = {
      r: clamp(next.r, 0, 255),
      g: clamp(next.g, 0, 255),
      b: clamp(next.b, 0, 255)
    };
    setRgb(clamped);
    setHex(rgbToHex(clamped.r, clamped.g, clamped.b));
    setHsl(rgbToHsl(clamped.r, clamped.g, clamped.b));
    setError('');
  };

  const updateFromHsl = (next: { h: number; s: number; l: number }) => {
    const clamped = {
      h: clamp(next.h, 0, 360),
      s: clamp(next.s, 0, 100),
      l: clamp(next.l, 0, 100)
    };
    const converted = hslToRgb(clamped.h, clamped.s, clamped.l);
    setHsl(clamped);
    setRgb(converted);
    setHex(rgbToHex(converted.r, converted.g, converted.b));
    setError('');
  };

  const palette = useMemo(() => buildPalette(rgb.r, rgb.g, rgb.b), [rgb]);

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Pick a color</label>
          <input
            type="color"
            value={hex}
            onChange={(event) => updateFromHex(event.target.value)}
            className="h-14 w-full rounded-lg border border-slate-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">HEX</label>
          <div className="flex gap-2">
            <input
              value={hex}
              onChange={(event) => updateFromHex(event.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => handleCopy(hex)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Copy
            </button>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900">RGB</label>
          <div className="grid grid-cols-3 gap-2">
            {(['r', 'g', 'b'] as const).map((channel) => (
              <input
                key={channel}
                type="number"
                min={0}
                max={255}
                value={rgb[channel]}
                onChange={(event) => updateFromRgb({ ...rgb, [channel]: Number(event.target.value) })}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Copy RGB
          </button>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900">HSL</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              min={0}
              max={360}
              value={hsl.h}
              onChange={(event) => updateFromHsl({ ...hsl, h: Number(event.target.value) })}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              min={0}
              max={100}
              value={hsl.s}
              onChange={(event) => updateFromHsl({ ...hsl, s: Number(event.target.value) })}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              min={0}
              max={100}
              value={hsl.l}
              onChange={(event) => updateFromHsl({ ...hsl, l: Number(event.target.value) })}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Copy HSL
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Color palette</h3>
            <p className="text-sm text-slate-500">Tints and shades generated from the base color.</p>
          </div>
          <div className="w-12 h-12 rounded-full border border-slate-200" style={{ backgroundColor: hex }} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {palette.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => updateFromHex(value)}
              className="flex flex-col items-center gap-2"
            >
              <span className="w-full h-12 rounded-lg border border-slate-200" style={{ backgroundColor: value }} />
              <span className="text-xs text-slate-600">{value}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
