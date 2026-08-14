interface ProgressBarProps {
  current: number  // 0-based
  total: number
  className?: string
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const percent = ((current + 1) / total) * 100

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="progress-bar-ios flex-1">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-[13px] text-[var(--ink-secondary)] tabular-nums">
        {current + 1}/{total}
      </span>
    </div>
  )
}
