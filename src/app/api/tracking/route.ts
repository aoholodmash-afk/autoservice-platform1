import { NextResponse } from 'next/server'
import { MOCK_ORDERS, STATUS_LABELS, STATUS_ORDER } from '@/data/tracking'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const orderId = searchParams.get('id')

  if (token) {
    const order = MOCK_ORDERS.find(o => o.token === token)
    if (!order) {
      return NextResponse.json({ error: 'Заказ не найден. Проверьте ссылку.' }, { status: 404 })
    }
    return NextResponse.json(order)
  }

  if (orderId) {
    const order = MOCK_ORDERS.find(o => o.id === orderId)
    if (!order) {
      return NextResponse.json({ error: 'Заказ не найден' }, { status: 404 })
    }
    return NextResponse.json(order)
  }

  // Возвращаем все заказы (для админа)
  return NextResponse.json(MOCK_ORDERS.map(o => ({
    id: o.id,
    token: o.token,
    clientName: o.clientName,
    vehicle: o.vehicle,
    licensePlate: o.licensePlate,
    serviceName: o.serviceName,
    status: o.status,
    mechanicName: o.mechanicName,
    totalAmount: o.totalAmount,
    updatedAt: o.updatedAt,
  })))
}
