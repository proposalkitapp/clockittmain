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
      <main className="flex-1 px-4 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs current="Accountability partner" />
          <h1 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            An accountability partner app for goals you keep abandoning
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            Willpower is unreliable. A person waiting on your update is not. Clockitt pairs
            your daily goals with someone who checks in — so starting and finishing stop
            being two different things.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, copy }) => (
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
            <h2 className="text-lg font-bold">Get early access</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Clockitt is in early access. Join the waitlist on the{" "}
              <Link to="/" hash="waitlist" className="font-semibold text-ink underline">
                home page
              </Link>{" "}
              or see{" "}
              <Link to="/how-it-works" className="font-semibold text-ink underline">
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
