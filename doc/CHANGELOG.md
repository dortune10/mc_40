# Changelog

All notable changes to the **Marien's 40th Celebration Website** will be documented in this file.

## [1.1.0] - 2026-03-08

### 🚀 Added
- **Supabase Integration**: Fully migrated from static JSON files to a relational PostgreSQL database for both RSVPs and Itinerary events.
- **Admin Authentication**: Implemented a secure `/admin/login` page with server-side `ADMIN_PASSWORD` validation and encrypted cookies.
- **Dynamic Itinerary**: The itinerary now fetches real-time data from the `itinerary` table.
- **Itinerary Chronological Sorting**: Added client-side logic to sort events by day (Thursday-Sunday) and time, regardless of database order.
- **"The Muse" Gallery**: Replaced placeholder images with professionally styled celebratory photos in a premium masonry grid.
- **RSVP Management**: Admins can now view real-time sync status and delete guest reservations.
- **Itinerary CRUD**: Admins can now add, edit, and delete events directly from the dashboard.
- **GitHub Actions**: Automated CI/CD pipeline to deploy code to the Linux VPS on every push to `main`.
- **Panama Canal Tour**: Added a new Friday excursion event to the itinerary.
- **Countdown Timer**: Implemented a live countdown to the main gala on the Hero section.

### 🛠️ Fixed
- **Contact Info**: Corrected phone number to `+1 203 727 8653` and email to `marien.coker@gmail.com`.
- **Metadata**: Updated SEO tags to reflect the correct event location (Panama City, Panama).
- **Navigation**: Cleaned up planning cards to remove outdated "Registry" and "Transportation" info.

### 🧹 Removed
- **Redundant Site**: Deleted the nested `/mc` directory to fix Git submodule conflicts and deployment timeouts.
- **Legacy JSON**: Marked `itinerary.json` and `rsvps.json` as fallbacks; primary data flow is now via Supabase.

---

## [1.0.0] - 2026-03-07

### 🚀 Added
- Initial release of the landing page.
- Responsive RSVP form.
- Accommodations page with booking instructions.
- Basic Glassmorphism design system.
