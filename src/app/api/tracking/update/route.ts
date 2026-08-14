import { NextResponse } from 'next/server'
import { MOCK_ORDERS, TrackingStatus } from '@/data/tracking'

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { orderId, status, comment } = body

    if (!orderId || !status) {
      return NextResponse.json({ error: 'orderId и status обязательны' }, { status: 400 })
    }

    const order = MOCK_ORDERS.find(o => o.id === orderId)
    if (!order) {
      return NextResponse.json({ error: 'Заказ не найден' }, { status: 404 })
    }

    // Обновляем статус (в реальном приложении — в БД)
    order.status = status as TrackingStatus
    order.statusHistory.push({
      status: status as TrackingStatus,
      timestamp: new Date().toISOString(),
      comment: comment || undefined,
    })
    order.updatedAt = new Date().toISOString()

    return NextResponse.json({
      id: order.id,
      status: order.status,
      message: 'Статус обновлён',
    })
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
