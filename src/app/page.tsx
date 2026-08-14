'use client'

import { useState, useEffect } from 'react'
import { useCarStore, SavedCar } from '@/hooks/useCarStore'
import { t, initLocale } from '@/lib/i18n'
import { initTheme } from '@/lib/theme'
import { haptic } from '@/lib/constants'

// Screens
import { WelcomeScreen } from '@/components/screens/WelcomeScreen'
import { CarWizard } from '@/components/wizard/CarWizard'
import { MyCarsScreen } from '@/components/screens/MyCarsScreen'
import { MainMenuScreen } from '@/components/screens/MainMenuScreen'
import { RepairScreen } from '@/components/screens/RepairScreen'
import { TrackingScreen } from '@/components/screens/TrackingScreen'
import { TOCalculatorScreen } from '@/components/screens/TOCalculatorScreen'
import { ReviewScreen } from '@/components/screens/ReviewScreen'
import { InspectionReport } from '@/components/screens/InspectionReport'
import { LoyaltyScreen } from '@/components/screens/LoyaltyScreen'
import { ServiceHistory } from '@/components/screens/ServiceHistory'
import { ChatScreen } from '@/components/screens/ChatScreen'
import { ReferralScreen } from '@/components/screens/ReferralScreen'
import { WarrantyScreen } from '@/components/screens/WarrantyScreen'
import { LocationSelect } from '@/components/screens/LocationSelect'
import { PaymentScreen } from '@/components/screens/PaymentScreen'

// Tab bar
import { TabBar, HomeIcon, CarIcon, CalendarIcon, ProfileIcon } from '@/components/ui/TabBar'

type Screen =
  | 'welcome'
  | 'wizard'
  | 'my-cars'
  | 'main-menu'
  | 'repair'
  | 'tracking'
  | 'calculator'
  | 'reviews'
  | 'checklist'
  | 'loyalty'
  | 'history'
  | 'chat'
  | 'referral'
  | 'warranty'
  | 'location'
  | 'payment'

type Tab = 'home' | 'cars' | 'bookings' | 'profile'

