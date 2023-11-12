'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-hot-toast'
import { HiPlus } from 'react-icons/hi'
import { FiLogOut, FiLogIn } from 'react-icons/fi'
import { BsPersonFillAdd } from 'react-icons/bs'
import { useNavContext } from '../context/NavContext'

export default function NavbarAuthButtons({ session }: any) {
  const { setIsNavExpanded } = useNavContext()
  const logoutButton = (
    <>
      <Link
        href="/workouts/new"
        className="text-gray-200  font-medium text-[.95rem] px-5 py-2 transition-all rounded-lg cursor-pointer lg:bg-gray-800 hover:scale-105 hidden  lg:flex items-center gap-1"
        onClick={() => setIsNavExpanded(false)}
      >
        New Workout <HiPlus className="inline-block" />
      </Link>
      <button
        className="text-gray-200 font-medium text-[.95rem] px-5 py-2 transition-all rounded-lg cursor-pointer hover:bg-blue-500 hover:text-gray-100 text-left"
        onClick={async () => {
          setIsNavExpanded(false)
          await signOut()
        }}
      >
        Log out <FiLogOut className="inline-block ml-1 text-lg" />
      </button>
    </>
  )

  const loggedOutButtons = (
    <>
      <Link
        href="/register"
        className="text-gray-200 lg:text-gray-950 font-medium text-[.95rem] px-5 py-2 transition-all rounded-lg cursor-pointer lg:bg-blue-200 hover:bg-blue-300 lg:hover:scale-105"
        onClick={() => setIsNavExpanded(false)}
      >
        Sign up <BsPersonFillAdd className="inline-block ml-1 text-lg" />
      </Link>
      <Link
        href="/login"
        className="text-gray-200 font-medium text-[.95rem] px-5 py-2 transition-all rounded-lg cursor-pointer hover:bg-blue-500 hover:text-gray-100"
        onClick={() => setIsNavExpanded(false)}
      >
        Sign in <FiLogIn className="inline-block ml-1 text-lg" />
      </Link>
    </>
  )
  return (
    <div className="flex flex-col lg:flex-row gap-2 px-2 py-5 lg:py-0">
      {session ? logoutButton : loggedOutButtons}
    </div>
  )
}
