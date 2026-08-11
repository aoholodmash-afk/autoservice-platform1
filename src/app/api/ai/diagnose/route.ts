import { NextResponse } from 'next/server'
import { diagnoseSymptom } from '@/lib/ai'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { description, vehicleBrand, vehicleModel } = body

    if (!description || description.trim().length < 5) {
      return NextResponse.json({ error: 'Опишите проблему подробнее (минимум 5 символов)' }, { status: 400 })
    }

    const result = diagnoseSymptom(description, vehicleBrand, vehicleModel)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Ошибка обработки запроса' }, { status: 500 })
  }
}
