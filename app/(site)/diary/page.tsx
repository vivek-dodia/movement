import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Session, WorkoutInDb } from '@/app/libs/types'
import fetchUserWorkouts from '@/app/helpers/fetch-user-workouts'
import DiaryEntry from './diary-entry'
import React from 'react'
import WorkoutsList from './workouts-list'

export default async function Diary() {
  const session = await getServerSession(authOptions as any)
  const id = (session as Session)?.user.id

  const workouts = (await fetchUserWorkouts(id)) as Array<WorkoutInDb>

  return (
    <section className="flex flex-1 flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-10">Your workouts</h2>
      <WorkoutsList workoutsData={workouts} />
    </section>
  )
}

{
  /* <span>
{new Date(workout.date).toLocaleDateString('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})}
</span> */
}
