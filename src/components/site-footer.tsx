import { Link } from "@tanstack/react-router";
import { Mail, ShieldCheck } from "lucide-react";

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
                alt="Clockitt rooster mascot logo"
                width={28}
                height={28}
                loading="lazy"
                className="h-7 w-7"
              />
              <Wordmark className="text-lg" />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              The AI-powered accountability app that turns morning alarms into verified goal completions.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-ink-soft">
              <ShieldCheck className="h-4 w-4 text-amber-deep shrink-0" />
              <span>256-Bit SSL Encrypted &bull; Zero Spam &bull; GDPR Ready</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-10">
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
              <Link to="/contact" className="text-ink-soft transition-colors hover:text-ink">
                Contact
              </Link>
              <Link to="/privacy" className="text-ink-soft transition-colors hover:text-ink">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-ink-soft transition-colors hover:text-ink">
                Terms of Service
              </Link>
            </nav>

            <div className="grid gap-2 text-sm">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink">Trust &amp; Support</p>
              <a
                href="mailto:hello@clockitt.app"
                className="inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-ink"
              >
                <Mail className="h-3.5 w-3.5" />
                hello@clockitt.app
              </a>
              <span className="text-xs text-ink-soft">3-Day Risk-Free Trial Guarantee</span>
              <span className="text-xs text-ink-soft">$5/mo Founder Rate Lock</span>
              <span className="text-xs text-ink-soft">Reviewed: September 2026</span>
            </div>
          </div>
        </div>

        <div className="my-6 h-px bg-border" />
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-ink-soft">
          <p>&copy; 2026 Clockitt. All rights reserved.</p>
          <p className="font-semibold text-ink">Verified Accountability Architecture</p>
        </div>
      </div>
    </footer>
  );
}
