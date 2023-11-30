import WorkoutForm from '@/app/components/workout-form/workout-form'
import ProtectRoute from '@/app/components/protect-route'
import { getSession } from '@/app/helpers/get-session'

export default async function NewWorkout() {
  const session = await getSession()

  if (!session) {
    return (
      <ProtectRoute message="You must be logged in to create a new workout." />
    )
  }

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center  lg:px-8">
      <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight ">
        New Workout
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <WorkoutForm session={session} />
      </div>
    </section>
  )
}
