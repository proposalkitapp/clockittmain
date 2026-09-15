import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlarmClock, BadgeCheck, Camera, Check, CheckCircle2, Cpu, DollarSign, Flame, HelpCircle, Lock, RefreshCw, Shield, ShieldCheck } from "lucide-react";

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
    a: "Clockitt is an AI-powered goal accountability app and persistent morning alarm designed to eliminate procrastination and snooze habits. When an alarm fires at your deadline, it continues ringing until you submit live photo proof verified by AI.",
  },
  {
    q: "How does AI photo proof verification work?",
    a: "When your alarm fires at your deadline, you capture a photo of your completed task. Clockitt's AI analyzes the image in real time to verify visual alignment with your committed goal before silencing the alarm.",
  },
  {
    q: "What happens if I fail to submit proof or want to snooze?",
    a: "Clockitt eliminates the traditional snooze button. The alarm continues firing until valid photo proof is submitted and verified by AI, ensuring commitments cannot be avoided or delayed.",
  },
  {
    q: "Who is Clockitt designed for?",
    a: "Clockitt is designed for entrepreneurs, students, fitness enthusiasts, and professionals who struggle with morning alarms, task procrastination, and unverified habit tracking.",
  },
  {
    q: "How much does Clockitt cost and is there a free trial?",
    a: "Early access waitlist members receive a risk-free 3-day free trial and lock in a lifetime founder rate of $5/month before public launch pricing increases.",
  },
  {
    q: "Can I use Clockitt with an accountability partner?",
    a: "Yes. In addition to solo AI photo verification, Clockitt allows you to pair with friends, teammates, or study partners for dual check-ins and mutual streak accountability.",
  },
  {
    q: "How is Clockitt different from standard habit trackers and alarm clocks?",
    a: "Standard habit apps rely on the honor system where you can check off boxes without doing the work, and standard alarms let you snooze endlessly. Clockitt requires verified visual proof verified by AI before silence is granted.",
  },
  {
    q: "Are my photos, goals, and personal data kept private?",
    a: "Yes. All verification photos and daily goals are protected with 256-bit SSL encryption. Photos are used exclusively for verification and are never shared publicly, sold, or used to train public AI models.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Clockitt — AI Photo Proof Goal Accountability & Habit Alarm App",
        description:
          "Clockitt is the AI-powered goal accountability app and un-snoozeable alarm that requires verified photo proof to silence. Lock in $5/month founder pricing.",
        path: "/",
      }),
      {
        name: "keywords",
        content:
          "accountability app, AI alarm app, photo proof alarm, goal tracker, daily goals, habit accountability, AI photo verification, Clockitt",
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
  { icon: Camera, title: "AI checks your proof, not your honor system", copy: "Snap a photo. Clockitt AI verifies it matches the task. You can’t fake yesterday’s gym selfie." },
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
  { label: "Photo Verification", value: "Instant AI Vision" },
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
    if (!value.includes("@") || !value.includes(".") || value.length > 255) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      // 1. Try server function first (triggers transactional welcome email)
      const result = await joinWaitlist({ data: { email: value } });
      if (result?.ok) {
        setJoined(true);
        return;
      }

      console.warn("Server function returned non-ok, trying direct client insert:", result);

      // 2. Direct client insert fallback
      const { error: directError } = await supabase
        .from("waitlist_signups")
        .insert({ email: value });

      if (directError && directError.code !== "23505") {
        console.error("Direct waitlist insert error:", directError);
        setError("Unable to join the waitlist. Please check your connection and try again.");
        return;
      }
      setJoined(true);
    } catch (err) {
      console.warn("Server function threw error, attempting direct client insert fallback:", err);
      try {
        const { error: directError } = await supabase
          .from("waitlist_signups")
          .insert({ email: value });

        if (directError && directError.code !== "23505") {
          console.error("Direct fallback waitlist error:", directError);
          setError("Unable to join the waitlist. Please check your connection and try again.");
          return;
        }
        setJoined(true);
      } catch (fallbackErr) {
        console.error("Fatal waitlist error:", fallbackErr);
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
        {/* Hero Section (Spacious max-w-5xl) */}
        <section className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-5xl text-center">
            
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
              className="text-balance text-[2.75rem] font-extrabold leading-[1.03] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[5rem]"
            >
              <span className="block text-sm sm:text-lg font-bold uppercase tracking-[0.16em] text-amber-deep mb-3 sm:mb-4">
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
              className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink-soft sm:text-xl"
            >
              <strong>Clockitt</strong> is the AI-powered goal accountability app and persistent alarm. When your deadline fires, it <strong>doesn&rsquo;t stop until you submit photo proof</strong> verified by AI. No proof, no silence.
            </motion.p>

            <motion.div
              id="waitlist"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mx-auto mt-9 max-w-2xl scroll-mt-24"
            >
              {joined ? (
                <TiltCard className="flex items-center justify-center gap-3 py-6 text-base font-semibold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full cta-gradient text-primary-foreground">
                    <Check className="h-5 w-5" />
                  </span>
                  You're on the list. We'll wake you when it's time.
                </TiltCard>
              ) : (
                <>
                  <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/70 p-2.5 shadow-xl backdrop-blur-xl sm:p-3.5">
                    <form
                      onSubmit={onSubmit}
                      className="flex flex-col gap-2.5 sm:flex-row sm:items-center"
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
                        className="cta-gradient group inline-flex items-center justify-center gap-2 rounded-[1.25rem] px-7 py-4 text-sm font-bold text-primary-foreground shadow-lg transition-all disabled:opacity-70"
                      >
                        {submitting ? "Joining…" : "Join the waitlist"}
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground transition-transform group-hover:scale-125" />
                      </motion.button>
                    </form>
                  </div>
                  <div className="mt-3.5 flex items-center justify-center gap-2 text-xs text-ink-soft">
                    <ShieldCheck className="h-4 w-4 text-amber-deep shrink-0" />
                    <span><strong>100% Privacy Protected</strong> &bull; <strong>Zero Spam Guarantee</strong> &bull; <strong>Cancel Anytime</strong></span>
                  </div>
                </>
              )}
              {error && (
                <p className="mt-3 text-sm font-medium text-destructive" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-7 flex flex-col items-center gap-3">
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

              {/* 3D Proof Metrics Grid (Spacious max-w-3xl) */}
              <div className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-4 max-w-3xl mx-auto text-center">
                {proofMetrics.map(({ label, value }, idx) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                  >
                    <TiltCard tiltDegree={10} className="p-3.5 sm:p-4 text-center">
                      <p className="text-sm font-bold text-ink">{value}</p>
                      <p className="text-[0.7rem] text-ink-soft mt-0.5">{label}</p>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Clockitt Works Section (Spacious max-w-6xl) */}
        <section className="mx-auto max-w-6xl px-5 sm:px-8 mt-16 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Why Clockitt Works
            </h2>
            <p className="mt-2 text-base text-ink-soft max-w-xl mx-auto">
              Accountability designed so snooze is no longer an option.
            </p>
          </motion.div>

          {/* 3D Glassmorphism Pillars 4-Card Grid */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, copy }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard tiltDegree={12} className="h-full p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-ink shadow-sm">
                      <Icon className="h-5 w-5 text-amber-deep" />
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{copy}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Commercial Proof & Guarantees Section (Spacious max-w-6xl) */}
        <section className="mx-auto max-w-6xl px-5 sm:px-8 mt-16 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard tiltDegree={6} className="p-6 sm:p-10">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                  <ShieldCheck className="h-6 w-6 text-amber-deep" />
                </span>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    Commercial Proof &amp; Privacy Guarantees
                  </h2>
                  <p className="text-xs text-ink-soft mt-0.5">Built with security and consumer protection from day one.</p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {trustSignals.map(({ icon: Icon, title, copy }) => (
                  <div key={title} className="flex flex-col gap-2 rounded-2xl bg-card/50 p-5 border border-border/50">
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
        </section>

        {/* AI Verification Methodology & Architecture Section (Spacious max-w-6xl) */}
        <section className="mx-auto max-w-6xl px-5 sm:px-8 mt-16 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard tiltDegree={6} className="p-6 sm:p-10">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-5">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
                      <Cpu className="h-5 w-5 text-amber-deep" />
                    </span>
                    <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                      AI Verification Methodology &amp; Security Architecture
                    </h2>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft sm:text-sm">
                    How Clockitt validates goal completion, protects user data, and enforces accountability.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft bg-accent/60 px-3.5 py-1.5 rounded-full w-fit">
                  <BadgeCheck className="h-4 w-4 text-amber-deep" />
                  <span>Methodology Reviewed: September 2026</span>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <div className="flex items-center gap-2.5 font-bold text-ink mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-deep text-xs font-bold text-white">1</span>
                    <h3 className="text-sm">Task Goal Definition</h3>
                  </div>
                  <p className="text-ink-soft leading-relaxed">
                    You record a specific daily goal and deadline. The target outcome is stored with cryptographic timestamps.
                  </p>
                </div>

                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <div className="flex items-center gap-2.5 font-bold text-ink mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-deep text-xs font-bold text-white">2</span>
                    <h3 className="text-sm">Deadline Alarm Firing</h3>
                  </div>
                  <p className="text-ink-soft leading-relaxed">
                    When the deadline arrives, the persistent alarm fires continuously until a live photo proof submission is received.
                  </p>
                </div>

                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <div className="flex items-center gap-2.5 font-bold text-ink mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-deep text-xs font-bold text-white">3</span>
                    <h3 className="text-sm">AI Photo Analysis</h3>
                  </div>
                  <p className="text-ink-soft leading-relaxed">
                    Our AI vision system analyzes the visual attributes of the photo against your committed goal before silencing the alarm.
                  </p>
                </div>

                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <div className="flex items-center gap-2.5 font-bold text-ink mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-deep text-xs font-bold text-white">4</span>
                    <h3 className="text-sm">Encrypted Proof Logging</h3>
                  </div>
                  <p className="text-ink-soft leading-relaxed">
                    Verified check-in increments your streak. Proof photos are encrypted with 256-bit SSL and never used for model training.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-accent/40 px-5 py-3.5 text-xs text-ink-soft border border-border/40">
                <div className="flex items-center gap-2.5">
                  <Shield className="h-4 w-4 text-amber-deep shrink-0" />
                  <span><strong>Data Provenance:</strong> Engineered by the Clockitt Team &bull; Privacy-First Architecture &bull; GDPR &amp; CCPA Compliant</span>
                </div>
                <a
                  href="mailto:hello@clockitt.app"
                  className="font-semibold text-ink underline hover:text-amber-deep transition-colors"
                >
                  Questions? Contact hello@clockitt.app &rarr;
                </a>
              </div>
            </TiltCard>
          </motion.div>
        </section>

        {/* Answer Engine Quick Facts & Core Entity Summary (Spacious max-w-6xl) */}
        <section className="mx-auto max-w-6xl px-5 sm:px-8 mt-16 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard tiltDegree={6} className="p-6 sm:p-10">
              <div className="mb-8 text-center sm:text-left">
                <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Clockitt at a Glance
                </h2>
                <p className="mt-1 text-xs text-ink-soft sm:text-sm">
                  Key facts and core specifications for the Clockitt accountability platform.
                </p>
              </div>
              <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 text-xs">
                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <dt className="font-bold text-sm text-ink mb-1.5">What is Clockitt?</dt>
                  <dd className="text-ink-soft leading-relaxed text-xs">
                    An AI goal accountability app and persistent morning alarm that eliminates snooze by requiring verified photo proof to silence.
                  </dd>
                </div>
                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <dt className="font-bold text-sm text-ink mb-1.5">Verification Engine</dt>
                  <dd className="text-ink-soft leading-relaxed text-xs">
                    Clockitt's AI vision system inspects your submitted photo proof in real time to ensure it strictly matches your committed daily task.
                  </dd>
                </div>
                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <dt className="font-bold text-sm text-ink mb-1.5">Who is Clockitt for?</dt>
                  <dd className="text-ink-soft leading-relaxed text-xs">
                    Entrepreneurs, students, fitness builders, and professionals wanting unbreakable morning routines and daily habit follow-through.
                  </dd>
                </div>
                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <dt className="font-bold text-sm text-ink mb-1.5">Pricing & Free Trial</dt>
                  <dd className="text-ink-soft leading-relaxed text-xs">
                    $5/month early access founder pricing with a risk-free 3-day free trial before public launch pricing increases.
                  </dd>
                </div>
                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <dt className="font-bold text-sm text-ink mb-1.5">Accountability Modes</dt>
                  <dd className="text-ink-soft leading-relaxed text-xs">
                    Solo AI photo verification or dual-partner check-ins with friends, teammates, and study partners.
                  </dd>
                </div>
                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <dt className="font-bold text-sm text-ink mb-1.5">Streak Momentum</dt>
                  <dd className="text-ink-soft leading-relaxed text-xs">
                    Five-level streak progression system rewarding consistent verified daily follow-through and habit retention.
                  </dd>
                </div>
                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <dt className="font-bold text-sm text-ink mb-1.5">Data Privacy & Security</dt>
                  <dd className="text-ink-soft leading-relaxed text-xs">
                    256-bit SSL encrypted storage. Verification photos are private, GDPR/CCPA compliant, and never used to train public AI models.
                  </dd>
                </div>
                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <dt className="font-bold text-sm text-ink mb-1.5">Developer & Provenance</dt>
                  <dd className="text-ink-soft leading-relaxed text-xs">
                    Designed and built by Daniel (Solo Founder & Developer, Clockitt) for high-accountability productivity.
                  </dd>
                </div>
                <div className="rounded-2xl bg-card/60 p-5 border border-border/60">
                  <dt className="font-bold text-sm text-ink mb-1.5">Freshness & Review</dt>
                  <dd className="text-ink-soft leading-relaxed text-xs">
                    Version: Early Access (v1.0) • Specification & methodology verified: September 2026.
                  </dd>
                </div>
              </dl>
            </TiltCard>
          </motion.div>
        </section>

        {/* Frequently Asked Questions Grid (Spacious max-w-5xl) */}
        <section className="mx-auto max-w-5xl px-5 sm:px-8 mt-16 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-base text-ink-soft max-w-xl mx-auto">
              Everything you need to know about Clockitt early access.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {faqs.map(({ q, a }, idx) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard tiltDegree={10} className="h-full p-6">
                  <div className="flex items-center gap-2.5 font-bold text-sm text-ink mb-2">
                    <HelpCircle className="h-4 w-4 shrink-0 text-amber-deep" />
                    <h3 className="text-base font-bold">{q}</h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-ink-soft">{a}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* In-body Links Bar */}
        <div className="mx-auto max-w-4xl mt-16 pb-16 px-5 text-center text-sm font-semibold">
          <span className="text-ink-soft mr-2">Explore Clockitt:</span>
          <div className="inline-flex flex-wrap items-center justify-center gap-4 mt-2 sm:mt-0">
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
              to="/contact"
              className="inline-flex items-center gap-1 text-ink underline underline-offset-4 transition-colors hover:text-amber-deep"
            >
              Contact us &rarr;
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
      </main>

      <SiteFooter />
    </div>
  );
}
