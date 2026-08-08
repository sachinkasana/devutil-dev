'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

type Dialect = 'postgresql' | 'mysql' | 'sqlite';
type PreviewMode = 'readable' | 'compact';
type TokenType = 'word' | 'number' | 'string' | 'operator' | 'punct' | 'comment' | 'keyword';

type Token = {
  type: TokenType;
  value: string;
  normalized?: string;
};

type ParenContext = {
  isSubquery: boolean;
  previousClause: string;
  previousWithClause: boolean;
};

const DIALECT_OPTIONS: Array<{ value: Dialect; label: string }> = [
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'sqlite', label: 'SQLite' }
];

const PREVIEW_MODE_OPTIONS: Array<{ value: PreviewMode; label: string }> = [
  { value: 'readable', label: 'Readable' },
  { value: 'compact', label: 'Compact' }
];

const DIALECT_SAMPLES: Record<Dialect, string> = {
  postgresql: `WITH recent_orders AS (
  SELECT
    o.user_id,
    o.total_amount,
    o.created_at
  FROM orders o
  WHERE o.created_at >= NOW() - INTERVAL '30 days'
),
ranked AS (
  SELECT
    user_id,
    SUM(total_amount) AS spend_last_30d,
    ROW_NUMBER() OVER (ORDER BY SUM(total_amount) DESC) AS spend_rank
  FROM recent_orders
  GROUP BY user_id
)
SELECT
  u.id,
  u.email,
  r.spend_last_30d
FROM users u
LEFT JOIN ranked r ON r.user_id = u.id
WHERE EXISTS (
  SELECT 1
  FROM subscriptions s
  WHERE s.user_id = u.id
    AND s.status = 'active'
)
ORDER BY r.spend_rank
LIMIT 20;`,
  mysql: `WITH order_totals AS (
  SELECT
    o.user_id,
    SUM(o.total_amount) AS total_spend
  FROM orders o
  WHERE o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
  GROUP BY o.user_id
)
SELECT
  u.id,
  u.email,
  ot.total_spend
FROM users u
LEFT JOIN order_totals ot ON ot.user_id = u.id
WHERE u.id IN (
  SELECT
    p.user_id
  FROM payments p
  WHERE p.status = 'captured'
)
ORDER BY ot.total_spend DESC
LIMIT 50;`,
  sqlite: `WITH RECURSIVE day_series(day) AS (
  SELECT date('now', '-6 days')
  UNION ALL
  SELECT date(day, '+1 day')
  FROM day_series
  WHERE day < date('now')
),
daily_counts AS (
  SELECT
    date(e.created_at) AS day,
    COUNT(*) AS events_count
  FROM events e
  GROUP BY date(e.created_at)
)
SELECT
  ds.day,
  COALESCE(dc.events_count, 0) AS events_count
FROM day_series ds
LEFT JOIN daily_counts dc ON dc.day = ds.day
ORDER BY ds.day;`
};

const COMMON_KEYWORD_SINGLES = [
  'SELECT', 'FROM', 'WHERE', 'HAVING', 'LIMIT', 'OFFSET', 'AS', 'DISTINCT', 'JOIN', 'ON',
  'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'LIKE', 'IS', 'NULL', 'BETWEEN', 'UNION', 'ALL',
  'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP',
  'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'BY', 'GROUP', 'ORDER', 'ASC', 'DESC', 'WITH',
  'RECURSIVE', 'RETURNING', 'OVER', 'PARTITION', 'WINDOW', 'USING', 'LATERAL', 'DO', 'NOTHING'
];

const COMMON_KEYWORD_PHRASES = [
  'GROUP BY',
  'ORDER BY',
  'INNER JOIN',
  'LEFT JOIN',
  'RIGHT JOIN',
  'FULL JOIN',
  'CROSS JOIN',
  'LEFT OUTER JOIN',
  'RIGHT OUTER JOIN',
  'FULL OUTER JOIN',
  'UNION ALL',
  'INSERT INTO',
  'DELETE FROM',
  'WITH RECURSIVE',
  'DISTINCT ON',
  'ON CONFLICT'
];

const DIALECT_KEYWORD_SINGLES: Record<Dialect, string[]> = {
  postgresql: ['ILIKE', 'SIMILAR', 'ONLY'],
  mysql: ['STRAIGHT_JOIN', 'REPLACE', 'DESCRIBE', 'EXPLAIN', 'SHOW', 'KEYS'],
  sqlite: ['PRAGMA', 'WITHOUT', 'ROWID']
};

