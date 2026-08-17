import Footer from '../../components/Footer';
import Header from '../../components/Header';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'DevUtil privacy policy: all tools run in your browser. We do not collect, store, or transmit your tool inputs.',
  alternates: { canonical: 'https://www.devutil.dev/privacy' }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header subtitle="Privacy Policy" />
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: 2026-08-08</p>

        <div className="space-y-8 text-slate-700">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Summary</h2>
            <p>
              DevUtil tool processing runs entirely in your browser. Your tool inputs (JSON, passwords,
              tokens, SQL, etc.) are never uploaded to our servers. We use lightweight analytics only to
              understand aggregate traffic and product usage — not to read your tool content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Tool Data</h2>
            <p>
              We do not collect, store, or transmit the content you paste into tools. There are no accounts
              or logins required to use DevUtil utilities, and tools do not send your inputs to a backend
              for processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Analytics</h2>
            <p className="mb-3">
              To improve the product and understand which tools people use, we collect anonymous usage
              metrics such as page views, tool opens, and UI interactions (for example, copy/generate
              button clicks). We do <strong>not</strong> send the text or files you process in tools to
              analytics providers.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Google Analytics 4</strong> — page views and events, with IP anonymization enabled.
              </li>
              <li>
                <strong>Umami</strong> — privacy-focused traffic analytics (visitors, pages, referrers,
                devices).
              </li>
              <li>
                <strong>Vercel Analytics</strong> — anonymous performance / Web Vitals when hosted on Vercel.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
            <p>
              Analytics providers may set cookies or similar storage for session measurement. Tool
              preferences that stay on your device use local browser storage only. We do not use
              advertising cookies or sell personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
            <p>
              Analytics vendors process aggregate traffic data under their own policies. If you click
              external links (GitHub, Buy Me a Coffee, social profiles), those sites&apos; privacy policies
              apply.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Security</h2>
            <p>
              Because tool processing happens locally, the best way to protect sensitive inputs is to keep
              your device secure. Avoid pasting production secrets on shared computers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Contact</h2>
            <p>
              If you have questions about this policy, reach out at{' '}
              <span className="font-medium">support@devutil.dev</span>.
            </p>
          </section>
        </div>

        <div className="mt-10">
          <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Back to Home
          </a>
        </div>
      </main>

      <Footer className="mt-10" />
    </div>
  );
}
