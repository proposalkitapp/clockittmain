import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ email: z.string().email().max(255) }).parse(data),
  )
  .handler(async ({ data }) => {
    const email = data.email.trim().toLowerCase();
    const { error } = await supabase
      .from("waitlist_signups")
      .insert({ email });
    if (error) {
      console.error("waitlist insert failed", JSON.stringify(error));
      if (error.code === "23505") return { ok: true as const, duplicate: true as const };
      return { ok: false as const };
    }
    return { ok: true as const, duplicate: false as const };
  });
