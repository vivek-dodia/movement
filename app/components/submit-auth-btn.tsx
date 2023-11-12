'use client'

import { useFormStatus } from 'react-dom'

type SubmitAuthButtonProps = {
  children: React.ReactNode
}

export default function SubmitAuthButton({ children }: SubmitAuthButtonProps) {
  const { pending } = useFormStatus() // must use useFormStatus() as a child od a form element using a server action
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full justify-center transition-all rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-50 shadow-sm disabled:bg-blue-300 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.99]"
    >
      {pending ? (
        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        children
      )}
    </button>
  )
}
