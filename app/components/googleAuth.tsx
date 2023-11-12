'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import google from '../../public/google.png'
import Image from 'next/image'

type GoogleAuthButtonProps = {
  signin?: boolean
}

export default function GoogleAuthButton({ signin }: GoogleAuthButtonProps) {
  return (
    <>
      <div className="flex justify-center items-center mt-8 mb-8 other-option">
        <span className="text-xs text-medium text-gray-500">{`Or ${
          signin ? 'sign in ' : 'sign up '
        } with`}</span>
      </div>
      <button
        onClick={async () => {
          await signIn('google', { callbackUrl: 'http://localhost:3000' })
        }}
        className="flex gap-2 items-center w-full justify-center transition-all rounded-md bg-white ring-1 ring-inset ring-gray-300 px-3 py-1.5 text-sm font-medium leading-6 text-gray-950 shadow-sm disabled:bg-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.99]"
      >
        <Image
          src={google}
          alt="Google logo"
          height={20}
          width={20}
        />
        Google
      </button>
    </>
  )
}
