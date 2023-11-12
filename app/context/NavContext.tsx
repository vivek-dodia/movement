'use client'

import { createContext, useContext } from 'react'
import { useState } from 'react'

type isNavExpanded = false | true // valid values for isNavExpanded

type NavContextProps = {
  children: React.ReactNode
}

type NavContextValue = {
  isNavExpanded: isNavExpanded
  setIsNavExpanded: React.Dispatch<React.SetStateAction<isNavExpanded>>
} // valid values for NavContext

export const NavContext = createContext<NavContextValue | null>(null)

export function NavContextProvider({ children }: NavContextProps) {
  const [isNavExpanded, setIsNavExpanded] = useState<isNavExpanded>(false)

  return (
    <NavContext.Provider value={{ isNavExpanded, setIsNavExpanded }}>
      {children}
    </NavContext.Provider>
  )
}

// make sure context is not null before use
export function useNavContext() {
  const context = useContext(NavContext)
  if (context === null) {
    throw new Error('useNavContext must be used within a NavContextProvider')
  }
  return context
}
