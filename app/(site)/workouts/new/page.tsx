import NewWorkoutForm from './form'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function NewWorkout() {
  const session = await getServerSession(authOptions as any)

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center py-12 lg:px-8">
      <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight ">
        New Workout
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <NewWorkoutForm session={session} />
      </div>
    </section>
  )
}
