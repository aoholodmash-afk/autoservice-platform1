import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      vehicle: {
        id: 'demo-vehicle',
        licensePlate: body.licensePlate || 'А123ВС777',
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
