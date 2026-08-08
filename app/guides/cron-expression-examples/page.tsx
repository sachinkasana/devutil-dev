import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import RelatedTools from '../../../components/RelatedTools';

export const metadata = {
  title: 'Cron Expression Examples — Common Schedules Explained',
  description:
    'Practical cron examples for hourly, daily, weekly, and monthly jobs. Learn the 5-field format and build expressions visually.',
  alternates: { canonical: 'https://www.devutil.dev/guides/cron-expression-examples' }
};

export default function CronExamplesGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header subtitle="Guides" />
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-slate">
        <p className="text-sm text-slate-500">
          <a href="/guides" className="text-blue-600 hover:underline">Guides</a> / Cron Expression Examples
        </p>
        <h1>Cron Expression Examples</h1>
        <p>
          Cron uses five fields: <code>minute hour day-of-month month day-of-week</code>. Below are common
          schedules you can adapt for servers, CI, or cloud job runners.
        </p>
        <p>
          <a className="font-semibold text-blue-600" href="/cron-generator">Build a cron expression visually →</a>
        </p>

        <h2>Useful presets</h2>
        <ul>
          <li><code>* * * * *</code> — every minute</li>
          <li><code>0 * * * *</code> — every hour at minute 0</li>
          <li><code>0 0 * * *</code> — every day at midnight</li>
          <li><code>0 0 * * 0</code> — every Sunday at midnight</li>
          <li><code>0 0 1 * *</code> — first day of each month at midnight</li>
          <li><code>*/15 * * * *</code> — every 15 minutes</li>
        </ul>

        <h2>Timezone reminder</h2>
        <p>
          Cron usually runs in the host timezone unless your platform documents otherwise. Always confirm timezone
          settings for GitHub Actions, Kubernetes CronJobs, and cloud schedulers.
        </p>

        <h2>Related tools</h2>
        <ul>
          <li><a href="/timestamp-converter">Timestamp Converter</a> for epoch ↔ human dates</li>
          <li><a href="/regex-tester">Regex Tester</a> for validating schedule-related strings</li>
        </ul>

        <RelatedTools current="cron-generator" />
      </main>
      <Footer />
    </div>
  );
}
