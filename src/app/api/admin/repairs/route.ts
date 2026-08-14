import { NextResponse } from 'next/server'
import { REPAIRS } from '@/data/repairs'

// Хранилище изменённых цен (в памяти — для демо)
const priceOverrides: Record<string, number> = {}

export async function GET() {
  const repairsWithPrices = REPAIRS.map(r => ({
    id: r.id,
    modelId: r.modelId,
    category: r.category,
    name: r.name,
    laborPrice: priceOverrides[r.id] ?? r.laborPrice,
    originalPrice: r.laborPrice,
  }))
  return NextResponse.json(repairsWithPrices)
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, laborPrice } = body

    if (!id || laborPrice === undefined) {
      return NextResponse.json({ error: 'id и laborPrice обязательны' }, { status: 400 })
    }

    const repair = REPAIRS.find(r => r.id === id)
    if (!repair) {
      return NextResponse.json({ error: 'Ремонт не найден' }, { status: 404 })
    }

    priceOverrides[id] = laborPrice

    return NextResponse.json({
      id,
      laborPrice,
      message: 'Цена обновлена',
    })
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
  }
}
