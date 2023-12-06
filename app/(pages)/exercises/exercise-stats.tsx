import { ExerciseData, UserHistory } from '@/app/libs/types'
import React, { Fragment } from 'react'
import { getExerciseChart } from '@/app/libs/chart'
import { TbRepeat, TbBraces } from 'react-icons/tb'
import { PiCalendarCheckFill } from 'react-icons/pi'
import { FaMedal } from 'react-icons/fa6'
import ExerciseNameChangeForm from './change-name-modal'

type ExerciseStatsProps = {
  exerciseData: ExerciseData | null
  userHistory: UserHistory
}

export default function ExerciseStats({
  exerciseData,
  userHistory,
}: ExerciseStatsProps) {
  const stats = [
    {
      icon: <PiCalendarCheckFill className="text-blue-600 text-3xl" />,
      value: exerciseData?.totalWorkouts,
      subtitle: 'Workouts',
    },
    {
      icon: <TbRepeat className="text-blue-600 text-3xl" />,
      value: exerciseData?.totalReps,
      subtitle: 'Reps',
    },
    {
      icon: <TbBraces className="text-blue-600 text-3xl" />,
      value: exerciseData?.totalSets,
      subtitle: 'Sets',
    },
    {
      icon: <FaMedal className="text-blue-600 text-3xl" />,
      value: `${exerciseData?.pr.weight} lbs.`,
      subtitle: 'PR',
    },
  ]

  return (
    exerciseData && (
      <Fragment>
        <div className="w-full  mt-8 bg-white border border-gray-200 p-4 rounded-lg max-w-[800px] shadow-sm py-4">
          <ExerciseNameChangeForm
            name={exerciseData?.exercise}
            userHistory={userHistory}
          />
          <ul className="grid md:grid-cols-4 grid-cols-2 mb-4 gap-4">
            {stats.map((stat, index) => (
              <li
                className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col items-center justify-center"
                key={index}
              >
                <div className="rounded-full  p-5  mb-4 bg-gray-50">
                  {stat.icon}
                </div>
                <span>{stat.value}</span>
                <span className="font-semibold">{stat.subtitle}</span>
              </li>
            ))}
          </ul>

          {exerciseData?.maxSets && exerciseData?.maxSets?.length >= 2 ? (
            getExerciseChart(exerciseData)
          ) : (
            <div className="border rounded-md text-center py-10 px-4 text-sm">
              <p>
                Need 2 workouts with recorded weights to render a progress
                graph.
              </p>
            </div>
          )}
        </div>
      </Fragment>
    )
  )
}
