'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Check, Copy, KeyRound, Shield } from 'lucide-react';

type Tab = 'decode' | 'verify' | 'sign';
type Alg = 'HS256' | 'HS384' | 'HS512';

const SAMPLE_SECRET = 'devutil-demo-secret';

function padB64(str: string) {
  return str + '='.repeat((4 - (str.length % 4)) % 4);
}

function b64urlToBytes(str: string): Uint8Array {
  const b64 = padB64(str).replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function bytesToB64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = '';
  arr.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function utf8ToBytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function asBufferSource(bytes: Uint8Array): BufferSource {
  return bytes as unknown as BufferSource;
}

function bytesToUtf8(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

function hashForAlg(alg: Alg): AlgorithmIdentifier {
  if (alg === 'HS512') return 'SHA-512';
  if (alg === 'HS384') return 'SHA-384';
  return 'SHA-256';
}

async function importHmacKey(secret: string, alg: Alg, usage: KeyUsage[]) {
  return crypto.subtle.importKey(
    'raw',
    asBufferSource(utf8ToBytes(secret)),
    { name: 'HMAC', hash: hashForAlg(alg) },
    false,
    usage
  );
}

function parseJwtParts(token: string) {
  const parts = token.trim().split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format. Expected three Base64URL parts separated by dots.');
  }
  const header = JSON.parse(bytesToUtf8(b64urlToBytes(parts[0])));
  const payload = JSON.parse(bytesToUtf8(b64urlToBytes(parts[1])));
  return { parts, header, payload, signature: parts[2] };
}

export default function JwtDecoderTool() {
  const [tab, setTab] = useState<Tab>('decode');
  const [token, setToken] = useState('');
  const [header, setHeader] = useState<Record<string, unknown> | null>(null);
  const [payload, setPayload] = useState<Record<string, unknown> | null>(null);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [secret, setSecret] = useState(SAMPLE_SECRET);
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'valid' | 'invalid' | 'unsupported'>(
    'idle'
  );
  const [verifyMessage, setVerifyMessage] = useState('');
  const [signAlg, setSignAlg] = useState<Alg>('HS256');
  const [signHeader, setSignHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [signPayload, setSignPayload] = useState(
    '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}'
  );
  const [signedToken, setSignedToken] = useState('');
  const [signError, setSignError] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    setError('');
    setHeader(null);
    setPayload(null);
    setSignature('');
    setVerifyStatus('idle');
    setVerifyMessage('');
    if (!token.trim()) return;
    try {
      const parsed = parseJwtParts(token);
      setHeader(parsed.header);
      setPayload(parsed.payload);
      setSignature(parsed.signature);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to decode JWT');
    }
  }, [token]);

  const claims = useMemo(() => {
    if (!payload) return null;
    const exp = typeof payload.exp === 'number' ? payload.exp : null;
    const iat = typeof payload.iat === 'number' ? payload.iat : null;
    const nbf = typeof payload.nbf === 'number' ? payload.nbf : null;
    return { exp, iat, nbf, expired: exp != null ? Date.now() / 1000 > exp : null };
  }, [payload]);

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const verify = async () => {
    setVerifyStatus('idle');
    setVerifyMessage('');
    if (!token.trim()) {
      setVerifyMessage('Paste a JWT first.');
      return;
    }
    if (!secret) {
      setVerifyMessage('Enter the HMAC secret to verify.');
      return;
    }
    try {
      const { parts, header: hdr } = parseJwtParts(token);
      const alg = String(hdr.alg || '');
      if (!['HS256', 'HS384', 'HS512'].includes(alg)) {
        setVerifyStatus('unsupported');
        setVerifyMessage(
          `Algorithm "${alg}" is not supported here. Use HS256/HS384/HS512 with a shared secret (RS/ES need a public key — coming later).`
        );
        return;
      }
      const key = await importHmacKey(secret, alg as Alg, ['verify']);
      const data = asBufferSource(utf8ToBytes(`${parts[0]}.${parts[1]}`));
      const ok = await crypto.subtle.verify(
        'HMAC',
        key,
        asBufferSource(b64urlToBytes(parts[2])),
        data
      );
      setVerifyStatus(ok ? 'valid' : 'invalid');
      setVerifyMessage(
        ok
          ? 'Signature is valid for this secret.'
          : 'Signature does not match this secret (or the token was altered).'
      );
    } catch (e) {
      setVerifyStatus('invalid');
      setVerifyMessage(e instanceof Error ? e.message : 'Verification failed');
    }
  };

  const sign = async () => {
    setSignError('');
    setSignedToken('');
    try {
      const headerObj = JSON.parse(signHeader);
      const payloadObj = JSON.parse(signPayload);
      headerObj.alg = signAlg;
      if (!headerObj.typ) headerObj.typ = 'JWT';
      const h = bytesToB64url(utf8ToBytes(JSON.stringify(headerObj)));
      const p = bytesToB64url(utf8ToBytes(JSON.stringify(payloadObj)));
      const key = await importHmacKey(secret, signAlg, ['sign']);
      const sig = await crypto.subtle.sign(
        'HMAC',
        key,
        asBufferSource(utf8ToBytes(`${h}.${p}`))
      );
      setSignedToken(`${h}.${p}.${bytesToB64url(sig)}`);
    } catch (e) {
      setSignError(e instanceof Error ? e.message : 'Failed to sign JWT');
    }
  };

  const formatTs = (ts: number | null) => {
    if (ts == null) return '—';
    try {
      return new Date(ts * 1000).toLocaleString();
    } catch {
      return '—';
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'decode', label: 'Decode' },
    { id: 'verify', label: 'Verify (HMAC)' },
    { id: 'sign', label: 'Sign / Generate' }
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            data-analytics-event="jwt_tab"
            data-analytics-label={t.id}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              tab === t.id
                ? 'bg-pink-600 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.label}
          </button>
        ))}
        <button
          type="button"
          onClick={async () => {
            setSecret(SAMPLE_SECRET);
            setSignAlg('HS256');
            const headerObj = { alg: 'HS256', typ: 'JWT' };
            const payloadObj = {
              sub: '1234567890',
              name: 'DevUtil Demo',
              iat: 1516239022,
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365
            };
            setSignHeader(JSON.stringify(headerObj, null, 2));
            setSignPayload(JSON.stringify(payloadObj, null, 2));
            try {
              const h = bytesToB64url(utf8ToBytes(JSON.stringify(headerObj)));
              const p = bytesToB64url(utf8ToBytes(JSON.stringify(payloadObj)));
              const key = await importHmacKey(SAMPLE_SECRET, 'HS256', ['sign']);
              const sig = await crypto.subtle.sign(
                'HMAC',
                key,
                asBufferSource(utf8ToBytes(`${h}.${p}`))
              );
              setToken(`${h}.${p}.${bytesToB64url(sig)}`);
              setTab('decode');
            } catch {
              setError('Could not generate sample JWT in this browser.');
            }
          }}
          data-analytics-event="jwt_sample"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
        >
          Load sample
        </button>
        <button
          type="button"
          onClick={() => {
            setToken('');
            setSignedToken('');
            setError('');
            setSignError('');
            setVerifyStatus('idle');
          }}
          data-analytics-event="jwt_clear"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      {(tab === 'decode' || tab === 'verify') && (
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">JWT</span>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            rows={4}
            data-analytics-event="jwt_token_input"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm"
          />
        </label>
      )}

      {tab === 'verify' && (
        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <label className="block space-y-2">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
              <KeyRound className="h-4 w-4" /> HMAC secret
            </span>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              data-analytics-event="jwt_secret_input"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm"
              placeholder="Shared secret for HS256/384/512"
            />
          </label>
          <button
            type="button"
            onClick={verify}
            data-analytics-event="jwt_verify"
            className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
          >
            <Shield className="h-4 w-4" /> Verify signature
          </button>
          {verifyMessage ? (
            <p
              className={`text-sm ${
                verifyStatus === 'valid'
                  ? 'text-green-700'
                  : verifyStatus === 'unsupported'
                    ? 'text-amber-700'
                    : 'text-red-700'
              }`}
            >
              {verifyMessage}
            </p>
          ) : null}
          <p className="text-xs text-slate-500">
            Secret stays in your browser. Prefer a throwaway secret for demos — never paste production
            secrets on a shared device.
          </p>
        </div>
      )}

      {tab === 'sign' && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Header (JSON)</span>
              <textarea
                value={signHeader}
                onChange={(e) => setSignHeader(e.target.value)}
                rows={6}
                data-analytics-event="jwt_sign_header"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Payload (JSON)</span>
              <textarea
                value={signPayload}
                onChange={(e) => setSignPayload(e.target.value)}
                rows={6}
                data-analytics-event="jwt_sign_payload"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm"
              />
            </label>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Algorithm</span>
              <select
                value={signAlg}
                onChange={(e) => {
                  const next = e.target.value as Alg;
                  setSignAlg(next);
                  try {
                    const h = JSON.parse(signHeader);
                    h.alg = next;
                    setSignHeader(JSON.stringify(h, null, 2));
                  } catch {
                    /* ignore */
                  }
                }}
                data-analytics-event="jwt_sign_alg"
                className="block rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="HS256">HS256</option>
                <option value="HS384">HS384</option>
                <option value="HS512">HS512</option>
              </select>
            </label>
            <label className="min-w-[220px] flex-1 space-y-2">
              <span className="text-sm font-medium text-slate-700">HMAC secret</span>
              <input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                data-analytics-event="jwt_secret_input"
                className="w-full rounded-xl border border-slate-200 px-4 py-2 font-mono text-sm"
              />
            </label>
            <button
              type="button"
              onClick={sign}
              data-analytics-event="jwt_sign"
              className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
            >
              Sign JWT
            </button>
          </div>
          {signError ? <p className="text-sm text-red-600">{signError}</p> : null}
          {signedToken ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-700">Signed token</p>
                <button
                  type="button"
                  onClick={() => copy(signedToken, 'signed')}
                  data-analytics-event="jwt_copy"
                  data-analytics-label="signed"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm"
                >
                  {copied === 'signed' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  Copy
                </button>
              </div>
              <p className="break-all font-mono text-xs text-slate-800">{signedToken}</p>
            </div>
          ) : null}
        </div>
      )}

      {error ? (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      ) : null}

      {(tab === 'decode' || tab === 'verify') && header && payload ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            { key: 'header', label: 'Header', value: header },
            { key: 'payload', label: 'Payload', value: payload }
          ].map((block) => (
            <div key={block.key} className="rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <h3 className="font-semibold text-slate-900">{block.label}</h3>
                <button
                  type="button"
                  onClick={() => copy(JSON.stringify(block.value, null, 2), block.key)}
                  data-analytics-event="jwt_copy"
                  data-analytics-label={block.key}
                  className="inline-flex items-center gap-1 text-sm text-blue-600"
                >
                  {copied === block.key ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  Copy
                </button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs text-slate-800">
                {JSON.stringify(block.value, null, 2)}
              </pre>
            </div>
          ))}
          <div className="rounded-xl border border-slate-200 bg-white lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h3 className="font-semibold text-slate-900">Signature</h3>
              <button
                type="button"
                onClick={() => copy(signature, 'signature')}
                data-analytics-event="jwt_copy"
                data-analytics-label="signature"
                className="inline-flex items-center gap-1 text-sm text-blue-600"
              >
                {copied === 'signature' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                Copy
              </button>
            </div>
            <p className="break-all p-4 font-mono text-xs text-slate-700">{signature}</p>
          </div>
          {claims ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 lg:col-span-2">
              <h3 className="mb-3 font-semibold text-slate-900">Standard claims</h3>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs uppercase text-slate-500">iat</p>
                  <p>{formatTs(claims.iat)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">exp</p>
                  <p className={claims.expired ? 'text-red-600' : ''}>
                    {formatTs(claims.exp)}
                    {claims.expired != null ? (claims.expired ? ' (expired)' : ' (valid)') : ''}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">nbf</p>
                  <p>{formatTs(claims.nbf)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500">sub / iss / aud</p>
                  <p className="truncate">
                    {String(payload.sub ?? '—')} / {String(payload.iss ?? '—')} /{' '}
                    {String(payload.aud ?? '—')}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
