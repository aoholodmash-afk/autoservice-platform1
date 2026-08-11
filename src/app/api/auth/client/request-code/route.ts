import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    console.log(`[DEV] SMS code for ${body.phone}: ${code}`)
    return NextResponse.json({ message: 'Код отправлен', expiresIn: 600, devCode: code })
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
