import DiaryEntry from './workout-entry'
import { WorkoutInDb } from '@/app/libs/types'
import { Fragment, useRef } from 'react'

type WorkoutsListProps = {
  workouts: WorkoutInDb[]
}

export default function WorkoutsList({ workouts }: WorkoutsListProps) {
  const ref = useRef(null)

  const renderedWorkouts = (
    <ul
      className="w-full flex flex-col gap-8"
      ref={ref}
    >
      {workouts.map((workout: WorkoutInDb) => {
        return (
          <Fragment key={workout.id}>
            <DiaryEntry {...workout} />
          </Fragment>
        )
      })}
    </ul>
  )

  return (
    <Fragment>
      {workouts.length !== 0 ? (
        renderedWorkouts
      ) : (
        <p className="rounded-md border flex justify-center items-center h-24 px-4 py-6">
          No workouts match the criteria. Try adjusting your filters.
        </p>
      )}
    </Fragment>
  )
}
