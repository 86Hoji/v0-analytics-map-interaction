'use client'

import { AuthProvider, useAuth } from '@/lib/auth-context'
import { LanguageProvider } from '@/lib/language-context'
import { AuthModal } from '@/components/auth-modal'
import { LandingPage } from '@/components/landing-page'
import { Dashboard } from '@/components/dashboard'
import { useState } from 'react'

function PageContent() {
  const { isAuthenticated } = useAuth()
  const [showDashboard, setShowDashboard] = useState(false)

  const handleNavigateToDashboard = () => {
    setShowDashboard(true)
  }

  const handleReturnToLanding = () => {
    setShowDashboard(false)
  }

  return (
    <>
      {isAuthenticated && showDashboard ? (
        <Dashboard onNavigateToLanding={handleReturnToLanding} />
      ) : (
        <LandingPage onNavigateToDashboard={handleNavigateToDashboard} />
      )}
      <AuthModal />
    </>
  )
}

export default function Page() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <PageContent />
      </LanguageProvider>
    </AuthProvider>
  )
}
