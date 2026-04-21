# UX-Спецификация: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** UX Design (Stage 3)
**Синтез:** [User Flows](./USER-FLOWS.md), [Screen Map](./SCREEN-MAP.md), [Wireframes](./WIREFRAMES.md), [Funnel](./FUNNEL.md)
**Данные:** [Features](../02-product/FEATURES.md), [Target Audience](../02-product/TARGET-AUDIENCE.md), [Practices Brief](../03-practices/PRACTICES-BRIEF.md)

---

## 1. Общие принципы UX

### Принцип 1: "SOS за 1 tap"
SOS AI Coach — core value prop и aha-moment. SOS-кнопка доступна с любого экрана за 1 нажатие. Ни один UI-элемент не должен мешать доступу к SOS. Обоснование: в момент тяги у пользователя 15-20 минут (Domain Research) — каждая лишняя секунда = шанс срыва.

### Принцип 2: "Эмпатия, не осуждение"
Тон всего интерфейса — supportive подруга, не строгий диетолог. Никогда: "вы сорвались", "снова неудача". Всегда: "это часть процесса", "каждый раз — информация". Обоснование: триггер удаления #1 у Sarah — guilty/shaming тон (Target Audience). Binge-restrict-shame цикл у Chloe усиливается осуждением.

### Принцип 3: "Прогресс виден всегда"
Streak, cravings defeated, дни в программе — видны на каждом ключевом экране. Визуальный прогресс — главный retention driver для всех 3 персон. Обоснование: streaks → 3.6x retention (StriveCloud), milestone badges → +30% completion (Orizon), visual progress мотивирует (Technology Rivers).

### Принцип 4: "Персонализация с первой секунды"
Quiz-based онбординг кормит AI данными → SOS разговоры персонализированы, curriculum адаптирован, push-уведомления тайминговые. "Просто выпей воды" = триггер удаления. "Ты стресс-edater, в 3pm попробуй орехи + тёмный шоколад" = aha-moment. Обоснование: персонализация → +82% retention (UserGuiding), +35% completion (UserGuiding).

### Принцип 5: "Быстрые действия, глубокий контент"
Check-in: <30 сек. SOS: 2-5 мин. Curriculum: 5-10 мин. Пользователь сам выбирает глубину engagement. Минимальная ежедневная сессия (check-in) настолько быстрая, что нет причины не сделать. Обоснование: сессии >5 мин → 35% D30 retention (Lucid), но daily check-in должен быть мгновенным для привычки.

---

## 2. Навигация

### 2.1 Тип: Bottom Tab Bar + Floating SOS

**Структура:**

```
┌─────────────────────────────────┐
│                                 │
│         [Экран контента]        │
│                                 │
│              ┌─────┐            │
│              │ SOS │            │  ← Floating button
│              │  !  │            │     (над tab bar)
│              └─────┘            │
├─────────────────────────────────┤
│  🏠     📚      📊     👤     │  ← Tab bar
│ Home   Курс   Прогресс Профиль │
└─────────────────────────────────┘
```

### 2.2 Обоснование выбора

| Вариант | Плюсы | Минусы | Решение |
|---------|-------|--------|---------|
| **Bottom Tabs** (выбран) | Стандарт iOS, thumb-friendly, 1-tap навигация, visible tab indicators | Ограничен 5 tabs (у нас 4) | **Выбран** — лучший для daily-use health app |
| Drawer | Больше пунктов меню | Hidden navigation → drop-off, нестандартен для iOS | Нет |
| Top Tabs | Стандарт Material Design | Не iOS-native, thumb далеко | Нет |

### 2.3 Tab-структура

| Tab | Иконка | Экран | Фичи | Badge |
|-----|--------|-------|-------|-------|
| **Home** | 🏠 | Home Dashboard | F6, F2, F7 | Красная точка если check-in не выполнен |
| **Курс** | 📚 | Curriculum Overview | F3 | Красная точка если новый урок доступен |
| **Прогресс** | 📊 | Progress Overview | F12 | — |
| **Профиль** | 👤 | Profile + Settings | F5, F9 | — |

