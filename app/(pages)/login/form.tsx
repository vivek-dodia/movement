'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { handleLogin } from '@/app/helpers/login-user'
import Button from '@/app/components/ui/button'
import { toast } from 'react-hot-toast'
import Label from '@/app/components/ui/label'
import { GrMail } from 'react-icons/gr'
import { FaKey } from 'react-icons/fa6'
import Input from '@/app/components/ui/input'

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
        <Label htmlFor="email">
          <GrMail className="inline-block" />
          Email address
        </Label>
        <div className="mt-2">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="password">
          <FaKey className="inline-block" />
          Password
        </Label>

        <div className="mt-2">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          success
        >
          Log in
        </Button>
      </div>
    </form>
  )
}
