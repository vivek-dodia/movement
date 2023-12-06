'use client'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import DatePicker from '@/app/components/ui/date-picker'
import { useState } from 'react'
import Button from '@/app/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { WeightEntries } from '@/app/libs/types'
import DeleteModal from '@/app/components/ui/delete-modal'
import { GiWeightScale } from 'react-icons/gi'
import Label from '@/app/components/ui/label'
import Input from '@/app/components/ui/input'

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
      action={async () => {
        await handleSubmitWeight()
      }}
    >
      <div className="flex xs:flex-row flex-col gap-3 items-center w-full">
        <div className="w-full">
          <Label htmlFor="date">
            <MdOutlineCalendarMonth className="inline-block" /> Date
          </Label>
          <div className="mt-2">
            <DatePicker
              setData={setData}
              data={data}
            />
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor="weight">
            <GiWeightScale className="inline-block" />
            Weight (lbs.)
          </Label>
          <div className="mt-2">
            <Input
              id="weight"
              name="weight"
              type="number"
              step="0.1"
              min={0}
              autoComplete="off"
              value={data.weight || ''}
              onChange={(e) =>
                setData({ ...data, weight: parseFloat(e.target.value) })
              }
              required
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
          head="Delete Weight Entry"
          body="Are you sure you want to delete this weight entry? This action cannot be reversed."
          onDelete={handleDeleteWeight}
        />
      )}
    </form>
  )
}
