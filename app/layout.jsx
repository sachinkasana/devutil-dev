import { SITE } from "./seo-config";
import AnalyticsRoot from "../components/AnalyticsRoot";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Free Online Developer Tools — JSON, SQL, Base64 & More | DevUtil",
    template: "%s | DevUtil",
  },
  description: SITE.description,
  keywords: [
    "developer tools",
    "free online tools",
    "json formatter",
    "sql formatter",
    "yaml to json",
    "cron generator",
    "base64 encoder",
    "uuid generator",
    "xml formatter",
    "case converter",
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
    title: "Free Online Developer Tools — JSON, SQL, Base64 & More | DevUtil",
    description: SITE.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevUtil — Free Developer Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Developer Tools — JSON, SQL, Base64 & More | DevUtil",
    description: SITE.description,
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'h1FX8R7sRO-6jVd0dATODfLF_ablZtF6f5BnxP1zxOc',
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
};

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
  sameAs: ["https://github.com/sachinkasana/devutil-dev"],
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
      <body>
        {children}
        <AnalyticsRoot />
      </body>
    </html>
  );
}
