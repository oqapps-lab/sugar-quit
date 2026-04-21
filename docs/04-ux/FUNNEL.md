# Воронка пользователя: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** UX Design (Stage 3)
**Источники:** [Practices Brief](../03-practices/PRACTICES-BRIEF.md), [Monetization](../02-product/MONETIZATION.md), [Product Vision](../02-product/PRODUCT-VISION.md), [Paywall Research](../03-practices/PAYWALL-RESEARCH.md), [Onboarding Research](../03-practices/ONBOARDING-RESEARCH.md)

---

## 1. Полная воронка конверсии

```
App Store Impressions
    ↓ [CVR: 35%] ───────────────── Benchmark H&F: 30.8% (Adapty)
Install
    ↓ [Open rate: 85%] ─────────── Типичный: 80-90%
First Open
    ↓ [Quiz start: 90%] ────────── Welcome → первый tap
Quiz Started
    ↓ [Completion: 70%] ────────── С progress bar –40% drop-off (Retention Blog)
Onboarding Complete (Result Screen)
    ↓ [Paywall shown: 100%] ────── Hard paywall после quiz
Paywall View
    ↓ [Trial start: 10%] ──────── H&F top 10%: 12.1% (RevenueCat 2025)
Trial Started (Day 0)
    ↓ [Trial-to-paid: 40%] ────── H&F медиана: 35-39.9% (Adapty 2026)
Paid Subscriber
    ↓ [D30 retention: 40%] ────── Product Vision target; benchmark: 27.2%
Active User (Month 2)
    ↓ [D90 retention: 20%] ────── 90-day curriculum completion
Active User (Month 4+)
    ↓ [12-month retention: 30%] ── First renewal retention: 30.3% (RevenueCat)
Long-term Subscriber
```

---

## 2. Детализация каждого шага

### 2.1 App Store Impressions → Install

| Метрика | Значение |
|---------|----------|
| **Целевой CVR** | 35% (benchmark H&F: 30.8%, Adapty) |
| **Что делаем** | ASO: Title "Sugar Quit: AI Craving Coach", 6-8 benefit-driven скриншотов (+20-35% конверсия, Wezom), App Preview видео (+10-30%, Business of Apps), рейтинг 4.5+ |
| **Точки потери** | Плохие скриншоты, нет видео (62% без видео), рейтинг <4.0 (–15-20% конверсия), слабый subtitle |
| **Re-engagement** | ASA (Apple Search Ads) retargeting, TikTok/Instagram ads для awareness |

**Целевые действия ASO:**
- Title: "Sugar Quit: AI Craving Coach" (keywords в title — самый важный фактор, ASOMobile)
- Subtitle: "Beat Sugar Cravings with AI"
- 6-8 скриншотов: benefit-driven, не feature-driven
- App Preview видео (30 сек): SOS demo, streak, results
- Ответы на отзывы в течение 24 часов (+0.1-0.3 к рейтингу за 6 мес, Appalize)

### 2.2 Install → First Open

| Метрика | Значение |
|---------|----------|
| **Целевой %** | 85% |
| **Что делаем** | Лёгкий app (быстрая загрузка), привлекательный splash screen, push на Day 0 не навязчивый |
| **Точки потери** | Долгая загрузка, crash при первом открытии, слишком большой размер app |
| **Re-engagement** | Автоматический push через 24ч если не открыл: "Ваш план Sugar Reset ждёт! 🌱" |

### 2.3 First Open → Quiz Started

| Метрика | Значение |
|---------|----------|
| **Целевой %** | 90% |
| **Что делаем** | Welcome Screen с чётким value prop ("3 минуты → персональный план"), прогресс-бар с указанием времени (–40% drop-off, Retention Blog) |
| **Точки потери** | Непонятный value prop, требование регистрации ДО ценности (–75%, Decode Agency), перегрузка информацией |
| **Re-engagement** | Нет (если ушёл с Welcome — слишком рано для push) |

