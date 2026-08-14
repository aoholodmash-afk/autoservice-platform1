'use client'

import { useState, useEffect } from 'react'
import { SERVICES, CATEGORIES, ServiceItem } from '@/data/services'
import { MOCK_CLIENTS, Client, ClientCar } from '@/data/clients'
import { MOCK_JOURNAL, JournalEntry } from '@/data/journal'
import { MOCK_STOCK, getStockCategories, getStockStatus, getLowStockItems, StockItem, MOCK_MOVEMENTS, StockMovement, getMovementsByType, getTotalStockValue, getIncomingTotal, getOutgoingTotal } from '@/data/stock'

// ===== TYPES =====

type AdminSection = 'dashboard' | 'services' | 'clients' | 'journal' | 'stock' | 'reports' | 'bookings' | 'new-order' | 'schedule'

// ===== MAIN COMPONENT =====

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [section, setSection] = useState<AdminSection>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Shared stock state
  const [stockItems, setStockItems] = useState<StockItem[]>(MOCK_STOCK)
  const [stockMovements, setStockMovements] = useState<StockMovement[]>(MOCK_MOVEMENTS)

  const addStockMovement = (movement: StockMovement) => {
    setStockMovements(prev => [movement, ...prev])
    if (movement.type === 'incoming') {
      setStockItems(prev => prev.map(i => i.id === movement.itemId ? { ...i, quantity: i.quantity + movement.quantity, status: 'in_stock' as const } : i))
    } else {
      setStockItems(prev => prev.map(i => i.id === movement.itemId ? { ...i, quantity: Math.max(0, i.quantity - movement.quantity) } : i))
    }
  }

  if (!authenticated) {
    return <LoginPage onLogin={() => setAuthenticated(true)} />
  }

  const navItems = [
    { id: 'dashboard' as AdminSection, icon: '📊', label: 'Дашборд' },
    { id: 'new-order' as AdminSection, icon: '➕', label: 'Новый заказ' },
    { id: 'schedule' as AdminSection, icon: '🗓', label: 'Расписание' },
    { id: 'services' as AdminSection, icon: '🔧', label: 'Услуги и цены' },
    { id: 'bookings' as AdminSection, icon: '📅', label: 'Записи' },
    { id: 'clients' as AdminSection, icon: '👥', label: 'Клиенты' },
    { id: 'stock' as AdminSection, icon: '📦', label: 'Склад' },
    { id: 'journal' as AdminSection, icon: '📋', label: 'Журнал' },
    { id: 'reports' as AdminSection, icon: '📈', label: 'Отчёты' },
  ]

  // Mobile bottom tabs (most used sections)
  const mobileTabs = [
    { id: 'dashboard' as AdminSection, icon: '📊', label: 'Главная' },
    { id: 'new-order' as AdminSection, icon: '➕', label: 'Заказ' },
    { id: 'schedule' as AdminSection, icon: '🗓', label: 'Расписание' },
    { id: 'clients' as AdminSection, icon: '👥', label: 'Клиенты' },
    { id: 'stock' as AdminSection, icon: '📦', label: 'Склад' },
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

        <nav className="p-3 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
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
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 flex-shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <h2 className="text-[16px] sm:text-[17px] font-semibold text-[#1C1C1E] truncate">
                {navItems.find(n => n.id === section)?.label}
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[12px] sm:text-[13px] text-[#8E8E93] hidden sm:block">Администратор</span>
              <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-white text-[13px] font-semibold">
                А
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-3 sm:p-4 lg:p-6 pb-24 lg:pb-6">
          {section === 'dashboard' && <DashboardSection />}
          {section === 'new-order' && <NewOrderSection stockItems={stockItems} onStockMovement={addStockMovement} />}
          {section === 'services' && <ServicesSection />}
          {section === 'bookings' && <BookingsSection />}
          {section === 'schedule' && <ScheduleSection />}
          {section === 'clients' && <ClientsSection />}
          {section === 'stock' && <StockSection stockItems={stockItems} setStockItems={setStockItems} movements={stockMovements} onAddMovement={addStockMovement} />}
          {section === 'journal' && <JournalSection />}
          {section === 'reports' && <ReportsSection stockItems={stockItems} />}
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5EA] z-40 flex items-center justify-around h-[60px] pb-[env(safe-area-inset-bottom)]">
        {mobileTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSection(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 min-w-[48px] ${
              section === tab.id ? 'text-[#007AFF]' : 'text-[#8E8E93]'
            }`}
          >
            <span className="text-[20px]">{tab.icon}</span>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
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

// ===== NEW ORDER =====

interface OrderItem {
  serviceId: string
  serviceName: string
  laborPrice: number
  partsPriceMin: number
  partsPriceMax: number
  duration: number
  selectedParts: { stockItemId: string; name: string; brand: string; price: number; quantity: number; available: number }[]
}

function NewOrderSection({ stockItems, onStockMovement }: { stockItems: StockItem[]; onStockMovement: (m: StockMovement) => void }) {
  const [step, setStep] = useState<'client' | 'car' | 'services' | 'review' | 'done'>('client')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [selectedCar, setSelectedCar] = useState<ClientCar | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [searchClient, setSearchClient] = useState('')
  const [orderNumber, setOrderNumber] = useState('')
  const [notes, setNotes] = useState('')
  const [deductedParts, setDeductedParts] = useState<{ name: string; brand: string; quantity: number; price: number; total: number }[]>([])

  const filteredClients = MOCK_CLIENTS.filter(c =>
    c.name.toLowerCase().includes(searchClient.toLowerCase()) || c.phone.includes(searchClient)
  )

  const selectClient = (client: Client) => {
    setSelectedClient(client)
    setStep('car')
  }

  const selectCar = (car: ClientCar) => {
    setSelectedCar(car)
    setStep('services')
  }

  const toggleService = (service: ServiceItem) => {
    setOrderItems(prev => {
      const exists = prev.find(i => i.serviceId === service.id)
      if (exists) {
        return prev.filter(i => i.serviceId !== service.id)
      }
      // Match service parts with stock items
      const matchedParts = service.parts.map(sp => {
        const stockItem = stockItems.find(si =>
          si.article === sp.article || si.name.toLowerCase().includes(sp.name.toLowerCase().split(' ')[0])
        )
        return {
          stockItemId: stockItem?.id || '',
          name: sp.name,
          brand: sp.brand,
          price: sp.priceMin,
          quantity: 1,
          available: stockItem?.quantity || 0,
        }
      })
      return [...prev, {
        serviceId: service.id,
        serviceName: service.nameKey,
        laborPrice: service.laborPrice,
        partsPriceMin: service.partsPriceMin,
        partsPriceMax: service.partsPriceMax,
        duration: service.duration,
        selectedParts: matchedParts,
      }]
    })
  }

  const updatePartQuantity = (serviceId: string, partIndex: number, delta: number) => {
    setOrderItems(prev => prev.map(item => {
      if (item.serviceId !== serviceId) return item
      const newParts = item.selectedParts.map((p, i) => {
        if (i !== partIndex) return p
        const newQty = Math.max(1, Math.min(p.available, p.quantity + delta))
        return { ...p, quantity: newQty }
      })
      return { ...item, selectedParts: newParts }
    }))
  }

  const removeItem = (serviceId: string) => {
    setOrderItems(prev => prev.filter(i => i.serviceId !== serviceId))
  }

  const totalLabor = orderItems.reduce((sum, i) => sum + i.laborPrice, 0)
  const totalParts = orderItems.reduce((sum, i) => sum + i.selectedParts.reduce((s, p) => s + p.price * p.quantity, 0), 0)
  const totalTime = orderItems.reduce((sum, i) => sum + i.duration, 0)

  const hasStockIssues = orderItems.some(item =>
    item.selectedParts.some(p => p.stockItemId && p.quantity > p.available)
  )

  const createOrder = () => {
    const num = `WO-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`

    // Deduct parts from stock
    const deducted: typeof deductedParts = []
    orderItems.forEach(item => {
      item.selectedParts.forEach(part => {
        if (part.stockItemId && part.quantity > 0) {
          onStockMovement({
            id: `m${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            itemId: part.stockItemId,
            itemName: part.name,
            itemArticle: '',
            type: 'outgoing',
            quantity: part.quantity,
            price: part.price,
            total: part.price * part.quantity,
            date: new Date().toISOString(),
            orderNumber: num,
            responsible: 'Админ',
          })
          deducted.push({
            name: part.name,
            brand: part.brand,
            quantity: part.quantity,
            price: part.price,
            total: part.price * part.quantity,
          })
        }
      })
    })

    setDeductedParts(deducted)
    setOrderNumber(num)
    setStep('done')
  }

  // STEP: Select Client
  if (step === 'client') {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-[13px] shadow-sm p-5">
          <h3 className="text-[17px] font-semibold text-[#1C1C1E] mb-1">Шаг 1: Выбор клиента</h3>
          <p className="text-[13px] text-[#8E8E93] mb-4">Найдите клиента по имени или телефону</p>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8E93]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
            <input
              type="text"
              value={searchClient}
              onChange={(e) => setSearchClient(e.target.value)}
              placeholder="Имя или телефон клиента..."
              className="w-full h-[44px] pl-10 pr-4 bg-[#F2F2F7] rounded-[10px] text-[17px] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30"
              autoFocus
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredClients.map(client => (
            <button
              key={client.id}
              onClick={() => selectClient(client)}
              className="w-full bg-white rounded-[13px] shadow-sm p-4 flex items-center gap-4 text-left hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-bold ${
                client.status === 'vip' ? 'bg-[#FF9500] text-white' : 'bg-[#F2F2F7] text-[#1C1C1E]'
              }`}>
                {client.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="text-[17px] font-medium text-[#1C1C1E]">{client.name}</div>
                <div className="text-[13px] text-[#8E8E93]">{client.phone} • {client.cars.length} авто • {client.totalOrders} заказов</div>
              </div>
              {client.status === 'vip' && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#FF9500] bg-opacity-15 text-[#FF9500]">VIP</span>
              )}
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-30">
                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // STEP: Select Car
  if (step === 'car' && selectedClient) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-[13px] shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setStep('client')} className="text-[#007AFF] text-[15px]">← Назад</button>
            <span className="text-[13px] text-[#8E8E93]">|</span>
            <span className="text-[13px] text-[#8E8E93]">{selectedClient.name}</span>
          </div>
          <h3 className="text-[17px] font-semibold text-[#1C1C1E] mb-1">Шаг 2: Выбор автомобиля</h3>
          <p className="text-[13px] text-[#8E8E93]">Выберите автомобиль клиента</p>
        </div>

        <div className="space-y-3">
          {selectedClient.cars.map((car, i) => (
            <button
              key={i}
              onClick={() => selectCar(car)}
              className="w-full bg-white rounded-[13px] shadow-sm p-4 flex items-center gap-4 text-left hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-[10px] bg-[#007AFF] bg-opacity-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2">
                  <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
                  <circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[17px] font-medium text-[#1C1C1E]">{car.brand} {car.model}</div>
                <div className="text-[13px] text-[#8E8E93]">{car.year} • {car.plate}{car.mileage ? ` • ${car.mileage.toLocaleString('ru-RU')} км` : ''}</div>
              </div>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-30">
                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // STEP: Select Services
  if (step === 'services') {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-[13px] shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setStep('car')} className="text-[#007AFF] text-[15px]">← Назад</button>
            <span className="text-[13px] text-[#8E8E93]">|</span>
            <span className="text-[13px] text-[#8E8E93]">{selectedClient?.name} • {selectedCar?.brand} {selectedCar?.model}</span>
          </div>
          <h3 className="text-[17px] font-semibold text-[#1C1C1E] mb-1">Шаг 3: Выбор услуг</h3>
          <p className="text-[13px] text-[#8E8E93]">Выберите одну или несколько услуг</p>
        </div>

        {/* Selected items summary */}
        {orderItems.length > 0 && (
          <div className="bg-[#007AFF] bg-opacity-10 rounded-[13px] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[15px] font-semibold text-[#007AFF]">Выбрано: {orderItems.length}</span>
              <button onClick={() => setStep('review')} className="h-[32px] px-4 bg-[#007AFF] text-white rounded-[10px] text-[13px] font-semibold">
                Далее →
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {orderItems.map(item => (
                <span key={item.serviceId} className="px-2 py-1 bg-white rounded-lg text-[13px] text-[#1C1C1E] flex items-center gap-1">
                  {SERVICES.find(s => s.id === item.serviceId)?.icon}
                  {item.serviceName.replace('to.', '')}
                  <button onClick={() => removeItem(item.serviceId)} className="ml-1 text-[#FF3B30] text-[11px]">✕</button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Services list */}
        <div className="space-y-2">
          {SERVICES.map(service => {
            const isSelected = orderItems.some(i => i.serviceId === service.id)
            return (
              <button
                key={service.id}
                onClick={() => toggleService(service)}
                className={`w-full rounded-[13px] shadow-sm p-4 flex items-center gap-4 text-left transition-all ${
                  isSelected ? 'bg-[#007AFF] bg-opacity-10 border-2 border-[#007AFF]' : 'bg-white border-2 border-transparent'
                }`}
              >
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-[20px] ${
                  isSelected ? 'bg-[#007AFF] text-white' : 'bg-[#F2F2F7]'
                }`}>
                  {isSelected ? '✓' : service.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-[#1C1C1E]">{service.nameKey.replace('to.', '').replace(/([A-Z])/g, ' $1')}</div>
                  <div className="text-[13px] text-[#8E8E93]">Работа: {service.laborPrice} ₽ • Запчасти от: {service.partsPriceMin} ₽ • {service.duration} мин</div>
                </div>
                <div className="text-[15px] font-semibold text-[#007AFF]">
                  от {(service.laborPrice + service.partsPriceMin).toLocaleString('ru-RU')} ₽
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // STEP: Review & Create
  if (step === 'review') {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-[13px] shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setStep('services')} className="text-[#007AFF] text-[15px]">← Назад</button>
          </div>
          <h3 className="text-[17px] font-semibold text-[#1C1C1E] mb-1">Шаг 4: Проверка и создание</h3>
          <p className="text-[13px] text-[#8E8E93]">Проверьте заказ и создайте заказ-наряд</p>
        </div>

        {/* Client & Car info */}
        <div className="bg-white rounded-[13px] shadow-sm p-5">
          <h4 className="text-[13px] text-[#8E8E93] mb-3">КЛИЕНТ И АВТОМОБИЛЬ</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[15px] font-medium text-[#1C1C1E]">{selectedClient?.name}</div>
              <div className="text-[13px] text-[#8E8E93]">{selectedClient?.phone}</div>
            </div>
            <div>
              <div className="text-[15px] font-medium text-[#1C1C1E]">{selectedCar?.brand} {selectedCar?.model}</div>
              <div className="text-[13px] text-[#8E8E93]">{selectedCar?.year} • {selectedCar?.plate}</div>
            </div>
          </div>
        </div>

        {/* Order items */}
        <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-[#F2F2F7]">
            <h4 className="text-[13px] font-medium text-[#8E8E93]">УСЛУГИ И ЗАПЧАСТИ</h4>
          </div>
          {orderItems.map((item, idx) => {
            const service = SERVICES.find(s => s.id === item.serviceId)
            const partsTotal = item.selectedParts.reduce((s, p) => s + p.price * p.quantity, 0)
            return (
              <div key={idx} className="px-5 py-4 border-b border-[#E5E5EA] last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[18px]">{service?.icon}</span>
                    <span className="text-[15px] font-medium text-[#1C1C1E]">
                      {item.serviceName.replace('to.', '').replace(/([A-Z])/g, ' $1')}
                    </span>
                  </div>
                  <span className="text-[15px] font-semibold text-[#1C1C1E]">{item.laborPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="ml-8 space-y-1">
                  {item.selectedParts.map((part, pi) => {
                    const isLow = part.stockItemId && part.available <= 3 && part.available > 0
                    const isOut = part.stockItemId && part.available === 0
                    const isOver = part.stockItemId && part.quantity > part.available
                    return (
                      <div key={pi} className="flex items-center justify-between text-[13px]">
                        <span className="text-[#8E8E93] flex items-center gap-2">
                          {part.brand} {part.name}
                          <span className="inline-flex items-center gap-0.5">
                            <button onClick={() => updatePartQuantity(item.serviceId, pi, -1)} className="w-5 h-5 rounded bg-[#F2F2F7] text-[11px] flex items-center justify-center hover:bg-[#E5E5EA]">−</button>
                            <span className="w-6 text-center font-medium text-[#1C1C1E]">×{part.quantity}</span>
                            <button onClick={() => updatePartQuantity(item.serviceId, pi, 1)} className="w-5 h-5 rounded bg-[#F2F2F7] text-[11px] flex items-center justify-center hover:bg-[#E5E5EA]">+</button>
                          </span>
                          {part.stockItemId && (
                            <span className={`text-[10px] px-1 rounded ${isOut ? 'bg-[#FF3B30] bg-opacity-15 text-[#FF3B30]' : isOver ? 'bg-[#FF3B30] bg-opacity-15 text-[#FF3B30]' : isLow ? 'bg-[#FF9500] bg-opacity-15 text-[#FF9500]' : 'bg-[#34C759] bg-opacity-15 text-[#34C759]'}`}>
                              склад: {part.available}
                            </span>
                          )}
                        </span>
                        <span className="text-[#1C1C1E]">{(part.price * part.quantity).toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-[13px] shadow-sm p-5">
          <label className="text-[13px] text-[#8E8E93] mb-2 block">ПРИМЕЧАНИЕ</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Дополнительные заметки к заказу..."
            rows={2}
            className="w-full px-4 py-3 bg-[#F2F2F7] rounded-[10px] text-[15px] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30 resize-none"
          />
        </div>

        {/* Totals */}
        <div className="bg-white rounded-[13px] shadow-sm p-5">
          <h4 className="text-[13px] text-[#8E8E93] mb-3">ИТОГО</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[15px] text-[#8E8E93]">Работа ({orderItems.length} усл.)</span>
              <span className="text-[15px] text-[#1C1C1E]">{totalLabor.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[15px] text-[#8E8E93]">Запчасти</span>
              <span className="text-[15px] text-[#1C1C1E]">{totalParts.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[15px] text-[#8E8E93]">Время выполнения</span>
              <span className="text-[15px] text-[#1C1C1E]">~{totalTime} мин</span>
            </div>
            <div className="border-t border-[#E5E5EA] pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-[17px] font-semibold text-[#1C1C1E]">ИТОГО</span>
                <span className="text-[22px] font-bold text-[#007AFF]">{(totalLabor + totalParts).toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {hasStockIssues && (
            <div className="bg-[#FF3B30] bg-opacity-10 rounded-[13px] p-4 flex items-start gap-3">
              <span className="text-[18px]">⚠️</span>
              <div>
                <p className="text-[14px] font-medium text-[#FF3B30]">Недостаточно на складе</p>
                <p className="text-[12px] text-[#8E8E93]">Некоторые запчасти отсутствуют или количество превышает остаток. Заказ будет создан, но запчасти нужно дозаказать.</p>
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={createOrder}
              className="flex-1 h-[50px] bg-[#34C759] text-white rounded-[13px] font-semibold text-[17px] active:scale-[0.98] transition-transform"
            >
              ✓ Создать заказ-наряд
            </button>
            <button
              onClick={() => { /* Print preview */ }}
              className="h-[50px] px-6 bg-[#F2F2F7] text-[#1C1C1E] rounded-[13px] font-semibold text-[17px]"
            >
              🖨
            </button>
          </div>
        </div>
      </div>
    )
  }

  // STEP: Done — Receipt / Invoice
  if (step === 'done') {
    const now = new Date()
    const dateStr = now.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

    return (
      <div className="space-y-4">
        {/* Success */}
        <div className="bg-[#34C759] bg-opacity-10 rounded-[13px] p-6 text-center">
          <div className="text-[44px] mb-3">✅</div>
          <h3 className="text-[22px] font-bold text-[#1C1C1E] mb-1">Заказ создан!</h3>
          <p className="text-[15px] text-[#8E8E93]">Заказ-наряд {orderNumber}</p>
        </div>

        {/* Receipt */}
        <div id="receipt" className="bg-white rounded-[13px] shadow-sm p-6">
          <div className="text-center border-b border-dashed border-[#E5E5EA] pb-4 mb-4">
            <h3 className="text-[17px] font-bold text-[#1C1C1E]">АВТОСЕРВИС</h3>
            <p className="text-[13px] text-[#8E8E93]">г. Москва, ул. Примерная, д. 1</p>
            <p className="text-[13px] text-[#8E8E93]">тел: +7 (999) 123-45-67</p>
          </div>

          <div className="text-center mb-4">
            <p className="text-[15px] font-bold text-[#1C1C1E]">ЗАКАЗ-НАРЯД №{orderNumber}</p>
            <p className="text-[13px] text-[#8E8E93]">{dateStr} {timeStr}</p>
          </div>

          <div className="border-b border-dashed border-[#E5E5EA] pb-3 mb-3">
            <p className="text-[13px] text-[#8E8E93]">Клиент</p>
            <p className="text-[15px] font-medium text-[#1C1C1E]">{selectedClient?.name}</p>
            <p className="text-[13px] text-[#8E8E93]">{selectedClient?.phone}</p>
          </div>

          <div className="border-b border-dashed border-[#E5E5EA] pb-3 mb-3">
            <p className="text-[13px] text-[#8E8E93]">Автомобиль</p>
            <p className="text-[15px] font-medium text-[#1C1C1E]">{selectedCar?.brand} {selectedCar?.model}, {selectedCar?.year} г.</p>
            <p className="text-[13px] text-[#8E8E93]">Гос. номер: {selectedCar?.plate}</p>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-[13px] text-[#8E8E93] border-b border-[#E5E5EA] pb-1 mb-2">
              <span>Наименование</span>
              <span>Сумма</span>
            </div>
            {orderItems.map((item, idx) => {
              const partsTotal = item.selectedParts.reduce((s, p) => s + p.price * p.quantity, 0)
              return (
                <div key={idx} className="mb-2">
                  <div className="flex justify-between text-[15px]">
                    <span className="text-[#1C1C1E]">{item.serviceName.replace('to.', '').replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-medium text-[#1C1C1E]">{item.laborPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  {item.selectedParts.map((part, pi) => (
                    <div key={pi} className="flex justify-between text-[13px] text-[#8E8E93] ml-4">
                      <span>{part.brand} × {part.quantity}</span>
                      <span>{(part.price * part.quantity).toLocaleString('ru-RU')} ₽</span>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

          <div className="border-t-2 border-[#1C1C1E] pt-3">
            <div className="flex justify-between mb-1">
              <span className="text-[15px] text-[#8E8E93]">Работа:</span>
              <span className="text-[15px] text-[#1C1C1E]">{totalLabor.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-[15px] text-[#8E8E93]">Запчасти:</span>
              <span className="text-[15px] text-[#1C1C1E]">{totalParts.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#E5E5EA]">
              <span className="text-[17px] font-bold text-[#1C1C1E]">ИТОГО:</span>
              <span className="text-[22px] font-bold text-[#007AFF]">{(totalLabor + totalParts).toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>

          <div className="text-center mt-6 pt-4 border-t border-dashed border-[#E5E5EA]">
            <p className="text-[13px] text-[#8E8E93]">Спасибо за обращение!</p>
            <p className="text-[13px] text-[#8E8E93]">Готовность: ~{totalTime} мин</p>
          </div>
        </div>

        {/* Deducted from stock */}
        {deductedParts.length > 0 && (
          <div className="bg-[#FF9500] bg-opacity-10 rounded-[13px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#FF9500] border-opacity-20">
              <h4 className="text-[14px] font-semibold text-[#FF9500]">📦 Списано со склада</h4>
            </div>
            <div className="divide-y divide-[#FF9500] divide-opacity-10">
              {deductedParts.map((p, i) => (
                <div key={i} className="px-4 py-2 flex items-center justify-between">
                  <div>
                    <span className="text-[13px] text-[#1C1C1E]">{p.brand} {p.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[13px] font-medium text-[#FF9500]">−{p.quantity} шт</span>
                    <span className="text-[11px] text-[#8E8E93] ml-2">{p.total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 bg-[#FF9500] bg-opacity-5">
              <p className="text-[11px] text-[#8E8E93]">Остатки на складе обновлены автоматически</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 h-[50px] bg-[#F2F2F7] text-[#1C1C1E] rounded-[13px] font-semibold text-[17px]"
          >
            🖨 Печать чека
          </button>
          <button
            onClick={() => {
              setStep('client')
              setSelectedClient(null)
              setSelectedCar(null)
              setOrderItems([])
              setNotes('')
              setDeductedParts([])
            }}
            className="flex-1 h-[50px] bg-[#007AFF] text-white rounded-[13px] font-semibold text-[17px]"
          >
            ➕ Новый заказ
          </button>
        </div>
      </div>
    )
  }

  return null
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
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-[#F2F2F7]">
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-[13px] font-medium text-[#8E8E93]">Услуга</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-[13px] font-medium text-[#8E8E93]">Категория</th>
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

// ===== SCHEDULE =====

interface ScheduleSlot {
  id: string
  time: string
  duration: number       // минуты
  clientId?: string
  clientName?: string
  clientPhone?: string
  car?: string
  service?: string
  mechanicId: string
  mechanicName: string
  status: 'free' | 'booked' | 'in_progress' | 'completed'
  orderId?: string
}

interface Mechanic {
  id: string
  name: string
  box: number
  color: string
  specializations: string[]
}

const MECHANICS: Mechanic[] = [
  { id: 'm1', name: 'Сидоров Алексей', box: 1, color: '#007AFF', specializations: ['ТО', 'Двигатель', 'ГРМ', 'Сцепление'] },
  { id: 'm2', name: 'Иванов Пётр', box: 2, color: '#34C759', specializations: ['Тормоза', 'Подвеска', 'Электрика'] },
  { id: 'm3', name: 'Козлов Дмитрий', box: 3, color: '#FF9500', specializations: ['ТО', 'Шиномонтаж', 'Кузов'] },
]

const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']

function generateWeekDays(): string[] {
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - today.getDay() + 1)
  const days: string[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

function generateMockSchedule(weekDays: string[]): ScheduleSlot[] {
  const slots: ScheduleSlot[] = []
  const bookings = [
    { day: 0, time: '09:00', mechanic: 'm1', client: 'Козлов Дмитрий', phone: '+7 916 123-45-67', car: 'Lada Vesta 2020', service: 'Замена масла', duration: 30, status: 'completed' as const },
    { day: 0, time: '10:00', mechanic: 'm1', client: 'Смирнов Олег', phone: '+7 903 111-22-33', car: 'Lada XRAY 2021', service: 'Комплексное ТО', duration: 120, status: 'in_progress' as const },
    { day: 0, time: '09:30', mechanic: 'm2', client: 'Петрова Мария', phone: '+7 916 987-65-43', car: 'Lada Granta 2019', service: 'Замена колодок', duration: 45, status: 'completed' as const },
    { day: 0, time: '11:00', mechanic: 'm2', client: 'Алексеева Анна', phone: '+7 916 555-66-77', car: 'Lada Kalina 2016', service: 'Диагностика', duration: 30, status: 'booked' as const },
    { day: 0, time: '14:00', mechanic: 'm1', client: 'Иванов Сергей', phone: '+7 903 222-33-44', car: 'Lada Priora 2015', service: 'Замена ГРМ', duration: 120, status: 'booked' as const },
    { day: 1, time: '09:00', mechanic: 'm1', client: 'Волков Андрей', phone: '+7 903 777-88-99', car: 'Lada Largus 2020', service: 'Замена масла', duration: 30, status: 'booked' as const },
    { day: 1, time: '10:00', mechanic: 'm2', client: 'Козлов Дмитрий', phone: '+7 916 123-45-67', car: 'Lada Vesta 2020', service: 'Замена тормозной жидкости', duration: 30, status: 'booked' as const },
    { day: 1, time: '14:00', mechanic: 'm3', client: 'Петрова Мария', phone: '+7 916 987-65-43', car: 'Lada Granta 2019', service: 'Замена шин', duration: 60, status: 'booked' as const },
    { day: 2, time: '09:00', mechanic: 'm1', client: 'Смирнов Олег', phone: '+7 903 111-22-33', car: 'Lada Niva 2018', service: 'Замена сцепления', duration: 240, status: 'booked' as const },
    { day: 3, time: '11:00', mechanic: 'm2', client: 'Алексеева Анна', phone: '+7 916 555-66-77', car: 'Lada Kalina 2016', service: 'Комплексное ТО', duration: 120, status: 'booked' as const },
    { day: 4, time: '09:00', mechanic: 'm1', client: 'Козлов Дмитрий', phone: '+7 916 123-45-67', car: 'Lada Vesta 2020', service: 'Замена свечей', duration: 20, status: 'booked' as const },
    { day: 4, time: '15:00', mechanic: 'm3', client: 'Иванов Сергей', phone: '+7 903 222-33-44', car: 'Lada Priora 2015', service: 'Замена колодок', duration: 45, status: 'booked' as const },
  ]

  bookings.forEach(b => {
    if (b.day < weekDays.length) {
      const mechanic = MECHANICS.find(m => m.id === b.mechanic)!
      slots.push({
        id: `s-${b.day}-${b.time}-${b.mechanic}`,
        time: b.time,
        duration: b.duration,
        clientId: `c-${b.client}`,
        clientName: b.client,
        clientPhone: b.phone,
        car: b.car,
        service: b.service,
        mechanicId: b.mechanic,
        mechanicName: mechanic.name,
        status: b.status,
      })
    }
  })

  return slots
}

function ScheduleSection() {
  const [weekDays] = useState(generateWeekDays)
  const [selectedDay, setSelectedDay] = useState(0)
  const [schedule] = useState(() => generateMockSchedule(weekDays))
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null)

  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const today = new Date().toISOString().split('T')[0]

  const getDaySlots = (dayIndex: number) => {
    return schedule.filter(s => {
      const slotDay = weekDays.findIndex(d => d === weekDays[dayIndex])
      return slotDay === dayIndex
    })
  }

  const getMechanicSlots = (dayIndex: number, mechanicId: string) => {
    return getDaySlots(dayIndex).filter(s => s.mechanicId === mechanicId)
  }

  const isSlotBusy = (dayIndex: number, mechanicId: string, time: string) => {
    const mechanicSlots = getMechanicSlots(dayIndex, mechanicId)
    return mechanicSlots.find(s => {
      if (s.time === time) return true
      const slotMinutes = parseInt(s.time.split(':')[0]) * 60 + parseInt(s.time.split(':')[1])
      const checkMinutes = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])
      return checkMinutes >= slotMinutes && checkMinutes < slotMinutes + s.duration
    })
  }

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    free: { bg: 'bg-[#F2F2F7]', text: 'text-[#8E8E93]', label: 'Свободно' },
    booked: { bg: 'bg-[#007AFF] bg-opacity-15', text: 'text-[#007AFF]', label: 'Записан' },
    in_progress: { bg: 'bg-[#FF9500] bg-opacity-15', text: 'text-[#FF9500]', label: 'В работе' },
    completed: { bg: 'bg-[#34C759] bg-opacity-15', text: 'text-[#34C759]', label: 'Выполнен' },
  }

  const daySlotCount = (dayIndex: number) => {
    return getDaySlots(dayIndex).filter(s => s.status !== 'free').length
  }

  return (
    <div className="space-y-4">
      {/* Week calendar header */}
      <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
        <div className="grid grid-cols-7">
          {weekDays.map((day, i) => {
            const isToday = day === today
            const slotCount = daySlotCount(i)
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(i)}
                className={`py-3 text-center transition-colors ${
                  selectedDay === i ? 'bg-[#007AFF]' : isToday ? 'bg-[#007AFF] bg-opacity-10' : 'hover:bg-[#F2F2F7]'
                }`}
              >
                <div className={`text-[11px] font-medium ${selectedDay === i ? 'text-white/70' : 'text-[#8E8E93]'}`}>
                  {dayNames[i]}
                </div>
                <div className={`text-[18px] font-bold ${selectedDay === i ? 'text-white' : isToday ? 'text-[#007AFF]' : 'text-[#1C1C1E]'}`}>
                  {new Date(day).getDate()}
                </div>
                {slotCount > 0 && (
                  <div className="flex justify-center mt-1">
                    <div className={`w-5 h-3 rounded-full text-[9px] font-bold flex items-center justify-center ${
                      selectedDay === i ? 'bg-white/30 text-white' : 'bg-[#007AFF] text-white'
                    }`}>
                      {slotCount}
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Day summary */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[17px] font-semibold text-[#1C1C1E]">
            {new Date(weekDays[selectedDay]).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h3>
          <p className="text-[13px] text-[#8E8E93]">
            {daySlotCount(selectedDay)} записей • {MECHANICS.length} мастеров
          </p>
        </div>
        <button
          onClick={() => setShowBookingForm(true)}
          className="h-[36px] px-4 bg-[#34C759] text-white rounded-[10px] text-[13px] font-semibold"
        >
          + Записать
        </button>
      </div>

      {/* Booking form modal */}
      {showBookingForm && (
        <BookingFormModal
          mechanics={MECHANICS}
          day={weekDays[selectedDay]}
          onClose={() => setShowBookingForm(false)}
          onSave={(slot) => {
            setShowBookingForm(false)
          }}
        />
      )}

      {/* Slot detail modal */}
      {selectedSlot && (
        <SlotDetailModal
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
        />
      )}

      {/* Timeline — desktop grid */}
      <div className="hidden lg:block bg-white rounded-[13px] shadow-sm overflow-hidden">
        <div className="grid border-b border-[#E5E5EA]" style={{ gridTemplateColumns: `60px repeat(${MECHANICS.length}, 1fr)` }}>
          <div className="px-2 py-3 bg-[#F2F2F7] text-[11px] text-[#8E8E93] font-medium">Время</div>
          {MECHANICS.map(m => (
            <div key={m.id} className="px-2 py-3 bg-[#F2F2F7] text-center">
              <div className="text-[13px] font-semibold text-[#1C1C1E]">{m.name.split(' ')[0]}</div>
              <div className="text-[10px] text-[#8E8E93]">Бокс {m.box}</div>
            </div>
          ))}
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          {TIME_SLOTS.map(time => (
            <div key={time} className="grid border-b border-[#E5E5EA] last:border-b-0" style={{ gridTemplateColumns: `60px repeat(${MECHANICS.length}, 1fr)` }}>
              <div className="px-2 py-2 text-[12px] text-[#8E8E93] font-mono bg-[#F2F2F7] flex items-start">{time}</div>
              {MECHANICS.map(mechanic => {
                const slot = isSlotBusy(selectedDay, mechanic.id, time)
                if (slot && slot.time === time) {
                  const colors = statusColors[slot.status]
                  const slotSpan = Math.ceil(slot.duration / 30)
                  return (
                    <div key={mechanic.id} className={`px-2 py-1.5 ${colors.bg} border-l border-[#E5E5EA] cursor-pointer hover:brightness-95 transition-all`} style={{ gridRow: `span ${slotSpan}`, minHeight: `${slotSpan * 40}px` }} onClick={() => setSelectedSlot(slot)}>
                      <div className={`text-[12px] font-semibold ${colors.text}`}>{slot.clientName?.split(' ')[0]}</div>
                      <div className="text-[10px] text-[#8E8E93] truncate">{slot.service}</div>
                      <div className="text-[10px] text-[#8E8E93]">{slot.car?.split(' ').slice(0, 2).join(' ')}</div>
                      <div className={`text-[9px] font-medium ${colors.text} mt-0.5`}>{colors.label}</div>
                    </div>
                  )
                }
                if (slot) return null
                return (
                  <div key={mechanic.id} className="px-2 py-2 border-l border-[#E5E5EA] hover:bg-[#F2F2F7] cursor-pointer transition-colors" onClick={() => setShowBookingForm(true)}>
                    <div className="text-[10px] text-[#8E8E93] opacity-50">—</div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline — mobile cards */}
      <div className="lg:hidden space-y-2">
        {getDaySlots(selectedDay).length === 0 ? (
          <div className="bg-white rounded-[13px] shadow-sm p-6 text-center">
            <div className="text-[34px] mb-2">📭</div>
            <p className="text-[14px] text-[#8E8E93]">Нет записей на этот день</p>
            <button onClick={() => setShowBookingForm(true)} className="mt-3 h-[40px] px-6 bg-[#34C759] text-white rounded-[10px] text-[14px] font-semibold">+ Записать</button>
          </div>
        ) : (
          getDaySlots(selectedDay)
            .sort((a, b) => a.time.localeCompare(b.time))
            .map(slot => {
              const colors = statusColors[slot.status]
              return (
                <div key={slot.id} className={`bg-white rounded-[13px] shadow-sm p-4 border-l-4 cursor-pointer`} style={{ borderLeftColor: slot.status === 'completed' ? '#34C759' : slot.status === 'in_progress' ? '#FF9500' : '#007AFF' }} onClick={() => setSelectedSlot(slot)}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[15px] font-bold text-[#1C1C1E]">{slot.time}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${colors.bg} ${colors.text}`}>{colors.label}</span>
                  </div>
                  <div className="text-[14px] font-medium text-[#1C1C1E] mb-1">{slot.clientName}</div>
                  <div className="text-[13px] text-[#8E8E93] mb-1">{slot.service}</div>
                  <div className="flex items-center justify-between text-[12px] text-[#8E8E93]">
                    <span>{slot.car}</span>
                    <span>🔧 {slot.mechanicName.split(' ')[0]} • {slot.duration} мин</span>
                  </div>
                </div>
              )
            })
        )}
      </div>

      {/* Mechanic status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {MECHANICS.map(mechanic => {
          const daySlots = getMechanicSlots(selectedDay, mechanic.id)
          const busySlots = daySlots.filter(s => s.status === 'in_progress' || s.status === 'booked')
          const completedSlots = daySlots.filter(s => s.status === 'completed')
          const totalBusyMinutes = busySlots.reduce((s, slot) => s + slot.duration, 0)
          const workStart = 9 * 60 // 09:00
          const workEnd = 18 * 60  // 18:00
          const workMinutes = workEnd - workStart
          const loadPercent = Math.round((totalBusyMinutes / workMinutes) * 100)

          return (
            <div key={mechanic.id} className="bg-white rounded-[13px] shadow-sm p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[14px]" style={{ backgroundColor: mechanic.color }}>
                  {mechanic.name.charAt(0)}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-[#1C1C1E]">{mechanic.name}</div>
                  <div className="text-[11px] text-[#8E8E93]">Бокс {mechanic.box} • {mechanic.specializations.join(', ')}</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#8E8E93]">Загрузка</span>
                  <span className="font-medium text-[#1C1C1E]">{loadPercent}%</span>
                </div>
                <div className="h-2 bg-[#F2F2F7] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${loadPercent}%`,
                      backgroundColor: loadPercent > 80 ? '#FF3B30' : loadPercent > 50 ? '#FF9500' : '#34C759',
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2 text-[11px]">
                <span className="text-[#34C759]">✓ {completedSlots.length}</span>
                <span className="text-[#007AFF]">◉ {busySlots.length}</span>
                <span className="text-[#8E8E93]">своб. {TIME_SLOTS.length - daySlots.length}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Booking form modal
function BookingFormModal({ mechanics, day, onClose, onSave }: { mechanics: Mechanic[]; day: string; onClose: () => void; onSave: (slot: ScheduleSlot) => void }) {
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [car, setCar] = useState('')
  const [service, setService] = useState('')
  const [mechanicId, setMechanicId] = useState(mechanics[0].id)
  const [time, setTime] = useState('09:00')
  const [duration, setDuration] = useState('30')

  const handleSubmit = () => {
    if (!clientName || !service) return
    const mechanic = mechanics.find(m => m.id === mechanicId)!
    onSave({
      id: `s-${Date.now()}`,
      time,
      duration: parseInt(duration),
      clientName,
      clientPhone,
      car,
      service,
      mechanicId,
      mechanicName: mechanic.name,
      status: 'booked',
    })
    onClose()
  }

  return (
    <div className="bg-white rounded-[13px] shadow-sm border-2 border-[#34C759] p-5">
      <h4 className="text-[15px] font-semibold text-[#1C1C1E] mb-4">
        📅 Новая запись — {new Date(day).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Клиент *</label>
          <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Имя клиента" className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none focus:ring-2 focus:ring-[#34C759] focus:ring-opacity-30" />
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Телефон</label>
          <input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="+7 999 123-45-67" className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none" />
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Автомобиль</label>
          <input value={car} onChange={(e) => setCar(e.target.value)} placeholder="Lada Vesta 2020" className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none" />
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Услуга *</label>
          <select value={service} onChange={(e) => setService(e.target.value)} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none">
            <option value="">Выберите...</option>
            <option value="Замена масла">Замена масла (30 мин)</option>
            <option value="Замена колодок">Замена колодок (45 мин)</option>
            <option value="Комплексное ТО">Комплексное ТО (120 мин)</option>
            <option value="Замена ГРМ">Замена ГРМ (120 мин)</option>
            <option value="Диагностика">Диагностика (30 мин)</option>
            <option value="Замена шин">Замена шин (60 мин)</option>
            <option value="Замена свечей">Замена свечей (20 мин)</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Мастер</label>
          <select value={mechanicId} onChange={(e) => setMechanicId(e.target.value)} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none">
            {mechanics.map(m => <option key={m.id} value={m.id}>{m.name} (Бокс {m.box})</option>)}
          </select>
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Время</label>
          <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none">
            {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Длительность</label>
          <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none">
            <option value="20">20 мин</option>
            <option value="30">30 мин</option>
            <option value="45">45 мин</option>
            <option value="60">60 мин</option>
            <option value="90">90 мин</option>
            <option value="120">120 мин</option>
            <option value="180">180 мин</option>
            <option value="240">240 мин</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={handleSubmit} disabled={!clientName || !service} className="h-[36px] px-6 bg-[#34C759] text-white rounded-[10px] text-[13px] font-semibold disabled:opacity-40">Записать</button>
        <button onClick={onClose} className="h-[36px] px-4 bg-[#F2F2F7] text-[#8E8E93] rounded-[10px] text-[13px]">Отмена</button>
      </div>
    </div>
  )
}

// Slot detail modal
function SlotDetailModal({ slot, onClose }: { slot: ScheduleSlot; onClose: () => void }) {
  const colors: Record<string, { bg: string; text: string; label: string }> = {
    booked: { bg: 'bg-[#007AFF]', text: 'text-white', label: 'Записан' },
    in_progress: { bg: 'bg-[#FF9500]', text: 'text-white', label: 'В работе' },
    completed: { bg: 'bg-[#34C759]', text: 'text-white', label: 'Выполнен' },
    free: { bg: 'bg-[#F2F2F7]', text: 'text-[#1C1C1E]', label: 'Свободно' },
  }
  const c = colors[slot.status]

  return (
    <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
      <div className={`${c.bg} px-5 py-3 flex items-center justify-between`}>
        <span className={`text-[15px] font-semibold ${c.text}`}>{c.label}</span>
        <button onClick={onClose} className={`${c.text} opacity-70 hover:opacity-100`}>✕</button>
      </div>
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#8E8E93]">Время</span>
          <span className="text-[15px] font-semibold text-[#1C1C1E]">{slot.time} ({slot.duration} мин)</span>
        </div>
        {slot.clientName && (
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#8E8E93]">Клиент</span>
            <span className="text-[15px] text-[#1C1C1E]">{slot.clientName}</span>
          </div>
        )}
        {slot.clientPhone && (
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#8E8E93]">Телефон</span>
            <a href={`tel:${slot.clientPhone}`} className="text-[15px] text-[#007AFF]">{slot.clientPhone}</a>
          </div>
        )}
        {slot.car && (
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#8E8E93]">Автомобиль</span>
            <span className="text-[15px] text-[#1C1C1E]">{slot.car}</span>
          </div>
        )}
        {slot.service && (
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#8E8E93]">Услуга</span>
            <span className="text-[15px] font-medium text-[#1C1C1E]">{slot.service}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#8E8E93]">Мастер</span>
          <span className="text-[15px] text-[#1C1C1E]">{slot.mechanicName}</span>
        </div>
      </div>
      {slot.status === 'booked' && (
        <div className="px-5 pb-4 flex gap-2">
          <button className="flex-1 h-[36px] bg-[#34C759] text-white rounded-[10px] text-[13px] font-semibold">Начать работу</button>
          <button className="h-[36px] px-4 bg-[#FF3B30] text-white rounded-[10px] text-[13px] font-semibold">Отменить</button>
        </div>
      )}
      {slot.status === 'in_progress' && (
        <div className="px-5 pb-4">
          <button className="w-full h-[36px] bg-[#34C759] text-white rounded-[10px] text-[13px] font-semibold">Завершить</button>
        </div>
      )}
    </div>
  )
}

// ===== CLIENTS =====

function ClientsSection() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'vip' | 'inactive'>('all')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [clientTab, setClientTab] = useState<'info' | 'cars' | 'orders'>('info')

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

  // Client detail view
  if (selectedClient) {
    const clientOrders = selectedClient.orders || []
    const completedOrders = clientOrders.filter(o => o.status === 'completed')
    const avgCheck = completedOrders.length > 0 ? completedOrders.reduce((s, o) => s + o.total, 0) / completedOrders.length : 0

    return (
      <div className="space-y-4">
        {/* Back button + client name */}
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedClient(null)} className="text-[#007AFF] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <span className="text-[13px] text-[#8E8E93]">|</span>
          <span className="text-[17px] font-semibold text-[#1C1C1E]">{selectedClient.name}</span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${statusConfig[selectedClient.status].color}`}>
            {statusConfig[selectedClient.status].label}
          </span>
        </div>

        {/* Client header card */}
        <div className="bg-white rounded-[13px] shadow-sm p-5">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-[24px] font-bold flex-shrink-0 ${
              selectedClient.status === 'vip' ? 'bg-[#FF9500] text-white' : 'bg-[#007AFF] bg-opacity-15 text-[#007AFF]'
            }`}>
              {selectedClient.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[22px] font-bold text-[#1C1C1E]">{selectedClient.name}</h3>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <a href={`tel:${selectedClient.phone}`} className="flex items-center gap-1 text-[14px] text-[#007AFF]">
                  📞 {selectedClient.phone}
                </a>
                {selectedClient.email && (
                  <a href={`mailto:${selectedClient.email}`} className="flex items-center gap-1 text-[14px] text-[#007AFF]">
                    ✉️ {selectedClient.email}
                  </a>
                )}
              </div>
              {selectedClient.address && (
                <p className="text-[13px] text-[#8E8E93] mt-1">📍 {selectedClient.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white rounded-[13px] p-4 shadow-sm text-center">
            <div className="text-[22px] font-bold text-[#007AFF]">{selectedClient.totalOrders}</div>
            <div className="text-[11px] text-[#8E8E93]">Заказов</div>
          </div>
          <div className="bg-white rounded-[13px] p-4 shadow-sm text-center">
            <div className="text-[22px] font-bold text-[#34C759]">{(selectedClient.totalSpent / 1000).toFixed(0)}к ₽</div>
            <div className="text-[11px] text-[#8E8E93]">Потрачено</div>
          </div>
          <div className="bg-white rounded-[13px] p-4 shadow-sm text-center">
            <div className="text-[22px] font-bold text-[#1C1C1E]">{selectedClient.cars.length}</div>
            <div className="text-[11px] text-[#8E8E93]">Автомобилей</div>
          </div>
          <div className="bg-white rounded-[13px] p-4 shadow-sm text-center">
            <div className="text-[22px] font-bold text-[#FF9500]">{avgCheck > 0 ? (avgCheck / 1000).toFixed(1) : 0}к ₽</div>
            <div className="text-[11px] text-[#8E8E93]">Ср. чек</div>
          </div>
        </div>

        {/* Notes */}
        {selectedClient.notes && (
          <div className="bg-[#FF9500] bg-opacity-10 rounded-[13px] p-4">
            <p className="text-[13px] text-[#8E8E93] mb-1 font-medium">Примечание:</p>
            <p className="text-[14px] text-[#1C1C1E]">{selectedClient.notes}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-[#F2F2F7] p-1 rounded-[10px]">
          {([
            { id: 'info' as const, label: 'Контакты', icon: '👤' },
            { id: 'cars' as const, label: 'Автомобили', icon: '🚗' },
            { id: 'orders' as const, label: 'Заказы', icon: '📋' },
          ]).map(t => (
            <button key={t.id} onClick={() => setClientTab(t.id)}
              className={`flex-1 h-[36px] rounded-[8px] text-[13px] font-medium transition-colors ${
                clientTab === t.id ? 'bg-white text-[#1C1C1E] shadow-sm' : 'text-[#8E8E93]'
              }`}
            >{t.icon} {t.label}</button>
          ))}
        </div>

        {/* TAB: Contact Info */}
        {clientTab === 'info' && (
          <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
            <div className="divide-y divide-[#E5E5EA]">
              <div className="px-5 py-3 flex items-center justify-between">
                <span className="text-[13px] text-[#8E8E93]">Телефон</span>
                <a href={`tel:${selectedClient.phone}`} className="text-[15px] text-[#007AFF] font-medium">{selectedClient.phone}</a>
              </div>
              {selectedClient.email && (
                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-[13px] text-[#8E8E93]">Email</span>
                  <a href={`mailto:${selectedClient.email}`} className="text-[15px] text-[#007AFF] font-medium">{selectedClient.email}</a>
                </div>
              )}
              {selectedClient.address && (
                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-[13px] text-[#8E8E93]">Адрес</span>
                  <span className="text-[15px] text-[#1C1C1E]">{selectedClient.address}</span>
                </div>
              )}
              {selectedClient.birthday && (
                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-[13px] text-[#8E8E93]">День рождения</span>
                  <span className="text-[15px] text-[#1C1C1E]">{new Date(selectedClient.birthday).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              )}
              <div className="px-5 py-3 flex items-center justify-between">
                <span className="text-[13px] text-[#8E8E93]">Последний визит</span>
                <span className="text-[15px] text-[#1C1C1E]">{new Date(selectedClient.lastVisit).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="px-5 py-3 flex items-center justify-between">
                <span className="text-[13px] text-[#8E8E93]">Статус</span>
                <span className={`px-2 py-0.5 rounded-full text-[12px] font-medium ${statusConfig[selectedClient.status].color}`}>
                  {statusConfig[selectedClient.status].label}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Cars */}
        {clientTab === 'cars' && (
          <div className="space-y-3">
            {selectedClient.cars.map((car, i) => (
              <div key={i} className="bg-white rounded-[13px] shadow-sm p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-[13px] bg-[#007AFF] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2">
                      <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
                      <circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[17px] font-semibold text-[#1C1C1E]">{car.brand} {car.model}</h4>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div>
                        <span className="text-[11px] text-[#8E8E93]">Год</span>
                        <p className="text-[14px] text-[#1C1C1E]">{car.year}</p>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#8E8E93]">Госномер</span>
                        <p className="text-[14px] font-medium text-[#1C1C1E]">{car.plate}</p>
                      </div>
                      {car.color && (
                        <div>
                          <span className="text-[11px] text-[#8E8E93]">Цвет</span>
                          <p className="text-[14px] text-[#1C1C1E]">{car.color}</p>
                        </div>
                      )}
                      {car.mileage && (
                        <div>
                          <span className="text-[11px] text-[#8E8E93]">Пробег</span>
                          <p className="text-[14px] text-[#1C1C1E]">{car.mileage.toLocaleString('ru-RU')} км</p>
                        </div>
                      )}
                      {car.vin && (
                        <div className="col-span-2">
                          <span className="text-[11px] text-[#8E8E93]">VIN</span>
                          <p className="text-[13px] font-mono text-[#8E8E93]">{car.vin}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: Orders */}
        {clientTab === 'orders' && (
          <div className="space-y-3">
            {clientOrders.length === 0 ? (
              <div className="bg-white rounded-[13px] shadow-sm p-8 text-center">
                <div className="text-[44px] mb-3">📋</div>
                <p className="text-[15px] text-[#8E8E93]">Нет заказов</p>
              </div>
            ) : (
              clientOrders.map(order => {
                const statusColor = order.status === 'completed' ? 'bg-[#34C759] bg-opacity-15 text-[#34C759]' :
                  order.status === 'in_progress' ? 'bg-[#007AFF] bg-opacity-15 text-[#007AFF]' : 'bg-[#FF3B30] bg-opacity-15 text-[#FF3B30]'
                const statusLabel = order.status === 'completed' ? 'Выполнен' : order.status === 'in_progress' ? 'В работе' : 'Отменён'
                return (
                  <div key={order.id} className="bg-white rounded-[13px] shadow-sm overflow-hidden">
                    <div className="px-5 py-3 border-b border-[#E5E5EA] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-[15px] font-bold text-[#007AFF]">{order.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${statusColor}`}>{statusLabel}</span>
                      </div>
                      <span className="text-[13px] text-[#8E8E93]">{new Date(order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="px-5 py-3">
                      <div className="text-[13px] text-[#8E8E93] mb-2">{order.car}</div>
                      <div className="mb-3">
                        {order.services.map((s, si) => (
                          <span key={si} className="inline-block px-2 py-0.5 bg-[#F2F2F7] rounded text-[12px] text-[#1C1C1E] mr-1 mb-1">{s}</span>
                        ))}
                      </div>
                      {order.parts.length > 0 && (
                        <div className="mb-3">
                          <p className="text-[11px] text-[#8E8E93] mb-1">Запчасти:</p>
                          {order.parts.map((p, pi) => (
                            <p key={pi} className="text-[12px] text-[#8E8E93] ml-2">• {p}</p>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2 border-t border-[#E5E5EA]">
                        <div className="text-[12px] text-[#8E8E93]">
                          {order.mechanic && `Мастер: ${order.mechanic}`}
                        </div>
                        <div className="flex items-center gap-4">
                          {order.laborPrice > 0 && <span className="text-[12px] text-[#8E8E93]">Работа: {order.laborPrice.toLocaleString('ru-RU')} ₽</span>}
                          {order.partsPrice > 0 && <span className="text-[12px] text-[#8E8E93]">Запчасти: {order.partsPrice.toLocaleString('ru-RU')} ₽</span>}
                          <span className="text-[16px] font-bold text-[#1C1C1E]">{order.total.toLocaleString('ru-RU')} ₽</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>
    )
  }

  // Client list view
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
      <div className="space-y-3">
        {filtered.map(client => (
          <button
            key={client.id}
            onClick={() => { setSelectedClient(client); setClientTab('info') }}
            className="w-full bg-white rounded-[13px] shadow-sm p-4 flex items-center gap-4 text-left hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-bold flex-shrink-0 ${
              client.status === 'vip' ? 'bg-[#FF9500] text-white' : 'bg-[#007AFF] bg-opacity-15 text-[#007AFF]'
            }`}>
              {client.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-semibold text-[#1C1C1E]">{client.name}</span>
                {client.status === 'vip' && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FF9500] text-white">VIP</span>}
              </div>
              <div className="text-[13px] text-[#8E8E93] mt-0.5">{client.phone}</div>
              <div className="text-[12px] text-[#8E8E93] mt-1">
                {client.cars.map(c => `${c.brand} ${c.model}`).join(', ')} • {client.totalOrders} заказов • {client.totalSpent.toLocaleString('ru-RU')} ₽
              </div>
            </div>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-30 flex-shrink-0">
              <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

// ===== STOCK (WAREHOUSE MANAGEMENT) =====

type StockTab = 'balance' | 'incoming' | 'outgoing' | 'movements'

function StockSection({ stockItems, setStockItems, movements, onAddMovement }: { stockItems: StockItem[]; setStockItems: React.Dispatch<React.SetStateAction<StockItem[]>>; movements: StockMovement[]; onAddMovement: (m: StockMovement) => void }) {
  const [tab, setTab] = useState<StockTab>('balance')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState<StockItem | null>(null)

  const categories = ['all', ...getStockCategories()]
  const lowStockCount = stockItems.filter(i => i.quantity <= i.minQuantity).length
  const totalValue = stockItems.reduce((s, i) => s + i.quantity * i.purchasePrice, 0)
  const incomingTotal = movements.filter(m => m.type === 'incoming').reduce((s, m) => s + m.total, 0)
  const outgoingTotal = movements.filter(m => m.type === 'outgoing').reduce((s, m) => s + m.total, 0)

  const tabs = [
    { id: 'balance' as StockTab, label: 'Остатки', icon: '📦' },
    { id: 'incoming' as StockTab, label: 'Приход', icon: '📥' },
    { id: 'outgoing' as StockTab, label: 'Расход', icon: '📤' },
    { id: 'movements' as StockTab, label: 'Журнал', icon: '📋' },
  ]

  const filteredItems = stockItems.filter(item => {
    const matchCat = category === 'all' || item.category === category
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.article.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const addMovement = (movement: StockMovement) => {
    onAddMovement(movement)
  }

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-white rounded-[13px] p-4 shadow-sm">
          <div className="text-[11px] text-[#8E8E93] mb-1">Позиций</div>
          <div className="text-[22px] font-bold text-[#1C1C1E]">{stockItems.length}</div>
        </div>
        <div className="bg-white rounded-[13px] p-4 shadow-sm">
          <div className="text-[11px] text-[#8E8E93] mb-1">Стоимость склада</div>
          <div className="text-[22px] font-bold text-[#1C1C1E]">{(totalValue / 1000).toFixed(0)}к ₽</div>
        </div>
        <div className="bg-white rounded-[13px] p-4 shadow-sm">
          <div className="text-[11px] text-[#8E8E93] mb-1">Заканчивается</div>
          <div className="text-[22px] font-bold text-[#FF3B30]">{lowStockCount}</div>
        </div>
        <div className="bg-white rounded-[13px] p-4 shadow-sm">
          <div className="text-[11px] text-[#8E8E93] mb-1">Приход (мес.)</div>
          <div className="text-[22px] font-bold text-[#34C759]">{(incomingTotal / 1000).toFixed(0)}к ₽</div>
        </div>
        <div className="bg-white rounded-[13px] p-4 shadow-sm">
          <div className="text-[11px] text-[#8E8E93] mb-1">Расход (мес.)</div>
          <div className="text-[22px] font-bold text-[#FF9500]">{(outgoingTotal / 1000).toFixed(0)}к ₽</div>
        </div>
      </div>

      {/* 1C Integration banner */}
      <div className="bg-gradient-to-r from-[#5856D6] to-[#007AFF] rounded-[13px] p-4 text-white flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold">Интеграция с 1С:Магазин автозапчастей</h3>
          <p className="text-[12px] opacity-80">Автоматическая синхронизация остатков и цен</p>
        </div>
        <button className="h-[32px] px-4 bg-white/20 rounded-[10px] text-[13px] font-medium hover:bg-white/30 transition-colors">
          Настроить
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F2F2F7] p-1 rounded-[10px]">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 h-[36px] rounded-[8px] text-[13px] font-medium transition-colors ${
              tab === t.id ? 'bg-white text-[#1C1C1E] shadow-sm' : 'text-[#8E8E93]'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* TAB: Balance (Остатки) */}
      {tab === 'balance' && (
        <div className="space-y-4">
          {/* Filters & Add button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
              <input
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Название или артикул..."
                className="w-full h-[36px] pl-9 pr-4 bg-white rounded-[10px] text-[14px] outline-none border border-[#E5E5EA] focus:border-[#007AFF]"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-3 h-[36px] rounded-[10px] text-[12px] font-medium transition-colors ${
                    category === cat ? 'bg-[#007AFF] text-white' : 'bg-white text-[#8E8E93] border border-[#E5E5EA]'
                  }`}
                >{cat === 'all' ? 'Все' : cat}</button>
              ))}
            </div>
            <button onClick={() => setShowAddForm(true)} className="h-[36px] px-4 bg-[#34C759] text-white rounded-[10px] text-[13px] font-semibold whitespace-nowrap">
              + Добавить
            </button>
          </div>

          {/* Add/Edit form */}
          {(showAddForm || editingItem) && (
            <AddEditPartForm
              item={editingItem}
              onSave={(item) => {
                if (editingItem) {
                  setStockItems(prev => prev.map(i => i.id === item.id ? item : i))
                } else {
                  setStockItems(prev => [...prev, { ...item, id: `s${Date.now()}` }])
                }
                setShowAddForm(false)
                setEditingItem(null)
              }}
              onCancel={() => { setShowAddForm(false); setEditingItem(null) }}
            />
          )}

          {/* Stock table */}
          <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-[#F2F2F7]">
                    <th className="px-3 py-2 text-left text-[11px] font-medium text-[#8E8E93]">Название</th>
                    <th className="px-3 py-2 text-left text-[11px] font-medium text-[#8E8E93]">Артикул</th>
                    <th className="px-3 py-2 text-center text-[11px] font-medium text-[#8E8E93]">Остаток</th>
                    <th className="px-3 py-2 text-right text-[11px] font-medium text-[#8E8E93]">Закупка</th>
                    <th className="px-3 py-2 text-right text-[11px] font-medium text-[#8E8E93]">Продажа</th>
                    <th className="px-3 py-2 text-center text-[11px] font-medium text-[#8E8E93]">Статус</th>
                    <th className="px-3 py-2 text-center text-[11px] font-medium text-[#8E8E93]">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5EA]">
                  {filteredItems.map(item => {
                    const status = getStockStatus(item)
                    return (
                      <tr key={item.id} className="hover:bg-[#F2F2F7] transition-colors">
                        <td className="px-3 py-2">
                          <div className="text-[13px] font-medium text-[#1C1C1E]">{item.name}</div>
                          <div className="text-[10px] text-[#8E8E93]">{item.brand} • {item.category}</div>
                        </td>
                        <td className="px-3 py-2 text-[11px] font-mono text-[#8E8E93]">{item.article}</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`text-[14px] font-bold ${item.quantity === 0 ? 'text-[#FF3B30]' : item.quantity <= item.minQuantity ? 'text-[#FF9500]' : 'text-[#1C1C1E]'}`}>
                            {item.quantity}
                          </span>
                          <span className="text-[10px] text-[#8E8E93]"> / {item.minQuantity}</span>
                        </td>
                        <td className="px-3 py-2 text-right text-[13px] text-[#8E8E93]">{item.purchasePrice} ₽</td>
                        <td className="px-3 py-2 text-right text-[13px] font-medium text-[#1C1C1E]">{item.sellPrice} ₽</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${status.color}`}>{status.label}</span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <div className="flex gap-1 justify-center">
                            <button onClick={() => setEditingItem(item)} className="px-2 py-1 rounded-lg text-[11px] bg-[#F2F2F7] text-[#007AFF] hover:bg-[#007AFF] hover:text-white transition-colors">✏️</button>
                            <button onClick={() => setStockItems(prev => prev.filter(i => i.id !== item.id))} className="px-2 py-1 rounded-lg text-[11px] bg-[#F2F2F7] text-[#FF3B30] hover:bg-[#FF3B30] hover:text-white transition-colors">🗑</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Incoming (Приход) */}
      {tab === 'incoming' && (
        <IncomingTab stockItems={stockItems} movements={movements} onAddMovement={addMovement} />
      )}

      {/* TAB: Outgoing (Расход) */}
      {tab === 'outgoing' && (
        <OutgoingTab stockItems={stockItems} movements={movements} onAddMovement={addMovement} />
      )}

      {/* TAB: Movements (Журнал) */}
      {tab === 'movements' && (
        <MovementsTab movements={movements} />
      )}
    </div>
  )
}

// Add/Edit part form
function AddEditPartForm({ item, onSave, onCancel }: { item: StockItem | null; onSave: (item: StockItem) => void; onCancel: () => void }) {
  const [form, setForm] = useState<StockItem>(item || {
    id: '', name: '', article: '', brand: '', category: 'Фильтры',
    quantity: 0, minQuantity: 1, purchasePrice: 0, sellPrice: 0, supplier: '', status: 'in_stock',
  })

  const save = () => {
    if (!form.name || !form.article) return
    onSave({ ...form, status: form.quantity === 0 ? 'out_of_stock' : form.quantity <= form.minQuantity ? 'low' : 'in_stock' })
  }

  return (
    <div className="bg-white rounded-[13px] shadow-sm p-5 border-2 border-[#007AFF]">
      <h4 className="text-[15px] font-semibold text-[#1C1C1E] mb-4">{item ? 'Редактировать' : 'Добавить'} запчасть</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Название *</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30" />
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Артикул *</label>
          <input value={form.article} onChange={(e) => setForm({ ...form, article: e.target.value })} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30" />
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Бренд</label>
          <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30" />
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Категория</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none">
            {getStockCategories().map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Количество</label>
          <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 0 })} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30" />
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Мин. остаток</label>
          <input type="number" value={form.minQuantity} onChange={(e) => setForm({ ...form, minQuantity: parseInt(e.target.value) || 0 })} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30" />
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Закупочная цена ₽</label>
          <input type="number" value={form.purchasePrice} onChange={(e) => setForm({ ...form, purchasePrice: parseInt(e.target.value) || 0 })} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30" />
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Продажная цена ₽</label>
          <input type="number" value={form.sellPrice} onChange={(e) => setForm({ ...form, sellPrice: parseInt(e.target.value) || 0 })} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30" />
        </div>
        <div>
          <label className="text-[11px] text-[#8E8E93] mb-1 block">Поставщик</label>
          <input value={form.supplier || ''} onChange={(e) => setForm({ ...form, supplier: e.target.value })} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30" />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={save} className="h-[36px] px-6 bg-[#34C759] text-white rounded-[10px] text-[13px] font-semibold">Сохранить</button>
        <button onClick={onCancel} className="h-[36px] px-4 bg-[#F2F2F7] text-[#8E8E93] rounded-[10px] text-[13px] font-medium">Отмена</button>
      </div>
    </div>
  )
}

// Incoming tab
function IncomingTab({ stockItems, movements, onAddMovement }: { stockItems: StockItem[]; movements: StockMovement[]; onAddMovement: (m: StockMovement) => void }) {
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [supplier, setSupplier] = useState('АвтоДок')
  const [docNumber, setDocNumber] = useState(`ПРХ-${String(movements.filter(m => m.type === 'incoming').length + 1).padStart(3, '0')}`)
  const [note, setNote] = useState('')

  const incomingMovements = movements.filter(m => m.type === 'incoming').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const handleSubmit = () => {
    const item = stockItems.find(i => i.id === selectedItem)
    if (!item || !quantity || !price) return
    const qty = parseInt(quantity)
    const prc = parseInt(price)
    onAddMovement({
      id: `m${Date.now()}`,
      itemId: item.id,
      itemName: item.name,
      itemArticle: item.article,
      type: 'incoming',
      quantity: qty,
      price: prc,
      total: qty * prc,
      date: new Date().toISOString(),
      document: docNumber,
      supplier,
      responsible: 'Админ',
      note,
    })
    setShowForm(false)
    setSelectedItem('')
    setQuantity('')
    setPrice('')
    setNote('')
    setDocNumber(`ПРХ-${String(movements.filter(m => m.type === 'incoming').length + 2).padStart(3, '0')}`)
  }

  return (
    <div className="space-y-4">
      {/* Add incoming button */}
      <button onClick={() => setShowForm(!showForm)} className="w-full h-[44px] bg-[#34C759] text-white rounded-[13px] font-semibold text-[15px] flex items-center justify-center gap-2">
        📥 Оформить приход
      </button>

      {/* Incoming form */}
      {showForm && (
        <div className="bg-white rounded-[13px] shadow-sm p-5 border-2 border-[#34C759]">
          <h4 className="text-[15px] font-semibold text-[#1C1C1E] mb-4">Новый приход</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-[11px] text-[#8E8E93] mb-1 block">Запчасть *</label>
              <select value={selectedItem} onChange={(e) => { setSelectedItem(e.target.value); const it = stockItems.find(i => i.id === e.target.value); if (it) setPrice(String(it.purchasePrice)) }} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none">
                <option value="">Выберите...</option>
                {stockItems.map(i => <option key={i.id} value={i.id}>{i.name} ({i.brand}) — {i.article}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#8E8E93] mb-1 block">Количество *</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="0" className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none focus:ring-2 focus:ring-[#34C759] focus:ring-opacity-30" />
            </div>
            <div>
              <label className="text-[11px] text-[#8E8E93] mb-1 block">Цена за ед. ₽ *</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none focus:ring-2 focus:ring-[#34C759] focus:ring-opacity-30" />
            </div>
            <div>
              <label className="text-[11px] text-[#8E8E93] mb-1 block">Поставщик</label>
              <input value={supplier} onChange={(e) => setSupplier(e.target.value)} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none" />
            </div>
            <div>
              <label className="text-[11px] text-[#8E8E93] mb-1 block">Документ №</label>
              <input value={docNumber} onChange={(e) => setDocNumber(e.target.value)} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none" />
            </div>
            <div>
              <label className="text-[11px] text-[#8E8E93] mb-1 block">Примечание</label>
              <input value={note} onChange={(e) => setNote(e.target.value)} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none" />
            </div>
          </div>
          {quantity && price && (
            <div className="bg-[#34C759] bg-opacity-10 rounded-[8px] p-3 mb-4 text-[14px] text-[#34C759] font-medium">
              Итого: {(parseInt(quantity) * parseInt(price)).toLocaleString('ru-RU')} ₽
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={!selectedItem || !quantity || !price} className="h-[36px] px-6 bg-[#34C759] text-white rounded-[10px] text-[13px] font-semibold disabled:opacity-40">Оприходовать</button>
            <button onClick={() => setShowForm(false)} className="h-[36px] px-4 bg-[#F2F2F7] text-[#8E8E93] rounded-[10px] text-[13px]">Отмена</button>
          </div>
        </div>
      )}

      {/* Incoming history */}
      <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-[#F2F2F7] flex items-center justify-between">
          <span className="text-[13px] font-medium text-[#8E8E93]">ИСТОРИЯ ПРИХОДА</span>
          <span className="text-[13px] font-medium text-[#34C759]">Итого: {incomingTotal(incomingMovements).toLocaleString('ru-RU')} ₽</span>
        </div>
        <div className="divide-y divide-[#E5E5EA]">
          {incomingMovements.slice(0, 10).map(m => (
            <div key={m.id} className="px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-[8px] bg-[#34C759] bg-opacity-15 flex items-center justify-center text-[14px]">📥</div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[#1C1C1E] truncate">{m.itemName}</div>
                <div className="text-[11px] text-[#8E8E93]">{m.supplier} • {m.document} • {m.quantity} шт × {m.price} ₽</div>
              </div>
              <div className="text-right">
                <div className="text-[14px] font-semibold text-[#34C759]">+{m.total.toLocaleString('ru-RU')} ₽</div>
                <div className="text-[10px] text-[#8E8E93]">{new Date(m.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Outgoing tab
function OutgoingTab({ stockItems, movements, onAddMovement }: { stockItems: StockItem[]; movements: StockMovement[]; onAddMovement: (m: StockMovement) => void }) {
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [quantity, setQuantity] = useState('')
  const [orderNumber, setOrderNumber] = useState('')
  const [note, setNote] = useState('')

  const outgoingMovements = movements.filter(m => m.type === 'outgoing').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const handleSubmit = () => {
    const item = stockItems.find(i => i.id === selectedItem)
    if (!item || !quantity) return
    const qty = parseInt(quantity)
    onAddMovement({
      id: `m${Date.now()}`,
      itemId: item.id,
      itemName: item.name,
      itemArticle: item.article,
      type: 'outgoing',
      quantity: qty,
      price: item.sellPrice,
      total: qty * item.sellPrice,
      date: new Date().toISOString(),
      orderNumber: orderNumber || undefined,
      responsible: 'Админ',
      note,
    })
    setShowForm(false)
    setSelectedItem('')
    setQuantity('')
    setOrderNumber('')
    setNote('')
  }

  return (
    <div className="space-y-4">
      <button onClick={() => setShowForm(!showForm)} className="w-full h-[44px] bg-[#FF9500] text-white rounded-[13px] font-semibold text-[15px] flex items-center justify-center gap-2">
        📤 Оформить расход
      </button>

      {showForm && (
        <div className="bg-white rounded-[13px] shadow-sm p-5 border-2 border-[#FF9500]">
          <h4 className="text-[15px] font-semibold text-[#1C1C1E] mb-4">Новый расход</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-[11px] text-[#8E8E93] mb-1 block">Запчасть *</label>
              <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none">
                <option value="">Выберите...</option>
                {stockItems.filter(i => i.quantity > 0).map(i => <option key={i.id} value={i.id}>{i.name} ({i.brand}) — остаток: {i.quantity}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#8E8E93] mb-1 block">Количество *</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="0" max={stockItems.find(i => i.id === selectedItem)?.quantity || 0} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none focus:ring-2 focus:ring-[#FF9500] focus:ring-opacity-30" />
            </div>
            <div>
              <label className="text-[11px] text-[#8E8E93] mb-1 block">Заказ-наряд</label>
              <input value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder="WO-XXX" className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none" />
            </div>
            <div>
              <label className="text-[11px] text-[#8E8E93] mb-1 block">Примечание</label>
              <input value={note} onChange={(e) => setNote(e.target.value)} className="w-full h-[36px] px-3 bg-[#F2F2F7] rounded-[8px] text-[14px] outline-none" />
            </div>
          </div>
          {selectedItem && quantity && (
            <div className="bg-[#FF9500] bg-opacity-10 rounded-[8px] p-3 mb-4 text-[14px] text-[#FF9500] font-medium">
              Списание: {parseInt(quantity)} шт × {stockItems.find(i => i.id === selectedItem)?.sellPrice} ₽ = {(parseInt(quantity) * (stockItems.find(i => i.id === selectedItem)?.sellPrice || 0)).toLocaleString('ru-RU')} ₽
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={!selectedItem || !quantity} className="h-[36px] px-6 bg-[#FF9500] text-white rounded-[10px] text-[13px] font-semibold disabled:opacity-40">Списать</button>
            <button onClick={() => setShowForm(false)} className="h-[36px] px-4 bg-[#F2F2F7] text-[#8E8E93] rounded-[10px] text-[13px]">Отмена</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-[#F2F2F7] flex items-center justify-between">
          <span className="text-[13px] font-medium text-[#8E8E93]">ИСТОРИЯ РАСХОДА</span>
          <span className="text-[13px] font-medium text-[#FF9500]">Итого: {outgoingTotal(outgoingMovements).toLocaleString('ru-RU')} ₽</span>
        </div>
        <div className="divide-y divide-[#E5E5EA]">
          {outgoingMovements.slice(0, 10).map(m => (
            <div key={m.id} className="px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-[8px] bg-[#FF9500] bg-opacity-15 flex items-center justify-center text-[14px]">📤</div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[#1C1C1E] truncate">{m.itemName}</div>
                <div className="text-[11px] text-[#8E8E93]">{m.orderNumber || 'Без заказа'} • {m.quantity} шт × {m.price} ₽ • {m.responsible}</div>
              </div>
              <div className="text-right">
                <div className="text-[14px] font-semibold text-[#FF9500]">-{m.total.toLocaleString('ru-RU')} ₽</div>
                <div className="text-[10px] text-[#8E8E93]">{new Date(m.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Movements journal tab
function MovementsTab({ movements }: { movements: StockMovement[] }) {
  const [filter, setFilter] = useState<'all' | 'incoming' | 'outgoing'>('all')
  const sorted = [...movements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const filtered = filter === 'all' ? sorted : sorted.filter(m => m.type === filter)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['all', 'incoming', 'outgoing'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 h-[32px] rounded-[8px] text-[12px] font-medium transition-colors ${
              filter === f ? 'bg-[#007AFF] text-white' : 'bg-white text-[#8E8E93] border border-[#E5E5EA]'
            }`}
          >{f === 'all' ? 'Все' : f === 'incoming' ? '📥 Приход' : '📤 Расход'}</button>
        ))}
      </div>

      <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
        <div className="divide-y divide-[#E5E5EA]">
          {filtered.map(m => (
            <div key={m.id} className="px-4 py-3 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center text-[14px] ${
                m.type === 'incoming' ? 'bg-[#34C759] bg-opacity-15' : 'bg-[#FF9500] bg-opacity-15'
              }`}>
                {m.type === 'incoming' ? '📥' : '📤'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[#1C1C1E]">{m.itemName}</div>
                <div className="text-[11px] text-[#8E8E93]">
                  {m.type === 'incoming' ? `Поставщик: ${m.supplier}` : `Заказ: ${m.orderNumber || '—'}`}
                  {' • '}{m.document || '—'}{' • '}{m.responsible}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-[14px] font-semibold ${m.type === 'incoming' ? 'text-[#34C759]' : 'text-[#FF9500]'}`}>
                  {m.type === 'incoming' ? '+' : '-'}{m.quantity} шт
                </div>
                <div className="text-[12px] text-[#1C1C1E]">{m.total.toLocaleString('ru-RU')} ₽</div>
                <div className="text-[10px] text-[#8E8E93]">{new Date(m.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function incomingTotal(movements: StockMovement[]): number {
  return movements.reduce((s, m) => s + m.total, 0)
}

function outgoingTotal(movements: StockMovement[]): number {
  return movements.reduce((s, m) => s + m.total, 0)
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

function ReportsSection({ stockItems }: { stockItems?: StockItem[] }) {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month')
  const [reportTab, setReportTab] = useState<'overview' | 'daily' | 'mechanics' | 'services'>('overview')

  const periodLabels = { week: 'Неделя', month: 'Месяц', quarter: 'Квартал', year: 'Год' }

  // Monthly data
  const monthlyData = [
    { month: 'Янв', revenue: 180000, orders: 28, parts: 52000, labor: 128000 },
    { month: 'Фев', revenue: 195000, orders: 31, parts: 58000, labor: 137000 },
    { month: 'Мар', revenue: 220000, orders: 35, parts: 65000, labor: 155000 },
    { month: 'Апр', revenue: 210000, orders: 33, parts: 62000, labor: 148000 },
    { month: 'Май', revenue: 240000, orders: 38, parts: 71000, labor: 169000 },
    { month: 'Июн', revenue: 260000, orders: 42, parts: 78000, labor: 182000 },
    { month: 'Июл', revenue: 235000, orders: 37, parts: 70000, labor: 165000 },
    { month: 'Авг', revenue: 247500, orders: 43, parts: 74000, labor: 173500 },
  ]

  // Daily data for August
  const dailyData = [
    { day: 1, weekday: 'Пт', revenue: 12500, orders: 2 },
    { day: 2, weekday: 'Сб', revenue: 0, orders: 0 },
    { day: 3, weekday: 'Вс', revenue: 0, orders: 0 },
    { day: 4, weekday: 'Пн', revenue: 8200, orders: 1 },
    { day: 5, weekday: 'Вт', revenue: 15400, orders: 3 },
    { day: 6, weekday: 'Ср', revenue: 6800, orders: 1 },
    { day: 7, weekday: 'Чт', revenue: 11200, orders: 2 },
    { day: 8, weekday: 'Пт', revenue: 18600, orders: 3 },
    { day: 9, weekday: 'Сб', revenue: 4500, orders: 1 },
    { day: 10, weekday: 'Вс', revenue: 0, orders: 0 },
    { day: 11, weekday: 'Пн', revenue: 9800, orders: 2 },
    { day: 12, weekday: 'Вт', revenue: 14200, orders: 2 },
    { day: 13, weekday: 'Ср', revenue: 16800, orders: 3 },
    { day: 14, weekday: 'Чт', revenue: 22100, orders: 4 },
    { day: 15, weekday: 'Пт', revenue: 19500, orders: 3 },
  ]
  const maxDailyRevenue = Math.max(...dailyData.map(d => d.revenue))

  // Day of week distribution
  const weekdayData = [
    { day: 'Пн', revenue: 35200, orders: 6, color: '#007AFF' },
    { day: 'Вт', revenue: 42800, orders: 7, color: '#5AC8FA' },
    { day: 'Ср', revenue: 38400, orders: 6, color: '#34C759' },
    { day: 'Чт', revenue: 48600, orders: 8, color: '#FF9500' },
    { day: 'Пт', revenue: 52100, orders: 9, color: '#FF3B30' },
    { day: 'Сб', revenue: 22500, orders: 4, color: '#5856D6' },
    { day: 'Вс', revenue: 7800, orders: 1, color: '#8E8E93' },
  ]
  const maxWeekdayRevenue = Math.max(...weekdayData.map(d => d.revenue))

  // Top mechanics
  const mechanicsData = [
    { name: 'Сидоров Алексей', orders: 52, revenue: 186000, avgTime: 65, rating: 4.8, specialties: ['ТО', 'Двигатель', 'ГРМ'], load: 78 },
    { name: 'Иванов Пётр', orders: 38, revenue: 98000, avgTime: 45, rating: 4.6, specialties: ['Тормоза', 'Подвеска'], load: 62 },
    { name: 'Козлов Дмитрий', orders: 24, revenue: 54000, avgTime: 55, rating: 4.4, specialties: ['ТО', 'Шиномонтаж'], load: 45 },
  ]

  // Top services
  const topServices = [
    { name: 'Замена масла', count: 45, revenue: 67500, avgPrice: 1500, trend: '+12%', category: 'ТО' },
    { name: 'Замена колодок', count: 28, revenue: 56000, avgPrice: 2000, trend: '+8%', category: 'Тормоза' },
    { name: 'Комплексное ТО', count: 18, revenue: 90000, avgPrice: 5000, trend: '+15%', category: 'ТО' },
    { name: 'Замена ГРМ', count: 12, revenue: 42000, avgPrice: 3500, trend: '+5%', category: 'Двигатель' },
    { name: 'Диагностика', count: 35, revenue: 17500, avgPrice: 500, trend: '+20%', category: 'Диагностика' },
    { name: 'Замена фильтров', count: 40, revenue: 24000, avgPrice: 600, trend: '+10%', category: 'ТО' },
    { name: 'Замена жидкостей', count: 22, revenue: 26400, avgPrice: 1200, trend: '+7%', category: 'ТО' },
    { name: 'Замена свечей', count: 18, revenue: 7200, avgPrice: 400, trend: '+3%', category: 'ТО' },
    { name: 'Замена сцепления', count: 6, revenue: 36000, avgPrice: 6000, trend: '+2%', category: 'Двигатель' },
    { name: 'Шиномонтаж', count: 15, revenue: 9000, avgPrice: 600, trend: '+18%', category: 'Шины' },
  ]

  // Service category distribution
  const categoryData = [
    { name: 'ТО', revenue: 222900, percent: 53, color: '#007AFF' },
    { name: 'Тормоза', revenue: 62000, percent: 15, color: '#FF3B30' },
    { name: 'Двигатель', revenue: 78000, percent: 19, color: '#FF9500' },
    { name: 'Диагностика', revenue: 17500, percent: 4, color: '#5856D6' },
    { name: 'Шины', revenue: 9000, percent: 2, color: '#34C759' },
    { name: 'Прочее', revenue: 29100, percent: 7, color: '#8E8E93' },
  ]

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))
  const currentMonth = monthlyData[monthlyData.length - 1]
  const prevMonth = monthlyData[monthlyData.length - 2]
  const revenueChange = ((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue * 100).toFixed(1)
  const ordersChange = ((currentMonth.orders - prevMonth.orders) / prevMonth.orders * 100).toFixed(1)

  const lowStockItems = stockItems ? stockItems.filter(i => i.quantity <= i.minQuantity) : []

  const yearlyRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0)
  const yearlyOrders = monthlyData.reduce((s, d) => s + d.orders, 0)
  const yearlyParts = monthlyData.reduce((s, d) => s + d.parts, 0)
  const yearlyLabor = monthlyData.reduce((s, d) => s + d.labor, 0)

  const tabs = [
    { id: 'overview' as const, label: 'Обзор', icon: '📊' },
    { id: 'daily' as const, label: 'По дням', icon: '📅' },
    { id: 'mechanics' as const, label: 'Мастера', icon: '👷' },
    { id: 'services' as const, label: 'Услуги', icon: '🔧' },
  ]

  return (
    <div className="space-y-4">
      {/* Period selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['week', 'month', 'quarter', 'year'] as const).map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 h-[32px] rounded-[8px] text-[12px] font-medium transition-colors whitespace-nowrap ${
              period === p ? 'bg-[#007AFF] text-white' : 'bg-white text-[#8E8E93] border border-[#E5E5EA]'
            }`}
          >{periodLabels[p]}</button>
        ))}
      </div>

      {/* Report tabs */}
      <div className="flex gap-1 bg-[#F2F2F7] p-1 rounded-[10px] overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setReportTab(t.id)}
            className={`flex-1 min-w-[70px] h-[36px] rounded-[8px] text-[12px] font-medium transition-colors whitespace-nowrap ${
              reportTab === t.id ? 'bg-white text-[#1C1C1E] shadow-sm' : 'text-[#8E8E93]'
            }`}
          >{t.icon} {t.label}</button>
        ))}
      </div>

      {/* TAB: Overview */}
      {reportTab === 'overview' && (
        <div className="space-y-4">
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white rounded-[13px] p-4 shadow-sm">
              <div className="text-[11px] text-[#8E8E93] mb-1">Выручка (авг)</div>
              <div className="text-[22px] font-bold text-[#1C1C1E]">{(currentMonth.revenue / 1000).toFixed(0)}к ₽</div>
              <div className={`text-[12px] font-medium ${parseFloat(revenueChange) >= 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
                {parseFloat(revenueChange) >= 0 ? '↑' : '↓'} {revenueChange}% к прошлому мес.
              </div>
            </div>
            <div className="bg-white rounded-[13px] p-4 shadow-sm">
              <div className="text-[11px] text-[#8E8E93] mb-1">Заказов (авг)</div>
              <div className="text-[22px] font-bold text-[#1C1C1E]">{currentMonth.orders}</div>
              <div className={`text-[12px] font-medium ${parseFloat(ordersChange) >= 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
                {parseFloat(ordersChange) >= 0 ? '↑' : '↓'} {ordersChange}% к прошлому мес.
              </div>
            </div>
            <div className="bg-white rounded-[13px] p-4 shadow-sm">
              <div className="text-[11px] text-[#8E8E93] mb-1">Средний чек</div>
              <div className="text-[22px] font-bold text-[#007AFF]">{(currentMonth.revenue / currentMonth.orders).toLocaleString('ru-RU')} ₽</div>
              <div className="text-[12px] text-[#8E8E93]">за август</div>
            </div>
            <div className="bg-white rounded-[13px] p-4 shadow-sm">
              <div className="text-[11px] text-[#8E8E93] mb-1">Маржинальность</div>
              <div className="text-[22px] font-bold text-[#34C759]">{((yearlyLabor / yearlyRevenue) * 100).toFixed(0)}%</div>
              <div className="text-[12px] text-[#8E8E93]">доля работы в выручке</div>
            </div>
          </div>

          {/* Revenue chart */}
          <div className="bg-white rounded-[13px] shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] font-semibold text-[#1C1C1E]">Выручка по месяцам</h3>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#007AFF]" /> Работа</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#5AC8FA]" /> Запчасти</span>
              </div>
            </div>
            <div className="flex items-end gap-1 sm:gap-2 h-[180px]">
              {monthlyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-[9px] text-[#8E8E93]">{(d.revenue / 1000).toFixed(0)}к</div>
                  <div className="w-full flex flex-col justify-end" style={{ height: '140px' }}>
                    <div className="w-full rounded-t-sm bg-[#5AC8FA]" style={{ height: `${(d.parts / maxRevenue) * 140}px` }} />
                    <div className="w-full bg-[#007AFF]" style={{ height: `${(d.labor / maxRevenue) * 140}px` }} />
                  </div>
                  <div className="text-[9px] text-[#8E8E93]">{d.month}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Category distribution */}
          <div className="bg-white rounded-[13px] shadow-sm p-4">
            <h3 className="text-[14px] font-semibold text-[#1C1C1E] mb-3">Структура выручки по категориям</h3>
            <div className="space-y-2">
              {categoryData.map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[12px] mb-1">
                    <span className="text-[#1C1C1E] font-medium">{cat.name}</span>
                    <span className="text-[#8E8E93]">{cat.percent}% • {cat.revenue.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="h-2 bg-[#F2F2F7] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${cat.percent}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock alerts */}
          {lowStockItems.length > 0 && (
            <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-[#FF3B30] bg-opacity-10 border-b border-[#FF3B30] border-opacity-20 flex items-center justify-between">
                <h3 className="text-[13px] font-semibold text-[#FF3B30]">⚠️ Низкие остатки</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF3B30] text-white">{lowStockItems.length}</span>
              </div>
              <div className="divide-y divide-[#E5E5EA]">
                {lowStockItems.slice(0, 3).map(item => (
                  <div key={item.id} className="px-4 py-2 flex items-center justify-between">
                    <div className="text-[13px] text-[#1C1C1E]">{item.name}</div>
                    <div className={`text-[14px] font-bold ${item.quantity === 0 ? 'text-[#FF3B30]' : 'text-[#FF9500]'}`}>{item.quantity} шт</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB: Daily */}
      {reportTab === 'daily' && (
        <div className="space-y-4">
          {/* Daily chart */}
          <div className="bg-white rounded-[13px] shadow-sm p-4">
            <h3 className="text-[14px] font-semibold text-[#1C1C1E] mb-3">Выручка по дням — Август 2026</h3>
            <div className="flex items-end gap-0.5 sm:gap-1 h-[160px] overflow-x-auto">
              {dailyData.map((d, i) => (
                <div key={i} className="flex-1 min-w-[18px] flex flex-col items-center gap-0.5">
                  {d.revenue > 0 && <div className="text-[8px] text-[#8E8E93]">{(d.revenue / 1000).toFixed(0)}к</div>}
                  <div
                    className={`w-full rounded-t-sm transition-all ${d.revenue === 0 ? 'bg-[#F2F2F7]' : d.weekday === 'Сб' || d.weekday === 'Вс' ? 'bg-[#8E8E93]' : 'bg-[#007AFF]'}`}
                    style={{ height: d.revenue === 0 ? '4px' : `${(d.revenue / maxDailyRevenue) * 140}px` }}
                  />
                  <div className={`text-[8px] ${d.day === 14 ? 'text-[#007AFF] font-bold' : 'text-[#8E8E93]'}`}>{d.day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekday distribution */}
          <div className="bg-white rounded-[13px] shadow-sm p-4">
            <h3 className="text-[14px] font-semibold text-[#1C1C1E] mb-3">Выручка по дням недели</h3>
            <div className="flex items-end gap-2 h-[140px]">
              {weekdayData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-[9px] text-[#8E8E93]">{(d.revenue / 1000).toFixed(0)}к</div>
                  <div className="w-full rounded-t-sm" style={{ height: `${(d.revenue / maxWeekdayRevenue) * 110}px`, backgroundColor: d.color }} />
                  <div className="text-[11px] font-medium text-[#1C1C1E]">{d.day}</div>
                  <div className="text-[9px] text-[#8E8E93]">{d.orders} зак.</div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily summary table */}
          <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-[#F2F2F7]">
              <h3 className="text-[13px] font-medium text-[#8E8E93]">ДЕТАЛИ ПО ДНЯМ</h3>
            </div>
            <div className="divide-y divide-[#E5E5EA] max-h-[300px] overflow-y-auto">
              {dailyData.filter(d => d.revenue > 0).map((d, i) => (
                <div key={i} className="px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F2F2F7] flex items-center justify-center text-[12px] font-bold text-[#1C1C1E]">{d.day}</div>
                    <div>
                      <div className="text-[13px] font-medium text-[#1C1C1E]">Август, {d.weekday}</div>
                      <div className="text-[11px] text-[#8E8E93]">{d.orders} заказов</div>
                    </div>
                  </div>
                  <div className="text-[15px] font-semibold text-[#1C1C1E]">{d.revenue.toLocaleString('ru-RU')} ₽</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: Mechanics */}
      {reportTab === 'mechanics' && (
        <div className="space-y-4">
          {/* Mechanics ranking */}
          <div className="space-y-3">
            {mechanicsData.map((m, i) => (
              <div key={i} className="bg-white rounded-[13px] shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-[16px] ${
                      i === 0 ? 'bg-[#FF9500]' : i === 1 ? 'bg-[#8E8E93]' : 'bg-[#CD7F32]'
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[16px] font-semibold text-[#1C1C1E]">{m.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[12px] text-[#FF9500]">⭐ {m.rating}</span>
                        <span className="text-[12px] text-[#8E8E93]">•</span>
                        {m.specialties.map((s, si) => (
                          <span key={si} className="px-1.5 py-0.5 bg-[#F2F2F7] rounded text-[10px] text-[#8E8E93]">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="text-center">
                      <div className="text-[18px] font-bold text-[#007AFF]">{m.orders}</div>
                      <div className="text-[10px] text-[#8E8E93]">Заказов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[18px] font-bold text-[#34C759]">{(m.revenue / 1000).toFixed(0)}к ₽</div>
                      <div className="text-[10px] text-[#8E8E93]">Выручка</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[18px] font-bold text-[#1C1C1E]">{m.avgTime}</div>
                      <div className="text-[10px] text-[#8E8E93]">Ср. мин</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[18px] font-bold text-[#FF9500]">{(m.revenue / m.orders / 1000).toFixed(1)}к</div>
                      <div className="text-[10px] text-[#8E8E93]">Ср. чек</div>
                    </div>
                  </div>

                  {/* Load bar */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#8E8E93]">Загрузка</span>
                      <span className="font-medium text-[#1C1C1E]">{m.load}%</span>
                    </div>
                    <div className="h-3 bg-[#F2F2F7] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{
                        width: `${m.load}%`,
                        backgroundColor: m.load > 80 ? '#FF3B30' : m.load > 60 ? '#FF9500' : '#34C759',
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mechanics comparison */}
          <div className="bg-white rounded-[13px] shadow-sm p-4">
            <h3 className="text-[14px] font-semibold text-[#1C1C1E] mb-3">Сравнение мастеров</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[12px] mb-1"><span className="text-[#8E8E93]">Выручка</span></div>
                {mechanicsData.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] text-[#8E8E93] w-[100px] truncate">{m.name.split(' ')[0]}</span>
                    <div className="flex-1 h-4 bg-[#F2F2F7] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[#007AFF]" style={{ width: `${(m.revenue / mechanicsData[0].revenue) * 100}%` }} />
                    </div>
                    <span className="text-[11px] font-medium text-[#1C1C1E] w-[60px] text-right">{(m.revenue / 1000).toFixed(0)}к ₽</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex justify-between text-[12px] mb-1"><span className="text-[#8E8E93]">Количество заказов</span></div>
                {mechanicsData.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] text-[#8E8E93] w-[100px] truncate">{m.name.split(' ')[0]}</span>
                    <div className="flex-1 h-4 bg-[#F2F2F7] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[#34C759]" style={{ width: `${(m.orders / mechanicsData[0].orders) * 100}%` }} />
                    </div>
                    <span className="text-[11px] font-medium text-[#1C1C1E] w-[60px] text-right">{m.orders}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex justify-between text-[12px] mb-1"><span className="text-[#8E8E93]">Средний чек</span></div>
                {mechanicsData.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] text-[#8E8E93] w-[100px] truncate">{m.name.split(' ')[0]}</span>
                    <div className="flex-1 h-4 bg-[#F2F2F7] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[#FF9500]" style={{ width: `${(m.revenue / m.orders) / (mechanicsData[0].revenue / mechanicsData[0].orders) * 100}%` }} />
                    </div>
                    <span className="text-[11px] font-medium text-[#1C1C1E] w-[60px] text-right">{(m.revenue / m.orders / 1000).toFixed(1)}к ₽</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Services */}
      {reportTab === 'services' && (
        <div className="space-y-4">
          {/* Top services */}
          <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-[#F2F2F7]">
              <h3 className="text-[13px] font-medium text-[#8E8E93]">ТОП УСЛУГ ПО ВЫРУЧКЕ</h3>
            </div>
            <div className="divide-y divide-[#E5E5EA]">
              {topServices.map((s, i) => (
                <div key={i} className="px-4 py-3 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#007AFF] bg-opacity-10 flex items-center justify-center text-[12px] font-bold text-[#007AFF]">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium text-[#1C1C1E]">{s.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#F2F2F7] rounded text-[#8E8E93]">{s.category}</span>
                      <span className="text-[11px] text-[#8E8E93]">{s.count} заказов • ср. {s.avgPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-semibold text-[#1C1C1E]">{s.revenue.toLocaleString('ru-RU')} ₽</div>
                    <div className="text-[11px] text-[#34C759] font-medium">{s.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service volume chart */}
          <div className="bg-white rounded-[13px] shadow-sm p-4">
            <h3 className="text-[14px] font-semibold text-[#1C1C1E] mb-3">Количество заказов по услугам</h3>
            <div className="space-y-2">
              {topServices.slice(0, 7).map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[11px] text-[#8E8E93] w-[110px] truncate">{s.name}</span>
                  <div className="flex-1 h-5 bg-[#F2F2F7] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#007AFF]" style={{ width: `${(s.count / topServices[0].count) * 100}%` }} />
                  </div>
                  <span className="text-[11px] font-medium text-[#1C1C1E] w-[30px] text-right">{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Yearly summary */}
          <div className="bg-white rounded-[13px] shadow-sm p-4">
            <h3 className="text-[14px] font-semibold text-[#1C1C1E] mb-3">Итого за 2026 год</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F2F2F7] rounded-[10px] p-3 text-center">
                <div className="text-[20px] font-bold text-[#1C1C1E]">{yearlyRevenue.toLocaleString('ru-RU')} ₽</div>
                <div className="text-[10px] text-[#8E8E93]">Общая выручка</div>
              </div>
              <div className="bg-[#F2F2F7] rounded-[10px] p-3 text-center">
                <div className="text-[20px] font-bold text-[#1C1C1E]">{yearlyOrders}</div>
                <div className="text-[10px] text-[#8E8E93]">Заказов</div>
              </div>
              <div className="bg-[#F2F2F7] rounded-[10px] p-3 text-center">
                <div className="text-[20px] font-bold text-[#007AFF]">{yearlyLabor.toLocaleString('ru-RU')} ₽</div>
                <div className="text-[10px] text-[#8E8E93]">Работа</div>
              </div>
              <div className="bg-[#F2F2F7] rounded-[10px] p-3 text-center">
                <div className="text-[20px] font-bold text-[#5AC8FA]">{yearlyParts.toLocaleString('ru-RU')} ₽</div>
                <div className="text-[10px] text-[#8E8E93]">Запчасти</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
