import { Skeleton } from 'primereact/skeleton'

import React from 'react'

export default function DashboardSkeleton() {
  return (
    <div>
      <h1 className="text-3xl md:text-left font-extrabold text-center">
        Dashboard
      </h1>
      <Skeleton
        width="10rem"
        className="mt-1 lg:mb-11"
      ></Skeleton>
      <ul className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-2 lg:mt-0 mt-6 gap-4 mb-4">
        {Array(6)
          .fill(0)
          .map((_, index) => {
            return (
              <li
                key={index}
                className="bg-white border border-gray-200 py-4 px-2 rounded-lg flex flex-col items-center "
              >
                <Skeleton
                  width="3rem"
                  height="3rem"
                  className="rounded-full mb-5 p-3"
                ></Skeleton>
                <Skeleton
                  width="3rem"
                  className="mb-2"
                ></Skeleton>
                <Skeleton
                  width="5rem"
                  className="mb-1.5"
                ></Skeleton>
                <Skeleton
                  width="5rem"
                  className="mt-6"
                ></Skeleton>
              </li>
            )
          })}
      </ul>
      <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
        {Array(4)
          .fill(0)
          .map((_, index) => {
            return (
              <div
                className="bg-white border border-gray-200 p-4 rounded-lg"
                key={index}
              >
                <Skeleton
                  className="mb-4"
                  width="30%"
                ></Skeleton>
                <Skeleton
                  className="w-full"
                  height="16.4rem"
                ></Skeleton>
              </div>
            )
          })}
      </div>
    </div>
  )
}
