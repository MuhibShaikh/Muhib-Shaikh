# Sandbox — AI-Powered Cybersecurity Platform

Sandbox is a modern, production-ready full-stack web application designed for safely testing suspicious content, including URLs, LLM prompts, code snippets, and files, inside isolated environments with AI-powered security analysis.

## 🚀 Features

- **AI-Powered Analysis**: Instant threat detection and risk scoring for various content types.
- **Isolated Environments**: Safety-first approach with virtualized sandboxing.
- **Modern Dashboard**: High-fidelity UI for monitoring security stats and analysis history.
- **Demo Mode**: Automatic fallback to local mock data if Supabase credentials are missing.
- **Robust Auth**: Secure user authentication via Supabase Auth.
- **Responsive Design**: Polished experience across desktop, tablet, and mobile.

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### 1. Prerequisites

- Node.js 18.x or later
- npm or yarn

### 2. Installation

```bash
git clone <repository-url>
cd sandbox
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory (or copy from `.env.example`):

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

*Note: If these variables are missing, the app will automatically run in **Demo Mode**.*

### 4. Supabase Setup (Optional)

If you want to use a real database:
1. Create a new project at [Supabase](https://app.supabase.com/).
2. Run the SQL provided in `supabase/migrations/20240509000000_initial_schema.sql` in the Supabase SQL Editor.
3. Enable Email Auth in the Supabase Dashboard.

### 5. Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components and feature-specific components.
- `src/hooks`: Custom React hooks (Auth, etc.).
- `src/lib`: Supabase clients and utility functions.
- `src/services`: API services and mock data handlers.
- `src/types`: TypeScript interfaces and types.
- `supabase/migrations`: Database schema and RLS policies.

## 📄 License

This project is licensed under the MIT License.
