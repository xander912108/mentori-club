'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">Проверьте вашу почту</h1>
        <p className="text-muted-foreground">
          Мы отправили вам письмо с ссылкой для подтверждения регистрации.
          Пожалуйста, проверьте вашу почту и перейдите по ссылке для завершения регистрации.
        </p>
        <Button asChild>
          <Link href="/auth">
            Вернуться на страницу входа
          </Link>
        </Button>
      </div>
    </div>
  )
} 