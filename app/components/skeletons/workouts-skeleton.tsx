import { Skeleton } from 'primereact/skeleton'
import Link from 'next/link'

export default function WorkoutLoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
        Your Workouts
      </h2>
      <p className=" text-gray-500 text-center mb-7 w-full max-w-[550px] mt-6">
        Filter through your workouts, or{' '}
        <Link
          href="/workouts/new"
          className=" hover:underline"
        >
          create a new one
        </Link>
        .
      </p>
      <Skeleton
        width="5rem"
        className="mb-4"
      ></Skeleton>
      <Skeleton
        className="mb-10 w-full max-w-[19.5rem]"
        height="2.10rem"
      ></Skeleton>

      {Array(3)
        .fill(0)
        .map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="w-full max-w-[550px] mb-8 rounded-lg"
              height="32rem"
            ></Skeleton>
          )
        })}
    </div>
  )
}