export default function HomePage() {
  const { cars, activeCar, isLoaded, addCar, setActiveCar } = useCarStore()
  const [screen, setScreen] = useState<Screen>('welcome')
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [wizardReturnTo, setWizardReturnTo] = useState<Screen>('my-cars')
  const [repairCategory, setRepairCategory] = useState<string | null>(null)

  useEffect(() => {
    initTheme()
    initLocale()
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    if (cars.length > 0) {
      setScreen('my-cars')
      setActiveTab('cars')
    } else {
      setScreen('welcome')
    }
  }, [isLoaded, cars.length])

  const handleAddCar = (returnTo: Screen = 'my-cars') => {
    haptic('light')
    setWizardReturnTo(returnTo)
    setScreen('wizard')
  }

  const handleWizardComplete = (carData: {
    brandId: string; brandName: string; modelId: string; modelName: string;
    year: number; engineId: string; engineName: string;
  }) => {
    const newCar = addCar(carData)
    setActiveCar(newCar.id)
    setScreen(wizardReturnTo)
  }

  const handleWizardCancel = () => {
    setScreen(cars.length > 0 ? wizardReturnTo : 'welcome')
  }

  const handleSelectCar = (car: SavedCar) => {
    haptic('light')
    setActiveCar(car.id)
    setScreen('main-menu')
  }

  const handleOpenRepair = (categoryId?: string) => {
    setRepairCategory(categoryId || null)
    setScreen('repair')
  }

  const handleGoHome = () => {
    if (activeCar) {
      setScreen('main-menu')
      setActiveTab('home')
    } else if (cars.length > 0) {
      setScreen('my-cars')
      setActiveTab('cars')
    } else {
      setScreen('welcome')
    }
  }

  const handleTabChange = (tab: string) => {
    haptic('light')
    setActiveTab(tab as Tab)
    switch (tab) {
      case 'home':
        if (activeCar) setScreen('main-menu')
        else if (cars.length > 0) { setActiveCar(cars[0].id); setScreen('main-menu') }
        else setScreen('welcome')
        break
      case 'cars': setScreen('my-cars'); break
      case 'bookings': setScreen('tracking'); break
      case 'profile': setScreen('my-cars'); break
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const tabs = [
    { id: 'home', label: t('tab.home'), icon: <HomeIcon />, activeIcon: <HomeIcon active /> },
    { id: 'cars', label: t('tab.cars'), icon: <CarIcon />, activeIcon: <CarIcon active /> },
    { id: 'bookings', label: t('tab.bookings'), icon: <CalendarIcon />, activeIcon: <CalendarIcon active /> },
    { id: 'profile', label: t('tab.profile'), icon: <ProfileIcon />, activeIcon: <ProfileIcon active /> },
  ]

  const showTabBar = ['my-cars', 'main-menu'].includes(screen)

  return (
    <div className="mx-auto max-w-[430px] min-h-screen bg-[var(--bg)] relative">
      <div className={showTabBar ? 'pb-24' : ''}>
        {screen === 'welcome' && (
          <WelcomeScreen onAddCar={() => handleAddCar('my-cars')} hasExistingCars={cars.length > 0}
            onGoToCars={() => { setScreen('my-cars'); setActiveTab('cars') }} />
        )}

        {screen === 'wizard' && (
          <CarWizard onComplete={handleWizardComplete} onCancel={handleWizardCancel} />
        )}

        {screen === 'my-cars' && (
          <MyCarsScreen onSelectCar={handleSelectCar} onAddCar={() => handleAddCar('my-cars')} />
        )}

        {screen === 'main-menu' && activeCar && (
          <MainMenuScreen
            car={activeCar}
            onOpenRepair={handleOpenRepair}
            onOpenCalculator={() => setScreen('calculator')}
            onOpenReviews={() => setScreen('reviews')}
            onOpenChecklist={() => setScreen('checklist')}
            onOpenLoyalty={() => setScreen('loyalty')}
            onOpenHistory={() => setScreen('history')}
            onOpenChat={() => setScreen('chat')}
            onOpenReferral={() => setScreen('referral')}
            onOpenWarranty={() => setScreen('warranty')}
            onOpenLocation={() => setScreen('location')}
          />
        )}

        {screen === 'repair' && (
          <RepairScreen cars={cars} activeCar={activeCar} onSelectCar={(id) => setActiveCar(id)}
            onAddCar={() => handleAddCar('repair')} onBack={handleGoHome} initialCategory={repairCategory} />
        )}

        {screen === 'tracking' && <TrackingScreen onBack={handleGoHome} />}

        {screen === 'calculator' && activeCar && (
          <TOCalculatorScreen car={activeCar} onBack={handleGoHome} onBook={(items) => { setScreen('repair') }} />
        )}

        {screen === 'reviews' && <ReviewScreen onBack={handleGoHome} />}

        {screen === 'checklist' && <InspectionReport onBack={handleGoHome} />}

        {screen === 'loyalty' && <LoyaltyScreen onBack={handleGoHome} />}

        {screen === 'history' && <ServiceHistory onBack={handleGoHome} />}

        {screen === 'chat' && <ChatScreen onBack={handleGoHome} />}

        {screen === 'referral' && <ReferralScreen onBack={handleGoHome} />}

        {screen === 'warranty' && <WarrantyScreen onBack={handleGoHome} />}

        {screen === 'location' && <LocationSelect onBack={handleGoHome} onSelect={(loc) => handleGoHome()} />}

        {screen === 'payment' && activeCar && (
          <PaymentScreen amount={500} serviceName="Предоплата" onConfirm={handleGoHome} onBack={handleGoHome} />
        )}
      </div>

      {showTabBar && (
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} tabs={tabs} />
      )}
    </div>
  )
}
