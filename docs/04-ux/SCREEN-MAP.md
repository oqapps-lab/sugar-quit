# Screen Map: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** UX Design (Stage 3)
**Источники:** [Features](../02-product/FEATURES.md), [User Flows](./USER-FLOWS.md), [Practices Brief](../03-practices/PRACTICES-BRIEF.md)

---

## Полная карта экранов

```
Sugar Quit App
│
├── 1. Onboarding Flow (неавторизован)
│   ├── 1.1 Welcome Screen
│   ├── 1.2 Quiz: Goal Selection
│   ├── 1.3 Quiz: Motivation
│   ├── 1.4 Quiz: Sugar Goal (quit / reduce)
│   ├── 1.5 Motivational Screen 1 (social proof)
│   ├── 1.6 Quiz: Peak Craving Time
│   ├── 1.7 Quiz: Triggers
│   ├── 1.8 Quiz: Consumption Level
│   ├── 1.9 Motivational Screen 2 (you're not alone)
│   ├── 1.10 Quiz: Past Attempts
│   ├── 1.11 Quiz: Work Environment
│   ├── 1.12 Quiz: Name (optional)
│   ├── 1.13 Loading Screen ("Создаём план...")
│   ├── 1.14 Result Screen (персональный профиль)
│   ├── 1.15 Paywall
│   ├── 1.16 Auth Screen (Apple / Google / Email)
│   └── 1.17 Push Permission Request
│
├── 2. Main Tabs (авторизован)
│   ├── 2.1 Home Tab
│   │   ├── [состояние: Day 1 / пустое] — welcome tips, SOS подсказка
│   │   ├── [состояние: с данными] — streak, stats, today's lesson
│   │   ├── [состояние: premium] — все stats, predictions
│   │   └── [состояние: check-in не выполнен] — check-in card сверху
│   │
│   ├── 2.2 Curriculum Tab
│   │   ├── 2.2.1 Curriculum Overview — список уроков, progress bar
│   │   ├── 2.2.2 Lesson Screen — контент урока (Day N)
│   │   ├── 2.2.3 Lesson Complete — badge + progress
│   │   ├── [состояние: locked] — 🔒 иконка, "Upgrade" для Day 4+
│   │   └── [состояние: all complete] — "Ожидайте следующий урок завтра"
│   │
│   ├── 2.3 Progress Tab
│   │   ├── 2.3.1 Progress Overview — streak, counters, график
│   │   ├── 2.3.2 Weekly Summary — детали недели
│   │   ├── 2.3.3 Milestones — badges, achievements
│   │   ├── [состояние: <7 дней] — "Накопите данные для аналитики"
│   │   └── [состояние: milestone] — celebration + share card
│   │
│   └── 2.4 Profile Tab
│       ├── 2.4.1 Profile Overview — avatar, имя, дата старта, plan
│       ├── 2.4.2 Settings Screen
│       │   ├── Notification Settings — время, типы
│       │   ├── Subscription Management — текущий план, upgrade/cancel
│       │   ├── Account Settings — email, password, delete
│       │   └── About — privacy, terms, support, version
│       └── 2.4.3 Edit Profile — имя, avatar, цель, мотивация
│
├── 3. Core Features (full-screen)
│   ├── 3.1 SOS AI Chat
│   │   ├── [состояние: active conversation] — chat UI, messages
│   │   ├── [состояние: AI loading] — typing indicator
│   │   ├── [состояние: offline] — fallback tips card
│   │   └── [состояние: free limit reached] — paywall modal
│   │
│   ├── 3.2 Daily Check-in
│   │   ├── 3.2.1 Sugar Status — sugar-free / had some / relapse
│   │   ├── 3.2.2 Mood Check — emoji picker
│   │   └── 3.2.3 Check-in Complete — streak update + celebration
│   │
│   ├── 3.3 Craving Logger
│   │   ├── 3.3.1 Quick Log — intensity + trigger + outcome
│   │   └── 3.3.2 Log Complete — confirmation
│   │
│   └── 3.4 Share Card
│       ├── 3.4.1 Card Preview — milestone / weekly / badge
│       └── 3.4.2 Share Sheet — native iOS share
│
├── 4. Modals / Overlays
│   ├── 4.1 Paywall Modal (повторный показ при premium feature tap)
│   ├── 4.2 Streak Freeze Modal — "Использовать freeze?"
│   ├── 4.3 Milestone Celebration Modal — confetti, stats, share
│   ├── 4.4 Craving Defeated Modal — post-SOS result
│   ├── 4.5 SOS Post-Session Modal — "Тяга побеждена?" да/нет
│   ├── 4.6 Rate App Modal — после milestone (Day 7+)
│   ├── 4.7 Push Re-Permission Banner — "Включите уведомления"
│   └── 4.8 Disclaimer Modal — "Не является медицинским советом"
│
└── 5. System Screens
    ├── 5.1 Splash Screen — логотип Sugar Quit
    ├── 5.2 Loading Screen — skeleton UI
    ├── 5.3 No Internet Screen — офлайн-состояние + cached данные
    ├── 5.4 Force Update Screen — "Обновите приложение"
    └── 5.5 Maintenance Screen — "Технические работы"
```

