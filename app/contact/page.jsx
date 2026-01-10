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
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Personal Contact</h2>
          <ul className="space-y-2 text-slate-700">
            <li>
              Email: <a href="mailto:sachinksana@gmail.com" className="text-blue-600 hover:text-blue-700">sachinksana@gmail.com</a>
            </li>
            <li>
              X: <a href="https://x.com/sachinkasanag" className="text-blue-600 hover:text-blue-700">@sachinkasanag</a>
            </li>
            <li>
              Instagram: <a href="https://www.instagram.com/sachinkasana3570" className="text-blue-600 hover:text-blue-700">@sachinkasana3570</a>
            </li>
            <li>
              LinkedIn: <a href="https://www.linkedin.com/in/sachin-kasana/" className="text-blue-600 hover:text-blue-700">sachin-kasana</a>
            </li>
          </ul>
        </div>
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Support DevUtil</h2>
          <p className="text-sm text-slate-200 mb-4">
            If you find DevUtil helpful, you can support ongoing development.
          </p>
          <a
            href="https://buymeacoffee.com/sachinkasana"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-yellow-400 text-slate-900 font-medium hover:bg-yellow-300 transition-colors"
          >
            Buy me a coffee
          </a>
        </div>

        <div className="mt-10">
          <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">Back to Home</a>
        </div>
      </main>

      <Footer className="mt-10" />
    </div>
  );
}
