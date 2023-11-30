import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../libs/prismadb'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  let res = []
  try {
    res = await prisma.weightEntry.findMany({
      where: {
        userId: id,
      },
      select: {
        weight: true,
        date: true,
        id: true,
      },
      orderBy: {
        date: 'asc',
      },
    })
  } catch (e) {
    res = []
  }

  prisma.$disconnect()

  return NextResponse.json(res)
}