---

## Детальное описание экранов

### 1. Onboarding Flow

#### 1.1 Welcome Screen
| Поле | Описание |
|------|----------|
| **Назначение** | Зацепить пользователя, объяснить ценность, начать quiz |
| **Откуда** | App Store → First open |
| **Куда** | → Quiz: Goal Selection (1.2) |
| **Ключевые элементы** | Hero image/illustration, headline "Победи тягу к сахару с AI-коучем", subheadline "3 минуты → персональный план", CTA "Начать", прогресс-бар (шаг 1 из ~15) |
| **Фича** | F4 (Onboarding) |

#### 1.2–1.4 Quiz Block 1: Цели (3 экрана)
| Поле | Описание |
|------|----------|
| **Назначение** | Собрать цели пользователя для персонализации |
| **Откуда** | Welcome (1.1) |
| **Куда** | → Motivational Screen 1 (1.5) |
| **Ключевые элементы** | Прогресс-бар, вопрос, визуальные карточки-варианты (не текст), haptic при выборе |
| **Фича** | F4 (Onboarding) |

#### 1.5 Motivational Screen 1
| Поле | Описание |
|------|----------|
| **Назначение** | Social proof, снижение drop-off, баланс ask/give |
| **Откуда** | Quiz Block 1 (1.4) |
| **Куда** | → Quiz Block 2 (1.6) |
| **Ключевые элементы** | "127,000+ людей снизили сахар", иллюстрация, testimonial, CTA "Продолжить" |
| **Фича** | F4 (Onboarding) — motivational screen pattern из Headway |

#### 1.6–1.8 Quiz Block 2: Привычки (3 экрана)
| Поле | Описание |
|------|----------|
| **Назначение** | Собрать данные о привычках для AI-персонализации и prediction |
| **Откуда** | Motivational Screen 1 (1.5) |
| **Куда** | → Motivational Screen 2 (1.9) |
| **Ключевые элементы** | Time picker (пиковая тяга), мульти-выбор триггеров, визуальные карточки потребления |
| **Фича** | F4 (Onboarding) |

#### 1.9 Motivational Screen 2
| Поле | Описание |
|------|----------|
| **Назначение** | Нормализация проблемы, эмпатия |
| **Откуда** | Quiz Block 2 (1.8) |
| **Куда** | → Quiz Block 3 (1.10) |
| **Ключевые элементы** | "75% американцев хотят снизить сахар. Вы не одиноки", статистика, CTA "Продолжить" |
| **Фича** | F4 (Onboarding) |

#### 1.10–1.12 Quiz Block 3: Контекст (3 экрана)
| Поле | Описание |
|------|----------|
| **Назначение** | Финальные данные для персонализации |
| **Откуда** | Motivational Screen 2 (1.9) |
| **Куда** | → Loading Screen (1.13) |
| **Ключевые элементы** | Прошлые попытки, рабочий контекст, опциональное имя |
| **Фича** | F4 (Onboarding) |

#### 1.13 Loading Screen
| Поле | Описание |
|------|----------|
| **Назначение** | Создать perceived value обработки данных (+10-20% конверсия, Noom pattern) |
| **Откуда** | Quiz Block 3 (1.12) |
| **Куда** | → Result Screen (1.14) |
| **Ключевые элементы** | Animated progress: "Анализируем ваши триггеры... Подбираем стратегию... Создаём 90-дневный план..." (5-8 сек) |
| **Фича** | F4 (Onboarding) — Noom loading pattern |

#### 1.14 Result Screen
| Поле | Описание |
|------|----------|
| **Назначение** | Показать ценность ("Aha-moment") ДО paywall — invested buy-in |
| **Откуда** | Loading Screen (1.13) |
| **Куда** | → Paywall (1.15) |
| **Ключевые элементы** | "Ваш профиль: Stress Eater (3pm crash)", персональный план, прогноз первой недели, withdrawal timeline, CTA "Начать программу" |
| **Фича** | F4 (Onboarding) — value before paywall |

