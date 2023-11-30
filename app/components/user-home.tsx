'use client'
import { DashboardData } from '../libs/types'
import { TbRepeat, TbBraces } from 'react-icons/tb'
import { PiBarbellBold, PiCalendarCheckFill } from 'react-icons/pi'
import Link from 'next/link'
import { getDashBoardCharts, getWeightChart } from '../libs/chart'
import { PiCaretRightBold } from 'react-icons/pi'
import { GiWeightScale } from 'react-icons/gi'
import { FaMedal } from 'react-icons/fa6'

type UserHomeProps = {
  session: any
  data: DashboardData
}

export default function UserHome({ session, data }: UserHomeProps) {
  const { name } = session.user

  const { workouts, exercises, reps, sets } = data.totals

  const { pieChart, popBarChart, PrBarChart, donutChart } =
    getDashBoardCharts(data)

  const lineChart = getWeightChart(data.weights)

  const sections = [
    // {
    //   title: 'Popular Workouts',
    //   content: pieChart,
    // },
    {
      title: 'Weight',
      content: lineChart,
    },
    {
      title: 'Popular Exercises',
      content: popBarChart,
    },
    {
      title: 'Personal Records',
      content: PrBarChart,
    },
    {
      title: 'Locations',
      content: donutChart,
    },
  ]

  const miniSections = [
    {
      icon: <PiCalendarCheckFill className="text-blue-600 text-3xl" />,
      value: workouts,
      subtitle: 'Workouts',
      href: '/workouts/new',
      text: 'View All',
    },
    {
      icon: <TbRepeat className="text-blue-600 text-3xl" />,
      value: reps,
      subtitle: 'Reps',
    },
    {
      icon: <TbBraces className="text-blue-600 text-3xl" />,
      value: sets,
      subtitle: 'Sets',
    },
    {
      icon: <PiBarbellBold className="text-blue-600 text-3xl" />,
      value: exercises,
      subtitle: 'Exercises',
      href: '/exercises',
      text: 'View All',
    },
    {
      icon: <FaMedal className="text-blue-600 text-3xl" />,
      value: `${Array.from(data.exercisePRs.values())[0]} lbs.`,
      subtitle: Array.from(data.exercisePRs.keys())[0],
    },
    {
      icon: <GiWeightScale className="text-blue-600 text-3xl" />,
      value: '180 lbs.',
      subtitle: 'Weight',
      href: '/weight',
      text: 'Log Weight',
    },
  ]

  const actions = [
    {
      title: 'Add Workout',
      href: '/workouts/new',
    },
    {
      title: 'Log Weight',
      href: '/weight',
    },
    {
      title: 'View Exercise Data',
      href: '/exercises',
    },
    {
      title: 'View Workouts',
      href: '/workouts',
    },
  ]

  return (
    <section>
      <h1 className="text-3xl md:text-left font-extrabold text-center">
        Dashboard
      </h1>
      <h3 className="mb-10 text-gray-500 md:text-left text-center">
        Welcome back, {name}.
      </h3>
      <ul className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-2  gap-4 mb-4">
        {miniSections.map((section, index: number) => {
          return (
            <li
              className="bg-white border border-gray-200 py-3 px-2 rounded-lg flex flex-col items-center "
              key={index}
            >
              <div className="rounded-full  p-3  mb-4 bg-gray-50">
                {section.icon}
              </div>
              <span>{section.value}</span>
              <span className="font-semibold">{section.subtitle}</span>
              {section.href && section.text && (
                <Link
                  href={section.href}
                  className="text-blue-600 mt-6 text-sm flex items-center gap-1 font-semibold hover:underline"
                >
                  {section.text} <PiCaretRightBold />
                </Link>
              )}
            </li>
          )
        })}
      </ul>
      <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
        {sections.map((section, index) => {
          return (
            <div
              className="bg-white border border-gray-200 p-4 rounded-lg"
              key={index}
            >
              <h5 className="font-semibold mb-4">{section.title}</h5>
              {section.content}
            </div>
          )
        })}
      </div>
    </section>
  )
}
