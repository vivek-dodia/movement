import { redirect } from 'next/navigation'
import { getSession } from './helpers/get-session'

export default async function Home() {
  const session = await getSession()

  if (session) redirect('/dashboard') // user home
  else return <div>guest home</div>
}
