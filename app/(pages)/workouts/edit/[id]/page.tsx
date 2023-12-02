import WorkoutForm from '@/app/components/workout-form/workout-form'
import fetchWorkout from '@/app/helpers/fetch-workout'
import ProtectRoute from '@/app/components/protect-route'
import { getSession } from '@/app/helpers/get-session'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Workout',
  description: 'Edit your workout.',
}

export default async function EditWorkout({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()

  if (!session) {
    return <ProtectRoute message="You must be logged in to edit a workout." />
  }

  const { id } = params

  const workout = await fetchWorkout(id)

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
      <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight ">
        Edit Workout
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <WorkoutForm
          session={session}
          workout={workout}
        />
      </div>
    </section>
  )
}
