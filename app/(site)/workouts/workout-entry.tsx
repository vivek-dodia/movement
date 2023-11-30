import { WorkoutInDb } from '@/app/libs/types'
import Link from 'next/link'
import { MdOutlineLocationOn, MdOutlineModeEdit } from 'react-icons/md'
import { PiBarbellBold } from 'react-icons/pi'

export default function DiaryEntry(workout: WorkoutInDb) {
  return (
    <li className="bg-white border border-gray-200 rounded-lg">
      <div
        className={`bg-blue-500 text-gray-100 rounded-t-md p-2 uppercase text-[0.8rem] tracking-wider`}
      >
        <h5 className="text-center">
          {new Date(workout.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            weekday: 'short',
          })}
        </h5>
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{workout.name}</h3>
        {workout.location && (
          <h5 className="mb-10 text-gray-500 text-sm flex items-center gap-1">
            <MdOutlineLocationOn />
            {workout.location}
          </h5>
        )}

        <ul className="mt-8 flex flex-col gap-7 text-sm sm:text-base mb-6">
          {workout.exercises.map((exercise, index: number) => {
            return (
              <li key={index}>
                <h5 className="mb-2 font-medium">
                  <PiBarbellBold className="inline-block text-blue-600 mr-2 -rotate-45" />
                  {exercise.name}
                </h5>
                <div className="pl-6 text-gray-800 flex flex-col gap-2 text-sm">
                  {exercise.sets.map((set, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          {set.sets && (
                            <span className="mr-1">{set.sets} x</span>
                          )}
                          {set.reps && <span className="mr-1">{set.reps}</span>}
                        </div>
                        <div>
                          {set.weight && <span>{set.weight} lbs</span>}
                          {set.weight && set.rpe && <span> — </span>}
                          {set.rpe && <span>{set.rpe}</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </li>
            )
          })}
        </ul>
        {workout.notes && (
          <div className="border border-gray-200 rounded-md px-6 py-4 text-sm rounded-tr-2xl">
            <p>{workout.notes}</p>
          </div>
        )}
        <Link
          className=" text-gray-500 mt-4 text-xs flex items-center gap-1 hover:underline transition-all"
          href={`/workouts/edit/${workout.id}`}
        >
          <MdOutlineModeEdit className="inline-block" /> Edit
        </Link>
      </div>
    </li>
  )
}
