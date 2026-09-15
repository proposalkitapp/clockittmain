import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MessageSquarePlus, Sparkles } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { breadcrumbLd, canonical, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta({
      title: "Contact Clockitt — Get in Touch with the Founder",
      description:
        "Have a question, feedback, or want to share an idea? Reach out to Clockitt's founder at hello@clockitt.app or join our early access waitlist.",
      path: "/contact",
    }),
    links: canonical("/contact"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="canvas-gradient min-h-screen text-ink flex flex-col">
      <SiteHeader />

      <main id="main-content" className="flex-1 px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ label: "Contact" }]} />

          {/* Header */}
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-accent/60 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">
              <Sparkles className="h-3.5 w-3.5 text-amber-deep" /> Get in Touch
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-ink">
              We&rsquo;d love to hear from you.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-xl">
              Have a question, feedback, or just want to say hello? Whether you&rsquo;re interested in Clockitt, have a question about the product, or want to share an idea, you can reach out to us anytime.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {/* Card 1: Contact Founder / Email */}
            <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card/70 p-7 shadow-sm backdrop-blur-xl transition-all hover:border-amber-deep/40 sm:p-8">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-ink">
                  <Mail className="h-6 w-6 text-amber-deep" />
                </span>
                <h2 className="mt-5 text-xl font-bold tracking-tight text-ink sm:text-2xl">Contact the founder</h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-amber-deep">
                  Email us
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                  For general questions, feedback, partnerships, or anything Clockitt-related:
                </p>
                <div className="mt-4 rounded-xl border border-border/60 bg-background/60 p-3.5">
                  <a
                    href="mailto:hello@clockitt.app"
                    className="break-all font-semibold text-ink hover:text-amber-deep transition-colors text-sm sm:text-base"
                  >
                    hello@clockitt.app
                  </a>
                </div>
                <p className="mt-3 text-xs text-ink-soft">We&rsquo;ll get back to you as soon as we can.</p>
              </div>

              <div className="mt-7 pt-4 border-t border-border/60">
                <a
                  href="mailto:hello@clockitt.app"
                  className="cta-gradient inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send an email <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Card 2: Have Feedback */}
            <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card/70 p-7 shadow-sm backdrop-blur-xl transition-all hover:border-amber-deep/40 sm:p-8">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-ink">
                  <MessageSquarePlus className="h-6 w-6 text-amber-deep" />
                </span>
                <h2 className="mt-5 text-xl font-bold tracking-tight text-ink sm:text-2xl">Have Feedback?</h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-amber-deep">
                  Shape the product
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                  Clockitt is being built to help people set daily goals, stay accountable, and actually finish what they start. If there&rsquo;s something you&rsquo;d love to see in Clockitt, tell us about it. Your feedback can help shape what we build next.
                </p>
              </div>

              <div className="mt-7 pt-4 border-t border-border/60">
                <a
                  href="mailto:hello@clockitt.app?subject=Clockitt%20Feedback%20%2F%20Feature%20Idea"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-background/80 px-6 py-3.5 text-sm font-bold text-ink shadow-sm transition-all hover:bg-accent hover:border-amber-deep/40"
                >
                  Send us your idea <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Card 3: Stay Updated */}
            <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card/70 p-7 shadow-sm backdrop-blur-xl transition-all hover:border-amber-deep/40 sm:p-10 sm:col-span-2">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">Want to Stay Updated?</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
                    Clockitt is currently preparing for launch. Join the waitlist to be among the first to experience Clockitt and follow along as we build.
                  </p>
                </div>
                <div className="shrink-0">
                  <a
                    href="/#waitlist"
                    className="cta-gradient inline-flex items-center justify-center rounded-xl px-7 py-4 text-sm font-bold text-primary-foreground shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    Get Early Access to Clockitt <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Motto Callout */}
          <div className="mt-16 rounded-3xl border border-border/60 bg-accent/30 p-8 text-center backdrop-blur-sm sm:p-12">
            <h3 className="text-xl font-extrabold uppercase tracking-[0.16em] text-ink sm:text-2xl">
              Clockitt
            </h3>
            <p className="mt-2 text-base font-medium text-ink-soft sm:text-lg">
              Set the goal. Stay accountable. Finish what you start.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
