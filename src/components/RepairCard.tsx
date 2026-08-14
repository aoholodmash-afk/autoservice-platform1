'use client'

import { Repair } from '@/data/repairs'
import { PartsTable } from './PartsTable'

interface RepairCardProps {
  repair: Repair
  onBook: () => void
}

export function RepairCard({ repair, onBook }: RepairCardProps) {
  const partsMin = repair.parts.reduce((sum, part) => {
    const min = part.variants.reduce((m, v) => v.price < m ? v.price : m, Infinity)
    return sum + (min === Infinity ? 0 : min)
  }, 0)

  const kitMin = repair.kits.length > 0
    ? Math.min(...repair.kits.map(k => k.price))
    : Infinity

  const bestPartsPrice = kitMin < partsMin ? kitMin : partsMin
  const totalPrice = repair.laborPrice + bestPartsPrice

  return (
    <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white">{repair.name}</h3>
            <p className="text-blue-100 text-sm mt-1">{repair.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            repair.difficulty === 'easy' ? 'bg-green-500 text-white' :
            repair.difficulty === 'medium' ? 'bg-yellow-400 text-gray-800' :
            'bg-red-400 text-white'
          }`}>
            {repair.difficulty === 'easy' ? 'Легко' : repair.difficulty === 'medium' ? 'Средне' : 'Сложно'}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Запчасти */}
        {repair.parts.length > 0 && (
          <PartsTable parts={repair.parts} kits={repair.kits} />
        )}

        {/* Блок работ */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-lg">💰</span> Стоимость работ
          </h4>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700">{repair.name}</p>
              <p className="text-sm text-gray-500">Норма: {repair.laborHours} ч.</p>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              {repair.laborPrice.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>

        {/* Итого */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Запчасти (от):</span>
            <span className="font-semibold">{bestPartsPrice.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Работы:</span>
            <span className="font-semibold">{repair.laborPrice.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div className="border-t border-blue-200 pt-3 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">ИТОГО:</span>
            <span className="text-3xl font-bold text-blue-600">
              от {totalPrice.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>

        {/* Кнопка записи */}
        <button
          onClick={onBook}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          📅 Записаться на ремонт
        </button>
      </div>
    </div>
  )
}
