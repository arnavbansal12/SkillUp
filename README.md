# SkillUp - Communication Skills Platform

A gamified platform for mastering communication skills through courses, quests, and community learning.

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_GITHUB_USERNAME/skillforge)

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd skillforge
vercel

# Deploy to production
vercel --prod
```

### Option 3: GitHub Integration

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel auto-detects Next.js

## 📋 Prerequisites

### Required Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Clerk Authentication (https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database (SQLite for development)
DATABASE_URL="file:./dev.db"
```

### Clerk Setup

1. Create account at [clerk.dev](https://clerk.dev)
2. Create a new application
3. Copy publishable key and secret key
4. Configure redirect URLs in Clerk dashboard

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
skillforge/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (main)/            # Main dashboard pages
│   │   │   ├── page.tsx      # Dashboard
│   │   │   ├── courses/       # Courses page
│   │   │   ├── missions/       # Quests/Missions page
│   │   │   ├── community/     # Community page
│   │   │   ├── achievements/  # Achievements page
│   │   │   ├── leaderboard/  # Leaderboard page
│   │   │   └── profile/      # User profile
│   │   └── api/              # API routes
│   ├── components/            # React components
│   └── lib/                  # Utilities & data
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                   # Static assets
└── .env.example              # Environment template
```

## 🎨 Features

- **Dashboard** - Real-time stats, level progress, achievements
- **Courses** - Video-based learning with progress tracking
- **Quests** - Practice missions with XP rewards
- **Community** - Share insights, engage with peers
- **Leaderboard** - Compete with other learners
- **Achievements** - Unlock badges and rewards

## 📊 Database

Currently uses SQLite (for local dev). For production, recommended options:

- **Vercel Postgres** - Native Vercel integration
- **Supabase** - Free tier, PostgreSQL
- **Neon** - Serverless PostgreSQL

## 🔧 Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: Clerk
- **Database**: Prisma ORM + SQLite
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📝 License

Private - All rights reserved
