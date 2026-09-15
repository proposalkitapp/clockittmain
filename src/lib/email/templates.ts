import { SITE_URL, SITE_NAME } from "@/lib/site";

export function getWaitlistWelcomeEmail(email: string) {
  const subject = "You're in! $5/mo founder rate locked in ⏰ — Clockitt";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0e0d0b;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #f4f3ef;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #0e0d0b;
      padding: 32px 16px;
      box-sizing: border-box;
    }
    .container {
      max-width: 560px;
      margin: 0 auto;
      background-color: #171512;
      border: 1px solid #2e2a24;
      border-radius: 20px;
      overflow: hidden;
      padding: 36px 28px;
    }
    .header {
      text-align: center;
      margin-bottom: 28px;
    }
    .logo {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      margin-bottom: 12px;
    }
    .badge {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 9999px;
      background-color: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.35);
      color: #fbbf24;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    h1 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 800;
      line-height: 1.25;
      margin: 0 0 14px 0;
      letter-spacing: -0.02em;
    }
    p {
      color: #c4beaf;
      font-size: 15px;
      line-height: 1.6;
      margin: 0 0 18px 0;
    }
    .highlight-card {
      background-color: #1f1c17;
      border: 1px solid #38332a;
      border-radius: 14px;
      padding: 20px;
      margin: 24px 0;
    }
    .highlight-title {
      font-size: 14px;
      font-weight: 700;
      color: #fbbf24;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 12px;
    }
    .step {
      display: flex;
      margin-bottom: 12px;
      align-items: flex-start;
    }
    .step-num {
      background-color: #f59e0b;
      color: #0e0d0b;
      font-weight: 800;
      font-size: 11px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .step-text {
      font-size: 13px;
      color: #e5e2da;
      line-height: 1.5;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: #0e0d0b !important;
      font-weight: 700;
      font-size: 14px;
      padding: 12px 28px;
      border-radius: 12px;
      text-decoration: none;
      text-align: center;
      margin: 18px 0;
    }
    .footer {
      border-top: 1px solid #28241e;
      margin-top: 32px;
      padding-top: 20px;
      text-align: center;
      font-size: 12px;
      color: #7d776a;
      line-height: 1.6;
    }
    .footer a {
      color: #fbbf24;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <img src="${SITE_URL}/clockitt-mascot.png" alt="Clockitt Mascot" class="logo">
        <br>
        <span class="badge">Founder Access Confirmed</span>
        <h1>You're on the list. Silence is earned.</h1>
      </div>

      <p>Hey there,</p>
      <p>Welcome to <strong>Clockitt</strong>! You've successfully secured your early access spot and locked in our exclusive <strong>$5/month Founder Rate</strong> for life, backed by a risk-free <strong>3-day free trial</strong> when we launch.</p>

      <div class="highlight-card">
        <div class="highlight-title">How Clockitt Keeps You on Track</div>
        <div class="step">
          <span class="step-num">1</span>
          <span class="step-text"><strong>Set Your Daily Goal &amp; Deadline:</strong> Define the habit or finish line you commit to completing.</span>
        </div>
        <div class="step">
          <span class="step-num">2</span>
          <span class="step-text"><strong>Persistent Un-snoozeable Alarm:</strong> When your deadline arrives, the alarm fires continuously until proof is submitted.</span>
        </div>
        <div class="step">
          <span class="step-num">3</span>
          <span class="step-text"><strong>AI Photo Proof Verification:</strong> Snap real-time photo proof. AI validates the task before the alarm shuts off.</span>
        </div>
      </div>

      <p>We are putting the finishing touches on our iOS, Android, and Web beta. As a waitlist founder, you will be among the first group invited to download and test the app.</p>

      <div style="text-align: center;">
        <a href="${SITE_URL}" class="btn">View Clockitt Website &rarr;</a>
      </div>

      <p style="font-size: 13px; color: #9c9586; margin-top: 20px;">
        Follow our build in public journey on X: <a href="https://x.com/clockittapp" style="color: #fbbf24;">@clockittapp</a> and TikTok: <a href="https://tiktok.com/useclockittapp" style="color: #fbbf24;">@useclockittapp</a>.
      </p>

      <div class="footer">
        <p>© 2026 ${SITE_NAME}. 256-Bit SSL Encrypted • Zero Spam Guarantee.</p>
        <p>You received this email because <strong>${email}</strong> joined the Clockitt waitlist on <a href="${SITE_URL}">${SITE_NAME}</a>.</p>
        <p><a href="${SITE_URL}/privacy">Privacy Policy</a> &bull; <a href="${SITE_URL}/terms">Terms of Service</a> &bull; <a href="mailto:hello@clockitt.app">Support</a></p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
Welcome to Clockitt! You're on the early access waitlist.

You have locked in our $5/month Founder Rate for life, backed by a 3-day free trial.

HOW CLOCKITT WORKS:
1. Set Your Daily Goal & Deadline: Define the habit or finish line you commit to completing.
2. Persistent Un-snoozeable Alarm: When your deadline arrives, the alarm fires continuously until proof is submitted.
3. AI Photo Proof Verification: Snap real-time photo proof. AI validates the task before the alarm shuts off.

We'll notify you as soon as the private beta is ready for download on iOS and Android.

Website: ${SITE_URL}
Community: https://x.com/clockittapp | https://tiktok.com/useclockittapp
Support: hello@clockitt.app

© 2026 Clockitt. All rights reserved.
  `.trim();

  return { subject, html, text };
}

export function getAdminNewSignupEmail(userEmail: string) {
  const subject = `🔥 New Waitlist Signup: ${userEmail} — Clockitt`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, sans-serif; background: #0e0d0b; color: #f4f3ef; padding: 24px;">
  <div style="max-width: 500px; margin: 0 auto; background: #171512; border: 1px solid #2e2a24; border-radius: 16px; padding: 24px;">
    <h2 style="color: #fbbf24; margin-top: 0;">New Founder Signed Up!</h2>
    <p style="font-size: 16px;"><strong>Email:</strong> ${userEmail}</p>
    <p style="font-size: 14px; color: #c4beaf;">Signed up at: ${new Date().toUTCString()}</p>
    <div style="margin-top: 20px;">
      <a href="${SITE_URL}/dashboard" style="display: inline-block; background: #f59e0b; color: #0e0d0b; font-weight: bold; padding: 10px 20px; border-radius: 8px; text-decoration: none;">View Dashboard &rarr;</a>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `New Founder Signed Up!\nEmail: ${userEmail}\nTime: ${new Date().toUTCString()}\nDashboard: ${SITE_URL}/dashboard`;

  return { subject, html, text };
}
