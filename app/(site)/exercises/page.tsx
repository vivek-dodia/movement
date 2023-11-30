import fetchUserWorkouts from '@/app/helpers/fetch-user-workouts'
import { getUniqueHistory } from '@/app/helpers/filter-history-data'
import { Session, WorkoutInDb } from '@/app/libs/types'
import ExerciseForm from './form'
import ProtectRoute from '@/app/components/protect-route'
import { getSession } from '@/app/helpers/get-session'

export default async function Exercises() {
  const session = await getSession()

  if (!session)
    return (
      <ProtectRoute message="You must be logged in to view your exercises." />
    )

  const userId = (session as Session)?.user?.id

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
      <h5 className="text-center text-lg leading-9 tracking-tight mb-8">
        Search for an exercise. See your results.
      </h5>
      <ExerciseForm
        userId={userId}
        workouts={workouts}
        userHistory={userHistory}
      />
    </section>
  )
}
