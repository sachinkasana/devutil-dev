'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Diff,
  Copy,
  Check,
  Download,
  ArrowLeftRight,
  RefreshCw,
  Upload,
  Trash2,
  FileText,
  Columns2,
  LayoutList,
  ChevronDown
} from 'lucide-react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection, placeholder as cmPlaceholder } from '@codemirror/view';
import { history, defaultKeymap, historyKeymap } from '@codemirror/commands';
import { bracketMatching, foldGutter, foldKeymap, indentOnInput, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { json as jsonLanguage } from '@codemirror/lang-json';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = ['.txt', '.json', '.xml', '.js', '.css', '.html', '.md'];
const LINE_HEIGHT = 24;

const sampleLeft = `const config = {
  name: "DevUtil",
  version: "1.0.0",
  features: ["diff", "format", "encode"],
  privacy: true
};

function greet(name) {
  return \`Hello, \${name}!\`;
}
`;

const sampleRight = `const config = {
  name: "DevUtil",
  version: "1.1.0",
  features: ["diff", "format", "encode", "hash"],
  privacy: true,
  mode: "client-only"
};

function greet(name) {
  return \`Hello, \${name}! Welcome back.\`;
}
`;

const normalizeLine = (line, options) => {
  let value = line;
  if (options.ignoreWhitespace) {
    value = value.replace(/\s+/g, ' ').trim();
  }
  if (!options.caseSensitive) {
    value = value.toLowerCase();
  }
  return value;
};

const normalizeText = (text, options) => {
  let value = text.replace(/\r\n/g, '\n');
  if (options.ignoreLineBreaks) {
    value = value.replace(/\n+/g, ' ');
  }
  return value;
};

const splitLines = (text) => (text === '' ? [] : text.split('\n'));

const buildLineData = (text, options) => {
  const normalizedText = normalizeText(text, options);
  const rawLines = splitLines(normalizedText);
  const displayLines = options.ignoreWhitespace
    ? rawLines.map((line) => line.replace(/\s+/g, ' ').trim())
    : rawLines;
  const keyLines = rawLines.map((line) => normalizeLine(line, options));
  return { rawLines, displayLines, keyLines };
};

const diffSequence = (a, b, equals) => {
  const N = a.length;
  const M = b.length;

  if (N === 0 && M === 0) return [];
  if (N === 0) {
    return b.map((_, index) => ({ type: 'insert', bIndex: index }));
  }
  if (M === 0) {
    return a.map((_, index) => ({ type: 'delete', aIndex: index }));
  }

  const max = N + M;
  const trace = [];
  const v = new Map();
  v.set(1, 0);

  for (let d = 0; d <= max; d += 1) {
    const current = new Map();
    for (let k = -d; k <= d; k += 2) {
      const vKMinus = v.get(k - 1) ?? -Infinity;
      const vKPlus = v.get(k + 1) ?? -Infinity;
      let x;
      if (k === -d || (k !== d && vKMinus < vKPlus)) {
        x = vKPlus;
      } else {
        x = vKMinus + 1;
      }
      let y = x - k;
      while (x < N && y < M && equals(a[x], b[y])) {
        x += 1;
        y += 1;
      }
      current.set(k, x);
      if (x >= N && y >= M) {
        trace.push(current);
        return buildDiff(trace, a, b);
      }
    }
    trace.push(current);
    v.clear();
    current.forEach((value, key) => v.set(key, value));
  }
  return [];
};

const buildDiff = (trace, a, b) => {
  const ops = [];
  let x = a.length;
  let y = b.length;

  for (let d = trace.length - 1; d >= 0; d -= 1) {
    const v = trace[d];
    const k = x - y;
    let prevK;
    const vKMinus = v.get(k - 1) ?? -Infinity;
    const vKPlus = v.get(k + 1) ?? -Infinity;

    if (k === -d || (k !== d && vKMinus < vKPlus)) {
      prevK = k + 1;
    } else {
      prevK = k - 1;
    }

    const prevX = v.get(prevK) ?? 0;
    const prevY = prevX - prevK;

    while (x > prevX && y > prevY) {
      ops.push({ type: 'equal', aIndex: x - 1, bIndex: y - 1 });
      x -= 1;
      y -= 1;
    }

    if (d === 0) break;

    if (x === prevX) {
      ops.push({ type: 'insert', bIndex: y - 1 });
      y -= 1;
    } else {
      ops.push({ type: 'delete', aIndex: x - 1 });
      x -= 1;
    }
  }

  return ops.reverse();
};

const mergeSegments = (segments) => {
  const merged = [];
  segments.forEach((segment) => {
    if (!segment.text) return;
    const last = merged[merged.length - 1];
    if (last && last.type === segment.type) {
      last.text += segment.text;
    } else {
      merged.push({ ...segment });
    }
  });
  return merged;
};

const buildCharDiff = (leftLine, rightLine, options) => {
  const leftChars = Array.from(
    options.ignoreWhitespace ? leftLine.replace(/\s+/g, ' ') : leftLine
  );
  const rightChars = Array.from(
    options.ignoreWhitespace ? rightLine.replace(/\s+/g, ' ') : rightLine
  );
  const leftKeys = options.caseSensitive
    ? leftChars
    : leftChars.map((char) => char.toLowerCase());
  const rightKeys = options.caseSensitive
    ? rightChars
    : rightChars.map((char) => char.toLowerCase());

  const ops = diffSequence(leftKeys, rightKeys, (a, b) => a === b);
  const leftSegments = [];
  const rightSegments = [];
  let changes = 0;

  ops.forEach((op) => {
    if (op.type === 'equal') {
      leftSegments.push({ type: 'equal', text: leftChars[op.aIndex] });
      rightSegments.push({ type: 'equal', text: rightChars[op.bIndex] });
      return;
    }
    if (op.type === 'delete') {
      leftSegments.push({ type: 'delete', text: leftChars[op.aIndex] });
      changes += leftChars[op.aIndex]?.length || 0;
      return;
    }
    rightSegments.push({ type: 'insert', text: rightChars[op.bIndex] });
    changes += rightChars[op.bIndex]?.length || 0;
  });

  return {
    leftSegments: mergeSegments(leftSegments),
    rightSegments: mergeSegments(rightSegments),
    changes
  };
};

const buildLineRows = (leftData, rightData, options) => {
  const ops = diffSequence(leftData.keyLines, rightData.keyLines, (a, b) => a === b);
  const rows = [];
  const stats = {
    linesAdded: 0,
    linesRemoved: 0,
    linesModified: 0,
    charsChanged: 0
  };

  let i = 0;
  while (i < ops.length) {
    const op = ops[i];
    if (op.type === 'equal') {
      rows.push({
        type: 'equal',
        left: leftData.displayLines[op.aIndex] ?? '',
        right: rightData.displayLines[op.bIndex] ?? '',
        leftNumber: op.aIndex + 1,
        rightNumber: op.bIndex + 1
      });
      i += 1;
      continue;
    }

    if (op.type === 'delete') {
      const deletes = [];
      while (i < ops.length && ops[i].type === 'delete') {
        deletes.push(ops[i]);
        i += 1;
      }
      const inserts = [];
      while (i < ops.length && ops[i].type === 'insert') {
        inserts.push(ops[i]);
        i += 1;
      }
      const max = Math.max(deletes.length, inserts.length);
      for (let j = 0; j < max; j += 1) {
        const del = deletes[j];
        const ins = inserts[j];
        if (del && ins) {
          const leftLine = leftData.displayLines[del.aIndex] ?? '';
          const rightLine = rightData.displayLines[ins.bIndex] ?? '';
          const charDiff = buildCharDiff(leftLine, rightLine, options);
          rows.push({
            type: 'modify',
            left: leftLine,
            right: rightLine,
            leftNumber: del.aIndex + 1,
            rightNumber: ins.bIndex + 1,
            charDiff
          });
          stats.linesModified += 1;
          stats.charsChanged += charDiff.changes;
        } else if (del) {
          const leftLine = leftData.displayLines[del.aIndex] ?? '';
          rows.push({
            type: 'delete',
            left: leftLine,
            right: '',
            leftNumber: del.aIndex + 1,
            rightNumber: null
          });
          stats.linesRemoved += 1;
          stats.charsChanged += leftLine.length;
        } else if (ins) {
          const rightLine = rightData.displayLines[ins.bIndex] ?? '';
          rows.push({
            type: 'insert',
            left: '',
            right: rightLine,
            leftNumber: null,
            rightNumber: ins.bIndex + 1
          });
          stats.linesAdded += 1;
          stats.charsChanged += rightLine.length;
        }
      }
      continue;
    }

    if (op.type === 'insert') {
      while (i < ops.length && ops[i].type === 'insert') {
        const ins = ops[i];
        const rightLine = rightData.displayLines[ins.bIndex] ?? '';
        rows.push({
          type: 'insert',
          left: '',
          right: rightLine,
          leftNumber: null,
          rightNumber: ins.bIndex + 1
        });
        stats.linesAdded += 1;
        stats.charsChanged += rightLine.length;
        i += 1;
      }
    }
  }

  return { rows, stats };
};

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildPlainDiff = (rows) => {
  const lines = [];
  rows.forEach((row) => {
    if (row.type === 'equal') {
      lines.push(`  ${row.left}`);
      return;
    }
    if (row.type === 'delete') {
      lines.push(`- ${row.left}`);
      return;
    }
    if (row.type === 'insert') {
      lines.push(`+ ${row.right}`);
      return;
    }
    lines.push(`- ${row.left}`);
    lines.push(`+ ${row.right}`);
  });
  return lines.join('\n');
};

const buildHtmlDiff = (rows) => {
  const body = rows
    .map((row) => {
      if (row.type === 'equal') {
        return `<div class="line"><span class="prefix"> </span>${escapeHtml(row.left)}</div>`;
      }
      if (row.type === 'delete') {
        return `<div class="line delete"><span class="prefix">-</span>${escapeHtml(row.left)}</div>`;
      }
      if (row.type === 'insert') {
        return `<div class="line insert"><span class="prefix">+</span>${escapeHtml(row.right)}</div>`;
      }
      return [
        `<div class="line modify"><span class="prefix">-</span>${escapeHtml(row.left)}</div>`,
        `<div class="line modify"><span class="prefix">+</span>${escapeHtml(row.right)}</div>`
      ].join('');
    })
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Diff Checker Result</title>
<style>
  body { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; background: #f8fafc; color: #0f172a; padding: 24px; }
  .line { padding: 4px 8px; white-space: pre; border-radius: 6px; margin-bottom: 2px; }
  .prefix { display: inline-block; width: 16px; font-weight: 700; }
  .delete { background: #ffebee; color: #b91c1c; }
  .insert { background: #e8f5e9; color: #166534; }
  .modify { background: #fff9c4; color: #92400e; }
</style>
</head>
<body>
${body}
</body>
</html>`;
};

const editorTheme = EditorView.theme({
  '&': { height: '100%' },
  '.cm-scroller': {
    overflow: 'auto',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace',
    fontSize: '0.875rem'
  },
  '.cm-content': {
    padding: '12px'
  },
  '.cm-gutters': {
    backgroundColor: 'transparent',
    borderRight: '1px solid #e2e8f0',
    color: '#94a3b8'
  },
  '.cm-foldGutter .cm-gutterElement': {
    paddingLeft: '2px',
    paddingRight: '2px'
  }
});

const jsonExtension = jsonLanguage();

const CodeEditor = ({ value, onChange, ariaLabel, ariaDescribedBy, placeholderText, language }) => {
  const containerRef = useRef(null);
  const viewRef = useRef(null);
  const lastValueRef = useRef(value);

  useEffect(() => {
    if (!containerRef.current) return undefined;
    if (viewRef.current) {
      viewRef.current.destroy();
    }

    const extensions = [
      lineNumbers(),
      highlightActiveLine(),
      drawSelection(),
      history(),
      indentOnInput(),
      bracketMatching(),
      foldGutter(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      editorTheme,
      keymap.of([...defaultKeymap, ...historyKeymap, ...foldKeymap]),
      EditorView.lineWrapping,
      cmPlaceholder(placeholderText || '')
    ];

    if (language) {
      extensions.push(language);
    }

    extensions.push(
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const nextValue = update.state.doc.toString();
          lastValueRef.current = nextValue;
          onChange?.(nextValue);
        }
      })
    );

    const state = EditorState.create({
      doc: value,
      extensions
    });

    viewRef.current = new EditorView({
      state,
      parent: containerRef.current
    });

    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
  }, [language, onChange, placeholderText]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    if (value !== lastValueRef.current) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value }
      });
      lastValueRef.current = value;
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      role="textbox"
    />
  );
};

export default function DiffCheckerPage() {
  const [leftText, setLeftText] = useState(sampleLeft);
  const [rightText, setRightText] = useState(sampleRight);
  const [diffRows, setDiffRows] = useState([]);
  const [stats, setStats] = useState({
    linesAdded: 0,
    linesRemoved: 0,
    linesModified: 0,
    charsChanged: 0
  });
  const [hasCompared, setHasCompared] = useState(false);
  const [viewMode, setViewMode] = useState('side-by-side');
  const [autoCompare, setAutoCompare] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [ignoreLineBreaks, setIgnoreLineBreaks] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [leftDragActive, setLeftDragActive] = useState(false);
  const [rightDragActive, setRightDragActive] = useState(false);
  const [leftFileName, setLeftFileName] = useState('');
  const [rightFileName, setRightFileName] = useState('');
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(480);

  const resultsRef = useRef(null);
  const leftFileRef = useRef(null);
  const rightFileRef = useRef(null);

  const options = useMemo(
    () => ({ ignoreWhitespace, caseSensitive, ignoreLineBreaks }),
    [ignoreWhitespace, caseSensitive, ignoreLineBreaks]
  );

  const leftLanguage = useMemo(() => {
    if (leftFileName?.toLowerCase().endsWith('.json')) return jsonExtension;
    const trimmed = leftText.trim();
    if (!trimmed) return null;
    if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return null;
    try {
      JSON.parse(trimmed);
      return jsonExtension;
    } catch {
      return null;
    }
  }, [leftFileName, leftText]);

  const rightLanguage = useMemo(() => {
    if (rightFileName?.toLowerCase().endsWith('.json')) return jsonExtension;
    const trimmed = rightText.trim();
    if (!trimmed) return null;
    if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return null;
    try {
      JSON.parse(trimmed);
      return jsonExtension;
    } catch {
      return null;
    }
  }, [rightFileName, rightText]);

  const compareTexts = useCallback(() => {
    setError('');
    const leftData = buildLineData(leftText, options);
    const rightData = buildLineData(rightText, options);
    const { rows, stats: nextStats } = buildLineRows(leftData, rightData, options);
    setDiffRows(rows);
    setStats(nextStats);
    setHasCompared(true);
    if (resultsRef.current) {
      resultsRef.current.scrollTop = 0;
    }
    setScrollTop(0);
  }, [leftText, rightText, options]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) {
      setViewMode('inline');
    }
  }, []);

  useEffect(() => {
    if (!autoCompare) return undefined;
    const handle = window.setTimeout(() => {
      compareTexts();
    }, 350);
    return () => window.clearTimeout(handle);
  }, [autoCompare, compareTexts]);

  useEffect(() => {
    if (!resultsRef.current) return undefined;
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry?.contentRect?.height) {
        setContainerHeight(entry.contentRect.height);
      }
    });
    observer.observe(resultsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCompare = () => {
    compareTexts();
  };

  const handleSwap = () => {
    setLeftText(rightText);
    setRightText(leftText);
    const leftName = leftFileName;
    setLeftFileName(rightFileName);
    setRightFileName(leftName);
  };

  const handleClearAll = () => {
    setLeftText('');
    setRightText('');
    setDiffRows([]);
    setStats({ linesAdded: 0, linesRemoved: 0, linesModified: 0, charsChanged: 0 });
    setHasCompared(false);
    setLeftFileName('');
    setRightFileName('');
    setError('');
  };

  const handleLoadSample = () => {
    setLeftText(sampleLeft);
    setRightText(sampleRight);
    setHasCompared(false);
  };

  const handleCopy = async () => {
    if (!diffRows.length) return;
    const diffText = buildPlainDiff(diffRows);
    await navigator.clipboard.writeText(diffText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format) => {
    if (!diffRows.length) return;
    const content = format === 'html' ? buildHtmlDiff(diffRows) : buildPlainDiff(diffRows);
    const blob = new Blob([content], { type: format === 'html' ? 'text/html' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = format === 'html' ? 'diff-result.html' : 'diff-result.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const validateFile = (file) => {
    const extIndex = file.name.lastIndexOf('.');
    const extension = extIndex >= 0 ? file.name.slice(extIndex).toLowerCase() : '';
    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      setError(`Unsupported file type: ${extension || 'unknown'}. Allowed: ${ACCEPTED_EXTENSIONS.join(', ')}`);
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('File too large. Max size is 5MB per file.');
      return false;
    }
    return true;
  };

  const readFile = (file, side) => {
    if (!validateFile(file)) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      if (side === 'left') {
        setLeftText(text);
        setLeftFileName(file.name);
      } else {
        setRightText(text);
        setRightFileName(file.name);
      }
    };
    reader.onerror = () => {
      setError('Unable to read the selected file.');
    };
    reader.readAsText(file);
  };

  const handleFileSelect = (event, side) => {
    const file = event.target.files?.[0];
    if (file) readFile(file, side);
  };

  const handleDrop = (event, side) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) readFile(file, side);
    if (side === 'left') setLeftDragActive(false);
    if (side === 'right') setRightDragActive(false);
  };

  const inlineRows = useMemo(() => {
    if (viewMode !== 'inline') return [];
    const rows = [];
    diffRows.forEach((row) => {
      if (row.type === 'equal') {
        rows.push({
          type: 'equal',
          text: row.left,
          lineNumber: row.leftNumber,
          segments: row.charDiff?.leftSegments
        });
      } else if (row.type === 'delete') {
        rows.push({
          type: 'delete',
          text: row.left,
          lineNumber: row.leftNumber
        });
      } else if (row.type === 'insert') {
        rows.push({
          type: 'insert',
          text: row.right,
          lineNumber: row.rightNumber
        });
      } else {
        rows.push({
          type: 'delete',
          text: row.left,
          lineNumber: row.leftNumber,
          segments: row.charDiff?.leftSegments,
          isModified: true
        });
        rows.push({
          type: 'insert',
          text: row.right,
          lineNumber: row.rightNumber,
          segments: row.charDiff?.rightSegments,
          isModified: true
        });
      }
    });
    return rows;
  }, [diffRows, viewMode]);

  const displayRows = viewMode === 'inline' ? inlineRows : diffRows;

  const totalRows = displayRows.length;
  const buffer = 8;
  const startIndex = Math.max(0, Math.floor(scrollTop / LINE_HEIGHT) - buffer);
  const endIndex = Math.min(
    totalRows,
    Math.ceil((scrollTop + containerHeight) / LINE_HEIGHT) + buffer
  );
  const visibleRows = displayRows.slice(startIndex, endIndex);
  const paddingTop = startIndex * LINE_HEIGHT;
  const paddingBottom = Math.max(0, (totalRows - endIndex) * LINE_HEIGHT);

  const segmentClass = (type) => {
    if (type === 'delete') return 'bg-red-200/70 text-red-800';
    if (type === 'insert') return 'bg-green-200/70 text-green-800';
    return '';
  };

  const renderSegments = (segments) => {
    if (!segments?.length) return null;
    return segments.map((segment, index) => (
      <span
        key={`${segment.type}-${index}`}
        className={`rounded px-0.5 ${segmentClass(segment.type)}`}
      >
        {segment.text}
      </span>
    ));
  };

  const rowTone = (row, inline = false) => {
    if (row.type === 'modify' || row.isModified) return 'bg-amber-100/70';
    if (row.type === 'delete') return inline ? 'bg-red-50' : 'bg-red-50';
    if (row.type === 'insert') return inline ? 'bg-green-50' : 'bg-green-50';
    return '';
  };

  const renderLineNumber = (value) => (
    <span className="w-10 flex-shrink-0 text-xs text-slate-400 text-right pr-2 select-none">
      {value ?? ''}
    </span>
  );

  const renderSideBySideRow = (row, index) => {
    const showCharDiff = viewMode !== 'line' && row.type === 'modify';
    return (
      <div
        key={`${row.type}-${row.leftNumber || 'x'}-${row.rightNumber || 'y'}-${index}`}
        className={`grid grid-cols-2 border-b border-slate-200 ${rowTone(row)} text-sm`}
        style={{ minHeight: LINE_HEIGHT, lineHeight: `${LINE_HEIGHT}px` }}
      >
        <div className="flex items-start gap-2 px-3 py-1">
          {showLineNumbers && renderLineNumber(row.leftNumber)}
          <pre className="flex-1 whitespace-pre text-slate-700">
            {row.type === 'modify' && showCharDiff
              ? renderSegments(row.charDiff?.leftSegments)
              : row.left}
          </pre>
        </div>
        <div className="flex items-start gap-2 px-3 py-1 border-l border-slate-200">
          {showLineNumbers && renderLineNumber(row.rightNumber)}
          <pre className="flex-1 whitespace-pre text-slate-700">
            {row.type === 'modify' && showCharDiff
              ? renderSegments(row.charDiff?.rightSegments)
              : row.right}
          </pre>
        </div>
      </div>
    );
  };

  const renderInlineRow = (row, index) => {
    const prefix = row.type === 'insert' ? '+' : row.type === 'delete' ? '-' : ' ';
    const showCharDiff = viewMode !== 'line' && row.segments?.length;
    return (
      <div
        key={`${row.type}-${row.lineNumber || 'n'}-${index}`}
        className={`flex items-start gap-2 px-3 py-1 border-b border-slate-200 text-sm ${rowTone(row, true)}`}
        style={{ minHeight: LINE_HEIGHT, lineHeight: `${LINE_HEIGHT}px` }}
      >
        {showLineNumbers && renderLineNumber(row.lineNumber)}
        <span className="w-4 flex-shrink-0 text-slate-500 font-semibold select-none">
          {prefix}
        </span>
        <pre className="flex-1 whitespace-pre text-slate-700">
          {showCharDiff ? renderSegments(row.segments) : row.text}
        </pre>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="Diff Checker" />

      <main id="main-content" className="w-full px-3 sm:px-4 lg:px-6 py-6">
        <article className="space-y-8">

          <section id="diff-tool" className="tool-interface space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center space-x-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold">
                  <Diff className="w-4 h-4 text-blue-600" />
                  <span>Diff Checker</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Free Online Diff Checker &amp; Text Compare Tool
                  <span className="ml-2 text-sm sm:text-base font-normal text-slate-600">
                    Compare text differences instantly in your browser.
                  </span>
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  100% client-side
                </span>
                <span className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Privacy-first
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center space-x-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={ignoreWhitespace}
                      onChange={(event) => setIgnoreWhitespace(event.target.checked)}
                      data-analytics-event="diff_option_toggled"
                      data-analytics-tool="Diff Checker"
                      data-analytics-action="ignore_whitespace"
                      aria-label="Ignore whitespace"
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded"
                    />
                    <span>Ignore whitespace</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={caseSensitive}
                      onChange={(event) => setCaseSensitive(event.target.checked)}
                      data-analytics-event="diff_option_toggled"
                      data-analytics-tool="Diff Checker"
                      data-analytics-action="case_sensitive"
                      aria-label="Case sensitive"
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded"
                    />
                    <span>Case sensitive</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={ignoreLineBreaks}
                      onChange={(event) => setIgnoreLineBreaks(event.target.checked)}
                      data-analytics-event="diff_option_toggled"
                      data-analytics-tool="Diff Checker"
                      data-analytics-action="ignore_line_breaks"
                      aria-label="Ignore line breaks"
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded"
                    />
                    <span>Ignore line breaks</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={showLineNumbers}
                      onChange={(event) => setShowLineNumbers(event.target.checked)}
                      data-analytics-event="diff_option_toggled"
                      data-analytics-tool="Diff Checker"
                      data-analytics-action="show_line_numbers"
                      aria-label="Show line numbers"
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded"
                    />
                    <span>Show line numbers</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={autoCompare}
                      onChange={(event) => setAutoCompare(event.target.checked)}
                      data-analytics-event="diff_option_toggled"
                      data-analytics-tool="Diff Checker"
                      data-analytics-action="auto_compare"
                      aria-label="Auto compare"
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded"
                    />
                    <span>Auto compare</span>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600">Format:</span>
                  <select
                    value={viewMode}
                    onChange={(event) => setViewMode(event.target.value)}
                    data-analytics-event="diff_view_changed"
                    data-analytics-tool="Diff Checker"
                    data-analytics-action="view_mode"
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700"
                    aria-label="Diff view mode"
                  >
                    <option value="side-by-side">Side-by-side</option>
                    <option value="inline">Inline/Unified</option>
                    <option value="line">Line-by-line</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div
                  className={`space-y-3 ${leftDragActive ? 'ring-2 ring-blue-400/60 rounded-xl' : ''}`}
                  onDrop={(event) => handleDrop(event, 'left')}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setLeftDragActive(true);
                  }}
                  onDragLeave={() => setLeftDragActive(false)}
                  role="region"
                  aria-label="Original text input"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Original Text</h2>
                    {leftFileName && (
                      <span className="text-xs text-slate-500">Loaded: {leftFileName}</span>
                    )}
                  </div>
                  <div className="w-full min-h-[220px] h-64 sm:h-80 lg:h-96 rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <CodeEditor
                      value={leftText}
                      onChange={setLeftText}
                      ariaLabel="Original text input"
                      ariaDescribedBy="original-help"
                      placeholderText="Paste your original text here..."
                      language={leftLanguage}
                    />
                  </div>
                  <p id="original-help" className="sr-only">Enter the original version of your text for comparison.</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setLeftText('');
                        setLeftFileName('');
                      }}
                      data-analytics-event="diff_clear_panel"
                      data-analytics-tool="Diff Checker"
                      data-analytics-action="left_clear"
                      className="inline-flex items-center space-x-2 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => leftFileRef.current?.click()}
                      data-analytics-event="file_uploaded"
                      data-analytics-tool="Diff Checker"
                      data-analytics-action="left_upload"
                      className="inline-flex items-center space-x-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Load File</span>
                    </button>
                    <input
                      ref={leftFileRef}
                      type="file"
                      onChange={(event) => handleFileSelect(event, 'left')}
                      className="hidden"
                      accept={ACCEPTED_EXTENSIONS.join(',')}
                      aria-label="Upload original file"
                      data-analytics-event="file_uploaded"
                      data-analytics-tool="Diff Checker"
                      data-analytics-action="left_upload"
                    />
                    <span className="text-xs text-slate-500">Drag &amp; drop (.txt, .json, .xml, .js, .css, .html, .md)</span>
                  </div>
                </div>

                <div
                  className={`space-y-3 ${rightDragActive ? 'ring-2 ring-blue-400/60 rounded-xl' : ''}`}
                  onDrop={(event) => handleDrop(event, 'right')}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setRightDragActive(true);
                  }}
                  onDragLeave={() => setRightDragActive(false)}
                  role="region"
                  aria-label="Modified text input"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Modified Text</h2>
                    {rightFileName && (
                      <span className="text-xs text-slate-500">Loaded: {rightFileName}</span>
                    )}
                  </div>
                  <div className="w-full min-h-[220px] h-64 sm:h-80 lg:h-96 rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <CodeEditor
                      value={rightText}
                      onChange={setRightText}
                      ariaLabel="Modified text input"
                      ariaDescribedBy="modified-help"
                      placeholderText="Paste your modified text here..."
                      language={rightLanguage}
                    />
                  </div>
                  <p id="modified-help" className="sr-only">Enter the modified version of your text for comparison.</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setRightText('');
                        setRightFileName('');
                      }}
                      data-analytics-event="diff_clear_panel"
                      data-analytics-tool="Diff Checker"
                      data-analytics-action="right_clear"
                      className="inline-flex items-center space-x-2 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => rightFileRef.current?.click()}
                      data-analytics-event="file_uploaded"
                      data-analytics-tool="Diff Checker"
                      data-analytics-action="right_upload"
                      className="inline-flex items-center space-x-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Load File</span>
                    </button>
                    <input
                      ref={rightFileRef}
                      type="file"
                      onChange={(event) => handleFileSelect(event, 'right')}
                      className="hidden"
                      accept={ACCEPTED_EXTENSIONS.join(',')}
                      aria-label="Upload modified file"
                      data-analytics-event="file_uploaded"
                      data-analytics-tool="Diff Checker"
                      data-analytics-action="right_upload"
                    />
                    <span className="text-xs text-slate-500">Drag &amp; drop (.txt, .json, .xml, .js, .css, .html, .md)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCompare}
                    data-analytics-event="tool_used"
                    data-analytics-tool="Diff Checker"
                    data-analytics-action="compare"
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    <Diff className="w-4 h-4" />
                    <span>Compare Texts</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSwap}
                    data-analytics-event="diff_swap"
                    data-analytics-tool="Diff Checker"
                    data-analytics-action="swap"
                    className="flex items-center space-x-2 border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    <span>Swap Texts</span>
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    data-analytics-event="diff_sample"
                    data-analytics-tool="Diff Checker"
                    data-analytics-action="load_sample"
                    className="flex items-center space-x-2 bg-slate-600 text-white px-5 py-2.5 rounded-lg hover:bg-slate-700 transition-colors font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Load Sample</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    data-analytics-event="diff_clear"
                    data-analytics-tool="Diff Checker"
                    data-analytics-action="clear_all"
                    className="flex items-center space-x-2 border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear All</span>
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4" role="alert" aria-live="polite">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-slate-900">Diff Results</h3>
                  <p className="text-sm text-slate-500">
                    Deletions in red, additions in green, modifications in yellow.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-200 border border-green-300"></span>
                    Lines added: <strong>{stats.linesAdded}</strong>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-200 border border-red-300"></span>
                    Lines removed: <strong>{stats.linesRemoved}</strong>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-200 border border-amber-300"></span>
                    Lines modified: <strong>{stats.linesModified}</strong>
                  </span>
                  <span>Characters changed: <strong>{stats.charsChanged}</strong></span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                  <Columns2 className="w-4 h-4" />
                  <span>Side-by-side</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                  <LayoutList className="w-4 h-4" />
                  <span>Inline/Unified</span>
                </div>
                <span className="text-xs text-slate-500">
                  {ignoreWhitespace && 'Whitespace normalized. '}
                  {ignoreLineBreaks && 'Line breaks ignored. '}
                  {!caseSensitive && 'Case-insensitive comparison enabled.'}
                </span>
              </div>

              <div
                ref={resultsRef}
                className="border border-slate-200 rounded-xl overflow-auto min-h-[420px] max-h-[65vh] bg-slate-50"
                onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
                role="region"
                aria-label="Diff results"
              >
                {totalRows === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-500">
                    {hasCompared ? 'No differences found. The texts match.' : 'Run a comparison to see highlighted differences.'}
                  </div>
                ) : (
                  <div style={{ paddingTop, paddingBottom }}>
                    {visibleRows.map((row, index) =>
                      viewMode === 'inline'
                        ? renderInlineRow(row, index)
                        : renderSideBySideRow(row, index)
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    data-analytics-event="diff_copied"
                    data-analytics-tool="Diff Checker"
                    data-analytics-action="copy_result"
                    className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy Result'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload('txt')}
                    data-analytics-event="diff_downloaded"
                    data-analytics-tool="Diff Checker"
                    data-analytics-action="download_txt"
                    className="flex items-center space-x-2 border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download .txt</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload('html')}
                    data-analytics-event="diff_downloaded"
                    data-analytics-tool="Diff Checker"
                    data-analytics-action="download_html"
                    className="flex items-center space-x-2 border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download .html</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <RefreshCw className="w-4 h-4" />
                  <span>All processing happens locally in your browser.</span>
                </div>
              </div>
            </div>
          </section>

          <details className="group bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-xl font-semibold text-slate-900">Overview &amp; Privacy</span>
              <ChevronDown className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-4 space-y-6">
              <p className="text-slate-700 leading-relaxed">
                Compare text differences instantly with our free online diff checker. This browser-based tool highlights
                additions, deletions, and modifications between two text blocks, making it easy to spot changes in code,
                documents, or any plain text files. Perfect for developers reviewing code changes, writers tracking
                document edits, or anyone needing to compare text versions. The tool supports side-by-side and inline
                comparison modes, character-level diff detection, and works with various file formats including .txt,
                .json, .js, .css, .html, and .md files. All processing happens locally in your browser--your text never
                leaves your device. No uploads, no servers, complete privacy. Use options like "ignore whitespace,"
                "ignore line breaks," and "case-sensitive" to customize your comparison. Export results as text or HTML,
                copy directly to your clipboard, or download a shareable report for reviews. Built for speed, the diff
                checker stays responsive even with large files while keeping your data private. You can also toggle line
                numbers, ignore whitespace, and switch formats to match your workflow when comparing text online.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => document.getElementById('diff-tool')?.scrollIntoView({ behavior: 'smooth' })}
                  data-analytics-event="tool_used"
                  data-analytics-tool="Diff Checker"
                  data-analytics-action="compare_cta"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  <Diff className="w-4 h-4" />
                  <span>Compare Texts Now</span>
                </button>
                <span className="text-sm text-slate-500">100% client-side, no uploads, privacy-first.</span>
              </div>
              <img
                src="/images/diff-checker-preview.png"
                alt="Diff checker tool showing side-by-side text comparison with highlighted differences"
                width="1200"
                height="630"
                loading="lazy"
                className="w-full rounded-xl border border-slate-200"
              />
            </div>
          </details>

          <details className="group bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-xl font-semibold text-slate-900">How to Use &amp; Features</span>
              <ChevronDown className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-6 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">How to Use the Diff Checker</h2>
                <ol className="list-decimal list-inside text-slate-700 space-y-2">
                  <li>Paste or type your original text in the left panel</li>
                  <li>Paste or type your modified text in the right panel</li>
                  <li>Click "Compare Texts" to see highlighted differences</li>
                  <li>Use options to customize comparison (ignore whitespace, etc.)</li>
                  <li>Copy or download the results</li>
                </ol>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Features</h2>
                <ul className="list-disc list-inside text-slate-700 space-y-2">
                  <li><strong>Side-by-side comparison</strong> - View differences in parallel columns</li>
                  <li><strong>Character-level diff</strong> - See exact character changes, not just lines</li>
                  <li><strong>Multiple view modes</strong> - Switch between side-by-side and inline</li>
                  <li><strong>File upload support</strong> - Compare .txt, .json, .js, and more</li>
                  <li><strong>Privacy-first</strong> - All processing happens in your browser</li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Common Use Cases</h2>
                <ul className="list-disc list-inside text-slate-700 space-y-2">
                  <li>Compare code versions before and after changes</li>
                  <li>Review document edits and track modifications</li>
                  <li>Check configuration file differences</li>
                  <li>Validate JSON or XML changes</li>
                  <li>Spot differences in log files</li>
                </ul>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  After comparing your text, you might need to{' '}
                  <a className="text-blue-600 hover:underline" href="/json-formatter">format JSON data</a>{' '}
                  or <a className="text-blue-600 hover:underline" href="/base64-encoder">encode text to Base64</a>.
                </p>
              </div>
            </div>
          </details>

          <details className="group bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-xl font-semibold text-slate-900">Related Developer Tools</span>
              <ChevronDown className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-4">
              <ul className="space-y-2 text-slate-700">
                <li>
                  <a className="text-blue-600 hover:underline" href="/json-formatter">JSON Formatter</a> - Format and validate JSON
                </li>
                <li>
                  <a className="text-blue-600 hover:underline" href="/regex-tester">Regex Tester</a> - Test regular expressions
                </li>
                <li>
                  <a className="text-blue-600 hover:underline" href="/hash-generator">Hash Generator</a> - Generate MD5, SHA hashes
                </li>
              </ul>
            </div>
          </details>

          <details className="group bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-xl font-semibold text-slate-900">Frequently Asked Questions</span>
              <ChevronDown className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180" />
            </summary>
            <dl className="mt-4 space-y-4 text-slate-700">
              <div>
                <dt className="font-semibold text-slate-900">Is my text uploaded to a server?</dt>
                <dd>No. All text comparison happens locally in your browser. Your data never leaves your device.</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">What file types can I compare?</dt>
                <dd>You can compare .txt, .json, .xml, .js, .css, .html, .md files, and any plain text format.</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">What&apos;s the file size limit?</dt>
                <dd>Each file can be up to 5MB. The tool handles large files efficiently in your browser.</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Can I compare code files?</dt>
                <dd>Yes! This tool is perfect for comparing code changes, configuration files, and any text-based code.</dd>
              </div>
            </dl>
          </details>
        </article>
      </main>

      <Footer />
    </div>
  );
}
