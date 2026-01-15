import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import QrCodeGeneratorTool from '../../components/QrCodeGeneratorTool';

export const metadata: Metadata = {
  title: 'Free QR Code Generator Online - Create QR Codes for URLs & WiFi | DevUtil',
  description: 'Create QR codes for URLs, WiFi, vCards, and text. Customize size, colors, and error correction. 100% client-side QR code generator.',
  keywords: [
    'qr code generator',
    'qr code maker',
    'qr code creator',
    'wifi qr code',
    'vcard qr code',
    'free qr code generator',
    'qr code for url',
    'qr code for text',
    'qr code download'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/qr-code-generator'
  },
  openGraph: {
    title: 'Free QR Code Generator Online - Create QR Codes for URLs & WiFi | DevUtil',
    description: 'Create QR codes for URLs, WiFi, vCards, and text. Customize size, colors, and error correction. 100% client-side.',
    url: 'https://www.devutil.dev/qr-code-generator',
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
    title: 'Free QR Code Generator Online - Create QR Codes for URLs & WiFi | DevUtil',
    description: 'Create QR codes for URLs, WiFi, vCards, and text. Customize size, colors, and error correction. 100% client-side.',
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
  name: 'QR Code Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  image: 'https://www.devutil.dev/og.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description: 'Free online QR code generator for URLs, WiFi, vCards, and text.',
  url: 'https://www.devutil.dev/qr-code-generator',
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
      name: 'QR Code Generator',
      item: 'https://www.devutil.dev/qr-code-generator'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is the QR code data uploaded anywhere?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. QR codes are generated in your browser and nothing is uploaded.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I generate a QR code for WiFi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Choose the WiFi tab, enter the network name, password, and encryption type.'
      }
    },
    {
      '@type': 'Question',
      name: 'What error correction level should I use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Medium or Quartile works for most cases. Use High if the code may be damaged or printed small.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I use custom colors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pick foreground and background colors. Keep strong contrast for reliable scanning.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I download the QR code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Use the Download PNG button to save the QR code image.'
      }
    }
  ]
};

