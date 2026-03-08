# Product Requirements Document (PRD)

## Project: Marien Coker's 40th Birthday Celebration Website

### 1. Introduction
The objective of this project is to create a luxurious and interactive landing page to celebrate Marien Coker's 40th birthday in Panama City, Panama on July 25 2026. Visitors can plan to be in Panama from July 23 - July 26 2026. The site serves as a central hub for guests to find event details, book accommodations, and RSVP.

### 2. Target Audience
- **Primary**: Friends and family invited to the celebration via the link of the invitation.
- **Secondary**: Event coordinators and the birthday girl herself for management.

### 3. Core Features

#### 3.1. Landing Page
- **Hero Section**: High-impact visual greeting with smooth animations and a clear call-to-action (RSVP).
- **Gallery**: A masonry or grid-based showcase of celebratory images.
- **Interactive Itinerary**: A chronology of events (e.g., Dinner, Party) during the celebration weekend.
- **Planning Tools**: Quick links and cards for logistics (Hotels, Registry, Travel, Transportation).
- **RSVP Form**: A user-friendly form to capture attendance, guest counts, and dietary requirements.

#### 3.2. Accommodations Page (/hotel)
- **Hotel Options**: Detailed cards for Sheraton Grand Panama and Aloft Panama.
- **Booking Integration**: Special rates display and a "Copy Subject Line" feature for direct booking via email.
- **Policies**: Clear explanations of breakfast inclusions and children's policies.

#### 3.3. Admin Dashboard (/admin password protected)
- **RSVP Management**: A way to view and track all guest responses.
- **Itinerary Management**: Ability to update event details (dates, times, locations) in real-time. (Note: Current implementation uses JSON storage).

#### 3.4. Visual & Experience Design
- **Theme**: Soft UI / Glassmorphism.
- **Palette**: Rose Water, Deep Plum, Bright Fuchsia, and Metallic Gold.
- **Interactions**: Framer Motion powered entry animations and hover effects for a premium feel.

### 4. Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Logic**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Model**: Local JSON files (`src/data/itinerary.json`, `src/data/rsvps.json`)

### 5. Success Metrics
- 100% RSVP rate for invited guests.
- Low Friction: Guests successfully book hotels using the provided instructions.
- Modern Appeal: A high-quality visual experience that reflects the milestone nature of the event.

### 6. Future Enhancements
- Real-time RSVP notifications (Email/SMS).
- Live countdown timer to the main event.
- Integration with supabase for more robust data persistence of visitor's information
