interface EmptyStateProps {
  icon: string
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="text-[55px] mb-4">{icon}</div>
      <h3 className="text-[22px] font-semibold text-[var(--ink)] mb-2">
        {title}
      </h3>
      <p className="text-[15px] text-[var(--ink-secondary)] mb-6 max-w-[280px] leading-[1.4]">
        {description}
      </p>
      {action}
    </div>
  )
}
