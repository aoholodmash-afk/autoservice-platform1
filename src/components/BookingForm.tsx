'use client'

import { useState } from 'react'

interface BookingFormProps {
  repairName: string
  vehicleName: string
  laborPrice: number
  partsMinPrice: number
  onClose: () => void
}

export function BookingForm({ repairName, vehicleName, laborPrice, partsMinPrice, onClose }: BookingFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    notes: '',
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          serviceName: repairName,
          autoServiceSlug: 'avtomaster-pro',
          clientNotes: `${vehicleName} — ${repairName}`,
        }),
      })
      if (res.ok) setSent(true)
    } catch {} finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-bold mb-2">Заявка принята!</h3>
          <p className="text-gray-500 mb-2">Мы свяжемся с вами для подтверждения</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm"><strong>Работа:</strong> {repairName}</p>
            <p className="text-sm"><strong>Авто:</strong> {vehicleName}</p>
            <p className="text-sm"><strong>Работы:</strong> {laborPrice.toLocaleString('ru-RU')} ₽</p>
            <p className="text-sm"><strong>Запчасти:</strong> от {partsMinPrice.toLocaleString('ru-RU')} ₽</p>
            <p className="text-sm font-bold mt-1">Итого: от {(laborPrice + partsMinPrice).toLocaleString('ru-RU')} ₽</p>
          </div>
          <button onClick={onClose} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium">
            Закрыть
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Записаться на ремонт</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <p className="text-sm font-medium text-blue-800">{repairName}</p>
          <p className="text-sm text-blue-600">{vehicleName}</p>
          <p className="text-sm text-blue-600 mt-1">
            Итого: от {(laborPrice + partsMinPrice).toLocaleString('ru-RU')} ₽
          </p>
        </div>

        <div className="space-y-4">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ваше имя"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Телефон"
            type="tel"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Время</option>
              {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Комментарий (необязательно)"
            rows={2}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={submit}
            disabled={loading || !form.name || !form.phone}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
          >
            {loading ? 'Отправка...' : '📅 Записаться'}
          </button>
        </div>
      </div>
    </div>
  )
}
