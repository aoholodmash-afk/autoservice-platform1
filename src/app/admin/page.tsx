'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [step, setStep] = useState<'login' | 'dashboard'>('login')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  if (step === 'dashboard') return <Dashboard />

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">🔧</div>
          <h1 className="text-2xl font-bold">AutoService Admin</h1>
          <p className="text-gray-500 mt-1">Вход для персонала</p>
        </div>
        <div className="space-y-4">
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          {phone && (
            <>
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Код из SMS" maxLength={4} className="w-full px-4 py-3 border rounded-xl text-center text-2xl tracking-widest font-mono" />
              <button onClick={() => setStep('dashboard')} disabled={code.length !== 4} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium disabled:opacity-50">Войти</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const [tab, setTab] = useState<'stats' | 'orders' | 'calendar'>('stats')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-bold text-lg">🔧 AutoService Admin</h1>
          <nav className="flex gap-1">
            {[
              { key: 'stats' as const, label: '📊 Дашборд' },
              { key: 'orders' as const, label: '📋 Заказ-наряды' },
              { key: 'calendar' as const, label: '📅 Календарь' },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t.key ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        {tab === 'stats' && <StatsTab />}
        {tab === 'orders' && <OrdersTab />}
        {tab === 'calendar' && <CalendarTab />}
      </main>
    </div>
  )
}

function StatsTab() {
  const stats = [
    { label: 'Выручка за месяц', value: '247 500 ₽', icon: '💰', change: '+12%' },
    { label: 'Выполнено заказов', value: '43', icon: '✅', change: '+8%' },
    { label: 'Уникальных авто', value: '38', icon: '🚗', change: '+5%' },
    { label: 'Средний чек', value: '5 756 ₽', icon: '📊', change: '+3%' },
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Статистика за август 2026</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-sm text-gray-500">{s.label}</span>
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <span className="text-xs text-green-600">{s.change}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border">
          <h3 className="font-semibold mb-4">Записи</h3>
          <div className="flex gap-8">
            <div><p className="text-3xl font-bold text-blue-600">5</p><p className="text-sm text-gray-500">Сегодня</p></div>
            <div><p className="text-3xl font-bold text-gray-600">3</p><p className="text-sm text-gray-500">Завтра</p></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border">
          <h3 className="font-semibold mb-4">Заказы по статусам</h3>
          <div className="space-y-2">
            {[{ s: 'В работе', c: 4, color: 'bg-blue-500' }, { s: 'Запланировано', c: 6, color: 'bg-gray-400' }, { s: 'Готово', c: 43, color: 'bg-green-500' }].map((i) => (
              <div key={i.s} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${i.color}`} />
                <span className="flex-1 text-gray-600">{i.s}</span>
                <span className="font-medium">{i.c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function OrdersTab() {
  const orders = [
    { id: 'WO-001', plate: 'А123ВС777', car: 'Toyota Camry', status: 'IN_PROGRESS', works: [{ name: 'Замена масла', price: 1500 }, { name: 'Фильтр масляный', price: 500 }], parts: [{ name: 'Масло 5W-30 4л', price: 2200 }], total: 4200 },
    { id: 'WO-002', plate: 'В456ЕК777', car: 'BMW X5', status: 'PLANNED', works: [{ name: 'Диагностика ходовой', price: 1500 }], parts: [], total: 1500 },
    { id: 'WO-003', plate: 'С789АТ777', car: 'Hyundai Solaris', status: 'COMPLETED', works: [{ name: 'Замена колодок', price: 3500 }], parts: [{ name: 'Колодки передние', price: 2800 }], total: 6300 },
  ]

  const statusConfig: Record<string, { label: string; color: string }> = {
    PLANNED: { label: 'Запланировано', color: 'bg-gray-100 text-gray-700' },
    IN_PROGRESS: { label: 'В работе', color: 'bg-blue-100 text-blue-700' },
    COMPLETED: { label: 'Готово', color: 'bg-green-100 text-green-700' },
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Заказ-наряды</h2>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{o.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[o.status].color}`}>{statusConfig[o.status].label}</span>
                </div>
                <p className="text-gray-500">{o.car} • {o.plate}</p>
              </div>
              <p className="text-xl font-bold">{o.total.toLocaleString('ru-RU')} ₽</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 mb-1">Работы:</p>
                {o.works.map((w, i) => <p key={i} className="flex justify-between"><span>{w.name}</span><span>{w.price.toLocaleString('ru-RU')} ₽</span></p>)}
              </div>
              {o.parts.length > 0 && (
                <div>
                  <p className="text-gray-400 mb-1">Запчасти:</p>
                  {o.parts.map((p, i) => <p key={i} className="flex justify-between"><span>{p.name}</span><span>{p.price.toLocaleString('ru-RU')} ₽</span></p>)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CalendarTab() {
  const bookings = [
    { time: '09:00', name: 'Смирнов Олег', phone: '+7 903 111-22-33', car: 'Hyundai Solaris', service: 'Замена шин', status: 'CONFIRMED' },
    { time: '11:00', name: 'Козлов Дмитрий', phone: '+7 916 123-45-67', car: 'Toyota Camry', service: 'Замена масла', status: 'PENDING' },
    { time: '14:00', name: 'Петрова Мария', phone: '+7 916 987-65-43', car: 'BMW X5', service: 'Диагностика ходовой', status: 'CONFIRMED' },
  ]

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    CONFIRMED: 'bg-blue-100 text-blue-700',
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Записи на сегодня</h2>
      <div className="space-y-4">
        {bookings.map((b, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border shadow-sm flex items-start gap-5">
            <div className="text-center min-w-[60px]">
              <p className="text-2xl font-bold text-blue-600">{b.time}</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{b.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[b.status]}`}>{b.status === 'PENDING' ? 'Новая' : 'Подтверждена'}</span>
              </div>
              <p className="text-sm text-gray-500">{b.phone}</p>
              <p className="text-sm text-gray-600">{b.car} • {b.service}</p>
            </div>
            <div className="flex gap-2">
              {b.status === 'PENDING' && <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs">Подтвердить</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
