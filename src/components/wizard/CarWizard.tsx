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

  const stepIndex = STEPS.indexOf(step)

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
            onClick={onCancel}
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
    </div>
  )
}
