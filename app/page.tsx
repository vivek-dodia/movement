import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import UserHome from './components/user-home'
import GuestHome from './components/guest-home'
import { DashboardData, Session } from './libs/types'
import fetchUserWorkouts from './helpers/fetch-user-workouts'
import { getDashboardData } from './helpers/get-dashboard-data'
import { fetchUserWeights } from './helpers/fetch-user-weights'

export default async function Home() {
  const session = (await getServerSession(authOptions as any)) as Session

  if (!session) return <GuestHome />
  const id = session.user.id

  const workouts = await fetchUserWorkouts(id)
  const data = await getDashboardData(workouts, id)

  return (
    <UserHome
      session={session}
      data={data}
    />
  )
}