### 2.4 Quiz Started → Onboarding Complete

| Метрика | Значение |
|---------|----------|
| **Целевой %** | 70% (от quiz start) |
| **Что делаем** | 15 экранов quiz, чередование вопросов и мотивационных экранов (Headway pattern), визуальные карточки (не текст), haptic feedback, прогресс-бар, Loading Screen "Создаём план..." (+10-20%, Noom pattern) |
| **Точки потери** | Drop-off на первом переходе (38%, Amra and Elma), скучные текстовые вопросы, нет прогресс-бара, слишком личные вопросы рано |
| **Re-engagement** | Push через 24ч: "Вы начали настройку плана. Осталось 2 минуты до завершения! →" |

**Drop-off по блокам quiz (прогноз):**

```
Welcome (100%)
    ↓ [–10%]
Quiz Block 1: Цели (90%)
    ↓ [–8%]
Motivational 1 (82%)
    ↓ [–5%]
Quiz Block 2: Привычки (77%)
    ↓ [–3%]
Motivational 2 (74%)
    ↓ [–2%]
Quiz Block 3: Контекст (72%)
    ↓ [–2%]
Loading → Result (70%)
```

### 2.5 Onboarding Complete → Paywall View

| Метрика | Значение |
|---------|----------|
| **Целевой %** | 100% (hard paywall — показывается всем) |
| **Что делаем** | Персонализированный Result Screen ("Stress Eater, 3pm crash") ДО paywall → invested buy-in. Paywall показывается сразу после Result |
| **Точки потери** | Result Screen не впечатляет → пользователь не invested → skip paywall |
| **Re-engagement** | N/A (paywall показывается автоматически) |

### 2.6 Paywall View → Trial Started

| Метрика | Значение |
|---------|----------|
| **Целевой %** | 10% (install-to-trial; H&F top 10%: 12.1%, RevenueCat) |
| **Что делаем** | |

**Paywall optimization tactics (из Practices Brief):**

| Тактика | Ожидаемый эффект | Источник |
|---------|-----------------|----------|
| Анимированный paywall | 2.9x конверсия vs статический | Adapty |
| Персонализация (имя, тип тяги) | +17% конверсия | Adapty |
| Social proof с числами | +72% install-to-trial | Adapty 2026 |
| Benefit-driven CTA | Выше vs generic "Подписаться" | DEV Community |
| Honest timeline (Day 1→5→7) | +23% конверсия, –55% жалоб | Blinkist/DEV Community |
| 2 тира рядом (мес + год) | +31% к годовым подпискам | Airbridge |
| Value anchoring ($0.22/день) | Снижает perceived cost | Purchasely |

| **Точки потери** | Цена кажется высокой, недоверие к trial (страх забыть отменить), непонятные benefits |
| **Re-engagement** | Push через 3 дня: "Вы победили 2 тяги бесплатно! Готовы к unlimited SOS?" In-app paywall при попытке premium-фичи |

**Paywall dismissal strategy:**
- 1-й dismiss → ОК, свободно
- 2-й dismiss → через 3 дня при natural trigger (SOS лимит, curriculum lock)
- 3-й dismiss → снизить частоту, показывать только при premium feature tap

### 2.7 Trial Started → Paid Subscriber

| Метрика | Значение |
|---------|----------|
| **Целевой %** | 40% (H&F медиана: 35-39.9%, Adapty 2026) |
| **Что делаем** | 7-дневный trial — sweet spot (52% H&F используют 5-9 дней, Adapty). За 7 дней: 2-3 SOS-сессии (aha-moment), 7 уроков curriculum, streak 7 дней (3.6x retention, StriveCloud) |
| **Точки потери** | 55% отмен 3-day trial в Day 0 (RevenueCat). Пользователь забыл о app. AI не впечатлил. Streak сброшен |
| **Re-engagement** | Day 3 push: "Ваш прогресс: [stats]". Day 5 push: reminder о конце trial. Day 6: "Последний день trial! Вот чего вы достигли" |

