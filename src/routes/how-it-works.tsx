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
      <main className="flex-1 px-4 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs current="How it works" />
          <h1 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            How Clockitt works
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            Clockitt is built around one loop: wake up, commit to a finish line, stay
            accountable to someone real, and close the day with something actually done.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {steps.map(({ icon: Icon, title, copy }) => (
              <section key={title} className="glass-panel rounded-3xl p-5">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-ink">
                  <Icon className="h-4 w-4" />
                </span>
                <h2 className="text-base font-bold tracking-tight">{title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{copy}</p>
              </section>
            ))}
          </div>

          <div className="glass-panel mt-10 rounded-3xl p-6 text-center">
            <h2 className="text-lg font-bold">Want a partner to keep you honest?</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Read how Clockitt works as an{" "}
              <Link to="/accountability-partner" className="font-semibold text-ink underline">
                accountability partner app
              </Link>
              , or join the waitlist from the{" "}
              <Link to="/" className="font-semibold text-ink underline">
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
