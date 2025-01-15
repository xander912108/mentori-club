// Типы для Supabase
export interface User {
  id: string;
  email?: string;
  [key: string]: any;
}

export interface AuthResponse {
  data: {
    user: User | null;
  };
  error: Error | null;
}

// Типы для запросов
export interface AuthRequest extends Request {
  headers: Headers & {
    get(name: 'authorization'): string | null;
  };
}

// Типы для ответов
export interface AuthSuccessResponse {
  user: User;
  message: string;
}

export interface AuthErrorResponse {
  error: string;
} 