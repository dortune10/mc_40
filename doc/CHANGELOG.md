# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Created a detailed `IMPLEMENTATION_PLAN_NEW_FEATURES.md` in the `doc/` folder.
- Integrated Supabase client for live data persistence in `itinerary` and `rsvps`.
- Implemented password-protected Admin Dashboard with a new `/admin/login` page.
- Added an interactive `Countdown` component to the Hero section.
- Migrated all event data and UI text to the new **Panama City, Panama** destination (July 23-26).
- Created `SUPABASE_SETUP.sql` for quick database initialization.

## [0.1.0] - 2024-03-07
### Added
- Initial project scaffolding using Next.js 14.
- Core pages: Landing (`/`), Hotel Reservations (`/hotel`), and Admin Dashboard (`/admin`).
- Component library: Hero, Gallery, Itinerary, PlanningTools, RSVPForm, Navigation, and Footer.
- Soft UI design system with Glassmorphism and specialized color palette.
- Framer Motion animation integration.
- Local JSON data store for itineraries and RSVPs.
