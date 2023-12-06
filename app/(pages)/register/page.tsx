import GoogleAuthButton from '@/app/components/ui/google-auth'
import Link from 'next/link'
import { GiWeightLiftingUp } from 'react-icons/gi'
import RegisterForm from './form'
import ProtectRoute from '@/app/components/protect-route'
import { getSession } from '@/app/helpers/get-session'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create an account.',
}

export default async function Register() {
  const session = await getSession()

  if (session) {
    return (
      <ProtectRoute
        message="You must log out to make a new account"
        logout
      />
    )
  }

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <GiWeightLiftingUp className="text-blue-600 text-5xl inline-block" />
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm />
        <GoogleAuthButton />

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Log in here.
          </Link>
        </p>
      </div>
    </section>
  )
}
