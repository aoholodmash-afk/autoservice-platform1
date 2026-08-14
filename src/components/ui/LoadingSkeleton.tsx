'use client'

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'text' | 'circle'
  count?: number
  className?: string
}

export function LoadingSkeleton({ variant = 'card', count = 3, className = '' }: LoadingSkeletonProps) {
  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-4 bg-[var(--fill)] rounded-[6px] skeleton-animate" style={{ width: `${80 - i * 15}%`, animationDelay: `${i * 100}ms` }} />
        ))}
      </div>
    )
  }

  if (variant === 'circle') {
    return (
      <div className={`flex gap-3 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="w-10 h-10 rounded-full bg-[var(--fill)] skeleton-animate" style={{ animationDelay: `${i * 100}ms` }} />
        ))}
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 bg-[var(--card)] rounded-[13px] p-4 shadow-sm">
            <div className="w-12 h-12 rounded-[10px] bg-[var(--fill)] skeleton-animate" style={{ animationDelay: `${i * 80}ms` }} />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[var(--fill)] rounded-[6px] w-3/4 skeleton-animate" style={{ animationDelay: `${i * 80 + 40}ms` }} />
              <div className="h-3 bg-[var(--fill)] rounded-[6px] w-1/2 skeleton-animate" style={{ animationDelay: `${i * 80 + 80}ms` }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // card variant
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[var(--card)] rounded-[13px] p-5 shadow-sm space-y-3">
          <div className="h-5 bg-[var(--fill)] rounded-[6px] w-2/3 skeleton-animate" style={{ animationDelay: `${i * 100}ms` }} />
          <div className="h-4 bg-[var(--fill)] rounded-[6px] w-full skeleton-animate" style={{ animationDelay: `${i * 100 + 50}ms` }} />
          <div className="h-4 bg-[var(--fill)] rounded-[6px] w-4/5 skeleton-animate" style={{ animationDelay: `${i * 100 + 100}ms` }} />
          <div className="flex gap-2 pt-2">
            <div className="h-8 bg-[var(--fill)] rounded-[8px] w-20 skeleton-animate" style={{ animationDelay: `${i * 100 + 150}ms` }} />
            <div className="h-8 bg-[var(--fill)] rounded-[8px] w-16 skeleton-animate" style={{ animationDelay: `${i * 100 + 200}ms` }} />
          </div>
        </div>
      ))}
    </div>
  )
}
