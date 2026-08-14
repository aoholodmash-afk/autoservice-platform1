'use client'

import { useState } from 'react'
import { getTenantBySlug, Tenant } from '@/lib/tenantStore'
import { getAuthState, loginAdmin, logoutAdmin, AdminUser } from '@/lib/adminAuth'
import { haptic } from '@/lib/constants'

export default function TenantAdminPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const tenant = getTenantBySlug(slug)
  const [auth, setAuth] = useState(getAuthState())
  const [section, setSection] = useState<'dashboard' | 'orders' | 'schedule' | 'clients' | 'services' | 'stock'>('dashboard')

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="text-center">
          <div className="text-[44px] mb-4">🏪</div>
          <h1 className="text-[22px] font-bold mb-2">Филиал не найден</h1>
          <a href="/" className="text-[#007AFF]">На главную</a>
        </div>
      </div>
    )
  }

  if (!auth.isAuthenticated) {
    return <AdminLoginPage tenant={tenant} onLogin={() => setAuth(getAuthState())} />
  }

  const navItems = [
    { id: 'dashboard' as const, icon: '📊', label: 'Дашборд' },
    { id: 'orders' as const, icon: '➕', label: 'Заказы' },
    { id: 'schedule' as const, icon: '🗓', label: 'Расписание' },
    { id: 'clients' as const, icon: '👥', label: 'Клиенты' },
    { id: 'services' as const, icon: '🔧', label: 'Услуги' },
    { id: 'stock' as const, icon: '📦', label: 'Склад' },
  ]

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E5EA] sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 h-[52px]">
          <div className="flex items-center gap-3">
            <a href={`/${slug}`} className="text-[#007AFF] text-[13px]">← Клиент</a>
            <span className="text-[13px] text-[#8E8E93]">|</span>
            <h1 className="text-[16px] font-semibold text-[#1C1C1E]">{tenant.name}</h1>
          </div>
          <button onClick={() => { logoutAdmin(); setAuth(getAuthState()) }}
            className="text-[13px] text-[#8E8E93]">Выйти</button>
        </div>
      </header>

      {/* Nav tabs */}
      <nav className="bg-white border-b border-[#E5E5EA] overflow-x-auto">
        <div className="flex px-4">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { haptic('light'); setSection(item.id) }}
              className={`flex items-center gap-1.5 px-3 py-3 text-[13px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                section === item.id ? 'border-[#007AFF] text-[#007AFF]' : 'border-transparent text-[#8E8E93]'
              }`}>
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="p-4 max-w-[800px] mx-auto">
        {section === 'dashboard' && <TenantDashboard tenant={tenant} />}
        {section === 'orders' && <TenantOrders />}
        {section === 'schedule' && <TenantSchedule />}
        {section === 'clients' && <TenantClients />}
        {section === 'services' && <TenantServices tenant={tenant} />}
        {section === 'stock' && <TenantStock />}
      </main>
    </div>
  )
}

// ===== LOGIN =====
function AdminLoginPage({ tenant, onLogin }: { tenant: Tenant; onLogin: () => void }) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)

  const handleLogin = () => {
    loginAdmin(phone, code)
    onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F2F2F7]">
      <div className="w-full max-w-[380px] bg-white rounded-[16px] shadow-sm p-8 spring-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-[16px] bg-[#007AFF] flex items-center justify-center mx-auto mb-4 text-3xl">🔧</div>
          <h1 className="text-[20px] font-bold text-[#1C1C1E]">{tenant.name}</h1>
          <p className="text-[14px] text-[#8E8E93]">Вход в панель управления</p>
        </div>
        <div className="space-y-4">
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Телефон"
            className="w-full h-[44px] px-4 bg-[#F2F2F7] rounded-[10px] text-[16px] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30" />
          {phone && !codeSent && (
            <button onClick={() => setCodeSent(true)}
              className="w-full h-[48px] bg-[#007AFF] text-white rounded-[13px] font-semibold text-[16px]">
              Получить код
            </button>
          )}
          {codeSent && (
            <>
              <input value={code} onChange={e => setCode(e.target.value)} placeholder="Код" maxLength={4}
                className="w-full h-[44px] px-4 bg-[#F2F2F7] rounded-[10px] text-[20px] text-center tracking-[0.5em] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30" />
              <button onClick={handleLogin} disabled={code.length !== 4}
                className="w-full h-[48px] bg-[#007AFF] text-white rounded-[13px] font-semibold text-[16px] disabled:opacity-40">
                Войти
              </button>
              <p className="text-[12px] text-[#8E8E93] text-center">Демо: любой 4-значный код</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ===== DASHBOARD =====
function TenantDashboard({ tenant }: { tenant: Tenant }) {
  const stats = [
    { label: 'Заказов сегодня', value: '5', icon: '📋', color: '#007AFF' },
    { label: 'Записей', value: '8', icon: '📅', color: '#5856D6' },
    { label: 'Клиентов', value: '38', icon: '👥', color: '#34C759' },
    { label: 'Выручка', value: '45 200 ₽', icon: '💰', color: '#FF9500' },
  ]

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-[#007AFF] to-[#5856D6] rounded-[16px] p-5 text-white">
        <h2 className="text-[20px] font-bold mb-1">{tenant.name}</h2>
        <p className="text-[13px] opacity-80">{tenant.address} • {tenant.workHours}</p>
        <div className="flex gap-2 mt-3">
          {tenant.serviceCategories.map(cat => (
            <span key={cat} className="px-2 py-0.5 bg-white/20 rounded-full text-[11px]">{cat}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-[13px] p-4 shadow-sm">
            <span className="text-xl">{s.icon}</span>
            <p className="text-[22px] font-bold text-[#1C1C1E] mt-2">{s.value}</p>
            <p className="text-[12px] text-[#8E8E93]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== ORDERS =====
function TenantOrders() {
  return (
    <div className="bg-white rounded-[13px] p-8 text-center shadow-sm">
      <div className="text-[44px] mb-3">📋</div>
      <p className="text-[15px] text-[#8E8E93]">Заказы — в разработке</p>
    </div>
  )
}

// ===== SCHEDULE =====
function TenantSchedule() {
  return (
    <div className="bg-white rounded-[13px] p-8 text-center shadow-sm">
      <div className="text-[44px] mb-3">🗓</div>
      <p className="text-[15px] text-[#8E8E93]">Расписание — в разработке</p>
    </div>
  )
}

// ===== CLIENTS =====
function TenantClients() {
  return (
    <div className="bg-white rounded-[13px] p-8 text-center shadow-sm">
      <div className="text-[44px] mb-3">👥</div>
      <p className="text-[15px] text-[#8E8E93]">Клиенты — в разработке</p>
    </div>
  )
}

// ===== SERVICES =====
function TenantServices({ tenant }: { tenant: Tenant }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-[13px] shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-[#F2F2F7]">
          <h3 className="text-[13px] font-medium text-[#8E8E93]">КАТЕГОРИИ УСЛУГ</h3>
        </div>
        <div className="divide-y divide-[#E5E5EA]">
          {tenant.serviceCategories.map(cat => (
            <div key={cat} className="px-4 py-3 flex items-center justify-between">
              <span className="text-[14px] text-[#1C1C1E] capitalize">{cat}</span>
              <span className="text-[13px] text-[#007AFF]">Настроить →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ===== STOCK =====
function TenantStock() {
  return (
    <div className="bg-white rounded-[13px] p-8 text-center shadow-sm">
      <div className="text-[44px] mb-3">📦</div>
      <p className="text-[15px] text-[#8E8E93]">Склад — в разработке</p>
    </div>
  )
}
