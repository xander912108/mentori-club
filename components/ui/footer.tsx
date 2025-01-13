'use client'

import Link from 'next/link'
import { NAVIGATION_LINKS } from '@/lib/constants'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Footer() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <footer style={{ 
      backgroundColor: 'rgba(15, 20, 30, 0.8)',
      borderTop: '1px solid rgba(59, 130, 246, 0.2)'
    }}>
      <div className="container mx-auto px-4 py-12">
        {isSmallScreen ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full text-left px-4 py-2 rounded bg-background-dark text-text-light flex items-center justify-between">
              <span>Меню</span>
              <Menu className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full bg-background-dark border-none">
              {NAVIGATION_LINKS.map((link) => (
                <DropdownMenuItem key={link.href} className="p-0">
                  <Link
                    href={link.href}
                    className="w-full px-4 py-2 block text-text-light hover:bg-black/20 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-link transition-colors hover:bg-background-light px-3 py-2 rounded"
                style={{ color: 'rgba(229, 229, 229, 0.7)' }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
        <div className="mt-8 text-center text-sm" style={{ color: 'rgba(229, 229, 229, 0.5)' }}>
          © 2025 Mentori.Club. Все права защищены.
        </div>
      </div>
    </footer>
  )
}

