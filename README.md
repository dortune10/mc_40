# Marien's 40th Birthday Celebration Website

A luxurious, interactive event planning landing page for Marien Coker's milestone 40th birthday celebration in Panama City, Panama on July 25 2026. Visitors can plan to be in Panama from July 23 - July 26 2026.

Designed with a premium **Soft UI / Glassmorphism** aesthetic, featuring elegant pink, fuchsia, purple, and gold accents.

---

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** to view the site.

---

## 🗺️ Page Architecture

### 🏠 Main Landing Page (`/`)
A high-engagement welcome experience comprising:
- **Hero**: Live countdown and welcome message with smooth Framer Motion animations.
- **Gallery (The Muse)**: A premium visual journey showcase with glassmorphism hover effects.
- **Itinerary**: Interactive event schedule fetched dynamically from Supabase with chronological sorting.
- **Planning Tools**: Essential logistics (Accommodations and Travel Info). 
- **RSVP Form**: Interactive attendance confirmation with live database integration.

### 🏨 Hotel Reservations Page (`/hotel`)
A dedicated booking portal featuring:
- **Special Rates**: Managed pricing for Sheraton Grand Panama and Aloft Panama.
- **Direct Booking**: "Copy Subject Line" feature for seamless email-based reservations.
- **Policy Overviews**: Detailed breakfast and children's policies.

### 🛡️ Admin Dashboard (`/admin`)
A secure management interface to:
- **Security**: Password protected access (`ADMIN_PASSWORD`) with secure sessions.
- **RSVPs**: Real-time management and deletion of guest responses.
- **Events**: Full CRUD (Create/Update/Delete) for the celebration itinerary.
- **Live Sync**: Visual indicators for real-time data synchronization.

---

## ✨ Features & Design

- 🎨 **Luxury Aesthetic**: Modern Glassmorphism and Neumorphism using a curated color palette.
- ⚡ **Performance**: Optimized Next.js 14 App Router for rapid page loads and SEO.
- 🗄️ **Database Driven**: All events and RSVPs are managed via **Supabase** for real-time reliability.
- 🛫 **Automated CI/CD**: Seamless deployment to VPS via **GitHub Actions**.
- ✉️ **Email Automation**: Instant RSVP confirmation emails via **Resend**.

---

## 🎨 Color Palette

| Name | Hex | Role |
| :--- | :--- | :--- |
| **Rose Water** | `#FFF1F2` | Primary Background |
| **Deep Plum** | `#581C87` | Typography / Dark Accents |
| **Bright Fuchsia** | `#C026D3` | Major CTA Accents |
| **Metallic Gold** | `#D97706` | Luxury Detail / Status Highlighting |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (React 18)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📄 Documentation

Strategic project information and tracking documents are located in the `doc/` directory:
- 📑 [PRD.md](./doc/PRD.md) - Product Requirements and feature breakdown.
- 📝 [CHANGELOG.md](./doc/CHANGELOG.md) - History of changes and development milestones.
- 🏷️ [README.md](./doc/README.md) - A mirrored copy of this documentation.