### 2.4 SOS Floating Button

- **Позиция:** Center-bottom, над tab bar (z-index: top)
- **Визуал:** Яркий accent color (красный/оранжевый), круглый, тень
- **Размер:** 56-64dp (достаточно для thumb-tap)
- **Поведение:** Всегда видна на Main Tabs screens. Скрыта на: Onboarding, Auth, SOS Chat (уже открыт), Modals
- **Анимация:** Пульсирующая (subtle, не раздражающая) при первом показе. Haptic feedback при tap
- **Accessibility:** Label: "SOS — помощь с тягой к сахару"

### 2.5 Navigation Stack

```
Onboarding: Linear stack (no back до Welcome)
    Welcome → Quiz (15 screens) → Loading → Result → Paywall → Auth → Push → Home

Main App: Tab-based + modal stacks
    Tab: Home → (push) SOS Chat (modal, fullscreen)
    Tab: Home → (push) Daily Check-in (modal, fullscreen)
    Tab: Home → (push) Craving Logger (modal)
    Tab: Curriculum → (push) Lesson (push)
    Tab: Progress → (push) Weekly Detail / Milestones
    Tab: Profile → (push) Settings → (push) Sub-settings
    
Modals: Presented over current context
    Paywall, Streak Freeze, Milestone, Post-SOS, Rate App
```

---

## 3. Состояния экранов

| Экран | Loading | Empty | Data | Error | Premium | Offline |
|-------|---------|-------|------|-------|---------|---------|
| **Home** | Skeleton cards | Day 1 welcome tips | Streak, stats, lesson | Retry banner | All stats + predictions badge | Cached streak/stats, SOS disabled |
| **SOS Chat** | Typing indicator | First message from AI | Chat conversation | Fallback tips card | Unlimited | Offline tips list |
| **Curriculum Overview** | Skeleton list | — (always has Day 1) | Lesson list with progress | Retry | All lessons unlocked | Cached lessons |
| **Lesson** | Content skeleton | — | Full lesson content | Retry | — | Cached if downloaded |
| **Progress** | Skeleton charts | "Накопите данные" (Day 1-6) | Charts, stats, badges | Retry | All analytics | Cached data |
| **Weekly Summary** | Skeleton | "Нет данных за неделю" | Full weekly report | Retry | Detailed analytics | Cached |
| **Profile** | Skeleton | — (always has data from quiz) | Full profile | Retry | Premium badge | Cached |
| **Settings** | Skeleton | — | All settings | Retry | Subscription info | Limited (no sync) |
| **Daily Check-in** | — | — | Questions + streak | Save locally | Streak Freeze ×3 | Save locally |
| **Craving Logger** | — | — | Quick log form | Save locally | Full analytics | Save locally |
| **Paywall** | Adapty loading | — | Full paywall | Fallback static | — (не показывается) | "Нет сети" |
| **Share Card** | Generating card | — | Preview | "Не удалось" | Premium stats | "Сохранено в галерею" |

### Правила состояний

1. **Loading:** Skeleton UI, не spinner. Skeleton показывает layout будущего контента — снижает perceived wait time
2. **Empty:** Всегда с actionable hint ("Что делать дальше"). Никогда пустой экран без объяснения
3. **Error:** Retry button + объяснение простым языком. Никогда: "Error 500" или технический жаргон
4. **Offline:** Показывать cached данные + banner "Офлайн". SOS → fallback tips. Check-in/Log → save locally, sync later
5. **Premium gate:** 🔒 иконка + "Upgrade" текст. Tap → Paywall Modal. Никогда: скрывать premium-фичи от free-пользователей (FOMO-стратегия)

---

## 4. Микро-интеракции

### 4.1 Анимации