const DIALECT_KEYWORD_PHRASES: Record<Dialect, string[]> = {
  postgresql: ['IS DISTINCT FROM'],
  mysql: ['INSERT IGNORE', 'REPLACE INTO'],
  sqlite: ['WITHOUT ROWID', 'INSERT OR REPLACE', 'INSERT OR IGNORE']
};

const COMMON_BREAK_BEFORE = [
  'WITH',
  'WITH RECURSIVE',
  'SELECT',
  'FROM',
  'WHERE',
  'GROUP BY',
  'ORDER BY',
  'HAVING',
  'LIMIT',
  'OFFSET',
  'INSERT INTO',
  'UPDATE',
  'DELETE FROM',
  'VALUES',
  'SET',
  'INNER JOIN',
  'LEFT JOIN',
  'RIGHT JOIN',
  'FULL JOIN',
  'CROSS JOIN',
  'LEFT OUTER JOIN',
  'RIGHT OUTER JOIN',
  'FULL OUTER JOIN',
  'UNION',
  'UNION ALL',
  'RETURNING',
  'ON CONFLICT'
];

const DIALECT_BREAK_BEFORE: Record<Dialect, string[]> = {
  postgresql: [],
  mysql: ['INSERT IGNORE', 'REPLACE INTO'],
  sqlite: ['INSERT OR REPLACE', 'INSERT OR IGNORE']
};

const SOFT_BREAK = new Set(['AND', 'OR', 'ON', 'WHEN', 'ELSE']);
const CLAUSE_WITH_INDENTED_LIST = new Set(['SELECT', 'VALUES', 'SET']);
const COMMA_BREAK_CLAUSES = new Set(['SELECT', 'VALUES', 'SET', 'GROUP BY', 'ORDER BY']);
const SUBQUERY_START = new Set(['SELECT', 'WITH', 'WITH RECURSIVE', 'VALUES']);
const MAIN_STATEMENT_START = new Set(['SELECT', 'INSERT INTO', 'UPDATE', 'DELETE FROM']);

const isWordStart = (char: string) => /[A-Za-z_]/.test(char);
const isWordPart = (char: string) => /[A-Za-z0-9_$]/.test(char);
const isDigit = (char: string) => /[0-9]/.test(char);
const isWhitespace = (char: string) => /\s/.test(char);

const buildKeywordConfig = (dialect: Dialect) => {
  const keywordSingles = new Set([
    ...COMMON_KEYWORD_SINGLES,
    ...DIALECT_KEYWORD_SINGLES[dialect]
  ]);
  const keywordPhrases = new Set([
    ...COMMON_KEYWORD_PHRASES,
    ...DIALECT_KEYWORD_PHRASES[dialect]
  ]);
  const breakBefore = new Set([
    ...COMMON_BREAK_BEFORE,
    ...DIALECT_BREAK_BEFORE[dialect]
  ]);

  const phraseLengths = Array.from(
    new Set(Array.from(keywordPhrases, (phrase) => phrase.split(' ').length))
  ).sort((a, b) => b - a);

  return { keywordSingles, keywordPhrases, breakBefore, phraseLengths };
};

