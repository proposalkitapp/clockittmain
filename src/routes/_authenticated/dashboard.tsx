import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Loader2, Mail, TrendingUp, Users } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Waitlist Dashboard — Clockitt" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Dashboard;
});

type Signup = { id: string; email: string; created_at: string };

function Dashboard() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Signup[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("waitlist_signups")
      .select("id, email, created_at")
      .order("created_at", { ascending: false })
      .then(({ data, error: selectError }) => {
        if (selectError) {
          setError(selectError.message);
          return;
        }
        setRows(data ?? []);
      });
  }, []);

  const stats = useMemo(() => {
    const list = rows ?? [];
    const now = Date.now();
    const since = (days: number) =>
      list.filter((r) => now - new Date(r.created_at).getTime() < days * 86_400_000).length;
    return { total: list.length, week: since(7), today: since(1) };
  }, [rows]);

  const byDay = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of rows ?? []) {
      const key = new Date(r.created_at).toISOString().slice(0, 10);
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1)).slice(0, 14);
  }, [rows]);

  const peak = Math.max(1, ...byDay.map(([, n]) => n));

  return (
    <div className="canvas-gradient min-h-screen text-ink flex flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1 px-5 py-12 sm:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Waitlist dashboard</h1>
              <p className="mt-1 text-sm text-ink-soft">Everyone who has signed up for early access.</p>
            </div>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
              className="rounded-xl border border-border bg-card/70 px-4 py-2 text-sm font-semibold backdrop-blur-xl"
            >
              Sign out
            </button>
          </div>

          {error && (
            <div className="mt-8 rounded-2xl border border-border/80 bg-card/70 p-6 text-sm backdrop-blur-xl">
              <p className="font-semibold text-destructive">We couldn&rsquo;t load the list.</p>
              <p className="mt-1 text-ink-soft">
                This account doesn&rsquo;t have owner access yet. ({error})
              </p>
            </div>
          )}

          {!rows && !error && (
            <div className="mt-10 flex items-center gap-2 text-sm text-ink-soft">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading signups…
            </div>
          )}

          {rows && !error && (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Users, label: "Total signups", value: stats.total },
                  { icon: TrendingUp, label: "Last 7 days", value: stats.week },
                  { icon: Mail, label: "Last 24 hours", value: stats.today },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border/80 bg-card/70 p-5 shadow-sm backdrop-blur-xl"
                  >
                    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="text-3xl font-extrabold tracking-tight">{value}</p>
                    <p className="text-xs text-ink-soft">{label}</p>
                  </div>
                ))}
              </div>

              {byDay.length > 0 && (
                <div className="mt-6 rounded-2xl border border-border/80 bg-card/70 p-5 shadow-sm backdrop-blur-xl">
                  <h2 className="text-sm font-bold">Signups per day</h2>
                  <ul className="mt-4 space-y-2">
                    {byDay.map(([day, count]) => (
                      <li key={day} className="flex items-center gap-3 text-xs">
                        <span className="w-24 shrink-0 text-ink-soft">{day}</span>
                        <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-accent">
                          <span
                            className="cta-gradient block h-full rounded-full"
                            style={{ width: `${(count / peak) * 100}%` }}
                          />
                        </span>
                        <span className="w-6 text-right font-semibold">{count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-sm backdrop-blur-xl">
                <h2 className="border-b border-border/60 px-5 py-4 text-sm font-bold">
                  Signups ({rows.length})
                </h2>
                {rows.length === 0 ? (
                  <p className="px-5 py-6 text-sm text-ink-soft">No signups yet.</p>
                ) : (
                  <ul className="divide-y divide-border/60">
                    {rows.map((r) => (
                      <li
                        key={r.id}
                        className="flex flex-col gap-1 px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span className="break-all font-medium">{r.email}</span>
                        <span className="text-xs text-ink-soft">
                          {new Date(r.created_at).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
