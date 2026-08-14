export type Theme = 'light' | 'dark' | 'system'

export function getTheme(): Theme {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme') as Theme
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored
    }
  }
  return 'system'
}

export function setTheme(theme: Theme) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme)
    applyTheme(theme)
  }
}

export function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return

  const root = document.documentElement

  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.toggle('dark', prefersDark)
  } else {
    root.classList.toggle('dark', theme === 'dark')
  }
}

export function initTheme() {
  if (typeof window === 'undefined') return

  const theme = getTheme()
  applyTheme(theme)

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (getTheme() === 'system') {
      document.documentElement.classList.toggle('dark', e.matches)
    }
  })
}

export function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}
