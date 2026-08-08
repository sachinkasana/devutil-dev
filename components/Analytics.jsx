'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_ID } from '../lib/analytics-config';

export { GA_ID, UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from '../lib/analytics-config';

const TOOL_NAME_MAP = {
  json: 'JSON Formatter',
  sql: 'SQL Formatter',
  xml: 'XML Formatter',
  yaml: 'YAML ↔ JSON Converter',
  cron: 'Cron Generator',
  case: 'Case Converter',
  html: 'HTML Entity Encoder',
  base64: 'Base64 Encoder',
  diff: 'Diff Checker',
  uuid: 'UUID Generator',
  regex: 'Regex Tester',
  jwt: 'JWT Decoder',
  timestamp: 'Timestamp Converter',
  password: 'Password Generator',
  lorem: 'Lorem Ipsum Generator',
  qr: 'QR Code Generator',
  color: 'Color Picker',
  hash: 'Hash Generator',
  url: 'URL Encoder'
};

const SLUG_TO_TOOL = {
  'json-formatter': 'JSON Formatter',
  'sql-formatter': 'SQL Formatter',
  'xml-formatter': 'XML Formatter',
  'yaml-json-converter': 'YAML ↔ JSON Converter',
  'json-csv-converter': 'JSON ↔ CSV Converter',
  'cron-generator': 'Cron Generator',
  'case-converter': 'Case Converter',
  'html-entity-encoder': 'HTML Entity Encoder',
  'markdown-preview': 'Markdown Preview',
  'number-base-converter': 'Number Base Converter',
  'base64-encoder': 'Base64 Encoder',
  'diff-checker': 'Diff Checker',
  'uuid-generator': 'UUID Generator',
  'hash-generator': 'Hash Generator',
  'password-generator': 'Password Generator',
  'regex-tester': 'Regex Tester',
  'url-encoder': 'URL Encoder',
  'jwt-decoder': 'JWT Decoder',
  'timestamp-converter': 'Timestamp Converter',
  'qr-code-generator': 'QR Code Generator',
  'color-picker': 'Color Picker',
  'lorem-ipsum-generator': 'Lorem Ipsum Generator',
  guides: 'Guides',
  'whats-new': "What's New"
};

function toolFromPath(pathname = '') {
  const slug = pathname.replace(/^\//, '').split('/')[0];
  return SLUG_TO_TOOL[slug] || (slug ? slug : 'Home');
}

function buildEventParams(target, eventName, label) {
  const params = {
    event_category: 'engagement',
    event_label: label || undefined
  };

  if (typeof window !== 'undefined') {
    params.page_path = window.location.pathname;
    params.tool_name = toolFromPath(window.location.pathname);
  }

  if (target?.dataset) {
    const {
      analyticsTool,
      analyticsAction,
      analyticsFromTool,
      analyticsToTool,
      analyticsErrorType,
      analyticsNonInteraction
    } = target.dataset;

    if (analyticsTool) params.tool_name = analyticsTool;
    if (analyticsAction) params.action = analyticsAction;
    if (analyticsFromTool) params.from_tool = analyticsFromTool;
    if (analyticsToTool) params.to_tool = analyticsToTool;
    if (analyticsErrorType) params.error_type = analyticsErrorType;
    if (analyticsNonInteraction === 'true') params.non_interaction = true;
  }

  if (eventName) {
    const [toolKey, ...actionParts] = eventName.split('_');
    if (TOOL_NAME_MAP[toolKey]) {
      params.tool_name = TOOL_NAME_MAP[toolKey];
    }
    if (!params.action && actionParts.length) {
      params.action = actionParts.join('_');
    }
  }

  return params;
}

/** Send a custom event to GA4 + Umami (when available). */
export function trackEvent(eventName, label, target) {
  if (typeof window === 'undefined' || !eventName) return;

  const params = buildEventParams(target, eventName, label);

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  if (typeof window.umami?.track === 'function') {
    window.umami.track(eventName, {
      label: label || params.event_label || undefined,
      tool: params.tool_name,
      action: params.action,
      path: params.page_path
    });
  }
}

function whenReady(getFn, tries = 40) {
  return new Promise((resolve) => {
    let left = tries;
    const tick = () => {
      if (getFn()) {
        resolve(true);
        return;
      }
      left -= 1;
      if (left <= 0) {
        resolve(false);
        return;
      }
      setTimeout(tick, 100);
    };
    tick();
  });
}

function trackPageView(pathname, search = '') {
  if (typeof window === 'undefined') return;

  const pagePath = `${pathname}${search || ''}`;
  const toolName = toolFromPath(pathname);

  whenReady(() => typeof window.gtag === 'function').then((ok) => {
    if (!ok || !GA_ID) return;
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: document.title,
      tool_name: toolName
    });
    window.gtag('event', 'tool_page_view', {
      tool_name: toolName,
      page_path: pagePath
    });
  });

  whenReady(() => typeof window.umami?.track === 'function').then((ok) => {
    if (!ok) return;
    window.umami.track((props) => ({
      ...props,
      url: pagePath,
      title: document.title
    }));
  });
}

/**
 * Client analytics: SPA pageviews + delegated click/change events
 * for any element with data-analytics-event.
 */
export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams?.toString();
    trackPageView(pathname || '/', search ? `?${search}` : '');
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target?.closest?.('[data-analytics-event]');
      if (!target) return;
      const eventName = target.getAttribute('data-analytics-event');
      const label =
        target.getAttribute('data-analytics-label') || target.textContent?.trim();
      if (eventName) trackEvent(eventName, label, target);
    };

    const handleChange = (event) => {
      const target = event.target?.closest?.('[data-analytics-event]');
      if (!target) return;
      if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;
      const eventName = target.getAttribute('data-analytics-event');
      if (!eventName) return;
      let label = target.getAttribute('data-analytics-label');
      if (!label && target.type === 'checkbox') {
        label = target.checked ? 'on' : 'off';
      }
      if (!label && typeof target.value === 'string') {
        label = target.value.slice(0, 80);
      }
      trackEvent(eventName, label, target);
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('change', handleChange);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('change', handleChange);
    };
  }, []);

  return null;
}
