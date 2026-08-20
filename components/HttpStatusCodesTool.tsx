'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

export type StatusCode = {
  code: number;
  name: string;
  category: '1xx' | '2xx' | '3xx' | '4xx' | '5xx';
  summary: string;
  useWhen: string;
  example: string;
};

export const HTTP_STATUS_CODES: StatusCode[] = [
  { code: 100, name: 'Continue', category: '1xx', summary: 'Interim response — client should continue the request.', useWhen: 'Expect: 100-continue uploads.', example: 'Client sends headers first; server replies 100 before body.' },
  { code: 101, name: 'Switching Protocols', category: '1xx', summary: 'Server is switching protocols as requested.', useWhen: 'WebSocket upgrades.', example: 'Upgrade: websocket → 101 Switching Protocols.' },
  { code: 200, name: 'OK', category: '2xx', summary: 'Request succeeded.', useWhen: 'Successful GET/POST/PUT responses.', example: 'GET /api/users → 200 with JSON body.' },
  { code: 201, name: 'Created', category: '2xx', summary: 'Resource was created.', useWhen: 'Successful POST that creates an entity.', example: 'POST /users → 201 + Location header.' },
  { code: 202, name: 'Accepted', category: '2xx', summary: 'Accepted for processing but not completed.', useWhen: 'Async jobs / queues.', example: 'POST /exports → 202 { jobId }.' },
  { code: 204, name: 'No Content', category: '2xx', summary: 'Success with empty body.', useWhen: 'DELETE or PUT with no response body.', example: 'DELETE /items/1 → 204.' },
  { code: 301, name: 'Moved Permanently', category: '3xx', summary: 'Resource permanently moved to a new URI.', useWhen: 'Canonical URL / SEO redirects.', example: 'http → https permanent redirect.' },
  { code: 302, name: 'Found', category: '3xx', summary: 'Temporary redirect (historical “Found”).', useWhen: 'Short-lived redirects; prefer 307/308 when method must stay.', example: 'Login gate temporary redirect.' },
  { code: 304, name: 'Not Modified', category: '3xx', summary: 'Cached copy is still valid.', useWhen: 'Conditional GET with ETag/If-Modified-Since.', example: 'Browser revalidates asset → 304.' },
  { code: 307, name: 'Temporary Redirect', category: '3xx', summary: 'Temporary redirect; method and body must not change.', useWhen: 'Preserve POST across redirect.', example: 'POST /pay → 307 → /pay-v2.' },
  { code: 308, name: 'Permanent Redirect', category: '3xx', summary: 'Permanent redirect; method and body must not change.', useWhen: 'API path renames that keep POST.', example: 'POST /v1/orders → 308 /v2/orders.' },
  { code: 400, name: 'Bad Request', category: '4xx', summary: 'Server cannot process the request due to client error.', useWhen: 'Invalid JSON, missing fields, bad query.', example: 'Malformed JSON body → 400.' },
  { code: 401, name: 'Unauthorized', category: '4xx', summary: 'Authentication is required or failed.', useWhen: 'Missing/invalid token or credentials.', example: 'No Authorization header → 401.' },
  { code: 403, name: 'Forbidden', category: '4xx', summary: 'Authenticated but not allowed.', useWhen: 'Permission / RBAC denial.', example: 'User role cannot delete → 403.' },
  { code: 404, name: 'Not Found', category: '4xx', summary: 'Resource does not exist.', useWhen: 'Unknown path or missing entity.', example: 'GET /users/999 → 404.' },
  { code: 405, name: 'Method Not Allowed', category: '4xx', summary: 'HTTP method not supported for this resource.', useWhen: 'Wrong verb on an endpoint.', example: 'DELETE on read-only route → 405.' },
  { code: 408, name: 'Request Timeout', category: '4xx', summary: 'Server timed out waiting for the request.', useWhen: 'Slow clients / dropped connections.', example: 'Client stalled mid-upload → 408.' },
  { code: 409, name: 'Conflict', category: '4xx', summary: 'Request conflicts with current resource state.', useWhen: 'Duplicate keys, version conflicts.', example: 'Email already registered → 409.' },
  { code: 410, name: 'Gone', category: '4xx', summary: 'Resource permanently removed.', useWhen: 'Retired endpoints or deleted content.', example: 'Old API path intentionally gone → 410.' },
  { code: 413, name: 'Payload Too Large', category: '4xx', summary: 'Request body exceeds server limits.', useWhen: 'Upload size limits.', example: '50MB file when limit is 10MB → 413.' },
  { code: 415, name: 'Unsupported Media Type', category: '4xx', summary: 'Content-Type not supported.', useWhen: 'Wrong body format.', example: 'Sent XML to JSON-only API → 415.' },
  { code: 422, name: 'Unprocessable Entity', category: '4xx', summary: 'Syntax OK but semantic validation failed.', useWhen: 'Form/field validation errors.', example: 'age: -1 → 422 with field errors.' },
  { code: 429, name: 'Too Many Requests', category: '4xx', summary: 'Rate limit exceeded.', useWhen: 'API throttling / abuse protection.', example: '60 req/min exceeded → 429 + Retry-After.' },
  { code: 500, name: 'Internal Server Error', category: '5xx', summary: 'Unexpected server failure.', useWhen: 'Unhandled exceptions.', example: 'Null pointer in handler → 500.' },
  { code: 501, name: 'Not Implemented', category: '5xx', summary: 'Server does not support the functionality.', useWhen: 'Unimplemented methods/features.', example: 'TRACE disabled → 501.' },
  { code: 502, name: 'Bad Gateway', category: '5xx', summary: 'Gateway/proxy got an invalid response upstream.', useWhen: 'Reverse proxies, CDN, API gateways.', example: 'Nginx upstream crash → 502.' },
  { code: 503, name: 'Service Unavailable', category: '5xx', summary: 'Server temporarily unavailable.', useWhen: 'Maintenance, overload.', example: 'Deploy window → 503.' },
  { code: 504, name: 'Gateway Timeout', category: '5xx', summary: 'Upstream did not respond in time.', useWhen: 'Slow backends behind a proxy.', example: 'Upstream DB hang → 504.' }
];

