import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

interface ResendWebhookEvent {
  type: string;
  created_at: string;
  data: {
    email_id?: string;
    from?: string;
    to?: string[];
    subject?: string;
    created_at?: string;
    [key: string]: unknown;
  };
}

export const Route = createFileRoute("/api/webhooks/resend")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const bodyText = await request.text();
          if (!bodyText) {
            return new Response(JSON.stringify({ error: "Empty request body" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          let event: ResendWebhookEvent;
          try {
            event = JSON.parse(bodyText) as ResendWebhookEvent;
          } catch {
            return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          console.log(`[RESEND_WEBHOOK] Received Resend event: ${event.type}`, JSON.stringify(event.data));

          const recipients = event.data?.to || [];
          const eventType = event.type; // e.g. "email.sent", "email.delivered", "email.bounced", "email.opened"

          if (recipients.length > 0) {
            const statusMap: Record<string, string> = {
              "email.sent": "sent",
              "email.delivered": "delivered",
              "email.opened": "opened",
              "email.clicked": "clicked",
              "email.bounced": "bounced",
              "email.complained": "complained",
            };

            const status = statusMap[eventType] || eventType;

            for (const recipient of recipients) {
              const cleanEmail = recipient.trim().toLowerCase();
              try {
                // Update in waitlist_signups
                await (supabase.from("waitlist_signups" as any) as any)
                  .update({ email_status: status })
                  .eq("email", cleanEmail);

                // Update in waitlist if present
                await (supabase.from("waitlist" as any) as any)
                  .update({ email_status: status })
                  .eq("email", cleanEmail);
              } catch (updateErr) {
                console.warn(`[RESEND_WEBHOOK] Failed to update status for ${cleanEmail}:`, updateErr);
              }
            }
          }

          return new Response(JSON.stringify({ received: true, type: event.type }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("[RESEND_WEBHOOK_EXCEPTION]", error);
          return new Response(
            JSON.stringify({
              error: error instanceof Error ? error.message : "Internal server error",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
