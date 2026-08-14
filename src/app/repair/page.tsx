'use client'

import { useState } from 'react'
import { AVTOVAZ_MODELS, Vehicle } from '@/data/vehicles'
import { CATEGORIES, Category } from '@/data/categories'
import { REPAIRS, Repair } from '@/data/repairs'
import { RepairCard } from '@/components/RepairCard'
import { BookingForm } from '@/components/BookingForm'

type Step = 'model' | 'category' | 'work' | 'clarify' | 'result'

export default function RepairPage() {
  const [step, setStep] = useState<Step>('model')
  const [selectedModel, setSelectedModel] = useState<Vehicle | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null)
  const [availableWorks, setAvailableWorks] = useState<Repair[]>([])
  const [bookingRepair, setBookingRepair] = useState<Repair | null>(null)
  const [clarification, setClarification] = useState<Repair | null>(null)

  // Шаг 1: Выбор модели
  const handleModelSelect = (model: Vehicle) => {
    setSelectedModel(model)
    setSelectedCategory(null)
    setSelectedRepair(null)
    setStep('category')
  }

  // Шаг 2: Выбор категории
  const handleCategorySelect = (cat: Category) => {
    if (!selectedModel) return
    setSelectedCategory(cat)

    // Находим все работы для этой модели и категории
    const works = REPAIRS.filter(r =>
      (r.modelId === selectedModel.id || r.modelId === 'any') &&
      r.category === cat.id
    )
    setAvailableWorks(works)

    if (works.length === 0) {
      setStep('work') // покажем "нет работ"
    } else if (works.length === 1) {
      // Одна работа — сразу проверяем уточнение
      const repair = works[0]
      if (repair.clarifications && repair.clarifications.length > 0) {
        setClarification(repair)
        setStep('clarify')
      } else {
        setSelectedRepair(repair)
        setStep('result')
      }
    } else {
      setStep('work')
    }
  }

  // Шаг 3: Выбор работы
  const handleWorkSelect = (repair: Repair) => {
    if (repair.clarifications && repair.clarifications.length > 0) {
      setClarification(repair)
      setStep('clarify')
    } else {
      setSelectedRepair(repair)
      setStep('result')
    }
  }

  // Уточнение (выбор двигателя, КПП и т.д.)
  const handleClarificationSelect = (option: string) => {
    if (!clarification) return
    // Просто переходим к результату — уточнение будет показано в карточке
    setSelectedRepair(clarification)
    setStep('result')
  }

  // Назад
  const goBack = () => {
    switch (step) {
      case 'category':
        setStep('model')
        setSelectedModel(null)
        break
      case 'work':
        setStep('category')
        setSelectedCategory(null)
        setAvailableWorks([])
        break
      case 'clarify':
        setStep('work')
        setClarification(null)
        break
      case 'result':
        setStep('work')
        setSelectedRepair(null)
        break
    }
  }

  // Сброс
  const reset = () => {
    setStep('model')
    setSelectedModel(null)
    setSelectedCategory(null)
    setSelectedRepair(null)
    setAvailableWorks([])
    setClarification(null)
  }

  // Получить доступные категории для модели
  const getModelCategories = (modelId: string): Category[] => {
    const categoryIds = new Set(
      REPAIRS
        .filter(r => r.modelId === modelId || r.modelId === 'any')
        .map(r => r.category)
    )
    return CATEGORIES.filter(c => categoryIds.has(c.id))
  }

  // Хлебные крошки
  const breadcrumbs = [
    { label: 'Ремонт', onClick: reset },
    selectedModel && { label: selectedModel.name, onClick: () => { setStep('category'); setSelectedCategory(null); setSelectedRepair(null) } },
    selectedCategory && { label: selectedCategory.name, onClick: () => { setStep('work'); setSelectedRepair(null) } },
    selectedRepair && { label: selectedRepair.name, onClick: undefined },
  ].filter(Boolean) as { label: string; onClick?: () => void }[]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-2xl">🔧</a>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Ремонт</h1>
              <p className="text-xs text-gray-400">Запись на конкретные работы</p>
            </div>
          </div>
          <a href="/" className="text-sm text-blue-600 hover:underline">← На главную</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Хлебные крошки */}
        {breadcrumbs.length > 1 && (
          <nav className="flex items-center gap-2 mb-6 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-300">→</span>}
                {crumb.onClick ? (
                  <button
                    onClick={crumb.onClick}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-gray-800 font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Кнопка «Назад» */}
        {step !== 'model' && (
          <button
            onClick={goBack}
            className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            ← Назад
          </button>
        )}

        {/* ========== ШАГ 1: Выбор модели ========== */}
        {step === 'model' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">🚗 Выберите модель</h2>
              <p className="text-gray-500">Выберите автомобиль, чтобы увидеть доступные работы</p>
            </div>

            {/* Популярные модели */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Популярные</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {AVTOVAZ_MODELS.filter(m => m.popular).map(model => (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model)}
                    className="bg-white rounded-xl border-2 border-gray-100 p-5 text-left hover:shadow-lg hover:border-blue-300 transition-all group active:scale-[0.98]"
                  >
                    <div className="text-2xl mb-2">🚗</div>
                    <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors block">
                      {model.name}
                    </span>
                    <span className="text-xs text-gray-400 mt-1 block">{model.years}</span>
                    <span className="text-xs text-gray-400">{model.engines.map(e => e.name).join(', ')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Все модели */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Все модели АвтоВАЗ</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {AVTOVAZ_MODELS.map(model => (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model)}
                    className="bg-white rounded-lg border px-4 py-3 text-left hover:bg-blue-50 hover:border-blue-200 transition-all"
                  >
                    <span className="text-sm font-medium text-gray-700">{model.name}</span>
                    <span className="block text-xs text-gray-400">{model.years}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== ШАГ 2: Выбор категории ========== */}
        {step === 'category' && selectedModel && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                🔧 Выберите вид работ
              </h2>
              <p className="text-gray-500">
                {selectedModel.name} — какие работы нужны?
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {getModelCategories(selectedModel.id).map(cat => {
                const worksCount = REPAIRS.filter(r =>
                  (r.modelId === selectedModel.id || r.modelId === 'any') &&
                  r.category === cat.id
                ).length

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat)}
                    className="bg-white rounded-2xl border-2 border-gray-100 p-6 text-center hover:shadow-lg hover:border-blue-300 transition-all group active:scale-[0.98]"
                  >
                    <span className="text-4xl block mb-3">{cat.icon}</span>
                    <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors block">
                      {cat.name}
                    </span>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {worksCount} {worksCount === 1 ? 'работа' : worksCount < 5 ? 'работы' : 'работ'}
                    </span>
                    <span className="text-xs text-gray-400 block">{cat.description}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ========== ШАГ 3: Выбор работы ========== */}
        {step === 'work' && selectedModel && selectedCategory && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {selectedCategory.icon} {selectedCategory.name}
              </h2>
              <p className="text-gray-500">
                {selectedModel.name} — выберите работу
              </p>
            </div>

            {availableWorks.length > 0 ? (
              <div className="space-y-3">
                {availableWorks.map(repair => {
                  const partsMin = repair.parts.reduce((sum, part) => {
                    const min = part.variants.reduce((m, v) => v.price < m ? v.price : m, Infinity)
                    return sum + (min === Infinity ? 0 : min)
                  }, 0)
                  const kitMin = repair.kits.length > 0
                    ? Math.min(...repair.kits.map(k => k.price))
                    : Infinity
                  const bestParts = kitMin < partsMin ? kitMin : partsMin
                  const totalMin = repair.laborPrice + bestParts

                  return (
                    <button
                      key={repair.id}
                      onClick={() => handleWorkSelect(repair)}
                      className="w-full bg-white rounded-xl border-2 border-gray-100 p-5 text-left hover:shadow-lg hover:border-blue-300 transition-all group active:scale-[0.99]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {repair.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{repair.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              repair.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                              repair.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {repair.difficulty === 'easy' ? 'Легко' : repair.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                            </span>
                            <span className="text-xs text-gray-400">{repair.laborHours} ч.</span>
                            {repair.clarifications && repair.clarifications.length > 0 && (
                              <span className="text-xs text-blue-500">ⓘ Требует уточнения</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-sm text-gray-400">от</p>
                          <p className="text-xl font-bold text-blue-600">
                            {totalMin.toLocaleString('ru-RU')} ₽
                          </p>
                          <p className="text-xs text-gray-400">
                            работы {repair.laborPrice.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border">
                <div className="text-5xl mb-4">😔</div>
                <h3 className="text-xl font-bold mb-2">Нет работ в этой категории</h3>
                <p className="text-gray-500 mb-6">
                  Для {selectedModel.name} пока нет доступных работ в категории «{selectedCategory.name}»
                </p>
                <button
                  onClick={() => setStep('category')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Выбрать другую категорию
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========== ШАГ 3.5: Уточнение ========== */}
        {step === 'clarify' && clarification && selectedModel && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">🤔</div>
              <h2 className="text-xl font-bold mb-2">
                {clarification.clarifications![0].question}
              </h2>
              <p className="text-gray-500 mb-6">
                {selectedModel.name} — {clarification.name}
              </p>
              <div className="grid gap-3">
                {clarification.clarifications![0].options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleClarificationSelect(opt)}
                    className="px-6 py-4 bg-gray-50 rounded-xl border-2 hover:border-blue-500 hover:bg-blue-50 transition-all text-left font-medium"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== ШАГ 4: Результат ========== */}
        {step === 'result' && selectedRepair && selectedModel && (
          <div>
            {/* Информация о выборе */}
            <div className="mb-6 flex items-center gap-3 bg-blue-50 rounded-xl p-4">
              <span className="text-2xl">🚗</span>
              <div>
                <span className="font-bold text-blue-800">{selectedModel.name}</span>
                {selectedCategory && <span className="text-blue-500 ml-2">— {selectedCategory.name}</span>}
              </div>
            </div>

            <RepairCard
              repair={selectedRepair}
              onBook={() => setBookingRepair(selectedRepair)}
            />
          </div>
        )}
      </main>

      {/* Модалка записи */}
      {bookingRepair && selectedModel && (
        <BookingForm
          repairName={bookingRepair.name}
          vehicleName={selectedModel.name}
          laborPrice={bookingRepair.laborPrice}
          partsMinPrice={
            bookingRepair.kits.length > 0
              ? Math.min(...bookingRepair.kits.map(k => k.price))
              : bookingRepair.parts.reduce((sum, part) => {
                  const min = part.variants.reduce((m, v) => v.price < m ? v.price : m, Infinity)
                  return sum + (min === Infinity ? 0 : min)
                }, 0)
          }
          onClose={() => setBookingRepair(null)}
        />
      )}
    </div>
  )
}
