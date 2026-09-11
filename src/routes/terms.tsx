import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { breadcrumbLd, canonical, pageMeta, webSiteLd } from "@/lib/site";
import { ShieldCheck, FileText, Lock, Mail, ExternalLink } from "lucide-react";

const PATH = "/terms";
const TITLE = "Terms of Service — Clockitt App";
const DESCRIPTION =
  "Official Terms of Service for Clockitt task accountability app, including trial rules, lifetime pricing, AI photo proof verification, and user terms.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH }),
    links: canonical(PATH),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Terms of Service", path: PATH },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(webSiteLd) },
    ],
  }),
  component: Terms,
});

export function TermsSections() {
  return (
    <div className="space-y-10 text-sm leading-relaxed text-ink-soft sm:text-base">
      <div className="rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-md sm:p-6">
        <div className="grid gap-2 text-xs font-medium text-ink-soft sm:grid-cols-3 sm:text-sm">
          <div><strong className="text-ink">Effective Date:</strong> August 2026</div>
          <div><strong className="text-ink">App:</strong> Clockitt</div>
          <div><strong className="text-ink">Developer:</strong> Daniel (Solo Founder)</div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          1. Agreement to Terms
        </h2>
        <p>
          These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you") and the developer of Clockitt ("we," "us," "our"). By downloading, installing, accessing, or using the Clockitt mobile application ("App"), you confirm that you have read, understood, and agree to be bound by these Terms.
        </p>
        <p>
          If you are under the age of 13, you may not use Clockitt. If you are between 13 and 18, you must have parental or guardian consent. By using the App, you represent that you meet these age requirements.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          2. Description of Service
        </h2>
        <p>
          Clockitt is a task accountability application. The core mechanic works as follows:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>You set tasks and assign a specific deadline time to each task</li>
          <li>When the deadline arrives, an alarm fires on your device</li>
          <li>The alarm does not stop until you submit a photograph proving the task is complete</li>
          <li>Our AI system (powered by Anthropic's Claude) analyses the photo and determines whether it reasonably demonstrates task completion</li>
          <li>If verification passes, the alarm stops. If not, the alarm continues until a valid proof is submitted or you manually mark the task as incomplete.</li>
        </ul>
        <p className="rounded-xl border border-border/50 bg-background/50 p-4 text-xs italic text-ink-soft sm:text-sm">
          Clockitt is a productivity accountability tool, not an emergency service, medical device, or safety-critical application.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          3. Account Registration and Security
        </h2>
        <p>
          To use Clockitt you must create an account using a valid email address. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.
        </p>
        <p>You agree to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide accurate and complete information during registration</li>
          <li>Keep your password secure and not share it with others</li>
          <li>Notify us immediately at <a href="mailto:contact@useclockitt.app" className="font-semibold text-primary underline">contact@useclockitt.app</a> if you suspect unauthorised access</li>
          <li>Not create accounts for others without their explicit consent</li>
          <li>Not use another person's account without permission</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          4. Payments, Trial, and Refunds
        </h2>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-ink sm:text-lg">4.1 Free Trial</h3>
          <p>
            Clockitt offers a three (3) day free trial beginning from the date of account creation. During the trial, you have access to all features of the App at no charge. No credit card is required to start your trial.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-ink sm:text-lg">4.2 Paid Access</h3>
          <p>
            After your free trial expires, continued access to Clockitt requires a one-time payment of USD $5.00 (Five US Dollars). This is a one-time early access payment — you pay once for access during the early access period, with no recurring subscription fees.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-ink sm:text-lg">4.3 Payment Processing</h3>
          <p>
            Payments are processed by Dodo Payments, a third-party payment processor. By completing a payment, you agree to Dodo Payments' terms of service and privacy policy. We do not store your payment card information.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-ink sm:text-lg">4.4 Pricing Changes</h3>
          <p>
            The $5.00 price applies to users who purchase during the current early access period. We reserve the right to change the price for new users at any time. Existing paid users will not be charged additional fees for their early access tier regardless of future pricing changes.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-ink sm:text-lg">4.5 Refund Policy</h3>
          <p>
            Because Clockitt offers a free trial before payment is required, all sales are final and non-refundable once payment is completed. If you experience a technical issue preventing access after payment, contact us at <a href="mailto:contact@useclockitt.app" className="font-semibold text-primary underline">contact@useclockitt.app</a> within 7 days and we will work to resolve it.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          5. Acceptable Use Policy
        </h2>
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Use Clockitt for any unlawful purpose or in violation of any applicable laws</li>
          <li>Attempt to reverse engineer, decompile, or disassemble any part of the App</li>
          <li>Submit fraudulent or misleading proof photographs to deceive the verification system</li>
          <li>Use automated scripts, bots, or other means to interact with the App</li>
          <li>Interfere with or disrupt the integrity or performance of the App or its servers</li>
          <li>Attempt to gain unauthorised access to any part of the App or its infrastructure</li>
          <li>Use the App to harass, abuse, or harm other users or third parties</li>
          <li>Upload content that is illegal, harmful, defamatory, or infringes third-party rights</li>
          <li>Circumvent, disable, or otherwise interfere with security-related features of the App</li>
          <li>Use the App in any way that could damage our reputation or the Clockitt brand</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          6. Photo Proof Submissions and AI Verification
        </h2>
        <p>
          When you submit a photograph as proof of task completion, you grant us a limited, non-exclusive, royalty-free licence to process and analyse that photograph solely for the purpose of verifying task completion. Photographs are:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Transmitted securely to our storage system (Supabase)</li>
          <li>Analysed by Anthropic's Claude AI for verification purposes</li>
          <li>Stored privately and accessible only to you</li>
          <li>Never shared with other users or sold to third parties</li>
          <li>Retained for the duration of your account and deleted upon account deletion</li>
        </ul>
        <p>
          You must only submit photographs that you have the right to share. Do not submit photographs containing other people without their consent, confidential or sensitive information, illegal content, or content belonging to third parties.
        </p>
        <p>
          AI verification decisions are automated and based on reasonable interpretation of the submitted photograph against your task description. We do not guarantee that every legitimate proof will be accepted or that every fraudulent submission will be rejected. The AI system is designed to be fair and generous.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          7. Alarm System and Device Permissions
        </h2>
        <p>
          Clockitt's alarm functionality requires notification permissions on your device. By enabling notifications, you acknowledge that:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Alarms will fire at your specified deadline times, including when your device is locked</li>
          <li>The alarm will continue until you submit verified proof or manually stop it</li>
          <li>We are not responsible for alarms that fail to fire due to device settings, operating system restrictions, battery saver modes, or loss of connectivity</li>
          <li>You are responsible for setting appropriate deadlines and managing your own device settings</li>
          <li>Clockitt is a productivity tool and should not be relied upon for time-sensitive or safety-critical situations</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          8. Intellectual Property
        </h2>
        <p>
          The Clockitt application, including its design, code, graphics, mascot character (Kito), brand identity, logos, text, and all other content, is owned by or licensed to us and is protected by applicable intellectual property laws.
        </p>
        <p>
          You are granted a limited, non-exclusive, non-transferable, revocable licence to use the App on your personal devices for your personal, non-commercial use. You may not copy, modify, distribute, sell, or lease any part of the App or its content without our explicit written permission.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          9. Disclaimers and Limitation of Liability
        </h2>
        <p className="font-semibold text-ink">
          THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>We do not warrant that:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>The App will be uninterrupted, error-free, or available at all times</li>
          <li>All alarms will fire at the exact specified time on all devices and operating systems</li>
          <li>The AI verification system will correctly classify every submission</li>
          <li>The App will meet your specific productivity goals or accountability requirements</li>
        </ul>
        <p className="font-semibold text-ink">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM YOUR USE OF CLOCKITT SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE APP (USD $5.00). IN NO EVENT SHALL WE BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          10. Termination
        </h2>
        <p>
          You may stop using Clockitt at any time. You may delete your account from within the app Settings screen. Account deletion permanently removes your data from our systems within 30 days.
        </p>
        <p>
          We reserve the right to suspend or terminate your account without notice if you violate these Terms, engage in fraudulent activity, or use the App in a way that harms other users or our systems. Paid users who are terminated for cause are not entitled to a refund.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          11. Changes to These Terms
        </h2>
        <p>
          We may update these Terms from time to time. When we make material changes, we will notify you via the App or by email to the address associated with your account. Your continued use of Clockitt after such notification constitutes your acceptance of the updated Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          12. Governing Law and Disputes
        </h2>
        <p>
          These Terms are governed by applicable laws. Any disputes arising from these Terms or your use of Clockitt should first be directed to us at <a href="mailto:contact@useclockitt.app" className="font-semibold text-primary underline">contact@useclockitt.app</a>. We will make reasonable efforts to resolve disputes informally before any formal legal proceedings are initiated.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          13. Contact Information
        </h2>
        <div className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-2 backdrop-blur-md">
          <p><strong className="text-ink">Email:</strong> <a href="mailto:contact@useclockitt.app" className="text-primary underline font-medium">contact@useclockitt.app</a></p>
          <p><strong className="text-ink">Website:</strong> <a href="https://clockitt.app" target="_blank" rel="noreferrer noopener" className="text-primary underline font-medium inline-flex items-center gap-1">clockitt.app <ExternalLink className="h-3 w-3" /></a></p>
          <p><strong className="text-ink">X (Twitter):</strong> <a href="https://x.com/clockittapp" target="_blank" rel="noreferrer noopener" className="text-primary underline font-medium inline-flex items-center gap-1">@clockittapp <ExternalLink className="h-3 w-3" /></a></p>
          <p><strong className="text-ink">Developer:</strong> Daniel — Solo Founder, Clockitt</p>
        </div>
      </section>
    </div>
  );
}

function Terms() {
  return (
    <div className="canvas-gradient flex min-h-screen flex-col text-ink">
      <SiteHeader />
      <main id="main-content" className="flex-1 px-4 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs current="Terms of Service" />
          
          {/* Top Document Switcher Header */}
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
                Terms of Service
              </h1>
              <p className="mt-2 text-sm text-ink-soft sm:text-base">
                Effective Date: August 2026 • Clockitt App
              </p>
            </div>
            
            <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-card/80 p-1.5 backdrop-blur-md">
              <Link
                to="/terms"
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-sm transition-all sm:text-sm"
              >
                <FileText className="h-4 w-4" />
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-muted hover:text-ink transition-all sm:text-sm"
              >
                <ShieldCheck className="h-4 w-4" />
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <TermsSections />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
