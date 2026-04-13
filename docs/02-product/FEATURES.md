# Функционал: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** Product Definition (Stage 2)
**Источники:** [Research Brief](../01-research/RESEARCH-BRIEF.md), [Competitors](../01-research/COMPETITORS.md), [Domain Research](../01-research/DOMAIN-RESEARCH.md), [Target Audience](./TARGET-AUDIENCE.md)

---

## MVP (Must Have) — Запуск v0.9

### F1: SOS AI Craving Coach

| Поле | Описание |
|------|----------|
| **Название** | SOS AI Craving Coach |
| **User Story** | Как пользователь, испытывающий тягу к сахару прямо сейчас, я хочу нажать одну кнопку и получить персонализированный разговор с AI-коучем, чтобы пережить тягу без срыва |
| **Acceptance Criteria** | - [ ] SOS-кнопка доступна с главного экрана в 1 tap<br>- [ ] AI начинает разговор за <3 секунды<br>- [ ] AI спрашивает контекст: что чувствуешь, что хочешь, где находишься<br>- [ ] AI предлагает конкретную альтернативу (еда/действие) на основе контекста<br>- [ ] AI использует эмпатичный, безосуждающий тон<br>- [ ] Разговор длится 2-5 минут (5-15 messages)<br>- [ ] После разговора: "Тяга побеждена?" → да/нет → запись результата<br>- [ ] AI НИКОГДА не стыдит, не предлагает extreme restriction, не даёт медицинских советов<br>- [ ] Disclaimer: "Не является медицинским советом" |
| **Экран** | Floating SOS button → полноэкранный чат |
| **Приоритет** | P0 (блокер запуска) |
| **Сложность** | XL |

### F2: Daily Check-in + Streak

| Поле | Описание |
|------|----------|
| **Название** | Daily Check-in + Streak Counter |
| **User Story** | Как пользователь, я хочу каждое утро отмечать свой статус и видеть растущий streak, чтобы чувствовать прогресс и мотивацию продолжать |
| **Acceptance Criteria** | - [ ] Push-уведомление утром (настраиваемое время)<br>- [ ] Check-in за <30 секунд: "Как вчера?" → Sugar-free / Had some / Full relapse<br>- [ ] Mood check: emoji picker (5 вариантов)<br>- [ ] Streak counter с визуальным прогрессом<br>- [ ] Streak freeze: 1 бесплатный/неделя (Premium: 3/неделя)<br>- [ ] Celebration animations на milestones (Day 1, 3, 7, 14, 30, 60, 90)<br>- [ ] Haptic feedback на completion |
| **Экран** | Home screen (main card) + push notification |
| **Приоритет** | P0 (блокер запуска) |
| **Сложность** | M |

### F3: 90-Day Curriculum (первые 14 дней)

| Поле | Описание |
|------|----------|
| **Название** | 90-Day Sugar Reset Curriculum (Phase 1: Days 1-14) |
| **User Story** | Как пользователь, начинающий путь снижения сахара, я хочу получать ежедневный урок с объяснением, что происходит с моим телом и мозгом, чтобы понимать процесс и не бросить в первую неделю |
| **Acceptance Criteria** | - [ ] 14 уроков (1/день), 5-10 минут чтения каждый<br>- [ ] Day-by-day withdrawal timeline: "Что ожидать сегодня" (из Domain Research, раздел 1.4)<br>- [ ] Каждый урок: нейронаука + практический совет + мини-задание<br>- [ ] Урок подстраивается под стадию (Day 1-3: острая фаза, Day 4-7: адаптация, Day 8-14: улучшение)<br>- [ ] Каждый урок ссылается на научный источник<br>- [ ] Progress bar: "День 5 из 90"<br>- [ ] Unlock logic: новый урок каждый день, предыдущие доступны для повторного чтения |
| **Экран** | Curriculum tab (отдельная вкладка) |
| **Приоритет** | P0 (блокер запуска) |
| **Сложность** | L (контент — основной bottleneck) |

### F4: Onboarding Flow

| Поле | Описание |
|------|----------|
| **Название** | Personalized Onboarding |
| **User Story** | Как новый пользователь, я хочу за 2 минуты рассказать приложению о себе, чтобы получить персонализированный опыт с первого дня |
| **Acceptance Criteria** | - [ ] 5-7 экранов, <2 минуты<br>- [ ] Вопросы: цель (quit / reduce), время пиковой тяги, основные триггеры (стресс / скука / эмоции / social), уровень потребления (low / medium / high), мотивация (здоровье / вес / энергия / challenge)<br>- [ ] Результат: персонализированный plan summary<br>- [ ] Сразу после: "Попробуй SOS прямо сейчас" → demo conversation<br>- [ ] Запрос разрешения на push-уведомления (с объяснением ценности)<br>- [ ] Disclaimer о не-медицинском характере приложения |
| **Экран** | Onboarding flow (post-auth) |
| **Приоритет** | P0 (блокер запуска) |
| **Сложность** | M |

