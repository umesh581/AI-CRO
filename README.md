# AI CRO

A monorepo for a CRO landing-page agency OS.

## Apps
- `apps/dashboard`: Internal dashboard for auth, intake, approvals, and reporting.
- `apps/landing`: Public landing-page templates with Calendly booking and analytics hooks.

## Tech Stack
- Next.js (App Router) + TypeScript
- TailwindCSS
- Supabase (Auth + DB)
- Vercel deployment
- Microsoft Clarity (landing pages)
- Calendly embed

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the apps:
   ```bash
   npm run dev:dashboard
   npm run dev:landing
   ```

## Lint
Run lint across all workspaces:
```bash
npm -ws run lint
```

## Environment Variables
Copy the examples for each app and fill in real values.

Dashboard (`apps/dashboard/.env.example`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Landing (`apps/landing/.env.example`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_CALENDLY_URL`
- `NEXT_PUBLIC_CLARITY_ID`

## Event Tracking
Landing app events (dispatched via custom event + dataLayer + gtag if present):
- `cta_book_call_click`
- `scheduler_loaded`
- `booking_confirmed` (placeholder to wire to Calendly/thank-you flow)

## Repo Workflow (Non-Negotiables)
- Always work in a branch and open a PR (never commit to `main`).
- Include a short **Reasoning** section in PRs (what changed + why + expected metric impact).
- Keep UI simple and marketer-friendly.
- Add basic tests/lint if easy; run lint before PR.
