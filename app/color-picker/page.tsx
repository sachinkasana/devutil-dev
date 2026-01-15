import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ColorPickerTool from '../../components/ColorPickerTool';

export const metadata: Metadata = {
  title: 'Color Picker & Converter - HEX, RGB, HSL Online Tool | DevUtil',
  description: 'Pick colors visually and convert HEX to RGB or HSL. Generate palettes, copy color codes, and explore tints and shades. Free color picker.',
  keywords: [
    'color picker',
    'hex to rgb',
    'rgb to hsl',
    'color converter',
    'color palette generator',
    'hex color picker',
    'hsl color',
    'rgb color'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/color-picker'
  },
  openGraph: {
    title: 'Color Picker & Converter - HEX, RGB, HSL Online Tool | DevUtil',
    description: 'Pick colors visually and convert HEX to RGB or HSL. Generate palettes, copy color codes, and explore tints and shades.',
    url: 'https://www.devutil.dev/color-picker',
    siteName: 'DevUtil',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.devutil.dev/og.png',
        width: 1200,
        height: 630,
        alt: 'DevUtil'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Picker & Converter - HEX, RGB, HSL Online Tool | DevUtil',
    description: 'Pick colors visually and convert HEX to RGB or HSL. Generate palettes, copy color codes, and explore tints and shades.',
    images: ['https://www.devutil.dev/og.png']
  },
  robots: {
    index: true,
    follow: true
  }
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Color Picker',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Any',
  image: 'https://www.devutil.dev/og.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description: 'Free online color picker with HEX, RGB, and HSL conversion plus palette generation.',
  url: 'https://www.devutil.dev/color-picker',
  publisher: {
    '@type': 'Organization',
    name: 'DevUtil',
    url: 'https://www.devutil.dev/'
  }
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.devutil.dev'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Color Picker',
      item: 'https://www.devutil.dev/color-picker'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between HEX, RGB, and HSL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HEX is a base-16 format used in CSS, RGB uses red/green/blue values, and HSL uses hue, saturation, and lightness.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I convert HEX to RGB or HSL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Enter a HEX value or pick a color and the tool converts it to RGB and HSL instantly.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I copy color codes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the Copy buttons next to HEX, RGB, or HSL to copy the value to your clipboard.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does the palette update automatically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The palette regenerates based on the current base color so you can explore tints and shades.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is the color picker free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The color picker and converters are free and run client-side.'
      }
    }
  ]
};

