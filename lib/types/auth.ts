export type AuthMode = 'signin' | 'signup'

export interface AuthFormData {
  email: string
  password: string
  confirmPassword?: string
}

export interface AuthError {
  message: string
  field?: 'email' | 'password' | 'confirmPassword' | undefined
} 