'use client';

import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';

type Mode = 'text' | 'wifi' | 'vcard';

const defaultText = 'https://www.devutil.dev';

const buildWifiPayload = (ssid: string, password: string, encryption: string, hidden: boolean) => {
  const safeSsid = ssid.replace(/([\\;,:"])/g, '\\$1');
  const safePassword = password.replace(/([\\;,:"])/g, '\\$1');
  return `WIFI:T:${encryption};S:${safeSsid};P:${safePassword};H:${hidden ? 'true' : ''};;`;
};

const buildVcardPayload = (firstName: string, lastName: string, org: string, title: string, phone: string, email: string, url: string, address: string) => {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${[firstName, lastName].filter(Boolean).join(' ') || 'DevUtil Contact'}`,
    org ? `ORG:${org}` : '',
    title ? `TITLE:${title}` : '',
    phone ? `TEL;TYPE=CELL:${phone}` : '',
    email ? `EMAIL:${email}` : '',
    url ? `URL:${url}` : '',
    address ? `ADR;TYPE=WORK:;;${address};;;;` : '',
    'END:VCARD'
  ].filter(Boolean);
  return lines.join('\n');
};

export default function QrCodeGeneratorTool() {
  const [mode, setMode] = useState<Mode>('text');
  const [textValue, setTextValue] = useState(defaultText);
  const [ssid, setSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [org, setOrg] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [address, setAddress] = useState('');
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(2);
  const [errorCorrection, setErrorCorrection] = useState('M');
  const [darkColor, setDarkColor] = useState('#0f172a');
  const [lightColor, setLightColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');

  const payload = useMemo(() => {
    if (mode === 'wifi') {
      return buildWifiPayload(ssid, wifiPassword, wifiEncryption, wifiHidden);
    }
    if (mode === 'vcard') {
      return buildVcardPayload(firstName, lastName, org, title, phone, email, url, address);
    }
    return textValue.trim() || defaultText;
  }, [mode, textValue, ssid, wifiPassword, wifiEncryption, wifiHidden, firstName, lastName, org, title, phone, email, url, address]);

  useEffect(() => {
    let isMounted = true;
    setError('');
    QRCode.toDataURL(payload, {
      errorCorrectionLevel: errorCorrection,
      margin,
      width: size,
      color: {
        dark: darkColor,
        light: lightColor
      }
    })
      .then((dataUrl) => {
        if (isMounted) setQrDataUrl(dataUrl);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to generate QR code.');
          setQrDataUrl('');
        }
      });
    return () => {
      isMounted = false;
    };
  }, [payload, size, margin, errorCorrection, darkColor, lightColor]);

  const handleCopyPayload = async () => {
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'devutil-qr-code.png';
    link.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-8">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setMode('text')}
            data-analytics-event="qr_mode"
            data-analytics-label="text"
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${mode === 'text' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 text-slate-700 hover:border-slate-400'}`}
          >
            URL / Text
          </button>
          <button
            type="button"
            onClick={() => setMode('wifi')}
            data-analytics-event="qr_mode"
            data-analytics-label="wifi"
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${mode === 'wifi' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 text-slate-700 hover:border-slate-400'}`}
          >
            WiFi
          </button>
          <button
            type="button"
            onClick={() => setMode('vcard')}
            data-analytics-event="qr_mode"
            data-analytics-label="vcard"
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${mode === 'vcard' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 text-slate-700 hover:border-slate-400'}`}
          >
            vCard
          </button>
        </div>

        {mode === 'text' && (
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-900">Text or URL</label>
            <textarea
              value={textValue}
              onChange={(event) => setTextValue(event.target.value)}
              data-analytics-event="qr_text_input"
              placeholder="Paste a link, message, or any text."
              className="w-full min-h-[140px] border border-slate-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {mode === 'wifi' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-900">Network name (SSID)</label>
              <input
                value={ssid}
                onChange={(event) => setSsid(event.target.value)}
                data-analytics-event="qr_wifi_ssid"
                placeholder="Cafe WiFi"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Password</label>
              <input
                value={wifiPassword}
                onChange={(event) => setWifiPassword(event.target.value)}
                data-analytics-event="qr_wifi_password"
                placeholder="Optional"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Encryption</label>
              <select
                value={wifiEncryption}
                onChange={(event) => setWifiEncryption(event.target.value)}
                data-analytics-event="qr_wifi_encryption"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No password</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={wifiHidden}
                onChange={(event) => setWifiHidden(event.target.checked)}
                data-analytics-event="qr_wifi_hidden"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Hidden network
            </label>
          </div>
        )}

        {mode === 'vcard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">First name</label>
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                data-analytics-event="qr_vcard_first_name"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Last name</label>
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                data-analytics-event="qr_vcard_last_name"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-900">Company</label>
              <input
                value={org}
                onChange={(event) => setOrg(event.target.value)}
                data-analytics-event="qr_vcard_org"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Title</label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                data-analytics-event="qr_vcard_title"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Phone</label>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                data-analytics-event="qr_vcard_phone"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Email</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                data-analytics-event="qr_vcard_email"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Website</label>
              <input
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                data-analytics-event="qr_vcard_url"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-900">Address</label>
              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                data-analytics-event="qr_vcard_address"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Size</label>
            <input
              type="number"
              min={160}
              max={512}
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
              data-analytics-event="qr_size"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Margin</label>
            <input
              type="number"
              min={0}
              max={10}
              value={margin}
              onChange={(event) => setMargin(Number(event.target.value))}
              data-analytics-event="qr_margin"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Error correction</label>
            <select
              value={errorCorrection}
              onChange={(event) => setErrorCorrection(event.target.value)}
              data-analytics-event="qr_error_correction"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="L">Low</option>
              <option value="M">Medium</option>
              <option value="Q">Quartile</option>
              <option value="H">High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Foreground color</label>
            <input
              type="color"
              value={darkColor}
              onChange={(event) => setDarkColor(event.target.value)}
              data-analytics-event="qr_color_dark"
              className="w-full h-11 border border-slate-300 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Background color</label>
            <input
              type="color"
              value={lightColor}
              onChange={(event) => setLightColor(event.target.value)}
              data-analytics-event="qr_color_light"
              className="w-full h-11 border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-sm">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900">Preview</h3>
          <p className="text-sm text-slate-500">Download or share your QR code.</p>
        </div>
        {error && (
          <div className="w-full bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="w-full flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrDataUrl} alt="Generated QR code" className="max-w-full" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            data-analytics-event="qr_download"
            className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Download PNG
          </button>
          <button
            type="button"
            onClick={handleCopyPayload}
            data-analytics-event="qr_copy_data"
            className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy data'}
          </button>
        </div>
        <div className="text-xs text-slate-500 text-center">
          Works offline after loading. No data is uploaded.
        </div>
      </div>
    </div>
  );
}
