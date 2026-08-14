'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface CarConfirmProps {
  brandName: string
  modelName: string
  year: number
  engineName: string
  onConfirm: () => void
  onBack: () => void
}

export function CarConfirm({ brandName, modelName, year, engineName, onConfirm, onBack }: CarConfirmProps) {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    haptic('heavy')
    setSaved(true)
    setTimeout(onConfirm, 1500)
  }

  if (saved) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        {/* Checkmark animation */}
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

        <h2 className="text-[22px] font-semibold text-[var(--ink)] mb-2 spring-in" style={{ animationDelay: '200ms' }}>
          {t('wizard.saved')}
        </h2>
        <p className="text-[15px] text-[var(--ink-secondary)] text-center spring-in" style={{ animationDelay: '300ms' }}>
          {t('wizard.saved.desc')}
        </p>
      </div>
    )
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-[34px] font-bold text-[var(--ink)] mb-6">
        {t('wizard.confirm')}
      </h1>

      {/* Car card */}
      <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] overflow-hidden mb-8 spring-in">
        {/* Car illustration */}
        <div className="h-[140px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent)] opacity-10 flex items-center justify-center">
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
            <rect x="15" y="20" width="70" height="25" rx="6" fill="var(--accent)"/>
            <rect x="25" y="8" width="45" height="20" rx="5" fill="var(--accent)" opacity="0.7"/>
            <circle cx="30" cy="45" r="7" fill="var(--accent)" opacity="0.5"/>
            <circle cx="70" cy="45" r="7" fill="var(--accent)" opacity="0.5"/>
          </svg>
        </div>

        {/* Car details */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-[var(--separator)]">
            <span className="text-[15px] text-[var(--ink-secondary)]">Марка</span>
            <span className="text-[17px] font-medium text-[var(--ink)]">{brandName}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-[var(--separator)]">
            <span className="text-[15px] text-[var(--ink-secondary)]">Модель</span>
            <span className="text-[17px] font-medium text-[var(--ink)]">{modelName}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-[var(--separator)]">
            <span className="text-[15px] text-[var(--ink-secondary)]">Год</span>
            <span className="text-[17px] font-medium text-[var(--ink)]">{year}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[15px] text-[var(--ink-secondary)]">Двигатель</span>
            <span className="text-[17px] font-medium text-[var(--ink)]">{engineName}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <Button onClick={handleSave} size="large">
          {t('wizard.save')}
        </Button>
        <Button onClick={onBack} variant="ghost">
          {t('common.back')}
        </Button>
      </div>
    </div>
  )
}
