# Move the waitlist to your own Supabase project

## Goal
Make every waitlist signup land in **your** Supabase project (`fajigtdnindueewexqmt`) so you can see and manage rows in the supabase.com Table Editor, while keeping the site working end to end.

## Why the signups are "in Lovable" today
Lovable Cloud is itself a managed Supabase project. This app's backend is a separate Supabase instance that Lovable provisioned — that's where your 9 signups live. You can't open it in your own supabase.com dashboard, only through Lovable's Cloud view. Your `fajigtdnindueewexqmt` project is a different, empty database. The fix is to repoint the app at your project.

## What I'll do

### 1. Get your project credentials
From your Supabase dashboard (project `fajigtdnindueewexqmt` → Project Settings → API), I'll need:
- **Project URL** (e.g. `https://fajigtdnindueewexqmt.supabase.co`)
- **anon public key**

I'll request these through Lovable's secure secret form — you never paste them in chat.

### 2. Create the table in your project
I'll give you a short SQL script to paste into your project's **SQL Editor** (I can't reach your project directly). It creates:
- `waitlist_signups` (id, unique email, created_at) — same shape as today
- Row Level Security with an "anyone can join" insert policy
- Grants so the app's key can insert

### 3. Migrate your existing 9 signups
I export the 9 rows from the Lovable Cloud backend and give you a second small SQL script to insert them into your table — so no signups are lost.

### 4. Repoint the app
- Update the app's environment to use your project URL and anon key instead of the Lovable Cloud ones.
- The waitlist form code (`.from("waitlist_signups").insert(...)`) stays exactly the same — it will just write to your project now.

### 5. Verify together
- Submit a real test signup through the live form.
- You open your Table Editor and confirm the row appears.
- I remove the test row afterwards.

## Trade-offs to know
- **Auth/dashboard:** the admin login + dashboard I built earlier relies on Lovable Cloud auth. After the move, sign-in would need to be reconfigured against your project (your project has no users yet). The waitlist form itself works without any login.
- **Future backend features** (email notifications, etc.) would run through your own Supabase setup rather than Lovable Cloud's one-click tooling.
- The Lovable Cloud backend stays attached but unused — the old data remains there as a backup unless you ask me to remove it.

## Steps for you
1. Approve this plan.
2. When prompted, provide your Project URL + anon key via the secure form.
3. Run the two short SQL scripts I give you in your project's SQL Editor.
4. Check the Table Editor after the test signup.