| Интеракция | Тип анимации | Длительность | Где |
|-----------|-------------|-------------|-----|
| Streak increment | Counter roll-up + fire emoji burst | 600ms | Home, Check-in Complete |
| Milestone celebration | Confetti particles + badge reveal | 2000ms | Milestone Modal |
| SOS button tap | Scale down (0.9) → spring back | 200ms | Home, любой tab |
| Check-in card submit | Slide up + fade | 300ms | Home check-in card |
| Quiz answer select | Scale (1.05) + border highlight + haptic | 150ms | Onboarding quiz |
| Loading screen progress | Sequential text reveal + bar fill | 5000-8000ms | Onboarding Loading |
| Lesson complete | Checkmark draw + progress bar fill | 400ms | Curriculum Lesson |
| Chat message appear | Fade in + slide up (user) / typing dots → reveal (AI) | 200ms / streaming | SOS Chat |
| Tab switch | Cross-fade | 200ms | Tab bar |
| Modal present | Slide up from bottom + backdrop fade | 300ms | All modals |
| Paywall tier select | Border highlight + checkmark | 150ms | Paywall |
| Share card generate | Skeleton → reveal | 500ms | Share Card |

### 4.2 Haptic Feedback

| Действие | Тип haptic | iOS API |
|----------|-----------|---------|
| SOS button tap | Heavy impact | Haptics.impactAsync(Heavy) |
| Quiz answer select | Light impact | Haptics.impactAsync(Light) |
| Check-in submit | Medium impact | Haptics.impactAsync(Medium) |
| Streak increment | Success notification | Haptics.notificationAsync(Success) |
| Milestone celebration | Success notification | Haptics.notificationAsync(Success) |
| Error / limit reached | Error notification | Haptics.notificationAsync(Error) |
| Tab switch | Selection | Haptics.selectionAsync() |
| Paywall tier select | Light impact | Haptics.impactAsync(Light) |

### 4.3 Transitions

| Переход | Тип | Жест |
|---------|-----|------|
| Tab → Tab | Cross-fade (no slide) | Tap tab |
| Screen → Push screen | Slide from right | Swipe back to dismiss |
| Screen → Modal (full) | Slide from bottom | Swipe down to dismiss |
| Screen → Modal (half) | Slide from bottom, stops at 50% | Swipe down to dismiss |
| Onboarding → next step | Slide from right | — (no back gesture for progress) |
| Home → SOS Chat | Scale up from SOS button position | — |

---

## 5. Accessibility

### 5.1 Минимальные требования

| Требование | Стандарт | Реализация |
|-----------|---------|-----------|
| **Цветовой контраст** | WCAG 2.1 AA (4.5:1 текст, 3:1 UI) | Проверить все цвета через contrast checker |
| **Минимальный размер touch target** | 44×44 pt (Apple HIG) | Все кнопки, links, interactive elements |
| **Размер текста** | Поддержка Dynamic Type (iOS) | Body: 17pt default, min 14pt, max 28pt |
| **VoiceOver** | Все interactive elements labeled | accessibilityLabel на каждом компоненте |
| **Motion** | Respect "Reduce Motion" | Отключить confetti, parallax, pulse. Сохранить функциональные анимации |
| **Color-blind** | Не полагаться только на цвет | Иконки + текст + цвет для всех состояний (streak ✅, not just green) |

### 5.2 Специфичные для Sugar Quit

