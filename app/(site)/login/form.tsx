'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { handleLogin } from '@/app/helpers/login-user'
import Button from '@/app/components/ui/button'
import { toast } from 'react-hot-toast'

export default function LoginForm() {
  const router = useRouter()
  const [data, setData] = useState({ email: '', password: '' })

  return (
    <form
      className="space-y-6"
      action={async () => {
        try {
          await handleLogin(data, router)
        } catch (e) {
          toast.error('Something went wrong.')
        }
      }}
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
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
            className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <Button type="submit">Log in</Button>
      </div>
    </form>
  )
}
