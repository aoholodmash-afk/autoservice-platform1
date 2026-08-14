'use client'

import { useState, useEffect } from 'react'

const COOKIE_KEY = 'autoservice_cookie_consent'

export function useCookieConsent() {
  const [accepted, setAccepted] = useState(true) // default: hide until checked

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY)
    setAccepted(stored === 'true')
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'true')
    setAccepted(true)
  }

  return { accepted, accept }
}

export function CookieBanner() {
  const { accepted, accept } = useCookieConsent()

  if (accepted) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 pb-[max(16px,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-[430px] bg-[#1C1C1E] rounded-[16px] p-5 shadow-lg spring-in" style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.2)' }}>
        <div className="flex items-start gap-3 mb-4">
          <span className="text-[24px] flex-shrink-0">🍪</span>
          <div>
            <h3 className="text-[15px] font-semibold text-white mb-1">Мы используем файлы cookie</h3>
            <p className="text-[13px] text-white/60 leading-[1.4]">
              Мы используем cookie для улучшения работы сайта, сохранения ваших настроек и автомобиля.
              Продолжая использование, вы соглашаетесь с{' '}
              <a href="/privacy" className="text-[#0A84FF] underline">политикой конфиденциальности</a>.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="flex-1 h-[44px] bg-[#007AFF] text-white rounded-[12px] font-semibold text-[15px] active:scale-[0.97] transition-transform"
          >
            Принять
          </button>
          <a
            href="/privacy"
            className="h-[44px] px-4 bg-white/10 text-white/70 rounded-[12px] font-medium text-[15px] flex items-center"
          >
            Подробнее
          </a>
        </div>
      </div>
    </div>
  )
}
