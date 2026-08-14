'use client'

import { useState, useEffect } from 'react'
import { SERVICES, CATEGORIES, ServiceItem } from '@/data/services'
import { MOCK_CLIENTS, Client } from '@/data/clients'
import { MOCK_JOURNAL, JournalEntry } from '@/data/journal'
import { MOCK_STOCK, getStockCategories, getStockStatus, getLowStockItems, StockItem } from '@/data/stock'

// ===== TYPES =====

type AdminSection = 'dashboard' | 'services' | 'clients' | 'journal' | 'stock' | 'reports' | 'bookings'

// ===== MAIN COMPONENT =====

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [section, setSection] = useState<AdminSection>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!authenticated) {
    return <LoginPage onLogin={() => setAuthenticated(true)} />
  }

  const navItems = [
    { id: 'dashboard' as AdminSection, icon: '📊', label: 'Дашборд' },
    { id: 'services' as AdminSection, icon: '🔧', label: 'Услуги и цены' },
    { id: 'bookings' as AdminSection, icon: '📅', label: 'Записи' },
    { id: 'clients' as AdminSection, icon: '👥', label: 'Клиенты' },
    { id: 'stock' as AdminSection, icon: '📦', label: 'Склад' },
    { id: 'journal' as AdminSection, icon: '📋', label: 'Журнал' },
    { id: 'reports' as AdminSection, icon: '📈', label: 'Отчёты' },
  ]

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-[#1C1C1E] text-white
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007AFF] flex items-center justify-center text-xl">🔧</div>
            <div>
              <h1 className="font-bold text-[17px]">AutoService</h1>
              <p className="text-[11px] text-white/50">Панель управления</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setSection(item.id); setSidebarOpen(false) }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-medium
                transition-colors duration-150
                ${section === item.id
                  ? 'bg-[#007AFF] text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <span className="text-[18px]">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <a
            href="/"
            className="flex items-center gap-2 text-white/50 text-[13px] hover:text-white transition-colors"
          >
            ← Вернуться на сайт
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-[#C6C6C8] sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 h-[52px]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <h2 className="text-[17px] font-semibold text-[#1C1C1E]">
                {navItems.find(n => n.id === section)?.label}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-[#8E8E93]">Администратор</span>
              <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-white text-[13px] font-semibold">
                А
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {section === 'dashboard' && <DashboardSection />}
          {section === 'services' && <ServicesSection />}
          {section === 'bookings' && <BookingsSection />}
          {section === 'clients' && <ClientsSection />}
          {section === 'stock' && <StockSection />}
          {section === 'journal' && <JournalSection />}
          {section === 'reports' && <ReportsSection />}
        </main>
      </div>
    </div>
  )
}

// ===== LOGIN =====

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F2F2F7]">
      <div className="w-full max-w-[380px] bg-white rounded-[13px] shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#007AFF] rounded-[13px] flex items-center justify-center mx-auto mb-4 text-3xl">🔧</div>
          <h1 className="text-[22px] font-bold text-[#1C1C1E]">AutoService Admin</h1>
          <p className="text-[15px] text-[#8E8E93] mt-1">Вход для персонала</p>
        </div>
        <div className="space-y-4">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Телефон"
            className="w-full h-[44px] px-4 bg-[#F2F2F7] rounded-[10px] text-[17px] text-[#1C1C1E] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30"
          />
          {phone && !codeSent && (
            <button
              onClick={() => setCodeSent(true)}
              className="w-full h-[50px] bg-[#007AFF] text-white rounded-[13px] font-semibold text-[17px]"
            >
              Получить код
            </button>
          )}
          {codeSent && (
            <>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Код из SMS"
                maxLength={4}
                className="w-full h-[44px] px-4 bg-[#F2F2F7] rounded-[10px] text-[22px] text-center tracking-[0.5em] font-mono outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30"
              />
              <button
                onClick={onLogin}
                disabled={code.length !== 4}
                className="w-full h-[50px] bg-[#007AFF] text-white rounded-[13px] font-semibold text-[17px] disabled:opacity-40"
              >
                Войти
              </button>
              <p className="text-[13px] text-[#8E8E93] text-center">
                Для демо: введите любой 4-значный код
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ===== DASHBOARD =====

function DashboardSection() {
  const lowStock = getLowStockItems()

  const stats = [
    { label: 'Выручка за месяц', value: '247 500 ₽', icon: '💰', change: '+12%', color: '#34C759' },
    { label: 'Заказов выполнено', value: '43', icon: '✅', change: '+8%', color: '#007AFF' },
    { label: 'Клиентов', value: '38', icon: '👥', change: '+5%', color: '#5856D6' },
    { label: 'Средний чек', value: '5 756 ₽', icon: '📊', change: '+3%', color: '#FF9500' },
  ]

  const todayBookings = [
    { time: '09:00', name: 'Козлов Д.', service: 'Замена масла', status: 'confirmed' },
    { time: '11:00', name: 'Петрова М.', service: 'Колодки передние', status: 'pending' },
    { time: '14:00', name: 'Смирнов О.', service: 'Диагностика', status: 'confirmed' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-[13px] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-[13px] text-[#8E8E93]">{s.label}</span>
            </div>
            <p className="text-[28px] font-bold text-[#1C1C1E]">{s.value}</p>
            <span className="text-[13px] font-medium" style={{ color: s.color }}>{s.change} за месяц</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's bookings */}
        <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E5E5EA]">
            <h3 className="text-[15px] font-semibold text-[#1C1C1E]">Записи на сегодня</h3>
          </div>
          <div className="divide-y divide-[#E5E5EA]">
            {todayBookings.map((b, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-4">
                <div className="text-[17px] font-bold text-[#007AFF] w-[50px]">{b.time}</div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-[#1C1C1E]">{b.name}</div>
                  <div className="text-[13px] text-[#8E8E93]">{b.service}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                  b.status === 'confirmed' ? 'bg-[#34C759] bg-opacity-15 text-[#34C759]' : 'bg-[#FF9500] bg-opacity-15 text-[#FF9500]'
                }`}>
                  {b.status === 'confirmed' ? 'Подтверждена' : 'Новая'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock alert */}
        <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E5E5EA] flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-[#1C1C1E]">⚠️ Заканчивается на складе</h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#FF3B30] bg-opacity-15 text-[#FF3B30]">
              {lowStock.length}
            </span>
          </div>
          <div className="divide-y divide-[#E5E5EA]">
            {lowStock.slice(0, 5).map(item => (
              <div key={item.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="text-[15px] text-[#1C1C1E]">{item.name}</div>
                  <div className="text-[13px] text-[#8E8E93]">{item.brand} • арт. {item.article}</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-semibold text-[#FF3B30]">{item.quantity} шт</div>
                  <div className="text-[11px] text-[#8E8E93]">мин: {item.minQuantity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== SERVICES =====

function ServicesSection() {
  const [editId, setEditId] = useState<string | null>(null)
  const [editField, setEditField] = useState<'laborPrice' | 'duration' | null>(null)
  const [editValue, setEditValue] = useState('')
  const [services, setServices] = useState(SERVICES)

  const startEdit = (id: string, field: 'laborPrice' | 'duration', currentValue: number) => {
    setEditId(id)
    setEditField(field)
    setEditValue(String(currentValue))
  }

  const saveEdit = () => {
    if (!editId || !editField) return
    setServices(prev => prev.map(s =>
      s.id === editId ? { ...s, [editField]: parseInt(editValue) || 0 } : s
    ))
    setEditId(null)
    setEditField(null)
  }

  const cancelEdit = () => {
    setEditId(null)
    setEditField(null)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] text-[#8E8E93]">Управление услугами, ценами и временем выполнения</p>
        </div>
        <button className="h-[36px] px-4 bg-[#007AFF] text-white rounded-[10px] text-[15px] font-semibold">
          + Добавить услугу
        </button>
      </div>

      {/* Services table */}
      <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F2F2F7]">
                <th className="px-4 py-3 text-left text-[13px] font-medium text-[#8E8E93]">Услуга</th>
                <th className="px-4 py-3 text-left text-[13px] font-medium text-[#8E8E93]">Категория</th>
                <th className="px-4 py-3 text-right text-[13px] font-medium text-[#8E8E93]">Работа ₽</th>
                <th className="px-4 py-3 text-right text-[13px] font-medium text-[#8E8E93]">Запчасти от ₽</th>
                <th className="px-4 py-3 text-right text-[13px] font-medium text-[#8E8E93]">Итого от ₽</th>
                <th className="px-4 py-3 text-center text-[13px] font-medium text-[#8E8E93]">Время</th>
                <th className="px-4 py-3 text-center text-[13px] font-medium text-[#8E8E93]">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5EA]">
              {services.map(service => {
                const category = CATEGORIES.find(c => c.id === service.category)
                const isEditingLabor = editId === service.id && editField === 'laborPrice'
                const isEditingDuration = editId === service.id && editField === 'duration'

                return (
                  <tr key={service.id} className="hover:bg-[#F2F2F7] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{service.icon}</span>
                        <div>
                          <div className="text-[15px] font-medium text-[#1C1C1E]">{service.nameKey.replace('to.', '').replace(/([A-Z])/g, ' $1')}</div>
                          <div className="text-[11px] text-[#8E8E93]">{service.parts.length} запчастей</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#007AFF] bg-opacity-15 text-[#007AFF]">
                        {category?.nameKey.replace('menu.', '') || service.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isEditingLabor ? (
                        <div className="flex items-center justify-end gap-1">
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-20 h-8 px-2 border border-[#007AFF] rounded-lg text-right text-[15px] outline-none"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                          />
                          <button onClick={saveEdit} className="w-7 h-7 rounded-lg bg-[#34C759] text-white text-xs">✓</button>
                          <button onClick={cancelEdit} className="w-7 h-7 rounded-lg bg-[#E5E5EA] text-xs">✕</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(service.id, 'laborPrice', service.laborPrice)}
                          className="text-[15px] font-semibold text-[#1C1C1E] hover:text-[#007AFF] transition-colors cursor-pointer"
                        >
                          {service.laborPrice.toLocaleString('ru-RU')} ₽
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-[15px] text-[#8E8E93]">
                      {service.partsPriceMin.toLocaleString('ru-RU')} ₽
                    </td>
                    <td className="px-4 py-3 text-right text-[15px] font-semibold text-[#007AFF]">
                      {(service.laborPrice + service.partsPriceMin).toLocaleString('ru-RU')} ₽
                    </td>
                    <td className="px-4 py-3 text-center">
                      {isEditingDuration ? (
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-16 h-8 px-2 border border-[#007AFF] rounded-lg text-right text-[15px] outline-none"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                          />
                          <button onClick={saveEdit} className="w-7 h-7 rounded-lg bg-[#34C759] text-white text-xs">✓</button>
                          <button onClick={cancelEdit} className="w-7 h-7 rounded-lg bg-[#E5E5EA] text-xs">✕</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(service.id, 'duration', service.duration)}
                          className="text-[15px] text-[#1C1C1E] hover:text-[#007AFF] transition-colors cursor-pointer"
                        >
                          {service.duration} мин
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button className="px-3 py-1 rounded-lg text-[13px] font-medium bg-[#F2F2F7] text-[#007AFF] hover:bg-[#007AFF] hover:text-white transition-colors">
                        Запчасти ({service.parts.length})
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#007AFF] bg-opacity-10 rounded-[13px] p-4">
        <p className="text-[13px] text-[#007AFF]">
          💡 Нажмите на цену работы или время, чтобы изменить. Запчасти редактируются в разделе «Склад».
        </p>
      </div>
    </div>
  )
}

// ===== BOOKINGS =====

function BookingsSection() {
  const bookings = [
    { id: 'b1', time: '09:00', date: '2026-08-14', name: 'Козлов Дмитрий', phone: '+7 916 123-45-67', car: 'Lada Vesta 2020', service: 'Замена масла и фильтров', status: 'confirmed', amount: 3800 },
    { id: 'b2', time: '11:00', date: '2026-08-14', name: 'Петрова Мария', phone: '+7 916 987-65-43', car: 'Lada Granta 2019', service: 'Замена тормозных колодок', status: 'pending', amount: 2800 },
    { id: 'b3', time: '14:00', date: '2026-08-14', name: 'Смирнов Олег', phone: '+7 903 111-22-33', car: 'Lada XRAY 2021', service: 'Компьютерная диагностика', status: 'confirmed', amount: 1500 },
    { id: 'b4', time: '10:00', date: '2026-08-15', name: 'Иванов Сергей', phone: '+7 903 222-33-44', car: 'Lada Priora 2015', service: 'Замена ГРМ', status: 'pending', amount: 4500 },
    { id: 'b5', time: '15:00', date: '2026-08-15', name: 'Алексеева Анна', phone: '+7 916 555-66-77', car: 'Lada Kalina 2016', service: 'Комплексное ТО', status: 'confirmed', amount: 8500 },
  ]

  const statusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: 'Новая', color: 'bg-[#FF9500] bg-opacity-15 text-[#FF9500]' },
    confirmed: { label: 'Подтверждена', color: 'bg-[#34C759] bg-opacity-15 text-[#34C759]' },
    cancelled: { label: 'Отменена', color: 'bg-[#FF3B30] bg-opacity-15 text-[#FF3B30]' },
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F2F2F7]">
                <th className="px-4 py-3 text-left text-[13px] font-medium text-[#8E8E93]">Дата / Время</th>
                <th className="px-4 py-3 text-left text-[13px] font-medium text-[#8E8E93]">Клиент</th>
                <th className="px-4 py-3 text-left text-[13px] font-medium text-[#8E8E93]">Авто</th>
                <th className="px-4 py-3 text-left text-[13px] font-medium text-[#8E8E93]">Услуга</th>
                <th className="px-4 py-3 text-right text-[13px] font-medium text-[#8E8E93]">Сумма</th>
                <th className="px-4 py-3 text-center text-[13px] font-medium text-[#8E8E93]">Статус</th>
                <th className="px-4 py-3 text-center text-[13px] font-medium text-[#8E8E93]">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5EA]">
              {bookings.map(b => (
                <tr key={b.id} className="hover:bg-[#F2F2F7] transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-[15px] font-medium text-[#1C1C1E]">{b.time}</div>
                    <div className="text-[11px] text-[#8E8E93]">{new Date(b.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-[15px] text-[#1C1C1E]">{b.name}</div>
                    <div className="text-[11px] text-[#8E8E93]">{b.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-[15px] text-[#1C1C1E]">{b.car}</td>
                  <td className="px-4 py-3 text-[15px] text-[#1C1C1E]">{b.service}</td>
                  <td className="px-4 py-3 text-right text-[15px] font-semibold text-[#1C1C1E]">{b.amount.toLocaleString('ru-RU')} ₽</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${statusConfig[b.status].color}`}>
                      {statusConfig[b.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {b.status === 'pending' && (
                      <button className="px-3 py-1 rounded-lg text-[13px] font-medium bg-[#34C759] text-white">
                        Подтвердить
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ===== CLIENTS =====

function ClientsSection() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'vip' | 'inactive'>('all')

  const filtered = MOCK_CLIENTS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
    const matchesFilter = filter === 'all' || c.status === filter
    return matchesSearch && matchesFilter
  })

  const statusConfig: Record<string, { label: string; color: string }> = {
    active: { label: 'Активный', color: 'bg-[#34C759] bg-opacity-15 text-[#34C759]' },
    vip: { label: 'VIP', color: 'bg-[#FF9500] bg-opacity-15 text-[#FF9500]' },
    inactive: { label: 'Неактивный', color: 'bg-[#8E8E93] bg-opacity-15 text-[#8E8E93]' },
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8E93]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по имени или телефону..."
            className="w-full h-[40px] pl-10 pr-4 bg-white rounded-[10px] text-[15px] outline-none border border-[#E5E5EA] focus:border-[#007AFF]"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'vip', 'inactive'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 h-[40px] rounded-[10px] text-[13px] font-medium transition-colors ${
                filter === f ? 'bg-[#007AFF] text-white' : 'bg-white text-[#8E8E93] border border-[#E5E5EA]'
              }`}
            >
              {f === 'all' ? 'Все' : f === 'active' ? 'Активные' : f === 'vip' ? 'VIP' : 'Неактивные'}
            </button>
          ))}
        </div>
      </div>

      {/* Clients list */}
      <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F2F2F7]">
                <th className="px-4 py-3 text-left text-[13px] font-medium text-[#8E8E93]">Клиент</th>
                <th className="px-4 py-3 text-left text-[13px] font-medium text-[#8E8E93]">Авто</th>
                <th className="px-4 py-3 text-center text-[13px] font-medium text-[#8E8E93]">Заказов</th>
                <th className="px-4 py-3 text-right text-[13px] font-medium text-[#8E8E93]">Сумма</th>
                <th className="px-4 py-3 text-center text-[13px] font-medium text-[#8E8E93]">Последний визит</th>
                <th className="px-4 py-3 text-center text-[13px] font-medium text-[#8E8E93]">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5EA]">
              {filtered.map(client => (
                <tr key={client.id} className="hover:bg-[#F2F2F7] transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="text-[15px] font-medium text-[#1C1C1E]">{client.name}</div>
                    <div className="text-[11px] text-[#8E8E93]">{client.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    {client.cars.map((car, i) => (
                      <div key={i} className="text-[13px] text-[#1C1C1E]">
                        {car.brand} {car.model} {car.year} • {car.plate}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-center text-[15px] font-semibold text-[#1C1C1E]">{client.totalOrders}</td>
                  <td className="px-4 py-3 text-right text-[15px] font-semibold text-[#1C1C1E]">{client.totalSpent.toLocaleString('ru-RU')} ₽</td>
                  <td className="px-4 py-3 text-center text-[13px] text-[#8E8E93]">
                    {new Date(client.lastVisit).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${statusConfig[client.status].color}`}>
                      {statusConfig[client.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ===== STOCK (1C INTEGRATION) =====

function StockSection() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const categories = ['all', ...getStockCategories()]

  const filtered = MOCK_STOCK.filter(item => {
    const matchesCategory = category === 'all' || item.category === category
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.article.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const lowStockCount = getLowStockItems().length
  const totalValue = MOCK_STOCK.reduce((sum, item) => sum + (item.quantity * item.purchasePrice), 0)

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-[13px] p-4 shadow-sm">
          <div className="text-[13px] text-[#8E8E93] mb-1">Позиций на складе</div>
          <div className="text-[22px] font-bold text-[#1C1C1E]">{MOCK_STOCK.length}</div>
        </div>
        <div className="bg-white rounded-[13px] p-4 shadow-sm">
          <div className="text-[13px] text-[#8E8E93] mb-1">Стоимость склада</div>
          <div className="text-[22px] font-bold text-[#1C1C1E]">{totalValue.toLocaleString('ru-RU')} ₽</div>
        </div>
        <div className="bg-white rounded-[13px] p-4 shadow-sm">
          <div className="text-[13px] text-[#8E8E93] mb-1">Заканчивается</div>
          <div className="text-[22px] font-bold text-[#FF3B30]">{lowStockCount} позиций</div>
        </div>
      </div>

      {/* 1C Integration banner */}
      <div className="bg-gradient-to-r from-[#5856D6] to-[#007AFF] rounded-[13px] p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-semibold mb-1">Интеграция с 1С</h3>
            <p className="text-[13px] opacity-80">Синхронизация склада с 1С:Магазин автозапчастей</p>
          </div>
          <button className="h-[36px] px-4 bg-white/20 rounded-[10px] text-[15px] font-medium hover:bg-white/30 transition-colors">
            Настроить
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8E93]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по названию или артикулу..."
            className="w-full h-[40px] pl-10 pr-4 bg-white rounded-[10px] text-[15px] outline-none border border-[#E5E5EA] focus:border-[#007AFF]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 h-[40px] rounded-[10px] text-[13px] font-medium transition-colors ${
                category === cat ? 'bg-[#007AFF] text-white' : 'bg-white text-[#8E8E93] border border-[#E5E5EA]'
              }`}
            >
              {cat === 'all' ? 'Все' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stock table */}
      <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F2F2F7]">
                <th className="px-4 py-3 text-left text-[13px] font-medium text-[#8E8E93]">Название</th>
                <th className="px-4 py-3 text-left text-[13px] font-medium text-[#8E8E93]">Артикул</th>
                <th className="px-4 py-3 text-left text-[13px] font-medium text-[#8E8E93]">Категория</th>
                <th className="px-4 py-3 text-center text-[13px] font-medium text-[#8E8E93]">Кол-во</th>
                <th className="px-4 py-3 text-right text-[13px] font-medium text-[#8E8E93]">Закупка</th>
                <th className="px-4 py-3 text-right text-[13px] font-medium text-[#8E8E93]">Продажа</th>
                <th className="px-4 py-3 text-center text-[13px] font-medium text-[#8E8E93]">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5EA]">
              {filtered.map(item => {
                const status = getStockStatus(item)
                return (
                  <tr key={item.id} className="hover:bg-[#F2F2F7] transition-colors">
                    <td className="px-4 py-3">
                      <div className="text-[15px] font-medium text-[#1C1C1E]">{item.name}</div>
                      <div className="text-[11px] text-[#8E8E93]">{item.brand}</div>
                    </td>
                    <td className="px-4 py-3 text-[13px] font-mono text-[#8E8E93]">{item.article}</td>
                    <td className="px-4 py-3 text-[13px] text-[#1C1C1E]">{item.category}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[15px] font-semibold ${
                        item.quantity === 0 ? 'text-[#FF3B30]' :
                        item.quantity <= item.minQuantity ? 'text-[#FF9500]' : 'text-[#1C1C1E]'
                      }`}>
                        {item.quantity}
                      </span>
                      <span className="text-[11px] text-[#8E8E93]"> / {item.minQuantity}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-[15px] text-[#8E8E93]">{item.purchasePrice.toLocaleString('ru-RU')} ₽</td>
                    <td className="px-4 py-3 text-right text-[15px] font-medium text-[#1C1C1E]">{item.sellPrice.toLocaleString('ru-RU')} ₽</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ===== JOURNAL =====

function JournalSection() {
  const typeConfig: Record<string, { icon: string; color: string }> = {
    order: { icon: '🔧', color: 'bg-[#007AFF] bg-opacity-15 text-[#007AFF]' },
    booking: { icon: '📅', color: 'bg-[#5856D6] bg-opacity-15 text-[#5856D6]' },
    payment: { icon: '💰', color: 'bg-[#34C759] bg-opacity-15 text-[#34C759]' },
    status: { icon: '🔄', color: 'bg-[#FF9500] bg-opacity-15 text-[#FF9500]' },
    stock: { icon: '📦', color: 'bg-[#8E8E93] bg-opacity-15 text-[#8E8E93]' },
    system: { icon: '⚙️', color: 'bg-[#1C1C1E] bg-opacity-15 text-[#1C1C1E]' },
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
        <div className="divide-y divide-[#E5E5EA]">
          {MOCK_JOURNAL.map(entry => {
            const config = typeConfig[entry.type] || typeConfig.system
            return (
              <div key={entry.id} className="px-5 py-4 flex items-start gap-4">
                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[18px] flex-shrink-0 ${config.color}`}>
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[15px] font-medium text-[#1C1C1E]">{entry.title}</span>
                    {entry.amount && (
                      <span className="text-[13px] font-semibold text-[#34C759]">{entry.amount.toLocaleString('ru-RU')} ₽</span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#8E8E93]">{entry.description}</p>
                  {entry.user && (
                    <span className="text-[11px] text-[#8E8E93] mt-1 inline-block">{entry.user}</span>
                  )}
                </div>
                <div className="text-[13px] text-[#8E8E93] whitespace-nowrap flex-shrink-0">
                  {new Date(entry.timestamp).toLocaleString('ru-RU', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ===== REPORTS =====

function ReportsSection() {
  const monthlyData = [
    { month: 'Янв', revenue: 180000, orders: 28 },
    { month: 'Фев', revenue: 195000, orders: 31 },
    { month: 'Мар', revenue: 220000, orders: 35 },
    { month: 'Апр', revenue: 210000, orders: 33 },
    { month: 'Май', revenue: 240000, orders: 38 },
    { month: 'Июн', revenue: 260000, orders: 42 },
    { month: 'Июл', revenue: 235000, orders: 37 },
    { month: 'Авг', revenue: 247500, orders: 43 },
  ]

  const topServices = [
    { name: 'Замена масла', count: 45, revenue: 67500 },
    { name: 'Замена колодок', count: 28, revenue: 56000 },
    { name: 'Комплексное ТО', count: 18, revenue: 90000 },
    { name: 'Замена ГРМ', count: 12, revenue: 42000 },
    { name: 'Диагностика', count: 35, revenue: 17500 },
  ]

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))

  return (
    <div className="space-y-6">
      {/* Revenue chart */}
      <div className="bg-white rounded-[13px] shadow-sm p-5">
        <h3 className="text-[15px] font-semibold text-[#1C1C1E] mb-4">Выручка по месяцам</h3>
        <div className="flex items-end gap-3 h-[200px]">
          {monthlyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="text-[11px] text-[#8E8E93]">{(d.revenue / 1000).toFixed(0)}к</div>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-[#007AFF] to-[#5AC8FA] transition-all duration-500"
                style={{ height: `${(d.revenue / maxRevenue) * 160}px` }}
              />
              <div className="text-[11px] text-[#8E8E93]">{d.month}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top services */}
        <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E5E5EA]">
            <h3 className="text-[15px] font-semibold text-[#1C1C1E]">Топ услуг</h3>
          </div>
          <div className="divide-y divide-[#E5E5EA]">
            {topServices.map((s, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[13px] font-bold text-[#8E8E93]">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-[#1C1C1E]">{s.name}</div>
                  <div className="text-[13px] text-[#8E8E93]">{s.count} заказов</div>
                </div>
                <div className="text-[15px] font-semibold text-[#1C1C1E]">{s.revenue.toLocaleString('ru-RU')} ₽</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-[13px] shadow-sm p-5">
          <h3 className="text-[15px] font-semibold text-[#1C1C1E] mb-4">Итого за 2026 год</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-[#E5E5EA]">
              <span className="text-[15px] text-[#8E8E93]">Общая выручка</span>
              <span className="text-[22px] font-bold text-[#1C1C1E]">1 787 500 ₽</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#E5E5EA]">
              <span className="text-[15px] text-[#8E8E93]">Заказов выполнено</span>
              <span className="text-[22px] font-bold text-[#1C1C1E]">287</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#E5E5EA]">
              <span className="text-[15px] text-[#8E8E93]">Средний чек</span>
              <span className="text-[22px] font-bold text-[#007AFF]">6 228 ₽</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-[15px] text-[#8E8E93]">Уникальных клиентов</span>
              <span className="text-[22px] font-bold text-[#1C1C1E]">124</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
