import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 space-y-4 text-center">
        <h1 className="text-2xl font-bold">Ошибка аутентификации</h1>
        <p className="text-muted-foreground">
          Произошла ошибка при обработке вашего запроса на аутентификацию.
          Пожалуйста, попробуйте войти снова.
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