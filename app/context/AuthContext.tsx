'use client'

import { SessionProvider } from 'next-auth/react'

type AuthContextProps = {
  children: React.ReactNode
}

export default function Provider({ children }: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>
}
