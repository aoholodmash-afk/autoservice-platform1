'use client'

import { useState, useEffect, useCallback } from 'react'

export interface SavedCar {
  id: string
  brandId: string
  brandName: string
  modelId: string
  modelName: string
  year: number
  engineId: string
  engineName: string
  mileage?: number
  addedAt: number
}

const STORAGE_KEY = 'autoservice_cars'
const ACTIVE_CAR_KEY = 'autoservice_active_car'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

function loadCars(): SavedCar[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCars(cars: SavedCar[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars))
}

function loadActiveCarId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(ACTIVE_CAR_KEY)
}

function saveActiveCarId(id: string | null) {
  if (typeof window === 'undefined') return
  if (id) {
    localStorage.setItem(ACTIVE_CAR_KEY, id)
  } else {
    localStorage.removeItem(ACTIVE_CAR_KEY)
  }
}

export function useCarStore() {
  const [cars, setCars] = useState<SavedCar[]>([])
  const [activeCarId, setActiveCarIdState] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loaded = loadCars()
    setCars(loaded)
    const savedActive = loadActiveCarId()
    // If saved active car exists in the list, use it; otherwise use first car
    if (savedActive && loaded.find(c => c.id === savedActive)) {
      setActiveCarIdState(savedActive)
    } else if (loaded.length > 0) {
      setActiveCarIdState(loaded[0].id)
    }
    setIsLoaded(true)
  }, [])

  const addCar = useCallback((car: Omit<SavedCar, 'id' | 'addedAt'>) => {
    const newCar: SavedCar = {
      ...car,
      id: generateId(),
      addedAt: Date.now(),
    }
    setCars(prev => {
      const updated = [...prev, newCar]
      saveCars(updated)
      return updated
    })
    // Auto-set as active if it's the first car
    setActiveCarIdState(prev => {
      if (!prev) {
        saveActiveCarId(newCar.id)
        return newCar.id
      }
      return prev
    })
    return newCar
  }, [])

  const removeCar = useCallback((id: string) => {
    setCars(prev => {
      const updated = prev.filter(c => c.id !== id)
      saveCars(updated)
      return updated
    })
    setActiveCarIdState(prev => {
      if (prev === id) {
        const remaining = loadCars().filter(c => c.id !== id)
        const newActive = remaining.length > 0 ? remaining[0].id : null
        saveActiveCarId(newActive)
        return newActive
      }
      return prev
    })
  }, [])

  const updateMileage = useCallback((id: string, mileage: number) => {
    setCars(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, mileage } : c)
      saveCars(updated)
      return updated
    })
  }, [])

  const getCar = useCallback((id: string) => {
    return cars.find(c => c.id === id)
  }, [cars])

  const setActiveCar = useCallback((id: string) => {
    setActiveCarIdState(id)
    saveActiveCarId(id)
  }, [])

  const activeCar = activeCarId ? cars.find(c => c.id === activeCarId) || null : (cars[0] || null)

  return {
    cars,
    activeCar,
    activeCarId: activeCarId || (cars[0]?.id || null),
    isLoaded,
    addCar,
    removeCar,
    updateMileage,
    getCar,
    setActiveCar,
  }
}
