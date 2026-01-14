import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Page Not Found | DevUtil',
  description: 'The page you are looking for could not be found. Explore DevUtil tools instead.'
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="Page not found" />
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
          <p className="text-sm uppercase tracking-widest text-slate-500">404 Error</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-4 text-slate-600">
            Try one of the popular utilities below or head back to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              Go to homepage
            </Link>
            <Link
              href="/json-formatter"
              className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-colors"
            >
              JSON Formatter
            </Link>
            <Link
              href="/base64-encoder"
              className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-colors"
            >
              Base64 Encoder
            </Link>
            <Link
              href="/uuid-generator"
              className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-colors"
            >
              UUID Generator
            </Link>
            <Link
              href="/regex-tester"
              className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-colors"
            >
              Regex Tester
            </Link>
          </div>
        </div>
      </main>
      <Footer variant="simple" />
    </div>
  );
}
