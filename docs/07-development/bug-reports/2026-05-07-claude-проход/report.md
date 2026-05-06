# QA Report — Claude code audit
**Дата:** 2026-05-07
**Тестировщик:** Claude (code audit) + Artur Bardymov (ручная проверка)
**Устройство:** Android (Expo Go)
**Метод:** Статический анализ кода, 35 экранов
**Ветка:** `feature/artubard`

---

## Охват

Проверено 35 экранов:
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

B01: Клавиатура перекрывает поле ввода
Где: Craving Log (модалка)
Что вижу: При нажатии на поле «Note» клавиатура появляется поверх него — текст не виден при наборе.
Как должно быть: Поле должно подниматься над клавиатурой, как на iOS.
Скриншот: screenshots/01-craving-log-keyboard.jpg
Приоритет: MEDIUM

---

## Итог

| # | Баг | Приоритет | Статус |
|---|-----|-----------|--------|
| B01 | Craving Log: клавиатура перекрывает поле на Android | MEDIUM | ❌ Открыт |

**Проверено экранов:** 35
**Найдено багов:** 1 (MEDIUM: 1)

> Приложение визуально в хорошем состоянии. Основная проблема — поведение клавиатуры на Android, которое уже отмечено также в отчёте от 2026-04-23 (BUG-04 в SOS-чате).
