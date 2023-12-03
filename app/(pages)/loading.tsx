'use client'

import { FadeLoader } from 'react-spinners'
export default function LoadingSpinner() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center justify-center">
        <FadeLoader
          color="#2563eb"
          width={6}
          speedMultiplier={1.25}
          radius={5}
        />
        <span className="mt-4 mr-2 font-medium text-gray-500 text-center">
          Loading
        </span>
      </div>
    </div>
  )
}