**7-дневный Trial Engagement Plan:**

```
Day 0: Install → Quiz → Paywall → Trial Start
       → First check-in + Curriculum Day 1
       → Tip: "Нажми SOS когда тяга"

Day 1: Morning check-in push → Curriculum Day 2
       → Первый реальный SOS (если тяга)
       → Streak: 1 🔥

Day 2: Check-in → Curriculum Day 3
       → Craving Logger discovery
       → Streak: 2 🔥

Day 3: Check-in → Curriculum Day 4
       → Push: "Day 3! Самое сложное позади"
       → Milestone: Day 3 badge 🏅
       → Streak: 3 🔥

Day 4: Check-in → Curriculum Day 5
       → SOS (if needed) — AI remembers context
       → Streak: 4 🔥

Day 5: Check-in → Curriculum Day 6
       → Push: "Trial reminder — 2 дня осталось"
       → Progress card: "5 дней, X тяг побеждено"
       → Streak: 5 🔥

Day 6: Check-in → Curriculum Day 7
       → Push: "Завтра trial заканчивается"
       → Show progress summary: what you'll lose
       → Streak: 6 🔥

Day 7: Auto-charge OR cancel
       → If paid: "Добро пожаловать! 🎉" → continue
       → If cancelled: → Free tier (3 SOS/мес, Day 1-3 only)
       → Milestone: Day 7 badge 🏅 → Streak: 7 🔥
```

### 2.8 Paid Subscriber → Active User (D30)

| Метрика | Значение |
|---------|----------|
| **Целевой %** | 40% D30 retention (benchmark H&F: 27.2%, Practices Brief) |
| **Что делаем** | Daily check-in + curriculum (5+ мин сессия → 35% D30, Lucid). Streak system (7+ дней → 3.6x retention, StriveCloud). Milestone badges (7, 14, 30 дней → +30% completion, Orizon). Push макс 1/день, персонализированные |
| **Точки потери** | Curriculum контент скучный. AI даёт repetitive советы. Streak сброшен без freeze → frustration. Слишком много pushей → отключение |
| **Re-engagement** | Streak at risk push. Milestone celebration push. Weekly progress summary. "Новый урок доступен!" |

### 2.9 D30 → D90 (Active User Month 4)

| Метрика | Значение |
|---------|----------|
| **Целевой %** | 20% D90 retention (benchmark: 10-15%, Product Vision target) |
| **Что делаем** | 90-day curriculum structure (закончить = graduation). Community (v1.0) для social retention. Progress dashboard (визуализация). Prediction engine (v1.5) — switching costs |
| **Точки потери** | Curriculum Day 15-90 ещё не готов (v1.0). Пользователь чувствует "я справляюсь сам". Нет community → одиноко. First renewal churn (35% отменяют в первый месяц, RevenueCat) |
| **Re-engagement** | Monthly progress email. "Day 90 graduation" goal. Community engagement. New features push |

### 2.10 D90 → 12-Month Retention

| Метрика | Значение |
|---------|----------|
| **Целевой %** | 30% 12-month retention |
| **Что делаем** | Post-curriculum content (weekly tips, challenges). Community depth. Data moat (predictions improve). Annual plan incentives (36% Year 2 retention vs 6.7% monthly, DEV Community) |
| **Точки потери** | "Курс закончен, зачем платить?" No new content. AI стал predictable |
| **Re-engagement** | Annual plan auto-renew (36% Y2 vs 6.7% monthly). New features. Community challenges. "Your predictions got smarter" |

---

## 3. Финансовая модель воронки (на 1000 installs)

```
1000 Installs
  ↓
  850 First Opens (85%)
  ↓
  765 Quiz Started (90% of opens)
  ↓
  535 Onboarding Complete (70% of quiz start)
  ↓
  535 Paywall Views (100%)
  ↓
  100 Trial Started (10% of installs, 18.7% of paywall views)
  ↓
  40 Paid Subscribers (40% trial-to-paid)
  ↓
  16 Active Month 2 (40% D30 retention)
  ↓
  8 Active Month 4 (20% D90 retention)
  ↓
  5 Active Month 12 (30% of D90 users — annual renewals)
```

