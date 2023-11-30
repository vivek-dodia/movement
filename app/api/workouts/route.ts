import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'
import { validateExercises } from '@/app/helpers/api-helpers'
import { getSession } from '@/app/helpers/get-session'
import { Session } from '@/app/libs/types'

export async function POST(request: Request) {
  var { name, date, location, notes, exercises } = await request.json()

  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    exercises = validateExercises(exercises)
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
      id: session.user.id,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'Could not find user.' }, { status: 401 })
  }

  const workout = await prisma.workout.create({
    data: {
      name: name.trim(),
      date,
      location: location?.trim(),
      notes,
      exercises,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  return NextResponse.json(workout)
}
