'use client'

import { Button } from '@/components/ui/Button'
import { t } from '@/lib/i18n'

interface WelcomeScreenProps {
  onAddCar: () => void
  hasExistingCars: boolean
  onGoToCars: () => void
}

export function WelcomeScreen({ onAddCar, hasExistingCars, onGoToCars }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Car illustration */}
      <div className="mb-8 spring-in">
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <rect x="20" y="30" width="80" height="30" rx="8" fill="var(--accent)" opacity="0.1"/>
          <rect x="30" y="15" width="50" height="25" rx="6" fill="var(--accent)" opacity="0.2"/>
          <circle cx="35" cy="60" r="8" fill="var(--accent)" opacity="0.3"/>
          <circle cx="85" cy="60" r="8" fill="var(--accent)" opacity="0.3"/>
          <rect x="32" y="18" width="20" height="12" rx="3" fill="var(--accent)" opacity="0.4"/>
          <rect x="56" y="18" width="20" height="12" rx="3" fill="var(--accent)" opacity="0.4"/>
          <path d="M20 45 Q10 45 10 50 L10 55 Q10 60 15 60 L25 60" stroke="var(--accent)" strokeWidth="2" fill="none" opacity="0.5"/>
          <path d="M100 45 Q110 45 110 50 L110 55 Q110 60 105 60 L95 60" stroke="var(--accent)" strokeWidth="2" fill="none" opacity="0.5"/>
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-[34px] font-bold text-[var(--ink)] text-center mb-3 spring-in" style={{ animationDelay: '100ms' }}>
        {t('welcome.title')}
      </h1>

      {/* Subtitle */}
      <p className="text-[17px] text-[var(--ink-secondary)] text-center mb-12 leading-[1.47] whitespace-pre-line spring-in" style={{ animationDelay: '200ms' }}>
        {t('welcome.subtitle')}
      </p>

      {/* Add car button */}
      <div className="w-full max-w-[320px] spring-in" style={{ animationDelay: '300ms' }}>
        <Button onClick={onAddCar} size="large">
          {t('welcome.addCar')}
        </Button>
      </div>

      {/* Existing cars link */}
      {hasExistingCars && (
        <button
          onClick={onGoToCars}
          className="mt-6 text-[var(--accent)] text-[15px] font-medium spring-in"
          style={{ animationDelay: '400ms' }}
        >
          {t('welcome.haveAccount')} →
        </button>
      )}
    </div>
  )
}
