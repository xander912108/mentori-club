'use client'

import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface MobileMenuProps {
  title?: string
  children: React.ReactNode
}

export function MobileMenu({ title, children }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] bg-background-dark">
        {title && (
          <SheetHeader>
            <SheetTitle className="text-text-light mobile-menu-title">{title}</SheetTitle>
          </SheetHeader>
        )}
        <div className="mt-4 flex flex-col gap-2 mobile-menu-content">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}

