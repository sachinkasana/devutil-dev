'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GA_ID = 'G-60HX9JGQBJ';

const TOOL_NAME_MAP = {
  json: 'JSON Formatter',
  base64: 'Base64 Encoder',
  uuid: 'UUID Generator',
  regex: 'Regex Tester',
  jwt: 'JWT Decoder',
  timestamp: 'Timestamp Converter',
  password: 'Password Generator',
  lorem: 'Lorem Ipsum Generator',
  qr: 'QR Code Generator',
  color: 'Color Picker',
  hash: 'Hash Generator'
};

const buildEventParams = (target, eventName, label) => {
  const params = {
    event_category: 'engagement',
    event_label: label || undefined
  };

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
    if (!params.tool_name && TOOL_NAME_MAP[toolKey]) {
      params.tool_name = TOOL_NAME_MAP[toolKey];
    }
    if (!params.action && actionParts.length) {
      params.action = actionParts.join('_');
    }
  }

  return params;
};

const trackEvent = (eventName, label, target) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, buildEventParams(target, eventName, label));
};

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;
    window.gtag('config', GA_ID, { page_path: pathname });
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target?.closest?.('[data-analytics-event]');
      if (!target) return;
      const eventName = target.getAttribute('data-analytics-event');
      const label = target.getAttribute('data-analytics-label') || target.textContent?.trim();
      if (eventName) {
        trackEvent(eventName, label, target);
      }
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
        label = target.value;
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
