'use client'

import { useState, useEffect } from 'react'
import { BRANDS, Vehicle, findModel } from '@/data/vehicles'
import { CATEGORIES, Category } from '@/data/categories'
import { REPAIRS, Repair } from '@/data/repairs'
import { SavedCar } from '@/hooks/useCarStore'
import { getProfile, saveProfile, UserProfile } from '@/lib/userProfile'
import { saveOrder } from '@/lib/orderStore'
import { haptic } from '@/lib/constants'

interface RepairScreenProps {
  cars: SavedCar[]
  activeCar: SavedCar | null
  onSelectCar: (id: string) => void
  onAddCar: () => void
  onBack: () => void
  onTrack?: (token: string) => void
  onPay?: (amount: number, serviceName: string) => void
  initialCategory?: string | null
}

type Step = 'car' | 'category' | 'work' | 'detail' | 'booking' | 'confirm'

export function RepairScreen({ cars, activeCar, onSelectCar, onAddCar, onBack, onTrack, onPay, initialCategory }: RepairScreenProps) {
  const [step, setStep] = useState<Step>(cars.length === 1 && activeCar ? 'category' : 'car')
  const [selectedCar, setSelectedCar] = useState<SavedCar | null>(activeCar)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null)
  const [availableWorks, setAvailableWorks] = useState<Repair[]>([])
  const [orderToken, setOrderToken] = useState('')

  // Booking form state
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [bookingName, setBookingName] = useState('')
  const [bookingPhone, setBookingPhone] = useState('')
  const [bookingComment, setBookingComment] = useState('')
  const [bookingLoading, setBookingLoading] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  // Auto-match SavedCar → Vehicle (searches ALL brands)
  useEffect(() => {
    if (selectedCar) {
      const result = findModel(selectedCar.modelName)
      setSelectedVehicle(result?.model || null)
    }
  }, [selectedCar])

  // Auto-fill booking form from profile
  useEffect(() => {
    const profile = getProfile()
    if (profile) {
      setBookingName(profile.name)
      setBookingPhone(profile.phone)
    }
  }, [])

  // Auto-select category if initialCategory provided
  useEffect(() => {
    if (initialCategory && selectedVehicle && step === 'category') {
      const cat = CATEGORIES.find(c => c.id === initialCategory)
      if (cat) handleCategorySelect(cat)
    }
  }, [initialCategory, selectedVehicle])

  const handleCarSelect = (car: SavedCar) => {
    haptic('medium')
    setSelectedCar(car)
    onSelectCar(car.id)
    setStep('category')
  }

  const handleCategorySelect = (cat: Category) => {
    haptic('medium')
    setSelectedCategory(cat)
    if (selectedVehicle) {
      const works = REPAIRS.filter(r =>
        (r.modelId === selectedVehicle.id || r.modelId === 'any') && r.category === cat.id
      )
      setAvailableWorks(works)
    }
    setStep('work')
  }

  const handleWorkSelect = (repair: Repair) => {
    haptic('medium')
    setSelectedRepair(repair)
    setStep('detail')
  }

  const handleBook = () => {
    haptic('light')
    setStep('booking')
  }

  const handleBookingSubmit = async () => {
    if (!bookingName || !bookingPhone || !bookingDate || !selectedRepair) return
    haptic('heavy')
    setBookingLoading(true)

    // Save profile
    saveProfile({ name: bookingName, phone: bookingPhone })

    // Simulate API
    await new Promise(r => setTimeout(r, 1000))

    // Persist order
    const order = saveOrder({
      clientName: bookingName,
      clientPhone: bookingPhone,
      vehicleName: selectedCar ? `${selectedCar.brandName} ${selectedCar.modelName}` : '',
      serviceName: selectedRepair.name,
      category: selectedCategory?.id || '',
      date: bookingDate,
      time: bookingTime || undefined,
      laborPrice: selectedRepair.laborPrice,
      partsPrice: calcMinPrice(selectedRepair) - selectedRepair.laborPrice,
      totalPrice: calcMinPrice(selectedRepair),
      notes: bookingComment || undefined,
    })

    setOrderNumber(order.id)
    setOrderToken(order.token)
    setBookingLoading(false)
    setStep('confirm')
  }

  const goBack = () => {
    haptic('light')
    switch (step) {
      case 'car': onBack(); break
      case 'category': setStep('car'); break
      case 'work': setStep('category'); break
      case 'detail': setStep('work'); break
      case 'booking': setStep('detail'); break
      case 'confirm': onBack(); break
    }
  }

  const getModelCategories = (): Category[] => {
    if (!selectedVehicle) return CATEGORIES
    const categoryIds = new Set(
      REPAIRS.filter(r => r.modelId === selectedVehicle.id || r.modelId === 'any').map(r => r.category)
    )
    return CATEGORIES.filter(c => categoryIds.has(c.id))
  }

  const calcMinPrice = (repair: Repair): number => {
    const partsMin = repair.parts.reduce((sum, part) => {
      const min = part.variants.reduce((m, v) => v.price < m ? v.price : m, Infinity)
      return sum + (min === Infinity ? 0 : min)
    }, 0)
    const kitMin = repair.kits.length > 0 ? Math.min(...repair.kits.map(k => k.price)) : Infinity
    const bestParts = kitMin < partsMin ? kitMin : partsMin
    return repair.laborPrice + bestParts
  }

  const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']
  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date(); maxDate.setMonth(maxDate.getMonth() + 3)

  const stepNames: Record<Step, string> = {
    car: 'Авто', category: 'Категория', work: 'Работы',
    detail: 'Детали', booking: 'Запись', confirm: 'Готово'
  }
  const steps: Step[] = ['car', 'category', 'work', 'detail', 'booking', 'confirm']
  const stepIndex = steps.indexOf(step)

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={step === 'car' || step === 'category' ? onBack : goBack}
            className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">
            {stepNames[step]}
          </div>
        </div>
        {/* Progress */}
        <div className="px-4 pb-2">
          <div className="flex gap-1">
            {steps.map((s, i) => (
              <div key={s} className={`flex-1 h-[3px] rounded-full transition-all ${i <= stepIndex ? 'bg-[var(--accent)]' : 'bg-[var(--fill)]'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">

        {/* ============ STEP: CAR ============ */}
        {step === 'car' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--ink)] mb-1">Выберите авто</h2>
              <p className="text-[14px] text-[var(--ink-secondary)]">Для записи на обслуживание</p>
            </div>

            {/* Car cards */}
            <div className="space-y-3">
              {cars.map((car, i) => {
                const isActive = selectedCar?.id === car.id
                return (
                  <button key={car.id} onClick={() => handleCarSelect(car)}
                    className={`w-full rounded-[13px] p-4 flex items-center gap-4 text-left transition-all spring-up ${
                      isActive ? 'bg-[var(--accent)] bg-opacity-10 border-2 border-[var(--accent)]' : 'bg-[var(--card)] shadow-[var(--shadow-card)] border-2 border-transparent'
                    }`}
                    style={{ animationDelay: `${i * 60}ms` }}>
                    <div className={`w-14 h-14 rounded-[13px] flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-[var(--accent)]' : 'bg-[var(--fill)]'
                    }`}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isActive ? 'white' : 'var(--ink-secondary)'} strokeWidth="2">
                        <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
                        <circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[17px] font-semibold text-[var(--ink)]">{car.brandName} {car.modelName}</div>
                      <div className="text-[13px] text-[var(--ink-secondary)]">{car.year} • {car.engineName}</div>
                      {car.mileage && <div className="text-[12px] text-[var(--ink-secondary)]">{car.mileage.toLocaleString('ru-RU')} км</div>}
                    </div>
                    {isActive && <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
                  </button>
                )
              })}
            </div>

            {/* Add new car */}
            <button onClick={() => { haptic('light'); onAddCar() }}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-[13px] border-2 border-dashed border-[var(--separator)] text-[var(--accent)] text-[16px] font-medium active:bg-[var(--fill)] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Добавить новое авто
            </button>
          </div>
        )}

        {/* ============ STEP: CATEGORY ============ */}
        {step === 'category' && (
          <div className="space-y-4">
            {/* Selected car indicator */}
            {selectedCar && (
              <div className="flex items-center gap-3 p-3 bg-[var(--accent)] bg-opacity-10 rounded-[13px]">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-medium text-[var(--accent)]">{selectedCar.brandName} {selectedCar.modelName}</div>
                  <div className="text-[12px] text-[var(--accent)] opacity-70">{selectedCar.year} • {selectedCar.engineName}</div>
                </div>
                <button onClick={() => setStep('car')} className="text-[12px] text-[var(--accent)] font-medium">Сменить</button>
              </div>
            )}

            <div>
              <h2 className="text-[22px] font-bold text-[var(--ink)] mb-1">Вид работ</h2>
              <p className="text-[14px] text-[var(--ink-secondary)]">Что нужно сделать?</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {getModelCategories().map((cat, i) => {
                const worksCount = REPAIRS.filter(r =>
                  (r.modelId === selectedVehicle?.id || r.modelId === 'any') && r.category === cat.id
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

        {/* ============ STEP: WORK ============ */}
        {step === 'work' && selectedCategory && (
          <div className="space-y-4">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--ink)] mb-1">{selectedCategory.icon} {selectedCategory.name}</h2>
              {selectedCar && <p className="text-[14px] text-[var(--ink-secondary)]">{selectedCar.brandName} {selectedCar.modelName}</p>}
            </div>

            {availableWorks.length > 0 ? (
              <div className="space-y-3">
                {availableWorks.map((repair, i) => {
                  const totalMin = calcMinPrice(repair)
                  return (
                    <button key={repair.id} onClick={() => handleWorkSelect(repair)}
                      className="w-full bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 text-left active:scale-[0.98] transition-transform spring-up"
                      style={{ animationDelay: `${i * 50}ms` }}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0 mr-3">
                          <div className="text-[15px] font-semibold text-[var(--ink)]">{repair.name}</div>
                          <div className="text-[12px] text-[var(--ink-secondary)] mt-1 line-clamp-2">{repair.description}</div>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                              repair.difficulty === 'easy' ? 'bg-[#34C759] bg-opacity-15 text-[#34C759]' :
                              repair.difficulty === 'medium' ? 'bg-[#FF9500] bg-opacity-15 text-[#FF9500]' :
                              'bg-[#FF3B30] bg-opacity-15 text-[#FF3B30]'
                            }`}>
                              {repair.difficulty === 'easy' ? 'Легко' : repair.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                            </span>
                            <span className="text-[11px] text-[var(--ink-secondary)]">⏱ ~{repair.laborHours} ч</span>
                            {repair.parts.length > 0 && (
                              <span className="text-[11px] text-[var(--ink-secondary)]">📦 {repair.parts.length} запч.</span>
                            )}
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
                <button onClick={() => setStep('category')} className="mt-4 text-[var(--accent)] text-[14px] font-medium">Выбрать другую категорию</button>
              </div>
            )}
          </div>
        )}

        {/* ============ STEP: DETAIL ============ */}
        {step === 'detail' && selectedRepair && (
          <div className="space-y-4 spring-in">
            {/* Car + category info */}
            <div className="flex items-center gap-2 p-3 bg-[var(--accent)] bg-opacity-10 rounded-[13px]">
              <span className="text-[20px]">{selectedCategory?.icon}</span>
              <div className="flex-1">
                <span className="text-[14px] font-semibold text-[var(--accent)]">{selectedRepair.name}</span>
                {selectedCar && <span className="text-[12px] text-[var(--accent)] opacity-70 block">{selectedCar.brandName} {selectedCar.modelName}</span>}
              </div>
            </div>

            {/* Repair details card */}
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5">
              <h3 className="text-[18px] font-bold text-[var(--ink)] mb-2">{selectedRepair.name}</h3>
              <p className="text-[14px] text-[var(--ink-secondary)] mb-4">{selectedRepair.description}</p>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-[var(--fill)] rounded-[10px] p-3 text-center">
                  <div className="text-[11px] text-[var(--ink-secondary)]">Работа</div>
                  <div className="text-[15px] font-bold text-[var(--ink)]">{selectedRepair.laborPrice.toLocaleString('ru-RU')} ₽</div>
                </div>
                <div className="bg-[var(--fill)] rounded-[10px] p-3 text-center">
                  <div className="text-[11px] text-[var(--ink-secondary)]">Время</div>
                  <div className="text-[15px] font-bold text-[var(--ink)]">~{selectedRepair.laborHours} ч</div>
                </div>
                <div className="bg-[var(--fill)] rounded-[10px] p-3 text-center">
                  <div className="text-[11px] text-[var(--ink-secondary)]">Сложность</div>
                  <div className={`text-[14px] font-bold ${
                    selectedRepair.difficulty === 'easy' ? 'text-[#34C759]' :
                    selectedRepair.difficulty === 'medium' ? 'text-[#FF9500]' : 'text-[#FF3B30]'
                  }`}>
                    {selectedRepair.difficulty === 'easy' ? 'Легко' : selectedRepair.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                  </div>
                </div>
              </div>

              {/* Parts */}
              {selectedRepair.parts.length > 0 && (
                <div className="border-t border-[var(--separator)] pt-3 mb-3">
                  <p className="text-[12px] text-[var(--ink-secondary)] uppercase font-medium mb-2">Запчасти</p>
                  {selectedRepair.parts.map((part, i) => (
                    <div key={i} className="mb-3">
                      <p className="text-[13px] text-[var(--ink)] font-medium">{part.name}</p>
                      {part.variants.map((v, vi) => (
                        <div key={vi} className="flex justify-between text-[12px] text-[var(--ink-secondary)] ml-3 mt-0.5">
                          <span>{v.brand} {v.inStock ? '✓' : `(${v.deliveryDays} дн)`}</span>
                          <span className="font-medium">{v.price.toLocaleString('ru-RU')} ₽</span>
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
                    <div key={i} className="bg-[var(--fill)] rounded-[10px] p-3 mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-[13px] font-medium text-[var(--ink)]">{kit.name}</span>
                        <span className="text-[14px] font-bold text-[var(--accent)]">{kit.price.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      {kit.includes.map((item, ii) => (
                        <div key={ii} className="text-[11px] text-[var(--ink-secondary)] ml-2">• {item}</div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total */}
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4">
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[var(--ink-secondary)]">Итого от</span>
                <span className="text-[22px] font-bold text-[var(--accent)]">{calcMinPrice(selectedRepair).toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <button onClick={handleBook}
              className="w-full h-[50px] bg-[var(--accent)] text-white rounded-[13px] font-semibold text-[17px] active:scale-[0.97] transition-transform">
              Записаться на работу
            </button>
          </div>
        )}

        {/* ============ STEP: BOOKING ============ */}
        {step === 'booking' && selectedRepair && (
          <div className="space-y-4 spring-in">
            {/* Service summary */}
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[var(--fill)] flex items-center justify-center text-[18px]">{selectedCategory?.icon}</div>
              <div className="flex-1">
                <div className="text-[14px] font-medium text-[var(--ink)]">{selectedRepair.name}</div>
                <div className="text-[12px] text-[var(--ink-secondary)]">~{selectedRepair.laborHours} ч • от {calcMinPrice(selectedRepair).toLocaleString('ru-RU')} ₽</div>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-[12px] text-[var(--ink-secondary)] font-medium mb-1.5 block">Дата *</label>
              <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)}
                min={today} max={maxDate.toISOString().split('T')[0]}
                className="w-full h-[44px] px-4 bg-[var(--card)] rounded-[13px] text-[16px] border border-[var(--separator)] focus:border-[var(--accent)] outline-none" />
            </div>

            {/* Time slots */}
            <div>
              <label className="text-[12px] text-[var(--ink-secondary)] font-medium mb-1.5 block">Время</label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map(slot => (
                  <button key={slot} onClick={() => { haptic('light'); setBookingTime(slot) }}
                    className={`h-[38px] rounded-[10px] text-[14px] font-medium transition-all ${
                      bookingTime === slot ? 'bg-[var(--accent)] text-white' : 'bg-[var(--card)] text-[var(--ink)] border border-[var(--separator)]'
                    }`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-[12px] text-[var(--ink-secondary)] font-medium mb-1.5 block">Имя *</label>
              <input type="text" value={bookingName} onChange={e => setBookingName(e.target.value)} placeholder="Ваше имя"
                className="w-full h-[44px] px-4 bg-[var(--card)] rounded-[13px] text-[16px] border border-[var(--separator)] focus:border-[var(--accent)] outline-none placeholder-[var(--ink-secondary)]" />
            </div>

            {/* Phone */}
            <div>
              <label className="text-[12px] text-[var(--ink-secondary)] font-medium mb-1.5 block">Телефон *</label>
              <input type="tel" value={bookingPhone} onChange={e => setBookingPhone(e.target.value)} placeholder="+7 (999) 123-45-67"
                className="w-full h-[44px] px-4 bg-[var(--card)] rounded-[13px] text-[16px] border border-[var(--separator)] focus:border-[var(--accent)] outline-none placeholder-[var(--ink-secondary)]" />
            </div>

            {/* Comment */}
            <div>
              <label className="text-[12px] text-[var(--ink-secondary)] font-medium mb-1.5 block">Комментарий</label>
              <textarea value={bookingComment} onChange={e => setBookingComment(e.target.value)} placeholder="Дополнительные пожелания..." rows={2}
                className="w-full px-4 py-3 bg-[var(--card)] rounded-[13px] text-[16px] border border-[var(--separator)] focus:border-[var(--accent)] outline-none placeholder-[var(--ink-secondary)] resize-none" />
            </div>

            <button onClick={handleBookingSubmit} disabled={!bookingName || !bookingPhone || !bookingDate || bookingLoading}
              className="w-full h-[50px] bg-[#34C759] text-white rounded-[13px] font-semibold text-[17px] disabled:opacity-40 active:scale-[0.97] transition-transform">
              {bookingLoading ? 'Отправка...' : 'Записаться'}
            </button>
          </div>
        )}

        {/* ============ STEP: CONFIRM ============ */}
        {step === 'confirm' && selectedRepair && (
          <div className="space-y-4 spring-in text-center">
            <div className="w-20 h-20 rounded-full bg-[#34C759] flex items-center justify-center mx-auto mb-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M10 20L17 27L30 13" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  style={{ strokeDasharray: 50, strokeDashoffset: 0, animation: 'checkmark 0.5s ease-out forwards' }} />
              </svg>
            </div>
            <h2 className="text-[22px] font-bold text-[var(--ink)]">Запись подтверждена!</h2>
            <p className="text-[14px] text-[var(--ink-secondary)]">Заказ-наряд {orderNumber}</p>

            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5 text-left mt-4">
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-[13px] text-[var(--ink-secondary)]">Услуга</span><span className="text-[14px] font-medium text-[var(--ink)] text-right max-w-[60%]">{selectedRepair.name}</span></div>
                {selectedCar && <div className="flex justify-between"><span className="text-[13px] text-[var(--ink-secondary)]">Авто</span><span className="text-[14px] font-medium text-[var(--ink)]">{selectedCar.brandName} {selectedCar.modelName}</span></div>}
                <div className="flex justify-between"><span className="text-[13px] text-[var(--ink-secondary)]">Дата</span><span className="text-[14px] font-medium text-[var(--ink)]">{new Date(bookingDate).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</span></div>
                {bookingTime && <div className="flex justify-between"><span className="text-[13px] text-[var(--ink-secondary)]">Время</span><span className="text-[14px] font-medium text-[var(--ink)]">{bookingTime}</span></div>}
                <div className="flex justify-between border-t border-[var(--separator)] pt-3">
                  <span className="text-[14px] font-semibold text-[var(--ink)]">Итого от</span>
                  <span className="text-[18px] font-bold text-[var(--accent)]">{calcMinPrice(selectedRepair).toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button onClick={onBack} className="flex-1 h-[50px] bg-[var(--fill)] text-[var(--ink)] rounded-[13px] font-semibold text-[15px]">
                На главную
              </button>
              <button onClick={() => onTrack ? onTrack(orderToken) : onBack()} className="flex-1 h-[50px] bg-[var(--accent)] text-white rounded-[13px] font-semibold text-[15px]">
                Отследить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
