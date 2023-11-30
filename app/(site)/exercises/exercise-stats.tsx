import { ExerciseData } from '@/app/libs/types'
import React, { Fragment } from 'react'
import { getExerciseChart } from '@/app/libs/chart'
import { TbRepeat, TbBraces } from 'react-icons/tb'
import { PiBarbellBold, PiCalendarCheckFill } from 'react-icons/pi'
import { FaMedal } from 'react-icons/fa6'

type ExerciseStatsProps = {
  exerciseData: ExerciseData | null
}

export default function ExerciseStats({ exerciseData }: ExerciseStatsProps) {
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
      subtitle: 'Personal Record',
    },
  ]

  return (
    exerciseData && (
      <Fragment>
        <div className="w-full  mt-8 bg-white border border-gray-200 p-4 rounded-lg max-w-[800px] shadow-sm py-4">
          <h5 className="font-semibold mb-4">{exerciseData?.exercise}</h5>
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
          <div>
            {exerciseData?.maxSets && exerciseData?.maxSets?.length >= 5 ? (
              getExerciseChart(exerciseData)
            ) : (
              <div className="border rounded-md text-center py-10 px-4 text-sm">
                <p>
                  Need 5 workouts with recorded weights to render a progress
                  graph.
                </p>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    )
  )
}
{
  /* <ul className="grid md:grid-cols-4 grid-cols-2  gap-4 lg:mb-8 mb-6">
{miniSections.map((section, index: number) => {
  return (
    <li
      className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col items-center justify-center"
      key={index}
    >
      <div className="rounded-full  p-5  mb-4 bg-gray-50">
        {section.icon}
      </div>
      <span>{section.value}</span>
      <span className="font-semibold">{section.subtitle}</span>
    </li>
  )
})}
</ul> */
}
