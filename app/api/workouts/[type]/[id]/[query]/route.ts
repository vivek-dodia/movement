import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../libs/prismadb'
import { Exercises, Workout } from '@/app/libs/types'
import { WorkoutInDb } from '@/app/libs/types'

const filterExerciseNames = (
  workouts: Array<WorkoutInDb>,
  query: string
): string[] => {
  const set = new Set<string>()
  workouts.forEach((workout: WorkoutInDb) => {
    workout.exercises.forEach((exercise) => {
      if (exercise.name.toLowerCase().startsWith(query.toLowerCase()))
        set.add(exercise.name)
    })
  })

  return Array.from(set)
}

export async function GET(
  req: NextRequest,
  { params }: { params: { type: string; id: string; query: string } }
) {
  const { id, type, query } = params

  const modifiedQuery = query.replace(/[()]/g, '\\$&')

  let res = []

  if (type === 'exercise-name') {
    res = await prisma.workout.findMany({
      where: {
        userId: id,
      },
    })
    res = filterExerciseNames(res, query)
  } else {
    res = await prisma.workout.findMany({
      where: {
        userId: id,
        [type]: {
          startsWith: modifiedQuery,
          mode: 'insensitive',
        },
      },
      distinct: [type],
    })
  }

  const val = res.map((workout: Workout) => {
    if (type === 'name') return workout.name
    else if (type === 'location') return workout.location
  })

  return NextResponse.json(type === 'exercise-name' ? res : val)
}
