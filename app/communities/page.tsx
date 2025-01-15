'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navigation/navbar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useEffect } from 'react'
import Link from 'next/link'

interface Community {
  id: string
  name: string
  description: string
  cover_url?: string
  member_count: number
  category: string
  created_at: string
}

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  
  const supabase = createClient()

  useEffect(() => {
    fetchCommunities()
    fetchCategories()
  }, [])

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('communities')
      .select('category')
      .not('category', 'is', null)
    
    if (error) {
      console.error('Error fetching categories:', error)
      return
    }

    const uniqueCategories = Array.from(new Set(data.map(item => item.category)))
    setCategories(uniqueCategories)
  }

  async function fetchCommunities() {
    setLoading(true)
    let query = supabase
      .from('communities')
      .select('*')
      .order('created_at', { ascending: false })

    if (searchQuery) {
      query = query.ilike('name', `%${searchQuery}%`)
    }

    if (selectedCategory) {
      query = query.eq('category', selectedCategory)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching communities:', error)
      return
    }

    setCommunities(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchCommunities()
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex-1 w-full md:max-w-md">
            <Input
              type="search"
              placeholder="Поиск сообществ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
            >
              Все
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка сообществ...</p>
          </div>
        ) : communities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <Link
                key={community.id}
                href={`/communities/${community.id}`}
                className="block group"
              >
                <div className="bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {community.cover_url && (
                    <div className="aspect-video w-full bg-muted">
                      <img
                        src={community.cover_url}
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {community.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {community.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {community.member_count || 0} участников
                      </span>
                      <span className="text-sm font-medium text-primary">
                        Подробнее →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery
                ? 'Сообщества не найдены. Попробуйте изменить параметры поиска.'
                : 'Сообщества пока не созданы.'}
            </p>
          </div>
        )}
      </main>
    </div>
  )
} 