'use client'

import { haptic } from '@/lib/constants'

interface CardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  padding?: boolean
}

export function Card({ children, onClick, className = '', padding = true }: CardProps) {
  const handleClick = () => {
    if (!onClick) return
    haptic('light')
    onClick()
  }

  return (
    <div
      onClick={handleClick}
      className={`
        bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)]
        ${padding ? 'p-4' : ''}
        ${onClick ? 'cursor-pointer active:opacity-80 transition-opacity duration-150' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

interface CardRowProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  showArrow?: boolean
  showSeparator?: boolean
}

export function CardRow({ children, onClick, className = '', showArrow = false, showSeparator = true }: CardRowProps) {
  const handleClick = () => {
    if (!onClick) return
    haptic('light')
    onClick()
  }

  return (
    <>
      <div
        onClick={handleClick}
        className={`
          flex items-center min-h-[44px] px-4 py-[11px]
          ${onClick ? 'cursor-pointer active:bg-[var(--fill)] transition-colors duration-150' : ''}
          ${className}
        `}
      >
        <div className="flex-1 flex items-center gap-3">
          {children}
        </div>
        {showArrow && (
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="opacity-30 ml-2">
            <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      {showSeparator && (
        <div className="h-[0.5px] bg-[var(--separator)] ml-4" />
      )}
    </>
  )
}

interface CardGroupProps {
  children: React.ReactNode
  className?: string
}

export function CardGroup({ children, className = '' }: CardGroupProps) {
  return (
    <div className={`bg-[var(--card)] rounded-[13px] shadow-[var(--shadow-card)] overflow-hidden ${className}`}>
      {children}
    </div>
  )
}
