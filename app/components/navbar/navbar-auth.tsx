'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { HiPlus } from 'react-icons/hi'
import { FiLogOut, FiLogIn } from 'react-icons/fi'
import { BsPersonFillAdd } from 'react-icons/bs'
import { useNavContext } from '../../context/NavContext'
import { usePathname } from 'next/navigation'

export default function NavbarAuthButtons({ session }: any) {
  const { setIsNavExpanded } = useNavContext()
  const pathname = usePathname()
  const logoutButton = (
    <>
      <Link
        href="/workouts/new"
        className="text-gray-200 lg:text-gray-50  font-medium text-[.95rem] px-3 py-2 transition-all lg:rounded-md  rounded-lg cursor-pointer lg:bg-blue-600 hover:scale-105 hidden  lg:flex items-center gap-1"
        onClick={() => setIsNavExpanded(false)}
      >
        New Workout <HiPlus className="inline-block" />
      </Link>
      <button
        className="text-gray-950 font-medium text-[.95rem] px-3 py-2 transition-all rounded-lg cursor-pointer hover:bg-gray-200  text-left"
        onClick={async () => {
          setIsNavExpanded(false)
          await signOut({ callbackUrl: '/' })
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
        className="lg:text-gray-50 text-gray-950 hover:text-gray-50    font-medium text-[.95rem] px-3 py-2 transition-all rounded-lg cursor-pointer lg:hover:scale-105 lg:bg-gray-700 lg:hover:bg-gray-700 hover:bg-blue-600  lg:flex items-center gap-1"
        onClick={() => setIsNavExpanded(false)}
      >
        Register <BsPersonFillAdd className="inline-block ml-1 text-lg" />
      </Link>
      <Link
        href="/login"
        className={`text-gray-950 font-medium text-[.95rem] px-3 py-2 transition-all rounded-lg cursor-pointer  text-left ${
          pathname === '/'
            ? 'hover:bg-blue-600 hover:text-gray-50'
            : 'hover:bg-gray-200'
        }`}
        onClick={() => setIsNavExpanded(false)}
      >
        Log in <FiLogIn className="inline-block ml-1 text-lg" />
      </Link>
    </>
  )
  return (
    <div
      className={`flex lg:ml-auto flex-col lg:flex-row gap-2 lg:py-0 lg:mx-0 mx-2 ${
        session ? 'py-5' : 'py-0'
      }`}
    >
      {session ? logoutButton : loggedOutButtons}
    </div>
  )
}
