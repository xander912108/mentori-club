'use client'

import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { CommunityCard } from '@/components/community/community-card'
import { Input } from '@/components/ui/input'
import { Search, Users } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect, useMemo } from 'react'

const CATEGORIES = [
  "Все", "Бизнес", "Технологии", "Здоровье", "Музыка", "Фото и видео", "Искусство", "Образование", 
  "Кулинария", "Спорт", "Путешествия", "Мода", "Литература", "Кино", "Наука", "Психология",
  "Финансы", "Языки", "Рукоделие", "Садоводство", "Животные", "Экология", "Автомобили", "Космос",
  "История", "Философия", "Политика", "Архитектура", "Танцы", "Театр", "Комиксы", "Настольные игры"
]

const FEATURED_COMMUNITIES = [
  {
    id: 1,
    title: 'Программирование на Python',
    description: 'Изучаем Python вместе с опытными разработчиками',
    members: 15420,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-Python-e4F5D9cr5DtUJHsrEx1Y6H4xppY22d.jpeg',
    href: '/community/1',
    isPaid: false,
    isPrivate: false,
    category: "Технологии"
  },
  {
    id: 2,
    title: 'Дизайн UI/UX',
    description: 'Создаем потрясающие интерфейсы и улучшаем опыт пользователей',
    members: 8930,
    imageUrl: 'https://cdn.pixabay.com/photo/2017/01/29/13/21/mobile-devices-2017980_1280.png',
    href: '/community/2',
    isPaid: true,
    isPrivate: false,
    category: "Технологии"
  },
  {
    id: 3,
    title: 'Искусственный интеллект',
    description: 'Обсуждаем последние достижения в области ИИ и машинного обучения',
    members: 12750,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/artificial-intelligence-6921404_960_720-8jfAIlnEk9FEZrHxdYvRA0KhX50uLt.jpeg',
    href: '/community/3',
    isPaid: false,
    isPrivate: true,
    category: "Технологии"
  },
  {
    id: 4,
    title: 'Веб-разработка',
    description: 'Создаем современные веб-приложения с использованием передовых технологий',
    members: 20100,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/09/08/04/12/programmer-1653351_1280.png',
    href: '/community/4',
    isPaid: true,
    isPrivate: false,
    category: "Технологии"
  },
  {
    id: 5,
    title: 'Мобильная разработка',
    description: 'Разрабатываем приложения для iOS и Android',
    members: 9800,
    imageUrl: 'https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_1280.png',
    href: '/community/5',
    isPaid: false,
    isPrivate: false,
    category: "Технологии"
  },
  {
    id: 6,
    title: 'Стартап-инкубатор',
    description: 'Развиваем идеи в успешные бизнес-проекты',
    members: 5600,
    imageUrl: 'https://cdn.pixabay.com/photo/2015/01/09/11/08/startup-594090_1280.jpg',
    href: '/community/6',
    isPaid: true,
    isPrivate: true,
    category: "Бизнес"
  },
  {
    id: 7,
    title: 'Йога и медитация',
    description: 'Практикуем йогу и медитацию для здоровья тела и души',
    members: 7200,
    imageUrl: 'https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_1280.jpg',
    href: '/community/7',
    isPaid: false,
    isPrivate: false,
    category: "Здоровье"
  },
  {
    id: 8,
    title: 'Электронная музыка',
    description: 'Создаем и обсуждаем электронную музыку',
    members: 6300,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg',
    href: '/community/8',
    isPaid: false,
    isPrivate: false,
    category: "Музыка"
  },
  {
    id: 9,
    title: 'Фотография для начинающих',
    description: 'Учимся основам фотографии и обрабатываем снимки',
    members: 8100,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731_1280.jpg',
    href: '/community/9',
    isPaid: false,
    isPrivate: false,
    category: "Фото и видео"
  },
  {
    id: 10,
    title: 'Блокчейн и криптовалюты',
    description: 'Изучаем технологию блокчейн и мир криптовалют',
    members: 11200,
    imageUrl: 'https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728_1280.jpg',
    href: '/community/10',
    isPaid: true,
    isPrivate: false,
    category: "Технологии"
  },
  {
    id: 11,
    title: 'Кулинарные мастер-классы',
    description: 'Готовим изысканные блюда вместе с профессиональными шеф-поварами',
    members: 9500,
    imageUrl: 'https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg',
    href: '/community/11',
    isPaid: true,
    isPrivate: false,
    category: "Кулинария"
  },
  {
    id: 12,
    title: 'Фитнес и бодибилдинг',
    description: 'Тренируемся вместе и делимся советами по набору мышечной массы',
    members: 13700,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D1%84%D0%B8%D1%82%D0%BD%D0%B5%D1%81-%D0%B8-%D0%B1%D0%BE%D0%B4%D0%B8%D0%B1%D0%B8%D0%BB%D0%B4%D0%B8%D0%BD%D0%B3-LAAHkS99mihGOAc1MljW3kEEZW1y6V.jpeg',
    href: '/community/12',
    isPaid: false,
    isPrivate: false,
    category: "Спорт"
  },
  {
    id: 13,
    title: 'Путешествия по миру',
    description: 'Обмениваемся опытом и планируем незабываемые приключения',
    members: 18200,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/01/09/18/27/journey-1130732_1280.jpg',
    href: '/community/13',
    isPaid: false,
    isPrivate: false,
    category: "Путешествия"
  },
  {
    id: 14,
    title: 'Мода и стиль',
    description: 'Обсуждаем последние тренды и создаем уникальные образы',
    members: 10800,
    imageUrl: 'https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg',
    href: '/community/14',
    isPaid: false,
    isPrivate: false,
    category: "Мода"
  },
  {
    id: 15,
    title: 'Книжный клуб',
    description: 'Читаем и обсуждаем классическую и современную литературу',
    members: 7600,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/03/26/22/21/books-1281581_1280.jpg',
    href: '/community/15',
    isPaid: false,
    isPrivate: true,
    category: "Литература"
  },
  {
    id: 16,
    title: 'Киноманы',
    description: 'Смотрим и анализируем фильмы всех жанров и эпох',
    members: 14300,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450_1280.jpg',
    href: '/community/16',
    isPaid: false,
    isPrivate: false,
    category: "Кино"
  },
  {
    id: 17,
    title: 'Астрономия для любителей',
    description: 'Изучаем звезды и планеты, обсуждаем последние открытия',
    members: 6100,
    imageUrl: 'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg',
    href: '/community/17',
    isPaid: false,
    isPrivate: false,
    category: "Наука"
  },
  {
    id: 18,
    title: 'Психология отношений',
    description: 'Разбираемся в сложностях межличностных отношений',
    members: 9200,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BF%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F-%D0%BE%D1%82%D0%BD%D0%BE%D1%88%D0%B5%D0%BD%D0%B8%D0%B8%CC%86-gBC1gJx3j6Tw8ynnLIoeFIbZgQXFZj.jpeg',
    href: '/community/18',
    isPaid: true,
    isPrivate: true,
    category: "Психология"
  },
  {
    id: 19,
    title: 'Личные финансы',
    description: 'Учимся управлять деньгами и инвестировать',
    members: 12500,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/10/09/19/19/coins-1726618_1280.jpg',
    href: '/community/19',
    isPaid: true,
    isPrivate: false,
    category: "Финансы"
  },
  {
    id: 20,
    title: 'Изучение английского языка',
    description: 'Практикуем английский в дружественной атмосфере',
    members: 16800,
    imageUrl: 'https://cdn.pixabay.com/photo/2018/07/01/20/01/book-3510326_1280.jpg',
    href: '/community/20',
    isPaid: false,
    isPrivate: false,
    category: "Языки"
  },
  {
    id: 21,
    title: 'Вязание и рукоделие',
    description: 'Делимся идеями и учимся новым техникам вязания',
    members: 5800,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%92%D1%8F%D0%B7%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B8-%D1%80%D1%83%D0%BA%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D0%B5-bJZZJfJ0THsa7AHSodht9BEwag5eqF.jpeg',
    href: '/community/21',
    isPaid: false,
    isPrivate: false,
    category: "Рукоделие"
  },
  {
    id: 22,
    title: 'Органическое садоводство',
    description: 'Выращиваем экологически чистые овощи и фрукты',
    members: 7300,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BE%D1%80%D0%B3%D0%B0%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5-%D1%81%D0%B0%D0%B4%D0%BE%D0%B2%D0%BE%D0%B4%D1%81%D1%82%D0%B2%D0%BE-QSItXlJtRtKKAkYooH6ZjHfgbNvCuW.jpeg',
    href: '/community/22',
    isPaid: false,
    isPrivate: false,
    category: "Садоводство"
  },
  {
    id: 23,
    title: 'Любители кошек',
    description: 'Обсуждаем уход за кошками и делимся фотографиями питомцев',
    members: 11600,
    imageUrl: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg',
    href: '/community/23',
    isPaid: false,
    isPrivate: false,
    category: "Животные"
  },
  {
    id: 24,
    title: 'Экологический активизм',
    description: 'Организуем акции по защите окружающей среды',
    members: 8700,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D1%8D%D0%BA%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B8%CC%86-%D0%B0%D0%BA%D1%82%D0%B8%D0%B2%D0%B8%D0%B7%D0%BC-Y0G88cdL8Um9Hph2s8EIGzTkhW0HIH.jpeg',
    href: '/community/24',
    isPaid: false,
    isPrivate: false,
    category: "Экология"
  },
  {
    id: 25,
    title: 'Клуб автолюбителей',
    description: 'Обсуждаем новинки автопрома и делимся опытом обслуживания',
    members: 14700,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/22/23/44/porsche-1851246_1280.jpg',
    href: '/community/25',
    isPaid: false,
    isPrivate: false,
    category: "Автомобили"
  },
  {
    id: 26,
    title: 'Космические технологии',
    description: 'Обсуждаем последние достижения в космической отрасли',
    members: 9100,
    imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/39/venus-11022_1280.jpg',
    href: '/community/26',
    isPaid: true,
    isPrivate: false,
    category: "Космос"
  },
  {
    id: 27,
    title: 'Исторические реконструкции',
    description: 'Воссоздаем исторические события и костюмы',
    members: 5400,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5-%D1%80%D0%B5%D0%BA%D0%BE%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D0%B8%D0%B8-VinOLz8dDJAiCDn6ndw6wK0jU3e9c7.jpeg',
    href: '/community/27',
    isPaid: false,
    isPrivate: false,
    category: "История"
  },
  {
    id: 28,
    title: 'Философский клуб',
    description: 'Обсуждаем глубокие вопросы бытия и смысла жизни',
    members: 6800,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D1%84%D0%B8%D0%BB%D0%BE%D1%81%D0%BE%D1%84%D1%81%D0%BA%D0%B8%D0%B8%CC%86-%D0%BA%D0%BB%D1%83%D0%B1-2IUNJrxBo4hOHJ82ld67V2yPScsmFb.jpeg',
    href: '/community/28',
    isPaid: false,
    isPrivate: true,
    category: "Философия"
  },
  {
    id: 29,
    title: 'Политические дебаты',
    description: 'Анализируем текущие политические события и тенденции',
    members: 10200,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BF%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5-%D0%B4%D0%B5%D0%B1%D0%B0%D1%82%D1%8B-F1uoVYnhc2ArcDSQoiCZQ7He0xMtnc.jpeg',
    href: '/community/29',
    isPaid: false,
    isPrivate: false,
    category: "Политика"
  },
  {
    id: 30,
    title: 'Современная архитектура',
    description: 'Изучаем инновационные архитектурные решения',
    members: 7900,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D1%81%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F-%D0%B0%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0-SnDRQVTJgbOFNd3n7bwoy70oGNsGM5.jpeg',
    href: '/community/30',
    isPaid: true,
    isPrivate: false,
    category: "Архитектура"
  }
]

