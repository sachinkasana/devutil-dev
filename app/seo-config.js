/**
 * DevUtil.dev — Centralized SEO Configuration
 * Drop this file in your /app directory.
 * Import toolSEO(slug) in each tool's page.jsx to get metadata + schema.
 */

export const SITE = {
  name: "DevUtil",
  url: "https://www.devutil.dev",
  description:
    "Free developer tools that run in your browser — JSON/SQL formatters, Base64, UUID, regex, JWT, color picker, and more. No signup. Your data never leaves your device.",
  twitter: "@devutil_dev", // update if you have one
  locale: "en_US",
};

/**
 * Per-tool SEO data.
 * Keys match your URL slugs: /json-formatter → "json-formatter"
 */
export const TOOLS = {
  "json-formatter": {
    title: "Free JSON Formatter Online — Beautify, Validate & Minify",
    shortTitle: "JSON Formatter",
    description:
      "Free online JSON formatter and validator. Beautify, minify, and fix JSON instantly in your browser. No signup — your data never leaves your device.",
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

  "sql-formatter": {
    title: "SQL Formatter & Beautifier — Format SQL Queries Online",
    shortTitle: "SQL Formatter",
    description:
      "Beautify, format, and minify SQL queries instantly. Improve readability with consistent indentation and keyword casing. 100% client-side SQL formatter.",
    keywords: [
      "sql formatter online",
      "sql beautifier",
      "format sql query",
      "sql minifier",
      "pretty sql",
      "sql query beautify",
    ],
    faq: [
      {
        q: "What does an SQL formatter do?",
        a: "An SQL formatter restructures SQL queries with predictable line breaks, indentation, and spacing so they are easier to read, debug, and review.",
      },
      {
        q: "Can this tool minify SQL too?",
        a: "Yes. You can switch between beautify and minify modes. Beautify makes SQL readable while minify removes extra whitespace for compact output.",
      },
      {
        q: "Is my SQL data uploaded anywhere?",
        a: "No. DevUtil formats SQL directly in your browser. No query text is sent to any server.",
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
    title: "UUID v4 & v7 Generator — Generate Unique IDs Online",
    shortTitle: "UUID Generator",
    description:
      "Generate UUID v4 (random) and UUID v7 (time-ordered) or GUID values instantly. Bulk-generate up to 500 IDs. Free, no login, fully client-side.",
    keywords: [
      "uuid generator",
      "generate uuid",
      "random uuid",
      "uuid v4 online",
      "uuid v7",
      "guid generator",
      "unique id generator",
      "time ordered uuid",
    ],
    faq: [
      {
        q: "What is the difference between UUID v1 and UUID v4?",
        a: "UUID v1 is generated from the current timestamp and the device's MAC address — it is sequential and traceable. UUID v4 is generated from random or pseudo-random numbers, making it unpredictable and privacy-safe. v4 is recommended for most use cases.",
      },
      {
        q: "What is UUID v7?",
        a: "UUID v7 (RFC 9562) embeds a 48-bit Unix timestamp in milliseconds plus random bits. IDs roughly sort by creation time, which helps as database primary keys compared with random v4 UUIDs.",
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
    title: "Free Strong Password Generator Online — Secure & Random",
    shortTitle: "Password Generator",
    description:
      "Generate strong random passwords online. Customize length, symbols, numbers, and uppercase. Created in your browser — never stored or uploaded. Free, no signup.",
    keywords: [
      "strong password generator",
      "random password generator",
      "secure password generator",
      "password maker online",
      "generate password free",
      "free password generator",
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
    title: "Unix Timestamp Converter Online — Epoch to Date Free",
    shortTitle: "Timestamp Converter",
    description:
      "Free Unix timestamp converter: epoch to date and date to epoch. Supports seconds and milliseconds. Instant, client-side — no signup.",
    keywords: [
      "unix timestamp converter",
      "epoch to date",
      "convert timestamp online",
      "unix epoch converter",
      "timestamp to date",
      "epoch converter",
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
    title: "Free Color Picker Online — HEX to RGB & HSL Converter",
    shortTitle: "Color Picker",
    description:
      "Free online color picker and HEX to RGB / HSL converter. Pick a color, copy codes instantly, generate tints & shades. 100% client-side — no signup.",
    keywords: [
      "color picker online",
      "hex to rgb converter",
      "rgb to hex",
      "hsl color converter",
      "free color picker",
      "hex color picker",
      "color code converter",
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

  "yaml-json-converter": {
    title: "YAML to JSON Converter — Bidirectional YAML ↔ JSON Online",
    shortTitle: "YAML ↔ JSON Converter",
    description:
      "Convert YAML to JSON and JSON to YAML instantly in your browser. Free, private, client-side converter with indent options and clear error messages.",
    keywords: [
      "yaml to json",
      "json to yaml",
      "yaml json converter",
      "convert yaml online",
      "yaml to json converter",
      "json yaml converter",
    ],
    faq: [
      {
        q: "What is YAML to JSON conversion used for?",
        a: "Developers convert YAML to JSON when moving between config formats, APIs, Kubernetes manifests, CI pipelines, and application settings that expect different serialization formats.",
      },
      {
        q: "Does this tool upload my data?",
        a: "No. Conversion runs entirely in your browser. Your YAML and JSON never leave your device.",
      },
      {
        q: "Can I convert JSON back to YAML?",
        a: "Yes. Switch direction to JSON → YAML, paste JSON, and convert. Indentation is configurable.",
      },
    ],
  },

  "cron-generator": {
    title: "Cron Expression Generator — Build & Explain Cron Online",
    shortTitle: "Cron Generator",
    description:
      "Build standard 5-field cron expressions visually, use common presets, and get a human-readable explanation. Free online cron generator — fully client-side.",
    keywords: [
      "cron expression generator",
      "cron generator online",
      "crontab generator",
      "cron schedule builder",
      "cron expression explainer",
      "crontab helper",
    ],
    faq: [
      {
        q: "What is a cron expression?",
        a: "A cron expression is a schedule string used by Unix-like systems and many job runners. The common 5-field format is: minute hour day-of-month month day-of-week.",
      },
      {
        q: "What timezone do cron jobs use?",
        a: "Most system crons run in the server's local timezone unless configured otherwise. Always confirm the timezone of your scheduler (server, GitHub Actions, cloud jobs).",
      },
      {
        q: "Is this a standard 5-field cron format?",
        a: "Yes. DevUtil uses the classic 5-field cron format (minute, hour, day of month, month, day of week) without a seconds field.",
      },
    ],
  },

  "case-converter": {
    title: "Case Converter — camelCase, snake_case, kebab-case Online",
    shortTitle: "Case Converter",
    description:
      "Convert text between camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, and more instantly. Free developer case converter.",
    keywords: [
      "case converter",
      "camelcase converter",
      "snake case converter",
      "kebab case converter",
      "pascal case converter",
      "text case converter online",
    ],
    faq: [
      {
        q: "What case formats are supported?",
        a: "DevUtil supports camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, Sentence case, lower case, and UPPER CASE.",
      },
      {
        q: "Will my text leave my browser?",
        a: "No. Case conversion happens locally in JavaScript. Nothing is uploaded.",
      },
      {
        q: "How does camelCase conversion work?",
        a: "The converter splits on spaces, underscores, hyphens, and word boundaries, then joins words with the first word lowercased and subsequent words capitalized.",
      },
    ],
  },

  "xml-formatter": {
    title: "XML Formatter & Beautifier — Format and Minify XML Online",
    shortTitle: "XML Formatter",
    description:
      "Beautify, format, validate, and minify XML instantly in your browser. Improve readability with consistent indentation. 100% client-side XML formatter.",
    keywords: [
      "xml formatter online",
      "xml beautifier",
      "format xml",
      "xml minifier",
      "pretty print xml",
      "xml validator",
    ],
    faq: [
      {
        q: "What does an XML formatter do?",
        a: "An XML formatter restructures XML with consistent indentation and line breaks so documents are easier to read, debug, and review.",
      },
      {
        q: "Can I minify XML too?",
        a: "Yes. Switch to minify mode to remove unnecessary whitespace and produce compact XML.",
      },
      {
        q: "Is my XML sent to a server?",
        a: "No. Formatting and validation run entirely in your browser.",
      },
    ],
  },

  "html-entity-encoder": {
    title: "HTML Entity Encoder & Decoder — Escape HTML Online",
    shortTitle: "HTML Entity Encoder",
    description:
      "Encode special characters to HTML entities or decode entities back to text. Free online HTML escape tool — fully client-side.",
    keywords: [
      "html entity encoder",
      "html entity decoder",
      "html escape online",
      "encode html entities",
      "html unescape",
      "html special characters",
    ],
    faq: [
      {
        q: "What are HTML entities?",
        a: "HTML entities are encoded representations of characters that have special meaning in HTML, such as &lt; for < and &amp; for &.",
      },
      {
        q: "When should I encode HTML entities?",
        a: "Encode when displaying user-provided or untrusted text in HTML so browsers treat it as text instead of markup.",
      },
      {
        q: "Is encoding the same as escaping for XSS?",
        a: "HTML entity encoding is one important part of XSS prevention for HTML text contexts, but secure apps also need context-aware escaping, CSP, and safe templating practices.",
      },
    ],
  },

  "markdown-preview": {
    title: "Markdown Preview — Live Markdown to HTML Online",
    shortTitle: "Markdown Preview",
    description:
      "Preview Markdown as HTML instantly in your browser. Edit on the left, see rendered output on the right. Copy Markdown or HTML. 100% client-side.",
    keywords: [
      "markdown preview online",
      "markdown to html",
      "live markdown editor",
      "markdown viewer",
      "md preview",
    ],
    faq: [
      {
        q: "What is a Markdown previewer?",
        a: "A Markdown previewer shows how Markdown text will look when rendered as HTML, so you can write and check formatting in real time.",
      },
      {
        q: "Does this tool upload my Markdown?",
        a: "No. Rendering happens entirely in your browser. Your Markdown never leaves your device.",
      },
      {
        q: "Can I copy HTML output?",
        a: "Yes. You can copy either the Markdown source or the generated HTML with one click.",
      },
    ],
  },

  "number-base-converter": {
    title: "Number Base Converter — Binary, Octal, Decimal, Hex Online",
    shortTitle: "Number Base Converter",
    description:
      "Convert numbers between binary, octal, decimal, and hexadecimal instantly. Free developer base converter — fully client-side.",
    keywords: [
      "number base converter",
      "binary to decimal",
      "hex to decimal converter",
      "octal converter",
      "hexadecimal converter online",
    ],
    faq: [
      {
        q: "What number bases are supported?",
        a: "DevUtil supports binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16).",
      },
      {
        q: "Is conversion done in my browser?",
        a: "Yes. All conversions run locally in JavaScript with no server upload.",
      },
      {
        q: "How do I convert hex to decimal?",
        a: "Enter a hex value in the hexadecimal field (with or without 0x). The decimal field updates automatically.",
      },
    ],
  },

  "json-csv-converter": {
    title: "JSON to CSV Converter — Bidirectional JSON ↔ CSV Online",
    shortTitle: "JSON ↔ CSV Converter",
    description:
      "Convert JSON arrays to CSV and CSV back to JSON instantly. Free, private, client-side converter for APIs, spreadsheets, and data exports.",
    keywords: [
      "json to csv",
      "csv to json",
      "json csv converter",
      "convert json to csv online",
      "csv json converter",
    ],
    faq: [
      {
        q: "What JSON format works best for CSV conversion?",
        a: "An array of flat objects works best, where each object becomes a row and object keys become column headers.",
      },
      {
        q: "Can I convert CSV back to JSON?",
        a: "Yes. Switch to CSV → JSON, paste CSV with a header row, and convert.",
      },
      {
        q: "Is my data uploaded anywhere?",
        a: "No. Conversion runs entirely in your browser.",
      },
    ],
  },

};


export const GUIDES = {
  "format-json-online": {
    title: "How to Format JSON Online (Safely) — DevUtil Guide",
    shortTitle: "How to Format JSON Online",
    description:
      "Learn how to format, validate, and minify JSON in your browser without uploading data. Includes common errors and a free JSON formatter.",
    tool: "json-formatter",
  },
  "format-sql-online": {
    title: "How to Format SQL Queries Online — DevUtil Guide",
    shortTitle: "How to Format SQL Online",
    description:
      "Beautify messy SQL for reviews and debugging. Learn when to minify SQL and how to format queries privately in your browser.",
    tool: "sql-formatter",
  },
  "cron-expression-examples": {
    title: "Cron Expression Examples — Common Schedules Explained",
    shortTitle: "Cron Expression Examples",
    description:
      "Practical cron examples for hourly, daily, weekly, and monthly jobs. Learn the 5-field format and build expressions visually.",
    tool: "cron-generator",
  },
  "yaml-vs-json": {
    title: "YAML vs JSON — When to Use Each (With Converter)",
    shortTitle: "YAML vs JSON",
    description:
      "Compare YAML and JSON for configs, APIs, and Kubernetes. See differences and convert between formats in your browser.",
    tool: "yaml-json-converter",
  },
};

/** Prefer a dedicated OG image when present; otherwise fall back to home. */
function toolOgImage(slug) {
  if (slug === "base64-encoder") {
    return `${SITE.url}/images/base64-encoder-decoder.png`;
  }
  if (TOOLS[slug]) {
    return `${SITE.url}/images/${slug}.png`;
  }
  return `${SITE.url}/images/devutil-home.png`;
}

/**
 * Returns the full Next.js metadata object for a tool page.
 * Usage: export const metadata = toolMetadata("json-formatter");
 */
export function toolMetadata(slug) {
  const tool = TOOLS[slug];
  if (!tool) return {};
  const url = `${SITE.url}/${slug}`;
  const image = toolOgImage(slug);
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: tool.shortTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Returns JSON-LD structured data for a tool page (SoftwareApplication + Breadcrumb + FAQ).
 */
export function toolJsonLd(slug) {
  const tool = TOOLS[slug];
  if (!tool) return null;
  const url = `${SITE.url}/${slug}`;
  const image = toolOgImage(slug);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.shortTitle,
      description: tool.description,
      url,
      image,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: tool.shortTitle,
          item: url,
        },
      ],
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
