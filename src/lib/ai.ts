export interface DiagnosisResult {
  possibleCauses: string[]
  severity: 'low' | 'medium' | 'high' | 'urgent'
  recommendedActions: string[]
  estimatedCost: { min: number; max: number }
  needsInspection: boolean
  disclaimer: string
}

export function diagnoseSymptom(description: string, brand?: string, model?: string): DiagnosisResult {
  const text = description.toLowerCase()

  const rules: { keywords: string[]; result: Omit<DiagnosisResult, 'disclaimer'> }[] = [
    {
      keywords: ['стук', 'стучит', 'удар'],
      result: {
        possibleCauses: ['Износ шаровых опор', 'Износ рулевых наконечников', 'Износ стоек стабилизатора', 'Проблемы с подвеской'],
        severity: 'medium',
        recommendedActions: ['Диагностика ходовой части', 'Проверка подвески на подъёмнике'],
        estimatedCost: { min: 2000, max: 15000 },
        needsInspection: true,
      },
    },
    {
      keywords: ['масло', 'течёт', 'подтёки', 'уровень масла'],
      result: {
        possibleCauses: ['Износ сальников', 'Течь масляного фильтра', 'Износ прокладки клапанной крышки', 'Повреждение поддона'],
        severity: 'high',
        recommendedActions: ['Проверить уровень масла', 'Визуальный осмотр двигателя', 'Диагностика на подъёмнике'],
        estimatedCost: { min: 1500, max: 25000 },
        needsInspection: true,
      },
    },
    {
      keywords: ['тормоза', 'свист', 'скрип', 'педаль тормоза'],
      result: {
        possibleCauses: ['Износ тормозных колодок', 'Износ тормозных дисков', 'Попадание постороннего предмета', 'Износ тормозных суппортов'],
        severity: 'high',
        recommendedActions: ['Проверить тормозные колодки', 'Осмотр тормозных дисков', 'Не откладывать визит в сервис!'],
        estimatedCost: { min: 3000, max: 20000 },
        needsInspection: true,
      },
    },
    {
      keywords: ['двигатель', 'троит', 'не заводится', 'глохнет', 'обороты'],
      result: {
        possibleCauses: ['Проблемы с системой зажигания', 'Засорение форсунок', 'Неисправность датчика', 'Проблемы с топливной системой'],
        severity: 'high',
        recommendedActions: ['Компьютерная диагностика', 'Проверка свечей зажигания', 'Проверка датчиков'],
        estimatedCost: { min: 2000, max: 30000 },
        needsInspection: true,
      },
    },
    {
      keywords: ['кондиционер', 'климат', 'не холодит', 'воздух тёплый'],
      result: {
        possibleCauses: ['Утечка хладагента', 'Неисправность компрессора', 'Засорение конденсатора', 'Проблемы с электрикой'],
        severity: 'low',
        recommendedActions: ['Проверка уровня хладагента', 'Диагностика кондиционера'],
        estimatedCost: { min: 3000, max: 25000 },
        needsInspection: true,
      },
    },
    {
      keywords: ['руль', 'рулевое', 'гул', 'тянет в сторону'],
      result: {
        possibleCauses: ['Износ рулевой рейки', 'Низкий уровень ГУР', 'Износ рулевых тяг', 'Нарушение развал-схождения'],
        severity: 'medium',
        recommendedActions: ['Проверка рулевого управления', 'Проверка уровня жидкости ГУР', 'Развал-схождение'],
        estimatedCost: { min: 2000, max: 30000 },
        needsInspection: true,
      },
    },
    {
      keywords: ['аккумулятор', 'не крутит', 'разряд', 'электрика'],
      result: {
        possibleCauses: ['Износ аккумулятора', 'Неисправность генератора', 'Утечка тока', 'Окисление клемм'],
        severity: 'medium',
        recommendedActions: ['Проверка аккумулятора', 'Проверка генератора', 'Замер утечки тока'],
        estimatedCost: { min: 1000, max: 15000 },
        needsInspection: true,
      },
    },
    {
      keywords: ['подвеска', 'амортизатор', 'пружины', 'люфт'],
      result: {
        possibleCauses: ['Износ амортизаторов', 'Износ сайлентблоков', 'Износ ступичных подшипников', 'Повреждение пружин'],
        severity: 'medium',
        recommendedActions: ['Диагностика ходовой части', 'Проверка амортизаторов', 'Проверка сайлентблоков'],
        estimatedCost: { min: 3000, max: 25000 },
        needsInspection: true,
      },
    },
  ]

  for (const rule of rules) {
    if (rule.keywords.some((kw) => text.includes(kw))) {
      return { ...rule.result, disclaimer: '⚠️ Это предварительная оценка. Для точной диагностики обратитесь в автосервис.' }
    }
  }

  return {
    possibleCauses: ['Требуется профессиональная диагностика', 'Рекомендуется визит в автосервис для точного определения причины'],
    severity: 'medium',
    recommendedActions: ['Записаться на диагностику', 'Подробно описать проблему мастеру'],
    estimatedCost: { min: 1000, max: 5000 },
    needsInspection: true,
    disclaimer: '⚠️ Не удалось определить проблему автоматически. Рекомендуем обратиться в автосервис для профессиональной диагностики.',
  }
}
