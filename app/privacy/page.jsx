import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header subtitle="Privacy Policy" />
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: 2026-01-10</p>

        <div className="space-y-8 text-slate-700">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Summary</h2>
            <p>
              DevUtil runs entirely in your browser. Your inputs never leave your device, and we do not
              store, transmit, or process your data on a server.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Data We Collect</h2>
            <p>
              We do not collect personal data, tool inputs, or outputs. There are no accounts, logins,
              or server-side processing for any tool.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
            <p>
              DevUtil does not use cookies for tracking or profiling. Any browser storage used by the
              tools is limited to local preferences and remains on your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
            <p>
              DevUtil does not send your tool inputs to third parties. If you click external links, their
              privacy policies apply.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Security</h2>
            <p>
              Because processing happens locally, the best way to protect your data is to keep your
              device secure and up to date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Contact</h2>
            <p>
              If you have questions about this policy, reach out at <span className="font-medium">support@devutil.dev</span>.
            </p>
          </section>
        </div>

        <div className="mt-10">
          <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">Back to Home</a>
        </div>
      </main>

      <Footer className="mt-10" />
    </div>
  );
}
