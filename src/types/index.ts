export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Analysis {
  id: string;
  user_id: string;
  type: 'url' | 'prompt' | 'file' | 'code';
  content: string;
  title: string;
  threat_level: ThreatLevel;
  risk_score: number;
  summary: string;
  details: {
    vulnerabilities: string[];
    behavioral_analysis: string;
    recommended_actions: string[];
  };
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details: Record<string, unknown>;
  created_at: string;
}
