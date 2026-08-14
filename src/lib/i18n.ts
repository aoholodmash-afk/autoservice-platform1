export type Locale = 'ru' | 'en'

const translations: Record<Locale, Record<string, string>> = {
  ru: {
    // Common
    'app.title': 'AutoService',
    'app.subtitle': 'Запись на ТО',
    'common.back': 'Назад',
    'common.next': 'Далее',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.delete': 'Удалить',
    'common.confirm': 'Подтвердить',
    'common.loading': 'Загрузка...',

    // Welcome
    'welcome.title': 'Добро пожаловать',
    'welcome.subtitle': 'Ваш персональный помощник\nпо обслуживанию автомобиля',
    'welcome.addCar': 'Добавить автомобиль',
    'welcome.haveAccount': 'Уже есть авто?',

    // Car Wizard
    'wizard.brand': 'Марка автомобиля',
    'wizard.brand.search': 'Поиск марки...',
    'wizard.model': 'Модель',
    'wizard.year': 'Год выпуска',
    'wizard.engine': 'Двигатель',
    'wizard.confirm': 'Ваш автомобиль',
    'wizard.save': 'Сохранить в мои авто',
    'wizard.saved': 'Автомобиль добавлен!',
    'wizard.saved.desc': 'Теперь вы можете записаться на обслуживание',
    'wizard.step': 'Шаг',

    // My Cars
    'myCars.title': 'Мои авто',
    'myCars.empty.title': 'Нет сохранённых авто',
    'myCars.empty.desc': 'Добавьте автомобиль, чтобы записаться на обслуживание',
    'myCars.add': 'Добавить ещё',
    'myCars.mileage': 'Пробег',
    'myCars.km': 'км',

    // Main Menu
    'menu.title': 'Что нужно сделать?',
    'menu.to': 'ТО',
    'menu.to.desc': 'Масло, фильтры, жидкости',
    'menu.repair': 'Ремонт',
    'menu.repair.desc': 'Двигатель, КПП, ходовая',
    'menu.diagnostic': 'Диагностика',
    'menu.diagnostic.desc': 'Компьютерная проверка',
    'menu.tires': 'Шиномонтаж',
    'menu.tires.desc': 'Замена и ремонт шин',

    // TO Services
    'to.title': 'Техническое обслуживание',
    'to.oil': 'Замена масла',
    'to.oil.desc': 'Масло + масляный фильтр',
    'to.airFilter': 'Воздушный фильтр',
    'to.airFilter.desc': 'Фильтр воздухозаборника',
    'to.fuelFilter': 'Топливный фильтр',
    'to.fuelFilter.desc': 'Фильтр топливной системы',
    'to.cabinFilter': 'Салонный фильтр',
    'to.cabinFilter.desc': 'Фильтр климат-системы',
    'to.brakePadsFront': 'Колодки передние',
    'to.brakePadsFront.desc': 'Передние тормозные колодки',
    'to.brakePadsRear': 'Колодки задние',
    'to.brakePadsRear.desc': 'Задние тормозные колодки',
    'to.brakeFluid': 'Тормозная жидкость',
    'to.brakeFluid.desc': 'Полная замена ТЖ',
    'to.coolant': 'Охлаждающая жидкость',
    'to.coolant.desc': 'Антифриз/тосол',
    'to.sparkPlugs': 'Свечи зажигания',
    'to.sparkPlugs.desc': 'Комплект свечей',
    'to.timingBelt': 'Ремень ГРМ',
    'to.timingBelt.desc': 'Ремень + ролики',
    'to.fullTo': 'Комплексное ТО',
    'to.fullTo.desc': 'Полный осмотр + расходники',
    'to.minutes': 'мин',
    'to.from': 'от',
    'to.book': 'Записаться',

    // Booking
    'booking.title': 'Запись на услугу',
    'booking.date': 'Дата',
    'booking.time': 'Время',
    'booking.anyTime': 'Любое',
    'booking.name': 'Имя',
    'booking.phone': 'Телефон',
    'booking.comment': 'Комментарий',
    'booking.comment.placeholder': 'Опишите проблему или пожелания...',
    'booking.submit': 'Записаться',
    'booking.sending': 'Отправка...',
    'booking.confirmed': 'Запись подтверждена!',
    'booking.confirmed.desc': 'Мы свяжемся с вами для уточнения деталей',
    'booking.toHome': 'На главную',

    // Tab bar
    'tab.home': 'Главная',
    'tab.cars': 'Мои авто',
    'tab.bookings': 'Записи',
    'tab.profile': 'Профиль',

    // Settings
    'settings.title': 'Настройки',
    'settings.language': 'Язык',
    'settings.theme': 'Тема',
    'settings.theme.light': 'Светлая',
    'settings.theme.dark': 'Тёмная',
    'settings.theme.system': 'Системная',
  },
  en: {
    // Common
    'app.title': 'AutoService',
    'app.subtitle': 'Car Service Booking',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.loading': 'Loading...',

    // Welcome
    'welcome.title': 'Welcome',
    'welcome.subtitle': 'Your personal assistant\nfor car maintenance',
    'welcome.addCar': 'Add vehicle',
    'welcome.haveAccount': 'Already have a car?',

    // Car Wizard
    'wizard.brand': 'Car brand',
    'wizard.brand.search': 'Search brand...',
    'wizard.model': 'Model',
    'wizard.year': 'Year',
    'wizard.engine': 'Engine',
    'wizard.confirm': 'Your vehicle',
    'wizard.save': 'Save to my cars',
    'wizard.saved': 'Vehicle added!',
    'wizard.saved.desc': 'Now you can book a service',
    'wizard.step': 'Step',

    // My Cars
    'myCars.title': 'My Cars',
    'myCars.empty.title': 'No saved cars',
    'myCars.empty.desc': 'Add a vehicle to book a service',
    'myCars.add': 'Add another',
    'myCars.mileage': 'Mileage',
    'myCars.km': 'km',

    // Main Menu
    'menu.title': 'What do you need?',
    'menu.to': 'Maintenance',
    'menu.to.desc': 'Oil, filters, fluids',
    'menu.repair': 'Repair',
    'menu.repair.desc': 'Engine, gearbox, suspension',
    'menu.diagnostic': 'Diagnostics',
    'menu.diagnostic.desc': 'Computer check',
    'menu.tires': 'Tires',
    'menu.tires.desc': 'Tire change & repair',

    // TO Services
    'to.title': 'Maintenance',
    'to.oil': 'Oil Change',
    'to.oil.desc': 'Oil + oil filter',
    'to.airFilter': 'Air Filter',
    'to.airFilter.desc': 'Air intake filter',
    'to.fuelFilter': 'Fuel Filter',
    'to.fuelFilter.desc': 'Fuel system filter',
    'to.cabinFilter': 'Cabin Filter',
    'to.cabinFilter.desc': 'Climate system filter',
    'to.brakePadsFront': 'Front Brake Pads',
    'to.brakePadsFront.desc': 'Front brake pads replacement',
    'to.brakePadsRear': 'Rear Brake Pads',
    'to.brakePadsRear.desc': 'Rear brake pads replacement',
    'to.brakeFluid': 'Brake Fluid',
    'to.brakeFluid.desc': 'Full brake fluid replacement',
    'to.coolant': 'Coolant',
    'to.coolant.desc': 'Antifreeze replacement',
    'to.sparkPlugs': 'Spark Plugs',
    'to.sparkPlugs.desc': 'Spark plugs set',
    'to.timingBelt': 'Timing Belt',
    'to.timingBelt.desc': 'Belt + rollers',
    'to.fullTo': 'Full Service',
    'to.fullTo.desc': 'Full inspection + consumables',
    'to.minutes': 'min',
    'to.from': 'from',
    'to.book': 'Book',

    // Booking
    'booking.title': 'Book Service',
    'booking.date': 'Date',
    'booking.time': 'Time',
    'booking.anyTime': 'Any',
    'booking.name': 'Name',
    'booking.phone': 'Phone',
    'booking.comment': 'Comment',
    'booking.comment.placeholder': 'Describe the issue or wishes...',
    'booking.submit': 'Book',
    'booking.sending': 'Sending...',
    'booking.confirmed': 'Booking Confirmed!',
    'booking.confirmed.desc': 'We will contact you to confirm details',
    'booking.toHome': 'Home',

    // Tab bar
    'tab.home': 'Home',
    'tab.cars': 'My Cars',
    'tab.bookings': 'Bookings',
    'tab.profile': 'Profile',

    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.theme.light': 'Light',
    'settings.theme.dark': 'Dark',
    'settings.theme.system': 'System',
  },
}

let currentLocale: Locale = 'ru'

export function setLocale(locale: Locale) {
  currentLocale = locale
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale)
  }
}

export function getLocale(): Locale {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('locale') as Locale
    if (stored && (stored === 'ru' || stored === 'en')) {
      currentLocale = stored
    }
  }
  return currentLocale
}

export function t(key: string): string {
  return translations[currentLocale]?.[key] || translations['ru']?.[key] || key
}

export function initLocale() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('locale') as Locale
    if (stored && (stored === 'ru' || stored === 'en')) {
      currentLocale = stored
    }
  }
}
