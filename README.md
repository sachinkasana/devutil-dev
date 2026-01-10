# DevUtil

DevUtil (https://devutil.dev) is a fast, privacy-first collection of developer utilities that run fully in the browser. No logins, no tracking, no server-side processing of user data.

## Product vision

Build the most trustworthy and delightful toolbox for developers: instant results, zero data leakage, and a clean, focused UI that works on any device.

## Features

Current tools:
- JSON Formatter (format, minify, repair, convert to XML/CSV/YAML)
- Base64 Encoder/Decoder
- UUID Generator
- Hash Generator (MD5, SHA-1, SHA-256, SHA-512)
- Regex Tester
- URL Encoder/Decoder
- JWT Decoder
- Timestamp Converter

Product principles:
- Privacy-first: all processing stays in the browser
- Fast: no server roundtrips
- Accessible: responsive UI with readable layouts
- Reliable: deterministic outputs and clear error states

## Tech stack

- Next.js (App Router)
- React
- Tailwind CSS
- lucide-react icons

## Getting started

Requirements:
- Node.js 18+
- npm

Install and run:

```bash
npm install
npm run dev
```

Build and start:

```bash
npm run build
npm run start
```

## Project structure

- `app/` Next.js App Router pages
- `app/*/page.jsx` Tool pages
- `app/*/head.jsx` SEO metadata
- `app/globals.css` Global styles

## Deployment

The site is designed to be deployed to any Next.js-compatible platform. Update `metadataBase` in `app/layout.jsx` if the canonical domain changes.

## Roadmap

Near-term:
- Improve tool discoverability and search
- Add file-based hashing for binary files
- Add regex replace and quick presets
- Add URL normalize and query editor

Long-term:
- Expand tool catalog based on feedback
- Team and enterprise onboarding
- Documentation and educational content

## Contributing

If you want to contribute, open an issue with the tool idea or bug report. For major changes, propose a short design plan first.

## License

MIT. See `LICENSE`.
