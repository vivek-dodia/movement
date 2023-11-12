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
    throw new Error('Email already linked to an account.')
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
    return NextResponse.json(user)
  } catch (e) {
    return new NextResponse('Something went wrong.', { status: 404 })
  }
}
