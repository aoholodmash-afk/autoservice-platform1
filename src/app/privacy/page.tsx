import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика обработки персональных данных в соответствии с 152-ФЗ',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <header className="bg-white border-b border-[#E5E5EA] sticky top-0 z-10">
        <div className="max-w-[800px] mx-auto px-4 py-3 flex items-center gap-3">
          <a href="/" className="text-[#007AFF] text-[14px]">← Назад</a>
          <h1 className="text-[17px] font-semibold text-[#1C1C1E]">Политика конфиденциальности</h1>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-4 py-6 pb-12">
        <article className="bg-white rounded-[16px] shadow-sm p-6 space-y-6">
          <section>
            <h2 className="text-[20px] font-bold text-[#1C1C1E] mb-3">1. Общие положения</h2>
            <p className="text-[15px] text-[#1C1C1E] leading-[1.6]">
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
              пользователей сервиса AutoService (далее — «Сервис») в соответствии с Федеральным законом
              от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
            <p className="text-[15px] text-[#1C1C1E] leading-[1.6] mt-2">
              Используя Сервис, вы подтверждаете своё согласие с условиями настоящей Политики.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#1C1C1E] mb-3">2. Владелец сайта и оператор персональных данных</h2>
            <div className="bg-[#F2F2F7] rounded-[12px] p-4">
              <p className="text-[15px] text-[#1C1C1E]"><strong>Хатуаев Заур Хасанович</strong></p>
              <p className="text-[14px] text-[#8E8E93] mt-1">Самозанятый</p>
              <p className="text-[14px] text-[#8E8E93]">Телефон: <a href="tel:+79889198444" className="text-[#007AFF]">+7 (988) 919-84-44</a></p>
              <p className="text-[14px] text-[#8E8E93]">Email: <a href="mailto:ai3ayp@yanex.ru" className="text-[#007AFF]">ai3ayp@yanex.ru</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#1C1C1E] mb-3">3. Какие данные мы собираем</h2>
            <ul className="text-[15px] text-[#1C1C1E] leading-[1.8] list-disc pl-5">
              <li><strong>Контактные данные:</strong> имя, номер телефона, адрес электронной почты</li>
              <li><strong>Данные автомобиля:</strong> марка, модель, год выпуска, тип двигателя, государственный номер</li>
              <li><strong>Данные об обслуживании:</strong> история ремонтов, пробег, выполненные работы</li>
              <li><strong>Технические данные:</strong> файлы cookie, данные об использовании сайта</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#1C1C1E] mb-3">4. Цели обработки персональных данных</h2>
            <ul className="text-[15px] text-[#1C1C1E] leading-[1.8] list-disc pl-5">
              <li>Предоставление услуг технического обслуживания и ремонта автомобилей</li>
              <li>Запись на обслуживание и управление расписанием</li>
              <li>Уведомления о статусе заказа и напоминания о ТО</li>
              <li>Ведение истории обслуживания автомобиля</li>
              <li>Программа лояльности и персональные предложения</li>
              <li>Обратная связь и улучшение качества сервиса</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#1C1C1E] mb-3">5. Файлы cookie</h2>
            <p className="text-[15px] text-[#1C1C1E] leading-[1.6]">
              Мы используем следующие типы файлов cookie:
            </p>
            <ul className="text-[15px] text-[#1C1C1E] leading-[1.8] list-disc pl-5 mt-2">
              <li><strong>Необходимые:</strong> обеспечивают базовую работу сайта (авторизация, сохранение данных)</li>
              <li><strong>Функциональные:</strong> запоминают ваши настройки (выбранный автомобиль, язык, тема)</li>
              <li><strong>Аналитические:</strong> помогают понять, как используется сайт ( Яндекс.Метрика)</li>
            </ul>
            <p className="text-[15px] text-[#1C1C1E] leading-[1.6] mt-2">
              Вы можете управлять cookie через настройки браузера. Отключение cookie может повлиять
              на функциональность сайта.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#1C1C1E] mb-3">6. Хранение данных</h2>
            <p className="text-[15px] text-[#1C1C1E] leading-[1.6]">
              Персональные данные хранятся в локальном хранилище вашего браузера (localStorage).
              Данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#1C1C1E] mb-3">7. Права пользователя</h2>
            <p className="text-[15px] text-[#1C1C1E] leading-[1.6]">
              В соответствии с 152-ФЗ вы имеете право:
            </p>
            <ul className="text-[15px] text-[#1C1C1E] leading-[1.8] list-disc pl-5 mt-2">
              <li>Получить информацию о ваших персональных данных</li>
              <li>Требовать уточнения, блокирования или удаления данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обратиться с жалобой в Роскомнадзор</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#1C1C1E] mb-3">8. Безопасность</h2>
            <p className="text-[15px] text-[#1C1C1E] leading-[1.6]">
              Мы принимаем необходимые технические и организационные меры для защиты персональных данных
              от неправомерного доступа, изменения, раскрытия или уничтожения.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#1C1C1E] mb-3">9. Контакты</h2>
            <p className="text-[15px] text-[#1C1C1E] leading-[1.6]">
              По вопросам обработки персональных данных обращайтесь:
            </p>
            <div className="bg-[#F2F2F7] rounded-[12px] p-4 mt-3">
              <p className="text-[15px] text-[#1C1C1E]">Хатуаев Заур Хасанович</p>
              <p className="text-[14px] text-[#8E8E93]">Телефон: <a href="tel:+79889198444" className="text-[#007AFF]">+7 (988) 919-84-44</a></p>
              <p className="text-[14px] text-[#8E8E93]">Email: <a href="mailto:ai3ayp@yanex.ru" className="text-[#007AFF]">ai3ayp@yanex.ru</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-[#1C1C1E] mb-3">10. Изменения политики</h2>
            <p className="text-[15px] text-[#1C1C1E] leading-[1.6]">
              Мы оставляем за собой право вносить изменения в настоящую Политику. Актуальная версия
              всегда доступна на данной странице. Дата последнего обновления: 14 августа 2026 г.
            </p>
          </section>
        </article>
      </main>
    </div>
  )
}
