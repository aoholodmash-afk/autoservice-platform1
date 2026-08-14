'use client'

import { useState } from 'react'
import { haptic } from '@/lib/constants'

interface ClientLoginFormProps {
  onSuccess: (phone: string) => void
  onSkip?: () => void
}

export function ClientLoginForm({ onSuccess, onSkip }: ClientLoginFormProps) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)

  const handleSendCode = () => {
    haptic('light')
    if (!phone || phone.length < 10) {
      setError('Введите корректный номер телефона')
      return
    }
    setError('')
    // Generate 6-digit code
    const newCode = String(Math.floor(100000 + Math.random() * 900000))
    setGeneratedCode(newCode)
    setStep('code')
    // Start countdown
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  const handleVerify = () => {
    haptic('light')
    if (code !== generatedCode) {
      setError('Неверный код')
      return
    }
    setError('')
    // Save client phone
    localStorage.setItem('autoservice_client_phone', phone)
    onSuccess(phone)
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="w-full max-w-[360px] bg-white rounded-[16px] shadow-lg p-6 spring-in">
        {step === 'phone' ? (
          <>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#007AFF] flex items-center justify-center mx-auto mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <h2 className="text-[18px] font-bold text-[#1C1C1E]">Вход по телефону</h2>
              <p className="text-[13px] text-[#8E8E93] mt-1">Введите номер для записи на обслуживание</p>
            </div>
            <div className="space-y-3">
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
                onKeyDown={e => e.key === 'Enter' && handleSendCode()}
                className="w-full h-[44px] px-4 bg-[#F2F2F7] rounded-[10px] text-[16px] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30" />
              {error && <p className="text-[13px] text-[#FF3B30]">{error}</p>}
              <button onClick={handleSendCode} disabled={phone.length < 10}
                className="w-full h-[48px] bg-[#007AFF] text-white rounded-[13px] font-semibold text-[16px] disabled:opacity-40">
                Получить код
              </button>
              {onSkip && (
                <button onClick={onSkip} className="w-full text-[13px] text-[#8E8E93]">
                  Пропустить →
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-[18px] font-bold text-[#1C1C1E]">Введите код</h2>
              <p className="text-[13px] text-[#8E8E93] mt-1">Код отправлен на {phone}</p>
            </div>
            <div className="space-y-3">
              {/* Show code for demo */}
              <div className="bg-[#F2F2F7] rounded-[10px] p-3 text-center">
                <p className="text-[11px] text-[#8E8E93] mb-1">Ваш код (демо):</p>
                <p className="text-[24px] font-bold text-[#007AFF] tracking-[0.3em] font-mono">{generatedCode}</p>
              </div>
              <input value={code} onChange={e => setCode(e.target.value)} placeholder="Введите 6-значный код"
                maxLength={6} onKeyDown={e => e.key === 'Enter' && handleVerify()}
                className="w-full h-[44px] px-4 bg-[#F2F2F7] rounded-[10px] text-[20px] text-center tracking-[0.5em] outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-opacity-30" />
              {error && <p className="text-[13px] text-[#FF3B30]">{error}</p>}
              <button onClick={handleVerify} disabled={code.length !== 6}
                className="w-full h-[48px] bg-[#007AFF] text-white rounded-[13px] font-semibold text-[16px] disabled:opacity-40">
                Подтвердить
              </button>
              <button onClick={() => { setStep('phone'); setCode(''); setError('') }}
                className="w-full text-[13px] text-[#8E8E93]">
                ← Изменить номер
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
