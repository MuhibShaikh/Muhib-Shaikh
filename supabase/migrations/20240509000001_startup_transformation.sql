-- Transformation to Startup Collaboration Platform

-- 1. Extend profiles with roles and bio
alter table public.profiles add column if not exists role text check (role in ('student', 'startup', 'investor')) default 'student';
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists skills text[];

-- 2. Startups
create table public.startups (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text not null,
  logo_url text,
  website text,
  industry text not null,
  stage text check (stage in ('idea', 'mvp', 'scaling', 'profitable')) default 'idea',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Projects
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  startup_id uuid references public.startups(id) on delete cascade not null,
  title text not null,
  description text not null,
  required_skills text[] default '{}',
  tags text[] default '{}',
  commitment_level text check (commitment_level in ('low', 'medium', 'high')) default 'medium',
  location_type text check (location_type in ('remote', 'in-person', 'hybrid')) default 'remote',
  deadline timestamp with time zone,
  status text check (status in ('open', 'closed')) default 'open',
  applicant_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Applications
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  student_id uuid references public.profiles(id) on delete cascade not null,
  status text check (status in ('pending', 'accepted', 'rejected')) default 'pending',
  short_app text not null,
  portfolio_links text[] default '{}',
  fit_explanation text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Timeline Updates
create table public.timeline_updates (
  id uuid default gen_random_uuid() primary key,
  startup_id uuid references public.startups(id) on delete cascade not null,
  title text not null,
  content text not null,
  type text check (type in ('milestone', 'product_update', 'progress_log', 'screenshot', 'win', 'loss', 'team_update')) not null,
  media_urls text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Saved Projects
create table public.saved_projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, project_id)
);

-- RLS Enablement
alter table public.startups enable row level security;
alter table public.projects enable row level security;
alter table public.applications enable row level security;
alter table public.timeline_updates enable row level security;
alter table public.saved_projects enable row level security;

-- Policies

-- Startups: anyone can view, only owner can edit
create policy "Anyone can view startups" on public.startups for select using (true);
create policy "Owners can manage startups" on public.startups for all using (auth.uid() = owner_id);

-- Projects: anyone can view, only startup owner can edit
create policy "Anyone can view projects" on public.projects for select using (true);
create policy "Startups can manage own projects" on public.projects for all using (
  exists (select 1 from public.startups where id = startup_id and owner_id = auth.uid())
);

-- Applications: students can manage own, startups can view for their projects
create policy "Students can view own applications" on public.applications for select using (auth.uid() = student_id);
create policy "Students can create applications" on public.applications for insert with check (auth.uid() = student_id);
create policy "Startups can view applications for their projects" on public.applications for select using (
  exists (select 1 from public.projects p join public.startups s on p.startup_id = s.id
          where p.id = project_id and s.owner_id = auth.uid())
);
create policy "Startups can update application status" on public.applications for update using (
  exists (select 1 from public.projects p join public.startups s on p.startup_id = s.id
          where p.id = project_id and s.owner_id = auth.uid())
);

-- Timeline Updates: anyone can view, only startup owner can manage
create policy "Anyone can view timeline updates" on public.timeline_updates for select using (true);
create policy "Startups can manage own updates" on public.timeline_updates for all using (
  exists (select 1 from public.startups where id = startup_id and owner_id = auth.uid())
);

-- Saved Projects: users can manage own
create policy "Users can manage own saved projects" on public.saved_projects for all using (auth.uid() = user_id);
