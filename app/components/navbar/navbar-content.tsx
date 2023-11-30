'use client'
import React from 'react'
import { GiWeightLiftingUp } from 'react-icons/gi'
import Link from 'next/link'
import NavbarLinks from './navbar-links'
import NavbarAuthButtons from './navbar-auth'
import NavMobileButton from './navbar-mobile-dropdown'
import { useNavContext } from '../../context/NavContext'
import { motion } from 'framer-motion'

type NavContentProps = {
  session: any
}

export default function NavContent({ session }: NavContentProps) {
  const { isNavExpanded } = useNavContext()

  return (
    <nav
      className={` className="z-[999] w-full bg-blue-600 lg:flex lg:justify-center overflow-y-hidden ${
        isNavExpanded ? 'flex-col' : ''
      }`}
    >
      <div
        className={`flex gap-4 max-w-[1100px] w-full items-center px-5 h-[4.5rem] xl:px-0 `}
      >
        <Link href="/">
          <GiWeightLiftingUp
            style={{
              color: 'rgb(249, 250, 251)',
              fontSize: '2.25rem',
            }}
          />
        </Link>

        <div className="hidden lg:flex lg:justify-between lg:w-full">
          <NavbarLinks />
          <NavbarAuthButtons session={session} />
        </div>

        <NavMobileButton />
      </div>
      {
        <motion.div
          className={`flex flex-col bg-blue-600 lg:hidden`}
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
              <NavbarLinks />
              <NavbarAuthButtons session={session} />
            </>
          }
        </motion.div>
      }
    </nav>
  )
}
