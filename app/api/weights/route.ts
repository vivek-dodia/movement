import { getSession } from '@/app/helpers/get-session'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'
import { Session } from '@/app/libs/types'

export async function POST(request: NextRequest) {
  const { weight, date } = await request.json()

  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  if (!weight) {
    return NextResponse.json({ error: 'Weight is required' }, { status: 400 })
  }

  if (!date) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 })
  }

  const userId = session.user.id

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  try {
    const weightEntry = await prisma.weightEntry.create({
      data: {
        weight,
        date,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })
    return NextResponse.json(weightEntry)
  } catch (e) {
    return NextResponse.json(
      { error: 'Could not create weight entry.' },
      { status: 401 }
    )
  }
}
