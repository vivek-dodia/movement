import bcrypt from 'bcrypt'
import prisma from '../../libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()

  if (!data) return

  const { name, email, password } = data
  if (!name || !email || !password) {
    return new NextResponse('Missing Fields.', { status: 400 })
  }

  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (exists) {
    return new NextResponse('User with this email address already exists.', {
      status: 400,
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    prisma.$disconnect()
    return NextResponse.json(user)
  } catch (e) {
    prisma.$disconnect()
    return new NextResponse('Something went wrong.', { status: 500 })
  }
}
