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

export function useCarStore() {
  const [cars, setCars] = useState<SavedCar[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setCars(loadCars())
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
    return newCar
  }, [])

  const removeCar = useCallback((id: string) => {
    setCars(prev => {
      const updated = prev.filter(c => c.id !== id)
      saveCars(updated)
      return updated
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

  return {
    cars,
    isLoaded,
    addCar,
    removeCar,
    updateMileage,
    getCar,
  }
}
