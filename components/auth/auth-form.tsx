'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/hooks/useAuth'
import { AuthMode } from '@/lib/types/auth'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, X } from 'lucide-react'

interface AuthFormProps {
  onClose?: () => void;
}

const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Минимальная длина пароля - 6 символов'),
})

const registerSchema = loginSchema.extend({
  firstName: z.string().min(2, 'Минимальная длина имени - 2 символа'),
  lastName: z.string().min(2, 'Минимальная длина фамилии - 2 символа'),
})

const resetSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export function AuthForm({ onClose }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { signIn, signUp, resetPassword, isLoading } = useAuth()

  const form = useForm({
    resolver: zodResolver(mode === 'signup' ? registerSchema : mode === 'reset' ? resetSchema : loginSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setErrorMessage(null)
    try {
      if (mode === 'signin') {
        const response = await signIn({ email: data.email, password: data.password })
        if (!response.success) {
          setErrorMessage(response.message || 'Ошибка входа')
        }
      } else if (mode === 'signup') {
        const response = await signUp(data)
        if (!response.success) {
          setErrorMessage(response.message || 'Ошибка регистрации')
        }
      } else if (mode === 'reset') {
        const response = await resetPassword(data.email)
        if (!response.success) {
          setErrorMessage(response.message || 'Ошибка сброса пароля')
        }
      }
    } catch (error) {
      setErrorMessage('Произошла ошибка при обработке запроса')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      )}
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {mode === 'signin' && 'Sign In'}
          {mode === 'signup' && 'Create an Account'}
          {mode === 'reset' && 'Reset Password'}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === 'signin' && 'Enter your email and password to sign in'}
          {mode === 'signup' && 'Enter your details to create an account'}
          {mode === 'reset' && 'Enter your email to reset your password'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            {mode === 'signup' && (
              <>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {mode !== 'reset' && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                <>
                  {mode === 'signin' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'reset' && 'Reset Password'}
                </>
              )}
            </Button>

            <div className="text-center space-y-2">
              {mode === 'signin' && (
                <>
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm"
                    onClick={() => {
                      setMode('reset')
                      form.reset()
                    }}
                  >
                    Forgot password?
                  </Button>
                  <div>
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm"
                      onClick={() => {
                        setMode('signup')
                        form.reset()
                      }}
                    >
                      Don't have an account? Sign up
                    </Button>
                  </div>
                </>
              )}
              
              {(mode === 'signup' || mode === 'reset') && (
                <Button
                  type="button"
                  variant="link"
                  className="text-sm"
                  onClick={() => {
                    setMode('signin')
                    form.reset()
                  }}
                >
                  {mode === 'signup' ? 'Already have an account? Sign in' : 'Back to sign in'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 