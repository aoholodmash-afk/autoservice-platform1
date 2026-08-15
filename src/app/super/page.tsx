'use client'

import { useState, useEffect } from 'react'
import { getTenants, Tenant } from '@/lib/tenantStore'
import { getAdminUsers, AdminUser } from '@/lib/adminAuth'
import { getSession, clearSession } from '@/lib/auth'
import { haptic } from '@/lib/constants'

type SuperSection = 'dashboard' | 'tenants' | 'users' | 'invites'

export default function SuperAdminPage() {
  const [isAuth, setIsAuth] = useState(false)
  const [section, setSection] = useState<SuperSection>('dashboard')
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [users, setUsers] = useState<AdminUser[]>([])

  useEffect(() => {
    const session = getSession()
    setIsAuth(session !== null && session.role === 'super_admin')
  }, [])

  useEffect(() => {
    if (isAuth) {
      getTenants().then(setTenants)
      setUsers(getAdminUsers())
    }
  }, [isAuth])

  if (!isAuth) {
    return <SuperLoginPage onLogin={() => setIsAuth(true)} />
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)' }}>
      {/* Sidebar */}
      <aside className="w-[240px] border-r border-white/10 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-[20px] font-bold text-white">🏢 SaaS Admin</h1>
          <p className="text-[11px] text-white/40">Управление платформой</p>
        </div>

        <nav className="space-y-1 flex-1">
          {[
            { id: 'dashboard' as SuperSection, icon: '📊', label: 'Дашборд' },
            { id: 'tenants' as SuperSection, icon: '🏪', label: 'Филиалы' },
            { id: 'users' as SuperSection, icon: '👤', label: 'Пользователи' },
            { id: 'invites' as SuperSection, icon: '🎟', label: 'Приглашения' },
          ].map(item => (
            <button key={item.id} onClick={() => { haptic('light'); setSection(item.id) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
                section === item.id
                  ? 'text-white' 
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
              style={section === item.id ? { background: 'linear-gradient(135deg, #007AFF, #5856D6)' } : {}}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button onClick={() => { clearSession(); setIsAuth(false) }}
          className="text-white/40 text-[13px] hover:text-white transition-colors">
          ← Выйти
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        {section === 'dashboard' && <DashboardSection tenants={tenants} users={users} />}
        {section === 'tenants' && <TenantsSection tenants={tenants} onRefresh={() => getTenants().then(setTenants)} />}
        {section === 'users' && <UsersSection users={users} tenants={tenants} />}
        {section === 'invites' && <InvitesSection tenants={tenants} />}
      </main>
    </div>
  )
}

// ===== LOGIN =====
function SuperLoginPage({ onLogin }: { onLogin: () => void }) {
  const [step, setStep] = useState<'login' | 'password' | '2fa'>('login')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [code2FA, setCode2FA] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const SUPER_ADMIN_KEY = 'autoservice_super_admin'

  const handleLoginStep = () => {
    setError('')
    if (!login) return
    // Check if admin exists
    const stored = localStorage.getItem(SUPER_ADMIN_KEY)
    if (!stored) {
      setError('Super Admin не зарегистрирован. Перейдите на /super/register')
      return
    }
    const admin = JSON.parse(stored)
    if (admin.login !== login) {
      setError('Неверный логин')
      return
    }
    setStep('password')
  }

  const handlePasswordStep = async () => {
    setError('')
    setLoading(true)
    const stored = localStorage.getItem(SUPER_ADMIN_KEY)
    if (!stored) { setError('Ошибка'); setLoading(false); return }
    const admin = JSON.parse(stored)
    const { verifyPassword } = await import('@/lib/auth')
    const valid = await verifyPassword(password, admin.passwordHash)
    if (!valid) {
      setError('Неверный пароль')
      setLoading(false)
      return
    }
    // Generate 2FA code
    const { generateCode } = await import('@/lib/auth')
    const code = generateCode()
    setGeneratedCode(code)
    setStep('2fa')
    setLoading(false)
  }

  const handle2FAStep = () => {
    setError('')
    if (code2FA !== generatedCode) {
      setError('Неверный код')
      return
    }
    // Save session
    const { saveSession } = require('@/lib/auth')
    saveSession({ userId: 'super_admin', role: 'super_admin' })
    onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)' }}>
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-[#5856D6] opacity-10 blur-[120px]" />
      </div>
      <div className="relative w-full max-w-[380px] bg-white/10 backdrop-blur-xl rounded-[21px] p-8 border border-white/20 spring-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-[16px] flex items-center justify-center mx-auto mb-4 text-3xl" style={{ background: 'linear-gradient(135deg, #5856D6, #FF3B30)' }}>🏢</div>
          <h1 className="text-[24px] font-bold text-white">Super Admin</h1>
          <p className="text-[14px] text-white/50">
            {step === 'login' ? 'Введите логин' : step === 'password' ? 'Введите пароль' : 'Код подтверждения'}
          </p>
        </div>

        {/* Step 1: Login */}
        {step === 'login' && (
          <div className="space-y-4">
            <input value={login} onChange={e => setLogin(e.target.value)} placeholder="Логин" onKeyDown={e => e.key === 'Enter' && handleLoginStep()}
              className="w-full h-[44px] px-4 bg-white/10 rounded-[13px] text-white placeholder-white/40 outline-none border border-white/10 focus:border-[#5856D6]" />
            {error && <p className="text-[13px] text-[#FF453A] text-center">{error}</p>}
            <button onClick={handleLoginStep} className="w-full h-[48px] text-white rounded-[13px] font-semibold"
              style={{ background: 'linear-gradient(135deg, #5856D6, #007AFF)' }}>
              Далее
            </button>
            <a href="/super/register" className="block text-center text-[13px] text-white/40 hover:text-white/70">
              Зарегистрироваться →
            </a>
          </div>
        )}

        {/* Step 2: Password */}
        {step === 'password' && (
          <div className="space-y-4">
            <p className="text-[13px] text-white/50 text-center">Логин: <span className="text-white font-medium">{login}</span></p>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" onKeyDown={e => e.key === 'Enter' && handlePasswordStep()}
              className="w-full h-[44px] px-4 bg-white/10 rounded-[13px] text-white placeholder-white/40 outline-none border border-white/10 focus:border-[#5856D6]" />
            {error && <p className="text-[13px] text-[#FF453A] text-center">{error}</p>}
            <button onClick={handlePasswordStep} disabled={loading}
              className="w-full h-[48px] text-white rounded-[13px] font-semibold disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #5856D6, #007AFF)' }}>
              {loading ? 'Проверка...' : 'Далее'}
            </button>
            <button onClick={() => { setStep('login'); setError('') }} className="w-full text-[13px] text-white/40 hover:text-white/70">
              ← Назад
            </button>
          </div>
        )}

        {/* Step 3: 2FA Email Code */}
        {step === '2fa' && (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-[13px] p-4 text-center border border-white/10">
              <p className="text-[12px] text-white/50 mb-2">Код отправлен на email</p>
              <p className="text-[28px] font-bold text-white tracking-[0.3em] font-mono">{generatedCode}</p>
              <p className="text-[11px] text-white/30 mt-2">Для демо: код показан на экране</p>
            </div>
            <input value={code2FA} onChange={e => setCode2FA(e.target.value)} placeholder="Введите 6-значный код" maxLength={6}
              className="w-full h-[44px] px-4 bg-white/10 rounded-[13px] text-white text-center text-[20px] tracking-[0.5em] outline-none border border-white/10 focus:border-[#5856D6]" />
            {error && <p className="text-[13px] text-[#FF453A] text-center">{error}</p>}
            <button onClick={handle2FAStep} disabled={code2FA.length !== 6}
              className="w-full h-[48px] text-white rounded-[13px] font-semibold disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #5856D6, #007AFF)' }}>
              Подтвердить
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ===== DASHBOARD =====
function DashboardSection({ tenants, users }: { tenants: Tenant[]; users: AdminUser[] }) {
  const activeTenants = tenants.filter(t => t.isActive)
  const tariffCounts = { start: 0, business: 0, pro: 0 }
  tenants.forEach(t => tariffCounts[t.tariff]++)

  const stats = [
    { label: 'Филиалов', value: tenants.length, icon: '🏪', color: '#007AFF' },
    { label: 'Активных', value: activeTenants.length, icon: '✅', color: '#34C759' },
    { label: 'Пользователей', value: users.length, icon: '👤', color: '#5856D6' },
    { label: 'Городов', value: new Set(tenants.map(t => t.city).filter(Boolean)).size, icon: '📍', color: '#FF9500' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-[28px] font-bold text-white">Дашборд</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white/10 backdrop-blur rounded-[16px] p-5 border border-white/10 spring-up"
            style={{ animationDelay: `${i * 80}ms`, boxShadow: `0 4px 20px ${s.color}22` }}>
            <span className="text-2xl">{s.icon}</span>
            <p className="text-[32px] font-bold text-white mt-2">{s.value}</p>
            <p className="text-[13px] text-white/50">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tariff breakdown */}
      <div className="bg-white/10 backdrop-blur rounded-[16px] p-5 border border-white/10">
        <h3 className="text-[16px] font-semibold text-white mb-4">Тарифы</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: 'Start', count: tariffCounts.start, color: '#8E8E93', price: '0 ₽/мес' },
            { name: 'Business', count: tariffCounts.business, color: '#007AFF', price: '2 990 ₽/мес' },
            { name: 'Pro', count: tariffCounts.pro, color: '#5856D6', price: '5 990 ₽/мес' },
          ].map(t => (
            <div key={t.name} className="bg-white/5 rounded-[12px] p-4 text-center border border-white/10">
              <p className="text-[24px] font-bold" style={{ color: t.color }}>{t.count}</p>
              <p className="text-[14px] text-white font-medium">{t.name}</p>
              <p className="text-[11px] text-white/40">{t.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent tenants */}
      <div className="bg-white/10 backdrop-blur rounded-[16px] border border-white/10 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10">
          <h3 className="text-[16px] font-semibold text-white">Последние филиалы</h3>
        </div>
        <div className="divide-y divide-white/5">
          {tenants.slice(0, 5).map(t => (
            <div key={t.id} className="px-5 py-3 flex items-center justify-between">
              <div>
                <p className="text-[14px] text-white font-medium">{t.name}</p>
                <p className="text-[12px] text-white/40">{t.city} • {t.address}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                t.tariff === 'pro' ? 'bg-[#5856D6]/20 text-[#a78bfa]' :
                t.tariff === 'business' ? 'bg-[#007AFF]/20 text-[#60a5fa]' :
                'bg-white/10 text-white/50'
              }`}>{t.tariff}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ===== TENANTS =====
function TenantsSection({ tenants, onRefresh }: { tenants: Tenant[]; onRefresh: () => void }) {
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-bold text-white">Филиалы</h2>
        <button onClick={() => setShowCreate(true)}
          className="h-[40px] px-5 text-white rounded-[12px] font-semibold text-[14px]"
          style={{ background: 'linear-gradient(135deg, #34C759, #30D158)' }}>
          + Создать филиал
        </button>
      </div>

      {showCreate && <CreateTenantForm onClose={() => setShowCreate(false)} onCreated={onRefresh} />}

      {/* Tenants table */}
      <div className="bg-white/10 backdrop-blur rounded-[16px] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-[12px] font-medium text-white/50">Название</th>
                <th className="px-4 py-3 text-left text-[12px] font-medium text-white/50">Город</th>
                <th className="px-4 py-3 text-left text-[12px] font-medium text-white/50">Slug</th>
                <th className="px-4 py-3 text-center text-[12px] font-medium text-white/50">Боксы</th>
                <th className="px-4 py-3 text-center text-[12px] font-medium text-white/50">Тариф</th>
                <th className="px-4 py-3 text-center text-[12px] font-medium text-white/50">Статус</th>
                <th className="px-4 py-3 text-center text-[12px] font-medium text-white/50">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tenants.map(t => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-[14px] text-white font-medium">{t.name}</p>
                    <p className="text-[11px] text-white/40">{t.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-white/70">{t.city}</td>
                  <td className="px-4 py-3">
                    <code className="px-2 py-0.5 bg-white/10 rounded text-[12px] text-[#60a5fa] font-mono">/{t.slug}</code>
                  </td>
                  <td className="px-4 py-3 text-center text-[14px] text-white">{t.boxes}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      t.tariff === 'pro' ? 'bg-[#5856D6]/20 text-[#a78bfa]' :
                      t.tariff === 'business' ? 'bg-[#007AFF]/20 text-[#60a5fa]' :
                      'bg-white/10 text-white/50'
                    }`}>{t.tariff}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      t.isActive ? 'bg-[#34C759]/20 text-[#4ade80]' : 'bg-[#FF3B30]/20 text-[#f87171]'
                    }`}>{t.isActive ? 'Активен' : 'Отключён'}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <a href={`/${t.slug}`} target="_blank" className="text-[#60a5fa] text-[12px] hover:underline">Открыть</a>
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

// ===== CREATE TENANT FORM =====
function CreateTenantForm({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({
    name: '', slug: '', address: '', phone: '', email: '', city: '',
    description: '', workHours: '09:00–20:00', boxes: 3,
    serviceCategories: ['to', 'repair', 'diagnostic', 'tires'] as string[],
    tariff: 'start' as 'start' | 'business' | 'pro',
  })

  const handleSubmit = async () => {
    if (!form.name || !form.phone) return
    const { saveTenant } = require('@/lib/tenantStore')
    await saveTenant({
      ...form,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9а-яё]/gi, '-').replace(/-+/g, '-').slice(0, 30),
      isActive: true,
    })
    onCreated()
    onClose()
  }

  const categories = [
    { id: 'to', label: 'ТО', icon: '🛢' },
    { id: 'repair', label: 'Ремонт', icon: '🔧' },
    { id: 'diagnostic', label: 'Диагностика', icon: '🔍' },
    { id: 'tires', label: 'Шиномонтаж', icon: '🛞' },
  ]

  return (
    <div className="bg-white/10 backdrop-blur rounded-[16px] p-6 border border-white/20 spring-in">
      <h3 className="text-[18px] font-semibold text-white mb-4">Новый филиал</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-[12px] text-white/50 mb-1 block">Название *</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9а-яё]/gi, '-').replace(/-+/g, '-').slice(0, 30) })}
            placeholder="Автомастер Про" className="w-full h-[40px] px-3 bg-white/5 rounded-[10px] text-white text-[14px] outline-none border border-white/10 focus:border-[#007AFF]" />
        </div>
        <div>
          <label className="text-[12px] text-white/50 mb-1 block">Slug (URL)</label>
          <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })}
            placeholder="avtomaster-pro" className="w-full h-[40px] px-3 bg-white/5 rounded-[10px] text-white text-[14px] outline-none border border-white/10 focus:border-[#007AFF] font-mono" />
        </div>
        <div>
          <label className="text-[12px] text-white/50 mb-1 block">Город</label>
          <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}
            placeholder="Москва" className="w-full h-[40px] px-3 bg-white/5 rounded-[10px] text-white text-[14px] outline-none border border-white/10 focus:border-[#007AFF]" />
        </div>
        <div>
          <label className="text-[12px] text-white/50 mb-1 block">Адрес *</label>
          <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
            placeholder="ул. Пушкина, д. 10" className="w-full h-[40px] px-3 bg-white/5 rounded-[10px] text-white text-[14px] outline-none border border-white/10 focus:border-[#007AFF]" />
        </div>
        <div>
          <label className="text-[12px] text-white/50 mb-1 block">Телефон *</label>
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="+7 (999) 123-45-67" className="w-full h-[40px] px-3 bg-white/5 rounded-[10px] text-white text-[14px] outline-none border border-white/10 focus:border-[#007AFF]" />
        </div>
        <div>
          <label className="text-[12px] text-white/50 mb-1 block">Email</label>
          <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="info@example.ru" className="w-full h-[40px] px-3 bg-white/5 rounded-[10px] text-white text-[14px] outline-none border border-white/10 focus:border-[#007AFF]" />
        </div>
        <div>
          <label className="text-[12px] text-white/50 mb-1 block">Часы работы</label>
          <input value={form.workHours} onChange={e => setForm({ ...form, workHours: e.target.value })}
            className="w-full h-[40px] px-3 bg-white/5 rounded-[10px] text-white text-[14px] outline-none border border-white/10 focus:border-[#007AFF]" />
        </div>
        <div>
          <label className="text-[12px] text-white/50 mb-1 block">Кол-во боксов</label>
          <input type="number" value={form.boxes} onChange={e => setForm({ ...form, boxes: parseInt(e.target.value) || 1 })}
            className="w-full h-[40px] px-3 bg-white/5 rounded-[10px] text-white text-[14px] outline-none border border-white/10 focus:border-[#007AFF]" />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-[12px] text-white/50 mb-2 block">Виды деятельности</label>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => {
              setForm(f => ({
                ...f,
                serviceCategories: f.serviceCategories.includes(cat.id)
                  ? f.serviceCategories.filter(c => c !== cat.id)
                  : [...f.serviceCategories, cat.id]
              }))
            }}
              className={`px-3 py-1.5 rounded-[8px] text-[13px] font-medium transition-all ${
                form.serviceCategories.includes(cat.id) ? 'bg-[#007AFF] text-white' : 'bg-white/10 text-white/60'
              }`}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-[12px] text-white/50 mb-2 block">Тариф</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'start' as const, label: 'Start', price: '0 ₽', features: 'Базовый' },
            { id: 'business' as const, label: 'Business', price: '2 990 ₽', features: 'Расширенный' },
            { id: 'pro' as const, label: 'Pro', price: '5 990 ₽', features: 'Полный' },
          ].map(t => (
            <button key={t.id} onClick={() => setForm({ ...form, tariff: t.id })}
              className={`p-3 rounded-[10px] text-center transition-all border ${
                form.tariff === t.id ? 'bg-[#5856D6]/20 border-[#5856D6] text-white' : 'bg-white/5 border-white/10 text-white/60'
              }`}>
              <p className="text-[14px] font-semibold">{t.label}</p>
              <p className="text-[11px] opacity-60">{t.price}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleSubmit} disabled={!form.name || !form.phone || !form.address}
          className="flex-1 h-[44px] text-white rounded-[12px] font-semibold disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #34C759, #30D158)' }}>
          Создать филиал
        </button>
        <button onClick={onClose} className="h-[44px] px-6 bg-white/10 text-white/60 rounded-[12px] font-medium">
          Отмена
        </button>
      </div>
    </div>
  )
}

// ===== USERS =====
function UsersSection({ users, tenants }: { users: AdminUser[]; tenants: Tenant[] }) {
  const getTenantName = (tenantId: string) => {
    if (tenantId === '*') return 'Все филиалы'
    return tenants.find(t => t.id === tenantId)?.name || tenantId
  }

  const roleLabels: Record<string, { label: string; color: string }> = {
    super_admin: { label: 'Супер-админ', color: 'bg-[#FF3B30]/20 text-[#f87171]' },
    admin: { label: 'Админ', color: 'bg-[#007AFF]/20 text-[#60a5fa]' },
    mechanic: { label: 'Мастер', color: 'bg-[#34C759]/20 text-[#4ade80]' },
  }

  return (
    <div className="space-y-6">
      <h2 className="text-[28px] font-bold text-white">Пользователи</h2>

      <div className="bg-white/10 backdrop-blur rounded-[16px] border border-white/10 overflow-hidden">
        <div className="divide-y divide-white/5">
          {users.map(u => (
            <div key={u.id} className="px-5 py-3 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: u.role === 'super_admin' ? '#FF3B30' : u.role === 'admin' ? '#007AFF' : '#34C759' }}>
                {u.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-white font-medium">{u.name}</p>
                <p className="text-[12px] text-white/40">{u.phone} • {getTenantName(u.tenantId)}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${roleLabels[u.role]?.color}`}>
                {roleLabels[u.role]?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ===== INVITES =====
function InvitesSection({ tenants }: { tenants: Tenant[] }) {
  const [invites, setInvites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('autoservice_invites') || '[]') } catch { return [] }
  })
  const [showCreate, setShowCreate] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState('')
  const [copiedToken, setCopiedToken] = useState('')

  const handleCreate = () => {
    const { createInvite } = require('@/lib/inviteStore')
    const tenant = tenants.find(t => t.id === selectedTenant)
    const invite = createInvite('admin', selectedTenant || undefined, tenant?.slug)
    setInvites((prev: any[]) => [...prev, invite])
    setShowCreate(false)
    setSelectedTenant('')
  }

  const handleCopy = (token: string) => {
    const inv = invites.find((i: any) => i.token === token)
    const url = `${window.location.origin}/${inv?.tenantSlug || 'slug'}/admin/invite?token=${token}`
    navigator.clipboard.writeText(url)
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(''), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-bold text-white">Приглашения</h2>
        <button onClick={() => setShowCreate(true)}
          className="h-[36px] px-4 text-white rounded-[10px] text-[13px] font-semibold"
          style={{ background: 'linear-gradient(135deg, #34C759, #30D158)' }}>
          + Создать приглашение
        </button>
      </div>

      {showCreate && (
        <div className="bg-white/10 backdrop-blur rounded-[16px] p-5 border border-white/20 spring-in">
          <h3 className="text-[16px] font-semibold text-white mb-4">Новое приглашение</h3>
          <div className="space-y-3 mb-4">
            <div>
              <label className="text-[12px] text-white/50 mb-1 block">Филиал</label>
              <select value={selectedTenant} onChange={e => setSelectedTenant(e.target.value)}
                className="w-full h-[40px] px-3 bg-white/5 rounded-[10px] text-white text-[14px] outline-none border border-white/10">
                <option value="">Без привязки к филиалу</option>
                {tenants.map(t => <option key={t.id} value={t.id}>{t.name} ({t.slug})</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} className="h-[36px] px-5 bg-[#34C759] text-white rounded-[10px] text-[13px] font-semibold">
              Создать
            </button>
            <button onClick={() => setShowCreate(false)} className="h-[36px] px-4 bg-white/10 text-white/60 rounded-[10px] text-[13px]">
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="bg-white/10 backdrop-blur rounded-[16px] border border-white/10 overflow-hidden">
        {invites.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[15px] text-white/40">Нет приглашений</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {invites.map((inv: any) => (
              <div key={inv.id} className="px-5 py-3 flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold ${
                  inv.isUsed ? 'bg-[#34C759]/20 text-[#4ade80]' : 'bg-[#007AFF]/20 text-[#60a5fa]'
                }`}>
                  {inv.isUsed ? '✓' : '🎟'}
                </div>
                <div className="flex-1">
                  <p className="text-[14px] text-white font-medium font-mono">{inv.token}</p>
                  <p className="text-[11px] text-white/40">
                    {inv.tenantSlug ? `/${inv.tenantSlug}` : 'Без филиала'} • {inv.isUsed ? `Использован: ${inv.usedByName}` : 'Активно'}
                  </p>
                </div>
                {!inv.isUsed && (
                  <button onClick={() => handleCopy(inv.token)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-medium ${
                      copiedToken === inv.token ? 'bg-[#34C759] text-white' : 'bg-white/10 text-white/60'
                    }`}>
                    {copiedToken === inv.token ? '✓ Скопировано' : 'Копировать ссылку'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
