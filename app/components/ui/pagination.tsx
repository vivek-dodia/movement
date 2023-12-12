'use client'

import WorkoutsList from '@/app/(pages)/workouts/workouts-list'
import { WorkoutInDb } from '@/app/libs/types'
import React, { Fragment } from 'react'
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi'

type PaginationProps = {
  list: WorkoutInDb[] | string[] // or other future list
  displayed: number
  container: React.RefObject<HTMLDivElement>
  type: 'workouts' | 'exercises'
  indicies: {
    start: number
    end: number
  }
  setIndicies: React.Dispatch<
    React.SetStateAction<{
      start: number
      end: number
    }>
  >
}

export default function PaginatedList({
  list,
  displayed,
  indicies,
  setIndicies,
  container,
}: PaginationProps) {
  const activePage = indicies.end / displayed

  let newList = list.slice(indicies.start, indicies.end)

  const totalPages = Math.ceil(list.length / displayed)

  const handlePageSelection = (page: number) => {
    setIndicies({
      start: (page - 1) * displayed,
      end: (page - 1) * displayed + displayed,
    })

    if (container.current) {
      const scrollPosition = container.current.offsetTop - 35
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      })
    }
  }

  let backDots = false
  let frontDots = false

  const renderedPageCount = (
    <div className="flex gap-2">
      {Array(totalPages)
        .fill(0)
        .map((_, index: number) => {
          const page = index + 1
          if (page !== 1 && activePage - 1 > page) {
            if (!backDots) {
              backDots = true
              return <span key={index}>...</span>
            } else return
          } else if (page !== totalPages && activePage + 1 < page) {
            if (!frontDots) {
              frontDots = true
              return <span key={index}>...</span>
            } else return
          }

          return (
            <button
              key={index}
              className={` px-3 py-1 rounded-full  hover:bg-gray-200 transition-all ${
                activePage === page ? 'bg-white border border-gray-200' : ''
              }`}
              onClick={() => handlePageSelection(page)}
            >
              {page}
            </button>
          )
        })}
    </div>
  )

  return (
    <Fragment>
      <WorkoutsList workouts={newList as WorkoutInDb[]} />
      {list.length > displayed && (
        <div className="w-full flex justify-center gap-5 mt-10 px-2">
          <button
            hidden={activePage === 1}
            className="rounded-full px-2 py-1 hover:bg-gray-200"
            onClick={() => handlePageSelection(activePage - 1)}
          >
            <PiCaretLeftBold className="inline-block" />
          </button>
          {renderedPageCount}
          <button
            hidden={activePage === totalPages}
            className="rounded-full px-2 py-1 hover:bg-gray-200 transition-all"
            onClick={() => handlePageSelection(activePage + 1)}
          >
            <PiCaretRightBold className="inline-block" />
          </button>
        </div>
      )}
    </Fragment>
  )
}
