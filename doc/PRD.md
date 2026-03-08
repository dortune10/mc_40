# Product Requirements Document (PRD)

## Project: Marien Coker's 40th Birthday Celebration Website

### 1. Introduction
The objective of this project is to create a luxurious and interactive landing page to celebrate Marien Coker's 40th birthday in Panama City, Panama on July 25 2026. Visitors can plan to be in Panama from July 23 - July 26 2026. The site serves as a central hub for guests to find event details, book accommodations, and RSVP.

### 2. Target Audience
- **Primary**: Friends and family invited to the celebration via the link of the invitation.
- **Secondary**: Event coordinators and the birthday girl herself for management.

### 3. Core Features

#### 3.1. Landing Page
- **Hero Section**: High-impact visual greeting with smooth animations, a **live countdown timer**, and a clear call-to-action (RSVP).
- **Gallery (The Muse)**: A premium masonry-style grid showcase of real celebratory images with interactive glassmorphism hover effects.
- **Interactive Itinerary**: A chronology of events fetched dynamically from Supabase, featuring **intelligent chronological sorting** by day and time.
- **Planning Tools**: Curated links for guest logistics (Accommodations and Travel Info). 
- **RSVP Form**: A user-friendly form with guest lookup, attendance capturing for multiple events (Gala/Brunch), guest names management, and dietary requirements.

#### 3.2. Accommodations Page (/hotel)
- **Hotel Options**: Detailed cards for Sheraton Grand Panama and Aloft Panama.
- **Booking Integration**: Special rates display and a "Copy Subject Line" feature for direct booking via email.
- **Policies**: Clear explanations of breakfast inclusions and children's policies.

#### 3.3. Admin Dashboard (/admin)
- **Security**: Server-side password verification (`ADMIN_PASSWORD`) with secure session cookies.
- **Real-time Synchronization**: Live sync indicators and manual refresh buttons for RSVPs and Itinerary data.
- **RSVP Management**: Ability to view, search, and delete guest responses directly from the dashboard.
- **Itinerary Management**: Full CRUD capabilities for event management (Create, Read, Update, Delete) with multi-line description support.

#### 3.4. Visual & Experience Design
- **Theme**: Premium Soft UI / Glassmorphism.
- **Palette**: Rose Water, Deep Plum, Bright Fuchsia, and Metallic Gold.
- **Interactions**: Framer Motion powered entry animations, cascading grid reveals, and micro-interactions.

### 4. Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: **Supabase** (PostgreSQL) for real-time persistence and data management.
- **Infrastructure**: **GitHub Actions** for automated CI/CD deployment.
- **Hosting**: Linux VPS with **PM2** for process management.
- **Email**: **Resend** for automated RSVP confirmations.
- **Logic/Styling**: React 18, TypeScript, Tailwind CSS, Lucide React, Framer Motion.

### 5. Success Metrics
- 100% RSVP rate for invited guests.
- Seamless Admin Experience: Instant updates to the itinerary without code changes.
- Security: Protected guest information and administrative access.
- Modern Appeal: A flagship visual experience that reflects the milestone nature of the event.

### 6. Maintenance & DevOps
- **Deployment**: Automatic deployment to VPS upon pushes to the `main` branch.
- **Data Safety**: Environment variables managed via GitHub Secrets and `.env`.
- **Sync**: Real-time Supabase subscriptions for immediate admin UI updates.
