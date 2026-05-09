import { Project, TimelineUpdate, Application } from '@/types';

const MOCK_STARTUP_ID = 'startup-1';

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    startup_id: MOCK_STARTUP_ID,
    title: 'Senior Frontend Architect',
    description: 'We are building a decentralized cloud infrastructure platform. We need someone to lead our dashboard implementation using Next.js and high-performance visualization libraries. You will be responsible for the core UI architecture and ensuring 60fps performance across all views.',
    required_skills: ['Next.js', 'TypeScript', 'WebAssembly'],
    tags: ['SaaS', 'Cloud', 'Frontend'],
    commitment_level: 'high',
    location_type: 'remote',
    status: 'open',
    applicant_count: 24,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    startup_id: 'startup-2',
    title: 'Product Design Intern',
    description: 'Join Solaris AI to help us shape the user experience of our next-gen renewable energy monitoring system. You will work directly with our CTO and Head of Design to create a world-class monitoring interface that makes complex energy data simple and actionable.',
    required_skills: ['Figma', 'UI Design', 'Prototyping'],
    tags: ['Design', 'CleanTech', 'AI'],
    commitment_level: 'medium',
    location_type: 'hybrid',
    status: 'open',
    applicant_count: 12,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    startup_id: 'startup-3',
    title: 'Fullstack Developer',
    description: 'Verity is looking for a fullstack developer to help us build our trust and safety platform. You will be working on our core API, data validation pipelines, and student onboarding flows. Experience with Supabase and real-time features is a plus.',
    required_skills: ['Node.js', 'React', 'PostgreSQL'],
    tags: ['Trust', 'Safety', 'API'],
    commitment_level: 'medium',
    location_type: 'remote',
    status: 'open',
    applicant_count: 8,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    startup_id: 'startup-1',
    title: 'Backend Systems Engineer',
    description: 'Help us scale our distributed compute layer. We need someone who understands networking, distributed state, and performance optimization at the protocol level.',
    required_skills: ['Go', 'Rust', 'Kubernetes'],
    tags: ['Infra', 'Distributed', 'Compute'],
    commitment_level: 'high',
    location_type: 'remote',
    status: 'open',
    applicant_count: 15,
    created_at: new Date().toISOString(),
  }
];

const MOCK_TIMELINE: TimelineUpdate[] = [
  {
    id: 'u1',
    startup_id: MOCK_STARTUP_ID,
    title: 'Beta Launch Success!',
    content: 'We just onboarded our first 50 enterprise customers. The feedback has been incredible. Latency metrics are exceeding expectations by 30%. Ready to scale the next phase of our infrastructure.',
    type: 'win',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'u2',
    startup_id: MOCK_STARTUP_ID,
    title: 'Dashboard Preview v2',
    content: 'Our new analytics dashboard is coming together. We have implemented real-time node monitoring and usage telemetry. This will give our customers unprecedented visibility into their compute clusters.',
    type: 'screenshot',
    created_at: new Date(Date.now() - 86400000 * 1.5).toISOString(),
  },
  {
    id: 'u3',
    startup_id: MOCK_STARTUP_ID,
    title: 'Architecture Decision',
    content: 'Switching our core processing engine to Rust for 5x performance improvement. We found that the memory safety and concurrency primitives in Rust are perfectly suited for our high-throughput requirements.',
    type: 'progress_log',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'u4',
    startup_id: MOCK_STARTUP_ID,
    title: 'Welcoming New Talent',
    content: 'Excited to have 3 new student collaborators joining us from Sandbox! They will be working on our edge computing modules and developer documentation.',
    type: 'team_update',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 'u5',
    startup_id: MOCK_STARTUP_ID,
    title: 'Raised Seed Round',
    content: 'Thrilled to announce we have raised $2M from leading investors to build the future of cloud computing. This capital will help us grow our team and accelerate our roadmap.',
    type: 'milestone',
    created_at: new Date(Date.now() - 86400000 * 14).toISOString(),
  }
];

export const mockService = {
  getProjects: async (): Promise<Project[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PROJECTS), 600);
    });
  },

  getProjectById: async (id: string): Promise<Project | null> => {
    return new Promise((resolve) => {
      const project = MOCK_PROJECTS.find(p => p.id === id);
      setTimeout(() => resolve(project || null), 400);
    });
  },

  getTimelineUpdates: async (startupId: string): Promise<TimelineUpdate[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_TIMELINE), 500);
    });
  },

  getApplications: async (): Promise<Application[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([
        {
          id: 'a1',
          project_id: '1',
          student_id: 'student-1',
          status: 'pending',
          short_app: 'Excited about cloud tech!',
          portfolio_links: ['github.com/alex'],
          fit_explanation: 'I have worked on several React projects and love the vision.',
          created_at: new Date().toISOString(),
        }
      ]), 400);
    });
  }
};
