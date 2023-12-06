'use client'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/ui/button'
import { handleLogin } from '@/app/helpers/login-user'
import Label from '@/app/components/ui/label'
import { GrMail } from 'react-icons/gr'
import { FaKey, FaUser } from 'react-icons/fa6'
import Input from '@/app/components/ui/input'

export default function RegisterForm() {
  const [data, setData] = useState({ email: '', name: '', password: '' })
  const router = useRouter()

  const registerUser = async () => {
    try {
      await axios.post('/api/register', data)
      const loginData = {
        email: data.email,
        password: data.password,
      }
      await handleLogin(loginData, router)
      router.push('/')
    } catch (e: any) {
      if (e.response.data.error) toast.error(e.response.data.error)
      else toast.error('Something went wrong.')
    }
  }

  return (
    <form
      className="space-y-6"
      action={registerUser}
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
        <Label htmlFor="name">
          <FaUser className="inline-block" />
          Name
        </Label>
        <div className="mt-2">
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="password">
            <FaKey className="inline-block" />
            Password
          </Label>
        </div>
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

      <Button
        type="submit"
        success
      >
        Register
      </Button>
    </form>
  )
}
