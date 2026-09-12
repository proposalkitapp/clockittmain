import { getWaitlistWelcomeEmail } from "./templates";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  mode: "live" | "simulated";
  error?: string;
}

/**
 * Universal transactional email dispatcher.
 * Automatically sends via Resend API when RESEND_API_KEY is configured in .env,
 * or gracefully logs in development/simulation mode.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  from,
}: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey =
    process.env.RESEND_API_KEY ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_RESEND_API_KEY);
  const defaultFrom = process.env.EMAIL_FROM || "Clockitt <onboarding@resend.dev>";
  const senderFrom = from || defaultFrom;

  // If no API key or using test placeholder, simulate dispatch safely
  if (!apiKey || apiKey === "re_test_placeholder_key" || apiKey.includes("placeholder")) {
    console.log(`\n[RESEND_EMAIL_SIMULATED] (RESEND_API_KEY is test/placeholder)`);
    console.log(`[RESEND_EMAIL_SIMULATED] To: ${to}`);
    console.log(`[RESEND_EMAIL_SIMULATED] Subject: "${subject}"`);
    console.log(`[RESEND_EMAIL_SIMULATED] From: ${senderFrom}\n`);
    return {
      success: true,
      mode: "simulated",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderFrom,
        to: [to],
        subject,
        html,
        text,
      }),
    });

    const data = (await response.json()) as { id?: string; message?: string; name?: string };

    if (!response.ok) {
      console.error(`[EMAIL_ERROR] Resend API error:`, JSON.stringify(data));
      return {
        success: false,
        mode: "live",
        error: data.message || "Failed to send email via Resend",
      };
    }

    console.log(`[EMAIL_SENT] Email successfully dispatched via Resend to ${to} (Message ID: ${data.id})`);
    return {
      success: true,
      mode: "live",
      messageId: data.id,
    };
  } catch (error) {
    console.error(`[EMAIL_EXCEPTION] Failed to send email to ${to}:`, error);
    return {
      success: false,
      mode: "live",
      error: error instanceof Error ? error.message : "Unknown error sending email",
    };
  }
}

/**
 * Helper to dispatch the waitlist welcome & confirmation email.
 */
export async function sendWaitlistWelcome(email: string): Promise<SendEmailResult> {
  const { subject, html, text } = getWaitlistWelcomeEmail(email);
  return sendEmail({
    to: email,
    subject,
    html,
    text,
  });
}
