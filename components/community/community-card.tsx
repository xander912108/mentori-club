import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Lock, Unlock } from 'lucide-react'
import { useMemo } from 'react'

interface CommunityCardProps {
  title: string
  description: string
  members: number
  imageUrl: string
  href: string
  isPaid: boolean
  isPrivate: boolean
}

export function CommunityCard({ title, description, members, imageUrl, href, isPaid, isPrivate }: CommunityCardProps) {
  const formattedMembers = useMemo(() => members.toLocaleString('ru-RU'), [members])

  return (
    <Link href={href} className="w-full flex justify-center group">
      <Card 
        className="community-card overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl w-full max-w-[260px] sm:max-w-[280px]"
        style={{ 
          backgroundColor: 'rgba(35, 38, 48, 0.6)',
          borderColor: 'rgba(59, 130, 246, 0.2)',
          color: '#E5E5E5'
        }}
      >
        <CardHeader className="p-0 relative">
          <Image
            src={imageUrl}
            alt={title}
            width={280}
            height={160}
            className="w-full h-36 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <h3 className="text-sm sm:text-base font-semibold mb-2 truncate" style={{ color: '#E5E5E5' }}>{title}</h3>
          <p className="text-xs sm:text-sm mb-2 line-clamp-2" style={{ color: 'rgba(229, 229, 229, 0.8)' }}>
            {description}
          </p>
          <div className="flex items-center justify-between text-xs sm:text-sm mt-2" style={{ color: 'rgba(229, 229, 229, 0.6)' }}>
            <div className="flex items-center space-x-2">
              {isPrivate ? (
                <Lock size={12} className="text-yellow-500" />
              ) : (
                <Unlock size={12} className="text-green-500" />
              )}
              <div className="flex items-center">
                <Users size={12} className="mr-1" />
                <span>{formattedMembers}</span>
              </div>
            </div>
            <span className={isPaid ? "text-red-400" : "text-green-400"}>
              {isPaid ? 'Платное' : 'Бесплатное'}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

