import { supabase } from "@/integrations/supabase/client";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export interface SendBroadcastOptions {
  subject: string;
  htmlContent: string;
  textContent?: string;
  tableName?: "waitlist_signups" | "waitlist";
}

export interface BroadcastResult {
  totalRecipients: number;
  batchesSent: number;
  successCount: number;
  errors: string[];
}

/**
 * Sends a bulk broadcast email to all email addresses stored in the Supabase Table Editor.
 * Automatically chunks emails into batches of 100 for Resend Batch API efficiency.
 */
export async function sendBroadcastToWaitlist({
  subject,
  htmlContent,
  textContent,
  tableName = "waitlist_signups",
}: SendBroadcastOptions): Promise<BroadcastResult> {
  const apiKey =
    (typeof process !== "undefined" && process.env?.RESEND_API_KEY) ||
    (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_RESEND_API_KEY) ||
    "";

  const rawFrom =
    (typeof process !== "undefined" && process.env?.EMAIL_FROM) ||
    (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_EMAIL_FROM) ||
    "Clockitt <hello@clockitt.app>";

  // Fetch all emails from Supabase table
  const { data: rows, error: fetchError } = await (supabase.from(tableName as any) as any)
    .select("email")
    .order("created_at", { ascending: false });

  if (fetchError) {
    throw new Error(`Failed to fetch recipients from ${tableName}: ${fetchError.message}`);
  }

  const emails: string[] = Array.from(
    new Set((rows || []).map((r: { email?: string }) => (r.email || "").trim().toLowerCase())),
  ).filter((e) => e && e.includes("@"));

  if (emails.length === 0) {
    return {
      totalRecipients: 0,
      batchesSent: 0,
      successCount: 0,
      errors: ["No recipients found in database table."],
    };
  }

  const BATCH_SIZE = 100;
  const result: BroadcastResult = {
    totalRecipients: emails.length,
    batchesSent: 0,
    successCount: 0,
    errors: [],
  };

  for (let i = 0; i < emails.length; i += BATCH_SIZE) {
    const chunk = emails.slice(i, i + BATCH_SIZE);

    const payload = chunk.map((to) => ({
      from: rawFrom,
      to: [to],
      subject,
      html: `
<!DOCTYPE html>
<html>
<body style="background-color: #0e0d0b; color: #f4f3ef; font-family: -apple-system, sans-serif; padding: 24px;">
  <div style="max-width: 560px; margin: 0 auto; background-color: #171512; border: 1px solid #2e2a24; border-radius: 16px; padding: 28px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <img src="${SITE_URL}/clockitt-mascot.png" width="44" height="44" alt="${SITE_NAME}" style="border-radius: 10px;" />
    </div>
    ${htmlContent}
    <div style="border-top: 1px solid #28241e; margin-top: 28px; padding-top: 16px; text-align: center; font-size: 12px; color: #7d776a;">
      <p>© 2026 ${SITE_NAME}. All rights reserved.</p>
      <p><a href="${SITE_URL}/privacy" style="color: #fbbf24;">Privacy Policy</a> &bull; <a href="${SITE_URL}/terms" style="color: #fbbf24;">Terms</a> &bull; <a href="mailto:hello@clockitt.app" style="color: #fbbf24;">Support</a></p>
    </div>
  </div>
</body>
</html>
      `.trim(),
      text: textContent || htmlContent.replace(/<[^>]*>?/gm, ""),
    }));

    try {
      const response = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();
      if (!response.ok) {
        result.errors.push(`Batch ${i / BATCH_SIZE + 1} failed: ${JSON.stringify(resData)}`);
      } else {
        result.batchesSent++;
        result.successCount += chunk.length;
      }
    } catch (batchErr) {
      result.errors.push(`Batch exception: ${batchErr instanceof Error ? batchErr.message : String(batchErr)}`);
    }
  }

  return result;
}
