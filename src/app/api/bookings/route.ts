import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      id: 'demo-' + Date.now(),
      clientName: body.clientName,
      clientPhone: body.clientPhone,
      serviceName: body.serviceName,
      desiredDate: body.desiredDate,
      desiredTime: body.desiredTime,
      status: 'PENDING',
      message: 'Заявка принята!',
    })
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