export default function ColorPickerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header subtitle="Color Picker" />
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Color Picker & Converter</h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
            Pick colors visually, convert HEX to RGB or HSL, and build instant palettes. Copy color codes for design
            systems, CSS, or UI mockups.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <ColorPickerTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-10 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is a color picker?</h2>
            <p>
              A color picker lets you select a color visually and read its values in different formats. Designers use
              it to build palettes, while developers use it to copy HEX, RGB, or HSL values into CSS and design tokens.
            </p>
            <p>
              This tool combines a visual picker with converters so you can move between formats without manual math.
              It also generates a palette of tints and shades for UI systems.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">HEX, RGB, and HSL explained</h2>
            <p>
              HEX is a base-16 format commonly used in web design. RGB represents red, green, and blue channels as
              numbers from 0 to 255. HSL represents hue, saturation, and lightness, which makes it easier to adjust a
              color while keeping the same hue.
            </p>
            <p>
              If you need predictable tints, HSL is often easier to reason about. If you need exact values for images
              or canvas work, RGB is a better fit. HEX is a compact format that is widely supported in CSS.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How HEX colors work</h2>
            <p>
              HEX colors are just RGB values written in base-16. The first two characters represent red, the next two
              represent green, and the last two represent blue. For example, #2563EB means red 37, green 99, and blue
              235.
            </p>
            <p>
              HEX is popular because it is short and easy to paste into CSS. It is also consistent across tools, so a
              HEX value from a design file will match what you see in the browser.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Convert HEX to RGB or HSL</h2>
            <p>
              Paste a HEX value and the tool converts it to RGB and HSL instantly. This helps when you have a brand
              color from a design system but need different formats for code or tools.
            </p>
            <p>
              The conversion is lossless because HEX is just a compact form of RGB. HSL conversion is derived from the
              RGB channels and is ideal for adjusting lightness or saturation.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Use HSL for theming</h2>
            <p>
              HSL is great for theming because you can hold hue steady and adjust saturation or lightness. This helps
              you create lighter backgrounds, darker borders, and consistent hover states without changing the color
              identity.
            </p>
            <p>
              Many design systems use HSL to generate color scales. It keeps variations balanced and predictable.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Generate palettes for UI work</h2>
            <p>
              Consistent UI systems rely on tints and shades. This color picker generates a palette based on your base
              color so you can create hover states, borders, backgrounds, and accents quickly.
            </p>
            <p>
              Click any swatch to set it as the new base color. This is useful when you want to explore variations or
              adjust contrast without starting over.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Palette types you can build</h2>
            <p>
              Use a monochrome palette for clean UI components or generate a range of tints and shades for buttons and
              cards. For charts and data, pick distinct base colors and generate lighter variants for hover states.
            </p>
            <p>
              For brand work, start with your primary color and build a scale so you can use the same hue across
              backgrounds, borders, and text.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Accessibility and contrast</h2>
            <p>
              Color contrast affects readability. When building UI components, aim for strong contrast between text and
              backgrounds. A color picker helps you explore lighter and darker shades to meet accessibility needs.
            </p>
            <p>
              Use the palette to select a darker color for text on light backgrounds or a lighter color for text on
              dark backgrounds. This reduces eye strain and improves compliance with accessibility guidelines.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Common color mistakes</h2>
            <p>
              Many UI issues come from low contrast or overly saturated colors. Bright colors can look harsh on white
              backgrounds, while very light colors can disappear on cards. Use tints and shades to create balance.
            </p>
            <p>
              Another common mistake is mixing too many hues. Keep a small set of base colors and vary lightness for
              hierarchy. This keeps interfaces calm and consistent.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Design system workflow</h2>
            <p>
              Start with a primary brand color and generate a palette. Choose a few key steps for text, borders, and
              backgrounds. Document the HEX and HSL values so designers and developers can align.
            </p>
            <p>
              When you need new variants, adjust lightness in HSL rather than picking a random new hue. This keeps the
              visual system cohesive across components.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">CSS variables and design tokens</h2>
            <p>
              Store your colors as CSS variables so you can update them in one place. Use the HEX values for base
              tokens and HSL for programmatic adjustments. This keeps themes consistent and easier to maintain.
            </p>
            <p>
              A simple approach is to define a primary scale like --color-primary-500 and then reference it across
              buttons, links, and highlights. Use palette swatches to fill out the rest of the scale.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Color on different devices</h2>
            <p>
              Colors can look different on various screens due to brightness, color profiles, and ambient light. Test
              important UI colors on a phone and a desktop monitor to catch extreme shifts.
            </p>
            <p>
              If a color feels too bright or too dull on some displays, adjust the lightness in HSL and regenerate the
              palette. Small tweaks can improve consistency across devices.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Color picker use cases</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Extract HEX or RGB values for CSS and design tokens.</li>
              <li>Convert brand colors to HSL for easier adjustments.</li>
              <li>Generate consistent palettes for product UI.</li>
              <li>Create color ramps for data visualizations.</li>
              <li>Match colors between Figma, Photoshop, and code.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Best practices for color systems</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Keep a small base palette and use tints and shades for variants.</li>
              <li>Test colors on real devices and backgrounds before shipping.</li>
              <li>Use HSL for systematic adjustments to lightness.</li>
              <li>Document HEX values so designers and developers stay aligned.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Examples</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">Example: Convert a brand color</h3>
                <p>Paste a HEX value from a style guide and copy the RGB or HSL values for CSS.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Example: Build a UI palette</h3>
                <p>Pick a base color and click a lighter swatch for backgrounds or hover states.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Example: Match a design tool</h3>
                <p>Use the picker to match colors between Figma and your codebase.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">FAQ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">What is the difference between HEX, RGB, and HSL?</h3>
                <p>HEX is a base-16 format used in CSS, RGB uses red/green/blue values, and HSL uses hue, saturation, and lightness.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Can I convert HEX to RGB or HSL?</h3>
                <p>Yes. Enter a HEX value or pick a color and the tool converts it to RGB and HSL instantly.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">How do I copy color codes?</h3>
                <p>Use the Copy buttons next to HEX, RGB, or HSL to copy the value to your clipboard.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Does the palette update automatically?</h3>
                <p>Yes. The palette regenerates based on the current base color so you can explore tints and shades.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Is the color picker free?</h3>
                <p>Yes. The color picker and converters are free and run client-side.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
