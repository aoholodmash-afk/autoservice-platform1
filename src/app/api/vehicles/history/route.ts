import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const plate = searchParams.get('plate') || 'А123ВС777'

  return NextResponse.json({
    id: 'demo-vehicle',
    licensePlate: plate.toUpperCase(),
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    workOrders: [
      {
        id: 'wo-1',
        number: 'WO-001',
        status: 'COMPLETED',
        totalAmount: 5700,
        completedAt: '2026-07-15T10:00:00Z',
        workItems: [
          { id: '1', name: 'Замена масла двигателя', price: 1500 },
          { id: '2', name: 'Замена масляного фильтра', price: 500 },
        ],
        parts: [
          { id: '1', name: 'Масло 5W-30 4л', price: 2200 },
          { id: '2', name: 'Фильтр масляный', price: 600 },
        ],
      },
      {
        id: 'wo-2',
        number: 'WO-002',
        status: 'COMPLETED',
        totalAmount: 4300,
        completedAt: '2026-06-01T10:00:00Z',
        workItems: [{ id: '3', name: 'Замена тормозных колодок', price: 1500 }],
        parts: [{ id: '3', name: 'Колодки передние', price: 2800 }],
      },
    ],
  })
}
