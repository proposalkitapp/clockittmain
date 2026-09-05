import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import { supabase } from "@/integrations/supabase/client";
import { canonical, pageMeta } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: pageMeta({
      title: "Sign in — Clockitt Waitlist Dashboard",
      description:
        "Sign in to the private Clockitt dashboard to review waitlist signups and early access activity.",
      path: "/auth",
    }),
    links: canonical("/auth"),
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);

    if (mode === "signin") {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (signInError) {
        setError(signInError.message);
        return;
      }
      navigate({ to: "/dashboard" });
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setBusy(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    if (data.session) {
      navigate({ to: "/dashboard" });
      return;
    }
    setNotice("Check your inbox to confirm your address, then sign in.");
  }

  return (
    <div className="canvas-gradient min-h-screen text-ink flex flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1 px-5 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-border/80 bg-card/70 p-6 shadow-lg backdrop-blur-xl sm:p-8">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {mode === "signin" ? "Sign in" : "Create your account"}
          </h1>
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
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-sm font-medium text-destructive" role="alert">
              {error}
            </p>
          )}
          {notice && <p className="mt-4 text-sm font-medium text-ink">{notice}</p>}

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setNotice(null);
            }}
            className="mt-6 text-sm font-semibold text-ink underline underline-offset-4 hover:text-amber-deep"
          >
            {mode === "signin" ? "Need an account? Create one" : "Already have an account? Sign in"}
          </button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
