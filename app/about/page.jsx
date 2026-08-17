import Footer from '../../components/Footer';
import Header from '../../components/Header';

export const metadata = {
  title: 'About — Privacy-First Developer Tools',
  description:
    'Learn about DevUtil: free, privacy-first developer utilities that run 100% in your browser. Built for speed, simplicity, and data safety.',
  alternates: { canonical: 'https://www.devutil.dev/about' },
  openGraph: {
    title: 'About DevUtil — Privacy-First Developer Tools',
    description:
      'Free developer tools that run entirely in your browser. No login, no uploads, always free.',
    url: 'https://www.devutil.dev/about',
    siteName: 'DevUtil',
    type: 'website',
    images: [{ url: 'https://www.devutil.dev/images/devutil-home.png', width: 1200, height: 630, alt: 'DevUtil' }]
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header subtitle="About" />
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">About DevUtil</h1>
        <p className="text-slate-700 mb-6">
          DevUtil is a collection of essential developer tools built for speed, simplicity, and privacy.
          Everything runs in your browser so your data never leaves your device.
        </p>
        <p className="text-slate-700 mb-6">
          Whether you need to format JSON or SQL, convert YAML ↔ JSON, build a cron expression, transform text case,
          encode Base64, generate a UUID, or decode a JWT — DevUtil gives you a clean, fast interface without
          accounts, paywalls, or uploads.
        </p>
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Our principles</h2>
        <ul className="list-disc list-inside text-slate-700 mb-6 space-y-2">
          <li>100% client-side processing — your inputs stay on your device</li>
          <li>Always free — no subscriptions or feature locks</li>
          <li>Single-purpose tools with clear defaults and instant results</li>
          <li>Strong internal linking so related workflows stay one click away</li>
        </ul>
        <p className="text-slate-700 mb-6">
          DevUtil is built and maintained by Sachin Kasana in India. Have a feature request? We welcome ideas that
          make developers more productive.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Browse all tools
          </a>
          <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
            Contact
          </a>
        </div>
      </main>

      <Footer className="mt-10" />
    </div>
  );
}
