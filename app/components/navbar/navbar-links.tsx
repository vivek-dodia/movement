'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useNavContext } from '../../context/NavContext'

const navigationOptions = [
  { name: 'Workouts', href: '/workouts', active: false },
  { name: 'Exercises', href: '/exercises', active: false },
  { name: 'Weight', href: '/weight', active: false },
] as const

type SectionNames = (typeof navigationOptions)[number]['name'] // 'Dashboard' | 'Workouts' | 'Diary' | 'Locations'

export default function NavbarLinks() {
  const [activeSection, setActiveSection] = useState<SectionNames | null>(null)
  const { setIsNavExpanded } = useNavContext()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/exercises') {
      setActiveSection('Exercises')
    } else if (pathname === '/workouts') {
      setActiveSection('Workouts')
    } else if (pathname === '/weight') {
      setActiveSection('Weight')
    } else {
      setActiveSection(null)
    }
  }, [])

  return (
    <ul className=" gap-2 flex flex-col border-b lg:px-0 border-b-gray-50/10 pb-5  lg:flex-row lg:gap-2 lg:ml-4 lg:border-none lg:py-0">
      {navigationOptions.map((option, i) => {
        return (
          <Link
            href={option.href}
            key={option.href}
            onClick={() => {
              setActiveSection(option.name)
              setIsNavExpanded(false)
            }}
            className="relative"
          >
            <li
              className={`text-gray-200 font-medium text-[.95rem] py-2 transition-all  cursor-pointer z-[1] relative mx-2 rounded-md lg:mx-0  px-3  ${
                activeSection === option.name
                  ? ' text-gray-50'
                  : '  hover:bg-blue-500 '
              }`}
            >
              {option.name}
              {option.name === activeSection && (
                <motion.span
                  layoutId="activeSection"
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                  }}
                  className=" rounded-md bg-blue-700  absolute inset-0 -z-10"
                ></motion.span>
              )}
            </li>
          </Link>
        )
      })}
    </ul>
  )
}
