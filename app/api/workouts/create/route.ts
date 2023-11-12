import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  const auth = request.headers.get('Authorization')

  console.log(data, auth)

  return NextResponse.json(data)
}