const tokenizeSql = (input: string): Token[] => {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (isWhitespace(ch)) {
      i += 1;
      continue;
    }

    if (ch === '-' && input[i + 1] === '-') {
      let j = i + 2;
      while (j < input.length && input[j] !== '\n') {
        j += 1;
      }
      tokens.push({ type: 'comment', value: input.slice(i, j) });
      i = j;
      continue;
    }

    if (ch === '/' && input[i + 1] === '*') {
      let j = i + 2;
      while (j < input.length - 1 && !(input[j] === '*' && input[j + 1] === '/')) {
        j += 1;
      }
      if (j >= input.length - 1) {
        throw new Error('Unterminated block comment.');
      }
      j += 2;
      tokens.push({ type: 'comment', value: input.slice(i, j) });
      i = j;
      continue;
    }

    if (ch === '\'' || ch === '"' || ch === '`') {
      const quote = ch;
      let j = i + 1;
      let closed = false;
      while (j < input.length) {
        if (input[j] === '\\') {
          j += 2;
          continue;
        }
        if (input[j] === quote) {
          if ((quote === '\'' || quote === '"') && input[j + 1] === quote) {
            j += 2;
            continue;
          }
          j += 1;
          closed = true;
          break;
        }
        j += 1;
      }
      if (!closed) {
        throw new Error('Unterminated quoted string.');
      }
      tokens.push({ type: 'string', value: input.slice(i, j) });
      i = j;
      continue;
    }

    if (ch === '[') {
      let j = i + 1;
      let closed = false;
      while (j < input.length) {
        if (input[j] === ']' && input[j + 1] === ']') {
          j += 2;
          continue;
        }
        if (input[j] === ']') {
          j += 1;
          closed = true;
          break;
        }
        j += 1;
      }
      if (!closed) {
        throw new Error('Unterminated bracket identifier.');
      }
      tokens.push({ type: 'word', value: input.slice(i, j) });
      i = j;
      continue;
    }

    if (isDigit(ch)) {
      let j = i + 1;
      while (j < input.length && /[0-9.]/.test(input[j])) {
        j += 1;
      }
      tokens.push({ type: 'number', value: input.slice(i, j) });
      i = j;
      continue;
    }

    if (isWordStart(ch)) {
      let j = i + 1;
      while (j < input.length && isWordPart(input[j])) {
        j += 1;
      }
      tokens.push({ type: 'word', value: input.slice(i, j) });
      i = j;
      continue;
    }

    if ('(),.;'.includes(ch)) {
      tokens.push({ type: 'punct', value: ch });
      i += 1;
      continue;
    }

    if ('=<>!+-*/%|&^:'.includes(ch)) {
      let j = i + 1;
      while (j < input.length && '=<>!+-*/%|&^:'.includes(input[j])) {
        j += 1;
      }
      tokens.push({ type: 'operator', value: input.slice(i, j) });
      i = j;
      continue;
    }

    tokens.push({ type: 'punct', value: ch });
    i += 1;
  }

  return tokens;
};

const mergeKeywords = (tokens: Token[], uppercaseKeywords: boolean, dialect: Dialect): Token[] => {
  const { keywordSingles, keywordPhrases, phraseLengths } = buildKeywordConfig(dialect);
  const merged: Token[] = [];
  let i = 0;

  const renderKeyword = (normalized: string, original: string) => ({
    type: 'keyword' as const,
    normalized,
    value: uppercaseKeywords ? normalized : original.toLowerCase()
  });

  while (i < tokens.length) {
    const current = tokens[i];
    if (current.type !== 'word') {
      merged.push(current);
      i += 1;
      continue;
    }

    let matched = false;
    for (const length of phraseLengths) {
      if (length < 2 || i + length - 1 >= tokens.length) continue;
      const parts = tokens.slice(i, i + length);
      if (parts.some((token) => token.type !== 'word')) continue;

      const normalized = parts.map((token) => token.value.toUpperCase()).join(' ');
      if (!keywordPhrases.has(normalized)) continue;

      const original = parts.map((token) => token.value).join(' ');
      merged.push(renderKeyword(normalized, original));
      i += length;
      matched = true;
      break;
    }

    if (matched) continue;

    const normalized = current.value.toUpperCase();
    if (keywordSingles.has(normalized)) {
      merged.push(renderKeyword(normalized, current.value));
    } else {
      merged.push(current);
    }
    i += 1;
  }

  return merged;
};

const normalizedKeyword = (token: Token | null | undefined): string | null => {
  if (!token || token.type !== 'keyword') return null;
  return token.normalized ?? token.value.toUpperCase();
};

const needsSpace = (prev: Token | null, current: Token): boolean => {
  if (!prev) return false;
  if (current.type === 'punct' && [')', ',', ';', '.'].includes(current.value)) return false;
  if (prev.type === 'punct' && ['(', '.'].includes(prev.value)) return false;
  if (current.type === 'operator' || prev.type === 'operator') return true;
  if (prev.type === 'comment' || current.type === 'comment') return true;
  return true;
};

const getNextMeaningfulToken = (tokens: Token[], startIndex: number): Token | null => {
  for (let i = startIndex + 1; i < tokens.length; i += 1) {
    if (tokens[i].type === 'comment') continue;
    return tokens[i];
  }
  return null;
};

const minifySql = (input: string, uppercaseKeywords: boolean, dialect: Dialect): string => {
  const tokens = mergeKeywords(tokenizeSql(input), uppercaseKeywords, dialect);
  let output = '';
  let prev: Token | null = null;

  for (const token of tokens) {
    if (needsSpace(prev, token)) {
      output += ' ';
    }
    output += token.value;
    prev = token;
  }

  return output.trim();
};

