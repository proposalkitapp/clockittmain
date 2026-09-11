import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlarmClock, BadgeCheck, Camera, Check, CheckCircle2, Cpu, DollarSign, Flame, HelpCircle, Lock, RefreshCw, Shield, ShieldCheck, Sparkles } from "lucide-react";

import { joinWaitlist } from "@/lib/waitlist.functions";
import { supabase } from "@/integrations/supabase/client";
import { canonical, homeGraphLd, pageMeta } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TiltCard } from "@/components/ui/tilt-card";
import { Floating3DMascot } from "@/components/ui/floating-3d-mascot";
import { Alarm3DBadge } from "@/components/ui/alarm-3d-badge";

const mascot = "/clockitt-mascot.png";

const faqs = [
  {
    q: "What is Clockitt?",
    a: "Clockitt is an AI-powered goal accountability app and persistent alarm designed to eliminate procrastination. When an alarm fires at your deadline, it continues ringing until you submit photo proof that Claude Vision AI verifies against your committed task.",
  },
  {
    q: "How does photo proof verification work?",
    a: "When your alarm fires at your deadline, you take a quick photo of your finished task. Claude Vision AI analyzes the photo in real time to verify it matches your committed goal before silencing the alarm.",
  },
  {
    q: "What happens if I fail to submit proof or want to snooze?",
    a: "Clockitt eliminates the traditional snooze button. The alarm keeps firing until valid photo proof is submitted and verified, ensuring commitments cannot be brushed aside.",
  },
  {
    q: "How much does Clockitt cost and is there a free trial?",
    a: "Early access waitlist members receive a risk-free 3-day free trial and lock in a founder rate of $5/month before public launch rates increase.",
  },
  {
    q: "Can I use Clockitt with an accountability partner?",
    a: "Yes. In addition to AI verification, Clockitt allows you to pair with friends, teammates, or study partners for shared check-ins and mutual streak accountability.",
  },
  {
    q: "Are my photos, goals, and personal data kept private?",
    a: "Yes. All verification photos and goals are protected with 256-bit SSL encryption. Photos are used strictly for AI verification and are never shared publicly or sold.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Clockitt — AI Photo Proof Accountability & Habit Alarm App",
        description:
          "Clockitt is the accountability app and alarm that won't shut up until you submit AI-verified photo proof of your finished goal. Lock in $5/month founder access.",
        path: "/",
      }),
      {
        name: "keywords",
        content:
          "accountability app, AI alarm app, photo proof alarm, goal tracker, daily goals, habit accountability, Claude Vision productivity, Clockitt",
      },
    ],
    links: canonical("/"),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(homeGraphLd(faqs)) },
    ],
  }),

  component: Index,
});

const pillars = [
  { icon: AlarmClock, title: "The alarm doesn’t stop on its own", copy: "Snooze into oblivion elsewhere. Here, the alarm keeps firing at your deadline until you submit proof. Silence is earned." },
  { icon: Camera, title: "AI checks your proof, not your honor system", copy: "Snap a photo. Claude Vision verifies it matches the task. You can’t fake yesterday’s gym selfie." },
  { icon: Flame, title: "Streaks that mean something", copy: "Every check-in is verified, so your streak isn’t a lie you tell yourself. Five levels, real momentum." },
  { icon: DollarSign, title: "$5/month. First 3 days free.", copy: "$5/mo — For a coach that never lets you off the hook. Waitlist members get locked in before public launch." },
];

const trustSignals = [
  {
    icon: ShieldCheck,
    title: "100% Data Encryption & Privacy",
    copy: "Daily goals and verification photos are secured with 256-bit SSL encryption. Data is never shared publicly or used for model training.",
  },
  {
    icon: RefreshCw,
    title: "Risk-Free 3-Day Trial Guarantee",
    copy: "Full access to Clockitt with a 3-day free trial. Cancel anytime with zero commitment before public launch.",
  },
  {
    icon: Lock,
    title: "Lifetime Founder Rate Guarantee",
    copy: "Waitlist members lock in the $5/month founder rate for life before public launch pricing increases.",
  },
  {
    icon: CheckCircle2,
    title: "Zero-Spam & Instant Opt-Out",
    copy: "One-click unsubscribe and full data deletion rights adhering strictly to GDPR and CCPA privacy standards.",
  },
];

