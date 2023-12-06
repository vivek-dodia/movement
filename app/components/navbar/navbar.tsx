import { NavContextProvider } from '../../context/NavContext'
import NavContent from './navbar-content'
import { getSession } from '../../helpers/get-session'

export default async function Navbar() {
  const session = await getSession()

  return (
    <NavContextProvider>
      <NavContent session={session} />
    </NavContextProvider>
  )
}
