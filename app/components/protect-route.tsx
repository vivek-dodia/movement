'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { GiWeightLiftingUp } from 'react-icons/gi'
import { PiArrowRightBold } from 'react-icons/pi'

export default function ProtectRoute({
  message,
  logout,
  workout,
}: {
  message: string
  logout?: boolean
  workout?: boolean
}) {
  return (
    <section className="w-ull flex flex-col items-center justify-center">
      <GiWeightLiftingUp className="text-blue-600 text-5xl inline-block mb-10" />
      <h3 className=" text-xl font-bold leading-9 tracking-tight mb-4">
        {message}
      </h3>
      <p>
        {logout ? (
          <>
            <button
              className="font-semibold hover:underline text-blue-600 "
              onClick={async (e) => {
                await signOut({ callbackUrl: '/login' })
              }}
            >
              Log out
            </button>
            .
          </>
        ) : workout ? (
          <Link
            className="font-semibold hover:underline text-blue-600 "
            href="/new"
          >
            Add a workout
            <PiArrowRightBold className="inline-block font-bold ml-2" />
          </Link>
        ) : (
          <>
            <Link
              className="font-semibold hover:underline text-blue-600 "
              href="/login"
            >
              Log in
            </Link>{' '}
            or{' '}
            <Link
              className="font-semibold hover:underline text-blue-600"
              href="/register"
            >
              Register
            </Link>
            .
          </>
        )}
      </p>
    </section>
  )
}
