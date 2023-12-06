'use client'
import { ChangeEvent, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Input from '@/app/components/ui/input'
import Button from '@/app/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { UserHistory } from '@/app/libs/types'

type ExerciseNameChangeFormProps = {
  name: string
  userHistory: UserHistory
}

export default function ExerciseNameChangeForm({
  name,
  userHistory,
}: ExerciseNameChangeFormProps) {
  const [open, setOpen] = useState(false)
  const [currentExerciseName, setCurrentExerciseName] = useState<string>(name)
  const [newExerciseName, setNewExerciseName] = useState<string>('')
  const cancelButtonRef = useRef(null)
  const router = useRouter()

  const handleNameChange = async () => {
    const res = await axios.put(`/api/exercises`, {
      oldExerciseName: currentExerciseName,
      newExerciseName,
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setNewExerciseName(input)
    if (
      userHistory.exercises.includes(input) &&
      input !== currentExerciseName
    ) {
      toast.error(
        `Warning: ${input} already exists. This change will merge the exercise data with existing exercise.`
      )
    }
  }

  const modal = (
    <Transition.Root
      show={open}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form
                  action={async () => {
                    try {
                      await handleNameChange()
                      setOpen(false)
                      setCurrentExerciseName(newExerciseName)
                      setNewExerciseName('')
                      toast.success('Exercise name changed.')
                      router.refresh()
                    } catch (e: any) {
                      if (e.response.data.error)
                        toast.error(e.response.data.error)
                      else toast.error('Something went wrong.')
                    }
                  }}
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Change {currentExerciseName} to...
                        </Dialog.Title>
                        <div className="mt-2">
                          <Input
                            type="text"
                            id="new-exercise-name"
                            value={newExerciseName}
                            placeholder="New Name"
                            onChange={handleChange}
                            className="w-full sm:w-[300px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:gap-2 sm:px-6">
                    <Button
                      type="button"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                      className="sm:mt-0 mt-2 sm:w-auto w-full"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      danger
                      success
                      className="sm:mt-0 mt-2 sm:w-auto w-full"
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )

  return (
    <Fragment>
      <h5 className="font-semibold mb-4">{currentExerciseName}</h5>
      <div className="mb-4 -mt-4">
        <button
          type="button"
          className="text-sm text-gray-500 underline"
          onClick={() => setOpen(true)}
        >
          Change name -&gt;
        </button>
      </div>
      {modal}
    </Fragment>
  )
}

{
  /* <form
hidden={!open}
className="mt-4"
>
<Label htmlFor="new-exercise-name">New Name</Label>
<Input
  type="text"
  id="new-exercise-name"
  value={newExerciseName}
  onChange={(e) => setNewExerciseName(e.target.value)}
  className="max-w-[250px] mb-4"
/>
</form> */
}

{
  /* <div className="bg-white pb-4 pt-5 sm:p-6 sm:pb-4">
<div className="sm:flex sm:items-start">
  <div className="mt-3 text-center sm:mt-0 sm:text-left">
    <form className="px-4 sm:px-0">
      <Label htmlFor="new-exercise-name">
        Change {name} to...
      </Label>
      <Input
        type="text"
        id="new-exercise-name"
        value={newExerciseName}
        placeholder="New Name"
        onChange={(e) => setNewExerciseName(e.target.value)}
        className="max-w-[300px] mt-2"
      />
    </form>
  </div>
</div>
</div>
<div className="bg-gray-50 px-4 py-3 sm:flex sm:gap-2 sm:px-6">
<Button
  type="submit"
  success
  className="sm:mt-0 mt-2 sm:w-auto w-full"
>
  Save
</Button>

<Button
  type="button"
  onClick={() => setOpen(false)}
  ref={cancelButtonRef}
  className="sm:mt-0 mt-2 sm:w-auto w-full"
>
  Cancel
</Button>
</div> */
}