#### 1.15 Paywall
| Поле | Описание |
|------|----------|
| **Назначение** | Конвертировать в trial/подписку |
| **Откуда** | Result Screen (1.14) |
| **Куда** | [Start Trial] → Auth (1.16) / [Maybe Later] → Auth (1.16) → Home (free) |
| **Ключевые элементы** | Персонализация (имя, тип тяги), 2 тира (monthly/annual), honest timeline, social proof, benefit-driven CTA, value anchor, анимация. Кнопка "Maybe Later" (мелкий текст) |
| **Фича** | F9 (Subscription) — hard paywall после quiz, 7-day trial |

#### 1.16 Auth Screen
| Поле | Описание |
|------|----------|
| **Назначение** | Быстрая регистрация после решения о подписке |
| **Откуда** | Paywall (1.15) |
| **Куда** | → Push Permission (1.17) |
| **Ключевые элементы** | Sign in with Apple (primary), Sign in with Google, Email + password (fallback), Privacy/Terms links |
| **Фича** | F5 (Auth) — auth ПОСЛЕ value demonstration |

#### 1.17 Push Permission Request
| Поле | Описание |
|------|----------|
| **Назначение** | Получить push permission с высокой конверсией через контекст |
| **Откуда** | Auth (1.16) |
| **Куда** | → Home (2.1) |
| **Ключевые элементы** | "Включить предсказания тяги?", объяснение ценности: "Мы предупредим за 15 мин до прогнозируемой тяги", CTA "Включить", "Позже" (не "Отказать") |
| **Фича** | F8 (Push) — контекстный запрос, не blind ask |

---

### 2. Main Tabs

#### 2.1 Home Tab
| Поле | Описание |
|------|----------|
| **Назначение** | Центральный хаб: прогресс, быстрые действия, мотивация |
| **Откуда** | Tab bar (всегда доступен), push notification, app open |
| **Куда** | → SOS Chat (3.1), → Curriculum Lesson (2.2.2), → Check-in (3.2), → Progress (2.3), → Craving Log (3.3) |
| **Ключевые элементы** | Streak counter (hero), SOS floating button, daily check-in card (если не выполнен), today's lesson card, cravings defeated counter, motivational quote, quick stats (дни, деньги, граммы) |
| **Фича** | F6 (Home Dashboard) |

#### 2.2 Curriculum Tab
| Поле | Описание |
|------|----------|
| **Назначение** | 90-дневная структурированная программа |
| **Откуда** | Tab bar, Home (tap lesson card) |
| **Куда** | → Lesson Screen (2.2.2) |
| **Ключевые элементы** | Progress bar (Day N из 90), список уроков (пройденные ✅, текущий, locked 🔒), фазы (Day 1-3 Acute, Day 4-7 Adaptation, Day 8-14 Improvement) |
| **Фича** | F3 (Curriculum) — Day 1-14 в MVP, Day 15-90 в v1.0 |

#### 2.2.2 Lesson Screen
| Поле | Описание |
|------|----------|
| **Назначение** | Ежедневный урок: нейронаука + совет + задание |
| **Откуда** | Curriculum Overview (2.2.1), Home (2.1) |
| **Куда** | → Lesson Complete (2.2.3) → Curriculum Overview |
| **Ключевые элементы** | Заголовок ("Day 8: Ваши taste buds"), прогресс чтения, контент (markdown-like), научный источник, мини-задание, кнопка "Завершить" |
| **Фича** | F3 (Curriculum) |

#### 2.3 Progress Tab
| Поле | Описание |
|------|----------|
| **Назначение** | Визуализация прогресса, мотивация через данные |
| **Откуда** | Tab bar, Home (tap stats) |
| **Куда** | → Weekly Summary (2.3.2), → Milestones (2.3.3), → Share (3.4) |
| **Ключевые элементы** | Streak (hero), cravings chart (по неделям), success rate trend, деньги сэкономлены, калории, граммы сахара, health timeline ("После 7 дней — стабилизация глюкозы") |
| **Фича** | F12 (Progress Dashboard — basic в MVP, детальный в v1.0) |

#### 2.4 Profile Tab
| Поле | Описание |
|------|----------|
| **Назначение** | Управление аккаунтом, настройками, подпиской |
| **Откуда** | Tab bar |
| **Куда** | → Settings (2.4.2), → Edit Profile (2.4.3), → Paywall (4.1) |
| **Ключевые элементы** | Avatar, имя, дата старта, текущий план (Free/Premium), quick stats, кнопки: Settings, Edit Profile, Subscription, Support |
| **Фича** | F5 (Profile), F9 (Settings) |

