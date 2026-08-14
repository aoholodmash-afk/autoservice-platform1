'use client'

import { haptic } from '@/lib/constants'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'premium'
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  fullWidth?: boolean
  className?: string
  type?: 'button' | 'submit'
  icon?: React.ReactNode
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'default',
  disabled = false,
  fullWidth = true,
  className = '',
  type = 'button',
  icon,
}: ButtonProps) {
  const handleClick = () => {
    if (disabled) return
    haptic('light')
    onClick?.()
  }

  const baseStyles = 'flex items-center justify-center gap-2 rounded-[13px] font-semibold tracking-tight transition-all duration-200 active:scale-[0.97] select-none'

  const sizeStyles = {
    small: 'h-[36px] px-4 text-[15px]',
    default: 'h-[50px] px-6 text-[17px]',
    large: 'h-[56px] px-8 text-[17px]',
  }

  const variantStyles = {
    primary: 'bg-[var(--accent)] text-white hover:opacity-90 shadow-[var(--shadow-glow)]',
    secondary: 'bg-[var(--fill)] text-[var(--accent)]',
    danger: 'bg-[var(--danger)] text-white shadow-[0_0_15px_rgba(255,59,48,0.2)]',
    ghost: 'bg-transparent text-[var(--accent)]',
    premium: 'text-white shadow-[var(--shadow-glow)]',
  }

  const disabledStyles = disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'

  const premiumStyle = variant === 'premium' ? {
    background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
  } : {}

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      style={premiumStyle}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
