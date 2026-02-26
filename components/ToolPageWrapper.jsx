// components/ToolPageWrapper.jsx
// Wrap each tool page with this component to get:
//   ✅ WebApplication + FAQPage JSON-LD schema
//   ✅ How to use section
//   ✅ FAQ accordion for SEO content
//   ✅ Related tools links
//
// Usage:
//   <ToolPageWrapper slug="json-formatter" relatedTools={["uuid-generator","base64-encoder"]}>
//     <YourToolComponent />
//   </ToolPageWrapper>

"use client";

import { useState } from "react";
import Link from "next/link";
import { TOOLS, toolJsonLd, SITE } from "../app/seo-config";

export default function ToolPageWrapper({ slug, children, relatedTools = [] }) {
  const tool = TOOLS[slug];
  const schemas = toolJsonLd(slug);
  const [openFaq, setOpenFaq] = useState(null);

  if (!tool) return <>{children}</>;

  return (
    <>
      {/* Inject JSON-LD schema tags */}
      {schemas &&
        schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

      {/* H1 — Required for SEO. Style to match your design. */}
      <h1 className="sr-only">{tool.shortTitle}</h1>

      {/* ── The actual tool UI ── */}
      {children}

      {/* ── SEO content section below the tool ── */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10 text-sm text-gray-700">

        {/* How to use */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            How to use the {tool.shortTitle}
          </h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Paste or type your input in the editor above.</li>
            <li>The result appears instantly — no button click needed.</li>
            <li>Click <strong>Copy</strong> to copy the output to your clipboard.</li>
          </ol>
        </section>

        {/* Privacy note */}
        <section className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h2 className="font-semibold text-blue-900 mb-1">🔒 Privacy guarantee</h2>
          <p className="text-blue-800">
            All processing happens locally in your browser. Nothing is sent to any
            server — your data never leaves your device. DevUtil is 100% client-side.
          </p>
        </section>

        {/* FAQ */}
        {tool.faq && tool.faq.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
              {tool.faq.map(({ q, a }, i) => (
                <div key={i}>
                  <button
                    className="w-full text-left px-4 py-3 font-medium text-gray-800 flex justify-between items-center hover:bg-gray-50 transition"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{q}</span>
                    <span className="text-gray-400 ml-4">{openFaq === i ? "▲" : "▼"}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 pt-1 text-gray-600 bg-gray-50">
                      {a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related tools */}
        {relatedTools.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Related tools
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedTools.map((relSlug) => {
                const rel = TOOLS[relSlug];
                if (!rel) return null;
                return (
                  <Link
                    key={relSlug}
                    href={`/${relSlug}`}
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 transition"
                  >
                    {rel.shortTitle} →
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
