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
import { Exercises, Workout } from '@/app/libs/types'
import { BASE_EXERCISE } from '@/app/libs/data'
import ExerciseForm from '@/app/components/exercise-form'
import { useState } from 'react'
import {
  handleAddExercise,
  handleDeleteExercise,
} from '@/app/helpers/workout-form-helpers'

export default function NewWorkoutForm({ session }: any) {
  const [exercisesData, setExercisesData] = useState<Exercises>([BASE_EXERCISE])
  const [workoutData, setWorkoutData] = useState<Workout>({
    name: '',
    date: new Date(),
    location: '',
    notes: '',
  })

  console.log('user token', session.user.accessToken)

  return (
    <form
      className="space-y-6"
      action={async (e) => {
        const data = {
          ...workoutData,
          exercises: exercisesData,
        }
        await axios.post('/api/workouts/create', data, {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        })
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
        <div className="mt-2">
          <input
            id="workout-name"
            name="workout-name"
            type="text"
            value={workoutData.name}
            onChange={(e) =>
              setWorkoutData({ ...workoutData, name: e.target.value })
            }
            required
            className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
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
        <div className="mt-2">
          <input
            id="location"
            name="location"
            type="text"
            className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <section className="flex flex-col gap-3">
        {exercisesData.map((_: any, i: number) => {
          return (
            <ExerciseForm
              key={i}
              setExercisesData={setExercisesData}
              exercisesData={exercisesData}
              exerciseIndex={i}
              onDelete={(i) =>
                handleDeleteExercise(i, exercisesData, setExercisesData)
              }
            />
          )
        })}
        <div className="mt-3">
          <button
            className="block text-sm font-medium leading-6 underline"
            onClick={(e) => handleAddExercise(e, setExercisesData)}
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
        >
          Save <MdOutlineSaveAlt className="inline-block" />
        </Button>
      </div>
    </form>
  )
}
