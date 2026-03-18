'use client'

import { createContext, useContext, useState } from 'react'

type UserAppContextValue = {
  activeApp: string
  setActiveApp: (appId: string) => void
}

const UserAppContext = createContext<UserAppContextValue | null>(null)

export function UserAppProvider({ children }: { children: React.ReactNode }) {
  const [activeApp, setActiveApp] = useState('benefitbox')
  return (
    <UserAppContext.Provider value={{ activeApp, setActiveApp }}>
      {children}
    </UserAppContext.Provider>
  )
}

export function useUserApp() {
  const ctx = useContext(UserAppContext)
  return ctx
}
