'use client';

import { Braces } from 'lucide-react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RelatedTools from '../../components/RelatedTools';
import JwtDecoderTool from '../../components/JwtDecoderTool';

export default function JWTDecoderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="JWT Decoder" />
      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-8">
        <div className="mb-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Braces className="w-6 h-6 text-pink-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              JWT Decoder, Verifier &amp; Generator
            </h1>
          </div>
          <p className="mt-2 text-slate-600 max-w-3xl mx-auto">
            Decode header and payload, verify HS256/384/512 signatures with a secret, or sign new
            tokens — all in your browser. Tokens never leave your device.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <JwtDecoderTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-6 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Decode vs verify</h2>
            <p>
              Decoding only Base64URL-decodes the JWT parts so you can read claims. Verification checks
              the HMAC signature with your shared secret using the Web Crypto API. Asymmetric algorithms
              (RS256, ES256) are not supported in this version.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Is it safe?</h2>
            <p>
              Processing stays client-side. Still avoid pasting production secrets or long-lived tokens on
              shared machines. Prefer short-lived test tokens when debugging.
            </p>
          </div>
        </section>

        <RelatedTools current="jwt-decoder" />
      </main>
      <Footer />
    </div>
  );
}