#### 2.4.2 Settings Screen
| Поле | Описание |
|------|----------|
| **Назначение** | Управление настройками приложения |
| **Откуда** | Profile (2.4.1) |
| **Куда** | → Notification Settings, → Subscription, → About |
| **Ключевые элементы** | Секции: Уведомления (время check-in, типы), Подписка (текущий план, Upgrade/Cancel, Restore), Аккаунт (email, пароль, Delete Account), О приложении (Privacy, Terms, Support, Version) |
| **Фича** | F9 (Settings) |

---

### 3. Core Feature Screens

#### 3.1 SOS AI Chat
| Поле | Описание |
|------|----------|
| **Назначение** | Core value prop — AI-разговор в момент тяги |
| **Откуда** | Home SOS button (2.1), любой экран (floating button) |
| **Куда** | → Post-SOS Modal (4.5) → Craving Auto-Log → Home |
| **Ключевые элементы** | Chat UI (сообщения пользователя + AI), typing indicator, input field, "Завершить" кнопка сверху, disclaimer ("Не медицинский совет"), история предыдущих разговоров |
| **Фича** | F1 (SOS AI Coach) — P0, core differentiator |

#### 3.2 Daily Check-in (3 шага)
| Поле | Описание |
|------|----------|
| **Назначение** | Быстрая ежедневная отметка (<30 сек) |
| **Откуда** | Home check-in card (2.1), push notification |
| **Куда** | → Check-in Complete (3.2.3) → Home (обновлённый) |
| **Ключевые элементы** | Шаг 1: Sugar status (3 варианта), Шаг 2: Mood (5 emoji), Шаг 3: Done + streak update |
| **Фича** | F2 (Daily Check-in) |

#### 3.3 Craving Logger
| Поле | Описание |
|------|----------|
| **Назначение** | Быстрое логирование тяги для аналитики и prediction engine |
| **Откуда** | Home (quick action), Post-SOS (auto), manual |
| **Куда** | → Log Complete (3.3.2) → Home |
| **Ключевые элементы** | Intensity (1-5 slider), Trigger (pre-filled мульти-выбор), Outcome (resisted/gave in), Note (опционально), время (auto) |
| **Фича** | F7 (Craving Logger) |

---

### 4. Modals / Overlays

#### 4.1 Paywall Modal (повторный)
| Поле | Описание |
|------|----------|
| **Назначение** | Конвертировать free-пользователя при попытке premium-фичи |
| **Откуда** | SOS (лимит), Curriculum (Day 4+), Community (post) |
| **Куда** | → Purchase → Home (premium) / Dismiss → предыдущий экран |
| **Ключевые элементы** | Контекстный заголовок ("Для unlimited SOS — upgrade"), сокращённый paywall (без quiz результатов), 2 тира, CTA |
| **Фича** | F9 (Subscription) |

#### 4.2 Streak Freeze Modal
| Поле | Описание |
|------|----------|
| **Назначение** | Предложить использовать Streak Freeze при пропуске check-in |
| **Откуда** | Home (при открытии, если check-in пропущен) |
| **Куда** | → Home (streak preserved) / Home (streak reset) |
| **Ключевые элементы** | "Вы пропустили check-in вчера", "Использовать Streak Freeze? (осталось: 1/нед)", кнопки "Использовать" / "Нет, сбросить streak" |
| **Фича** | F2 (Streak Freeze) |

#### 4.3 Milestone Celebration Modal
| Поле | Описание |
|------|----------|
| **Назначение** | Празднование достижения, мотивация, шеринг |
| **Откуда** | Auto-trigger при достижении milestone (Day 1, 3, 7, 14, 30, 60, 90) |
| **Куда** | → Share (3.4) / Dismiss → Home |
| **Ключевые элементы** | Confetti animation, badge, stats за период, "Поделиться" CTA, "Отлично!" dismiss |
| **Фича** | F2 (Celebration) |

#### 4.5 SOS Post-Session Modal
| Поле | Описание |
|------|----------|
| **Назначение** | Зафиксировать результат SOS-сессии |
| **Откуда** | SOS Chat (3.1) — после завершения разговора |
| **Куда** | → Craving Auto-Log → Celebration (если побеждена) → Home |
| **Ключевые элементы** | "Тяга побеждена?", 3 варианта: "Да! ✅" / "Стало легче 😌" / "Сорвалась 😔", все варианты → безосуждающий ответ |
| **Фича** | F1 (SOS post-session), F7 (auto-log) |

