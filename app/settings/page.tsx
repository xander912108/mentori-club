'use client'

import { Navbar } from '@/components/navigation/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [securityAlerts, setSecurityAlerts] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-10">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Настройки</h3>
            <p className="text-sm text-muted-foreground">
              Управляйте настройками вашего аккаунта и предпочтениями
            </p>
          </div>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">Общие</TabsTrigger>
              <TabsTrigger value="notifications">Уведомления</TabsTrigger>
              <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Введите ваше имя" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input id="username" placeholder="Введите имя пользователя" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Введите email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">О себе</Label>
                  <textarea
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="bio"
                    placeholder="Расскажите о себе"
                  />
                </div>
                <Button>Сохранить изменения</Button>
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                    <span>Email уведомления</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Получать уведомления на email
                    </span>
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                    <span>Маркетинговые рассылки</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Получать новости и специальные предложения
                    </span>
                  </Label>
                  <Switch
                    id="marketing-emails"
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="security-alerts" className="flex flex-col space-y-1">
                    <span>Оповещения безопасности</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Получать уведомления о подозрительной активности
                    </span>
                  </Label>
                  <Switch
                    id="security-alerts"
                    checked={securityAlerts}
                    onCheckedChange={setSecurityAlerts}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="appearance" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Тема</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start">
                      <svg
                        className=" h-4 w-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="M4.93 4.93l1.41 1.41" />
                        <path d="M17.66 17.66l1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="M6.34 17.66l-1.41 1.41" />
                        <path d="M19.07 4.93l-1.41 1.41" />
                      </svg>
                      Светлая
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <svg
                        className=" h-4 w-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                      Темная
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <svg
                        className=" h-4 w-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 3v18" />
                        <path d="M12 8l4.5 8" />
                        <path d="M12 8l-4.5 8" />
                      </svg>
                      Системная
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Цветовая схема</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start">
                      <span className="h-4 w-4 rounded-full bg-primary mr-2" />
                      По умолчанию
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <span className="h-4 w-4 rounded-full bg-purple-500 mr-2" />
                      Фиолетовая
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <span className="h-4 w-4 rounded-full bg-green-500 mr-2" />
                      Зеленая
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 