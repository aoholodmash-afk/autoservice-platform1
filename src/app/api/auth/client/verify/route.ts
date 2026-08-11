import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const session = await prisma.authSession.findFirst({
      where: {
        phone: body.phone,
        code: body.code,
        purpose: 'CLIENT_ACCESS',
        isUsed: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!session) return NextResponse.json({ error: 'Неверный код' }, { status: 401 })

    await prisma.authSession.update({ where: { id: session.id }, data: { isUsed: true } })

    const vehicle = await prisma.vehicle.findFirst({ where: { id: session.vehicleId! } })
    if (!vehicle) return NextResponse.json({ error: 'Авто не найдено' }, { status: 404 })

    return NextResponse.json({
      vehicle: {
        id: vehicle.id,
        licensePlate: vehicle.licensePlate,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
