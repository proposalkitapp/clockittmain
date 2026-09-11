import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, Repeat, ShieldCheck, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { breadcrumbLd, canonical, pageMeta, softwareAppLd, webSiteLd } from "@/lib/site";

const PATH = "/accountability-partner";
const TITLE = "Accountability Partner App — Share Goals & Check In | Clockitt";
const DESCRIPTION =
  "Clockitt is an accountability partner app: share a daily goal with a friend, get real check-ins, and finish what you start together. Join the waitlist.";

export const Route = createFileRoute("/accountability-partner")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH }),
    links: canonical(PATH),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Accountability partner", path: PATH },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(softwareAppLd) },
      { type: "application/ld+json", children: JSON.stringify(webSiteLd) },
    ],
  }),
  component: AccountabilityPartner,
});

const features = [
  {
    icon: Users,
    title: "Pair up with a real person",
    copy: "Invite a friend, teammate, or study partner and share the goal you're committing to today.",
  },
  {
    icon: Repeat,
    title: "Check-ins that actually land",
    copy: "Morning commitments and evening check-ins keep both of you on the hook, not just notified.",
  },
  {
    icon: ShieldCheck,
    title: "Kind pressure, not shame",
    copy: "Streaks and nudges are designed to keep momentum going after a missed day, not punish it.",
  },
  {
    icon: HeartHandshake,
    title: "Celebrate the finish together",
    copy: "Every completed goal is visible to your partner, so the wins compound for both of you.",
  },
];

function AccountabilityPartner() {
  return (
    <div className="canvas-gradient flex min-h-screen flex-col text-ink">
      <SiteHeader />
      <main className="flex-1 px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs current="Accountability partner" />
          <h1 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-5xl md:text-6xl">
            An accountability partner app for goals you keep abandoning
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-ink-soft sm:text-xl">
            Willpower is unreliable. A person waiting on your update is not. Clockitt pairs
            your daily goals with someone who checks in — so starting and finishing stop
            being two different things.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, copy }) => (
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
            <h2 className="text-xl sm:text-2xl font-bold">Get early access</h2>
            <p className="mt-3 text-base text-ink-soft max-w-xl mx-auto">
              Clockitt is in early access. Join the waitlist on the{" "}
              <Link to="/" hash="waitlist" className="font-semibold text-ink underline hover:text-amber-deep">
                home page
              </Link>{" "}
              or see{" "}
              <Link to="/how-it-works" className="font-semibold text-ink underline hover:text-amber-deep">
                how Clockitt works
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
