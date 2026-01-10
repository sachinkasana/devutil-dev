import { Code } from 'lucide-react';

export default function Footer({ variant = 'compact', className = '' }) {
  if (variant === 'full') {
    return (
      <footer className={`bg-slate-900 text-slate-400 py-12 ${className}`.trim()}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-lg">DevUtil</span>
              </div>
              <p className="text-sm">
                Essential developer tools and utilities. Built with privacy in mind.
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Popular Tools</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/json-formatter" className="hover:text-white transition-colors">JSON Formatter</a></li>
                <li><a href="/base64-encoder" className="hover:text-white transition-colors">Base64 Encoder</a></li>
                <li><a href="/uuid-generator" className="hover:text-white transition-colors">UUID Generator</a></li>
                <li><a href="/hash-generator" className="hover:text-white transition-colors">Hash Generator</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">More Tools</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/regex-tester" className="hover:text-white transition-colors">Regex Tester</a></li>
                <li><a href="/url-encoder" className="hover:text-white transition-colors">URL Encoder</a></li>
                <li><a href="/jwt-decoder" className="hover:text-white transition-colors">JWT Decoder</a></li>
                <li><a href="/timestamp-converter" className="hover:text-white transition-colors">Timestamp Converter</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">About</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="https://github.com" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>© 2026 DevUtil.dev - All rights reserved. Made with ❤️ by Sachin in India.</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`bg-slate-900 text-slate-400 py-8 mt-16 ${className}`.trim()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">© 2026 DevUtil.dev - All rights reserved.</p>
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <a href="/about" className="hover:text-white transition-colors">About</a>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-xs text-slate-500 mt-4">Made with ❤️ by Sachin in India.</p>
      </div>
    </footer>
  );
}