### F5: Auth + User Profile

| Поле | Описание |
|------|----------|
| **Название** | Аутентификация и профиль |
| **User Story** | Как пользователь, я хочу создать аккаунт быстро и безопасно, чтобы мои данные сохранялись и были защищены |
| **Acceptance Criteria** | - [ ] Sign in with Apple / Google (primary)<br>- [ ] Email + password (fallback)<br>- [ ] Profile: имя (опционально), avatar, цель, дата старта<br>- [ ] Supabase Auth integration<br>- [ ] Data encryption at rest<br>- [ ] Privacy policy + terms of service |
| **Экран** | Auth screens + Settings |
| **Приоритет** | P0 (блокер запуска) |
| **Сложность** | M |

### F6: Home Dashboard

| Поле | Описание |
|------|----------|
| **Название** | Home Dashboard |
| **User Story** | Как пользователь, я хочу видеть свой прогресс на одном экране, чтобы быстро понимать, как у меня дела, и получать доступ к ключевым действиям |
| **Acceptance Criteria** | - [ ] Streak counter (основной элемент)<br>- [ ] Cravings defeated counter (за неделю / всего)<br>- [ ] Текущий день curriculum ("Day 5: Что происходит с вашими taste buds")<br>- [ ] SOS button (floating, always visible)<br>- [ ] Мотивационная цитата/факт дня<br>- [ ] Quick stats: дней без сахара, тяг побеждено, деньги сэкономлены |
| **Экран** | Home (main tab) |
| **Приоритет** | P1 (нужно к запуску) |
| **Сложность** | M |

### F7: Craving Logger

| Поле | Описание |
|------|----------|
| **Название** | Craving Logger |
| **User Story** | Как пользователь, я хочу логировать свои тяги (время, интенсивность, триггер, результат), чтобы видеть паттерны и кормить prediction engine данными |
| **Acceptance Criteria** | - [ ] Quick log: 1 tap → intensity (1-5) + trigger (стресс / скука / привычка / social / эмоции) + outcome (resisted / gave in)<br>- [ ] Время автоматически<br>- [ ] Опциональная заметка<br>- [ ] Автоматическое логирование после SOS-сессии<br>- [ ] Weekly summary: "Ваши тяги чаще всего в 15:00, триггер — стресс" |
| **Экран** | Quick action из Home + SOS post-session |
| **Приоритет** | P1 (нужно к запуску) |
| **Сложность** | S |

### F8: Push-уведомления

| Поле | Описание |
|------|----------|
| **Название** | Smart Push Notifications |
| **User Story** | Как пользователь, я хочу получать timely уведомления (утренний check-in, предупреждение о тяге, мотивация), чтобы оставаться engaged и подготовленным |
| **Acceptance Criteria** | - [ ] Morning check-in reminder (настраиваемое время)<br>- [ ] Curriculum reminder ("Урок дня готов")<br>- [ ] Motivational nudge (1/день, рандомное время)<br>- [ ] Streak at risk ("Не забудь отметиться!")<br>- [ ] Настройка частоты и типов в Settings<br>- [ ] Expo Notifications integration |
| **Экран** | System-level + Settings для настройки |
| **Приоритет** | P1 (нужно к запуску) |
| **Сложность** | M |

### F9: Settings & Subscription

| Поле | Описание |
|------|----------|
| **Название** | Настройки и подписка |
| **User Story** | Как пользователь, я хочу управлять настройками приложения и подпиской, чтобы контролировать свой опыт и оплату |
| **Acceptance Criteria** | - [ ] Управление профилем<br>- [ ] Настройка уведомлений<br>- [ ] Управление подпиской (Adapty integration)<br>- [ ] Paywall с описанием тиров<br>- [ ] Restore purchases<br>- [ ] Privacy policy, Terms of Service<br>- [ ] Delete account<br>- [ ] Contact support |
| **Экран** | Settings tab |
| **Приоритет** | P1 (нужно к запуску) |
| **Сложность** | M |

---

## Should Have — v1.0 (Month 3-4)

### F10: "Eat This Instead" Engine

