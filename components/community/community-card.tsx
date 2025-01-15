import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export interface CommunityCardProps {
  id: number
  title: string
  description: string
  members: number
  imageUrl: string
  href: string
  isPaid: boolean
  isPrivate: boolean
  category: string
}

export function CommunityCard({
  title,
  description,
  members,
  imageUrl,
  href,
  isPaid,
  isPrivate,
  category
}: CommunityCardProps) {
  return (
    <Link href={href} className="block w-full max-w-sm transition-transform hover:scale-105">
      <Card className="overflow-hidden border-none bg-card/60 backdrop-blur">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <span className="text-sm">{members.toLocaleString()} участников</span>
              <div className="flex gap-2">
                {isPaid && (
                  <span className="rounded bg-blue-500 px-2 py-1 text-xs">Платное</span>
                )}
                {isPrivate && (
                  <span className="rounded bg-gray-500 px-2 py-1 text-xs">Закрытое</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-sm text-muted-foreground">{category}</span>
        </CardContent>
      </Card>
    </Link>
  )
}

