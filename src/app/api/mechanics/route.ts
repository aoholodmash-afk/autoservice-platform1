import { NextResponse } from 'next/server'
import { MECHANICS, ASSIGNMENTS, autoAssignAll, WorkOrder } from '@/data/mechanics'

export async function GET() {
  const mechanicsWithOrders = MECHANICS.map(m => ({
    ...m,
    assignments: ASSIGNMENTS.filter(a => a.mechanicId === m.id),
  }))
  return NextResponse.json(mechanicsWithOrders)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === 'auto-assign') {
      const orders: WorkOrder[] = body.orders || []
      const newAssignments = autoAssignAll(orders)
      return NextResponse.json({
        assigned: newAssignments.length,
        assignments: newAssignments,
        message: `Распределено ${newAssignments.length} заказов`,
      })
    }

    return NextResponse.json({ error: 'Неизвестное действие' }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { mechanicId, orderId, assignedBy } = body

    if (!mechanicId || !orderId) {
      return NextResponse.json({ error: 'mechanicId и orderId обязательны' }, { status: 400 })
    }

    const mechanic = MECHANICS.find(m => m.id === mechanicId)
    if (!mechanic) {
      return NextResponse.json({ error: 'Механик не найден' }, { status: 404 })
    }

    if (mechanic.currentOrders >= mechanic.maxOrders) {
      return NextResponse.json({ error: 'Механик загружен' }, { status: 400 })
    }

    // Удаляем старое назначение если есть
    const existingIndex = ASSIGNMENTS.findIndex(a => a.orderId === orderId)
    if (existingIndex >= 0) {
      const oldMechanic = MECHANICS.find(m => m.id === ASSIGNMENTS[existingIndex].mechanicId)
      if (oldMechanic) oldMechanic.currentOrders--
      ASSIGNMENTS.splice(existingIndex, 1)
    }

    const assignment = {
      orderId,
      mechanicId,
      assignedAt: new Date().toISOString(),
      assignedBy: (assignedBy || 'manual') as 'manual' | 'auto',
    }

    ASSIGNMENTS.push(assignment)
    mechanic.currentOrders++

    return NextResponse.json({
      assignment,
      mechanic: { id: mechanic.id, name: mechanic.name, boxNumber: mechanic.boxNumber },
      message: `Заказ назначен: ${mechanic.name} (бокс ${mechanic.boxNumber})`,
    })
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