export default function QrCodeGeneratorPage() {
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

      <Header subtitle="QR Code Generator" />
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Free QR Code Generator Online</h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
            Create QR codes for links, WiFi, vCards, or any text. Customize size, colors, and error correction. All QR
            codes are generated in your browser for fast, private results.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <QrCodeGeneratorTool />
        </div>

        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-10 text-slate-600">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is a QR code?</h2>
            <p>
              A QR code (Quick Response code) is a two-dimensional barcode that stores data in a grid of black and
              white squares. Phones and scanners read the grid and decode the stored data instantly. QR codes are
              common in marketing, payments, events, and product packaging because they are fast and easy to scan.
            </p>
            <p>
              Unlike a traditional barcode that only stores a short number, a QR code can hold URLs, contact cards,
              WiFi credentials, or plain text. This makes it a flexible format for sharing data without typing.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How QR codes work</h2>
            <p>
              A QR code encodes data into small squares called modules. The code includes finder patterns in the
              corners so a scanner can detect orientation and size. Error correction allows the code to be read even if
              part of it is damaged or covered.
            </p>
            <p>
              When you scan a QR code, your phone decodes the modules and interprets the result. If it is a URL, your
              phone opens a browser. If it is WiFi data, your phone can connect without typing the password.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why use a QR code generator?</h2>
            <p>
              QR codes make sharing fast and frictionless. They reduce typing errors and make long URLs easy to access.
              A QR code generator lets you create codes for links, events, and contact info in seconds.
            </p>
            <p>
              For teams, QR codes also improve tracking and conversion. You can put the same QR code on posters,
              packaging, or business cards and monitor how users scan and engage.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Popular QR code use cases</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Share URLs for landing pages, portfolios, or app downloads.</li>
              <li>Create WiFi QR codes so guests can join instantly.</li>
              <li>Generate vCard QR codes for business cards and events.</li>
              <li>Embed contact info or payment links for fast checkout.</li>
              <li>Link to menus, event tickets, or social profiles.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to create a QR code</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Choose the QR type: URL/Text, WiFi, or vCard.</li>
              <li>Fill in the data and customize size, margin, or colors.</li>
              <li>Download the PNG or copy the data to reuse.</li>
              <li>Test the QR code on mobile before publishing.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">QR codes for WiFi</h2>
            <p>
              WiFi QR codes let guests connect instantly without typing a password. Enter the network name, password,
              and encryption type. Phones will prompt to join the network after scanning.
            </p>
            <p>
              This is perfect for cafes, offices, event venues, or Airbnb hosts. It reduces support requests and keeps
              passwords secure because you do not need to share them verbally.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">QR codes for vCards</h2>
            <p>
              A vCard QR code stores contact details like name, phone, email, and company. When scanned, most phones
              offer to create a new contact. This is faster than typing details from a business card.
            </p>
            <p>
              Use a vCard QR code for events, resumes, or networking. You can also add a website link to drive traffic
              to your portfolio or LinkedIn profile.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Choosing size and error correction</h2>
            <p>
              Larger QR codes are easier to scan, especially on posters or signage. A 256px code is good for screens,
              while print often needs 300px or more depending on distance. Error correction improves scan reliability
              when a code is small or printed on uneven surfaces.
            </p>
            <p>
              Use Medium or Quartile for most cases. Use High if the code might get scratched, stretched, or partially
              covered. Higher error correction creates denser codes, so balance it with size.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">QR code size guidelines</h2>
            <p>
              A simple rule is that the QR code should be at least 2 cm by 2 cm for small printed materials. For
              posters or signage viewed from a distance, increase the size so the code is easy to scan. The farther the
              viewer stands, the larger the code should be.
            </p>
            <p>
              When printing, avoid scaling the image after download. Generate a QR code at the target size so the
              modules stay crisp. Blurry edges can lower scan success, especially with small codes.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Static vs dynamic QR codes</h2>
            <p>
              A static QR code stores data directly in the image. It is permanent and does not change. A dynamic QR
              code points to a URL that can redirect to different destinations later.
            </p>
            <p>
              This tool creates static QR codes. If you need dynamic tracking or editing, use a short link service and
              generate a QR code for that URL.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">QR codes for payments and tickets</h2>
            <p>
              Payment links and tickets are common QR code targets. You can embed a payment URL or a ticket page so
              users can scan and complete checkout without typing. For events, QR codes can speed up check-in and reduce
              lines at the entrance.
            </p>
            <p>
              If you use QR codes for payments, add a short label so users know the destination. For tickets, test
              scanning in the same lighting conditions as the event.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Best practices for QR codes</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Keep strong contrast between foreground and background colors.</li>
              <li>Leave enough margin so scanners can detect the edges.</li>
              <li>Test the code on multiple devices before printing.</li>
              <li>Avoid low contrast color pairs like light gray on white.</li>
              <li>Add a short caption so users know what they will open.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Scanning tips</h2>
            <p>
              Most phones can scan QR codes with the default camera app. Keep the code in good light and avoid glossy
              reflections. If the code is on a screen, increase brightness to improve contrast.
            </p>
            <p>
              If scanning fails, increase the size, improve contrast, or raise the error correction level. These small
              adjustments can dramatically improve scan reliability.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Security and privacy</h2>
            <p>
              QR codes are just a way to store data, but the destination still matters. Always verify URLs before
              scanning in public spaces. For sensitive data, avoid embedding secrets directly in the code.
            </p>
            <p>
              This tool runs client-side, so your data never leaves your device. That makes it safe for private WiFi
              credentials or internal contact details.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Examples</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">Example: Share a URL</h3>
                <p>Paste a landing page link and generate a QR code for marketing materials.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Example: WiFi access</h3>
                <p>Generate a WiFi QR code so guests can connect without typing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Example: vCard contact</h3>
                <p>Create a vCard QR code for your digital business card.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">FAQ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">Is the QR code data uploaded anywhere?</h3>
                <p>No. QR codes are generated in your browser and nothing is uploaded.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Can I generate a QR code for WiFi?</h3>
                <p>Yes. Choose the WiFi tab, enter the network name, password, and encryption type.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">What error correction level should I use?</h3>
                <p>Medium or Quartile works for most cases. Use High if the code may be damaged or printed small.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Can I use custom colors?</h3>
                <p>Yes. Pick foreground and background colors. Keep strong contrast for reliable scanning.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Can I download the QR code?</h3>
                <p>Yes. Use the Download PNG button to save the QR code image.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
