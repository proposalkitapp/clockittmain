import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { breadcrumbLd, canonical, pageMeta, webSiteLd } from "@/lib/site";

const PATH = "/privacy";
const TITLE = "Privacy — How Clockitt Handles Your Waitlist Data";
const DESCRIPTION =
  "What Clockitt collects when you join the waitlist, how your email is stored, and how to ask for it to be removed.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH }),
    links: canonical(PATH),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Privacy", path: PATH },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(webSiteLd) },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="canvas-gradient flex min-h-screen flex-col text-ink">
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <Breadcrumbs current="Privacy" />
          <h1 className="text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            Privacy at Clockitt
          </h1>
          <div className="mt-6 space-y-6 text-sm leading-relaxed text-ink-soft sm:text-base">
            <section>
              <h2 className="text-lg font-bold text-ink">What we collect</h2>
              <p className="mt-2">
                If you join the waitlist, we store the email address you submit. Nothing
                else is required and we don't ask for a password at this stage.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-ink">How we use it</h2>
              <p className="mt-2">
                Your email is used to tell you when Clockitt early access opens and to send
                occasional updates about the launch. We don't sell or rent it.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-ink">Removing your data</h2>
              <p className="mt-2">
                Reply to any Clockitt email, or reach us on{" "}
                <a
                  href="https://x.com/clockittapp"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-ink underline"
                >
                  X
                </a>
                , and we'll delete your waitlist entry.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
