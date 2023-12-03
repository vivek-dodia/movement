import { redirect } from 'next/navigation'
import { getSession } from './helpers/get-session'
import { IoArrowForwardOutline } from 'react-icons/io5'
import Link from 'next/link'
import dataVisualized from '@/public/data-visualized.png'
import filterWorkouts from '@/public/filter-workouts.png'
import mobileScreen from '@/public/mobile-screen.png'
import exerciseStats from '@/public/exercise-stats.png'
import Image from 'next/image'
import { BsGraphUpArrow } from 'react-icons/bs'
import { FaCheckCircle, FaClipboardList } from 'react-icons/fa'

const sections = [
  {
    title: 'Your workout data, visualized.',
    description:
      'Progress has never been easier to visualize through our interactive charts that make understanding data easy.',
    image: dataVisualized,
    altImage: 'Charts displaying workout data.',
  },
  {
    title: 'Find any workout.',
    description:
      'Easily find a unique workout in your history through our filtering system. Filter by locations, exercises, and workout names.',
    image: filterWorkouts,
    altImage: 'Filtering system for workouts.',
  },
  {
    title: 'Individualized exercise statistics.',
    description:
      'Get inidividualized statistics for each exercise you perform. See how you have progressed each exercise over time.',
    image: exerciseStats,
    altImage: 'Statistics for individual exercises.',
  },
  {
    title: 'Log workouts on the go.',
    description:
      'Optimized for mobile devices, take your phone on the go and never miss logging a workout.',
    image: mobileScreen,
    altImage: 'Mobile screen displaying new workout form.',
  },
] as const

const features = [
  {
    title: 'Log Workouts & Weight',
    description: 'Log your workouts and weight with ease.',
    icon: <FaClipboardList className="text-3xl text-blue-600" />,
  },
  {
    title: 'View Progress',
    description: 'We visualize your data to make viewing progress easy.',
    icon: <BsGraphUpArrow className="text-3xl text-blue-600" />,
  },
  {
    title: 'See Results',
    description: 'You put in the work. Time to see the results.',
    icon: <FaCheckCircle className="text-3xl text-blue-600" />,
  },
] as const

export default async function Home() {
  const session = await getSession()

  if (session) redirect('/dashboard')

  return (
    <section>
      <div className="bg-[#2564eb10] absolute top-[-6rem] left-1/2 transform -translate-x-1/2 -z-10 h-[31.25rem] w-full  blur-[10rem]"></div>
      <div className="lg:mt-32 mt-8 flex flex-col items-center justify-center mb-24">
        <h1 className="sm:text-6xl text-4xl font-bold tracking-tight mb-8 lg:w-3/4 text-center">
          Reshaping your <span className="text-blue-600">fitness</span> journey.
        </h1>
        <p className=" text-gray-500 text-lg mb-8 text-center">
          Log your workouts. Track your progress. Get results.
        </p>
        <div className="flex gap-4 items-center w-full justify-center">
          <Link
            href="/register"
            className="bg-blue-600 text-gray-50 py-2 px-4 rounded-md flex items-center justify-center gap-1 w-full max-w-[9rem] hover:scale-105 active:scale-95 transition-all"
          >
            Get started
          </Link>
          <a
            href="https://github.com/aross2010/movement-next#readme"
            className="flex items-center gap-2 font-medium"
          >
            Learn more <IoArrowForwardOutline />
          </a>
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-center items-start gap-4 mb-32">
        {features.map((feautre) => {
          return (
            <div
              key={feautre.title}
              className="flex flex-col justify-center items-center md:w-auto w-full md:flex-1"
            >
              <div className="p-5 rounded-full w-min border-2 border-blue-600 mb-5">
                {feautre.icon}
              </div>
              <h5 className="text-center font-medium text-lg mb-2">
                {feautre.title}
              </h5>
              <p className="text-center text-gray-500">{feautre.description}</p>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-16">
        {sections.map((section, index) => {
          return (
            <div
              key={section.description}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-24 lg:justify-evenly items-center`}
            >
              <div className="lg:w-1/2 w-full">
                <h2 className="text-4xl font-bold tracking-tight mb-6 text-center">
                  {section.title}
                </h2>
                <p className="text-center text-gray-500">
                  {section.description}
                </p>
              </div>
              <div className="w-full lg:w-1/2 h-[28rem] flex justify-center">
                <Image
                  src={section.image}
                  alt={section.altImage}
                  className="w-auto object-contain bg-gray-50 shadow-xl border-2 border-gray-700 p-1 rounded-lg"
                />
              </div>
            </div>
          )
        })}
        <div className="mb-24 lg:mt-24 mt-12 flex justify-center">
          <div className="text-center">
            <p className="font-medium text-2xl mb-3">
              "The best workout tracker I've ever used. It's a{' '}
              <span className="font-bold text-blue-600">game changer</span>."
            </p>

            <span className="text-gray-500">- Annonymous User</span>
            <div className="flex gap-4 items-center w-full justify-center mt-12">
              <Link
                href="/register"
                className="bg-blue-600 text-gray-50 py-2 px-4 rounded-md flex items-center justify-center gap-1 w-full max-w-[9rem] hover:scale-105 active:scale-95 transition-all"
              >
                Get started
              </Link>
              <a
                href="https://github.com/aross2010/movement-next#readme"
                className="flex items-center gap-2 font-medium"
              >
                Learn more <IoArrowForwardOutline />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
