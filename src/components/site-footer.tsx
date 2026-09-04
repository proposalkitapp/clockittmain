import { Link } from "@tanstack/react-router";

import { Wordmark } from "./site-header";

const mascot = "/clockitt-mascot.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/60 px-4 py-10 backdrop-blur-xl sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                src={mascot}
                alt="Clockitt rooster mascot"
                width={28}
                height={28}
                loading="lazy"
                className="h-7 w-7"
              />
              <Wordmark className="text-lg" />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              The accountability app that helps you wake up, set daily goals, and finish
              what you start.
            </p>
          </div>

          <nav aria-label="Footer" className="grid gap-2 text-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink">Explore</p>
            <Link to="/" className="text-ink-soft transition-colors hover:text-ink">
              Home
            </Link>
            <Link to="/how-it-works" className="text-ink-soft transition-colors hover:text-ink">
              How Clockitt works
            </Link>
            <Link
              to="/accountability-partner"
              className="text-ink-soft transition-colors hover:text-ink"
            >
              Accountability partner app
            </Link>
            <Link to="/privacy" className="text-ink-soft transition-colors hover:text-ink">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-ink-soft transition-colors hover:text-ink">
              Terms of Service
            </Link>
          </nav>
        </div>

        <div className="my-6 h-px bg-border" />
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-ink-soft">
          <p>@2026 All rights Reserved</p>
          <p className="font-semibold text-ink">Made with Clockitt</p>
        </div>
      </div>
    </footer>
  );
}
