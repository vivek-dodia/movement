import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../libs/prismadb'
import { getSession } from '@/app/helpers/get-session'
import { Session } from '@/app/libs/types'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json(
      { error: 'Workout ID is required' },
      { status: 400 }
    )
  }

  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const userId = session.user.id

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const deletedWeightEntry = await prisma.weightEntry.delete({
      where: {
        id,
      },
    })
    return NextResponse.json(deletedWeightEntry)
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { weight, date } = await req.json()
  const { id } = params

  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const userId = session.user.id

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  if (!weight) {
    return NextResponse.json({ error: 'Weight is required' }, { status: 400 })
  }

  if (!date) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 })
  }

  try {
    const updatedWeightEntry = await prisma.weightEntry.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        weight,
        date,
      },
    })
    return NextResponse.json(updatedWeightEntry)
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 })
  }
}
