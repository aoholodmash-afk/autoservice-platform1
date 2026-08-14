'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { STATUS_LABELS, STATUS_ORDER, TrackingOrder, TrackingStatus } from '@/data/tracking'

export default function TrackPage() {
  const searchParams = useSearchParams()
  const tokenFromUrl = searchParams.get('token')

  const [token, setToken] = useState(tokenFromUrl || '')
  const [order, setOrder] = useState<TrackingOrder | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (tokenFromUrl) {
      trackOrder(tokenFromUrl)
    }
  }, [tokenFromUrl])

  const trackOrder = async (t: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/tracking?token=${encodeURIComponent(t)}`)
      const data = await res.json()
      if (res.ok) {
        setOrder(data)
      } else {
        setError(data.error || 'Заказ не найден')
        setOrder(null)
      }
    } catch {
      setError('Ошибка загрузки')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (token.trim()) {
      trackOrder(token.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-2xl">🔧</a>
            <div>
              <h1 className="text-lg font-bold">Статус ремонта</h1>
              <p className="text-xs text-gray-400">Отслеживание в реальном времени</p>
            </div>
          </div>
          <a href="/" className="text-sm text-blue-600 hover:underline">← На главную</a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Форма ввода токена */}
        {!order && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border text-center mb-8">
            <div className="text-5xl mb-4">📍</div>
            <h2 className="text-2xl font-bold mb-2">Отследить ремонт</h2>
            <p className="text-gray-500 mb-6">
              Введите номер заказа или токен из SMS-уведомления
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Номер заказа или токен"
                className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
              <button
                type="submit"
                disabled={loading || !token.trim()}
                className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
              >
                {loading ? '⏳' : '🔍'}
              </button>
            </form>
            {error && (
              <p className="text-red-500 mt-4">{error}</p>
            )}
            {/* Демо-ссылки */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-400 mb-3">Демо-ссылки для тестирования:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['track-abc123', 'track-def456', 'track-ghi789'].map(t => (
                  <button
                    key={t}
                    onClick={() => { setToken(t); trackOrder(t) }}
                    className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Результат отслеживания */}
        {order && <TrackingResult order={order} onReset={() => { setOrder(null); setToken('') }} />}
      </main>
    </div>
  )
}

function TrackingResult({ order, onReset }: { order: TrackingOrder; onReset: () => void }) {
  const currentStatusIndex = STATUS_ORDER.indexOf(order.status)

  return (
    <div className="space-y-6">
      {/* Информация об автомобиле */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">{order.vehicle}</h2>
            <p className="text-gray-500">{order.licensePlate}</p>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-bold bg-${STATUS_LABELS[order.status].color}-100 text-${STATUS_LABELS[order.status].color}-700`}>
            {STATUS_LABELS[order.status].icon} {STATUS_LABELS[order.status].name}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Заказ</p>
            <p className="font-medium">{order.id}</p>
          </div>
          <div>
            <p className="text-gray-400">Услуга</p>
            <p className="font-medium">{order.serviceName}</p>
          </div>
          <div>
            <p className="text-gray-400">Мастер</p>
            <p className="font-medium">{order.mechanicName}</p>
          </div>
          <div>
            <p className="text-gray-400">Готовность</p>
            <p className="font-medium">
              {new Date(order.estimatedCompletion).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Прогресс-бар */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border">
        <h3 className="font-semibold mb-4">Прогресс ремонта</h3>
        <div className="flex items-center gap-1 mb-2">
          {STATUS_ORDER.map((status, i) => {
            const isCompleted = i <= currentStatusIndex
            const isCurrent = i === currentStatusIndex
            const label = STATUS_LABELS[status]
            return (
              <div key={status} className="flex-1 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  isCurrent
                    ? `bg-${label.color}-500 text-white ring-4 ring-${label.color}-200`
                    : isCompleted
                    ? `bg-${label.color}-500 text-white`
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {isCompleted ? '✓' : i + 1}
                </div>
                <span className={`text-[10px] mt-1 text-center leading-tight ${
                  isCurrent ? `text-${label.color}-600 font-bold` : isCompleted ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {label.name}
                </span>
              </div>
            )
          })}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full mt-2">
          <div
            className={`absolute top-0 left-0 h-2 bg-${STATUS_LABELS[order.status].color}-500 rounded-full transition-all duration-500`}
            style={{ width: `${(currentStatusIndex / (STATUS_ORDER.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Стоимость */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border">
        <h3 className="font-semibold mb-4">Стоимость</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Запчасти:</span>
            <span className="font-medium">{order.totalParts.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Работы:</span>
            <span className="font-medium">{order.totalLabor.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span className="font-bold">Итого:</span>
            <span className="text-xl font-bold text-blue-600">{order.totalAmount.toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>
      </div>

      {/* История статусов */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border">
        <h3 className="font-semibold mb-4">История</h3>
        <div className="space-y-4">
          {[...order.statusHistory].reverse().map((entry, i) => {
            const label = STATUS_LABELS[entry.status]
            return (
              <div key={i} className={`flex gap-4 ${i === 0 ? '' : 'opacity-70'}`}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    i === 0 ? `bg-${label.color}-500 text-white` : 'bg-gray-200 text-gray-500'
                  }`}>
                    {label.icon}
                  </div>
                  {i < order.statusHistory.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${i === 0 ? `text-${label.color}-600` : ''}`}>
                      {label.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(entry.timestamp).toLocaleString('ru-RU', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  {entry.comment && (
                    <p className="text-sm text-gray-600 mt-1">{entry.comment}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Кнопка «Назад» */}
      <button
        onClick={onReset}
        className="w-full py-3 text-blue-600 text-sm hover:underline"
      >
        ← Проверить другой заказ
      </button>
    </div>
  )
}
