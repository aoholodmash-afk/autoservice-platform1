'use client'

import { useState } from 'react'
import { hashPassword, generateCode } from '@/lib/auth'

const SUPER_ADMIN_KEY = 'autoservice_super_admin'

interface SuperAdminData {
  login: string
  passwordHash: string
  email: string
  secret2FA: string
}

export default function SuperRegisterPage() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async () => {
    setError('')
    if (!login || !password || !email) { setError('Заполните все поля'); return }
    if (password.length < 6) { setError('Пароль минимум 6 символов'); return }
    if (password !== password2) { setError('Пароли не совпадают'); return }

    // Check if already registered
    if (localStorage.getItem(SUPER_ADMIN_KEY)) {
      setError('Super Admin уже зарегистрирован')
      return
    }

    setLoading(true)
    const passwordHash = await hashPassword(password)
    const secret2FA = generateCode() // Email verification code placeholder

    const admin: SuperAdminData = { login, passwordHash, email, secret2FA }
    localStorage.setItem(SUPER_ADMIN_KEY, JSON.stringify(admin))
    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)' }}>
        <div className="w-full max-w-[380px] bg-white/10 backdrop-blur-xl rounded-[21px] p-8 border border-white/20 text-center spring-in">
          <div className="w-16 h-16 rounded-full bg-[#34C759] flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
          </div>
          <h1 className="text-[22px] font-bold text-white mb-2">Регистрация завершена!</h1>
          <p className="text-[14px] text-white/60 mb-6">Super Admin создан. Теперь войдите в панель.</p>
          <a href="/super" className="inline-block h-[48px] px-8 text-white rounded-[13px] font-semibold leading-[48px]"
            style={{ background: 'linear-gradient(135deg, #5856D6, #007AFF)' }}>
            Войти в панель
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)' }}>
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-[#5856D6] opacity-10 blur-[120px]" />
      </div>
      <div className="relative w-full max-w-[380px] bg-white/10 backdrop-blur-xl rounded-[21px] p-8 border border-white/20 spring-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-[16px] flex items-center justify-center mx-auto mb-4 text-3xl" style={{ background: 'linear-gradient(135deg, #5856D6, #FF3B30)' }}>🏢</div>
          <h1 className="text-[24px] font-bold text-white">Регистрация</h1>
          <p className="text-[14px] text-white/50">Создание Super Admin</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[12px] text-white/50 mb-1 block">Логин *</label>
            <input value={login} onChange={e => setLogin(e.target.value)} placeholder="admin"
              className="w-full h-[44px] px-4 bg-white/10 rounded-[13px] text-white placeholder-white/40 outline-none border border-white/10 focus:border-[#5856D6]" />
          </div>
          <div>
            <label className="text-[12px] text-white/50 mb-1 block">Пароль *</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Минимум 6 символов"
              className="w-full h-[44px] px-4 bg-white/10 rounded-[13px] text-white placeholder-white/40 outline-none border border-white/10 focus:border-[#5856D6]" />
          </div>
          <div>
            <label className="text-[12px] text-white/50 mb-1 block">Подтвердите пароль *</label>
            <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} placeholder="Повторите пароль"
              className="w-full h-[44px] px-4 bg-white/10 rounded-[13px] text-white placeholder-white/40 outline-none border border-white/10 focus:border-[#5856D6]" />
          </div>
          <div>
            <label className="text-[12px] text-white/50 mb-1 block">Email * (для 2FA)</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com"
              className="w-full h-[44px] px-4 bg-white/10 rounded-[13px] text-white placeholder-white/40 outline-none border border-white/10 focus:border-[#5856D6]" />
          </div>
          {error && <p className="text-[13px] text-[#FF453A] text-center">{error}</p>}
          <button onClick={handleRegister} disabled={loading}
            className="w-full h-[48px] text-white rounded-[13px] font-semibold disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #5856D6, #007AFF)' }}>
            {loading ? 'Создание...' : 'Зарегистрироваться'}
          </button>
        </div>
      </div>
    </div>
  )
}
