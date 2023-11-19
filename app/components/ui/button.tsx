import React from 'react'
import { useFormStatus } from 'react-dom'

type ButtonProps = {
  children: React.ReactNode
  success?: boolean
  danger?: boolean
  pill?: boolean
  text?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  children,
  success,
  danger,
  pill,
  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      className={`py-2 min-w-[6rem] px-5 flex justify-center items-center gap-1 transition-all text-gray-50 hover:brightness-105 hover:scale-105 active:scale-95 ${
        pill ? 'rounded-full' : 'rounded-md'
      } ${success ? 'bg-green-500' : danger ? 'bg-red-500' : 'bg-blue-500'}`}
      disabled={pending}
      {...rest}
    >
      {pending ? (
        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        children
      )}
    </button>
  )
}
