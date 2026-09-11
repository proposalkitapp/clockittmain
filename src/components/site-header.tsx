import { Link } from "@tanstack/react-router";

import { ThemeToggle } from "./theme-toggle";

const mascot = "/clockitt-mascot.png";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold uppercase tracking-[0.18em] text-ink ${className}`}>
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

const navLinks = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/accountability-partner", label: "Accountability partner" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src={mascot}
            alt="Clockitt rooster mascot logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <Wordmark className="text-sm sm:text-lg" />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "bg-accent" }}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-accent hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/#waitlist"
            className="cta-gradient ml-2 inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-md transition-all hover:scale-105 active:scale-95"
          >
            Join Waitlist
          </a>
        </nav>

        <div className="ml-auto h-px flex-1 bg-gradient-to-r from-border to-transparent md:ml-3 md:hidden" />

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <a
            href="/#waitlist"
            className="cta-gradient inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm transition-all md:hidden hover:scale-105 active:scale-95"
          >
            Join Waitlist
          </a>
          <ThemeToggle />
          {[
            { Icon: XIcon, href: "https://x.com/clockittapp", label: "Clockitt on X" },
            {
              Icon: TikTokIcon,
              href: "https://tiktok.com/useclockittapp",
              label: "Clockitt on TikTok",
            },
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

      <nav
        aria-label="Secondary"
        className="flex items-center gap-1 overflow-x-auto border-t border-border/60 px-4 py-2 md:hidden"
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeProps={{ className: "bg-accent text-ink" }}
            className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-ink-soft"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
