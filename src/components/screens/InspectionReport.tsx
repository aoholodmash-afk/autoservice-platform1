'use client'

import { useState } from 'react'
import { CHECKLIST_TEMPLATES, CHECKLIST_CATEGORIES, createChecklist, ChecklistItem } from '@/data/checklist'
import { haptic } from '@/lib/constants'

interface InspectionReportProps {
  onBack: () => void
  onSave?: (checklist: ChecklistItem[]) => void
}

export function InspectionReport({ onBack, onSave }: InspectionReportProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [saved, setSaved] = useState(false)

  const handleSelectTemplate = (templateId: string) => {
    haptic('medium')
    setSelectedTemplate(templateId)
    setChecklist(createChecklist(templateId))
  }

  const updateStatus = (itemId: string, status: ChecklistItem['status']) => {
    haptic('light')
    setChecklist(prev => prev.map(item =>
      item.id === itemId ? { ...item, status } : item
    ))
  }

  const updateComment = (itemId: string, comment: string) => {
    setChecklist(prev => prev.map(item =>
      item.id === itemId ? { ...item, comment } : item
    ))
  }

  const updateRecommendation = (itemId: string, recommendation: string) => {
    setChecklist(prev => prev.map(item =>
      item.id === itemId ? { ...item, recommendation } : item
    ))
  }

  const handleSave = () => {
    haptic('heavy')
    onSave?.(checklist)
    setSaved(true)
  }

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    ok: { bg: 'bg-[#34C759]', text: 'text-white', label: '✓ Норма' },
    warning: { bg: 'bg-[#FF9500]', text: 'text-white', label: '⚠ Внимание' },
    critical: { bg: 'bg-[#FF3B30]', text: 'text-white', label: '✕ Критично' },
    not_checked: { bg: 'bg-[var(--fill)]', text: 'text-[var(--ink-secondary)]', label: '—' },
  }

  // Group by category
  const grouped = checklist.reduce<Record<string, ChecklistItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const checkedCount = checklist.filter(i => i.status !== 'not_checked').length
  const criticalCount = checklist.filter(i => i.status === 'critical').length
  const warningCount = checklist.filter(i => i.status === 'warning').length

  if (saved) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
          <div className="flex items-center px-4 h-[44px]">
            <button onClick={onBack} className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
              <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Назад
            </button>
            <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">Чек-лист</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 rounded-full bg-[#34C759] flex items-center justify-center mb-4 spring-in">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M10 20L17 27L30 13" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 className="text-[22px] font-bold text-[var(--ink)] mb-2">Чек-лист сохранён</h2>
          <p className="text-[14px] text-[var(--ink-secondary)] text-center">Клиент получит отчёт</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={selectedTemplate ? () => { setSelectedTemplate(null); setChecklist([]) } : onBack}
            className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">
            📋 Чек-лист осмотра
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Template selection */}
        {!selectedTemplate && (
          <div className="space-y-4">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--ink)] mb-1">Выберите шаблон</h2>
              <p className="text-[14px] text-[var(--ink-secondary)]">Тип осмотра</p>
            </div>
            {CHECKLIST_TEMPLATES.map((template, i) => (
              <button key={template.id} onClick={() => handleSelectTemplate(template.id)}
                className="w-full bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-5 text-left active:scale-[0.97] transition-transform spring-up"
                style={{ animationDelay: `${i * 60}ms` }}>
                <div className="text-[17px] font-semibold text-[var(--ink)]">{template.name}</div>
                <div className="text-[13px] text-[var(--ink-secondary)] mt-1">{template.items.length} пунктов</div>
              </button>
            ))}
          </div>
        )}

        {/* Checklist */}
        {selectedTemplate && (
          <div className="space-y-4">
            {/* Progress */}
            <div className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] text-[var(--ink-secondary)]">Прогресс</span>
                <span className="text-[13px] font-medium text-[var(--ink)]">{checkedCount}/{checklist.length}</span>
              </div>
              <div className="h-2 bg-[var(--fill)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent)] rounded-full transition-all"
                  style={{ width: `${(checkedCount / checklist.length) * 100}%` }} />
              </div>
              {(criticalCount > 0 || warningCount > 0) && (
                <div className="flex gap-3 mt-2">
                  {criticalCount > 0 && <span className="text-[12px] text-[#FF3B30]">✕ {criticalCount} критичных</span>}
                  {warningCount > 0 && <span className="text-[12px] text-[#FF9500]">⚠ {warningCount} внимания</span>}
                </div>
              )}
            </div>

            {/* Items by category */}
            {Object.entries(grouped).map(([catId, items]) => {
              const cat = CHECKLIST_CATEGORIES[catId]
              return (
                <div key={catId} className="bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] overflow-hidden">
                  <div className="px-4 py-3 bg-[var(--fill)] flex items-center gap-2">
                    <span className="text-[16px]">{cat?.icon}</span>
                    <span className="text-[14px] font-semibold text-[var(--ink)]">{cat?.name || catId}</span>
                    <span className="text-[12px] text-[var(--ink-secondary)] ml-auto">
                      {items.filter(i => i.status !== 'not_checked').length}/{items.length}
                    </span>
                  </div>
                  <div className="divide-y divide-[var(--separator)]">
                    {items.map(item => (
                      <div key={item.id} className="px-4 py-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[14px] text-[var(--ink)]">{item.name}</span>
                          <div className="flex gap-1">
                            {(['ok', 'warning', 'critical'] as const).map(status => (
                              <button key={status} onClick={() => updateStatus(item.id, status)}
                                className={`px-2 py-1 rounded-[6px] text-[11px] font-medium transition-all ${
                                  item.status === status ? `${statusColors[status].bg} ${statusColors[status].text}` : 'bg-[var(--fill)] text-[var(--ink-secondary)]'
                                }`}>
                                {statusColors[status].label}
                              </button>
                            ))}
                          </div>
                        </div>
                        {(item.status === 'warning' || item.status === 'critical') && (
                          <div className="space-y-2 mt-2">
                            <input type="text" value={item.comment || ''} onChange={e => updateComment(item.id, e.target.value)}
                              placeholder="Комментарий..." className="w-full h-[32px] px-3 bg-[var(--fill)] rounded-[8px] text-[13px] outline-none" />
                            <input type="text" value={item.recommendation || ''} onChange={e => updateRecommendation(item.id, e.target.value)}
                              placeholder="Рекомендация..." className="w-full h-[32px] px-3 bg-[var(--fill)] rounded-[8px] text-[13px] outline-none" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Save button */}
            <button onClick={handleSave} disabled={checkedCount < checklist.length}
              className="w-full h-[50px] bg-[#34C759] text-white rounded-[13px] font-semibold text-[17px] disabled:opacity-40 active:scale-[0.97] transition-transform">
              Сохранить чек-лист
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
