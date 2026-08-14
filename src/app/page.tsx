'use client'

import { useState, useEffect } from 'react'
import { useCarStore, SavedCar } from '@/hooks/useCarStore'
import { getServiceById } from '@/data/services'
import { t, initLocale } from '@/lib/i18n'
import { initTheme } from '@/lib/theme'
import { haptic } from '@/lib/constants'

// Screens
import { WelcomeScreen } from '@/components/screens/WelcomeScreen'
import { CarWizard } from '@/components/wizard/CarWizard'
import { MyCarsScreen } from '@/components/screens/MyCarsScreen'
import { MainMenuScreen } from '@/components/screens/MainMenuScreen'
import { TOCategoryScreen } from '@/components/screens/TOCategoryScreen'
import { ServiceDetailScreen } from '@/components/screens/ServiceDetailScreen'
import { BookingScreen } from '@/components/screens/BookingScreen'
import { BookingConfirmScreen } from '@/components/screens/BookingConfirmScreen'

// Tab bar
import { TabBar, HomeIcon, CarIcon, CalendarIcon, ProfileIcon } from '@/components/ui/TabBar'

type Screen =
  | 'welcome'
  | 'wizard'
  | 'my-cars'
  | 'main-menu'
  | 'category'
  | 'service-detail'
  | 'booking'
  | 'booking-confirm'
  | 'profile'

type Tab = 'home' | 'cars' | 'bookings' | 'profile'

export default function HomePage() {
  const { cars, isLoaded, addCar } = useCarStore()
  const [screen, setScreen] = useState<Screen>('welcome')
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [selectedCar, setSelectedCar] = useState<SavedCar | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedService, setSelectedService] = useState<string>('')
  const [bookingResult, setBookingResult] = useState<{
    serviceName: string
    carName: string
    date: string
    time?: string
  } | null>(null)

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

  const handleAddCar = () => {
    haptic('light')
    setScreen('wizard')
  }

  const handleWizardComplete = (carData: {
    brandId: string
    brandName: string
    modelId: string
    modelName: string
    year: number
    engineId: string
    engineName: string
  }) => {
    const newCar = addCar(carData)
    setSelectedCar(newCar)
    setScreen('my-cars')
    setActiveTab('cars')
  }

  const handleWizardCancel = () => {
    if (cars.length > 0) {
      setScreen('my-cars')
      setActiveTab('cars')
    } else {
      setScreen('welcome')
    }
  }

  const handleSelectCar = (car: SavedCar) => {
    haptic('light')
    setSelectedCar(car)
    setScreen('main-menu')
  }

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setScreen('category')
  }

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId)
    setScreen('service-detail')
  }

  const handleBookFromDetail = () => {
    setScreen('booking')
  }

  const handleBookingConfirm = (booking: {
    date: string
    time: string
    name: string
    phone: string
    comment: string
  }) => {
    const service = getServiceById(selectedService)
    setBookingResult({
      serviceName: service ? t(service.nameKey) : selectedService,
      carName: selectedCar?.modelName || '',
      date: booking.date,
      time: booking.time,
    })
    setScreen('booking-confirm')
  }

  const handleGoHome = () => {
    if (selectedCar) {
      setScreen('main-menu')
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
        if (selectedCar) {
          setScreen('main-menu')
        } else if (cars.length > 0) {
          setSelectedCar(cars[0])
          setScreen('main-menu')
        } else {
          setScreen('welcome')
        }
        break
      case 'cars':
        setScreen('my-cars')
        break
      case 'bookings':
        setScreen('my-cars')
        break
      case 'profile':
        setScreen('my-cars')
        break
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
          <WelcomeScreen
            onAddCar={handleAddCar}
            hasExistingCars={cars.length > 0}
            onGoToCars={() => {
              setScreen('my-cars')
              setActiveTab('cars')
            }}
          />
        )}

        {screen === 'wizard' && (
          <CarWizard
            onComplete={handleWizardComplete}
            onCancel={handleWizardCancel}
          />
        )}

        {screen === 'my-cars' && (
          <MyCarsScreen
            onSelectCar={handleSelectCar}
            onAddCar={handleAddCar}
          />
        )}

        {screen === 'main-menu' && selectedCar && (
          <MainMenuScreen
            car={selectedCar}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {screen === 'category' && (
          <TOCategoryScreen
            category={selectedCategory as any}
            onSelectService={handleSelectService}
            onBack={() => setScreen('main-menu')}
          />
        )}

        {screen === 'service-detail' && selectedCar && (
          <ServiceDetailScreen
            serviceId={selectedService}
            car={selectedCar}
            onBook={handleBookFromDetail}
            onBack={() => setScreen('category')}
          />
        )}

        {screen === 'booking' && selectedCar && (
          <BookingScreen
            serviceId={selectedService}
            car={selectedCar}
            onConfirm={handleBookingConfirm}
            onBack={() => setScreen('category')}
          />
        )}

        {screen === 'booking-confirm' && bookingResult && (
          <BookingConfirmScreen
            serviceName={bookingResult.serviceName}
            carName={bookingResult.carName}
            date={bookingResult.date}
            time={bookingResult.time}
            onHome={handleGoHome}
          />
        )}
      </div>

      {showTabBar && (
        <TabBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={tabs}
        />
      )}
    </div>
  )
}
