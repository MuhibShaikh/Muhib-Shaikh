import { useEffect, useState } from 'react';
import { supabase, isDemoMode } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { UserProfile, UserRole } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      // Mock user and profile for demo mode
      const timeoutId = setTimeout(() => {
        const mockUser = {
          id: 'demo-user',
          email: 'demo@example.com',
          user_metadata: { full_name: 'Demo User' },
          aud: 'authenticated',
          role: 'authenticated',
          created_at: new Date().toISOString(),
          app_metadata: {},
          confirmed_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          phone: '',
          recovery_sent_at: '',
          email_confirmed_at: new Date().toISOString(),
          new_email: '',
          new_phone: '',
          identities: [],
          factors: [],
        } as User;

        setUser(mockUser);
        setProfile({
          id: 'demo-user',
          email: 'demo@example.com',
          full_name: 'Demo User',
          role: 'startup',
          bio: 'Founder at NexGen AI. Building the future of automation.',
          skills: ['React', 'Next.js', 'AI'],
          created_at: new Date().toISOString(),
        });
        setLoading(false);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile(profile);
      }
      setLoading(false);
    };

    getUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setProfile(profile);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, profile, loading, isDemoMode };
}
