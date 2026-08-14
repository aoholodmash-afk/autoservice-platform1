'use client'

import { useState } from 'react'
import { getServiceById } from '@/data/services'
import { SavedCar } from '@/hooks/useCarStore'
import { Button } from '@/components/ui/Button'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface BookingScreenProps {
  serviceId: string
  car: SavedCar
  onConfirm: (booking: {
    date: string
    time: string
    name: string
    phone: string
    comment: string
  }) => void
  onBack: () => void
}

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
]

export function BookingScreen({ serviceId, car, onConfirm, onBack }: BookingScreenProps) {
  const service = getServiceById(serviceId)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  if (!service) return null

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0]

  // Get max date (3 months from now)
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  const handleSubmit = async () => {
    if (!date || !name || !phone) return
    haptic('heavy')
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    onConfirm({ date, time, name, phone, comment })
  }

  const isValid = date && name && phone

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button
            onClick={() => {
              haptic('light')
              onBack()
            }}
            className="text-[var(--accent)] text-[17px] font-medium flex items-center gap-1"
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t('common.back')}
          </button>
          <div className="flex-1 text-center text-[17px] font-semibold text-[var(--ink)] pr-10">
            {t('booking.title')}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Service card */}
        <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 mb-6 spring-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-[var(--fill)] flex items-center justify-center text-[20px]">
              {service.icon}
            </div>
            <div>
              <div className="text-[17px] font-medium text-[var(--ink)]">
                {t(service.nameKey)}
              </div>
              <div className="text-[13px] text-[var(--ink-secondary)]">
                {service.duration} {t('to.minutes')} • {t('to.from')} {service.priceFrom.toLocaleString('ru-RU')} ₽
              </div>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="mb-4 spring-in" style={{ animationDelay: '100ms' }}>
          <label className="text-[13px] text-[var(--ink-secondary)] font-medium mb-2 block">
            {t('booking.date')} *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            max={maxDateStr}
            className="w-full h-[44px] px-4 bg-[var(--card)] rounded-[13px] text-[17px] text-[var(--ink)] border border-[var(--separator)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20 outline-none transition-all"
          />
        </div>

        {/* Time slots */}
        <div className="mb-6 spring-in" style={{ animationDelay: '150ms' }}>
          <label className="text-[13px] text-[var(--ink-secondary)] font-medium mb-2 block">
            {t('booking.time')}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map(slot => (
              <button
                key={slot}
                onClick={() => {
                  haptic('light')
                  setTime(slot)
                }}
                className={`h-[40px] rounded-[10px] text-[15px] font-medium transition-all duration-200 ${
                  time === slot
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--card)] text-[var(--ink)] border border-[var(--separator)]'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div className="mb-4 spring-in" style={{ animationDelay: '200ms' }}>
          <label className="text-[13px] text-[var(--ink-secondary)] font-medium mb-2 block">
            {t('booking.name')} *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван"
            className="w-full h-[44px] px-4 bg-[var(--card)] rounded-[13px] text-[17px] text-[var(--ink)] border border-[var(--separator)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20 outline-none transition-all placeholder-[var(--ink-secondary)]"
          />
        </div>

        {/* Phone */}
        <div className="mb-4 spring-in" style={{ animationDelay: '250ms' }}>
          <label className="text-[13px] text-[var(--ink-secondary)] font-medium mb-2 block">
            {t('booking.phone')} *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (999) 123-45-67"
            className="w-full h-[44px] px-4 bg-[var(--card)] rounded-[13px] text-[17px] text-[var(--ink)] border border-[var(--separator)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20 outline-none transition-all placeholder-[var(--ink-secondary)]"
          />
        </div>

        {/* Comment */}
        <div className="mb-8 spring-in" style={{ animationDelay: '300ms' }}>
          <label className="text-[13px] text-[var(--ink-secondary)] font-medium mb-2 block">
            {t('booking.comment')}
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('booking.comment.placeholder')}
            rows={3}
            className="w-full px-4 py-3 bg-[var(--card)] rounded-[13px] text-[17px] text-[var(--ink)] border border-[var(--separator)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20 outline-none transition-all placeholder-[var(--ink-secondary)] resize-none"
          />
        </div>

        {/* Submit button */}
        <div className="spring-in" style={{ animationDelay: '350ms' }}>
          <Button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            size="large"
          >
            {loading ? t('booking.sending') : t('booking.submit')}
          </Button>
        </div>
      </div>
    </div>
  )
}
