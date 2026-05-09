import { useEffect, useState } from 'react';
import { supabase, isDemoMode } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      // Mock user for demo mode
      const timeoutId = setTimeout(() => {
        setUser({
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
        } as User);
        setLoading(false);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, isDemoMode };
}
