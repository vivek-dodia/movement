'use client'

import { UserHistory, WorkoutInDb } from '@/app/libs/types'
import React, { ChangeEvent, Fragment, useEffect, useRef } from 'react'
import DiaryEntry from './diary-entry'
import { useState } from 'react'
import { PiCaretDownBold } from 'react-icons/pi'
import { getUniqueHistory } from '@/app/helpers/filter-history-data'

type WorkoutsListProps = {
  workoutsData: Array<WorkoutInDb>
}

const filters = [
  {
    label: 'Workout',
    value: 'workouts',
  },
  {
    label: 'Exercise',
    value: 'exercises',
  },
  {
    label: 'Location',
    value: 'locations',
  },
] as const

type SelectedFilter = (typeof filters)[number]['value'] | null

type SelectedOptions = {
  workouts: Array<string>
  locations: Array<string>
  exercises: Array<string>
}

export default function WorkoutsList({ workoutsData }: WorkoutsListProps) {
  const [workouts, setWorkouts] = useState<Array<WorkoutInDb>>(workoutsData)
  const [userHistory, setUserHistory] = useState<UserHistory>({
    workouts: [],
    locations: [],
    exercises: [],
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    workouts: [],
    locations: [],
    exercises: [],
  })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setUserHistory(getUniqueHistory(workouts))
  }, [])

  useEffect(() => {
    if (selectedFilter && selectedOptions[selectedFilter].length === 0) {
      setWorkouts(workoutsData)
      return
    }

    const filteredWorkouts = workoutsData.filter((workout) => {
      const nameFilter =
        selectedOptions.workouts.length === 0 ||
        selectedOptions.workouts.includes(workout.name)
      const locationFilter =
        selectedOptions.locations.length === 0 ||
        selectedOptions.locations.includes(workout.location)
      const exerciseFilter =
        selectedOptions.exercises.length === 0 ||
        workout.exercises.some((exercise) =>
          selectedOptions.exercises.includes(exercise.name)
        )

      return nameFilter && locationFilter && exerciseFilter
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

  const handleAddFilter = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && selectedFilter) {
      setSelectedOptions((prev) => ({
        ...prev,
        [selectedFilter]: [...prev[selectedFilter], e.target.value],
      }))
    } else if (!e.target.checked && selectedFilter) {
      setSelectedOptions((prev) => ({
        ...prev,
        [selectedFilter]: prev[selectedFilter].filter(
          (item) => item !== e.target.value
        ),
      }))
    }
  }

  const renderedWorkouts = workouts.map(
    (workout: WorkoutInDb, index: number) => {
      return (
        <React.Fragment key={workout._id}>
          <div
            className={`bg-blue-500 text-gray-100 flex justify-center py-1 uppercase text-[0.8rem] tracking-wider ${
              index === 0 ? 'rounded-t-md' : ''
            }`}
          >
            {new Date(workout.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              weekday: 'long',
            })}
          </div>
          <DiaryEntry {...workout} />
        </React.Fragment>
      )
    }
  )

  const renderedFilters = filters.map((filter) => {
    return (
      <Fragment key={filter.value}>
        <h5
          className="px-2 mb-1 font-medium"
          hidden={selectedFilter !== filter.value}
        >
          {filter.label}
        </h5>
        {userHistory[filter.value].map((option, index: number) => {
          const isChecked =
            selectedFilter && selectedOptions[selectedFilter].includes(option)

          return (
            <Fragment key={index}>
              <label
                htmlFor={option}
                className={`px-2 py-2 rounded-md active:bg-blue-100 transition-all select-none ${
                  isChecked ? 'bg-blue-500 text-gray-100' : 'hover:bg-blue-100'
                }`}
                hidden={selectedFilter !== filter.value}
              >
                {option}
              </label>
              <input
                type="checkbox"
                id={option}
                value={option}
                className="hidden"
                onChange={handleAddFilter}
              />
            </Fragment>
          )
        })}
      </Fragment>
    )
  })

  return (
    <React.Fragment>
      <h5 className="font-medium mb-2">Filter by:</h5>

      <div className="mb-5 border inline rounded-md text-sm relative">
        <ul>
          {filters.map((filter) => {
            return (
              <li
                className="inline"
                key={filter.value}
              >
                <button
                  className={
                    'px-1 xs:px-4 py-2 hover:bg-blue-100 transition-all'
                  }
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
          className="border bg-gray-50 absolute z-10 w-full rounded-md py-3 px-2 mt-[1px] overflow-y-auto max-h-[30rem]"
        >
          <div className="flex flex-col gap-1 ">{renderedFilters}</div>
        </div>
      </div>

      {workouts.length !== 0 ? (
        <ul className="max-w-[550px] w-full rounded-md shadow-2xl">
          {renderedWorkouts}
        </ul>
      ) : (
        <p>NO Workouts</p>
      )}
    </React.Fragment>
  )
}
