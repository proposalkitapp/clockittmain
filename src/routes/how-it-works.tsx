import { createFileRoute, Link } from "@tanstack/react-router";
import { AlarmClock, Flag, MessageCircle, Trophy } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { breadcrumbLd, canonical, pageMeta, softwareAppLd, webSiteLd } from "@/lib/site";

const PATH = "/how-it-works";
const TITLE = "How Clockitt Works — Wake Up, Set Goals, Finish Them";
const DESCRIPTION =
  "See how Clockitt turns a morning alarm into finished work: set a daily finish line, share it with your circle, check in, and celebrate what you complete.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH }),
    links: canonical(PATH),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "How it works", path: PATH },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(softwareAppLd) },
      { type: "application/ld+json", children: JSON.stringify(webSiteLd) },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  {
    icon: AlarmClock,
    title: "1. Wake up with intent",
    copy: "Your Clockitt alarm doesn't just make noise — it asks what today is actually for.",
  },
  {
    icon: Flag,
    title: "2. Set a real finish line",
    copy: "Write down what done looks like. One clear outcome beats a ten-item wish list.",
  },
  {
    icon: MessageCircle,
    title: "3. Stay accountable",
    copy: "Share the goal with people who check in. A nudge from a human beats a notification.",
  },
  {
    icon: Trophy,
    title: "4. Close the loop",
    copy: "Mark it done, log the streak, and let momentum carry into tomorrow morning.",
  },
];

function HowItWorks() {
  return (
    <div className="canvas-gradient flex min-h-screen flex-col text-ink">
      <SiteHeader />
      <main className="flex-1 px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs current="How it works" />
          <h1 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-5xl md:text-6xl">
            How Clockitt works
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-ink-soft sm:text-xl">
            Clockitt is built around one loop: wake up, commit to a finish line, stay
            accountable to someone real, and close the day with something actually done.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, copy }) => (
              <section key={title} className="glass-panel rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-ink shadow-sm">
                    <Icon className="h-5 w-5 text-amber-deep" />
                  </span>
                  <h2 className="text-lg font-bold tracking-tight text-ink">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{copy}</p>
                </div>
              </section>
            ))}
          </div>

          <div className="glass-panel mt-12 rounded-3xl p-8 sm:p-10 text-center">
            <h2 className="text-xl sm:text-2xl font-bold">Want a partner to keep you honest?</h2>
            <p className="mt-3 text-base text-ink-soft max-w-xl mx-auto">
              Read how Clockitt works as an{" "}
              <Link to="/accountability-partner" className="font-semibold text-ink underline hover:text-amber-deep">
                accountability partner app
              </Link>
              , or join the waitlist from the{" "}
              <Link to="/" className="font-semibold text-ink underline hover:text-amber-deep">
                home page
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
