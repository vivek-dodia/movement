'use client'
import { signIn } from 'next-auth/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { toast } from 'react-hot-toast'

type loginUserType = {
  email: string
  password: string
}

export const handleLogin = async (
  data: loginUserType,
  router: AppRouterInstance
) => {
  try {
    await signIn('credentials', { ...data, redirect: false }).then(
      (callback) => {
        if (callback?.error) {
          toast.error(callback.error)
        } else if (callback?.ok) {
          router.refresh()
          toast.success('Welcome back!')
          router.push('/')
        }
      }
    )
  } catch (e) {
    console.log(e)
  }
}
