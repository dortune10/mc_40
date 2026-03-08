# Implementation Plan: Enhancing Marien's 40th Birthday Celebration Website

This plan outlines the steps to implement missing features and infrastructure upgrades as requested in the updated PRD, specifically focusing on data persistence, security, and real-time engagement.

## Phase 1: Supabase Infrastructure & Data Migration

### 1. Supabase Setup
- Initialize a Supabase project.
- Configure Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
- Define the database schema using SQL:
  - `itinerary`: `id`, `day`, `title`, `time`, `description`, `dressCode`, `location`, `isHighlight`.
  - `rsvps`: `id`, `firstName`, `lastName`, `email`, `attendingGala`, `attendingBrunch`, `dietaryNotes`, `message`, `submittedAt`.

### 2. Data Migration & API Update
- Create a migration script to seed Supabase with existing `itinerary.json` data.
- Refactor `src/app/api/itinerary/route.ts` and `src/app/api/rsvp/route.ts` to interface with Supabase instead of `fs`.
- Ensure the RSVP form in `src/components/RSVPForm.tsx` now pushes data to the Supabase `rsvps` table.

---

## Phase 2: Secure Admin Access

### 1. Password Protection for `/admin`
- **Approach**: Implement a sleek, Glassmorphism-themed login screen for the admin dashboard.
- **Security**: Use a simple environment variable-based `ADMIN_PASSWORD` (or Supabase Auth) to verify access.
- **UX**: 
  - If not authenticated, redirect `/admin` visitors to `/admin/login`.
  - Store authentication status in a secure cookie or local storage (for high-level protection, a server-side check in middleware is preferred).

### 2. Admin UI Polish
- Update the admin dashboard to reflect live data updates from Supabase.
- Maintain the "Soft UI" consistency with unified shadows and gradients.

---

## Phase 3: Engagement & Polish

### 1. Live Countdown Timer
- **Target Date**: July 25, 2026.
- **Component**: Create `Countdown.tsx` in `src/components`.
- **Design**: Use the Deep Plum and Metallic Gold accents. High-impact typography with subtle `framer-motion` updates.
- **Placement**: Integrate into the `Hero` section or as a standalone section above the `Itinerary`.

### 2. Premium Invitation Experience
- Refine the global styles to ensure the landing page feels specifically "invitation-only".
- Ensure the "visitors plan to be in Panama from July 23 - July 26" information is prominently displayed in the Hero or Itinerary.

---

## Phase 4: Future Proofing (Next Steps)
- Implement Supabase Real-time to show live RSVP counts on the admin dashboard.
- Set up Edge Functions for automated RSVP confirmation emails.

---

## Technical Constraints & Aesthetics
- **Palette**: Rose Water (#FFF1F2), Deep Plum (#581C87), Bright Fuchsia (#C026D3), Metallic Gold (#D97706).
- **Framework**: Next.js 14, Tailwind CSS, Framer Motion.
- **Assets**: All images/icons should maintain the high-luxury aesthetic.
