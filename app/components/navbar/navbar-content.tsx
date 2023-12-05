'use client'
import React from 'react'
import { GiWeightLiftingUp } from 'react-icons/gi'
import Link from 'next/link'
import NavbarLinks from './navbar-links'
import NavbarAuthButtons from './navbar-auth'
import NavMobileButton from './navbar-mobile-dropdown'
import { useNavContext } from '../../context/NavContext'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

type NavContentProps = {
  session: any
}

export default function NavContent({ session }: NavContentProps) {
  const { isNavExpanded, setIsNavExpanded } = useNavContext()
  const pathname = usePathname()

  return (
    <nav
      className={` className="z-[999] w-full  lg:flex lg:justify-center overflow-y-hidden ${
        pathname === '/' ? '' : 'border-b border-gray-100'
      } ${isNavExpanded ? 'flex-col' : ''}`}
    >
      <div
        className={`flex gap-4 max-w-[1100px] w-full items-center px-5 h-[4.5rem] xl:px-0 `}
      >
        <Link
          href="/"
          className="font-bold text-blue-600 flex items-center gap-2 text-xl py-2"
          onClick={() => {
            if (isNavExpanded) setIsNavExpanded(false)
          }}
        >
          Movement
          <GiWeightLiftingUp className="text-2xl" />
        </Link>

        <div className="hidden lg:flex lg:justify-between lg:w-full">
          {session && <NavbarLinks />}
          <NavbarAuthButtons session={session} />
        </div>

        <NavMobileButton />
      </div>
      {
        <motion.div
          className={`flex flex-col  lg:hidden`}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isNavExpanded ? 'auto' : 0,
            opacity: isNavExpanded ? 1 : 0,
          }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {
            <>
              {session && <NavbarLinks />}
              <NavbarAuthButtons session={session} />
            </>
          }
        </motion.div>
      }
    </nav>
  )
}
