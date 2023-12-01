'use client'
import axios from 'axios'
import DatePicker from '@/app/components/ui/date-picker'
import {
  MdOutlineCalendarMonth,
  MdOutlineLocationOn,
  MdOutlineStickyNote2,
} from 'react-icons/md'
import Button from '@/app/components/ui/button'
import { Exercises, Workout, UserHistory, WorkoutInDb } from '@/app/libs/types'
import ExerciseForm from './exercise-form'
import { useEffect, useState } from 'react'
import SearchInput from '@/app/components/ui/search-input'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import fetchUserWorkouts from '@/app/helpers/fetch-user-workouts'
import { getUniqueHistory } from '@/app/helpers/filter-history-data'
import DeleteModal from '../ui/modal'
import Label from '../ui/label'

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

type WorkoutFormProps = {
  session: any
  workout?: WorkoutInDb
}

export default function WorkoutForm({ session, workout }: WorkoutFormProps) {
  const [exercisesData, setExercisesData] = useState<Exercises>(
    workout ? workout.exercises : [BASE_EXERCISE]
  )
  const [workoutData, setWorkoutData] = useState<Workout>(
    workout
      ? {
          name: workout.name,
          date: new Date(workout.date),
          location: workout.location,
          notes: workout.notes,
        }
      : {
          name: '',
          date: new Date(),
          location: '',
          notes: '',
        }
  )
  const [userHistory, setUserHistory] = useState<UserHistory>({
    workouts: [],
    locations: [],
    exercises: [],
  })
  const [openDeleteWarning, setOpenDeleteWarning] = useState<boolean>(false)
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

  const handleDeleteWorkout = async () => {
    if (!workout) return

    try {
      await axios.delete(`/api/workouts/${workout.id}`)
      setOpenDeleteWarning(false)
      toast.success(`Your ${workoutData.name} workout has been deleted!`)
      router.replace('/workouts')
      router.refresh()
    } catch (e: any) {
      if (e.response.data.error) toast.error(e.response.data.error)
      else toast.error('Something went wrong')
    }
  }

  const handleSubmitWorkout = async () => {
    const data = {
      ...workoutData,
      exercises: exercisesData,
    }

    try {
      if (workout) {
        await axios.put(`/api/workouts/${workout.id}`, data)
        toast.success(`Your ${workoutData.name} workout has been updated!`)
      } else {
        await axios.post('/api/workouts', data)
        toast.success(`Your ${workoutData.name} workout has been saved!`)
      }
      router.replace('/workouts')
      router.refresh()
    } catch (e: any) {
      if (e.response.data.error) toast.error(e.response.data.error)
      else toast.error('Something went wrong')
    }
  }

  return (
    <form
      className="space-y-6"
      action={async (e) => {
        await handleSubmitWorkout()
      }}
    >
      <div>
        <Label htmlFor="workout-name">Workout Name</Label>

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
        />
      </div>
      <div>
        <Label htmlFor="date">
          <MdOutlineCalendarMonth className="inline-block" /> Date
        </Label>
        <div className="mt-2">
          <DatePicker
            setData={setWorkoutData}
            data={workoutData}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="location">
          <MdOutlineLocationOn className="inline-block" /> Location
        </Label>
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
        <Label htmlFor="notes">
          <MdOutlineStickyNote2 className="inline-block" /> Notes
        </Label>
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

      <div className={workout ? 'flex flex-col gap-2' : ''}>
        <Button
          success
          type="submit"
        >
          Save
        </Button>
        {workout && (
          <Button
            danger
            type="button"
            onClick={async (e) => {
              e.preventDefault()
              setOpenDeleteWarning(true)
            }}
          >
            Delete
          </Button>
        )}
      </div>
      {workout && (
        <DeleteModal
          open={openDeleteWarning}
          setOpen={setOpenDeleteWarning}
          onDelete={handleDeleteWorkout}
        />
      )}
    </form>
  )
}