| Элемент | A11y реализация |
|---------|-----------------|
| SOS button | accessibilityLabel: "SOS — получить помощь с тягой к сахару" accessibilityHint: "Открывает AI-чат для помощи в момент тяги" |
| Streak counter | accessibilityLabel: "Streak: [N] дней без сахара" |
| Check-in options | accessibilityLabel для каждого: "Sugar-free — день без сахара", "Had some — немного сладкого", "Relapse — срыв" |
| Mood emoji | accessibilityLabel: "Отличное настроение", "Хорошее", "Нормальное", "Грустное", "Раздражённое" |
| Charts (Progress) | accessibilityLabel с текстовым описанием тренда: "Тяги за неделю: понедельник 3, вторник 2..." |
| Quiz cards | accessibilityRole: "radio" для single-select, "checkbox" для multi-select |
| Paywall tiers | accessibilityLabel: "Годовой план, 79 долларов 99 центов в год, 6 долларов 67 центов в месяц, скидка 44 процента, рекомендуемый" |

### 5.3 Шрифты

| Уровень | Размер (default) | Вес | Использование |
|---------|-----------------|-----|---------------|
| H1 (Hero) | 32pt | Bold | Streak number, milestone number |
| H2 (Section) | 24pt | Semibold | Экранные заголовки |
| H3 (Card title) | 20pt | Semibold | Заголовки карточек |
| Body | 17pt | Regular | Основной текст, curriculum content |
| Body small | 15pt | Regular | Secondary текст, descriptions |
| Caption | 13pt | Regular | Timestamps, hints, disclaimers |
| Button | 17pt | Semibold | CTA кнопки |
| Tab label | 10pt | Medium | Tab bar labels |

---

## 6. Финальная таблица экранов

| # | Экран | Тип | Фича | Приоритет | Wireframe | Flow |
|---|-------|-----|------|-----------|-----------|------|
| 1.1 | Welcome | Onboarding | F4 | P0 | WF-1 | Flow 1 |
| 1.2 | Quiz: Goal Selection | Onboarding | F4 | P0 | — | Flow 1 |
| 1.3 | Quiz: Motivation | Onboarding | F4 | P0 | — | Flow 1 |
| 1.4 | Quiz: Sugar Goal | Onboarding | F4 | P0 | — | Flow 1 |
| 1.5 | Motivational Screen 1 | Onboarding | F4 | P0 | — | Flow 1 |
| 1.6 | Quiz: Peak Craving Time | Onboarding | F4 | P0 | — | Flow 1 |
| 1.7 | Quiz: Triggers | Onboarding | F4 | P0 | WF-2 | Flow 1 |
| 1.8 | Quiz: Consumption Level | Onboarding | F4 | P0 | — | Flow 1 |
| 1.9 | Motivational Screen 2 | Onboarding | F4 | P0 | — | Flow 1 |
| 1.10 | Quiz: Past Attempts | Onboarding | F4 | P0 | — | Flow 1 |
| 1.11 | Quiz: Work Environment | Onboarding | F4 | P0 | — | Flow 1 |
| 1.12 | Quiz: Name | Onboarding | F4 | P0 | — | Flow 1 |
| 1.13 | Loading Screen | Onboarding | F4 | P0 | — | Flow 1 |
| 1.14 | Result Screen | Onboarding | F4 | P0 | — | Flow 1 |
| 1.15 | Paywall | Onboarding | F9 | P0 | WF-3 | Flow 1, 4 |
| 1.16 | Auth Screen | Onboarding | F5 | P0 | — | Flow 1 |
| 1.17 | Push Permission | Onboarding | F8 | P1 | — | Flow 1 |
| 2.1 | Home (с данными) | Main Tab | F6 | P1 | WF-4 | Flow 3 |
| 2.1e | Home (пустое, Day 1) | Main Tab | F6 | P1 | WF-5 | Flow 3 |
| 2.2.1 | Curriculum Overview | Main Tab | F3 | P0 | — | Flow 3 |
| 2.2.2 | Lesson Screen | Main Tab | F3 | P0 | WF-8 | Flow 3 |
| 2.2.3 | Lesson Complete | Main Tab | F3 | P0 | — | Flow 3 |
| 2.3.1 | Progress Overview | Main Tab | F12 | P1 | WF-9 | Flow 5 |
| 2.3.2 | Weekly Summary | Main Tab | F12 | P1 | — | Flow 5 |
| 2.3.3 | Milestones | Main Tab | F12 | P1 | — | Flow 5 |
| 2.4.1 | Profile | Main Tab | F5 | P1 | WF-10 | — |
| 2.4.2 | Settings | Main Tab | F9 | P1 | WF-11 | — |
| 2.4.3 | Edit Profile | Main Tab | F5 | P1 | — | — |
| 3.1 | SOS AI Chat | Full-screen | F1 | P0 | WF-6 | Flow 2 |
| 3.2 | Daily Check-in (3 шага) | Full-screen | F2 | P0 | WF-12 | Flow 3 |
| 3.3 | Craving Logger | Full-screen | F7 | P1 | — | Flow 2 |
| 3.4 | Share Card + Sheet | Full-screen | F12 | P1 | — | Flow 5 |
| 4.1 | Paywall Modal (повторный) | Modal | F9 | P1 | WF-14 | Flow 4 |
| 4.2 | Streak Freeze Modal | Modal | F2 | P0 | — | Flow 3 |
| 4.3 | Milestone Celebration | Modal | F2 | P1 | WF-13 | Flow 5 |
| 4.5 | SOS Post-Session | Modal | F1 | P0 | WF-7 | Flow 2 |
| 4.6 | Rate App Modal | Modal | — | P1 | — | — |
| 4.7 | Push Re-Permission | Banner | F8 | P1 | — | — |
| 4.8 | Disclaimer | Modal | F1 | P0 | — | Flow 2 |
| 5.1 | Splash Screen | System | — | P0 | — | — |
| 5.2 | Loading (generic) | System | — | P1 | — | — |
| 5.3 | No Internet | System | — | P1 | WF-15 | — |
| 5.4 | Force Update | System | — | P1 | — | — |
| 5.5 | Maintenance | System | — | P2 | — | — |

