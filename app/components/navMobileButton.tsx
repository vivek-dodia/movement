'use client'

import React from 'react'
import { FaBars, FaXmark } from 'react-icons/fa6'
import { useNavContext } from '../context/NavContext'

export default function NavMobileButton() {
  const { isNavExpanded, setIsNavExpanded } = useNavContext()

  return (
    <>
      <button
        className="block ml-auto lg:hidden"
        onClick={() => setIsNavExpanded(!isNavExpanded)}
      >
        {isNavExpanded ? (
          <FaXmark className="text-2xl text-gray-50" />
        ) : (
          <FaBars className="text-2xl text-gray-50" />
        )}
      </button>
    </>
  )
}
