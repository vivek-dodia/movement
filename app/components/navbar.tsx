import { NavContextProvider } from '../context/NavContext'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import NavContent from './navContent'

export default async function Navbar() {
  const session = await getServerSession(authOptions as any)

  return (
    <NavContextProvider>
      <NavContent session={session} />
    </NavContextProvider>
  )
}
