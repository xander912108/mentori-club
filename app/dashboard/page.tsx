import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const handleSignOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect('/auth')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Панель управления</h1>
          <form action={handleSignOut}>
            <Button variant="outline">Выйти</Button>
          </form>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Добро пожаловать!</h2>
          <p className="text-muted-foreground">
            Вы вошли как: {user?.email}
          </p>
        </div>
      </div>
    </div>
  )
} 