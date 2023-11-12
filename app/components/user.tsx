'use client'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

export default function User() {
  const { data: session } = useSession()

  return (
    <div>
      {JSON.stringify(session)}
      <button onClick={() => signOut()}>Log out</button>
    </div>
  )
}
