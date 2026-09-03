import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AlarmClock, Check, DollarSign, Eye, Lock, RefreshCw, ShieldCheck, Sparkles, Users, Zap } from "lucide-react";
import mascotAsset from "@/assets/clockitt-mascot.png.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { canonical, organizationLd, pageMeta, softwareAppLd, webSiteLd } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const mascot = mascotAsset.url;

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
    ],
  }),

  component: Index,
});

const pillars = [
  { icon: AlarmClock, title: "The alarm doesn\u2019t stop on its own", copy: "Snooze into oblivion elsewhere. Here, the alarm keeps firing at your deadline until you submit proof. Silence is earned." },
  { icon: Eye, title: "AI checks your proof, not your honor system", copy: "Snap a photo. Claude Vision verifies it matches the task. You can\u2019t fake yesterday\u2019s gym selfie." },
  { icon: Zap, title: "Streaks that mean something", copy: "Every check-in is verified, so your streak isn\u2019t a lie you tell yourself. Five levels, real momentum." },
  { icon: DollarSign, title: "$5/month. First 3 days free.", copy: "$5/mo \u2014 For a coach that never lets you off the hook. Waitlist members get locked in before public launch." },
];

const trustSignals = [
  {
    icon: ShieldCheck,
    title: "Privacy & Data Protection Guaranteed",
    copy: "Your verification photos and goals are encrypted and never shared publicly without your explicit permission.",
  },
  {
    icon: RefreshCw,
    title: "Zero Risk & Cancel Anytime",
    copy: "Enjoy a 3-day free trial. Cancel anytime before your trial ends with 1 click and pay zero dollars.",
  },
  {
    icon: Lock,
    title: "Founder Rate Locked for Life",
    copy: "Waitlist members secure $5/month pricing forever before the public launch price increase.",
  },
];

function Index() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value.includes("@") || value.length > 255) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const { error: insertError } = await supabase
      .from("waitlist_signups")
      .insert({ email: value });
    setSubmitting(false);
    if (insertError && insertError.code !== "23505") {
      setError("Something went wrong. Please try again.");
      return;
    }
    setJoined(true);
  }

  return (
    <div className="canvas-gradient min-h-screen text-ink flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="rise-in float-soft mx-auto mb-6 w-fit">
              <img
                src={mascot}
                alt="Clockitt rooster mascot"
                width={112}
                height={112}
                className="h-24 w-24 drop-shadow-[0_18px_30px_rgba(30,39,73,0.18)] sm:h-28 sm:w-28"
              />
            </div>

            <div className="rise-in mb-6 inline-flex items-center gap-2 rounded-full bg-accent/80 px-3.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink ring-1 ring-amber/40 sm:text-[0.65rem]">
              <span className="h-1 w-1 rounded-full bg-amber-deep" />
              Get Early Access To Clockitt
            </div>

            <h1 className="rise-in text-balance text-[2.65rem] font-extrabold leading-[1.03] tracking-[-0.03em] sm:text-6xl md:text-7xl">
              The alarm that won&rsquo;t shut up{" "}
              <span className="bg-gradient-to-br from-amber to-amber-deep bg-clip-text text-transparent">
                until you prove it.
              </span>
            </h1>

            <p className="rise-in mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
              Set a goal, set a deadline. When the alarm fires, it <strong>doesn&rsquo;t stop until you submit photo proof</strong>. No proof, no silence.
            </p>

            <div id="waitlist" className="mx-auto mt-9 max-w-xl scroll-mt-24">
              {joined ? (
                <div className="glass-panel flex items-center justify-center gap-3 rounded-3xl px-6 py-5 text-sm font-semibold">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full cta-gradient text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </span>
                  You're on the list. We'll wake you when it's time.
                </div>
              ) : (
                <>
                  <form
                    onSubmit={onSubmit}
                    className="glass-panel flex flex-col gap-2 rounded-[1.75rem] p-2 transition-shadow focus-within:shadow-lift sm:flex-row sm:items-center"
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
                    <button
                      type="submit"
                      disabled={submitting}
                      className="cta-gradient group inline-flex items-center justify-center gap-2 rounded-[1.25rem] px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
                    >
                      {submitting ? "Joining…" : "Join the waitlist"}
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground transition-transform group-hover:scale-125" />
                    </button>
                  </form>
                  <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-ink-soft">
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
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-accent text-xs font-bold text-ink"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-ink-soft">
                  Early access — <strong>first 100 get founder pricing</strong>, locked for life.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Why Clockitt Works
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                Accountability designed so snooze is no longer an option.
              </p>
            </div>

            <div className="mt-6 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="glass-panel group rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-ink transition-colors group-hover:bg-amber group-hover:text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-bold tracking-tight text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 glass-panel rounded-3xl p-6 sm:p-8 text-left">
              <div className="mb-6 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-ink" />
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
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
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
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