**Итого:**
- Уникальных экранов: **42** (включая quiz-экраны и состояния)
- Wireframes созданы: **15**
- P0 экранов: **22**
- P1 экранов: **18**
- P2 экранов: **2**

---

## 7. Передача дизайнеру: Чеклист

### 7.1 Что передаётся

- [ ] USER-FLOWS.md — 5 пользовательских сценариев с happy path, error states, edge cases
- [ ] SCREEN-MAP.md — полная карта экранов с навигацией и описаниями
- [ ] WIREFRAMES.md — 15 ASCII wireframes с описанием данных и действий
- [ ] FUNNEL.md — воронка конверсии с метриками и retention loops
- [ ] UX-SPEC.md (этот документ) — принципы, навигация, состояния, анимации, accessibility

### 7.2 Что нужно от дизайнера (следующий шаг)

- [ ] Design System: цвета, типографика, иконки, компоненты
- [ ] High-fidelity mockups для всех 42 экранов
- [ ] Prototype (Figma) для 5 ключевых flows
- [ ] Анимации: SOS button pulse, streak increment, milestone confetti
- [ ] Dark mode (если планируется)
- [ ] App Store скриншоты (6-8 benefit-driven)
- [ ] App icon варианты для A/B теста

### 7.3 Приоритет дизайна (в каком порядке)

1. **SOS Flow** — Welcome → SOS Chat → Post-Session (core aha-moment)
2. **Onboarding** — Welcome → Quiz (15 screens) → Loading → Result → Paywall
3. **Home Dashboard** — оба состояния (Day 1, Day 8+)
4. **Daily Check-in** — 3 шага + celebration
5. **Curriculum** — Overview + Lesson screen
6. **Progress + Profile + Settings** — менее критичны, но нужны для MVP
7. **Modals** — Paywall repeat, Streak Freeze, Milestone
8. **System screens** — No Internet, Force Update

---

*Данный документ является финальной UX-спецификацией Sugar Quit, синтезирующей все предыдущие UX-документы. Готов для передачи дизайнеру.*
