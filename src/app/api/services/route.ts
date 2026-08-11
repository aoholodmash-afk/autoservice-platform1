import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const services = await prisma.autoService.findMany({
      where: { isActive: true },
      select: { id: true, name: true, slug: true, city: true, address: true, phone: true, description: true },
    })
    return NextResponse.json(services)
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
