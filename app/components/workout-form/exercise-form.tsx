import { useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'
import { exerciseFormInputs } from '../../libs/data'
import { ExerciseFormProps } from '../../libs/types'
import { Sets } from '../../libs/types'
import { toast } from 'react-hot-toast'
import SearchInput from '../ui/search-input'

export default function ExerciseForm({
  setExercisesData,
  exercisesData,
  exerciseIndex,
  userHistory,
  onDelete,
  userId,
}: ExerciseFormProps) {
  const [isHidden, setIsHidden] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  // update sets, reps, weight, or rpe
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target
    setExercisesData((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise, i) => {
        if (i === exerciseIndex && exercise.sets[index]) {
          return {
            ...exercise,
            sets: exercise.sets.map((set, setIndex) =>
              setIndex === index ? { ...set, [name]: parseInt(value) } : set
            ),
          }
        }
        return exercise
      })
      return updatedExercises
    })
  }

  const handleNameChange = (input: string) => {
    if (input !== '' && isInvalid) setIsInvalid(false)
    const updatedExercises = [...exercisesData]
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      name: input,
    }
    setExercisesData(updatedExercises)
  }

  const handleEditSets = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    add: boolean,
    index?: number
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

  const handleVisibility = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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

  const getTotalSets = (sets: Sets) => {
    return sets.reduce((acc, curr) => {
      return acc + Number(curr.sets)
    }, 0)
  }

  const form = (
    <div className="w-full bg-gray-100 shadow-md rounded-md py-4 px-3 flex flex-col gap-4 ">
      <div>
        <label
          htmlFor={`${exerciseIndex}-exercise`}
          className="block text-sm font-medium leading-6 mb-1"
        >
          Exercise Name
        </label>
        <SearchInput
          searchType="exercise-name"
          changeValue={(input: string) => handleNameChange(input)}
          userId={userId}
          userHistory={userHistory}
          id={`${exerciseIndex}-exercise`}
          name={`${exerciseIndex}-exercise`}
          type="text"
          required
          value={exercisesData[exerciseIndex].name}
          className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ${
            isInvalid ? 'ring-red-600' : 'ring-gray-300'
          } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 `}
        />
      </div>
      <section className="flex flex-col gap-2">
        {exercisesData[exerciseIndex].sets.map((_, i: number) => (
          <div
            className="flex justify-between items-center gap-2"
            key={i}
          >
            {exerciseFormInputs.map(({ name, label }) => {
              return (
                <div key={label}>
                  {i === 0 && (
                    <label
                      htmlFor={name}
                      className="block text-xs sm:text-sm font-medium leading-6 mb-1 ml-1"
                    >
                      {label}
                    </label>
                  )}
                  <input
                    id={name}
                    name={name}
                    value={exercisesData[exerciseIndex].sets[i][name] || ''}
                    onChange={(e) => handleChange(e, i)}
                    type="number"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-xs sm:leading-6"
                  />
                </div>
              )
            })}
            <button
              onClick={(e) => handleEditSets(e, false, i)}
              className={`${i === 0 ? 'mt-6' : ''} -mx-1`}
            >
              <AiFillMinusCircle className="inline-block text-red-600 text-sm" />
            </button>
          </div>
        ))}
      </section>
      <div>
        <button onClick={(e) => handleEditSets(e, true)}>
          <AiFillPlusCircle className="inline-block text-green-600 text-lg" />
        </button>
      </div>

      <div className="flex justify-between items-center text-xs sm:textsm">
        <button
          className="font-medium leading-6 underline"
          onClick={(e) => handleVisibility(e, true)}
        >
          Save
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            onDelete(exerciseIndex)
          }}
        >
          <FaTrashAlt className="inline-block text-[0.95rem]" />
        </button>
      </div>
    </div>
  )

  const hiddenForm = (
    <div className="w-full bg-gray-100 shadow-md rounded-md py-2 px-3 flex justify-between overflow-x-hidden">
      <span className="text-sm font-medium leading-6 ">
        {exercisesData[exerciseIndex].name} (
        {getTotalSets(exercisesData[exerciseIndex].sets)} sets)
      </span>
      <button
        onClick={(e) => handleVisibility(e)}
        className="text-"
      >
        <MdOutlineEdit className="inline-block" />
      </button>
    </div>
  )

  return isHidden ? hiddenForm : form
}