| Поле | Описание |
|------|----------|
| **Название** | "Eat This Instead" — Альтернативы сладкому |
| **User Story** | Как пользователь, который хочет шоколад прямо сейчас, я хочу получить конкретные альтернативы с учётом моих предпочтений и что есть в доступе, чтобы удовлетворить тягу без sugar binge |
| **Acceptance Criteria** | - [ ] Каталог 100+ альтернатив по категориям (шоколад, выпечка, напитки, снэки)<br>- [ ] Фильтры: по вкусу, по доступности, по калорийности<br>- [ ] AI recommendation: "Ты хочешь шоколад → попробуй 85% тёмный шоколад (2 квадратика) или замороженные ягоды с орехами"<br>- [ ] User ratings: "Это сработало" / "Не помогло"<br>- [ ] Интеграция с SOS: AI предлагает альтернативу в разговоре |
| **Экран** | Отдельная секция + интеграция в SOS |
| **Приоритет** | P1 |
| **Сложность** | L |

### F11: Community (Read + Post)

| Поле | Описание |
|------|----------|
| **Название** | Sugar-Free Community |
| **User Story** | Как пользователь, я хочу видеть, что другие люди проходят тот же путь, делиться прогрессом и получать поддержку, чтобы не чувствовать себя одиноким |
| **Acceptance Criteria** | - [ ] Feed: посты пользователей (text + optional image)<br>- [ ] Категории: Victories, Struggles, Tips, Questions<br>- [ ] Like + comment<br>- [ ] Anonymous posting option<br>- [ ] Content moderation (ED detection, spam, negativity)<br>- [ ] Daily community prompt: "Что помогло вам сегодня?" |
| **Экран** | Community tab |
| **Приоритет** | P1 |
| **Сложность** | L |

### F12: Progress Dashboard

| Поле | Описание |
|------|----------|
| **Название** | Детальный дашборд прогресса |
| **User Story** | Как пользователь, я хочу видеть свой прогресс в цифрах и графиках (тяги побеждены, деньги сэкономлены, дни без сахара), чтобы оставаться мотивированным |
| **Acceptance Criteria** | - [ ] Графики: cravings/week trend, success rate trend<br>- [ ] Калькулятор: деньги сэкономлены, калории избежены, сахар не съеден (граммы)<br>- [ ] Health timeline: "После 7 дней — стабилизация глюкозы. После 30 — снижение риска диабета на 35%"<br>- [ ] Shareable cards для social media<br>- [ ] Weekly/monthly summary |
| **Экран** | Progress tab |
| **Приоритет** | P1 |
| **Сложность** | M |

### F13: 90-Day Curriculum (Days 15-90)

| Поле | Описание |
|------|----------|
| **Название** | 90-Day Curriculum — полная программа |
| **User Story** | Как пользователь, прошедший первые 14 дней, я хочу продолжить структурированную программу до 90-го дня, чтобы закрепить новые привычки на уровне нейропластичности |
| **Acceptance Criteria** | - [ ] 76 дополнительных уроков (Day 15-90)<br>- [ ] Фазы: Stabilization (Day 15-30), Deepening (Day 31-60), Mastery (Day 61-90)<br>- [ ] Каждая фаза: новые техники, challenges, knowledge<br>- [ ] Graduation ceremony на Day 90 |
| **Экран** | Curriculum tab |
| **Приоритет** | P1 |
| **Сложность** | XL (контент-production) |

---

## Could Have — v1.5-2.0

### F14: Craving Predictor (ML)

| Название | Описание | Сложность |
|----------|----------|-----------|
| Predictive Trigger Alerts | ML-модель анализирует паттерны (время, day of week, mood, events) и отправляет push за 15-30 мин до прогнозируемой тяги | XL |

### F15: Food Scanner

| Название | Описание | Сложность |
|----------|----------|-----------|
| AI Sugar Scanner | Сканирование barcode или фото продукта → показ added sugar + hidden sugar names + healthier alternatives. Open Food Facts + curated corrections | L |

### F16: Apple Watch App

| Название | Описание | Сложность |
|----------|----------|-----------|
| Apple Watch Companion | Quick SOS на запястье, streak на watch face, haptic nudge при предсказанной тяге | L |

### F17: Accountability Partners

| Название | Описание | Сложность |
|----------|----------|-----------|
| Buddy System | Пригласить друга, видеть прогресс друг друга, взаимная мотивация | M |

### F18: Challenges & Leaderboards

| Название | Описание | Сложность |
|----------|----------|-----------|
| Community Challenges | Еженедельные/месячные challenges (7 дней без газировки, 30 дней no added sugar), leaderboards | M |

