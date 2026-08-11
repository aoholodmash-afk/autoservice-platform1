'use client'

import { useState } from 'react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'ai' | 'history' | 'booking'>('ai')

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-blue-600">🔧 AutoService</h1>
            <p className="text-xs text-gray-400">Платформа для автосервисов</p>
          </div>
          <a href="/admin" className="text-sm text-gray-500 hover:text-blue-600">Для мастеров →</a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-8 text-center">
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Узнайте, что с вашим автомобилем
        </h2>
        <p className="text-gray-500 text-lg">ИИ-диагностика за 30 секунд • История ремонтов • Онлайн-запись</p>
      </section>

      {/* Tabs */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl mb-8">
          {[
            { key: 'ai' as const, icon: '🤖', label: 'ИИ-диагностика' },
            { key: 'history' as const, icon: '📋', label: 'История авто' },
            { key: 'booking' as const, icon: '📅', label: 'Онлайн-запись' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 px-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-1.5">{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'ai' && <AiDiagnosisTab />}
        {activeTab === 'history' && <HistoryTab />}
        {activeTab === 'booking' && <BookingTab />}
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-12 text-center text-sm text-gray-400">
        Powered by AutoService Platform
      </footer>
    </div>
  )
}

/* ========== ИИ-ДИАГНОСТИКА ========== */

function AiDiagnosisTab() {
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const diagnose = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, vehicleBrand: brand, vehicleModel: model }),
      })
      setResult(await res.json())
    } catch { setResult({ error: 'Ошибка' }) }
    finally { setLoading(false) }
  }

  const severityColors: Record<string, string> = {
    low: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    urgent: 'bg-red-100 text-red-700 border-red-200',
  }
  const severityLabels: Record<string, string> = {
    low: '🟢 Некритично',
    medium: '🟡 Рекомендуется',
    high: '🟠 Важно',
    urgent: '🔴 Срочно',
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-blue-100/50 p-6 border">
      <h3 className="text-lg font-semibold mb-1">🤖 ИИ-помощник</h3>
      <p className="text-sm text-gray-400 mb-6">Опишите проблему — нейросеть назовёт возможную причину</p>

      <div className="space-y-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Например: Стук при повороте руля на малой скорости, свист при торможении..."
          rows={3}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="grid grid-cols-2 gap-3">
          <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Марка (Toyota)" className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Модель (Camry)" className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" />
        </div>
        <button onClick={diagnose} disabled={loading || description.length < 5} className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all">
          {loading ? '⏳ Анализирую...' : '🔍 Узнать причину'}
        </button>
      </div>

      {result && !result.error && (
        <div className="mt-6 p-5 bg-gray-50 rounded-xl border">
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${severityColors[result.severity]}`}>
              {severityLabels[result.severity]}
            </span>
          </div>
          <h4 className="font-semibold mb-2">Возможные причины:</h4>
          <ul className="space-y-1.5 mb-4">
            {result.possibleCauses?.map((c: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-blue-500 mt-0.5">•</span>{c}
              </li>
            ))}
          </ul>
          <h4 className="font-semibold mb-2">Рекомендуемые действия:</h4>
          <ul className="space-y-1.5 mb-4">
            {result.recommendedActions?.map((a: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>{a}
              </li>
            ))}
          </ul>
          {result.estimatedCost && (
            <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border">
              💰 Примерная стоимость: <strong>{result.estimatedCost.min?.toLocaleString('ru-RU')} – {result.estimatedCost.max?.toLocaleString('ru-RU')} ₽</strong>
            </p>
          )}
          <p className="text-xs text-gray-400 mt-4">{result.disclaimer}</p>
        </div>
      )}
    </div>
  )
}

/* ========== ИСТОРИЯ АВТО ========== */

function HistoryTab() {
  const [phone, setPhone] = useState('')
  const [plate, setPlate] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'input' | 'code' | 'history'>('input')
  const [vehicle, setVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [devCode, setDevCode] = useState('')

  const requestCode = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/client/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, licensePlate: plate, autoServiceSlug: 'avtomaster-pro' }),
      })
      const data = await res.json()
      if (data.devCode) setDevCode(data.devCode)
      setStep('code')
    } catch {} finally { setLoading(false) }
  }

  const verifyCode = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/client/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code, licensePlate: plate }),
      })
      const data = await res.json()
      if (data.vehicle) {
        const histRes = await fetch(`/api/vehicles/history?slug=avtomaster-pro&plate=${encodeURIComponent(plate)}`)
        const histData = await histRes.json()
        setVehicle(histData)
        setStep('history')
      }
    } catch {} finally { setLoading(false) }
  }

  if (step === 'history' && vehicle) {
    return (
      <div className="bg-white rounded-2xl shadow-lg shadow-blue-100/50 p-6 border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">🚗</div>
          <div>
            <h3 className="text-lg font-semibold">{vehicle.brand} {vehicle.model}</h3>
            <p className="text-gray-500">{vehicle.licensePlate}{vehicle.year ? ` • ${vehicle.year} г.в.` : ''}</p>
          </div>
        </div>
        <h4 className="font-semibold mb-4">История обслуживания:</h4>
        {vehicle.workOrders?.length > 0 ? (
          <div className="space-y-4">
            {vehicle.workOrders.map((wo: any) => (
              <div key={wo.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{wo.number}</p>
                    <p className="text-sm text-gray-500">{wo.completedAt ? new Date(wo.completedAt).toLocaleDateString('ru-RU') : '—'}</p>
                  </div>
                  <span className="font-bold text-blue-600">{wo.totalAmount?.toLocaleString('ru-RU')} ₽</span>
                </div>
                {wo.workItems?.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {wo.workItems.map((item: any) => (
                      <p key={item.id} className="text-sm text-gray-600">• {item.name}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">Пока нет истории обслуживания</p>
        )}
        <button onClick={() => { setStep('input'); setVehicle(null) }} className="mt-6 w-full py-2 text-blue-600 text-sm hover:underline">
          Проверить другой автомобиль
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-blue-100/50 p-6 border">
      <h3 className="text-lg font-semibold mb-1">📋 История обслуживания</h3>
      <p className="text-sm text-gray-400 mb-6">Введите госномер и телефон — получите полную историю ремонтов</p>

      {step === 'input' ? (
        <div className="space-y-4">
          <input value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} placeholder="Госномер (А123ВС777)" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 text-lg tracking-wider" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон (+79161234567)" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          <button onClick={requestCode} disabled={loading || !plate || !phone} className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium disabled:opacity-50">
            {loading ? 'Отправка...' : 'Получить код'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Код отправлен на {phone}{devCode && <span className="block text-blue-600 font-mono mt-1">Код для теста: {devCode}</span>}</p>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="1234" maxLength={4} className="w-full px-4 py-3 border rounded-xl text-center text-3xl tracking-[0.5em] font-mono" />
          <button onClick={verifyCode} disabled={loading || code.length !== 4} className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium disabled:opacity-50">
            {loading ? 'Проверка...' : 'Показать историю'}
          </button>
          <button onClick={() => setStep('input')} className="w-full py-2 text-gray-400 text-sm">← Изменить данные</button>
        </div>
      )}
    </div>
  )
}

/* ========== ОНЛАЙН-ЗАПИСЬ ========== */

function BookingTab() {
  const [form, setForm] = useState({ clientName: '', clientPhone: '', serviceName: '', desiredDate: '', desiredTime: '', licensePlate: '', clientNotes: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, autoServiceSlug: 'avtomaster-pro' }),
      })
      if (res.ok) setSent(true)
    } catch {} finally { setLoading(false) }
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl shadow-lg shadow-blue-100/50 p-8 text-center border">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-xl font-semibold mb-2">Заявка отправлена!</h3>
        <p className="text-gray-500 mb-6">Мы свяжемся с вами для подтверждения записи</p>
        <button onClick={() => setSent(false)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium">Новая запись</button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-blue-100/50 p-6 border">
      <h3 className="text-lg font-semibold mb-1">📅 Онлайн-запись</h3>
      <p className="text-sm text-gray-400 mb-6">Выберите удобное время — мы подтвердим запись</p>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} placeholder="Ваше имя" className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          <input value={form.clientPhone} onChange={(e) => setForm({ ...form, clientPhone: e.target.value })} placeholder="Телефон" className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" />
        </div>
        <select value={form.serviceName} onChange={(e) => setForm({ ...form, serviceName: e.target.value })} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="">Выберите услугу</option>
          <option>Замена масла и фильтра</option>
          <option>Замена тормозных колодок</option>
          <option>Диагностика ходовой</option>
          <option>Замена шин (4 шт.)</option>
          <option>Компьютерная диагностика</option>
          <option>Другое</option>
        </select>
        <div className="grid grid-cols-2 gap-3">
          <input type="date" value={form.desiredDate} onChange={(e) => setForm({ ...form, desiredDate: e.target.value })} className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          <select value={form.desiredTime} onChange={(e) => setForm({ ...form, desiredTime: e.target.value })} className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="">Любое время</option>
            {['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <input value={form.licensePlate} onChange={(e) => setForm({ ...form, licensePlate: e.target.value.toUpperCase() })} placeholder="Госномер (А123ВС777)" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 tracking-wider" />
        <textarea value={form.clientNotes} onChange={(e) => setForm({ ...form, clientNotes: e.target.value })} placeholder="Комментарий (опишите проблему)" rows={2} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 resize-none" />
        <button onClick={submit} disabled={loading || !form.clientName || !form.clientPhone || !form.serviceName} className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium disabled:opacity-50">
          {loading ? 'Отправка...' : 'Записаться'}
        </button>
      </div>
    </div>
  )
}
