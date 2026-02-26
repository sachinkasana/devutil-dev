// app/sitemap.js
// Next.js App Router will automatically serve this at /sitemap.xml
// No extra config needed — just place this file in /app/

import { SITE, TOOLS } from "./seo-config";

export default function sitemap() {
  const now = new Date().toISOString();

  // Homepage
  const staticRoutes = [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE.url}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // All tool pages
  const toolRoutes = Object.keys(TOOLS).map((slug) => ({
    url: `${SITE.url}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...toolRoutes];
}
