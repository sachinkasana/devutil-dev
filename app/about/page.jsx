import Footer from '../../components/Footer';
import Header from '../../components/Header';

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
          Our goal is to make day-to-day developer tasks faster and safer, with a clean interface that
          works everywhere.
        </p>
        <p className="text-slate-700">
          Have a feature request? We welcome ideas that make developers more productive.
        </p>

        <div className="mt-10">
          <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">Back to Home</a>
        </div>
      </main>

      <Footer className="mt-10" />
    </div>
  );
}
