import { NextResponse } from 'next/server'
import { REPAIRS, findRepairs, findRepairById, searchRepairs } from '@/data/repairs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const modelId = searchParams.get('model')
  const category = searchParams.get('category')
  const q = searchParams.get('q')
  const id = searchParams.get('id')

  if (id) {
    const repair = findRepairById(id)
    if (!repair) return NextResponse.json({ error: 'Ремонт не найден' }, { status: 404 })
    return NextResponse.json(repair)
  }

  if (q) {
    return NextResponse.json(searchRepairs(q))
  }

  if (modelId) {
    return NextResponse.json(findRepairs(modelId, category || undefined))
  }

  return NextResponse.json(REPAIRS)
}
