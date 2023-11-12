import {
  HandleAddExercise,
  HandleChange,
  HandleDeleteExercise,
  HandleEditExercise,
  HandleEditSets,
  HandleNameChange,
} from '../libs/types'
import { Sets } from '../libs/types'
import { toast } from 'react-hot-toast'
import { BASE_EXERCISE } from '../libs/data'

export const handleEditSets: HandleEditSets = (
  e,
  setExercisesData,
  exercisesData,
  exerciseIndex,
  add,
  index
) => {
  e.preventDefault()
  const updatedExercises = [...exercisesData]
  if (add) {
    updatedExercises[exerciseIndex].sets = [
      ...updatedExercises[exerciseIndex].sets,
      {
        sets: null,
        reps: null,
        weight: null,
        rpe: null,
      },
    ]
    setExercisesData(updatedExercises)
  } else if (index !== null && index !== undefined) {
    updatedExercises[exerciseIndex].sets = updatedExercises[
      exerciseIndex
    ].sets.filter((_, i) => i !== index)
    setExercisesData(updatedExercises)
  }
}

export const handleVisibility: HandleEditExercise = (
  e,
  exercisesData,
  exerciseIndex,
  setIsHidden,
  setIsInvalid,
  hide?: boolean
) => {
  e.preventDefault()
  if (hide) {
    if (exercisesData[exerciseIndex].name === '') {
      setIsInvalid(true)
      toast.error('Exercise name required')
      return
    }
    setIsHidden(true)
  } else setIsHidden(false)
}

// update sets, reps, weight, or rpe
export const handleChange: HandleChange = (
  e,
  index,
  setExercisesData,
  exerciseIndex
) => {
  const { name, value } = e.target
  setExercisesData((prevExercises) => {
    const updatedExercises = prevExercises.map((exercise, i) => {
      if (i === exerciseIndex && exercise.sets[index]) {
        return {
          ...exercise,
          sets: exercise.sets.map((set, setIndex) =>
            setIndex === index ? { ...set, [name]: value } : set
          ),
        }
      }
      return exercise
    })
    return updatedExercises
  })
}

export const handleNameChange: HandleNameChange = (
  e,
  isInvalid,
  setIsInvalid,
  exercisesData,
  setExercisesData,
  exerciseIndex
) => {
  if (e.target.value !== '' && isInvalid) setIsInvalid(false)
  const updatedExercises = [...exercisesData]
  updatedExercises[exerciseIndex] = {
    ...updatedExercises[exerciseIndex],
    name: e.target.value,
  }
  setExercisesData(updatedExercises)
}

export const getTotalSets = (sets: Sets) => {
  return sets.reduce((acc, curr) => {
    return acc + Number(curr.sets)
  }, 0)
}

export const handleAddExercise: HandleAddExercise = (e, setExercisesData) => {
  e.preventDefault()
  setExercisesData((prev) => [...prev, BASE_EXERCISE])
}

export const handleDeleteExercise: HandleDeleteExercise = (
  index,
  exercisesData,
  setExercisesData
) => {
  const updatedExercises = exercisesData.filter((_, i) => i !== index)
  setExercisesData(updatedExercises)
}
