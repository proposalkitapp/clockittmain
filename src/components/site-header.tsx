import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Automatically close mobile menu on route navigation
  useEffect(() => {
    setOpen(false);
  }, [currentPath]);

  // Close on window resize if crossing to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-8">
        {/* Brand logo & wordmark */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-2 focus:outline-none"
        >
          <img
            src={mascot}
            alt="Clockitt rooster mascot logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <Wordmark className="text-base sm:text-lg" />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden items-center gap-1.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "bg-accent text-ink font-bold" }}
              className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-accent hover:text-ink"
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

        {/* Desktop Actions & Socials */}
        <div className="hidden items-center gap-1 sm:gap-2 md:flex">
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

        {/* Mobile Header Controls: ThemeToggle + Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-accent/60 text-ink shadow-sm transition-all active:scale-95"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Mobile Navigation Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto max-w-6xl space-y-4 px-5 py-6">
              <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    activeProps={{ className: "bg-accent text-ink font-bold" }}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-ink-soft transition-colors hover:bg-accent/70 hover:text-ink"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4 opacity-60" />
                  </Link>
                ))}
              </nav>

              {/* Join Waitlist CTA inside Mobile Menu */}
              <div className="pt-2">
                <a
                  href="/#waitlist"
                  onClick={() => setOpen(false)}
                  className="cta-gradient flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all active:scale-[0.98]"
                >
                  Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              {/* Social links & info */}
              <div className="flex items-center justify-between border-t border-border/50 pt-4 text-xs text-ink-soft">
                <span>Follow Clockitt:</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://x.com/clockittapp"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Clockitt on X"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-accent/40 text-ink hover:bg-accent"
                  >
                    <XIcon />
                  </a>
                  <a
                    href="https://tiktok.com/useclockittapp"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Clockitt on TikTok"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-accent/40 text-ink hover:bg-accent"
                  >
                    <TikTokIcon />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
