'use client'

import { haptic } from '@/lib/constants'

interface TabBarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs: {
    id: string
    label: string
    icon: React.ReactNode
    activeIcon?: React.ReactNode
  }[]
}

export function TabBar({ activeTab, onTabChange, tabs }: TabBarProps) {
  const handleTabChange = (tabId: string) => {
    haptic('light')
    onTabChange(tabId)
  }

  return (
    <nav className="tab-bar-ios">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={`tab-item-ios ${activeTab === tab.id ? 'active' : ''}`}
        >
          {activeTab === tab.id && tab.activeIcon ? tab.activeIcon : tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}

// Default tab icons
export function HomeIcon({ active = false }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  )
}

export function CarIcon({ active = false }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17l-1 2h1l1-2M19 17l1 2h-1l-1-2"/>
      <circle cx="7.5" cy="17" r="1.5"/>
      <circle cx="16.5" cy="17" r="1.5"/>
    </svg>
  )
}

export function CalendarIcon({ active = false }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

export function ProfileIcon({ active = false }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
