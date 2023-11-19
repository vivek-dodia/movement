import { NextResponse } from 'next/server'
import prisma from '../../../libs/prismadb'
import { validateExercises } from '@/app/helpers/api-helpers'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(request: Request) {
  const { name, date, location, notes, exercises } = await request.json()

  const session = await getServerSession(authOptions as any)

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    validateExercises(exercises)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  if (!exercises || exercises.length === 0) {
    return NextResponse.json(
      { error: 'Exercises are required' },
      { status: 400 }
    )
  }

  const user = await prisma.user.findUnique({
    where: {
      id: (session as any)?.user.id,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'Could not find user.' }, { status: 401 })
  }

  const workout = await prisma.workout.create({
    data: {
      name,
      date,
      location,
      notes,
      exercises,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  return NextResponse.json(null)
}
