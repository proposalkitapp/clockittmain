import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlarmClock, Camera, Check, DollarSign, Flame, HelpCircle, Lock, RefreshCw, ShieldCheck } from "lucide-react";

import { joinWaitlist } from "@/lib/waitlist.functions";
import { canonical, faqLd, organizationLd, pageMeta, softwareAppLd, webSiteLd } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TiltCard } from "@/components/ui/tilt-card";
import { Floating3DMascot } from "@/components/ui/floating-3d-mascot";
import { Alarm3DBadge } from "@/components/ui/alarm-3d-badge";

const mascot = "/clockitt-mascot.png";

const faqs = [
  {
    q: "How does photo proof verification work?",
    a: "When your alarm fires at your deadline, you take a quick photo of your finished task. Claude Vision AI verifies it matches your committed goal before silencing the alarm.",
  },
  {
    q: "What happens if I fail to submit proof?",
    a: "The alarm keeps firing until valid proof is submitted. Silence is earned, eliminating the temptation to snooze past your commitments.",
  },
  {
    q: "How does the $5/month founder rate work?",
    a: "Waitlist members receive a 3-day free trial and lock in the $5/month rate during early access before public launch rates increase.",
  },
  {
    q: "Are my photos and data kept private?",
    a: "Yes. All verification photos and goals are encrypted and private. Your data is never shared publicly or sold.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Clockitt — Accountability App to Finish What You Start",
        description:
          "Clockitt is the accountability app that helps you wake up, set daily goals, stay accountable, and actually finish what you start. Join the early access waitlist.",
        path: "/",
      }),
      {
        name: "keywords",
        content:
          "accountability app, productivity app, goal tracker, daily goals, habit accountability, Clockitt",
      },
    ],
    links: canonical("/"),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationLd) },
      { type: "application/ld+json", children: JSON.stringify(softwareAppLd) },
      { type: "application/ld+json", children: JSON.stringify(webSiteLd) },
      { type: "application/ld+json", children: JSON.stringify(faqLd(faqs)) },
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
    title: "100% Data Encryption & Privacy Guarantee",
    copy: "Your daily goals and photo proof submissions are encrypted with 256-bit SSL protection and never shared publicly without your consent.",
  },
  {
    icon: RefreshCw,
    title: "Risk-Free 3-Day Trial Guarantee",
    copy: "Try Clockitt with a 3-day free trial. Cancel anytime during your 3-day trial period",
  },
  {
    icon: Lock,
    title: "Early Access Founder Rate Guarantee",
    copy: "Waitlist members lock in the $5/month early access rate before the public launch price increase.",
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
    const result = await joinWaitlist({ data: { email: value } });
    setSubmitting(false);
    if (!result.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setJoined(true);
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

            {/* 3D Glass Badge */}
            <div className="mb-6 inline-block">
              <Alarm3DBadge>Get Early Access To Clockitt</Alarm3DBadge>
            </div>

            {/* Hero Main Heading with Entrance Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-balance text-[2.65rem] font-extrabold leading-[1.03] tracking-[-0.03em] sm:text-6xl md:text-7xl"
            >
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
              Set a goal, set a deadline. When the alarm fires, it <strong>doesn&rsquo;t stop until you submit photo proof</strong>. No proof, no silence.
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
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="min-w-0 flex-1 bg-transparent px-5 py-3.5 text-base text-ink outline-none placeholder:text-muted-foreground"
                      />
                      <motion.button
                        type="submit"
                        disabled={submitting || !hydrated}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="cta-gradient group inline-flex items-center justify-center gap-2 rounded-[1.25rem] px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all disabled:opacity-70"
                      >
                        {!hydrated ? "Loading…" : submitting ? "Joining…" : "Join the waitlist"}
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
                  {["A", "M", "K"].map((c) => (
                    <span
                      key={c}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-accent text-xs font-bold text-ink shadow-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-ink-soft">
                  Get early access to be strictly timed and locked in.
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

            {/* Trust & Privacy Guarantee Section */}
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
                  <h2 className="text-lg font-bold tracking-tight text-ink">Trust & Privacy Guarantee</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-3">
                  {trustSignals.map(({ icon: Icon, title, copy }) => (
                    <div key={title} className="flex flex-col gap-1.5">
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
