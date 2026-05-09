export type UserRole = 'student' | 'startup' | 'investor';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  bio?: string;
  skills?: string[];
  created_at: string;
}

export interface Startup {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  logo_url?: string;
  website?: string;
  industry: string;
  stage: 'idea' | 'mvp' | 'scaling' | 'profitable';
  created_at: string;
}

export interface Project {
  id: string;
  startup_id: string;
  title: string;
  description: string;
  required_skills: string[];
  tags: string[];
  commitment_level: 'low' | 'medium' | 'high';
  location_type: 'remote' | 'in-person' | 'hybrid';
  deadline?: string;
  status: 'open' | 'closed';
  applicant_count: number;
  created_at: string;
}

export interface Application {
  id: string;
  project_id: string;
  student_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  short_app: string;
  portfolio_links: string[];
  fit_explanation: string;
  created_at: string;
}

export interface TimelineUpdate {
  id: string;
  startup_id: string;
  title: string;
  content: string;
  type: 'milestone' | 'product_update' | 'progress_log' | 'screenshot' | 'win' | 'loss' | 'team_update';
  media_urls?: string[];
  created_at: string;
}

export interface SavedProject {
  id: string;
  user_id: string;
  project_id: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details: Record<string, unknown>;
  created_at: string;
}
