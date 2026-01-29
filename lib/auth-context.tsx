'use client'

import React, { createContext, useContext, useState } from 'react'

interface User {
  id: string
  email: string
  name?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  showAuthModal: boolean
  setShowAuthModal: (show: boolean) => void
  authMode: 'signin' | 'signup'
  setAuthMode: (mode: 'signin' | 'signup') => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  const login = async (email: string, password: string) => {
    // Simulate login - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500))
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
    })
    setShowAuthModal(false)
  }

  const signup = async (email: string, password: string, name: string) => {
    // Simulate signup - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500))
    setUser({
      id: '1',
      email,
      name: name || email.split('@')[0],
    })
    setShowAuthModal(false)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        showAuthModal,
        setShowAuthModal,
        authMode,
        setAuthMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
