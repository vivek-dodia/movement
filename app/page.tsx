import UserHome from './components/user-home'
import GuestHome from './components/guest-home'
import { Session } from './libs/types'
import fetchUserWorkouts from './helpers/fetch-user-workouts'
import { getDashboardData } from './helpers/get-dashboard-data'
import { getSession } from './helpers/get-session'

export default async function Home() {
  const session = await getSession()

  if (!session) return <GuestHome />
  const { id, name } = session.user

  const workouts = await fetchUserWorkouts(id)
  const data = await getDashboardData(workouts, id)

  return (
    <UserHome
      name={name}
      data={data}
    />
  )
}
