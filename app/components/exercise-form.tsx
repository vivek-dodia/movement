import { useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'
import { exerciseFormInputs } from '../libs/data'
import { ExerciseFormProps } from '../libs/types'
import {
  handleEditSets,
  handleVisibility,
  handleChange,
  getTotalSets,
  handleNameChange,
} from '../helpers/workout-form-helpers'

export default function ExerciseForm({
  setExercisesData,
  exercisesData,
  exerciseIndex,
  onDelete,
}: ExerciseFormProps) {
  const [isHidden, setIsHidden] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  const form = (
    <div className="w-full bg-gray-100 shadow-md rounded-md py-4 px-3 flex flex-col gap-4 overflow-x-hidden">
      <div>
        <label
          htmlFor={`${exerciseIndex}-name`}
          className="block text-sm font-medium leading-6 mb-1"
        >
          Exercise Name
        </label>
        <input
          id={`${exerciseIndex}-name`}
          name={`${exerciseIndex}-name`}
          type="text"
          value={exercisesData[exerciseIndex].name}
          onChange={(e) =>
            handleNameChange(
              e,
              isInvalid,
              setIsInvalid,
              exercisesData,
              setExercisesData,
              exerciseIndex
            )
          }
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
                    onChange={(e) =>
                      handleChange(e, i, setExercisesData, exerciseIndex)
                    }
                    type="number"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-xs sm:leading-6"
                  />
                </div>
              )
            })}
            <button
              onClick={(e) =>
                handleEditSets(
                  e,
                  setExercisesData,
                  exercisesData,
                  exerciseIndex,
                  false,
                  i
                )
              }
              className={`${i === 0 ? 'mt-6' : ''} -mx-1`}
            >
              <AiFillMinusCircle className="inline-block text-red-600 text-sm" />
            </button>
          </div>
        ))}
      </section>
      <div>
        <button
          onClick={(e) =>
            handleEditSets(
              e,
              setExercisesData,
              exercisesData,
              exerciseIndex,
              true
            )
          }
        >
          <AiFillPlusCircle className="inline-block text-green-600 text-lg" />
        </button>
      </div>

      <div className="flex justify-between items-center text-xs sm:textsm">
        <button
          className="font-medium leading-6 underline"
          onClick={(e) =>
            handleVisibility(
              e,
              exercisesData,
              exerciseIndex,
              setIsHidden,
              setIsInvalid,
              true
            )
          }
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
        onClick={(e) =>
          handleVisibility(
            e,
            exercisesData,
            exerciseIndex,
            setIsHidden,
            setIsInvalid
          )
        }
        className="text-"
      >
        <MdOutlineEdit className="inline-block" />
      </button>
    </div>
  )

  return isHidden ? hiddenForm : form
}
