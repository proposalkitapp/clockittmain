import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ email: z.string().email().max(255) }).parse(data),
  )
  .handler(async ({ data }) => {
    const url = process.env["EXTERNAL_SUPABASE_URL"]!;
    const key = process.env["EXTERNAL_SUPABASE_ANON_KEY"]!;
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await client
      .from("waitlist_signups")
      .insert({ email: data.email.trim().toLowerCase() });
    if (error) {
      console.error("waitlist insert failed", JSON.stringify(error));
      if (error.code === "23505") return { ok: true as const, duplicate: true as const };
      return { ok: false as const };
    }
    return { ok: true as const, duplicate: false as const };
  });
