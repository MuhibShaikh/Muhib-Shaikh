-- Create tables for Sandbox application

-- 1. Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Analyses
create table public.analyses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null check (type in ('url', 'prompt', 'file', 'code')),
  content text not null,
  title text not null,
  threat_level text not null check (threat_level in ('low', 'medium', 'high', 'critical')),
  risk_score integer not null check (risk_score >= 0 and risk_score <= 100),
  summary text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Activity Logs
-- 3. Reports
create table public.reports (
  id uuid default gen_random_uuid() primary key,
  analysis_id uuid references public.analyses(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text not null,
  format text not null default 'pdf',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Activity Logs
create table public.activity_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  action text not null,
  details jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.analyses enable row level security;
alter table public.reports enable row level security;
alter table public.activity_logs enable row level security;

-- Policies

-- Profiles: users can read their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Analyses: users can read and write their own analyses
create policy "Users can view own analyses" on public.analyses
  for select using (auth.uid() = user_id);

create policy "Users can create own analyses" on public.analyses
  for insert with check (auth.uid() = user_id);

-- Reports: users can read and write their own reports
create policy "Users can view own reports" on public.reports
  for select using (auth.uid() = user_id);

create policy "Users can create own reports" on public.reports
  for insert with check (auth.uid() = user_id);

-- Activity Logs: users can read their own logs
create policy "Users can view own activity logs" on public.activity_logs
  for select using (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
