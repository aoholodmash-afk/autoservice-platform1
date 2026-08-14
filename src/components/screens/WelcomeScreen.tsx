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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-animated-gradient opacity-5" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[var(--accent)] opacity-5 blur-[80px]" />

      {/* Premium car illustration with glow */}
      <div className="relative mb-8 spring-in">
        <div className="absolute inset-0 bg-[var(--accent)] opacity-10 blur-[40px] rounded-full" />
        <div className="relative float">
          <svg width="140" height="90" viewBox="0 0 140 90" fill="none">
            {/* Car body */}
            <rect x="20" y="30" width="100" height="35" rx="10" fill="url(#carGradient)" opacity="0.9"/>
            <rect x="30" y="15" width="60" height="28" rx="8" fill="url(#carGradient)" opacity="0.7"/>
            {/* Windows */}
            <rect x="35" y="19" width="22" height="14" rx="4" fill="white" opacity="0.3"/>
            <rect x="61" y="19" width="22" height="14" rx="4" fill="white" opacity="0.3"/>
            {/* Wheels */}
            <circle cx="40" cy="65" r="10" fill="url(#wheelGradient)"/>
            <circle cx="40" cy="65" r="5" fill="white" opacity="0.2"/>
            <circle cx="100" cy="65" r="10" fill="url(#wheelGradient)"/>
            <circle cx="100" cy="65" r="5" fill="white" opacity="0.2"/>
            {/* Headlights */}
            <rect x="112" y="38" width="8" height="8" rx="2" fill="#FFD700" opacity="0.8"/>
            <rect x="20" y="38" width="8" height="8" rx="2" fill="#FF3B30" opacity="0.6"/>
            {/* Gradients */}
            <defs>
              <linearGradient id="carGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#007AFF"/>
                <stop offset="100%" stopColor="#5856D6"/>
              </linearGradient>
              <linearGradient id="wheelGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2C2C2E"/>
                <stop offset="100%" stopColor="#1C1C1E"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Premium title */}
      <h1 className="text-[34px] font-bold text-center mb-3 spring-in" style={{ animationDelay: '100ms' }}>
        <span className="text-gradient">{t('welcome.title')}</span>
      </h1>

      {/* Subtitle */}
      <p className="text-[17px] text-[var(--ink-secondary)] text-center mb-12 leading-[1.47] whitespace-pre-line spring-in" style={{ animationDelay: '200ms' }}>
        {t('welcome.subtitle')}
      </p>

      {/* Premium CTA button */}
      <div className="w-full max-w-[320px] spring-in" style={{ animationDelay: '300ms' }}>
        <Button onClick={onAddCar} size="large" className="btn-ios-primary shadow-[var(--shadow-glow)]">
          {t('welcome.addCar')}
        </Button>
      </div>

      {/* Existing cars link */}
      {hasExistingCars && (
        <button
          onClick={onGoToCars}
          className="mt-6 text-[var(--accent)] text-[15px] font-medium spring-in hover:underline"
          style={{ animationDelay: '400ms' }}
        >
          {t('welcome.haveAccount')} →
        </button>
      )}
    </div>
  )
}