const beautifySql = (
  input: string,
  indentSize: number,
  uppercaseKeywords: boolean,
  dialect: Dialect,
  previewMode: PreviewMode
): string => {
  const tokens = mergeKeywords(tokenizeSql(input), uppercaseKeywords, dialect);
  const { breakBefore } = buildKeywordConfig(dialect);
  const indentUnit = ' '.repeat(indentSize);
  const isReadableMode = previewMode === 'readable';

  let output = '';
  let indentLevel = 0;
  let atLineStart = true;
  let nextOffset = 0;
  let currentClause = '';
  let inWithClause = false;
  let prev: Token | null = null;
  const parenStack: ParenContext[] = [];

  const write = (value: string, forceSpace = false) => {
    if (atLineStart) {
      output += indentUnit.repeat(Math.max(0, indentLevel + nextOffset));
      atLineStart = false;
      nextOffset = 0;
    } else if (forceSpace && output[output.length - 1] !== ' ' && output[output.length - 1] !== '\n') {
      output += ' ';
    }
    output += value;
  };

  const newLine = (offset = 0) => {
    output = output.replace(/[ \t]+$/, '');
    if (!output.endsWith('\n')) {
      output += '\n';
    }
    atLineStart = true;
    nextOffset = offset;
  };

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];

    if (token.type === 'comment') {
      if (!atLineStart) newLine();
      write(token.value);
      newLine();
      prev = token;
      continue;
    }

    if (token.type === 'keyword') {
      const normalized = normalizedKeyword(token) ?? token.value.toUpperCase();

      if (normalized === 'WITH' || normalized === 'WITH RECURSIVE') {
        if (!atLineStart || output.trim().length > 0) newLine();
        inWithClause = true;
        currentClause = normalized;
        write(token.value);
        prev = token;
        continue;
      }

      if (inWithClause && parenStack.length === 0 && MAIN_STATEMENT_START.has(normalized)) {
        if (!atLineStart) newLine();
        inWithClause = false;
      }

      if (breakBefore.has(normalized)) {
        if (!atLineStart || output.trim().length > 0) newLine();
        currentClause = normalized;
        write(token.value);
        if (isReadableMode && CLAUSE_WITH_INDENTED_LIST.has(normalized)) {
          newLine(1);
        }
        prev = token;
        continue;
      }

      if (isReadableMode && SOFT_BREAK.has(normalized)) {
        const shouldBreak =
          normalized === 'ON' ||
          currentClause === 'WHERE' ||
          currentClause === 'HAVING' ||
          currentClause === 'ON' ||
          normalized === 'WHEN' ||
          normalized === 'ELSE';
        if (shouldBreak) {
          newLine(1);
          write(token.value);
          prev = token;
          continue;
        }
      }

      if (normalized === 'CASE') {
        write(token.value, true);
        if (isReadableMode) {
          indentLevel += 1;
          newLine(1);
        }
        prev = token;
        continue;
      }

      if (normalized === 'THEN') {
        write(token.value, true);
        if (isReadableMode) {
          newLine(2);
        }
        prev = token;
        continue;
      }

      if (normalized === 'END') {
        if (isReadableMode) {
          indentLevel = Math.max(0, indentLevel - 1);
          newLine(1);
        }
        write(token.value);
        prev = token;
        continue;
      }

      write(token.value, true);
      prev = token;
      continue;
    }

    if (token.type === 'punct') {
      if (token.value === '(') {
        const nextToken = getNextMeaningfulToken(tokens, i);
        const nextKeyword = normalizedKeyword(nextToken);
        const isSubquery = Boolean(nextKeyword && SUBQUERY_START.has(nextKeyword));
        const shouldSpaceBefore = Boolean(
          prev && ['word', 'keyword', 'number', 'string'].includes(prev.type)
        );

        write('(', shouldSpaceBefore);

        if (isSubquery) {
          parenStack.push({
            isSubquery: true,
            previousClause: currentClause,
            previousWithClause: inWithClause
          });
          if (isReadableMode) {
            indentLevel += 1;
          }
          currentClause = '';
          inWithClause = false;
          if (isReadableMode) {
            newLine();
          }
        } else {
          parenStack.push({
            isSubquery: false,
            previousClause: currentClause,
            previousWithClause: inWithClause
          });
        }
        prev = token;
        continue;
      }

      if (token.value === ')') {
        const context = parenStack.pop();
        if (context?.isSubquery && isReadableMode) {
          indentLevel = Math.max(0, indentLevel - 1);
          if (!atLineStart) newLine();
          write(')');
          currentClause = context.previousClause;
          inWithClause = context.previousWithClause;
        } else {
          write(')');
        }
        prev = token;
        continue;
      }

      if (token.value === ',') {
        write(',');

        const shouldBreakForClause = isReadableMode && COMMA_BREAK_CLAUSES.has(currentClause);
        const shouldBreakForCte = isReadableMode && inWithClause && parenStack.length === 0;
        if (shouldBreakForClause || shouldBreakForCte) {
          newLine(1);
        } else {
          write(' ');
        }

        prev = token;
        continue;
      }

      if (token.value === ';') {
        write(';');
        newLine();
        newLine();
        currentClause = '';
        inWithClause = false;
        prev = token;
        continue;
      }

      if (token.value === '.') {
        write('.');
        prev = token;
        continue;
      }
    }

    write(token.value, needsSpace(prev, token));
    prev = token;
  }

  return output.trim().replace(/\n{3,}/g, '\n\n');
};

