'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/lib/supabase/client'

type AuthMode = 'signin' | 'signup'

interface AuthFormData {
  email: string
  password: string
  confirmPassword?: string
}

interface AuthError {
  field: 'email' | 'password' | 'confirmPassword' | null
  message: string
}

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<AuthMode>(
    searchParams?.get('mode') === 'signup' ? 'signup' : 'signin'
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const supabase = createClient()

  const handleModeChange = (value: string) => {
    const newMode = value as AuthMode
    setMode(newMode)
    router.push(`/auth?mode=${newMode}`)
  }

  useEffect(() => {
    const mode = searchParams?.get('mode')
    if (mode === 'signup' || mode === 'signin') {
      setMode(mode)
    }
  }, [searchParams])

  const validateForm = () => {
    if (!formData.email) {
      setError({ field: 'email', message: 'Email обязателен' })
      return false
    }
    if (!formData.password) {
      setError({ field: 'password', message: 'Пароль обязателен' })
      return false
    }
    if (mode === 'signup') {
      if (formData.password.length < 6) {
        setError({ field: 'password', message: 'Пароль должен быть не менее 6 символов' })
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setError({ field: 'confirmPassword', message: 'Пароли не совпадают' })
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
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        })
        if (error) throw error
        router.push('/auth/verify-email')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
        if (error) throw error
        router.push('/')
      }
    } catch (err: any) {
      setError({
        field: null,
        message: err.message || 'Произошла ошибка при аутентификации',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <Tabs value={mode} onValueChange={handleModeChange}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="signin">Вход</TabsTrigger>
            <TabsTrigger value="signup">Регистрация</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleInputChange}
                className={error?.field === 'email' ? 'border-red-500' : ''}
              />
              {error?.field === 'email' && (
                <p className="text-sm text-red-500">{error.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className={error?.field === 'password' ? 'border-red-500' : ''}
              />
              {error?.field === 'password' && (
                <p className="text-sm text-red-500">{error.message}</p>
              )}
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={error?.field === 'confirmPassword' ? 'border-red-500' : ''}
                />
                {error?.field === 'confirmPassword' && (
                  <p className="text-sm text-red-500">{error.message}</p>
                )}
              </div>
            )}

            {error?.field === null && (
              <p className="text-sm text-red-500">{error.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Загрузка...' : mode === 'signin' ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>
        </Tabs>
      </div>
    </div>
  )
} 