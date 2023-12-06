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

      <ExerciseStats
        exerciseData={exerciseData}
        userHistory={userHistory}
      />
    </Fragment>
  )

  return form
}
