'use client'

import { useState } from 'react'
import { AVTOVAZ_MODELS, Vehicle } from '@/data/vehicles'
import { CATEGORIES, Category } from '@/data/categories'
import { REPAIRS, Repair } from '@/data/repairs'
import { SavedCar } from '@/hooks/useCarStore'
import { Button } from '@/components/ui/Button'
import { haptic } from '@/lib/constants'

interface RepairScreenProps {
  car: SavedCar
  onBack: () => void
}

type Step = 'model' | 'category' | 'work' | 'result'

export function RepairScreen({ car, onBack }: RepairScreenProps) {
  const [step, setStep] = useState<Step>('model')
  const [selectedModel, setSelectedModel] = useState<Vehicle | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null)
  const [availableWorks, setAvailableWorks] = useState<Repair[]>([])
  const [search, setSearch] = useState('')

  // Try to auto-select model from saved car
  const autoModel = AVTOVAZ_MODELS.find(m =>
    car.modelName.toLowerCase().includes(m.name.toLowerCase().split(' ').pop() || '') ||
    m.name.toLowerCase().includes(car.modelName.toLowerCase().split(' ').pop() || '')
  )

  const handleModelSelect = (model: Vehicle) => {
    haptic('medium')
    setSelectedModel(model)
    setSelectedCategory(null)
    setSelectedRepair(null)
    setStep('category')
  }

  const handleCategorySelect = (cat: Category) => {
    haptic('medium')
    if (!selectedModel) return
    setSelectedCategory(cat)
    const works = REPAIRS.filter(r =>
      (r.modelId === selectedModel.id || r.modelId === 'any') && r.category === cat.id
    )
    setAvailableWorks(works)
    setStep('work')
  }

  const handleWorkSelect = (repair: Repair) => {
    haptic('medium')
    setSelectedRepair(repair)
    setStep('result')
  }

  const goBack = () => {
    haptic('light')
    switch (step) {
      case 'category': setStep('model'); setSelectedModel(null); break
      case 'work': setStep('category'); setSelectedCategory(null); setAvailableWorks([]); break
      case 'result': setStep('work'); setSelectedRepair(null); break
    }
  }

  const getModelCategories = (modelId: string): Category[] => {
    const categoryIds = new Set(
      REPAIRS.filter(r => r.modelId === modelId || r.modelId === 'any').map(r => r.category)
    )
    return CATEGORIES.filter(c => categoryIds.has(c.id))
  }

  const filteredModels = AVTOVAZ_MODELS.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={step === 'model' ? onBack : goBack} className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {step === 'model' ? 'Назад' : selectedModel?.name || 'Назад'}
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">
            🔧 Ремонт
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* STEP: Model */}
        {step === 'model' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--ink)] mb-1">Выберите модель</h2>
              <p className="text-[14px] text-[var(--ink-secondary)]">Для {car.modelName} {car.year}</p>
            </div>

            {/* Search */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-secondary)]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск модели..."
                className="w-full h-[40px] pl-10 pr-4 bg-[var(--fill)] rounded-[10px] text-[15px] outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30" />
            </div>

            {/* Auto-detected model */}
            {autoModel && !search && (
              <div className="bg-[var(--accent)] bg-opacity-10 rounded-[13px] p-4 mb-2">
                <p className="text-[12px] text-[var(--accent)] mb-2 font-medium">Ваш автомобиль</p>
                <button onClick={() => handleModelSelect(autoModel)} className="w-full flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-[16px] font-bold">
                    {autoModel.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-[var(--ink)]">{autoModel.name}</div>
                    <div className="text-[12px] text-[var(--ink-secondary)]">{autoModel.years}</div>
                  </div>
                </button>
              </div>
            )}

            {/* Popular models */}
            {!search && (
              <div>
                <p className="text-[12px] text-[var(--ink-secondary)] uppercase font-medium mb-2">Популярные</p>
                <div className="grid grid-cols-2 gap-2">
                  {AVTOVAZ_MODELS.filter(m => m.popular).map(model => (
                    <button key={model.id} onClick={() => handleModelSelect(model)}
                      className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 text-left active:scale-[0.97] transition-transform">
                      <div className="text-[16px] font-semibold text-[var(--ink)]">{model.name}</div>
                      <div className="text-[11px] text-[var(--ink-secondary)]">{model.years}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* All models */}
            <div>
              <p className="text-[12px] text-[var(--ink-secondary)] uppercase font-medium mb-2">
                {search ? 'Результаты' : 'Все модели'}
              </p>
              <div className="space-y-2">
                {filteredModels.map(model => (
                  <button key={model.id} onClick={() => handleModelSelect(model)}
                    className="w-full bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-3 flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
                    <div className="w-9 h-9 rounded-full bg-[var(--fill)] flex items-center justify-center text-[14px] font-bold text-[var(--ink)]">
                      {model.name.split(' ').pop()?.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-[var(--ink)]">{model.name}</div>
                      <div className="text-[11px] text-[var(--ink-secondary)]">{model.years}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP: Category */}
        {step === 'category' && selectedModel && (
          <div className="space-y-4">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--ink)] mb-1">Вид работ</h2>
              <p className="text-[14px] text-[var(--ink-secondary)]">{selectedModel.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {getModelCategories(selectedModel.id).map((cat, i) => {
                const worksCount = REPAIRS.filter(r =>
                  (r.modelId === selectedModel.id || r.modelId === 'any') && r.category === cat.id
                ).length
                return (
                  <button key={cat.id} onClick={() => handleCategorySelect(cat)}
                    className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5 text-left active:scale-[0.97] transition-transform spring-up"
                    style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="text-[28px] mb-2">{cat.icon}</div>
                    <div className="text-[15px] font-semibold text-[var(--ink)]">{cat.name}</div>
                    <div className="text-[11px] text-[var(--ink-secondary)]">{worksCount} работ</div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP: Work list */}
        {step === 'work' && selectedModel && selectedCategory && (
          <div className="space-y-4">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--ink)] mb-1">{selectedCategory.icon} {selectedCategory.name}</h2>
              <p className="text-[14px] text-[var(--ink-secondary)]">{selectedModel.name}</p>
            </div>

            {availableWorks.length > 0 ? (
              <div className="space-y-3">
                {availableWorks.map(repair => {
                  const partsMin = repair.parts.reduce((sum, part) => {
                    const min = part.variants.reduce((m, v) => v.price < m ? v.price : m, Infinity)
                    return sum + (min === Infinity ? 0 : min)
                  }, 0)
                  const kitMin = repair.kits.length > 0 ? Math.min(...repair.kits.map(k => k.price)) : Infinity
                  const bestParts = kitMin < partsMin ? kitMin : partsMin
                  const totalMin = repair.laborPrice + bestParts

                  return (
                    <button key={repair.id} onClick={() => handleWorkSelect(repair)}
                      className="w-full bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 text-left active:scale-[0.98] transition-transform">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0 mr-3">
                          <div className="text-[15px] font-semibold text-[var(--ink)]">{repair.name}</div>
                          <div className="text-[12px] text-[var(--ink-secondary)] mt-1">{repair.description}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                              repair.difficulty === 'easy' ? 'bg-[#34C759] bg-opacity-15 text-[#34C759]' :
                              repair.difficulty === 'medium' ? 'bg-[#FF9500] bg-opacity-15 text-[#FF9500]' :
                              'bg-[#FF3B30] bg-opacity-15 text-[#FF3B30]'
                            }`}>
                              {repair.difficulty === 'easy' ? 'Легко' : repair.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                            </span>
                            <span className="text-[11px] text-[var(--ink-secondary)]">{repair.laborHours} ч.</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[11px] text-[var(--ink-secondary)]">от</div>
                          <div className="text-[17px] font-bold text-[var(--accent)]">{totalMin.toLocaleString('ru-RU')} ₽</div>
                          <div className="text-[10px] text-[var(--ink-secondary)]">раб. {repair.laborPrice.toLocaleString('ru-RU')} ₽</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-[44px] mb-3">😔</div>
                <p className="text-[15px] text-[var(--ink-secondary)]">Нет работ в этой категории</p>
              </div>
            )}
          </div>
        )}

        {/* STEP: Result */}
        {step === 'result' && selectedRepair && selectedModel && (
          <div className="space-y-4">
            {/* Car info */}
            <div className="bg-[var(--accent)] bg-opacity-10 rounded-[13px] p-4 flex items-center gap-3">
              <span className="text-[24px]">🚗</span>
              <div>
                <span className="text-[15px] font-semibold text-[var(--accent)]">{selectedModel.name}</span>
                {selectedCategory && <span className="text-[13px] text-[var(--accent)] opacity-70 ml-2">— {selectedCategory.name}</span>}
              </div>
            </div>

            {/* Repair details */}
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5">
              <h3 className="text-[18px] font-bold text-[var(--ink)] mb-2">{selectedRepair.name}</h3>
              <p className="text-[14px] text-[var(--ink-secondary)] mb-4">{selectedRepair.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-[14px] text-[var(--ink-secondary)]">Работа</span>
                  <span className="text-[15px] font-semibold text-[var(--ink)]">{selectedRepair.laborPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] text-[var(--ink-secondary)]">Время</span>
                  <span className="text-[15px] text-[var(--ink)]">{selectedRepair.laborHours} ч.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] text-[var(--ink-secondary)]">Сложность</span>
                  <span className={`text-[13px] font-medium ${
                    selectedRepair.difficulty === 'easy' ? 'text-[#34C759]' :
                    selectedRepair.difficulty === 'medium' ? 'text-[#FF9500]' : 'text-[#FF3B30]'
                  }`}>
                    {selectedRepair.difficulty === 'easy' ? 'Легко' : selectedRepair.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                  </span>
                </div>
              </div>

              {/* Parts */}
              {selectedRepair.parts.length > 0 && (
                <div className="border-t border-[var(--separator)] pt-3 mb-3">
                  <p className="text-[12px] text-[var(--ink-secondary)] uppercase font-medium mb-2">Запчасти</p>
                  {selectedRepair.parts.map((part, i) => (
                    <div key={i} className="mb-2">
                      <p className="text-[13px] text-[var(--ink)] font-medium">{part.name}</p>
                      {part.variants.map((v, vi) => (
                        <div key={vi} className="flex justify-between text-[12px] text-[var(--ink-secondary)] ml-3">
                          <span>{v.brand}</span>
                          <span>{v.price.toLocaleString('ru-RU')} ₽</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Kits */}
              {selectedRepair.kits.length > 0 && (
                <div className="border-t border-[var(--separator)] pt-3">
                  <p className="text-[12px] text-[var(--ink-secondary)] uppercase font-medium mb-2">Комплекты</p>
                  {selectedRepair.kits.map((kit, i) => (
                    <div key={i} className="flex justify-between text-[13px] mb-1">
                      <span className="text-[var(--ink)]">{kit.name}</span>
                      <span className="font-medium text-[var(--ink)]">{kit.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button onClick={() => { /* Open booking */ }} size="large">
              Записаться на работу
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
