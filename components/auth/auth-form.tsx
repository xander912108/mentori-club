'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthFormData, AuthMode, AuthError } from '@/lib/types/auth'

export function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<AuthMode>(searchParams?.get('mode') as AuthMode || 'signin')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const supabase = createClient()

  const validateForm = (): boolean => {
    if (!formData.email) {
      setError({ message: 'Email обязателен', field: 'email' })
      return false
    }
    if (!formData.password) {
      setError({ message: 'Пароль обязателен', field: 'password' })
      return false
    }
    if (mode === 'signup') {
      if (formData.password.length < 6) {
        setError({ message: 'Пароль должен быть не менее 6 символов', field: 'password' })
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setError({ message: 'Пароли не совпадают', field: 'confirmPassword' })
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!validateForm()) return

    setLoading(true)

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) throw error
        
        if (data.user) {
          router.push('/auth/verify-email')
        } else {
          setError({ 
            message: 'Произошла ошибка при регистрации',
            field: undefined 
          })
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
        if (error) throw error

        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: any) {
      setError({ 
        message: err.message || 'Произошла ошибка при аутентификации',
        field: undefined
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    const newMode = mode === 'signin' ? 'signup' : 'signin'
    setMode(newMode)
    const params = new URLSearchParams(window.location.search)
    params.set('mode', newMode)
    setError(null)
    router.push(`/auth?${params.toString()}`)
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          {mode === 'signin' ? 'Вход' : 'Регистрация'}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          {mode === 'signin' 
            ? 'Войдите в ваш аккаунт' 
            : 'Создайте новый аккаунт'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={error?.field === 'email' ? 'border-red-500' : ''}
          />
          {error?.field === 'email' && (
            <p className="text-sm text-red-500">{error.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={error?.field === 'password' ? 'border-red-500' : ''}
          />
          {error?.field === 'password' && (
            <p className="text-sm text-red-500">{error.message}</p>
          )}
        </div>

        {mode === 'signup' && (
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Подтвердите пароль"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={error?.field === 'confirmPassword' ? 'border-red-500' : ''}
            />
            {error?.field === 'confirmPassword' && (
              <p className="text-sm text-red-500">{error.message}</p>
            )}
          </div>
        )}

        {error && !error.field && (
          <p className="text-sm text-red-500">{error.message}</p>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
        >
          {loading ? 'Загрузка...' : mode === 'signin' ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </form>

      <div className="text-center">
        <Button
          variant="link"
          onClick={toggleMode}
          className="text-sm"
          disabled={loading}
        >
          {mode === 'signin' 
            ? 'Нет аккаунта? Зарегистрируйтесь' 
            : 'Уже есть аккаунт? Войдите'}
        </Button>
      </div>
    </div>
  )
} 