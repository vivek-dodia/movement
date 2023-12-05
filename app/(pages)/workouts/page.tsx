import fetchUserWorkouts from '@/app/helpers/fetch-user-workouts'
import { getUniqueHistory } from '@/app/helpers/filter-history-data'
import Workouts from './workouts'
import ProtectRoute from '@/app/components/protect-route'
import { getSession } from '@/app/helpers/get-session'
import Link from 'next/link'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workouts',
  description: 'View all your workouts.',
}

export default async function Diary() {
  const session = await getSession()

  if (!session) {
    return (
      <ProtectRoute message="You must be logged in to access your workouts." />
    )
  }

  const id = session.user.id
  const workouts = await fetchUserWorkouts(id)

  if (!workouts || workouts.length === 0) {
    return (
      <ProtectRoute
        message="No Workouts found"
        workout
      />
    )
  }

  return (
    <section className="flex flex-1 flex-col justify-center items-center">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
        Your Workouts
      </h2>
      <p className=" text-gray-500 text-center mb-6 w-full max-w-[550px] mt-6">
        Filter through your workouts, or{' '}
        <Link
          href="/workouts/new"
          className=" underline"
        >
          create a new one
        </Link>
        .
      </p>
      <section className="w-full max-w-[550px] flex flex-col items-center justify-center">
        <Workouts
          workoutsData={workouts}
          userHistory={getUniqueHistory(workouts)}
        />
      </section>
    </section>
  )
}
