'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Mentori Club
            </Link>
            <div className="hidden md:block ml-10 space-x-8">
              <Link 
                href="/communities" 
                className={`${pathname === '/communities' ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors`}
              >
                Сообщества
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
            ) : user ? (
              <Link href="/dashboard">
                <Button variant="outline">
                  Профиль
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth?mode=signin">
                  <Button variant="ghost">
                    Войти
                  </Button>
                </Link>
                <Link href="/auth?mode=signup">
                  <Button>
                    Регистрация
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 