'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Settings, LogOut, Globe } from 'lucide-react'

interface User {
  name: string
  email: string
  organization?: string
  role?: string
}

interface ProfilePopupProps {
  user: User
  onLogout: () => void
}

export function ProfilePopup({ user, onLogout }: ProfilePopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [defaultView, setDefaultView] = useState<'dashboard' | 'analytics'>('dashboard')
  const [riskAlerts, setRiskAlerts] = useState(true)
  const [language, setLanguage] = useState<'en' | 'ru' | 'uz'>('en')

  const userInitial = user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase() || 'U'

  const translations = {
    en: {
      settings: 'Settings',
      logout: 'Log out',
      theme: 'Theme',
      defaultDashboard: 'Default Dashboard View',
      notifications: 'Notification Preferences',
      riskAlerts: 'Risk alerts',
      language: 'Language',
      light: 'Light',
      dark: 'Dark',
      dashboard: 'Dashboard',
      analytics: 'Analytics',
      on: 'On',
      off: 'Off',
      back: 'Back',
    },
    ru: {
      settings: 'Настройки',
      logout: 'Выйти',
      theme: 'Тема',
      defaultDashboard: 'Представление по умолчанию',
      notifications: 'Уведомления',
      riskAlerts: 'Оповещения о рисках',
      language: 'Язык',
      light: 'Светлая',
      dark: 'Тёмная',
      dashboard: 'Панель',
      analytics: 'Аналитика',
      on: 'Вкл',
      off: 'Выкл',
      back: 'Назад',
    },
    uz: {
      settings: 'Sozlamalar',
      logout: 'Chiqish',
      theme: 'Tema',
      defaultDashboard: 'Standart ko\'rinish',
      notifications: 'Bildirishnomalar',
      riskAlerts: 'Risk ogohilari',
      language: 'Til',
      light: 'Yorug\'',
      dark: 'Qora',
      dashboard: 'Bosh sahifa',
      analytics: 'Tahlil',
      on: 'Yoq',
      off: 'O\'chiq',
      back: 'Orqaga',
    },
  }

  const t = translations[language]

  const handleLogout = () => {
    setIsOpen(false)
    onLogout()
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="rounded-full hover:ring-2 hover:ring-primary/50 transition-all">
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 rounded-lg shadow-lg" align="end">
        {!showSettings ? (
          <div className="space-y-0">
            {/* User Info Section */}
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{user.name}</p>
                  {user.organization && (
                    <p className="text-xs text-muted-foreground truncate">
                      {user.organization}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">{user.email}</p>
                {user.role && (
                  <Badge variant="secondary" className="w-fit text-xs">
                    {user.role}
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="p-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground hover:bg-primary/5"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                {t.settings}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t.logout}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-0">
            {/* Settings Header */}
            <div className="p-4 border-b border-border/50">
              <button
                onClick={() => setShowSettings(false)}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                ← {t.back}
              </button>
            </div>

            {/* Settings Content */}
            <div className="p-4 space-y-6 max-h-96 overflow-y-auto">
              {/* Theme */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t.theme}</label>
                <div className="flex gap-2">
                  {(['light', 'dark'] as const).map((themeOption) => (
                    <button
                      key={themeOption}
                      onClick={() => setTheme(themeOption)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        theme === themeOption
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {t[themeOption]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Default Dashboard View */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t.defaultDashboard}
                </label>
                <div className="flex gap-2">
                  {(['dashboard', 'analytics'] as const).map((viewOption) => (
                    <button
                      key={viewOption}
                      onClick={() => setDefaultView(viewOption)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        defaultView === viewOption
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {t[viewOption]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk Alerts Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  {t.riskAlerts}
                </label>
                <button
                  onClick={() => setRiskAlerts(!riskAlerts)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    riskAlerts
                      ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {riskAlerts ? t.on : t.off}
                </button>
              </div>

              {/* Language Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {t.language}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['en', 'ru', 'uz'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        language === lang
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
