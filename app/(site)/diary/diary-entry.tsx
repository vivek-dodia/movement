'use client'

import { WorkoutInDb } from '@/app/libs/types'
import {
  MdOutlineCalendarMonth,
  MdOutlineLocationOn,
  MdOutlineSaveAlt,
  MdOutlineStickyNote2,
} from 'react-icons/md'
import { PiBarbellBold } from 'react-icons/pi'

export default function DiaryEntry(workout: WorkoutInDb) {
  return (
    <li className="bg-gray-100 px-5 py-6">
      <h3 className="font-medium text-lg">{workout.name}</h3>
      {workout.location && (
        <span className="text-sm">
          <MdOutlineLocationOn className="inline-block mr-1" />
          {workout.location}
        </span>
      )}
      <ul className="mt-8 flex flex-col gap-7 text-sm sm:text-base">
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
                        {set.sets && <span className="mr-1">{set.sets} x</span>}
                        {set.reps && <span className="mr-1">{set.reps}</span>}
                      </div>
                      <div>
                        {set.weight && (
                          <span className="font-medium">{set.weight} lbs</span>
                        )}
                        {set.weight && set.rpe && <span> / </span>}
                        {set.rpe && <span>RPE {set.rpe}</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </li>
          )
        })}
      </ul>
    </li>
  )
}
