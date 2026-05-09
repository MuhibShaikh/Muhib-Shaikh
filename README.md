# Sandbox — Startup Collaboration Platform

Sandbox is a calm, modern platform where startups build in public and students join ambitious teams to collaborate on real-world projects.

## 🚀 Features

- **Build in Public Timeline**: Chronological milestones, progress logs, and updates from startups.
- **Project Discovery**: Students can explore projects, filter by skills/commitment, and apply directly.
- **Application Management**: A streamlined flow for startups to review applicants and for students to track their applications.
- **Role-Based Experience**: Tailored dashboards for Students, Startups, and Investors.
- **Modern Aesthetic**: A minimal, focused UI inspired by Linear, Vercel, and Notion.
- **Demo Mode**: Seamless experience even without Supabase credentials.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 3. Database Setup (Supabase)

1. Create a new project on [Supabase](https://supabase.com/).
2. Run the SQL migrations in the `supabase/migrations` folder using the Supabase SQL Editor (run `initial_schema.sql` first, then `startup_transformation.sql`).

### 4. Run Development Server

```bash
npm run dev
```

## 📁 Key Directories

- `src/app`: Application routes and layouts.
- `src/components`: UI components (Radix-based) and layouts.
- `src/hooks`: Custom hooks for Auth and state management.
- `src/services`: Mock and real API service handlers.
- `src/types`: Centralized TypeScript definitions.
- `supabase/migrations`: Database schema and RLS policies.

## 📄 License

MIT
