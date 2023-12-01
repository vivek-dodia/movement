import React from 'react'

type InputProps = {
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ className, ...rest }: InputProps) {
  return (
    <>
      <input
        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${className}`}
        onWheel={(e) => e.currentTarget.blur()}
        {...rest}
      />
    </>
  )
}
