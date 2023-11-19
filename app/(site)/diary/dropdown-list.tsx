'use client'

import { WorkoutInDb } from '@/app/libs/types'
import React, { Fragment } from 'react'
import { PiCaretDownBold } from 'react-icons/pi'

type DropdownListProps = {
  children: React.ReactNode
  setList: React.Dispatch<React.SetStateAction<Array<WorkoutInDb>>>
  options: Array<string>
}

export default function DropdownList({
  children,
  setList,
  options,
}: DropdownListProps) {
  const renderedOptions = (
    <ul>
      {options.map((option) => {
        return (
          <li key={option}>
            <button> {option} </button>
          </li>
        )
      })}
    </ul>
  )

  return (
    <Fragment>
      <li className="inline">
        <button className="px-1 xs:px-4 py-2 rounded-md hover:bg-blue-100 transition-all">
          {children} <PiCaretDownBold className="inline-block text-sm" />
        </button>
      </li>
      <div className="border bg-gray-50 absolute z-10 right-0 left-0 w-full rounded-md py-5 px-3 mt-[2px]">
        {renderedOptions}
      </div>
    </Fragment>
  )
}
