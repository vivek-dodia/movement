import { getSession } from '@/app/helpers/get-session'
import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import { WorkoutInDb } from '@/app/libs/types'

export async function PUT(request: Request) {
  console.log('here')
  const data = await request.json()

  const session = await getSession()

  if (!session) {
    return NextResponse.json(
      { error: 'You must be logged in.' },
      { status: 401 }
    )
  }

  const userId = session.user.id

  console.log(data)

  const { newExerciseName, oldExerciseName } = data

  if (!newExerciseName || !oldExerciseName) {
    return NextResponse.json({ error: 'Missing Fields.' }, { status: 400 })
  }

  try {
    const workouts = await prisma.workout.findMany({
      where: {
        userId,
      },
    })

    console.log('past workouts')

    const updatedWorkouts = await Promise.all(
      workouts.map(async (workout: WorkoutInDb) => {
        const hasOldExercise = workout.exercises.some((exercise) => {
          return exercise.name === oldExerciseName
        })

        if (hasOldExercise) {
          return prisma.workout.update({
            where: {
              id: workout.id,
            },
            data: {
              exercises: workout.exercises.map((exercise) => {
                if (exercise.name === oldExerciseName) {
                  return {
                    ...exercise,
                    name: newExerciseName,
                  }
                }
                return exercise
              }),
            },
          })
        }

        return workout
      })
    )
    console.log(updatedWorkouts)
    return NextResponse.json(updatedWorkouts)
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  } finally {
    prisma.$disconnect()
  }
}
