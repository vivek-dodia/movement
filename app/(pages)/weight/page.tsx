import ProtectRoute from '@/app/components/protect-route'
import { getSession } from '@/app/helpers/get-session'
import WeightForm from './form'
import { Fragment } from 'react'
import WeightChart from './chart'
import { fetchUserWeights } from '@/app/helpers/fetch-user-weights'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Weight',
  description: 'Log and view your weight.',
}

export default async function LogWeight() {
  const session = await getSession()

  if (!session) {
    return (
      <ProtectRoute message="You must be logged in to access your weight." />
    )
  }

  const userId = session.user.id

  const weightEntries = await fetchUserWeights(userId)

  let weightDifference = 0
  let daysDifference = 0

  if (weightEntries.length >= 2) {
    weightDifference =
      weightEntries[weightEntries.length - 1].weight - weightEntries[0].weight

    daysDifference = Math.round(
      (new Date(weightEntries[weightEntries.length - 1].date).getTime() -
        new Date(weightEntries[0].date).getTime()) /
        (1000 * 3600 * 24)
    )
  }

  return (
    <Fragment>
      <section className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <h2 className=" text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log your weight
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <p className=" text-gray-500 text-center mb-6">
            To edit a weight entry, select the date you wish to edit and enter a
            new weight, or delete it.
          </p>
          <WeightForm weightEntries={weightEntries} />
        </div>
      </section>
      <section className="mt-12 flex justify-center w-full">
        <div
          className={`bg-white border border-gray-200 p-4 rounded-lg w-full ${
            weightEntries.length >= 2 ? 'max-w-[800px]' : 'max-w-sm'
          } `}
        >
          {weightEntries.length >= 2 ? (
            <Fragment>
              <WeightChart weightEntries={weightEntries} />
              {weightDifference !== 0 && (
                <span className="text-sm ">
                  <span
                    className={`font-medium ${
                      weightDifference > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {weightDifference > 0 ? '+' : '-'} {weightDifference} lbs.
                  </span>{' '}
                  across {daysDifference} days.
                </span>
              )}
            </Fragment>
          ) : weightEntries.length === 1 ? (
            <p className="text-center text-sm ">
              Add at least two weight entries to view weight chart. Previous
              weight:{' '}
              <span className="font-medium">
                {weightEntries[0]?.weight}
                {' lbs'}
              </span>{' '}
              on{' '}
              <span className="font-medium">
                {' '}
                {new Date(weightEntries[0]?.date).toLocaleDateString('en-US', {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </p>
          ) : (
            <p className="text-center text-sm ">
              Add at least two weight entries to view weight chart.
            </p>
          )}
        </div>
      </section>
    </Fragment>
  )
}
