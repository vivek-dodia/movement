import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions as any)

  return (
    <>
      {session ? (
        <h1>Welcome {(session as any)?.user.name}</h1>
      ) : (
        <h1>Hello</h1>
      )}
    </>
  )
}