const proofMetrics = [
  { label: "Photo Verification", value: "Claude Vision" },
  { label: "Encrypted Storage", value: "256-Bit SSL" },
  { label: "Trial Guarantee", value: "3 Days Free" },
  { label: "Founder Pricing", value: "$5/mo Locked" },
];

function Index() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value.includes("@") || value.length > 255) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const result = await joinWaitlist({ data: { email: value } });
      if (!result.ok) {
        const { error: directError } = await supabase
          .from("waitlist_signups")
          .insert({ email: value });
        if (directError && directError.code !== "23505") {
          setError("Something went wrong. Please try again.");
          return;
        }
      }
      setJoined(true);
    } catch {
      try {
        const { error: directError } = await supabase
          .from("waitlist_signups")
          .insert({ email: value });
        if (directError && directError.code !== "23505") {
          setError("Something went wrong. Please try again.");
          return;
        }
        setJoined(true);
      } catch {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="canvas-gradient min-h-screen text-ink flex flex-col overflow-x-hidden">
      <SiteHeader />

      <main id="main-content" className="flex-1">
        <section className="relative overflow-hidden px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            
            {/* Interactive 3D Mascot Floating Hero */}
            <div className="mx-auto mb-6 w-fit">
              <Floating3DMascot src={mascot} alt="Clockitt rooster mascot" />
            </div>

            {/* 3D Glass Badge CTA */}
            <div className="mb-6 inline-block">
              <a
                href="#waitlist"
                aria-label="Jump to Clockitt early access waitlist signup"
                className="inline-block transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                <Alarm3DBadge>Get Early Access To Clockitt &rarr;</Alarm3DBadge>
              </a>
            </div>

            {/* Hero Main Heading with Entrance Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-balance text-[2.65rem] font-extrabold leading-[1.03] tracking-[-0.03em] sm:text-6xl md:text-7xl"
            >
              <span className="block text-sm sm:text-lg font-bold uppercase tracking-[0.16em] text-amber-deep mb-2 sm:mb-3">
                Clockitt &bull; AI Goal Accountability &amp; Habit Alarm
              </span>
              The alarm that won&rsquo;t shut up{" "}
              <span className="bg-gradient-to-br from-amber to-amber-deep bg-clip-text text-transparent">
                until you prove it.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              <strong>Clockitt</strong> is the AI-powered goal accountability app and persistent alarm. When your deadline fires, it <strong>doesn&rsquo;t stop until you submit photo proof</strong> verified by Claude Vision AI. No proof, no silence.
            </motion.p>

            <motion.div
              id="waitlist"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mx-auto mt-9 max-w-xl scroll-mt-24"
            >
              {joined ? (
                <TiltCard className="flex items-center justify-center gap-3 py-5 text-sm font-semibold">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full cta-gradient text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </span>
                  You're on the list. We'll wake you when it's time.
                </TiltCard>
              ) : (
                <>
                  <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/70 p-2 shadow-lg backdrop-blur-xl sm:p-3">
                    <form
                      onSubmit={onSubmit}
                      className="flex flex-col gap-2 sm:flex-row sm:items-center"
                    >
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="min-w-0 flex-1 bg-transparent px-5 py-3.5 text-base text-ink outline-none placeholder:text-muted-foreground"
                      />
                      <motion.button
                        type="submit"
                        name="join-waitlist"
                        aria-label="Join Clockitt early access waitlist"
                        disabled={submitting}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="cta-gradient group inline-flex items-center justify-center gap-2 rounded-[1.25rem] px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all disabled:opacity-70"
                      >
                        {submitting ? "Joining…" : "Join the waitlist"}
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground transition-transform group-hover:scale-125" />
                      </motion.button>
                    </form>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-soft">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-deep shrink-0" />
                    <span><strong>100% Privacy Protected</strong> &bull; <strong>Zero Spam Guarantee</strong> &bull; <strong>Cancel Anytime</strong></span>
                  </div>
                </>
              )}
              {error && (
                <p className="mt-3 text-sm font-medium text-destructive" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    { src: "/avatar-1.jpg", alt: "Clockitt early supporter" },
                    { src: "/avatar-2.png", alt: "Clockitt early supporter" },
                    { src: "/avatar-3.jpg", alt: "Clockitt early supporter" },
                  ].map((a) => (
                    <img
                      key={a.src}
                      src={a.src}
                      alt={a.alt}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full border-2 border-background object-cover shadow-sm"
                    />
                  ))}
                </div>
                <p className="text-sm text-ink-soft">
                  <strong>6 founders</strong> are already on the waitlist.
                </p>
              </div>

              {/* 3D Proof Metrics Grid */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-xl mx-auto text-center">
                {proofMetrics.map(({ label, value }, idx) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                  >
                    <TiltCard tiltDegree={12} className="p-3 text-center">
                      <p className="text-xs font-bold text-ink">{value}</p>
                      <p className="text-[0.65rem] text-ink-soft">{label}</p>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Why Clockitt Works Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20 text-center"
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Why Clockitt Works
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                Accountability designed so snooze is no longer an option.
              </p>
            </motion.div>

            {/* 3D Glassmorphism Pillars Grid */}
            <div className="mt-8 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map(({ icon: Icon, title, copy }, idx) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <TiltCard tiltDegree={15} className="h-full p-5">
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-ink shadow-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-bold tracking-tight text-ink">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{copy}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* Commercial Proof & Guarantees Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-left"
            >
              <TiltCard tiltDegree={6} className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-amber-deep" />
                  <h2 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
                    Commercial Proof &amp; Privacy Guarantees
                  </h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {trustSignals.map(({ icon: Icon, title, copy }) => (
                    <div key={title} className="flex flex-col gap-1.5 rounded-2xl bg-card/50 p-4 border border-border/50">
                      <div className="flex items-center gap-2 font-semibold text-sm text-ink">
                        <Icon className="h-4 w-4 shrink-0 text-amber-deep" />
                        <span>{title}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-ink-soft">{copy}</p>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>

            {/* AI Verification Methodology & Architecture Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-left"
            >
              <TiltCard tiltDegree={6} className="p-6 sm:p-8">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/60 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-amber-deep" />
                      <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                        AI Verification Methodology &amp; Security Architecture
                      </h2>
                    </div>
                    <p className="mt-1 text-xs text-ink-soft">
                      How Clockitt validates goal completion, protects user data, and enforces accountability.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[0.7rem] font-semibold text-ink-soft bg-accent/60 px-3 py-1.5 rounded-full w-fit">
                    <BadgeCheck className="h-3.5 w-3.5 text-amber-deep" />
                    <span>Methodology Reviewed: September 2026</span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                  <div className="rounded-2xl bg-card/60 p-4 border border-border/60">
                    <div className="flex items-center gap-2 font-bold text-ink mb-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-deep text-[0.65rem] font-bold text-white">1</span>
                      <h3>Task Goal Definition</h3>
                    </div>
                    <p className="text-ink-soft leading-relaxed">
                      You record a specific daily goal and deadline. The target outcome is stored with cryptographic timestamps.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-card/60 p-4 border border-border/60">
                    <div className="flex items-center gap-2 font-bold text-ink mb-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-deep text-[0.65rem] font-bold text-white">2</span>
                      <h3>Deadline Alarm Firing</h3>
                    </div>
                    <p className="text-ink-soft leading-relaxed">
                      When the deadline arrives, the persistent alarm fires continuously until a live photo proof submission is received.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-card/60 p-4 border border-border/60">
                    <div className="flex items-center gap-2 font-bold text-ink mb-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-deep text-[0.65rem] font-bold text-white">3</span>
                      <h3>Claude Vision AI Analysis</h3>
                    </div>
                    <p className="text-ink-soft leading-relaxed">
                      Claude 3.5 Vision analyzes the visual attributes of the photo against your committed goal before silencing the alarm.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-card/60 p-4 border border-border/60">
                    <div className="flex items-center gap-2 font-bold text-ink mb-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-deep text-[0.65rem] font-bold text-white">4</span>
                      <h3>Encrypted Proof Logging</h3>
                    </div>
                    <p className="text-ink-soft leading-relaxed">
                      Verified check-in increments your streak. Proof photos are encrypted with 256-bit SSL and never used for model training.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-accent/40 px-4 py-3 text-xs text-ink-soft border border-border/40">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-deep shrink-0" />
                    <span><strong>Data Provenance:</strong> Engineered by the Clockitt Team &bull; Privacy-First Architecture &bull; GDPR &amp; CCPA Compliant</span>
                  </div>
                  <a
                    href="mailto:support@clockitt.app"
                    className="font-semibold text-ink underline hover:text-amber-deep transition-colors"
                  >
                    Questions? Contact support@clockitt.app &rarr;
                  </a>
                </div>
              </TiltCard>
            </motion.div>

            {/* Answer Engine Quick Facts & Core Entity Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-left"
            >
              <TiltCard tiltDegree={6} className="p-6 sm:p-8">
                <div className="mb-6 text-center sm:text-left">
                  <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    Clockitt at a Glance
                  </h2>
                  <p className="mt-1 text-xs text-ink-soft">
                    Key facts and core specifications for the Clockitt accountability platform.
                  </p>
                </div>
                <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-xs">
                  <div className="rounded-2xl bg-card/60 p-4 border border-border/60">
                    <dt className="font-bold text-ink mb-1">What is Clockitt?</dt>
                    <dd className="text-ink-soft leading-relaxed">
                      An AI goal accountability app and persistent alarm that eliminates snooze by requiring verified photo proof to silence.
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-card/60 p-4 border border-border/60">
                    <dt className="font-bold text-ink mb-1">Verification Engine</dt>
                    <dd className="text-ink-soft leading-relaxed">
                      Claude Vision AI inspects your submitted photo in real time to ensure it matches your committed daily task.
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-card/60 p-4 border border-border/60">
                    <dt className="font-bold text-ink mb-1">Pricing & Free Trial</dt>
                    <dd className="text-ink-soft leading-relaxed">
                      $5/month early access founder pricing with a risk-free 3-day free trial before public launch.
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-card/60 p-4 border border-border/60">
                    <dt className="font-bold text-ink mb-1">Accountability Modes</dt>
                    <dd className="text-ink-soft leading-relaxed">
                      Solo AI photo verification or dual-partner check-ins with friends, teammates, and study partners.
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-card/60 p-4 border border-border/60">
                    <dt className="font-bold text-ink mb-1">Streak Momentum</dt>
                    <dd className="text-ink-soft leading-relaxed">
                      Five-level streak system rewarding consistent verified daily follow-through and habit retention.
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-card/60 p-4 border border-border/60">
                    <dt className="font-bold text-ink mb-1">Data & Privacy</dt>
                    <dd className="text-ink-soft leading-relaxed">
                      256-bit SSL encrypted storage. Verification photos are kept private and never shared publicly or sold.
                    </dd>
                  </div>
                </dl>
              </TiltCard>
            </motion.div>

            {/* Frequently Asked Questions Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-left"
            >
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 text-sm text-ink-soft">
                  Everything you need to know about Clockitt early access.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {faqs.map(({ q, a }, idx) => (
                  <motion.div
                    key={q}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <TiltCard tiltDegree={10} className="h-full p-5">
                      <div className="flex items-center gap-2 font-bold text-sm text-ink mb-1.5">
                        <HelpCircle className="h-4 w-4 shrink-0 text-amber-deep" />
                        <h3>{q}</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-ink-soft">{a}</p>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* In-body Links Bar */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
              <span className="text-ink-soft">Explore Clockitt:</span>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-1 text-ink underline underline-offset-4 transition-colors hover:text-amber-deep"
              >
                How Clockitt works &rarr;
              </Link>
              <Link
                to="/accountability-partner"
                className="inline-flex items-center gap-1 text-ink underline underline-offset-4 transition-colors hover:text-amber-deep"
              >
                Accountability partner app &rarr;
              </Link>
              <Link
                to="/privacy"
                className="inline-flex items-center gap-1 text-ink underline underline-offset-4 transition-colors hover:text-amber-deep"
              >
                Privacy policy &rarr;
              </Link>
              <Link
                to="/terms"
                className="inline-flex items-center gap-1 text-ink underline underline-offset-4 transition-colors hover:text-amber-deep"
              >
                Terms of service &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
