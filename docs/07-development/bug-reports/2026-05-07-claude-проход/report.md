# Bug Report — Claude code audit — 7 мая 2026
Автор: Claude (code audit) + Artur Bardymov
Проект: Sugar Quit
Ветка: feature/artubard (commit 59e3ef8)
Экранов проверено: 35
Всего багов: 1 (0 HIGH, 0 MEDIUM, 1 LOW)

---

## Охват

- Онбординг: Welcome, Quiz ×9, Result, Paywall, Push Permission, Motivational ×2, Auth
- Вкладки: Home, Curriculum (список + урок), Progress (список + milestones), Profile (просмотр + редактирование + настройки)
- Модалки: SOS, Post-SOS, Check-in, Streak Freeze, Milestone, Share Card, Rate App, Forecast Window, Craving Log, Disclaimer, Paywall Contextual

---

## Что проверено и в порядке

- ✅ Все экраны имеют кнопку назад или способ выйти
- ✅ Текст нигде не обрезается в нормальных сценариях
- ✅ Safe area insets обрабатываются везде
- ✅ Иконки используют встроенный компонент (MaterialCommunityIcons) — не пустые квадратики
- ✅ Нет чужого текста от Stitch (Obsidian Arch, MicroMove и т.д.)
- ✅ Нет Lorem ipsum
- ✅ Весь UI на английском, смешений языков нет
- ✅ Layout не вылезает за края экрана

---

## Найденные баги

B01: Поле ввода зависает посередине экрана после скрытия клавиатуры на Android
Где: Craving Log (модалка)
Что вижу: При первом открытии экрана всё нормально. Но если напечатать текст и затем скрыть клавиатуру — поле ввода не возвращается в нижнее положение и зависает посередине экрана. Та же проблема что в SOS чате — системная навигационная панель Android мешает корректно вычислять высоту доступной области.
Как должно быть: После скрытия клавиатуры поле ввода должно возвращаться к нижнему краю экрана — в исходное положение.
Скриншот: screenshots/01-craving-log-keyboard.jpg
Приоритет: LOW
Статус: ❌ Открыт — передать куратору
