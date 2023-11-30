'use client'
import { Fragment, useState } from 'react'

import SearchInput from '@/app/components/ui/search-input'
import { ExerciseData, UserHistory, WorkoutInDb } from '@/app/libs/types'
import Button from '@/app/components/ui/button'
import { PiArrowRightBold } from 'react-icons/pi'
import { getExerciseData } from '@/app/helpers/get-exercise-data'
import ExerciseStats from './exercise-stats'

type ExerciseDataProps = {
  userId: string
  userHistory: UserHistory
  workouts: WorkoutInDb[]
}

export default function ExerciseForm({
  userId,
  userHistory,
  workouts,
}: ExerciseDataProps) {
  const [exercise, setExercise] = useState<string>('')
  const [exerciseData, setExerciseData] = useState<ExerciseData | null>(null)

  const form = (
    <Fragment>
      <form
        className=" w-full max-w-[450px] flex items-center gap-4"
        action={() => {
          const data = getExerciseData(exercise, workouts) as ExerciseData
          setExerciseData(data)
          setExercise('')
        }}
      >
        <div className="w-full -mt-2">
          <SearchInput
            searchType="exercise-name"
            userId={userId}
            userHistory={userHistory}
            changeValue={(input: string) => {
              setExercise(input)
            }}
            value={exercise}
            id="exercise-search"
            type="text"
            placeholder="Search for an exercise"
            className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 `}
          />
        </div>

        <div>
          <Button
            pill
            success
            type="submit"
          >
            Results
            <PiArrowRightBold className="inline-block" />
          </Button>
        </div>
      </form>
      <ExerciseStats exerciseData={exerciseData} />
    </Fragment>
  )

  return <Fragment>{form}</Fragment>
}
