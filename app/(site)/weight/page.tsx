import ProtectRoute from '@/app/components/protect-route'
import { getSession } from '@/app/helpers/get-session'
import WeightForm from './form'
import { Fragment } from 'react'
import WeightChart from './chart'
import { fetchUserWeights } from '@/app/helpers/fetch-user-weights'

export default async function LogWeight() {
  const session = await getSession()

  if (!session) {
    return (
      <ProtectRoute message="You must be logged in to access your weight." />
    )
  }

  const userId = (session as any).user.id

  const weightEntries = await fetchUserWeights(userId)

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
            <WeightChart weightEntries={weightEntries} />
          ) : (
            <p className="text-center text-sm">
              Add at least two weight entries to view weight chart.
            </p>
          )}
        </div>
      </section>
    </Fragment>
  )
}
