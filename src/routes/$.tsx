import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page not found — Clockitt" },
      {
        name: "description",
        content:
          "This Clockitt page doesn't exist. Head back home to join the accountability waitlist.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="canvas-gradient flex min-h-screen flex-col text-ink">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-8">
        <div className="glass-panel max-w-md rounded-3xl p-8 text-center">
          <p className="text-5xl font-extrabold tracking-tight sm:text-6xl">404</p>
          <h1 className="mt-3 text-xl font-bold">This page slept through its alarm</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            The page you're looking for doesn't exist or has moved. Try one of these
            instead.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link
              to="/"
              className="cta-gradient inline-flex items-center justify-center rounded-[1.25rem] px-5 py-2.5 text-sm font-bold text-primary-foreground"
            >
              Go home
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center rounded-[1.25rem] border border-border px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent"
            >
              How it works
            </Link>
            <Link
              to="/accountability-partner"
              className="inline-flex items-center justify-center rounded-[1.25rem] border border-border px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent"
            >
              Accountability partner
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
