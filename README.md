# DevUtil — Free Developer Tools & Utilities

**[devutil.dev](https://www.devutil.dev)** is a fast, privacy-first collection of developer utilities that run **100% in the browser**. No logins required. Tool inputs never leave your device.

> Built by [Sachin Kasana](https://github.com/sachinkasana) · MIT License · Free forever

**Goal:** become the go-to private toolbox for everyday developer tasks (format, convert, encode, generate).

---

## Tools (22)

| Tool | URL |
|------|-----|
| JSON Formatter | [/json-formatter](https://www.devutil.dev/json-formatter) |
| SQL Formatter | [/sql-formatter](https://www.devutil.dev/sql-formatter) |
| XML Formatter | [/xml-formatter](https://www.devutil.dev/xml-formatter) |
| YAML ↔ JSON | [/yaml-json-converter](https://www.devutil.dev/yaml-json-converter) |
| JSON ↔ CSV | [/json-csv-converter](https://www.devutil.dev/json-csv-converter) |
| Markdown Preview | [/markdown-preview](https://www.devutil.dev/markdown-preview) |
| Cron Generator | [/cron-generator](https://www.devutil.dev/cron-generator) |
| Case Converter | [/case-converter](https://www.devutil.dev/case-converter) |
| Number Base Converter | [/number-base-converter](https://www.devutil.dev/number-base-converter) |
| HTML Entity Encoder | [/html-entity-encoder](https://www.devutil.dev/html-entity-encoder) |
| Base64 Encoder | [/base64-encoder](https://www.devutil.dev/base64-encoder) |
| UUID Generator (v4 & v7) | [/uuid-generator](https://www.devutil.dev/uuid-generator) |
| Diff Checker | [/diff-checker](https://www.devutil.dev/diff-checker) |
| Hash Generator | [/hash-generator](https://www.devutil.dev/hash-generator) |
| Password Generator | [/password-generator](https://www.devutil.dev/password-generator) |
| Regex Tester | [/regex-tester](https://www.devutil.dev/regex-tester) |
| URL Encoder | [/url-encoder](https://www.devutil.dev/url-encoder) |
| JWT Decoder | [/jwt-decoder](https://www.devutil.dev/jwt-decoder) |
| Timestamp Converter | [/timestamp-converter](https://www.devutil.dev/timestamp-converter) |
| QR Code Generator | [/qr-code-generator](https://www.devutil.dev/qr-code-generator) |
| Color Picker | [/color-picker](https://www.devutil.dev/color-picker) |
| Lorem Ipsum Generator | [/lorem-ipsum-generator](https://www.devutil.dev/lorem-ipsum-generator) |

Guides: [/guides](https://www.devutil.dev/guides) · What's new: [/whats-new](https://www.devutil.dev/whats-new)

---

## Why DevUtil?

- **Privacy-first** — Tool processing is client-side. Inputs are not uploaded.
- **Instant** — No server roundtrips for formatting/conversion.
- **Always free** — No subscriptions or paywalls.
- **No account required** — Open and use immediately.

---

## Tech Stack

- Next.js (App Router) · React · Tailwind CSS · lucide-react
- Analytics: GA4 + Umami + Vercel Analytics (aggregate usage only)

---

## Getting Started

```bash
npm install
npm run dev
```

### Env (optional)

Copy `.env.example` → `.env.local`:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Search Console)
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`

---

## SEO / Growth checklist

1. Verify domain in [Google Search Console](https://search.google.com/search-console) and submit `https://www.devutil.dev/sitemap.xml`
2. Verify in Bing Webmaster Tools
3. Share [/whats-new](https://www.devutil.dev/whats-new) on Product Hunt / Reddit / Indie Hackers
4. Request indexing for new tool + guide URLs

---

## License

MIT
