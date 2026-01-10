'use client';

import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, Braces, Home, AlertCircle, Shield } from 'lucide-react';

export default function JWTDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState(null);
  const [payload, setPayload] = useState(null);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    decodeToken();
  }, [token]);

  const decodeToken = () => {
    setError('');
    setHeader(null);
    setPayload(null);
    setSignature('');

    if (!token.trim()) return;

    try {
      const parts = token.split('.');

      if (parts.length !== 3) {
        setError('Invalid JWT format. JWT should have 3 parts separated by dots.');
        return;
      }

      // Decode header
      const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      setHeader(decodedHeader);

      // Decode payload
      const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      setPayload(decodedPayload);

      // Set signature
      setSignature(parts[2]);

    } catch (e) {
      setError(`Decoding error: ${e.message}`);
    }
  };

  const copyToClipboard = async (text, type) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const loadSample = () => {
    // Sample JWT token (not a real token, just for demo)
    const sampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3Mzc2NjU2MDAsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    setToken(sampleToken);
  };

  const clearAll = () => {
    setToken('');
    setError('');
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return null;
    try {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    } catch {
      return null;
    }
  };

  const isExpired = (exp) => {
    if (!exp) return null;
    return Date.now() / 1000 > exp;
  };

  const renderJSON = (obj) => {
    return JSON.stringify(obj, null, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">DevUtil</h1>
                  <p className="text-xs text-slate-500">JWT Decoder</p>
                </div>
              </a>
            </div>
            <a
              href="/"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">All Tools</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title & Description */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Braces className="w-8 h-8 text-pink-600" />
            <h2 className="text-4xl font-bold text-slate-900">JWT Decoder</h2>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Decode and inspect JSON Web Tokens (JWT). View header, payload, and signature information.
          </p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-sm text-yellow-800">
            <Shield className="w-4 h-4" />
            <span>This tool only decodes tokens. It does not verify signatures.</span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={loadSample}
              className="flex items-center space-x-2 bg-pink-600 text-white px-6 py-2.5 rounded-lg hover:bg-pink-700 transition-colors font-medium"
            >
              <Code className="w-4 h-4" />
              <span>Load Sample JWT</span>
            </button>
            <button
              onClick={clearAll}
              className="flex items-center space-x-2 border-2 border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
            >
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Token Input */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-900">JWT Token</h3>
            <span className="text-sm text-slate-500">{token.length} characters</span>
          </div>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="w-full h-32 p-4 border border-slate-300 rounded-xl font-mono text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900">Error</h4>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Decoded Sections */}
        {(header || payload) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Header */}
            {header && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-slate-900">Header</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(renderJSON(header), 'header')}
                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {copied === 'header' ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-slate-50 rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm text-slate-900">{renderJSON(header)}</code>
                </pre>
                <div className="mt-4 space-y-2">
                  {header.alg && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-slate-600">Algorithm:</span>
                      <code className="bg-blue-100 px-2 py-1 rounded text-blue-900 font-medium">
                        {header.alg}
                      </code>
                    </div>
                  )}
                  {header.typ && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-slate-600">Type:</span>
                      <code className="bg-purple-100 px-2 py-1 rounded text-purple-900 font-medium">
                        {header.typ}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payload */}
            {payload && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-slate-900">Payload</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(renderJSON(payload), 'payload')}
                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {copied === 'payload' ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-slate-50 rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm text-slate-900">{renderJSON(payload)}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Claims Information */}
        {payload && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Standard Claims</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {payload.iat && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-sm text-slate-600 mb-1">Issued At (iat)</div>
                  <div className="font-mono text-sm text-slate-900">{formatTimestamp(payload.iat) || payload.iat}</div>
                </div>
              )}
              {payload.exp && (
                <div className={`rounded-lg p-4 ${isExpired(payload.exp) ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                  <div className="text-sm text-slate-600 mb-1">Expires (exp)</div>
                  <div className="font-mono text-sm text-slate-900">{formatTimestamp(payload.exp) || payload.exp}</div>
                  {isExpired(payload.exp) !== null && (
                    <div className={`text-xs mt-2 font-medium ${isExpired(payload.exp) ? 'text-red-700' : 'text-green-700'}`}>
                      {isExpired(payload.exp) ? '⚠️ Token Expired' : '✓ Token Valid'}
                    </div>
                  )}
                </div>
              )}
              {payload.nbf && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-sm text-slate-600 mb-1">Not Before (nbf)</div>
                  <div className="font-mono text-sm text-slate-900">{formatTimestamp(payload.nbf) || payload.nbf}</div>
                </div>
              )}
              {payload.sub && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-sm text-slate-600 mb-1">Subject (sub)</div>
                  <div className="font-mono text-sm text-slate-900 break-all">{payload.sub}</div>
                </div>
              )}
              {payload.iss && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-sm text-slate-600 mb-1">Issuer (iss)</div>
                  <div className="font-mono text-sm text-slate-900 break-all">{payload.iss}</div>
                </div>
              )}
              {payload.aud && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-sm text-slate-600 mb-1">Audience (aud)</div>
                  <div className="font-mono text-sm text-slate-900 break-all">
                    {Array.isArray(payload.aud) ? payload.aud.join(', ') : payload.aud}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Signature */}
        {signature && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-slate-900">Signature</h3>
              </div>
              <button
                onClick={() => copyToClipboard(signature, 'signature')}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                {copied === 'signature' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <code className="text-sm text-slate-900 break-all font-mono">{signature}</code>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">About JWT Tokens</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">What is JWT?</h4>
              <p className="text-slate-600 mb-4">
                JSON Web Token (JWT) is an open standard for securely transmitting information between parties as a JSON object.
                JWTs are commonly used for authentication and information exchange.
              </p>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">JWT Structure</h4>
              <ul className="space-y-2 text-slate-600">
                <li><strong className="text-red-600">Header:</strong> Algorithm and token type</li>
                <li><strong className="text-purple-600">Payload:</strong> Claims and data</li>
                <li><strong className="text-blue-600">Signature:</strong> Verification signature</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Common Claims</h4>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li><code className="bg-slate-100 px-1.5 py-0.5 rounded">iss</code> - Issuer of the token</li>
                <li><code className="bg-slate-100 px-1.5 py-0.5 rounded">sub</code> - Subject (user ID)</li>
                <li><code className="bg-slate-100 px-1.5 py-0.5 rounded">aud</code> - Audience</li>
                <li><code className="bg-slate-100 px-1.5 py-0.5 rounded">exp</code> - Expiration time</li>
                <li><code className="bg-slate-100 px-1.5 py-0.5 rounded">nbf</code> - Not before time</li>
                <li><code className="bg-slate-100 px-1.5 py-0.5 rounded">iat</code> - Issued at time</li>
                <li><code className="bg-slate-100 px-1.5 py-0.5 rounded">jti</code> - JWT ID</li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Security Note:</strong> This tool only decodes tokens. Always verify signatures on the server side.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2026 DevUtil.dev - All rights reserved.</p>
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
