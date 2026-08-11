import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const service = await prisma.autoService.findUnique({ where: { slug: body.autoServiceSlug } })
    if (!service) return NextResponse.json({ error: 'Автосервис не найден' }, { status: 404 })

    const booking = await prisma.booking.create({
      data: {
        autoServiceId: service.id,
        clientName: body.clientName,
        clientPhone: body.clientPhone,
        clientNotes: body.clientNotes,
        licensePlate: body.licensePlate,
        vehicleBrand: body.vehicleBrand,
        vehicleModel: body.vehicleModel,
        serviceName: body.serviceName,
        desiredDate: new Date(body.desiredDate),
        desiredTime: body.desiredTime,
        status: 'PENDING',
      },
    })

    return NextResponse.json(booking)
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
