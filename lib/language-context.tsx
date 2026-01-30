'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ru' | 'uz'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    portfolio: 'Portfolio',
    analytics: 'Analytics',
    fields: 'Fields',
    settings: 'Settings',
    logout: 'Log out',
    theme: 'Theme',
    defaultDashboard: 'Default Dashboard View',
    notifications: 'Notification Preferences',
    riskAlerts: 'Risk alerts',
    language: 'Language',
    light: 'Light',
    dark: 'Dark',
    on: 'On',
    off: 'Off',
    back: 'Back',
  },
  ru: {
    dashboard: 'Панель',
    portfolio: 'Портфель',
    analytics: 'Аналитика',
    fields: 'Поля',
    settings: 'Настройки',
    logout: 'Выйти',
    theme: 'Тема',
    defaultDashboard: 'Представление по умолчанию',
    notifications: 'Уведомления',
    riskAlerts: 'Оповещения о рисках',
    language: 'Язык',
    light: 'Светлая',
    dark: 'Тёмная',
    on: 'Вкл',
    off: 'Выкл',
    back: 'Назад',
  },
  uz: {
    dashboard: 'Bosh sahifa',
    portfolio: 'Portfel',
    analytics: 'Tahlil',
    fields: 'Maydonlar',
    settings: 'Sozlamalar',
    logout: 'Chiqish',
    theme: 'Tema',
    defaultDashboard: 'Standart ko\'rinish',
    notifications: 'Bildirishnomalar',
    riskAlerts: 'Risk ogohilari',
    language: 'Til',
    light: 'Yorug\'',
    dark: 'Qora',
    on: 'Yoq',
    off: 'O\'chiq',
    back: 'Orqaga',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Get saved language preference or browser language
    const saved = localStorage.getItem('language') as Language
    if (saved && translations[saved]) {
      setLanguageState(saved)
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Language
      if (translations[browserLang]) {
        setLanguageState(browserLang)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
