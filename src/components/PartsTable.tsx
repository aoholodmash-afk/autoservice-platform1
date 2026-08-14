'use client'

import { Part, Kit } from '@/data/repairs'

interface PartsTableProps {
  parts: Part[]
  kits: Kit[]
}

export function PartsTable({ parts, kits }: PartsTableProps) {
  return (
    <div className="space-y-6">
      {/* Запчасти */}
      {parts.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-lg">🔧</span> Запчасти
          </h4>
          <div className="space-y-4">
            {parts.map((part, i) => (
              <div key={i} className="bg-white rounded-xl border overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <span className="font-medium text-gray-800">{part.name}</span>
                  {part.article && (
                    <span className="ml-2 text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                      {part.article}
                    </span>
                  )}
                </div>
                <div className="divide-y">
                  {part.variants.map((v, j) => (
                    <div key={j} className="px-4 py-3 flex items-center justify-between hover:bg-blue-50/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{v.brand}</span>
                          <span className="text-xs text-gray-400">{v.article}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            v.inStock ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {v.inStock ? '✓ В наличии' : `📦 ${v.deliveryDays} дн.`}
                          </span>
                          <span className="text-xs text-gray-400">{v.source}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-blue-600">
                          {v.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Готовые комплекты */}
      {kits.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-lg">📦</span> Готовые комплекты
            <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">обычно выгоднее</span>
          </h4>
          <div className="grid gap-3">
            {kits.map((kit, i) => (
              <div key={i} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <span className="font-medium text-gray-800">{kit.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">В комплекте:</span>
                    {kit.includes.map((item, j) => (
                      <span key={j} className="text-xs bg-white px-2 py-0.5 rounded-full border">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-blue-600">
                    {kit.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Итого по запчастям */}
      {parts.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 border">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Минимум (бюджет):</span>
            <span className="font-bold text-lg">
              {calculateMinPrice(parts).toLocaleString('ru-RU')} ₽
            </span>
          </div>
          {kits.length > 0 && (
            <div className="flex justify-between items-center mt-2 pt-2 border-t">
              <span className="text-gray-600">Лучшая цена комплектом:</span>
              <span className="font-bold text-lg text-green-600">
                {Math.min(...kits.map(k => k.price)).toLocaleString('ru-RU')} ₽
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function calculateMinPrice(parts: Part[]): number {
  return parts.reduce((sum, part) => {
    const minVariant = part.variants.reduce((min, v) => v.price < min ? v.price : min, Infinity)
    return sum + (minVariant === Infinity ? 0 : minVariant)
  }, 0)
}
