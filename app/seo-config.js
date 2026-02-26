/**
 * DevUtil.dev — Centralized SEO Configuration
 * Drop this file in your /app directory.
 * Import toolSEO(slug) in each tool's page.jsx to get metadata + schema.
 */

export const SITE = {
  name: "DevUtil",
  url: "https://www.devutil.dev",
  description:
    "Free, privacy-first developer tools that run 100% in your browser. No login, no data sent to servers. Format JSON, encode Base64, generate UUIDs, and more.",
  twitter: "@devutil_dev", // update if you have one
  locale: "en_US",
};

/**
 * Per-tool SEO data.
 * Keys match your URL slugs: /json-formatter → "json-formatter"
 */
export const TOOLS = {
  "json-formatter": {
    title: "JSON Formatter & Validator — Free Online Beautifier",
    shortTitle: "JSON Formatter",
    description:
      "Format, validate, minify, and beautify JSON instantly in your browser. Supports error detection and pretty-print with custom indentation. 100% client-side — your data never leaves your device.",
    keywords: [
      "json formatter online",
      "json beautifier",
      "json validator",
      "format json",
      "json pretty print",
      "json minify",
      "json viewer",
    ],
    faq: [
      {
        q: "What is a JSON Formatter?",
        a: "A JSON Formatter takes raw or minified JSON text and reformats it with consistent indentation and line breaks to make it human-readable. It also validates that the JSON is syntactically correct.",
      },
      {
        q: "Is it safe to paste sensitive data into DevUtil's JSON Formatter?",
        a: "Yes. All processing happens entirely in your browser using JavaScript. No data is ever sent to any server. Your JSON stays on your device at all times.",
      },
      {
        q: "What causes 'Unexpected token' errors in JSON?",
        a: "Common causes include trailing commas (not allowed in JSON), single quotes instead of double quotes, missing quotes around keys, or unescaped special characters like backslashes.",
      },
      {
        q: "Can I format JSON with 2-space or 4-space indentation?",
        a: "Yes, DevUtil's JSON Formatter lets you choose your preferred indentation level — 2 spaces, 4 spaces, or tabs.",
      },
      {
        q: "What is the difference between JSON format and JSON minify?",
        a: "Formatting (beautifying) adds indentation and line breaks to make JSON readable. Minifying removes all whitespace to reduce file size — useful for production APIs and storage.",
      },
    ],
  },

  "base64-encoder": {
    title: "Base64 Encoder & Decoder — Free Online Tool",
    shortTitle: "Base64 Encoder",
    description:
      "Encode text to Base64 or decode Base64 strings back to plain text instantly. Supports standard and URL-safe Base64. 100% client-side processing.",
    keywords: [
      "base64 encoder online",
      "base64 decoder",
      "encode base64",
      "decode base64 string",
      "base64 converter",
      "base64 online",
    ],
    faq: [
      {
        q: "What is Base64 encoding used for?",
        a: "Base64 is used to encode binary data (images, files) as ASCII text so it can be safely transmitted in text-based formats like JSON, XML, HTML, or email. It is widely used in data URIs, HTTP Basic Auth, and JWT tokens.",
      },
      {
        q: "Is Base64 encoding the same as encryption?",
        a: "No. Base64 is encoding, not encryption. It is easily reversible by anyone. Never use it to secure sensitive data — use proper encryption algorithms instead.",
      },
      {
        q: "What is the difference between standard and URL-safe Base64?",
        a: "Standard Base64 uses + and / characters which can break in URLs. URL-safe Base64 replaces + with - and / with _, making it safe to use in query strings and path parameters.",
      },
    ],
  },

  "uuid-generator": {
    title: "UUID Generator — Generate v4 UUIDs Instantly Online",
    shortTitle: "UUID Generator",
    description:
      "Generate cryptographically random UUID v4 identifiers instantly. Copy a single UUID or bulk-generate hundreds at once. Free, no login, fully client-side.",
    keywords: [
      "uuid generator",
      "generate uuid",
      "random uuid",
      "uuid v4 online",
      "guid generator",
      "unique id generator",
    ],
    faq: [
      {
        q: "What is the difference between UUID v1 and UUID v4?",
        a: "UUID v1 is generated from the current timestamp and the device's MAC address — it is sequential and traceable. UUID v4 is generated from random or pseudo-random numbers, making it unpredictable and privacy-safe. v4 is recommended for most use cases.",
      },
      {
        q: "What is the difference between a UUID and a GUID?",
        a: "GUID (Globally Unique Identifier) is Microsoft's implementation of the UUID standard. They are functionally identical — a UUID is a GUID and vice versa.",
      },
      {
        q: "Are UUIDs truly unique — can two be the same?",
        a: "The probability of generating two identical UUID v4 values is astronomically small (1 in 2¹²²). In practice, UUIDs are treated as globally unique.",
      },
    ],
  },

  "diff-checker": {
    title: "Text Diff Checker — Compare Text Differences Online",
    shortTitle: "Diff Checker",
    description:
      "Compare two pieces of text side-by-side and instantly see added, removed, and changed lines highlighted. Free online diff tool, no data sent to servers.",
    keywords: [
      "diff checker online",
      "text diff",
      "compare text online",
      "find text differences",
      "text comparison tool",
    ],
    faq: [
      {
        q: "What does a diff checker do?",
        a: "A diff checker compares two versions of text and highlights the differences — lines that were added (green), removed (red), or changed. It is commonly used to review code changes, document edits, and data discrepancies.",
      },
      {
        q: "Can I use the diff checker to compare code files?",
        a: "Yes. Paste any text — source code, JSON, SQL, markdown, prose — into both panels and DevUtil will highlight every difference line by line.",
      },
    ],
  },

  "hash-generator": {
    title: "Hash Generator — MD5, SHA-1, SHA-256, SHA-512 Online",
    shortTitle: "Hash Generator",
    description:
      "Generate cryptographic hashes from text instantly. Supports MD5, SHA-1, SHA-256, and SHA-512 algorithms. All hashing runs in your browser — no data sent to servers.",
    keywords: [
      "sha256 hash generator",
      "md5 hash online",
      "sha1 generator",
      "hash text online",
      "sha512 generator",
      "cryptographic hash",
    ],
    faq: [
      {
        q: "What is SHA-256 used for?",
        a: "SHA-256 is a cryptographic hash function used in security applications, digital signatures, SSL certificates, and blockchain (including Bitcoin). It produces a 256-bit (64 hex character) hash.",
      },
      {
        q: "What is the difference between MD5 and SHA-256?",
        a: "MD5 produces a 128-bit hash and is fast but cryptographically broken — do not use it for security. SHA-256 produces a 256-bit hash and is considered secure for most cryptographic uses.",
      },
      {
        q: "Can two different inputs produce the same hash?",
        a: "Theoretically yes (called a collision), but for SHA-256 this is computationally infeasible. MD5 and SHA-1 have known collision vulnerabilities, which is why they are deprecated for security uses.",
      },
    ],
  },

  "password-generator": {
    title: "Password Generator — Create Strong Secure Passwords",
    shortTitle: "Password Generator",
    description:
      "Generate strong, random passwords instantly. Customize length, and include uppercase, numbers, and special characters. Generated entirely in your browser — never stored or transmitted.",
    keywords: [
      "strong password generator",
      "random password generator",
      "secure password generator",
      "password maker online",
      "generate password free",
    ],
    faq: [
      {
        q: "How long should a strong password be?",
        a: "Security experts recommend at least 16 characters for important accounts. Longer is always better. A 20+ character random password with mixed characters is essentially uncrackable with current technology.",
      },
      {
        q: "Does DevUtil store or log generated passwords?",
        a: "No. Passwords are generated entirely in your browser using the Web Crypto API. Nothing is sent to any server, logged, or stored anywhere.",
      },
    ],
  },

  "regex-tester": {
    title: "Regex Tester — Test & Debug Regular Expressions Online",
    shortTitle: "Regex Tester",
    description:
      "Test, debug, and build regular expressions in real time with match highlighting. Supports JavaScript regex syntax with flags. Free, no signup required.",
    keywords: [
      "regex tester online",
      "test regex",
      "regular expression tester",
      "regex validator",
      "regex debugger",
      "javascript regex",
    ],
    faq: [
      {
        q: "What regex flavour does DevUtil support?",
        a: "DevUtil's Regex Tester uses JavaScript's built-in regex engine, which follows the ECMAScript specification. It supports flags like g (global), i (case-insensitive), m (multiline), s (dotAll), and u (unicode).",
      },
      {
        q: "How do I test a regex for multiple matches?",
        a: "Enable the g (global) flag and DevUtil will highlight every match in your test string, not just the first one.",
      },
    ],
  },

  "url-encoder": {
    title: "URL Encoder & Decoder — Percent Encoding Online",
    shortTitle: "URL Encoder",
    description:
      "Encode special characters in URLs using percent-encoding, or decode encoded URL components back to plain text. Free, instant, and fully client-side.",
    keywords: [
      "url encoder online",
      "url decoder",
      "percent encoding",
      "encode url",
      "url encode decode",
    ],
    faq: [
      {
        q: "What is URL encoding and why is it needed?",
        a: "URL encoding (percent-encoding) converts special characters in a URL to a %XX hex format so they can be safely transmitted. Spaces become %20, ampersands become %26, etc. Without encoding, special characters can break URL parsing.",
      },
      {
        q: "What is the difference between encodeURI and encodeURIComponent?",
        a: "encodeURI encodes a full URL, preserving characters like /, :, and ? that have meaning in URLs. encodeURIComponent encodes a URL component (like a query value), encoding those structural characters too. DevUtil encodes components by default.",
      },
    ],
  },

  "jwt-decoder": {
    title: "JWT Decoder — Decode & Inspect JSON Web Tokens Online",
    shortTitle: "JWT Decoder",
    description:
      "Paste any JWT and instantly decode its header, payload, and signature. Inspect claims, expiry, and issuer without verification. 100% client-side — tokens never leave your browser.",
    keywords: [
      "jwt decoder online",
      "decode jwt token",
      "jwt parser",
      "inspect jwt",
      "json web token decoder",
    ],
    faq: [
      {
        q: "Is it safe to decode a JWT in an online tool?",
        a: "With DevUtil, yes — decoding happens entirely in your browser. Your token is never sent to any server. That said, avoid decoding JWTs containing sensitive production data on any shared or public device.",
      },
      {
        q: "Can DevUtil verify a JWT signature?",
        a: "DevUtil decodes and displays the JWT contents but does not verify the signature cryptographically (that requires your secret key or public key, which you should never share). Use your backend or a trusted library for signature verification.",
      },
      {
        q: "What are the three parts of a JWT?",
        a: "A JWT consists of three Base64URL-encoded parts separated by dots: the Header (algorithm and token type), the Payload (claims/data), and the Signature (used to verify authenticity).",
      },
    ],
  },

  "timestamp-converter": {
    title: "Unix Timestamp Converter — Epoch to Date Online",
    shortTitle: "Timestamp Converter",
    description:
      "Convert Unix timestamps to human-readable dates, or convert a date/time to a Unix epoch timestamp. Supports seconds and milliseconds. Free, instant, client-side.",
    keywords: [
      "unix timestamp converter",
      "epoch to date",
      "convert timestamp online",
      "unix epoch converter",
      "timestamp to date",
    ],
    faq: [
      {
        q: "What is a Unix timestamp?",
        a: "A Unix timestamp (or epoch time) is the number of seconds (or milliseconds) elapsed since January 1, 1970, 00:00:00 UTC. It is the universal standard for representing time in programming.",
      },
      {
        q: "Does the timestamp converter handle milliseconds?",
        a: "Yes. DevUtil's converter auto-detects whether your input is in seconds (10 digits) or milliseconds (13 digits) and converts accordingly.",
      },
    ],
  },

  "qr-code-generator": {
    title: "QR Code Generator — Create QR Codes Free Online",
    shortTitle: "QR Code Generator",
    description:
      "Generate QR codes for URLs, plain text, WiFi credentials, and vCards instantly. Download as PNG. Free, no watermarks, no login required.",
    keywords: [
      "qr code generator free",
      "create qr code online",
      "qr code maker",
      "generate qr code",
      "qr code for url",
      "wifi qr code",
    ],
    faq: [
      {
        q: "Can I generate a QR code for WiFi credentials?",
        a: "Yes. DevUtil's QR Code Generator supports WiFi QR codes. Just enter your SSID, password, and security type and scan the code with any smartphone to connect automatically.",
      },
      {
        q: "What file format can I download the QR code in?",
        a: "DevUtil generates QR codes as PNG images, which can be printed, embedded in documents, or shared digitally.",
      },
    ],
  },

  "color-picker": {
    title: "Color Picker — HEX, RGB, HSL Converter Online",
    shortTitle: "Color Picker",
    description:
      "Pick colors visually and instantly convert between HEX, RGB, and HSL formats. Copy color codes in one click. Free developer color tool.",
    keywords: [
      "color picker online",
      "hex to rgb converter",
      "rgb to hex",
      "hsl color converter",
      "color code converter",
      "color picker tool",
    ],
    faq: [
      {
        q: "How do I convert a HEX color to RGB?",
        a: "Paste your HEX code (e.g. #1A56DB) into DevUtil's Color Picker and it instantly shows the equivalent RGB and HSL values. You can also start from RGB or HSL and get the HEX code.",
      },
    ],
  },

  "lorem-ipsum-generator": {
    title: "Lorem Ipsum Generator — Placeholder Text Online",
    shortTitle: "Lorem Ipsum Generator",
    description:
      "Generate Lorem Ipsum placeholder text for designs and mockups. Choose word count, paragraph count, or sentence count. Instant, free, no ads.",
    keywords: [
      "lorem ipsum generator",
      "placeholder text generator",
      "dummy text generator",
      "lorem ipsum online",
    ],
    faq: [
      {
        q: "What is Lorem Ipsum used for?",
        a: "Lorem Ipsum is placeholder text used in graphic design and web development to fill layouts before final copy is ready. It helps designers focus on visual presentation without being distracted by readable content.",
      },
    ],
  },
};

/**
 * Returns the full Next.js metadata object for a tool page.
 * Usage in page.jsx:  export const metadata = toolMetadata("json-formatter");
 */
export function toolMetadata(slug) {
  const tool = TOOLS[slug];
  if (!tool) return {};
  const url = `${SITE.url}/${slug}`;
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
    },
  };
}

/**
 * Returns JSON-LD structured data for a tool page.
 * Renders as a <script type="application/ld+json"> in your page.
 */
export function toolJsonLd(slug) {
  const tool = TOOLS[slug];
  if (!tool) return null;
  const url = `${SITE.url}/${slug}`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `${tool.shortTitle} — ${SITE.name}`,
      description: tool.description,
      url,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      provider: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
      },
    },
  ];

  if (tool.faq && tool.faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tool.faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });
  }

  return schemas;
}
