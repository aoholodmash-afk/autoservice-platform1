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
  const [tab, setTab] = useState<'stats' | 'orders' | 'calendar' | 'repairs' | 'mechanics'>('stats')

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
              { key: 'repairs' as const, label: '🔧 Ремонты' },
              { key: 'mechanics' as const, label: '👷 Механики' },
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
        {tab === 'repairs' && <RepairsTab />}
        {tab === 'mechanics' && <MechanicsTab />}
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
    { id: 'WO-001', plate: 'А123ВС777', car: 'Toyota Camry', status: 'IN_PROGRESS', works: [{ name: 'Замена масла', price: 1500 }, { name: 'Фильтр масляный', price: 500 }], parts: [{ name: 'Масло 5W-30 4л', price: 2200 }], total: 4200, trackingToken: 'track-abc123' },
    { id: 'WO-002', plate: 'В456ЕК777', car: 'BMW X5', status: 'COMPLETED', works: [{ name: 'Диагностика ходовой', price: 1500 }], parts: [], total: 1500, trackingToken: 'track-def456' },
    { id: 'WO-003', plate: 'С789АТ777', car: 'Hyundai Solaris', status: 'WAITING_PARTS', works: [{ name: 'Замена колодок', price: 3500 }], parts: [{ name: 'Колодки передние', price: 2800 }], total: 6300, trackingToken: 'track-ghi789' },
  ]

  const statusConfig: Record<string, { label: string; color: string }> = {
    PLANNED: { label: 'Запланировано', color: 'bg-gray-100 text-gray-700' },
    IN_PROGRESS: { label: 'В работе', color: 'bg-blue-100 text-blue-700' },
    WAITING_PARTS: { label: 'Ожидание запчастей', color: 'bg-yellow-100 text-yellow-700' },
    COMPLETED: { label: 'Готово', color: 'bg-green-100 text-green-700' },
  }

  const [copied, setCopied] = useState<string | null>(null)
  const copyLink = (token: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/track?token=${token}`)
    setCopied(token)
    setTimeout(() => setCopied(null), 2000)
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
            {/* Tracking link */}
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Токен:</span>
                <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{o.trackingToken}</code>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyLink(o.trackingToken)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    copied === o.trackingToken
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {copied === o.trackingToken ? '✓ Скопировано' : '📋 Копировать ссылку'}
                </button>
                <a
                  href={`/track?token=${o.trackingToken}`}
                  target="_blank"
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-all"
                >
                  🔗 Открыть
                </a>
              </div>
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

function RepairsTab() {
  const [repairs, setRepairs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const loadRepairs = async () => {
    try {
      const res = await fetch('/api/admin/repairs')
      const data = await res.json()
      setRepairs(data)
    } catch {} finally {
      setLoading(false)
    }
  }

  useState(() => { loadRepairs() })

  const savePrice = async (id: string) => {
    try {
      await fetch('/api/admin/repairs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, laborPrice: parseInt(editValue) }),
      })
      setEditingId(null)
      loadRepairs()
    } catch {}
  }

  const categories: Record<string, string> = {
    to: 'ТО', suspension: 'Подвеска', brakes: 'Тормоза', engine: 'Двигатель',
    clutch: 'Сцепление', electrical: 'Электрика', exhaust: 'Выхлоп', body: 'Кузов',
    steering: 'Рулевое', cooling: 'Охлаждение',
  }

  if (loading) return <div className="text-center py-8">Загрузка...</div>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Управление ценами работ</h2>
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Модель</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Категория</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Работа</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Цена работ</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {repairs.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{r.modelId}</td>
                <td className="px-4 py-3 text-sm">{categories[r.category] || r.category}</td>
                <td className="px-4 py-3 text-sm font-medium">{r.name}</td>
                <td className="px-4 py-3 text-right">
                  {editingId === r.id ? (
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-24 px-2 py-1 border rounded text-right text-sm"
                      autoFocus
                    />
                  ) : (
                    <span className="font-semibold">{r.laborPrice.toLocaleString('ru-RU')} ₽</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {editingId === r.id ? (
                    <div className="flex gap-1 justify-center">
                      <button onClick={() => savePrice(r.id)} className="px-3 py-1 bg-green-600 text-white rounded text-xs">Сохранить</button>
                      <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-200 rounded text-xs">Отмена</button>
                    </div>
                  ) : (
                    <button onClick={() => { setEditingId(r.id); setEditValue(String(r.laborPrice)) }} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200">
                      Изменить цену
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MechanicsTab() {
  const [mechanics, setMechanics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [autoAssignResult, setAutoAssignResult] = useState<string | null>(null)

  const loadMechanics = async () => {
    try {
      const res = await fetch('/api/mechanics')
      const data = await res.json()
      setMechanics(data)
    } catch {} finally {
      setLoading(false)
    }
  }

  useState(() => { loadMechanics() })

  const handleAutoAssign = async () => {
    try {
      const res = await fetch('/api/mechanics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'auto-assign',
          orders: [
            { id: 'wo-new-1', category: 'to', repairName: 'Замена масла', estimatedHours: 0.5, priority: 'medium' },
            { id: 'wo-new-2', category: 'clutch', repairName: 'Замена сцепления', estimatedHours: 4, priority: 'high' },
          ],
        }),
      })
      const data = await res.json()
      setAutoAssignResult(data.message)
      loadMechanics()
    } catch {}
  }

  const CATEGORY_LABELS: Record<string, string> = {
    to: 'ТО', brakes: 'Тормоза', clutch: 'Сцепление', suspension: 'Подвеска',
    engine: 'Двигатель', electrical: 'Электрика', steering: 'Рулевое',
  }

  if (loading) return <div className="text-center py-8">Загрузка...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Механики и боксы</h2>
        <div className="flex gap-3">
          <button
            onClick={handleAutoAssign}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-all"
          >
            🤖 Автораспределение
          </button>
          <a
            href="/mechanic"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
          >
            👷 Страница механиков
          </a>
        </div>
      </div>

      {autoAssignResult && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
          {autoAssignResult}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mechanics.map(m => (
          <div key={m.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                    m.currentOrders >= m.maxOrders
                      ? 'bg-red-100 text-red-600'
                      : m.currentOrders > 0
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {m.boxNumber}
                  </div>
                  <div>
                    <h3 className="font-semibold">{m.name}</h3>
                    <p className="text-sm text-gray-500">Бокс №{m.boxNumber} • {m.phone}</p>
                  </div>
                </div>
                <span className="text-yellow-500">⭐ {m.rating}</span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Загрузка</span>
                  <span className="font-medium">{m.currentOrders}/{m.maxOrders}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      m.currentOrders >= m.maxOrders ? 'bg-red-500' :
                      m.currentOrders > m.maxOrders / 2 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(m.currentOrders / m.maxOrders) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-1">Специализации:</p>
                <div className="flex flex-wrap gap-1">
                  {m.specializations.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                      {CATEGORY_LABELS[s] || s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Навыки:</p>
                <div className="flex flex-wrap gap-1">
                  {m.skills.slice(0, 5).map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                      {s}
                    </span>
                  ))}
                  {m.skills.length > 5 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-xs">
                      +{m.skills.length - 5}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-bold text-blue-600">{m.stats.totalOrders}</p>
                  <p className="text-[10px] text-gray-400">Всего</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">{m.stats.completedOrders}</p>
                  <p className="text-[10px] text-gray-400">Выполнено</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-orange-600">{m.stats.avgCompletionTime}ч</p>
                  <p className="text-[10px] text-gray-400">Среднее</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
