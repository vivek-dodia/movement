'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SubmitAuthButton from '@/app/components/submit-auth-btn'
import GoogleAuthButton from '@/app/components/googleAuth'
import { handleLogin } from '@/app/actions/loginUser'
import { GiWeightLiftingUp } from 'react-icons/gi'

export default function Login() {
  const router = useRouter()
  const [data, setData] = useState({ email: '', password: '' })

  return (
    <>
      <section className="flex min-h-full flex-1 flex-col justify-center py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <GiWeightLiftingUp
            style={{
              color: 'rgb(37, 99, 235)',
              fontSize: '3rem',
              textAlign: 'center',
              display: 'inline-block',
            }}
          />

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action={async (e) => {
              await handleLogin(data, router)
            }} // must user server action to utilize formStatus -> refactor w/o state
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                  className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 "
              >
                Password
              </label>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <SubmitAuthButton>Sign in</SubmitAuthButton>
            </div>
          </form>

          <GoogleAuthButton signin />

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link
              href="/register"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Sign up here.
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