**Revenue на 1000 installs (Year 1):**
- 40 paid × ~60% monthly ($9.99) × avg 4 мес = $960
- 40 paid × ~40% annual ($79.99) × 1 = $1,280
- **Total: ~$2,240 / 1000 installs = $2.24 revenue per install**
- (Benchmark H&F install LTV: $1.21, Adapty — мы целимся выше за счёт SOS aha-moment)

---

## 4. Retention Loop (Hook Model)

### 4.1 Daily Loop (каждый день)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ТРИГГЕР                                           │
│   Push: "Как прошёл день?" (08:00)                  │
│   OR: Внутренний: привычка открыть app утром        │
│                                                     │
│           ↓                                         │
│                                                     │
│   ДЕЙСТВИЕ                                          │
│   Daily check-in (<30 сек)                          │
│   + Curriculum lesson (5-7 мин)                     │
│                                                     │
│           ↓                                         │
│                                                     │
│   НАГРАДА (переменная)                              │
│   - Streak counter +1 🔥                            │
│   - "Day 8!" celebration                            │
│   - Новый факт/insight в уроке                      │
│   - Progress stats обновлены                        │
│   - Milestone badge (Day 3, 7, 14, 30...)           │
│                                                     │
│           ↓                                         │
│                                                     │
│   ИНВЕСТИЦИЯ                                        │
│   - Streak (не хочу потерять)                       │
│   - Данные в craving logger (персонализация)        │
│   - Прогресс в curriculum (Day N из 90)             │
│   - AI знает мои триггеры (switching cost)          │
│                                                     │
└──────────────────────────── → следующий день ────────┘
```

### 4.2 Craving Loop (при тяге, 3-5 раз/неделю)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ТРИГГЕР                                           │
│   Внутренний: тяга к сахару (3pm, стресс, скука)    │
│   OR: Predictive push: "Тяга может прийти через     │
│   15 мин. Готов?" (v1.5+)                           │
│                                                     │
│           ↓                                         │
│                                                     │
│   ДЕЙСТВИЕ                                          │
│   Tap SOS → AI-разговор (2-5 мин)                   │
│                                                     │
│           ↓                                         │
│                                                     │
│   НАГРАДА (переменная)                              │
│   - "Тяга побеждена!" celebration                   │
│   - Конкретная альтернатива (орехи, ягоды)          │
│   - Эмпатичная поддержка (не одна)                  │
│   - Counter: "Тяга #15 побеждена!"                  │
│   - Инсайт: "Ваши тяги чаще в 3pm — стресс"        │
│                                                     │
│           ↓                                         │
│                                                     │
│   ИНВЕСТИЦИЯ                                        │
│   - Craving log data → AI предсказания точнее       │
│   - Cravings defeated counter (не хочу обнулить)    │
│   - AI "знает" меня (контекст, история)             │
│   - Success rate растёт (80% → 85% → 90%)           │
│                                                     │
└──────────────────────────── → следующая тяга ────────┘
```

