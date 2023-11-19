'use client'
import axios from 'axios'
import DatePicker from '@/app/components/ui/date-picker'
import {
  MdOutlineCalendarMonth,
  MdOutlineLocationOn,
  MdOutlineSaveAlt,
  MdOutlineStickyNote2,
} from 'react-icons/md'
import Button from '@/app/components/ui/button'
import { Exercises, Workout, UserHistory } from '@/app/libs/types'
import ExerciseForm from '@/app/(site)/workouts/new/exercise-form'
import { useEffect, useState } from 'react'
import SearchInput from '@/app/components/ui/search-input'
import { toast } from 'react-hot-toast'

import { useRouter } from 'next/navigation'
import fetchUserWorkouts from '@/app/helpers/fetch-user-workouts'
import { getUniqueHistory } from '@/app/helpers/filter-history-data'

export const BASE_EXERCISE = {
  name: '',
  sets: [
    {
      sets: null,
      reps: null,
      weight: null,
      rpe: null,
    },
  ],
}

export default function NewWorkoutForm({ session }: any) {
  const [exercisesData, setExercisesData] = useState<Exercises>([BASE_EXERCISE])
  const [workoutData, setWorkoutData] = useState<Workout>({
    name: '',
    date: new Date(),
    location: '',
    notes: '',
  })
  const [userHistory, setUserHistory] = useState<UserHistory>({
    names: [],
    locations: [],
    exercises: [],
  })
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const workouts = await fetchUserWorkouts(session?.user.id)
      setUserHistory(getUniqueHistory(workouts))
    }
    fetchData()
  }, [])

  const handleAddExercise = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setExercisesData((prev) => [...prev, BASE_EXERCISE])
  }

  const handleDeleteExercise = (index: number) => {
    const updatedExercises = exercisesData.filter((_, i) => i !== index)
    setExercisesData(updatedExercises)
  }

  return (
    <form
      className="space-y-6"
      action={async (e) => {
        const data = {
          ...workoutData,
          exercises: exercisesData,
        }
        await axios.post('/api/workouts/create', data)
        router.push('/diary')
        toast.success(`Your ${workoutData.name} workout has been saved!`)
      }}
      // must user server action to utilize formStatus -> refactor w/o state
    >
      <div>
        <label
          htmlFor="workout-name"
          className="block text-sm font-medium leading-6 "
        >
          Workout Name
        </label>

        <SearchInput
          searchType="name"
          changeValue={(input: string) => {
            setWorkoutData({ ...workoutData, name: input })
          }}
          userId={session?.user.id}
          userHistory={userHistory}
          id="workout-name"
          name="workout-name"
          type="text"
          value={workoutData.name}
          required
          className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 `}
        />
      </div>
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium leading-6 "
        >
          <MdOutlineCalendarMonth className="inline-block" /> Date
        </label>
        <div className="mt-2">
          <DatePicker
            setWorkoutData={setWorkoutData}
            workoutData={workoutData}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium leading-6 "
        >
          <MdOutlineLocationOn className="inline-block" /> Location
        </label>
        <SearchInput
          searchType="location"
          changeValue={(input: string) => {
            setWorkoutData({ ...workoutData, location: input })
          }}
          userId={session?.user.id}
          userHistory={userHistory}
          id="location"
          name="location"
          type="text"
          value={workoutData.location}
          className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        />
      </div>
      <section className="flex flex-col gap-3">
        {exercisesData.map((_: any, i: number) => {
          return (
            <ExerciseForm
              key={i}
              userId={session?.user.id}
              setExercisesData={setExercisesData}
              exercisesData={exercisesData}
              exerciseIndex={i}
              userHistory={userHistory}
              onDelete={(i) => handleDeleteExercise(i)}
            />
          )
        })}
        <div className="mt-3">
          <button
            className="block text-sm font-medium leading-6 underline"
            onClick={(e) => handleAddExercise(e)}
          >
            Add Exercise
          </button>
        </div>
      </section>
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium leading-6 "
        >
          <MdOutlineStickyNote2 className="inline-block" /> Notes
        </label>
        <div className="mt-2">
          <textarea
            id="location"
            name="location"
            rows={5}
            value={workoutData.notes}
            onChange={(e) =>
              setWorkoutData({ ...workoutData, notes: e.target.value })
            }
            className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <Button
          pill
          success
          type="submit"
        >
          Save <MdOutlineSaveAlt className="inline-block" />
        </Button>
      </div>
    </form>
  )
}
