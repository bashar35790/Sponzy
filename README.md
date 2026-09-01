# Sponzy Frontend - Next.js 14 Creator Platform

A modern, high-performance creator subscription platform web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🌟 Key Features

* **App Router Architecture:** Modern Server Components with responsive client-side navigation.
* **Home Feed (`/`):** Dynamic feed with 24h stories tray, public post previews, subscriber-exclusive content, and pay-per-view paywalls.
* **Creator Profiles (`/[username]`):** Dynamic cover headers, avatar badges, bios, customizable subscription tiers (Monthly, 3-Month, Annual), and post filters (All, Photos, Videos).
* **Explore & Search (`/explore`):** Search and discovery grid for trending creators and influencers.
* **Shorts & Reels (`/reels`):** Vertical video feed with likes, audio tracks, and swipe navigation.
* **Direct Messaging (`/messages`):** Real-time chat with locked pay-to-view media attachments and creator tipping.
* **Digital Storefront (`/shop`):** Creator digital goods marketplace with instant file download delivery.
* **Live Broadcasts (`/live`):** Live streaming interface with interactive live chat and real-time reactions.
* **Authentication (`/login`, `/register`):** Seamless user and creator authentication with session persistence.

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── [username]/     # Dynamic Creator Profile page
│   │   ├── explore/        # Creator discovery & search
│   │   ├── live/           # VIP live broadcast & live chat
│   │   ├── login/          # User authentication login
│   │   ├── messages/       # Direct messaging interface
│   │   ├── reels/          # Vertical Shorts/Reels video player
│   │   ├── register/       # User & Creator registration
│   │   ├── shop/           # Digital goods storefront
│   │   ├── globals.css     # Global styles & modern theme tokens
│   │   ├── layout.tsx      # Root layout with Navbar & Sidebar
│   │   └── page.tsx        # Home feed & Story tray
│   ├── components/
│   │   ├── feed/           # PostCard, StoryTray, CreatePostModal
│   │   └── layout/         # Navbar, Sidebar, MobileNav
│   ├── context/            # AuthContext provider & state
│   └── lib/                # Axios API client & Supabase browser client
├── next.config.js          # Next.js build & image domain configuration
├── tailwind.config.js      # Tailwind theme styling
├── .env.example
├── package.json
└── tsconfig.json
```

---

## ⚙️ Environment Variables (`.env.local`)

```env
# Backend REST API and WebSocket URLs
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WS_URL=http://localhost:5000

# Supabase Client Credentials
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
copy .env.example .env.local

# 3. Start development server
npm run dev
```

Open **`http://localhost:3000`** in your browser.

---

## 🚀 Production Build & Deployment

### Build Locally
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
1. Push this repository to **GitHub**.
2. Import your repository into **[Vercel](https://vercel.com/new)**.
3. Configure Environment Variables in Vercel:
   * `NEXT_PUBLIC_API_URL`: Your deployed backend API URL (e.g. `https://api.yourdomain.com/api`)
   * `NEXT_PUBLIC_WS_URL`: Your deployed backend WebSocket URL
   * `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
4. Click **Deploy**!
