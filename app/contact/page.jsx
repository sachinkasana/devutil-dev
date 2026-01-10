import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header subtitle="Contact" />
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contact</h1>
        <p className="text-slate-700 mb-6">
          For support, feedback, or partnership inquiries, email us at
          <span className="font-medium"> support@devutil.dev</span>.
        </p>
        <p className="text-slate-700">
          We read every message and prioritize requests that improve privacy, usability, and speed.
        </p>

        <div className="mt-10">
          <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">Back to Home</a>
        </div>
      </main>

      <Footer className="mt-10" />
    </div>
  );
}
