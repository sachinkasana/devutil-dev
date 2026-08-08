'use client';

import { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';

const SAMPLE_MARKDOWN = `# Markdown Preview

Welcome to **DevUtil** — a *private*, browser-only markdown previewer.

## Features

- Headings, **bold**, and *italic*
- [Links](https://www.devutil.dev)
- Inline \`code\` and fenced blocks
- Blockquotes

> Escape raw HTML in your input. Only generated tags are rendered.

\`\`\`
function hello() {
  return "world";
}
\`\`\`

1. First item
2. Second item
3. Third item
`;

/** Escape HTML special characters so raw HTML in input is never executed. */
const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Inline markdown → safe HTML (input must already be escaped). */
const renderInline = (text: string): string => {
  let html = escapeHtml(text);

  // Links: [text](url) — only allow http(s) and mailto
  html = html.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_match, label: string, url: string) => {
      const safeUrl = url.trim();
      if (!/^(https?:|mailto:)/i.test(safeUrl)) {
        return label;
      }
      return `<a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">${label}</a>`;
    }
  );

  // Bold first so remaining single * / _ become italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="rounded bg-slate-100 px-1 py-0.5 text-[0.9em] font-mono">$1</code>'
  );

  return html;
};

/**
 * Simple zero-dependency markdown → HTML renderer.
 * Escapes all raw HTML; only emits a fixed set of generated tags.
 */
export const markdownToHtml = (markdown: string): string => {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const htmlParts: string[] = [];
  let i = 0;

  const flushParagraph = (buffer: string[]) => {
    if (buffer.length === 0) return;
    htmlParts.push(`<p class="mb-3 leading-relaxed">${renderInline(buffer.join(' '))}</p>`);
    buffer.length = 0;
  };

  let paragraph: string[] = [];

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith('```')) {
      flushParagraph(paragraph);
      i += 1;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }
      // skip closing fence
      if (i < lines.length) i += 1;
      htmlParts.push(
        `<pre class="mb-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100"><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`
      );
      continue;
    }

    // Blank line ends paragraph
    if (line.trim() === '') {
      flushParagraph(paragraph);
      i += 1;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph(paragraph);
      const level = headingMatch[1].length;
      const sizes = [
        'text-3xl font-bold mt-2 mb-3',
        'text-2xl font-bold mt-2 mb-3',
        'text-xl font-semibold mt-2 mb-2',
        'text-lg font-semibold mt-2 mb-2',
        'text-base font-semibold mt-1 mb-2',
        'text-sm font-semibold mt-1 mb-2'
      ];
      htmlParts.push(
        `<h${level} class="${sizes[level - 1]} text-slate-900">${renderInline(headingMatch[2])}</h${level}>`
      );
      i += 1;
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      flushParagraph(paragraph);
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i += 1;
      }
      htmlParts.push(
        `<blockquote class="mb-4 border-l-4 border-slate-300 pl-4 italic text-slate-600">${renderInline(quoteLines.join(' '))}</blockquote>`
      );
      continue;
    }

    // Unordered list
    if (/^[-*+]\s+/.test(line)) {
      flushParagraph(paragraph);
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*+]\s+/, ''));
        i += 1;
      }
      htmlParts.push(
        `<ul class="mb-4 list-disc space-y-1 pl-6">${items
          .map((item) => `<li>${renderInline(item)}</li>`)
          .join('')}</ul>`
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      flushParagraph(paragraph);
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i += 1;
      }
      htmlParts.push(
        `<ol class="mb-4 list-decimal space-y-1 pl-6">${items
          .map((item) => `<li>${renderInline(item)}</li>`)
          .join('')}</ol>`
      );
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      flushParagraph(paragraph);
      htmlParts.push('<hr class="my-6 border-slate-200" />');
      i += 1;
      continue;
    }

    paragraph.push(line);
    i += 1;
  }

  flushParagraph(paragraph);
  return htmlParts.join('\n');
};

export default function MarkdownPreviewTool() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const html = useMemo(() => markdownToHtml(markdown), [markdown]);

  const handleCopyMarkdown = async () => {
    if (!markdown) return;
    await navigator.clipboard.writeText(markdown);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleCopyHtml = async () => {
    if (!html) return;
    await navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleClear = () => {
    setMarkdown('');
    setCopiedMd(false);
    setCopiedHtml(false);
  };

  const handleSample = () => {
    setMarkdown(SAMPLE_MARKDOWN);
    setCopiedMd(false);
    setCopiedHtml(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSample}
          data-analytics-event="markdown_preview_sample"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Load sample
        </button>
        <button
          type="button"
          onClick={handleClear}
          data-analytics-event="markdown_preview_clear"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleCopyMarkdown}
          disabled={!markdown}
          data-analytics-event="markdown_preview_copy_md"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition inline-flex items-center gap-2"
        >
          {copiedMd ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedMd ? 'Copied' : 'Copy Markdown'}
        </button>
        <button
          type="button"
          onClick={handleCopyHtml}
          disabled={!html}
          data-analytics-event="markdown_preview_copy_html"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition inline-flex items-center gap-2"
        >
          {copiedHtml ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedHtml ? 'Copied' : 'Copy HTML'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Markdown</label>
          <textarea
            value={markdown}
            onChange={(event) => setMarkdown(event.target.value)}
            placeholder="Type or paste Markdown here..."
            data-analytics-event="markdown_preview_input"
            className="w-full h-[420px] rounded-xl border border-slate-300 px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            spellCheck={false}
          />
          <p className="text-xs text-slate-500">Characters: {markdown.length}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Live preview</label>
          <div
            className="w-full h-[420px] overflow-y-auto rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800"
            data-analytics-event="markdown_preview_output"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <p className="text-xs text-slate-500">Preview updates as you type</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Rendering runs locally in your browser. Raw HTML in your Markdown is escaped; only
        generated tags are shown.
      </div>
    </div>
  );
}
