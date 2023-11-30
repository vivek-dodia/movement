import React from 'react'
import { useFormStatus } from 'react-dom'

type ButtonProps = {
  children: React.ReactNode
  success?: boolean
  danger?: boolean
  pill?: boolean
  text?: boolean
  ref?: React.Ref<HTMLButtonElement>
  className?: string
  type?: 'button' | 'submit' | 'reset'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  children,
  success,
  danger,
  pill,
  ref,
  className = '',
  type,
  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      className={`py-2 w-full min-w-[8rem]  px-5 shadow-sm flex text-sm h-full justify-center items-center gap-2 transition-all text-gray-50 font-medium  hover:brightness-105 active:scale-95 ${
        pill ? 'rounded-full' : 'rounded-md'
      } ${
        success ? 'bg-green-600' : danger ? 'bg-red-600' : 'bg-blue-600'
      } ${className}`}
      disabled={pending}
      type={type}
      {...rest}
    >
      {pending && type === 'submit' ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        children
      )}
    </button>
  )
}
