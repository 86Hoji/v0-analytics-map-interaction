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
    riskAlerts: 'Risk alerts',
    language: 'Language',
    on: 'On',
    off: 'Off',
    back: 'Back',
    profileInformation: 'Profile Information',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    changePassword: 'Change Password',
    overallRiskScore: 'Overall Risk Score',
    moderate: 'Moderate',
    portfolioContains: 'Portfolio contains',
    assets: 'assets',
    assetsAtHighRisk: 'Assets at High Risk',
    totalAssets: 'Total Assets',
    portfolioValue: 'Portfolio Value',
    lastUpdate: 'Last Update',
    locationAssetDetails: 'Location & Asset Details',
    enterCoordinates: 'Enter coordinates and select crop parameters',
    step: 'Step',
    latitude: 'Latitude',
    longitude: 'Longitude',
    cropType: 'Crop Type',
    season: 'Season',
    analyze: 'Analyze',
    analyzing: 'Analyzing...',
    analysisResults: 'Analysis Results',
    viewResults: 'View Results',
    assetPortfolio: 'Asset Portfolio',
    importAssetsFromCSV: 'Import Assets from CSV',
    selectLocation: 'Select Location from Map',
    chooseCountry: 'Choose a country, region, and optional subregion',
    openInteractiveMap: 'Open Interactive Map to Select Location',
    closeMap: 'Close Map',
    selected: 'Selected',
    oldPassword: 'Old Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    updatePassword: 'Update Password',
  },
  ru: {
    dashboard: 'Панель',
    portfolio: 'Портфель',
    analytics: 'Аналитика',
    fields: 'Поля',
    settings: 'Настройки',
    logout: 'Выйти',
    riskAlerts: 'Оповещения о рисках',
    language: 'Язык',
    on: 'Вкл',
    off: 'Выкл',
    back: 'Назад',
    profileInformation: 'Информация профиля',
    name: 'Имя',
    email: 'Электронная почта',
    password: 'Пароль',
    changePassword: 'Изменить пароль',
    overallRiskScore: 'Общий балл риска',
    moderate: 'Умеренный',
    portfolioContains: 'Портфель содержит',
    assets: 'активов',
    assetsAtHighRisk: 'Активы с высоким риском',
    totalAssets: 'Всего активов',
    portfolioValue: 'Стоимость портфеля',
    lastUpdate: 'Последнее обновление',
    locationAssetDetails: 'Информация о местоположении и активе',
    enterCoordinates: 'Введите координаты и выберите параметры культуры',
    step: 'Шаг',
    latitude: 'Широта',
    longitude: 'Долгота',
    cropType: 'Тип культуры',
    season: 'Сезон',
    analyze: 'Анализировать',
    analyzing: 'Анализирование...',
    analysisResults: 'Результаты анализа',
    viewResults: 'Просмотр результатов',
    assetPortfolio: 'Портфель активов',
    importAssetsFromCSV: 'Импортировать активы из CSV',
    selectLocation: 'Выберите местоположение из карты',
    chooseCountry: 'Выберите страну, регион и опциональный подрегион',
    openInteractiveMap: 'Откройте интерактивную карту для выбора местоположения',
    closeMap: 'Закрыть карту',
    selected: 'Выбрано',
    oldPassword: 'Старый пароль',
    newPassword: 'Новый пароль',
    confirmPassword: 'Подтвердите пароль',
    updatePassword: 'Обновить пароль',
  },
  uz: {
    dashboard: 'Bosh sahifa',
    portfolio: 'Portfel',
    analytics: 'Tahlil',
    fields: 'Maydonlar',
    settings: 'Sozlamalar',
    logout: 'Chiqish',
    riskAlerts: 'Risk ogohilari',
    language: 'Til',
    on: 'Yoq',
    off: 'O\'chiq',
    back: 'Orqaga',
    profileInformation: 'Profil ma\'lumotlari',
    name: 'Ism',
    email: 'Email',
    password: 'Parol',
    changePassword: 'Parolni o\'zgartirish',
    overallRiskScore: 'Umumiy risk ballı',
    moderate: 'O\'rtacha',
    portfolioContains: 'Portfel o\'z ichiga oladi',
    assets: 'aktivlar',
    assetsAtHighRisk: 'Yuqori riskdagi aktivlar',
    totalAssets: 'Jami aktivlar',
    portfolioValue: 'Portfel qiymati',
    lastUpdate: 'Oxirgi yangilanish',
    locationAssetDetails: 'Joylashuv va aktiv ma\'lumotlar',
    enterCoordinates: 'Koordinatalarni kiriting va ekin parametrlarini tanlang',
    step: 'Bosqich',
    latitude: 'Kenglik',
    longitude: 'Uzunlik',
    cropType: 'Ekin turi',
    season: 'Fasl',
    analyze: 'Tahlil qilish',
    analyzing: 'Tahlil qilinmoqda...',
    analysisResults: 'Tahlil natijalari',
    viewResults: 'Natijalarni ko\'rish',
    assetPortfolio: 'Aktiv portfeli',
    importAssetsFromCSV: 'CSV dan aktivlarni import qilish',
    selectLocation: 'Xaritadan joylashuvni tanlang',
    chooseCountry: 'Mamlakatni, mintaqani va ixtiyoriy subregionni tanlang',
    openInteractiveMap: 'Joylashuvni tanlash uchun interaktiv xaritani oching',
    closeMap: 'Xaritani yoping',
    selected: 'Tanlangan',
    oldPassword: 'Eski parol',
    newPassword: 'Yangi parol',
    confirmPassword: 'Parolni tasdiqlang',
    updatePassword: 'Parolni yangilash',
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
