'use client'

import { useState } from 'react'
import { MOCK_REVIEWS, getAverageRating, getRatingDistribution, Review } from '@/data/reviews'
import { haptic } from '@/lib/constants'

interface ReviewScreenProps {
  onBack: () => void
  onSubmit?: (review: { rating: number; text: string }) => void
}

export function ReviewScreen({ onBack, onSubmit }: ReviewScreenProps) {
  const [mode, setMode] = useState<'list' | 'write'>('list')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const avgRating = getAverageRating(MOCK_REVIEWS)
  const distribution = getRatingDistribution(MOCK_REVIEWS)

  const handleSubmit = () => {
    if (rating === 0 || !text.trim()) return
    haptic('heavy')
    onSubmit?.({ rating, text })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
          <div className="flex items-center px-4 h-[44px]">
            <button onClick={onBack} className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
              <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Назад
            </button>
            <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">Отзывы</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 rounded-full bg-[#34C759] flex items-center justify-center mb-4 spring-in">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M10 20L17 27L30 13" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 className="text-[22px] font-bold text-[var(--ink)] mb-2">Спасибо за отзыв!</h2>
          <p className="text-[14px] text-[var(--ink-secondary)] text-center">Ваш отзыв поможет другим клиентам</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={mode === 'write' ? () => setMode('list') : onBack}
            className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">
            {mode === 'list' ? '⭐ Отзывы' : '✍️ Написать отзыв'}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {mode === 'list' && (
          <div className="space-y-4">
            {/* Rating summary */}
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-[34px] font-bold text-[var(--ink)]">{avgRating.toFixed(1)}</div>
                  <div className="flex gap-0.5 justify-center mt-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <span key={i} className={`text-[18px] ${i <= Math.round(avgRating) ? 'text-[#FF9500]' : 'text-[var(--fill)]'}`}>★</span>
                    ))}
                  </div>
                  <div className="text-[12px] text-[var(--ink-secondary)] mt-1">{MOCK_REVIEWS.length} отзывов</div>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-[12px] text-[var(--ink-secondary)] w-3">{star}</span>
                      <span className="text-[12px] text-[#FF9500]">★</span>
                      <div className="flex-1 h-2 bg-[var(--fill)] rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF9500] rounded-full"
                          style={{ width: `${MOCK_REVIEWS.length > 0 ? (distribution[star] / MOCK_REVIEWS.length) * 100 : 0}%` }} />
                      </div>
                      <span className="text-[12px] text-[var(--ink-secondary)] w-4 text-right">{distribution[star]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setMode('write')}
                className="w-full h-[40px] bg-[var(--accent)] text-white rounded-[13px] font-semibold text-[15px] active:scale-[0.97] transition-transform">
                ✍️ Оставить отзыв
              </button>
            </div>

            {/* Reviews list */}
            <div className="space-y-3">
              {MOCK_REVIEWS.map((review, i) => (
                <div key={review.id} className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4 spring-up"
                  style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)] bg-opacity-10 flex items-center justify-center text-[16px] font-bold text-[var(--accent)]">
                      {review.clientInitial}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-semibold text-[var(--ink)]">{review.clientName}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <span key={s} className={`text-[12px] ${s <= review.rating ? 'text-[#FF9500]' : 'text-[var(--fill)]'}`}>★</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-[11px] text-[var(--ink-secondary)]">{review.carModel} • {review.serviceName}</div>
                    </div>
                    <span className="text-[11px] text-[var(--ink-secondary)]">{new Date(review.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <p className="text-[14px] text-[var(--ink)] leading-[1.5]">{review.text}</p>
                  {review.reply && (
                    <div className="mt-3 pl-3 border-l-2 border-[var(--accent)] border-opacity-30">
                      <p className="text-[12px] text-[var(--ink-secondary)]">Ответ сервиса:</p>
                      <p className="text-[13px] text-[var(--ink)]">{review.reply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === 'write' && (
          <div className="space-y-4">
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5 text-center">
              <h2 className="text-[18px] font-bold text-[var(--ink)] mb-4">Оцените обслуживание</h2>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} onClick={() => { haptic('light'); setRating(star) }}
                    onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                    className="text-[36px] transition-transform active:scale-125">
                    <span className={star <= (hoverRating || rating) ? 'text-[#FF9500]' : 'text-[var(--fill)]'}>★</span>
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-[14px] text-[var(--ink-secondary)]">
                  {rating === 5 ? 'Отлично!' : rating === 4 ? 'Хорошо' : rating === 3 ? 'Нормально' : rating === 2 ? 'Плохо' : 'Ужасно'}
                </p>
              )}
            </div>

            <div>
              <label className="text-[12px] text-[var(--ink-secondary)] font-medium mb-1.5 block">Ваш отзыв</label>
              <textarea value={text} onChange={e => setText(e.target.value)}
                placeholder="Расскажите о вашем опыте обслуживания..."
                rows={4} className="w-full px-4 py-3 bg-[var(--card)] rounded-[13px] text-[16px] border border-[var(--separator)] focus:border-[var(--accent)] outline-none placeholder-[var(--ink-secondary)] resize-none" />
            </div>

            <button onClick={handleSubmit} disabled={rating === 0 || !text.trim()}
              className="w-full h-[50px] bg-[#34C759] text-white rounded-[13px] font-semibold text-[17px] disabled:opacity-40 active:scale-[0.97] transition-transform">
              Отправить отзыв
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
