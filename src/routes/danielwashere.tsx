import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin } from "@/lib/auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/danielwashere")({
  head: () => ({
    meta: [
      { title: "Sign in — Clockitt Waitlist Dashboard" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminAuthPage,
});

function AdminAuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (data?.user) {
        const isAdmin = await checkIsAdmin(data.user.id);
        if (isAdmin) {
          navigate({ to: "/dashboard" });
        } else {
          await supabase.auth.signOut();
        }
      }
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setBusy(false);
      setError(signInError.message);
      return;
    }

    if (!data.user) {
      setBusy(false);
      setError("Sign in failed. Please try again.");
      return;
    }

    const isAdmin = await checkIsAdmin(data.user.id);
    if (!isAdmin) {
      await supabase.auth.signOut();
      setBusy(false);
      setError("Access denied: You do not have administrator permissions.");
      return;
    }

    setBusy(false);
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="canvas-gradient min-h-screen text-ink flex flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1 px-5 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-border/80 bg-card/70 p-6 shadow-lg backdrop-blur-xl sm:p-8">
          <h1 className="text-2xl font-extrabold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Private access to your Clockitt waitlist dashboard.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="auth-email" className="mb-1.5 block text-sm font-semibold">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-amber-deep"
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="mb-1.5 block text-sm font-semibold">
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-amber-deep"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="cta-gradient w-full rounded-xl px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg disabled:opacity-70"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-sm font-medium text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
