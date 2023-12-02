import fetchUserWorkouts from '@/app/helpers/fetch-user-workouts'
import { getUniqueHistory } from '@/app/helpers/filter-history-data'
import { Session, WorkoutInDb } from '@/app/libs/types'
import ExerciseForm from './form'
import ProtectRoute from '@/app/components/protect-route'
import { getSession } from '@/app/helpers/get-session'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exercises',
  description: 'View data for an exercise.',
}

export default async function Exercises() {
  const session = await getSession()

  if (!session)
    return (
      <ProtectRoute message="You must be logged in to view your exercises." />
    )

  const userId = session.user.id

  let workouts = await fetchUserWorkouts(userId)
  const userHistory = getUniqueHistory(workouts)

  workouts = workouts.sort((a: WorkoutInDb, b: WorkoutInDb) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  if (!userHistory || userHistory.exercises.length === 0) {
    return (
      <ProtectRoute
        message="No exercises found"
        workout
      />
    )
  }

  return (
    <section className="flex flex-col justify-center w-full items-center">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
        Your Exercises
      </h2>
      <p className=" text-gray-500 text-center mb-6 w-full max-w-[550px] mt-6">
        Search for an exercise you have logged to view your progress.
      </p>
      <ExerciseForm
        userId={userId}
        workouts={workouts}
        userHistory={userHistory}
      />
    </section>
  )
}
