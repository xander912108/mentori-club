import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginFormData, RegisterFormData, AuthResponse } from '@/lib/types/auth';
import { AuthError } from '@supabase/supabase-js';

export const useAuth = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
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
      return { 
        success: true,
        user: data.user,
        session: data.session
      };
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
        return { 
          success: false,
          user: null,
          session: null,
          error,
          message: error.message
        };
      }
      return { 
        success: false,
        user: null,
        session: null,
        error: new AuthError('Неизвестная ошибка'),
        message: 'Произошла неизвестная ошибка'
      };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({ email, password, firstName, lastName }: RegisterFormData): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);

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

      if (error) throw error;

      if (data?.user) {
        // Автоматически входим после регистрации
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        router.refresh();
        return { 
          success: true,
          user: signInData.user,
          session: signInData.session
        };
      }

      return { 
        success: true,
        user: data.user,
        session: data.session
      };
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
        return { 
          success: false,
          user: null,
          session: null,
          error,
          message: error.message
        };
      }
      return { 
        success: false,
        user: null,
        session: null,
        error: new AuthError('Неизвестная ошибка'),
        message: 'Произошла неизвестная ошибка'
      };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      return {
        success: true,
        user: null,
        session: null,
        message: 'Инструкции по сбросу пароля отправлены на ваш email'
      };
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
        return { 
          success: false,
          user: null,
          session: null,
          error,
          message: error.message
        };
      }
      return { 
        success: false,
        user: null,
        session: null,
        error: new AuthError('Неизвестная ошибка'),
        message: 'Произошла неизвестная ошибка'
      };
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
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    isLoading,
    error,
  };
}; 