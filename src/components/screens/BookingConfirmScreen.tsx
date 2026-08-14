'use client'

import { Button } from '@/components/ui/Button'
import { t } from '@/lib/i18n'

interface BookingConfirmScreenProps {
  serviceName: string
  carName: string
  date: string
  time?: string
  onHome: () => void
}

export function BookingConfirmScreen({ serviceName, carName, date, time, onHome }: BookingConfirmScreenProps) {
  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      {/* Success icon */}
      <div className="w-[80px] h-[80px] rounded-full bg-[var(--success)] flex items-center justify-center mb-6 spring-in">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M10 20L17 27L30 13"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 50,
              strokeDashoffset: 0,
              animation: 'checkmark 0.5s ease-out forwards'
            }}
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-[22px] font-semibold text-[var(--ink)] mb-2 text-center spring-in" style={{ animationDelay: '200ms' }}>
        {t('booking.confirmed')}
      </h2>

      <p className="text-[15px] text-[var(--ink-secondary)] text-center mb-8 spring-in" style={{ animationDelay: '300ms' }}>
        {t('booking.confirmed.desc')}
      </p>

      {/* Booking details card */}
      <div className="w-full max-w-[320px] bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 mb-8 spring-in" style={{ animationDelay: '400ms' }}>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-[var(--separator)]">
            <span className="text-[15px] text-[var(--ink-secondary)]">Услуга</span>
            <span className="text-[15px] font-medium text-[var(--ink)] text-right">{serviceName}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[var(--separator)]">
            <span className="text-[15px] text-[var(--ink-secondary)]">Авто</span>
            <span className="text-[15px] font-medium text-[var(--ink)]">{carName}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[var(--separator)]">
            <span className="text-[15px] text-[var(--ink-secondary)]">Дата</span>
            <span className="text-[15px] font-medium text-[var(--ink)] capitalize">{formattedDate}</span>
          </div>
          {time && (
            <div className="flex justify-between py-2">
              <span className="text-[15px] text-[var(--ink-secondary)]">Время</span>
              <span className="text-[15px] font-medium text-[var(--ink)]">{time}</span>
            </div>
          )}
        </div>
      </div>

      {/* Home button */}
      <div className="w-full max-w-[320px] spring-in" style={{ animationDelay: '500ms' }}>
        <Button onClick={onHome} size="large">
          {t('booking.toHome')}
        </Button>
      </div>
    </div>
  )
}