const CATEGORIES = ['all', '1xx', '2xx', '3xx', '4xx', '5xx'] as const;

const categoryColor: Record<string, string> = {
  '1xx': 'bg-slate-100 text-slate-700',
  '2xx': 'bg-green-100 text-green-800',
  '3xx': 'bg-blue-100 text-blue-800',
  '4xx': 'bg-amber-100 text-amber-900',
  '5xx': 'bg-red-100 text-red-800'
};

export default function HttpStatusCodesTool() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HTTP_STATUS_CODES.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (!q) return true;
      return (
        String(item.code).includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.useWhen.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-analytics-event="http_status_search"
            placeholder="Search 429, Not Found, rate limit…"
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              data-analytics-event="http_status_filter"
              data-analytics-label={c}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                category === c
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-500">
        Showing {filtered.length} of {HTTP_STATUS_CODES.length} common status codes
      </p>

      <div className="space-y-3">
        {filtered.map((item) => (
          <article
            key={item.code}
            id={`status-${item.code}`}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-2xl font-bold text-slate-900">{item.code}</span>
              <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${categoryColor[item.category]}`}>
                {item.category}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-700">{item.summary}</p>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <p>
                <span className="font-medium text-slate-900">Use when: </span>
                <span className="text-slate-600">{item.useWhen}</span>
              </p>
              <p>
                <span className="font-medium text-slate-900">Example: </span>
                <span className="text-slate-600">{item.example}</span>
              </p>
            </div>
          </article>
        ))}
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
            No status codes match that search.
          </p>
        ) : null}
      </div>
    </div>
  );
}
