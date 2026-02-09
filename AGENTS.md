# AGENTS.md

## Goal
Build a CRO landing-page agency OS:
- Dashboard UI (auth, project intake, approvals, reports)
- Landing page app (book-a-call pages)
- PR-based workflow: agent proposes changes -> creates PR -> human approves -> deploy

## Tech
- Next.js (App Router) + TypeScript
- TailwindCSS
- Supabase (Auth + DB)
- Vercel deployment
- Microsoft Clarity installed on landing pages
- Calendly embed for booking

## Non-negotiables
- Always create changes in a branch and open a PR (never commit to main directly).
- Include a short "Reasoning" section in PR description (what changed + why + expected metric impact).
- Keep UI simple and marketer-friendly.
- Track events: cta_book_call_click, scheduler_loaded, booking_confirmed.
- Add basic tests/lint if easy; run lint before PR.
