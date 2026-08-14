'use client'

import { haptic } from '@/lib/constants'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  fullWidth?: boolean
  className?: string
  type?: 'button' | 'submit'
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
}: ButtonProps) {
  const handleClick = () => {
    if (disabled) return
    haptic('light')
    onClick?.()
  }

  const baseStyles = 'flex items-center justify-center rounded-[13px] font-semibold tracking-tight transition-all duration-200 active:scale-[0.97] select-none'

  const sizeStyles = {
    small: 'h-[36px] px-4 text-[15px]',
    default: 'h-[50px] px-6 text-[17px]',
    large: 'h-[56px] px-8 text-[17px]',
  }

  const variantStyles = {
    primary: 'bg-[var(--accent)] text-white hover:opacity-90',
    secondary: 'bg-[var(--fill)] text-[var(--accent)]',
    danger: 'bg-[var(--danger)] text-white',
    ghost: 'bg-transparent text-[var(--accent)]',
  }

  const disabledStyles = disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
