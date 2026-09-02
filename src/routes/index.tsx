import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, Flag, Sparkles, Users } from "lucide-react";
import mascotAsset from "@/assets/clockitt-mascot.png.asset.json";
import { supabase } from "@/integrations/supabase/client";

const mascot = mascotAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clockitt — Finish what you start. Together." },
      {
        name: "description",
        content:
          "Clockitt turns intentions into finished work: gentle structure, shared accountability, and the momentum to see every task through. Join the early access waitlist.",
      },
      { property: "og:title", content: "Clockitt — Finish what you start. Together." },
      {
        property: "og:description",
        content:
          "Gentle structure, shared accountability, and the momentum to finish. Join the Clockitt waitlist.",
      },
    ],
  }),
  component: Index,
});

const pillars = [
  { icon: Flag, title: "Set a clear finish line", copy: "Define what done looks like before the timer starts." },
  { icon: Users, title: "Stay accountable", copy: "Share your goal with people who actually check in." },
  { icon: Sparkles, title: "Celebrate the done", copy: "Every finished task gets its moment. Momentum compounds." },
];

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-extrabold tracking-[0.18em] text-ink uppercase ${className}`}
    >
      Clockitt
    </span>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M18.9 2H22l-7 8.1L23.2 22h-6.5l-5-6.6-5.8 6.6H2.8l7.5-8.6L1.4 2h6.6l4.6 6.1L18.9 2Zm-1.1 18.1h1.7L7.3 3.8H5.5l12.3 16.3Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M16.5 2h-3v13.2a2.7 2.7 0 1 1-2.3-2.7v-3a5.7 5.7 0 1 0 5.3 5.7V9.4A6.9 6.9 0 0 0 21 10.8V7.7a3.9 3.9 0 0 1-4.5-3.9V2Z" />
    </svg>
  );
}

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
    <div className="canvas-gradient min-h-screen text-ink">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8">
          <a href="/" className="flex items-center gap-2">
            <img src={mascot} alt="Clockitt mascot" width={32} height={32} className="h-8 w-8" />
            <Wordmark className="text-base sm:text-lg" />
          </a>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          <div className="hidden h-5 w-px bg-border sm:block" />
          <div className="flex items-center gap-2">
            {[
              { Icon: XIcon, href: "https://x.com/clockittapp", label: "Clockitt on X" },
              { Icon: TikTokIcon, href: "https://tiktok.com/useclockittapp", label: "Clockitt on TikTok" },
            ].map(({ Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-all hover:-translate-y-0.5 hover:bg-accent"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </header>

      <main>
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
              Finish what you start.{" "}
              <span className="bg-gradient-to-br from-amber to-amber-deep bg-clip-text text-transparent">
                Together.
              </span>
            </h1>

            <p className="rise-in mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
              Clockitt is a productivity and accountability app that helps you wake up, set
              daily goals, stay accountable, and actually finish what you start.
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
                    className="cta-gradient group inline-flex items-center justify-center gap-2 rounded-[1.25rem] px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Join the waitlist
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground transition-transform group-hover:scale-125" />
                  </button>
                </form>
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
                  Join other early users on the Clockitt waitlist.
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-3 text-left sm:grid-cols-3">
              {pillars.map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="glass-panel group rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-ink transition-colors group-hover:bg-amber group-hover:text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h2 className="text-base font-bold tracking-tight">{title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-background/60 px-5 py-10 backdrop-blur-xl sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2">
            <img src={mascot} alt="" width={28} height={28} loading="lazy" className="h-7 w-7" />
            <Wordmark className="text-lg" />
          </div>
          <div className="my-6 h-px bg-border" />
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-ink-soft">
            <p>@2026 All rights Reserved</p>
            <p className="font-semibold text-ink">Made with Clockitt</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
