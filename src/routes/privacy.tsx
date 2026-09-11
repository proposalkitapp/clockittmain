import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { breadcrumbLd, canonical, pageMeta, webSiteLd } from "@/lib/site";
import { ShieldCheck, FileText, Lock, Mail, ExternalLink, CheckCircle2, XCircle } from "lucide-react";

const PATH = "/privacy";
const TITLE = "Privacy Policy — Clockitt App";
const DESCRIPTION =
  "Comprehensive Privacy Policy for Clockitt app. Learn what data we collect, how proof photos are processed by Claude AI, and how your data is protected.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH }),
    links: canonical(PATH),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: PATH },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(webSiteLd) },
    ],
  }),
  component: Privacy,
});

export function PrivacySections() {
  return (
    <div className="space-y-10 text-sm leading-relaxed text-ink-soft sm:text-base">
      <div className="rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-md sm:p-6">
        <p className="text-sm font-medium text-ink-soft sm:text-base">
          Your privacy matters. This Privacy Policy explains what data Clockitt collects, why we collect it, how we use it, and your rights regarding your data. We are committed to handling your information transparently and responsibly.
        </p>
      </div>

      {/* 1. Data We Collect */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          1. Data We Collect
        </h2>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-ink sm:text-lg">1.1 Account Data</h3>
          <p>When you create a Clockitt account, we collect:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li><strong className="text-ink">Email address</strong> — used for authentication and essential communications</li>
            <li><strong className="text-ink">Display name</strong> — the name you choose during onboarding</li>
            <li><strong className="text-ink">Password</strong> — stored as a secure hash, never in plain text</li>
            <li><strong className="text-ink">Timezone preference</strong> — used to fire alarms at the correct local time</li>
            <li><strong className="text-ink">Account creation date</strong> and trial expiry date</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-ink sm:text-lg">1.2 Task and Usage Data</h3>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Task titles and descriptions you create</li>
            <li>Deadline times you assign to tasks</li>
            <li>Task completion status (pending, verified, failed, snoozed)</li>
            <li>Timestamp of alarm firing, proof submission, and verification</li>
            <li>Snooze usage per task</li>
            <li>Incomplete task reasons (if you choose to provide one)</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-ink sm:text-lg">1.3 Proof Photographs</h3>
          <p>When you submit a photo as proof of task completion:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>The photograph is uploaded to secure cloud storage (Supabase Storage)</li>
            <li>The photograph is transmitted to Anthropic's Claude AI for verification analysis</li>
            <li>The photograph URL and Claude's verdict are stored against your task record</li>
            <li>Photographs are stored privately — only you can access them</li>
            <li>We do not view, share, or use your photographs for any purpose other than task verification</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-ink sm:text-lg">1.4 Gamification and Progress Data</h3>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Points balance and level (1–5)</li>
            <li>Current and longest streak</li>
            <li>Total tasks completed lifetime</li>
            <li>Achievement badges earned</li>
            <li>Last active date (for streak calculation)</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-ink sm:text-lg">1.5 Payment Data</h3>
          <p>
            Payments are processed by Dodo Payments. We do not collect or store your credit card number, bank account details, or other financial information. We receive only a confirmation of successful payment and a transaction reference ID from Dodo Payments.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-ink sm:text-lg">1.6 Device and Technical Data</h3>
          <ul className="list-disc space-y-1.5 pl-5">
            <li><strong className="text-ink">Expo Push Token</strong> — used to deliver alarm notifications to your device</li>
            <li><strong className="text-ink">Device timezone</strong> (for alarm scheduling accuracy)</li>
            <li><strong className="text-ink">App version</strong></li>
            <li>Basic crash and error logs (if errors occur)</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-2">
          <h3 className="text-base font-bold text-ink flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            1.7 What We Do NOT Collect
          </h3>
          <div className="grid gap-2 text-xs sm:grid-cols-2 sm:text-sm text-ink-soft pt-1">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Location data
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Contacts or address book
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Browsing history outside Clockitt
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Biometric data
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Health or medical information
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Data from other apps on your device
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Advertising identifiers (IDFA, GAID)
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Cookies or tracking pixels
            </div>
          </div>
        </div>
      </section>

      {/* 2. How We Use Your Data */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          2. How We Use Your Data
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border/70 bg-card/40 backdrop-blur-md">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-border/70 bg-muted/60 text-ink font-bold">
              <tr>
                <th className="p-3 sm:p-4">Purpose</th>
                <th className="p-3 sm:p-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-ink-soft">
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Authentication</td>
                <td className="p-3 sm:p-4">To verify your identity and maintain your login session</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Alarm delivery</td>
                <td className="p-3 sm:p-4">To send push notifications at your deadline times</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Task verification</td>
                <td className="p-3 sm:p-4">To send proof photos to Claude AI for analysis</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Streak and points</td>
                <td className="p-3 sm:p-4">To calculate and display your gamification progress</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">App functionality</td>
                <td className="p-3 sm:p-4">To store your tasks, deadlines, and history</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Payment confirmation</td>
                <td className="p-3 sm:p-4">To unlock paid access after successful payment</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">App improvement</td>
                <td className="p-3 sm:p-4">To identify and fix bugs using error logs</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Legal compliance</td>
                <td className="p-3 sm:p-4">To meet applicable legal obligations if required</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink-soft sm:text-sm">
          We do not use your data for advertising, we do not sell your data, and we do not share your data with third parties for their marketing purposes.
        </p>
      </section>

      {/* 3. Third-Party Services */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          3. Third-Party Services
        </h2>
        <p>
          Clockitt uses the following third-party services to operate. Each has its own privacy policy governing how they handle data.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border/70 bg-card/40 backdrop-blur-md">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-border/70 bg-muted/60 text-ink font-bold">
              <tr>
                <th className="p-3 sm:p-4">Service</th>
                <th className="p-3 sm:p-4">Privacy Policy</th>
                <th className="p-3 sm:p-4">What They Process</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-ink-soft">
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Supabase</td>
                <td className="p-3 sm:p-4">
                  <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer noopener" className="text-primary underline inline-flex items-center gap-1">supabase.com/privacy <ExternalLink className="h-3 w-3" /></a>
                </td>
                <td className="p-3 sm:p-4">Database storage, user authentication, and proof photo storage</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Anthropic</td>
                <td className="p-3 sm:p-4">
                  <a href="https://anthropic.com/privacy" target="_blank" rel="noreferrer noopener" className="text-primary underline inline-flex items-center gap-1">anthropic.com/privacy <ExternalLink className="h-3 w-3" /></a>
                </td>
                <td className="p-3 sm:p-4">Claude AI processes proof photos for task verification only</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Dodo Payments</td>
                <td className="p-3 sm:p-4">
                  <a href="https://dodopayments.com/privacy" target="_blank" rel="noreferrer noopener" className="text-primary underline inline-flex items-center gap-1">dodopayments.com/privacy <ExternalLink className="h-3 w-3" /></a>
                </td>
                <td className="p-3 sm:p-4">Processes the one-time $5 payment securely</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Expo / EAS</td>
                <td className="p-3 sm:p-4">
                  <a href="https://expo.dev/privacy" target="_blank" rel="noreferrer noopener" className="text-primary underline inline-flex items-center gap-1">expo.dev/privacy <ExternalLink className="h-3 w-3" /></a>
                </td>
                <td className="p-3 sm:p-4">Delivers push notifications via Expo Push service</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Vercel</td>
                <td className="p-3 sm:p-4">
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer noopener" className="text-primary underline inline-flex items-center gap-1">vercel.com/legal/privacy-policy <ExternalLink className="h-3 w-3" /></a>
                </td>
                <td className="p-3 sm:p-4">Hosts API routes and the Clockitt landing page</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Data Storage and Security */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          4. Data Storage and Security
        </h2>
        <p>Your data is stored on Supabase's servers with the following protections:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>All database tables use Row Level Security (RLS) — you can only access your own data</li>
          <li>Connections between the app and our servers use HTTPS/TLS encryption</li>
          <li>Passwords are hashed using industry-standard bcrypt — never stored in plain text</li>
          <li>Proof photographs are stored in private buckets accessible only to authenticated users</li>
          <li>API routes that handle sensitive operations require authentication tokens</li>
          <li>We do not store payment card details — Dodo Payments handles all payment data</li>
        </ul>
        <p className="text-xs italic text-ink-soft sm:text-sm">
          While we take reasonable technical measures to protect your data, no system is completely immune to security risks. We encourage you to use a strong, unique password for your Clockitt account.
        </p>
      </section>

      {/* 5. Data Retention */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          5. Data Retention
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border/70 bg-card/40 backdrop-blur-md">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-border/70 bg-muted/60 text-ink font-bold">
              <tr>
                <th className="p-3 sm:p-4">Data Type</th>
                <th className="p-3 sm:p-4">Retention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-ink-soft">
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Account data</td>
                <td className="p-3 sm:p-4">Retained until account deletion</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Task records</td>
                <td className="p-3 sm:p-4">Retained until account deletion</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Proof photographs</td>
                <td className="p-3 sm:p-4">Retained until account deletion</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Payment records</td>
                <td className="p-3 sm:p-4">Retained for 7 years (legal/accounting requirements)</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Error logs</td>
                <td className="p-3 sm:p-4">Deleted automatically after 30 days</td>
              </tr>
              <tr>
                <td className="p-3 sm:p-4 font-semibold text-ink">Push tokens</td>
                <td className="p-3 sm:p-4">Deleted when you sign out or delete account</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          When you delete your account, all personal data, tasks, and proof photographs are permanently deleted from our systems within 30 days, except where retention is required by law.
        </p>
      </section>

      {/* 6. Your Rights and Choices */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          6. Your Rights and Choices
        </h2>
        <p>You have the following rights regarding your personal data:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Access</strong> — You can view your task history, proof photos, and account data within the App at any time.</li>
          <li><strong className="text-ink">Correction</strong> — You can update your display name and email address in the Settings screen.</li>
          <li><strong className="text-ink">Deletion</strong> — You can delete your account from Settings &gt; Delete Account. This permanently removes all your data within 30 days.</li>
          <li><strong className="text-ink">Data export</strong> — To request a copy of your data, email <a href="mailto:contact@useclockitt.app" className="text-primary underline font-semibold">contact@useclockitt.app</a>. We will respond within 30 days.</li>
          <li><strong className="text-ink">Notification control</strong> — You can disable push notifications at any time in your device settings or in the App settings. Note that disabling notifications will prevent alarms from firing.</li>
          <li><strong className="text-ink">Opt out of communications</strong> — We send very few emails — primarily account-related notices. You can opt out of non-essential communications by contacting us.</li>
        </ul>
      </section>

      {/* 7. Children's Privacy */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          7. Children's Privacy
        </h2>
        <p>
          Clockitt is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:contact@useclockitt.app" className="text-primary underline font-semibold">contact@useclockitt.app</a> and we will delete the information promptly.
        </p>
        <p>
          Users between 13 and 18 years of age should have parental consent before using Clockitt. Parents are encouraged to monitor their children's use of the App.
        </p>
      </section>

      {/* 8. International Users */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          8. International Users
        </h2>
        <p>
          Clockitt is available globally. Your data may be processed and stored on servers located outside your country of residence. By using the App, you consent to the transfer of your data to these servers.
        </p>
        <p>
          If you are located in the European Economic Area (EEA), United Kingdom, or other regions with data protection laws, you may have additional rights under those laws (including GDPR). To exercise any additional rights, contact us at <a href="mailto:contact@useclockitt.app" className="text-primary underline font-semibold">contact@useclockitt.app</a>.
        </p>
      </section>

      {/* 9. AI Processing of Proof Photos */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          9. AI Processing of Proof Photos
        </h2>
        <p>Your proof photograph is analyzed by AI. Please be aware of the following:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Do not submit photos containing sensitive personal information, confidential business data, or third parties without their consent</li>
          <li>Clockitt stores the verification verdict and photo URL — not the raw photo content in our database directly</li>
        </ul>
      </section>

      {/* 10. Changes to This Privacy Policy */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          10. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy as Clockitt evolves. When we make significant changes, we will notify you through the App or via email. The "Last Updated" date at the top of this policy reflects the most recent revision. We encourage you to review this policy periodically.
        </p>
      </section>

      {/* 11. Contact Us About Privacy */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          11. Contact Us About Privacy
        </h2>
        <div className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-2 backdrop-blur-md">
          <p><strong className="text-ink">Email:</strong> <a href="mailto:contact@useclockitt.app" className="text-primary underline font-medium">contact@useclockitt.app</a></p>
          <p><strong className="text-ink">Website:</strong> <a href="https://clockitt.app/privacy" target="_blank" rel="noreferrer noopener" className="text-primary underline font-medium inline-flex items-center gap-1">clockitt.app/privacy <ExternalLink className="h-3 w-3" /></a></p>
          <p><strong className="text-ink">Response time:</strong> Within 30 days for data requests, within 7 days for general inquiries</p>
        </div>
      </section>
    </div>
  );
}

function Privacy() {
  return (
    <div className="canvas-gradient flex min-h-screen flex-col text-ink">
      <SiteHeader />
      <main id="main-content" className="flex-1 px-4 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs current="Privacy Policy" />

          {/* Top Document Switcher Header */}
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
                Privacy Policy
              </h1>
              <p className="mt-2 text-sm text-ink-soft sm:text-base">
                Clockitt Data Handling, AI Processing & Security Policy
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-card/80 p-1.5 backdrop-blur-md">
              <Link
                to="/terms"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-muted hover:text-ink transition-all sm:text-sm"
              >
                <FileText className="h-4 w-4" />
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-sm transition-all sm:text-sm"
              >
                <ShieldCheck className="h-4 w-4" />
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <PrivacySections />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
