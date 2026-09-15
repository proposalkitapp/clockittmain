import { createFileRoute } from "@tanstack/react-router";
import { sendWaitlistWelcome } from "@/lib/email/sender";
import { supabase } from "@/integrations/supabase/client";

interface SupabaseWebhookPayload {
  type?: string;
  table?: string;
  schema?: string;
  record?: {
    id?: string;
    email?: string;
    [key: string]: unknown;
  };
  old_record?: Record<string, unknown>;
  email?: string;
}

export const Route = createFileRoute("/api/webhooks/supabase-signup")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const expectedSecret =
            process.env.SUPABASE_WEBHOOK_SECRET ||
            (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_SUPABASE_WEBHOOK_SECRET) ||
            "v1,whsec_4hQyJzIIPlD6RTOf0wzVA1efIlJ1nMRdJzccIkxgqfppIylc03NoyYiiTvya6Zsdx2HC6dKEaIoiAoh8";

          const authHeader =
            request.headers.get("x-supabase-webhook-secret") ||
            request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
            "";

          // Validate secret if configured
          if (expectedSecret && authHeader !== expectedSecret) {
            console.warn("[SUPABASE_WEBHOOK] Unauthorized webhook attempt. Invalid secret header.");
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
              status: 401,
              headers: { "Content-Type": "application/json" },
            });
          }

          const bodyText = await request.text();
          if (!bodyText) {
            return new Response(JSON.stringify({ error: "Empty request body" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          let payload: SupabaseWebhookPayload;
          try {
            payload = JSON.parse(bodyText) as SupabaseWebhookPayload;
          } catch {
            return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Extract recipient email from standard Supabase webhook payload or direct payload
          const recipientEmail = (
            payload.record?.email ||
            payload.email ||
            ""
          ).trim().toLowerCase();

          if (!recipientEmail || !recipientEmail.includes("@")) {
            console.warn("[SUPABASE_WEBHOOK] No valid email found in webhook payload:", payload);
            return new Response(
              JSON.stringify({ success: false, error: "No valid email in payload" }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          console.log(`[SUPABASE_WEBHOOK] Processing waitlist signup webhook for: ${recipientEmail}`);

          // Send the welcome email via Resend API
          const sendResult = await sendWaitlistWelcome(recipientEmail);

          // If email dispatch succeeded, record delivery timestamp & status in Supabase
          if (sendResult.success) {
            try {
              const tableName = payload.table || "waitlist_signups";
              const recordId = payload.record?.id;

              if (recordId) {
                await (supabase.from(tableName as any) as any)
                  .update({
                    email_status: "sent",
                    email_sent_at: new Date().toISOString(),
                  })
                  .eq("id", recordId);
              } else {
                await (supabase.from(tableName as any) as any)
                  .update({
                    email_status: "sent",
                    email_sent_at: new Date().toISOString(),
                  })
                  .eq("email", recipientEmail);
              }
            } catch (dbError) {
              console.warn("[SUPABASE_WEBHOOK] Note: Could not update email_status in table:", dbError);
            }
          }

          return new Response(
            JSON.stringify({
              success: sendResult.success,
              email: recipientEmail,
              mode: sendResult.mode,
              messageId: sendResult.messageId,
              error: sendResult.error,
            }),
            {
              status: sendResult.success ? 200 : 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error) {
          console.error("[SUPABASE_WEBHOOK_EXCEPTION]", error);
          return new Response(
            JSON.stringify({
              success: false,
              error: error instanceof Error ? error.message : "Internal server error",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
