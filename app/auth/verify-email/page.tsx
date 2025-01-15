'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Проверьте вашу почту</h2>
          <p className="mt-2 text-sm text-gray-600">
            Мы отправили вам письмо с ссылкой для подтверждения email.
            Пожалуйста, проверьте вашу почту и перейдите по ссылке для завершения регистрации.
          </p>
        </div>
      </div>
    </div>
  )
} 