'use client'

import { useState } from 'react'
import { BrandSelect } from '@/components/screens/BrandSelect'
import { ModelSelect } from '@/components/screens/ModelSelect'
import { YearSelect } from '@/components/screens/YearSelect'
import { EngineSelect } from '@/components/screens/EngineSelect'
import { CarConfirm } from '@/components/screens/CarConfirm'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { t } from '@/lib/i18n'
import { haptic } from '@/lib/constants'

interface CarWizardProps {
  onComplete: (car: {
    brandId: string
    brandName: string
    modelId: string
    modelName: string
    year: number
    engineId: string
    engineName: string
  }) => void
  onCancel: () => void
}

type WizardStep = 'brand' | 'model' | 'year' | 'engine' | 'confirm'

const STEPS: WizardStep[] = ['brand', 'model', 'year', 'engine', 'confirm']

export function CarWizard({ onComplete, onCancel }: CarWizardProps) {
  const [step, setStep] = useState<WizardStep>('brand')
  const [brandId, setBrandId] = useState<string>('')
  const [brandName, setBrandName] = useState<string>('')
  const [modelId, setModelId] = useState<string>('')
  const [modelName, setModelName] = useState<string>('')
  const [year, setYear] = useState<number>(0)
  const [engineId, setEngineId] = useState<string>('')
  const [engineName, setEngineName] = useState<string>('')
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const stepIndex = STEPS.indexOf(step)
  const hasProgress = brandId || modelId || year

  const goNext = () => {
    haptic('light')
    const nextIndex = stepIndex + 1
    if (nextIndex < STEPS.length) {
      setStep(STEPS[nextIndex])
    }
  }

  const goBack = () => {
    haptic('light')
    const prevIndex = stepIndex - 1
    if (prevIndex >= 0) {
      setStep(STEPS[prevIndex])
    } else {
      onCancel()
    }
  }

  const handleBrandSelect = (id: string, name: string) => {
    setBrandId(id)
    setBrandName(name)
    goNext()
  }

  const handleModelSelect = (id: string, name: string) => {
    setModelId(id)
    setModelName(name)
    goNext()
  }

  const handleYearSelect = (selectedYear: number) => {
    setYear(selectedYear)
    goNext()
  }

  const handleEngineSelect = (id: string, name: string) => {
    setEngineId(id)
    setEngineName(name)
    goNext()
  }

  const handleConfirm = () => {
    haptic('medium')
    onComplete({ brandId, brandName, modelId, modelName, year, engineId, engineName })
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center justify-between px-4 h-[44px]">
          <button
            onClick={goBack}
            className="text-[var(--accent)] text-[17px] font-medium"
          >
            ← {t('common.back')}
          </button>
          <span className="text-[13px] text-[var(--ink-secondary)]">
            {t('wizard.step')} {stepIndex + 1} {t('common.of') || 'из'} {STEPS.length}
          </span>
          <button
            onClick={() => hasProgress ? setShowCancelConfirm(true) : onCancel()}
            className="text-[var(--accent)] text-[17px]"
          >
            ✕
          </button>
        </div>
        <div className="px-4 pb-3">
          <ProgressBar current={stepIndex} total={STEPS.length} />
        </div>
      </div>

      {/* Content */}
      <div className="spring-in">
        {step === 'brand' && (
          <BrandSelect onSelect={handleBrandSelect} />
        )}
        {step === 'model' && (
          <ModelSelect brandId={brandId} onSelect={handleModelSelect} />
        )}
        {step === 'year' && (
          <YearSelect modelId={modelId} brandId={brandId} onSelect={handleYearSelect} />
        )}
        {step === 'engine' && (
          <EngineSelect brandId={brandId} modelId={modelId} onSelect={handleEngineSelect} />
        )}
        {step === 'confirm' && (
          <CarConfirm
            brandName={brandName}
            modelName={modelName}
            year={year}
            engineName={engineName}
            onConfirm={handleConfirm}
            onBack={goBack}
          />
        )}
      </div>

      {/* Cancel confirmation modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'var(--overlay)' }}>
          <div className="bg-[var(--card)] rounded-[13px] p-6 max-w-[300px] w-full text-center spring-in">
            <h3 className="text-[17px] font-semibold text-[var(--ink)] mb-2">Отменить добавление?</h3>
            <p className="text-[14px] text-[var(--ink-secondary)] mb-6">Все введённые данные будут потеряны</p>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelConfirm(false)}
                className="flex-1 h-[44px] bg-[var(--fill)] text-[var(--ink)] rounded-[13px] font-semibold text-[15px]">
                Продолжить
              </button>
              <button onClick={onCancel}
                className="flex-1 h-[44px] bg-[var(--danger)] text-white rounded-[13px] font-semibold text-[15px]">
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
