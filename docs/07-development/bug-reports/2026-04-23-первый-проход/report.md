# QA Report — первый проход
**Дата:** 2026-05-07
**Тестировщик:** Artur Bardymov
**Устройство:** Android (Expo Go)
**Окружение:** Expo Dev Server на ПК, ветка `feature/artubard`

---

## Охват

Пройдены все экраны приложения:

- Онбординг: Welcome, Quiz (name / goal / triggers / consumption / work-environment / peak-time / motivation / past-attempts / sugar-goal), Result, Paywall, Push Permission
- Главный экран (Home)
- Прогресс (Progress, Milestones)
- Curriculum (список, урок)
- Profile (просмотр, редактирование, настройки)
- Модалки: SOS, Post-SOS, Check-in, Streak Freeze, Milestone, Share Card, Rate App, Forecast Window, Craving Log, Disclaimer, Paywall Contextual

---

## Исправленные баги

### BUG-01 — SOS: поле ввода обрезало 7-ю строку
**Экран:** `app/(modals)/sos.tsx`
**Описание:** При наборе длинного текста поле ввода вырастало до 6,5 строк, но седьмая строка была почти не видна (1 px). В Telegram-стиле должна быть видна ровно половина 7-й строки.
**Причина:** `maxHeight: 22 * 6.5` не учитывал `paddingVertical: 4` на TextInput.
**Исправление:** `maxHeight: 22 * 6.5 + 8` (добавлено 2 × paddingVertical).
**Статус:** ✅ Исправлено

---

### BUG-02 — Home: при сбитом стрике горит 0 точек вместо 1
**Экран:** `app/(tabs)/home.tsx`
**Описание:** Когда стрик сбрасывается, пользователь видит цифру «1» в орбе, но ни одна коралловая точка не горит — визуальное противоречие.
**Причина:** `filledDots = Math.round((streakDays - prevMile) / (nextMile - prevMile) * 14)` при `streakDays = 1` даёт 0.
**Исправление:** `Math.max(1, Math.round(...))` — минимум 1 точка всегда.
**Статус:** ✅ Исправлено

---

### BUG-03 — Home и Progress показывают разные цифры
**Экраны:** `app/(tabs)/home.tsx`, `app/(tabs)/progress/index.tsx`
**Описание:** Home отображал «15 cravings / $24 saved» (хардкод из `MOCK_USER`), Progress — «0 cravings / $15 saved» (из стора). Одни и те же метрики, разные значения.
**Причина:** Home использовал `MOCK_USER.cravingsDefeated` и `MOCK_USER.moneySavedDollars` вместо данных стора.
**Исправление:** Home теперь считает так же как Progress — `cravingsMet` из `sosLog` + `cravings`, `dollarsSaved` из `totalDaysClean * 1.5`.
**Статус:** ✅ Исправлено

---

## Открытые баги

### BUG-04 — SOS: поле ввода не прижато к низу на Android
**Экран:** `app/(modals)/sos.tsx`
**Описание:** На Android поле ввода текста висит в середине экрана, не прижимается к клавиатуре снизу. На iOS ведёт себя корректно.
**Скриншот:** `screenshots/bug-04-sos-android-input.jpg`
**Причина:** Вероятно, различия в поведении `KeyboardAvoidingView` между iOS и Android.
**Статус:** ❌ Не исправлено — передать куратору

---

## Итог

| # | Баг | Статус |
|---|-----|--------|
| BUG-01 | SOS: поле ввода обрезало 7-ю строку | ✅ Исправлено |
| BUG-02 | Home: 0 точек при сбитом стрике | ✅ Исправлено |
| BUG-03 | Home и Progress показывают разные цифры | ✅ Исправлено |
| BUG-04 | SOS: поле ввода не прижато к низу на Android | ❌ Открыт |

**Скриншоты:** 1 (BUG-04)
**Найдено багов:** 4
**Исправлено:** 3
**Передать куратору:** 1 (BUG-04 — Android KeyboardAvoidingView)
