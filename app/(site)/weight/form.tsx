'use client'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import DatePicker from '@/app/components/ui/date-picker'
import { useState, useEffect } from 'react'
import Button from '@/app/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { WeightEntries } from '@/app/libs/types'
import DeleteModal from '@/app/components/ui/modal'

type Data = {
  weight: number | null
  date: Date
}

export default function WeightForm({
  weightEntries,
}: {
  weightEntries: WeightEntries
}) {
  const [data, setData] = useState<Data>({
    weight: null,
    date: new Date(),
  })
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false)
  const router = useRouter()

  let weightEntryId: string | null = null

  const isEditable = weightEntries.some((entry) => {
    const entryDate = new Date(entry.date).setHours(0, 0, 0, 0)
    const dataDate = new Date(data.date).setHours(0, 0, 0, 0)
    if (entryDate === dataDate && weightEntryId !== entry.id) {
      weightEntryId = entry.id
    }
    return entryDate === dataDate
  })

  const handleSubmitWeight = async () => {
    try {
      if (weightEntryId) {
        await axios.put(`/api/weights/${weightEntryId}`, data)
      } else {
        await axios.post('/api/weights', data)
      }
      router.replace('/weight')
      router.refresh()
      setData({ weight: null, date: new Date() })
      toast.success(
        `Weight successully ${weightEntryId ? 'updated' : 'added'}!`
      )
    } catch (e: any) {
      if (e.response.data.error) toast.error(e.response.data.error)
      else toast.error('Something went wrong.')
    }
  }

  const handleDeleteWeight = async () => {
    if (!weightEntryId) return
    try {
      await axios.delete(`/api/weights/${weightEntryId}`)
      setOpenDeleteWarning(false)
      toast.success(`Your weight has been removed.`)
      router.replace('/weight')
      router.refresh()
    } catch (e: any) {
      if (e.response.data.error) toast.error(e.response.data.error)
      else toast.error('Something went wrong.')
    }
  }

  return (
    <form
      className="space-y-6 "
      action={async (e) => {
        await handleSubmitWeight()
      }}
    >
      <div className="flex xs:flex-row flex-col gap-3 items-center w-full">
        <div className="w-full">
          <label
            htmlFor="date"
            className=" text-sm font-medium leading-6 flex items-center gap-1.5"
          >
            <MdOutlineCalendarMonth className="inline-block" /> Date
          </label>
          <div className="mt-2">
            <DatePicker
              setData={setData}
              data={data}
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="weight"
            className="text-sm font-medium leading-6 flex items-center gap-1.5"
          >
            Weight (lbs.)
          </label>
          <div className="mt-2">
            <input
              id="weight"
              name="weight"
              type="number"
              step="0.1"
              autoComplete="off"
              value={data.weight || ''}
              onChange={(e) =>
                setData({ ...data, weight: parseFloat(e.target.value) })
              }
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          success
          type="submit"
        >
          Submit
        </Button>
        {isEditable && (
          <Button
            type="button"
            danger
            onClick={(e) => {
              e.preventDefault()
              setOpenDeleteWarning(true)
            }}
          >
            Delete
          </Button>
        )}
      </div>
      {isEditable && (
        <DeleteModal
          open={openDeleteWarning}
          setOpen={setOpenDeleteWarning}
          onDelete={handleDeleteWeight}
        />
      )}
    </form>
  )
}
