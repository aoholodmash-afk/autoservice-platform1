'use client'

import { useState } from 'react'
import { MOCK_ORDERS, TrackingOrder } from '@/data/tracking'
import { haptic } from '@/lib/constants'

interface ChatMessage {
  id: string
  from: 'client' | 'master'
  text: string
  time: string
  read: boolean
}

interface ChatScreenProps {
  orderId?: string
  onBack: () => void
}

const MOCK_MESSAGES: ChatMessage[] = []

export function ChatScreen({ orderId, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (!newMessage.trim()) return
    haptic('light')
    const msg: ChatMessage = {
      id: `m${Date.now()}`,
      from: 'client',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    }
    setMessages(prev => [...prev, msg])
    setNewMessage('')

    // Simulate master reply
    setTimeout(() => {
      const reply: ChatMessage = {
        id: `m${Date.now() + 1}`,
        from: 'master',
        text: 'Спасибо за сообщение! Мастер ответит в ближайшее время.',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        read: false,
      }
      setMessages(prev => [...prev, reply])
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--separator)]">
        <div className="flex items-center px-4 h-[44px]">
          <button onClick={onBack} className="text-[var(--accent)] text-[15px] font-medium flex items-center gap-1">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Назад
          </button>
          <div className="flex-1 text-center text-[16px] font-semibold text-[var(--ink)] pr-10">💬 Чат с мастером</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-[13px] px-4 py-2.5 ${
              msg.from === 'client' ? 'bg-[var(--accent)] text-white rounded-br-[4px]' : 'bg-[var(--card)] text-[var(--ink)] rounded-bl-[4px] shadow-[var(--shadow-card)]'
            }`}>
              <p className="text-[14px] leading-[1.4]">{msg.text}</p>
              <p className={`text-[10px] mt-1 ${msg.from === 'client' ? 'text-white/60' : 'text-[var(--ink-secondary)]'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-[var(--card)] border-t border-[var(--separator)] px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="flex gap-2">
          <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Сообщение..." className="flex-1 h-[40px] px-4 bg-[var(--fill)] rounded-[20px] text-[14px] outline-none" />
          <button onClick={handleSend} disabled={!newMessage.trim()}
            className="w-[40px] h-[40px] bg-[var(--accent)] rounded-full flex items-center justify-center disabled:opacity-40">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
