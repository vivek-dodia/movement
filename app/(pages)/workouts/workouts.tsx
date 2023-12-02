'use client'

import { WorkoutInDb, UserHistory } from '@/app/libs/types'
import { useState, useRef, useEffect, Fragment } from 'react'
import { PiCaretDownBold, PiCheckBold } from 'react-icons/pi'
import PaginatedList from '@/app/components/ui/pagination'

type WorkoutsListProps = {
  workoutsData: Array<WorkoutInDb>
  userHistory: UserHistory
}
const filters = [
  {
    label: 'Workout',
    value: 'workouts',
  },
  {
    label: 'Location',
    value: 'locations',
  },
  {
    label: 'Exercise',
    value: 'exercises',
  },
] as const

type SelectedFilter = (typeof filters)[number]['value'] | null

type SelectedOptions = {
  workouts: Array<string>
  locations: Array<string>
  exercises: Array<string>
}

const NUM_WORKOUTS_PER_PAGE = 5

export default function Workouts({
  workoutsData,
  userHistory,
}: WorkoutsListProps) {
  const [workouts, setWorkouts] = useState<Array<WorkoutInDb>>(workoutsData)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    workouts: [],
    locations: [],
    exercises: [],
  })
  const [indices, setIndices] = useState({
    start: 0,
    end: NUM_WORKOUTS_PER_PAGE,
  })

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      selectedOptions.locations.length === 0 &&
      selectedOptions.workouts.length === 0 &&
      selectedOptions.exercises.length === 0
    ) {
      setWorkouts(workoutsData)
      return
    }

    const filteredWorkouts = workoutsData.filter((workout) => {
      const matchesLocation =
        selectedOptions.locations.length === 0 ||
        selectedOptions.locations.includes(workout.location)

      const matchesWorkout =
        selectedOptions.workouts.length === 0 ||
        selectedOptions.workouts.includes(workout.name)

      const matchesExercises =
        selectedOptions.exercises.length === 0 ||
        selectedOptions.exercises.every((selectedExercise) =>
          workout.exercises.some(
            (exercise) => exercise.name === selectedExercise
          )
        )
      return matchesLocation && matchesWorkout && matchesExercises
    })

    setWorkouts(filteredWorkouts)
  }, [selectedOptions])

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        isDropdownOpen &&
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false)
        setSelectedFilter(null)
      }
    }

    document.addEventListener('click', closeDropdown)

    return () => {
      document.removeEventListener('click', closeDropdown)
    }
  })

  const handleAddFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value, name } = e.target
    setIndices({
      start: 0,
      end: NUM_WORKOUTS_PER_PAGE,
    })

    if (
      checked &&
      selectedFilter &&
      (name === 'workouts[]' || name === 'locations[]')
    ) {
      setSelectedOptions((prev) => ({
        ...prev,
        [selectedFilter]: [value],
      }))
    } else if (checked && selectedFilter) {
      setSelectedOptions((prev) => ({
        ...prev,
        [selectedFilter]: [...prev[selectedFilter], value],
      }))
    } else if (!checked && selectedFilter) {
      setSelectedOptions((prev) => ({
        ...prev,
        [selectedFilter]: prev[selectedFilter].filter((item) => item !== value),
      }))
    }
  }

  const renderedFilters = filters.map((filter) => {
    return (
      <Fragment key={filter.value}>
        {userHistory[filter.value].map((option, index: number) => {
          const isChecked =
            selectedFilter && selectedOptions[selectedFilter].includes(option)

          return (
            <Fragment key={index}>
              <label
                hidden={selectedFilter !== filter.value}
                htmlFor={option}
                className={`${
                  selectedFilter !== filter.value ? 'hidden' : ''
                } ${
                  isChecked ? 'bg-blue-100' : ''
                } px-2 py-2 rounded-md hover:bg-blue-100 active:bg-blue-100 transition-all select-none flex items-center justify-between`}
                onClick={() => {
                  if (
                    selectedFilter === 'workouts' ||
                    selectedFilter === 'locations'
                  ) {
                    setIsDropdownOpen(false)
                  }
                }}
              >
                {option}
                {isChecked && (
                  <PiCheckBold className="inline-block text-green-500" />
                )}
              </label>
              <input
                type={'checkbox'}
                checked={isChecked ? true : false}
                className="hidden"
                name={`${filter.value}[]`}
                id={option}
                value={option}
                onChange={handleAddFilter}
              />
            </Fragment>
          )
        })}
      </Fragment>
    )
  })

  return (
    <Fragment>
      <h5 className="font-medium mb-2">Filter by:</h5>
      <div
        ref={ref}
        className="mb-5 bg-white border border-gray-200  rounded-md text-sm relative"
      >
        <ul>
          {filters.map((filter) => {
            return (
              <li
                className="inline"
                key={filter.value}
              >
                <button
                  className={`px-2 xs:px-4 py-2 hover:bg-blue-100 transition-all ${
                    filter.value === selectedFilter && isDropdownOpen
                      ? 'bg-blue-100'
                      : ''
                  }`}
                  onClick={() => {
                    setIsDropdownOpen(true)
                    setSelectedFilter(
                      filter.value === 'workouts'
                        ? 'workouts'
                        : filter.value === 'exercises'
                        ? 'exercises'
                        : 'locations'
                    )
                  }}
                >
                  {filter.label}{' '}
                  <PiCaretDownBold className="inline-block text-xs text-gray-600" />
                </button>
              </li>
            )
          })}
        </ul>
        <div
          ref={ref}
          hidden={!isDropdownOpen}
          className="border bg-white absolute z-10 w-full rounded-md py-3 px-2 mt-[1px] overflow-y-auto max-h-[30rem]"
        >
          <div className="flex flex-col gap-1 ">{renderedFilters}</div>
        </div>
      </div>
      <div className="flex mb-5 flex-wrap gap-2 justify-center">
        {Object.entries(selectedOptions).map(([key, values]) => (
          <Fragment key={key}>
            {values.map((value) => (
              <span
                key={value}
                className={`rounded-full px-3 py-1 text-sm ${
                  key === 'workouts'
                    ? 'bg-yellow-400'
                    : key === 'exercises'
                    ? 'bg-green-400'
                    : 'bg-red-400'
                }`}
              >
                {value}
              </span>
            ))}
          </Fragment>
        ))}
      </div>
      <PaginatedList
        container={ref}
        displayed={NUM_WORKOUTS_PER_PAGE}
        indicies={indices}
        setIndicies={setIndices}
        list={workouts}
        type="workouts"
      />
    </Fragment>
  )
}