### 4.3 Weekly Loop (раз в неделю)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ТРИГГЕР                                           │
│   Push (воскресенье): "Ваш недельный отчёт готов!"  │
│                                                     │
│           ↓                                         │
│                                                     │
│   ДЕЙСТВИЕ                                          │
│   Просмотр Weekly Summary (2 мин)                   │
│                                                     │
│           ↓                                         │
│                                                     │
│   НАГРАДА                                           │
│   - Визуализация прогресса (графики, тренды)        │
│   - "На этой неделе: 6 тяг, 5 побеждено (83%)"     │
│   - Shareable card для social media                 │
│   - Health timeline progress                        │
│                                                     │
│           ↓                                         │
│                                                     │
│   ИНВЕСТИЦИЯ                                        │
│   - Share → social accountability                   │
│   - Data → тренды становятся ценнее                 │
│   - Прогресс к следующему milestone                 │
│                                                     │
└──────────────────────────── → следующая неделя ──────┘
```

---

## 5. Re-Engagement стратегия

### 5.1 По дням неактивности

| Дни без визита | Канал | Сообщение | Цель |
|----------------|-------|-----------|------|
| **1 день** | Push | "Твой streak в опасности! 🔥 Зайди, чтобы сохранить [N]-дневный прогресс" | Streak FOMO |
| **3 дня** | Push | "Мы скучаем! Вот что произошло: [новый урок / community highlight]" | Curiosity |
| **7 дней** | Push + email | "Каждый день без Sugar Quit — день без поддержки. Вернись, мы не осуждаем 💜" | Empathy |
| **14 дней** | Email | "Что пошло не так? [1-tap survey]. Вот 3 вещи, которые изменились с вашего последнего визита" | Feedback + value |
| **30 дней** | Email | "Ваши данные сохранены. Когда будете готовы — мы здесь. [Restart button]" | Gentle, no pressure |

### 5.2 Контекстные re-engagement

| Триггер | Сообщение |
|---------|-----------|
| Новый milestone приближается | "Ещё 2 дня до Day 14 badge! Не останавливайся" |
| Понедельник утро | "Новая неделя — новый шанс. Как прошли выходные?" |
| Январь (NY resolutions) | "Новый год — отличное время вернуться. Ваш streak ждёт!" |
| Друг зарегистрировался | "Ваша подруга [Name] присоединилась! Поддержите друг друга" (v1.5+) |

### 5.3 Churn prevention signals

| Сигнал | Действие |
|--------|----------|
| Check-in пропущен 2 дня подряд | Streak at risk push + предложение freeze |
| SOS использование упало (>50% снижение) | "Всё хорошо? Если тяги стали реже — это успех! Но мы рядом если что" |
| Curriculum застрял (не открывал 3+ дня) | "Урок [N] ждёт: [заголовок]. Всего 5 минут" |
| Subscription cancel intent (Settings → Cancel) | Retention modal: "Вот что вы потеряете: [streak, data, predictions]. Сделать паузу вместо отмены?" |

---

## 6. Ключевые метрики для трекинга

### 6.1 Дашборд воронки (ежедневный мониторинг)

| Метрика | Формула | Целевое | Alarm если |
|---------|---------|---------|------------|
| Install-to-quiz-start | Quiz starts / Installs | 76% | <60% |
| Quiz completion rate | Quiz completes / Quiz starts | 70% | <50% |
| Paywall conversion | Trials / Paywall views | 18.7% | <10% |
| Install-to-trial | Trials / Installs | 10% | <6% |
| Trial-to-paid | Paid / Trials | 40% | <30% |
| D1 retention | DAU D1 / Installs D0 | 35% | <20% |
| D7 retention | DAU D7 / Installs D0 | 50% | <30% |
| D30 retention | DAU D30 / Installs D0 | 40% | <20% |

### 6.2 Engagement метрики

| Метрика | Целевое | Обоснование |
|---------|---------|-------------|
| SOS sessions / user / week | >3 | Core feature engagement (Product Vision) |
| Craving Defeated Rate | >60% | Core value prop (Product Vision) |
| Daily check-in completion | >80% paying users | Retention driver |
| Curriculum progress (Day 14) | >40% | Hook period (Product Vision) |
| Push opt-in rate | >60% | Контекстный запрос (Practices Brief) |
| Session length | >5 мин | >5 мин → 35% D30 (Lucid) |
| App Store rating | >4.5 | <4.0 = –15-20% конверсия (Appalize) |

---

*Данный документ определяет полную воронку конверсии Sugar Quit. Все метрики основаны на бенчмарках из [Practices Brief](../03-practices/PRACTICES-BRIEF.md) и целевых KPI из [Product Vision](../02-product/PRODUCT-VISION.md).*
