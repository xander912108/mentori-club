'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { AuthForm } from '@/components/auth/auth-form'

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm"
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
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setShowAuthModal(true)}
              className="text-sm font-medium transition-colors header-button px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Войти
            </Button>
          </div>
        </div>
      </header>

      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90"
            onClick={() => setShowAuthModal(false)}
          />
          <div className="relative z-50 w-full max-w-md">
            <AuthForm onClose={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}
    </>
  )
}

