import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const plate = searchParams.get('plate')

    if (!slug || !plate) return NextResponse.json({ error: 'slug и plate обязательны' }, { status: 400 })

    const service = await prisma.autoService.findUnique({ where: { slug } })
    if (!service) return NextResponse.json({ error: 'Автосервис не найден' }, { status: 404 })

    const vehicle = await prisma.vehicle.findFirst({
      where: { licensePlate: plate.toUpperCase().replace(/\s/g, ''), autoServiceId: service.id },
      include: {
        workOrders: {
          where: { status: 'COMPLETED' },
          include: { workItems: true, parts: true, photos: true },
          orderBy: { completedAt: 'desc' },
        },
      },
    })

    if (!vehicle) return NextResponse.json({ error: 'Автомобиль не найден' }, { status: 404 })
    return NextResponse.json(vehicle)
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
