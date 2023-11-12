import React from 'react'

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
  return (
    <button
      {...rest}
      className={`px-5 py-2 transition-all text-gray-50 hover:brightness-105 hover:scale-105 active:scale-95 ${
        pill ? 'rounded-full' : 'rounded-md'
      } ${success ? 'bg-green-500' : danger ? 'bg-red-500' : 'bg-blue-500'}`}
    >
      {children}
    </button>
  )
}
