import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginFormData, RegisterFormData, AuthResponse } from '@/lib/types/auth';
import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { AuthError } from '@supabase/supabase-js';

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const signIn = async ({ email, password }: LoginFormData): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.refresh();
      return { user: data.user, session: data.session };
    } catch (error: any) {
      setError(error.message);
      return { 
        user: null,
        session: null,
        error: new AuthError(error.message)
      };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({ email, password, firstName, lastName }: RegisterFormData): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);

      console.log('Отправка запроса на регистрацию:', { email, firstName, lastName });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        console.error('Ошибка при регистрации:', error);
        throw error;
      }

      console.log('Ответ от Supabase:', data);

      if (data?.user) {
        // Автоматически входим после регистрации
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        router.refresh();
        return { user: signInData.user, session: signInData.session };
      }

      return { user: data.user, session: data.session };
    } catch (error: any) {
      console.error('Ошибка в хуке useAuth:', error);
      setError(error.message);
      return { 
        user: null,
        session: null,
        error: new AuthError(error.message)
      };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<{ error?: AuthError }> => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      return {};
    } catch (error: any) {
      setError(error.message);
      if (error instanceof AuthError) {
        return { error };
      }
      return { error: new AuthError(error.message) };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    loading,
    error,
  };
}; 