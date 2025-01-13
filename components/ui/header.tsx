'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(15, 20, 30, 0.8)', borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}
    >
      <div className="container mx-auto px-4 h-28 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-IIwBb2GjTpeqzTtaapNpaTR73MeKAj.png"
            alt="Mentori.Club"
            width={260}
            height={87}
            className="h-16 w-auto"
          />
        </Link>
        <div className="flex items-center space-x-4 -ml-3">
          <Link 
            href="/login"
            className="text-sm font-medium transition-colors header-button px-3 py-2 rounded hover:bg-black/10"
            style={{ color: 'rgba(229, 229, 229, 0.8)' }}
          >
            Войти
          </Link>
          <Button 
            className="transition-all header-button text-sm px-4 py-1 mr-3 hover:brightness-90"
            style={{ backgroundColor: '#3B82F6', color: '#E5E5E5' }}
          >
            Регистрация
          </Button>
        </div>
      </div>
    </header>
  )
}

