import { User, Session, AuthError } from '@supabase/supabase-js'

export type AuthMode = 'signin' | 'signup' | 'reset'

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData extends LoginFormData {
  firstName: string
  lastName: string
}

export interface AuthResponse {
  user: User | null
  session: Session | null
  error?: AuthError
  success?: boolean
  message?: string
} 