---

### 5. System Screens

#### 5.1 Splash Screen
| Поле | Описание |
|------|----------|
| **Назначение** | Branding при загрузке |
| **Откуда** | App launch |
| **Куда** | → Welcome (1.1, new user) / Home (2.1, returning user) |
| **Ключевые элементы** | Логотип Sugar Quit, brand color, минималистично |

#### 5.3 No Internet Screen
| Поле | Описание |
|------|----------|
| **Назначение** | Информировать об отсутствии сети, показать cached данные |
| **Откуда** | Любой экран при потере соединения |
| **Куда** | → Предыдущий экран при восстановлении |
| **Ключевые элементы** | Banner сверху: "Нет интернета. Некоторые функции недоступны", cached streak/stats видны, SOS недоступен (но offline tips показаны) |

#### 5.4 Force Update Screen
| Поле | Описание |
|------|----------|
| **Назначение** | Принудить обновление при критических изменениях |
| **Откуда** | App launch (version check) |
| **Куда** | → App Store |
| **Ключевые элементы** | "Доступно важное обновление", описание изменений, CTA "Обновить" → App Store |

---

## Итоговый список экранов

| # | Экран | Тип | Фича | Приоритет |
|---|-------|-----|------|-----------|
| 1.1 | Welcome | Onboarding | F4 | P0 |
| 1.2-1.4 | Quiz Block 1 (3 экрана) | Onboarding | F4 | P0 |
| 1.5 | Motivational 1 | Onboarding | F4 | P0 |
| 1.6-1.8 | Quiz Block 2 (3 экрана) | Onboarding | F4 | P0 |
| 1.9 | Motivational 2 | Onboarding | F4 | P0 |
| 1.10-1.12 | Quiz Block 3 (3 экрана) | Onboarding | F4 | P0 |
| 1.13 | Loading | Onboarding | F4 | P0 |
| 1.14 | Result | Onboarding | F4 | P0 |
| 1.15 | Paywall | Onboarding | F9 | P0 |
| 1.16 | Auth | Onboarding | F5 | P0 |
| 1.17 | Push Permission | Onboarding | F8 | P1 |
| 2.1 | Home | Main Tab | F6 | P1 |
| 2.2.1 | Curriculum Overview | Main Tab | F3 | P0 |
| 2.2.2 | Lesson | Main Tab | F3 | P0 |
| 2.2.3 | Lesson Complete | Main Tab | F3 | P0 |
| 2.3.1 | Progress Overview | Main Tab | F12 | P1 |
| 2.3.2 | Weekly Summary | Main Tab | F12 | P1 |
| 2.3.3 | Milestones | Main Tab | F12 | P1 |
| 2.4.1 | Profile | Main Tab | F5 | P1 |
| 2.4.2 | Settings | Main Tab | F9 | P1 |
| 2.4.3 | Edit Profile | Main Tab | F5 | P1 |
| 3.1 | SOS AI Chat | Full-screen | F1 | P0 |
| 3.2.1-3 | Daily Check-in (3 шага) | Full-screen | F2 | P0 |
| 3.3.1-2 | Craving Logger (2 шага) | Full-screen | F7 | P1 |
| 3.4.1-2 | Share Card + Sheet | Full-screen | F12 | P1 |
| 4.1 | Paywall Modal | Modal | F9 | P1 |
| 4.2 | Streak Freeze Modal | Modal | F2 | P0 |
| 4.3 | Milestone Celebration | Modal | F2 | P1 |
| 4.5 | SOS Post-Session | Modal | F1 | P0 |
| 4.6 | Rate App | Modal | — | P1 |
| 4.7 | Push Re-Permission | Banner | F8 | P1 |
| 4.8 | Disclaimer | Modal | F1 | P0 |
| 5.1 | Splash | System | — | P0 |
| 5.2 | Loading (generic) | System | — | P1 |
| 5.3 | No Internet | System | — | P1 |
| 5.4 | Force Update | System | — | P1 |
| 5.5 | Maintenance | System | — | P2 |

**Итого уникальных экранов:** ~35 (включая состояния quiz-экранов как отдельные)
**Итого экранов MVP (P0+P1):** ~32
**Основные tabs:** 4 (Home, Curriculum, Progress, Profile)

---

*Данный документ определяет полную карту экранов Sugar Quit. Каждый экран привязан к фиче из [Features](../02-product/FEATURES.md) и отражён в [User Flows](./USER-FLOWS.md).*