function useScreenSize() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return isSmallScreen
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Все")
  const isSmallScreen = useScreenSize()

  const filteredCommunities = useMemo(() => {
    return FEATURED_COMMUNITIES.filter(community => 
      selectedCategory === "Все" || community.category === selectedCategory
    )
  }, [selectedCategory])

  return (
    <div className="min-h-screen gradient-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
            Открой для себя<br />сообщество
        </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-12" style={{ color: 'rgba(229, 229, 229, 0.7)' }}>
            Найди свое место в мире технологий и образования
          </p>
          <Link 
            href="/create"
            className="text-lg sm:text-xl md:text-2xl inline-flex items-center space-x-3 transition-colors hover:text-accent-blue"
            style={{ color: '#3B82F6' }}
          >
            <Users size={28} />
            <span>Создать сообщество</span>
          </Link>
          
          <div className="max-w-2xl mx-auto mt-16 sm:mt-20 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-blue" size={24} />
          <Input 
            type="search"
              placeholder="Найти сообщество"
              className="w-full pl-14 pr-4 py-4 text-lg sm:text-xl rounded-full"
              style={{
                backgroundColor: 'rgba(35, 38, 48, 0.8)',
                borderColor: 'rgba(59, 130, 246, 0.4)',
                color: '#E5E5E5'
              }}
          />
        </div>
        </section>

        <section className="mb-16">
          <Tabs defaultValue="Все" className="w-full">
            <div className="categories-container mb-8 w-full max-w-[calc(260px*3+2rem)] overflow-x-auto">
              <TabsList className="categories-list w-full flex space-x-2 pb-2">
                {CATEGORIES.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category} 
                    className="category-tab text-base whitespace-nowrap"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </TabsTrigger>
                ))}
          </TabsList>
            </div>
          
            <TabsContent value={selectedCategory} className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {filteredCommunities.map((community) => (
              <CommunityCard
                    key={community.id}
                    {...community}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

