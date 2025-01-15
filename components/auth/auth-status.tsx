import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!user) {
    return (
      <Button
        variant="outline"
        onClick={() => router.push('/auth')}
      >
        Sign In
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">
        {user.email}
      </span>
      <Button
        variant="outline"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    </div>
  );
} 