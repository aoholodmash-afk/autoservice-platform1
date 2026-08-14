'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[50vh] flex items-center justify-center p-6">
          <div className="text-center max-w-[320px]">
            <div className="text-[44px] mb-4">😅</div>
            <h2 className="text-[20px] font-bold text-[var(--ink)] mb-2">Что-то пошло не так</h2>
            <p className="text-[14px] text-[var(--ink-secondary)] mb-6">
              Произошла ошибка при загрузке страницы
            </p>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.reload() }}
              className="h-[44px] px-6 bg-[var(--accent)] text-white rounded-[12px] font-semibold text-[15px]"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
