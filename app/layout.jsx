// app/layout.jsx
// Replace your existing layout.jsx with this file.
// It sets global metadata, OG tags, and the BreadcrumbList schema.

import { SITE } from "./seo-config";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Free Developer Tools & Utilities Online — DevUtil",
    template: "%s | DevUtil",
  },
  description: SITE.description,
  keywords: [
    "developer tools",
    "free online tools",
    "json formatter",
    "base64 encoder",
    "uuid generator",
    "developer utilities",
    "privacy first tools",
    "client side tools",
  ].join(", "),
  authors: [{ name: "Sachin Kasana" }],
  creator: "Sachin Kasana",
  publisher: "DevUtil",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: "Free Developer Tools & Utilities Online — DevUtil",
    description: SITE.description,
    images: [
      {
        url: "/og-image.png", // Add a 1200×630 OG image to your /public folder
        width: 1200,
        height: 630,
        alt: "DevUtil — Free Developer Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Developer Tools & Utilities Online — DevUtil",
    description: SITE.description,
    images: ["/og-image.png"],
  },
  verification: {
    // Add your codes from Google Search Console and Bing Webmaster Tools:
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
    // other: { "msvalidate.01": "YOUR_BING_VERIFICATION_CODE" },
  },
};

// Site-wide WebSite schema — helps Google understand your brand
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Organization schema — helps with brand Knowledge Panel
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  foundingDate: "2026",
  founder: {
    "@type": "Person",
    name: "Sachin Kasana",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${SITE.url}/contact`,
  },
  sameAs: [
    "https://github.com/sachinkasana/devutil-dev",
    // Add Product Hunt, Twitter, etc. URLs here as you create them
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