### F19: Mood & Energy Tracker

| Название | Описание | Сложность |
|----------|----------|-----------|
| Mood/Energy Journal | Ежедневный трекер настроения и энергии → корреляция с sugar intake → визуализация "без сахара → энергия ↑" | S |

### F20: Health Integrations

| Название | Описание | Сложность |
|----------|----------|-----------|
| Apple Health / Google Fit | Sync данных: вес, blood glucose (если есть CGM), sleep, activity → correlation dashboards | L |

### F21: Doctor-Shareable Reports

| Название | Описание | Сложность |
|----------|----------|-----------|
| Medical Summary Export | PDF-отчёт для врача: sugar intake trend, days sugar-free, cravings trend, compliance с программой | M |

---

## Won't Have (сейчас)

| Фича | Почему НЕ делаем |
|------|-----------------|
| **Calorie counting / macro tracking** | Мы НЕ трекер. Это domain MyFitnessPal. Calorie counting триггерит eating disorders ([Domain Research](../01-research/DOMAIN-RESEARCH.md), раздел 5.1) |
| **Weight loss features** | Использование weight loss как proxy для здоровья увеличивает ED-риск. Фреймим через sugar habits, не вес |
| **Human coaching (live)** | Дорого, не масштабируется в MVP. Добавим как premium tier в v2.0 (Reframe берёт $9.99-$249.99/мес) |
| **Recipe database / meal planning** | Не core loop. Слишком большой scope. "Eat This Instead" — альтернативы, не полный meal plan |
| **Grocery list / shopping features** | Не core differentiator. Можно добавить в v2.0, если scanner будет популярен |
| **Multi-language support** | US English only на MVP. Локализация после product-market fit |
| **B2B admin panel** | Корпоративные wellness-продажи — v2.0. Сначала доказываем B2C product-market fit |
| **GLP-1 / medication tracking** | Регуляторные риски. Требует medical advisory. Возможно в партнёрстве с провайдером |
| **Blood glucose monitoring integration** | Не core loop. CGM data — для v2.0 health integrations |

---

## MVP Scope Summary

### Must Have фичи (запуск v0.9)

| # | Фича | Экран(ы) | Сложность | Приоритет |
|---|------|----------|-----------|-----------|
| F1 | SOS AI Craving Coach | Home (floating) → Chat | XL | P0 |
| F2 | Daily Check-in + Streak | Home (card) + Push | M | P0 |
| F3 | 90-Day Curriculum (Day 1-14) | Curriculum tab | L | P0 |
| F4 | Personalized Onboarding | Onboarding flow | M | P0 |
| F5 | Auth + User Profile | Auth screens + Settings | M | P0 |
| F6 | Home Dashboard | Home tab | M | P1 |
| F7 | Craving Logger | Quick action + Post-SOS | S | P1 |
| F8 | Smart Push Notifications | System + Settings | M | P1 |
| F9 | Settings & Subscription | Settings tab | M | P1 |

### Количественная оценка

| Метрика | Значение |
|---------|----------|
| Уникальных экранов | ~15-18 |
| P0 фич (блокер запуска) | 5 |
| P1 фич (нужно к запуску) | 4 |
| XL фич | 1 (SOS AI) |
| L фич | 1 (Curriculum) |
| M фич | 5 |
| S фич | 1 |
| Основные tabs | 3-4 (Home, Curriculum, Settings + опционально Progress) |
| Ключевые интеграции | Supabase (auth + DB), Claude API (AI), Adapty (подписки), Expo Push |

### Критический путь

```
1. Auth + Profile (M) ─────────────────┐
2. Onboarding (M) ─────────────────────┤
3. Home Dashboard (M) ─────────────────┼──→ [MVP Ready]
4. SOS AI (XL) ← КРИТИЧЕСКИЙ ПУТЬ ────┤
5. Daily Check-in + Streak (M) ────────┤
6. Craving Logger (S) ─────────────────┤
7. Curriculum Day 1-14 (L) ← КОНТЕНТ ──┤
8. Push Notifications (M) ─────────────┤
9. Settings + Subscription (M) ────────┘
```

**Bottlenecks:**
1. **SOS AI (XL)** — core differentiator, требует prompt engineering, safety guardrails, testing
2. **Curriculum content (L)** — 14 уроков нейронауки, нужен content lead + advisory review

---

*Данный документ определяет scope продукта Sugar Quit. Приоритизация основана на [Research Brief](../01-research/RESEARCH-BRIEF.md) — Recommendations для Product Stage.*
