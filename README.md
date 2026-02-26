# DevUtil — Free Developer Tools & Utilities

**[devutil.dev](https://www.devutil.dev)** is a fast, privacy-first collection of developer utilities that run **100% in the browser**. No logins, no tracking, no server-side processing.

> Built by [Sachin Kasana](https://github.com/sachinkasana) · MIT License · Free forever

---

## 🧰 Tools

| Tool | URL | Description |
|------|-----|-------------|
| JSON Formatter | [/json-formatter](https://www.devutil.dev/json-formatter) | Format, validate, beautify & minify JSON |
| Base64 Encoder | [/base64-encoder](https://www.devutil.dev/base64-encoder) | Encode & decode Base64 strings |
| UUID Generator | [/uuid-generator](https://www.devutil.dev/uuid-generator) | Generate random UUID v4 identifiers |
| Diff Checker | [/diff-checker](https://www.devutil.dev/diff-checker) | Compare text differences with highlighting |
| Hash Generator | [/hash-generator](https://www.devutil.dev/hash-generator) | MD5, SHA-1, SHA-256, SHA-512 hashing |
| Password Generator | [/password-generator](https://www.devutil.dev/password-generator) | Generate strong random passwords |
| Regex Tester | [/regex-tester](https://www.devutil.dev/regex-tester) | Test JavaScript regular expressions live |
| URL Encoder | [/url-encoder](https://www.devutil.dev/url-encoder) | Encode & decode URL components |
| JWT Decoder | [/jwt-decoder](https://www.devutil.dev/jwt-decoder) | Decode & inspect JSON Web Tokens |
| Timestamp Converter | [/timestamp-converter](https://www.devutil.dev/timestamp-converter) | Convert Unix timestamps to dates |
| QR Code Generator | [/qr-code-generator](https://www.devutil.dev/qr-code-generator) | Create QR codes for URLs, WiFi, vCards |
| Color Picker | [/color-picker](https://www.devutil.dev/color-picker) | HEX, RGB, HSL color converter |
| Lorem Ipsum Generator | [/lorem-ipsum-generator](https://www.devutil.dev/lorem-ipsum-generator) | Generate placeholder text |

---

## ✨ Why DevUtil?

- **🔒 Privacy-first** — All processing is client-side. Your data never leaves your device.
- **⚡ Instant** — No server roundtrips. Results appear as you type.
- **📱 Responsive** — Works well on desktop and mobile.
- **💸 Always free** — No subscriptions, no paywalls, no ads.
- **🌐 No account required** — Open and use immediately.

---

## 🛠 Tech Stack

- **[Next.js](https://nextjs.org/)** (App Router) — framework
- **[React](https://react.dev/)** — UI
- **[Tailwind CSS](https://tailwindcss.com/)** — styling
- **[lucide-react](https://lucide.dev/)** — icons

---

## 🚀 Getting Started

**Requirements:** Node.js 18+, npm

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build && npm run start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📁 Project Structure

```
devutil-dev/
├── app/
│   ├── layout.jsx          # Root layout + global metadata
│   ├── page.jsx            # Homepage
│   ├── seo-config.js       # SEO metadata for all tools
│   ├── sitemap.js          # Auto-generated sitemap.xml
│   ├── robots.js           # Auto-generated robots.txt
│   └── [tool-slug]/
│       └── page.jsx        # Each tool page
├── components/
│   └── ToolPageWrapper.jsx # Shared SEO + FAQ wrapper
├── public/
│   └── llms.txt            # LLM-readable site index
└── README.md
```

---

## 🗺 Roadmap

### Near-term
- [ ] Improve tool search and discoverability
- [ ] Add file-based hashing for binary files
- [ ] Regex replace + quick presets
- [ ] URL normalizer and query editor
- [ ] CSS minifier
- [ ] Markdown previewer

### Long-term
- [ ] Blog with developer tutorials
- [ ] More conversion tools (YAML ↔ JSON, CSV ↔ JSON)
- [ ] Keyboard shortcuts

---

## 🤝 Contributing

Bug reports and feature requests are welcome via [GitHub Issues](https://github.com/sachinkasana/devutil-dev/issues).

For a new tool, open an issue with:
1. Tool name and description
2. Who it's for and why it's useful
3. Key inputs/outputs

For bugs, include steps to reproduce.

---

## 📄 License

MIT — see [LICENSE](./LICENSE)

---

## ☕ Support

If DevUtil saves you time, consider [buying Sachin a coffee](https://buymeacoffee.com/sachinkasana). It helps keep the tools free and maintained.

---

*DevUtil is an open-source project. All tools run client-side. No data is collected.*
