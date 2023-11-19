import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Link from 'next/link'
import { Session } from './libs/types'

export default async function Home() {
  const session = await getServerSession(authOptions as any)

  return (
    <>
      {session ? (
        <h1>Welcome {(session as Session)?.user.name}</h1>
      ) : (
        <Link href={'/workouts/new'}>Hello</Link>
      )}
    </>
  )
}
