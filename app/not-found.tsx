import { GiWeightLiftingUp } from 'react-icons/gi'
import Link from 'next/link'

const links = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'Workouts',
    href: '/workouts',
  },
  {
    text: 'New Workout',
    href: '/workouts/new',
  },
  {
    text: 'Exercises',
    href: '/exercises',
  },
  {
    text: 'Weight',
    href: '/weight',
  },

  {
    text: 'Register',
    href: '/register',
  },
  {
    text: 'Login',
    href: '/login',
  },
  {
    text: 'Logout',
    href: '/logout',
  },
]

export default function NotFound() {
  return (
    <section className="w-ull flex flex-col items-center justify-center">
      <GiWeightLiftingUp className="text-blue-600 text-5xl inline-block mb-10" />
      <h3 className=" text-xl font-bold leading-9 tracking-tight mb-4">
        404 - Page Not Found
      </h3>
      <p className="mb-6">Looking for any of these?</p>
      <div className="flex flex-col gap-2 text-center">
        {links.map((link) => {
          return (
            <Link
              href={link.href}
              key={link.href}
              className="font-semibold hover:underline text-blue-600"
            >
              {link.text}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
