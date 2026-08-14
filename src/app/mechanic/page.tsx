'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

interface Mechanic {
  id: string
  name: string
  phone: string
  boxNumber: number
  specializations: string[]
  skills: string[]
  maxOrders: number
  currentOrders: number
  rating: number
  isActive: boolean
  stats: {
    totalOrders: number
    completedOrders: number
    avgCompletionTime: number
    avgRating: number
    specialization: string
  }
  assignments: any[]
}

const CATEGORY_LABELS: Record<string, string> = {
  to: 'ТО', brakes: 'Тормоза', clutch: 'Сцепление', suspension: 'Подвеска',
  engine: 'Двигатель', electrical: 'Электрика', steering: 'Рулевое',
  cooling: 'Охлаждение', exhaust: 'Выхлоп', body: 'Кузов',
}

export default function MechanicPage() {
  const searchParams = useSearchParams()
  const mechanicId = searchParams.get('id')

  const [mechanics, setMechanics] = useState<Mechanic[]>([])
  const [selected, setSelected] = useState<Mechanic | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMechanics()
  }, [])

  useEffect(() => {
    if (mechanicId && mechanics.length > 0) {
      const m = mechanics.find(m => m.id === mechanicId)
      if (m) setSelected(m)
    }
  }, [mechanicId, mechanics])

  const loadMechanics = async () => {
    try {
      const res = await fetch('/api/mechanics')
      const data = await res.json()
      setMechanics(data)
      if (!mechanicId && data.length > 0) {
        setSelected(data[0])
      }
    } catch {} finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/admin" className="text-2xl">🔧</a>
            <div>
              <h1 className="text-lg font-bold">Механики</h1>
              <p className="text-xs text-gray-400">Управление персоналом и боксами</p>
            </div>
          </div>
          <a href="/admin" className="text-sm text-blue-600 hover:underline">← Админ-панель</a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Список механиков (sidebar) */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-semibold">Боксы</h2>
            </div>
            <div className="divide-y">
              {mechanics.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m)}
                  className={`w-full p-4 text-left hover:bg-blue-50 transition-colors ${
                    selected?.id === m.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${
                      m.currentOrders >= m.maxOrders
                        ? 'bg-red-100 text-red-600'
                        : m.currentOrders > 0
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {m.boxNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{m.name}</p>
                      <p className="text-xs text-gray-400">
                        {m.currentOrders}/{m.maxOrders} заказов • ⭐ {m.rating}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {m.specializations.slice(0, 3).map(s => (
                      <span key={s} className="px-2 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500">
                        {CATEGORY_LABELS[s] || s}
                      </span>
                    ))}
                    {m.specializations.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500">
                        +{m.specializations.length - 3}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Детали механика */}
        {selected && (
          <div className="flex-1 space-y-6">
            {/* Информация */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">
                    🔧
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selected.name}</h2>
                    <p className="text-gray-500">Бокс №{selected.boxNumber} • {selected.phone}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-500">⭐ {selected.rating}</span>
                      <span className="text-gray-400">•</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        selected.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {selected.isActive ? 'Активен' : 'Неактивен'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{selected.stats.totalOrders}</p>
                  <p className="text-xs text-gray-500">Всего заказов</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{selected.stats.completedOrders}</p>
                  <p className="text-xs text-gray-500">Выполнено</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-orange-600">{selected.stats.avgCompletionTime}ч</p>
                  <p className="text-xs text-gray-500">Среднее время</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">{selected.currentOrders}/{selected.maxOrders}</p>
                  <p className="text-xs text-gray-500">Загрузка</p>
                </div>
              </div>

              {/* Специализации */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Специализации</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.specializations.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                      {CATEGORY_LABELS[s] || s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Навыки */}
              <div>
                <h3 className="font-semibold mb-3">Навыки и виды работ</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Текущие заказы */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="font-semibold mb-4">Текущие заказы</h3>
              {selected.assignments.length > 0 ? (
                <div className="space-y-3">
                  {selected.assignments.map((a, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium">Заказ {a.orderId}</p>
                        <p className="text-sm text-gray-500">
                          Назначен: {a.assignedBy === 'auto' ? '🤖 Автоматически' : '👤 Вручную'}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(a.assignedAt).toLocaleString('ru-RU')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Нет активных заказов</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