export default function SqlFormatterTool() {
  const [input, setInput] = useState(DIALECT_SAMPLES.postgresql);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [dialect, setDialect] = useState<Dialect>('postgresql');
  const [previewMode, setPreviewMode] = useState<PreviewMode>('readable');
  const [indentSize, setIndentSize] = useState(2);
  const [uppercaseKeywords, setUppercaseKeywords] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleBeautify = () => {
    try {
      const result = beautifySql(input, indentSize, uppercaseKeywords, dialect, previewMode);
      setOutput(result);
      setError('');
      setCopied(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to format SQL.');
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      const result = minifySql(input, uppercaseKeywords, dialect);
      setOutput(result);
      setError('');
      setCopied(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to minify SQL.');
      setOutput('');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleBeautify}
          data-analytics-event="sql_beautify"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          Beautify SQL
        </button>
        <button
          type="button"
          onClick={handleMinify}
          data-analytics-event="sql_minify"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Minify SQL
        </button>
        <button
          type="button"
          onClick={() => {
            setInput(DIALECT_SAMPLES[dialect]);
            setError('');
          }}
          data-analytics-event="sql_sample"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Use {DIALECT_OPTIONS.find((option) => option.value === dialect)?.label} Sample
        </button>
        <button
          type="button"
          onClick={handleClear}
          data-analytics-event="sql_clear"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 transition"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output}
          data-analytics-event="sql_copy"
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition inline-flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Output'}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2 text-slate-700">
          Dialect
          <select
            value={dialect}
            onChange={(event) => setDialect(event.target.value as Dialect)}
            data-analytics-event="sql_dialect"
            className="border border-slate-300 rounded-md px-2 py-1"
          >
            {DIALECT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-slate-700">
          Preview mode
          <select
            value={previewMode}
            onChange={(event) => setPreviewMode(event.target.value as PreviewMode)}
            data-analytics-event="sql_preview_mode"
            className="border border-slate-300 rounded-md px-2 py-1"
          >
            {PREVIEW_MODE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-slate-700">
          Indent
          <select
            value={indentSize}
            onChange={(event) => setIndentSize(Number(event.target.value))}
            data-analytics-event="sql_indent"
            className="border border-slate-300 rounded-md px-2 py-1"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-slate-700">
          <input
            type="checkbox"
            checked={uppercaseKeywords}
            onChange={(event) => setUppercaseKeywords(event.target.checked)}
            data-analytics-event="sql_keyword_case"
            className="rounded border-slate-300"
          />
          Uppercase SQL keywords
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Input SQL</label>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste SQL query here..."
            data-analytics-event="sql_input"
            className="w-full h-[380px] rounded-xl border border-slate-300 px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-slate-500">Characters: {input.length}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Formatted output</label>
          <textarea
            value={output}
            readOnly
            placeholder="Beautified or minified SQL appears here..."
            className="w-full h-[380px] rounded-xl border border-slate-300 px-4 py-3 text-sm font-mono bg-slate-50"
          />
          <p className="text-xs text-slate-500">Characters: {output.length}</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        All SQL formatting runs locally in your browser. No query text is uploaded.
      </div>
    </div>
  );
}
