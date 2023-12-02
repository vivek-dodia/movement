import { getSession } from '@/app/helpers/get-session'
import ProtectRoute from '@/app/components/protect-route'
import fetchUserWorkouts from '@/app/helpers/fetch-user-workouts'
import { getDashboardData } from '@/app/helpers/get-dashboard-data'
import Dashboard from './dashboard'

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    return (
      <ProtectRoute message="You must be logged in to access your dashboard." />
    )
  }

  const { id, name } = session.user

  const workouts = await fetchUserWorkouts(id)
  const data = await getDashboardData(workouts, id)

  return (
    <Dashboard
      name={name}
      data={data}
    />
  )
}
