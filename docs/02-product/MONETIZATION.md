# Монетизация: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** Product Definition (Stage 2)
**Источники:** [Market Research](../01-research/MARKET-RESEARCH.md), [Competitors](../01-research/COMPETITORS.md), [Target Audience](./TARGET-AUDIENCE.md)

---

## 1. Модель: Freemium + Subscription

### Выбор модели

**Freemium с подпиской (monthly + annual).**

### Обоснование

| Альтернатива | Почему НЕ она |
|-------------|---------------|
| **Чистая подписка (no free tier)** | SOS AI experience — наш "aha-moment". Без free trial пользователь не узнает, что AI реально помогает → низкая конверсия. Reframe, Noom, Sunnyside — все дают trial/free tier |
| **One-time purchase** | Behavior change — долгосрочный процесс (90+ дней). One-time purchase не создаёт recurring revenue и не мотивирует retention. AI costs — recurring ($0.007/разговор), нужен recurring revenue |
| **IAP (in-app purchases)** | Фрагментирует опыт. Работает для игр, не для health behavior change. Конкуренты (Reframe, Sunnyside, I Am Sober) — все на подписках |
| **Рекламная модель** | Конфликт с trust. Health-данные + реклама = FTC risk. Reframe/Sunnyside доказали: subscription > ads для behavior change |
| **Lifetime purchase** | Добавим как опцию (Sugarless: $29.99, Sugarfree: $59.99), но не как основную модель. Lifetime cannibalizes LTV |

**Ключевой принцип:** Free tier должен быть достаточно ценным, чтобы продемонстрировать "aha-moment" (первый SOS-разговор), но ограничен по количеству — создавая естественный conversion trigger.

---

## 2. Тиры подписки

| Тир | Цена | Что включено | Ограничения Free |
|-----|------|-------------|------------------|
| **Free** | $0 | 3 SOS-разговора/месяц, streak counter, daily check-in, community (read-only), curriculum Day 1-3 (preview) | Лимит SOS, нет prediction, нет "Eat This Instead", community read-only, curriculum locked после Day 3 |
| **Premium** | **$9.99/мес** | Unlimited SOS AI, полный 90-day curriculum, craving logger + analytics, "Eat This Instead" (v1.0+), community (read + post), progress dashboard, push predictions (v1.5+) | — |
| **Annual** | **$79.99/год** ($6.67/мес) | Всё из Premium + 3 streak freezes/неделя (vs 1), early access к новым фичам, приоритетная поддержка | — |
| **Lifetime** | **$149.99** (one-time) | Всё из Annual навсегда | Появится в v1.0, не на MVP launch |

### Paywall Strategy

```
Day 1 ──→ Free: Onboarding + первый SOS (бесплатно, всегда) + Curriculum Day 1-3
         ↓
Day 3 ──→ Curriculum locked: "Хочешь продолжить? Day 4 ждёт" → Soft paywall
         ↓
Day 7 ──→ 3 SOS использованы → "Upgrade для unlimited SOS" → Hard paywall trigger
         ↓
Day 14 ─→ Community участие → "Хочешь ответить на пост? Upgrade" → Social paywall
```

**Первый SOS-разговор ВСЕГДА бесплатный** — это наш conversion mechanic. Пользователь должен испытать "aha-moment" до paywall.

---

## 3. Ценообразование

### 3.1 Бенчмарки конкурентов

| Приложение | Месячная | Годовая | Модель | Revenue |
|-----------|---------|---------|--------|---------|
| **Reframe** (alcohol) | ~$14/мес | $99.99/год | Subscription + coaching add-ons | $10M+ ARR |
| **Sunnyside** (alcohol) | $12/мес | $99/год | Subscription + Premium $36/мес | $23.7M revenue |
| **I Am Sober** (generic) | $9.99/мес | $39.99/год | Freemium + subscription | ~$200K/мес |
| **Noom** (weight) | $17-70/мес | ~$209/год | Subscription + coaching | ~$1B ARR |
| **Sugarfree** (sugar) | $6.49/мес | $26.99/год | Freemium + lifetime $59.99 | — |
| **Sugarless** (sugar) | $4.49/мес | — | Freemium + lifetime $29.99 | — |
| **Sugarcut** (sugar) | $9.99/мес | $35.95/год | Subscription | — |
| **No Sugar Challenge** | $14.99/мес | $39.99/год | Subscription ($6.99/нед опция) | — |

**Источники:** [Competitors](../01-research/COMPETITORS.md), [Market Research](../01-research/MARKET-RESEARCH.md) раздел 8

### 3.2 Исследования по оптимальным ценам

**RevenueCat State of Subscription Apps 2026:**
- Медианная цена подписки (все категории): monthly **$12.99**, annual **$38.42**, weekly **$7.48**
- Health & Fitness: **68% подписок — annual plans** (наивысшая доля annual среди всех категорий)
- Trial-to-paid conversion (H&F): **медиана 39.9%**, top 10% — **68.3%**
- First-renewal retention (H&F): **30.3%** (худший показатель среди всех категорий — ~70% churn при первом продлении)
- Realized LTV per payer (H&F, Year 1): медиана **$35.64**
- Revenue per install (H&F, Day 60): **$0.63**
- 35% всех годовых отмен происходят в первый месяц

*Источник: [RevenueCat State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps/)*

**Adapty State of In-App Subscriptions 2026:**
- H&F annual plans генерируют **60.6% revenue** (единственная категория, где annual доминирует)
- Средняя цена annual plan (H&F): **$46.10**
- Install-to-trial: **11.2%** (global median)
- Install-to-paid (без trial): **~3.7%**
- H&F trial-to-paid: **35%** (наивысший показатель среди всех категорий)
- H&F install LTV: **$1.21/install** за 12 месяцев (наивысший среди всех категорий)
- Weekly plans с free trial дают наивысший 12-month LTV: **$49.27**
- Trials улучшают retention при первом продлении на **8-60%**

*Источник: [Adapty State of In-App Subscriptions 2026](https://adapty.io/state-of-in-app-subscriptions/)*

**CAC Benchmarks (Health & Fitness, 2026):**
- Целевой CAC за paying subscriber: **~$30** (планировочный бенчмарк для fitness apps)
- B2C app median payback period: **4.2 месяца**
- Monthly churn (fitness): улучшился с 8.9% (2023) до **7.2%** (2025)
- Retention D1: 20-35%, D7: 7-18%, D30: 3-10% (медиана-лучшие)

*Источники: [Financial Models Lab](https://financialmodelslab.com/blogs/kpi-metrics/personal-fitness-mobile-application), [Enable3 Benchmarks 2026](https://enable3.io/blog/app-retention-benchmarks-2025)*

> **Важно:** Медианные цены H&F ($38-46/год) покрывают ВСЮ категорию (фитнес-трекеры, йога, etc.). Behavior change / addiction apps значительно дороже: Reframe $99.99/год, Sunnyside $99/год, I Am Sober $39.99/год. Наша цена $79.99/год — в рамках behavior change подкатегории.

### 3.3 Обоснование цены $9.99/мес

| Фактор | Обоснование |
|--------|-------------|
| **Ниже Reframe ($14) и Sunnyside ($12)** | Sugar воспринимается как "менее серьёзная" проблема, чем алкоголь → входной барьер должен быть ниже |
| **На уровне I Am Sober ($9.99)** | Proven price point для addiction/habit-change категории |
| **Выше sugar-specific конкурентов ($4.49-$6.49)** | AI SOS — premium фича, которой нет ни у кого. Цена отражает ценность |
| **Медиана Health & Fitness** | $9.99/мес — медианная цена подписки в категории (RevenueCat 2025) |
| **Фреймирование** | "$80/год vs $10,000+/год лечение диабета" — для Paul-персоны. "$9.99/мес — меньше, чем 2 визита к vending machine" — для Sarah |
| **WTP всех 3 персон** | Sarah: $9.99/мес без колебаний. Paul: $79.99/год легко. Chloe: $9.99/мес во время challenge |

---

## 4. Unit Economics (целевые)

### 4.1 Ключевые метрики

| Метрика | Значение | Benchmark (H&F 2026) | Обоснование |
|---------|----------|---------------------|-------------|
| **ARPU (monthly, all users)** | $4.50 | — | Blend: 90% free ($0) + 8% monthly ($9.99) + 2% annual ($6.67/мес) |
| **ARPU (paying users)** | $8.50/мес | — | Blend monthly + annual paying users |
| **Revenue per Install** | $0.80 (Day 60, цель) | $0.63 (RevenueCat) | Выше медианы за счёт SOS "aha-moment" и strong paywall |
| **Install LTV (12 мес)** | $1.50 (цель) | $1.21 (Adapty) | H&F = наивысший install LTV среди категорий |
| **LTV per Payer (Year 1)** | **$68-$85** | $35.64 (RevenueCat) | Выше медианы: behavior change apps = дольше lifetime. Reframe/Sunnyside LTV значительно выше |
| **CAC (blended)** | **$15-$25** | ~$30 (per paying sub) | 50% organic (TikTok/referral: $0-$3) + 50% paid ($25-$40). Blended ниже медианы за счёт viral/organic |
| **LTV/CAC** | **2.7x-5.7x** | Цель: >3x | Нижняя граница ($68/$25=2.7x) приемлема для Year 1. С ростом organic → >3x |
| **Payback Period** | **4-5 месяцев** | 4.2 мес (B2C median) | CAC $20 / ARPU paying $4.50/мес = 4.4 мес |
| **Install → Trial** | **11%** (цель) | 11.2% (Adapty) | На уровне медианы |
| **Trial → Paid** | **35%** (цель) | 35-39.9% (Adapty/RC) | H&F — лучшая trial-to-paid конверсия среди категорий |
| **Free → Paid (no trial)** | **4%** (цель) | 3.7% (Adapty) | SOS "aha-moment" → выше медианы |
| **First Renewal Retention** | **35%** (цель) | 30.3% (RevenueCat) | Выше медианы за счёт 90-day curriculum structure |
| **Monthly Churn (paying)** | **7-10%** | 7.2% (2025, improved) | С gamification + community + data moat: нижняя граница |

### 4.2 Revenue Model (Year 1-3)

| Метрика | Year 1 | Year 2 | Year 3 |
|---------|--------|--------|--------|
| Total Downloads | 500K | 2M | 5M |
| Monthly Active Users (MAU) | 100K | 400K | 1M |
| Paying Subscribers | 50K | 200K | 500K |
| Conversion Rate | 10% | 10% | 10% |
| ARPU (paying, annual) | $80 | $85 | $90 |
| **ARR** | **$4M** | **$17M** | **$45M** |
| Monthly AI cost per user | $0.21 | $0.18 | $0.15 |
| AI cost as % of revenue | 2.6% | 2.1% | 1.7% |

**Источник базовых прогнозов:** [Market Research](../01-research/MARKET-RESEARCH.md), раздел 9.3 (SOM)

### 4.3 AI Cost Breakdown

| Компонент | Стоимость | Примечание |
|-----------|-----------|------------|
| SOS-разговор (Claude Haiku 4.5) | $0.007/разговор | ~5-15 messages, 2K tokens avg |
| С prompt caching | $0.003/разговор | 90% cache hit rate для system prompt |
| Среднее кол-во SOS/user/месяц | 12-15 | 3-4/неделю для активного пользователя |
| **AI cost/user/месяц** | **$0.04-$0.10** | С caching: $0.04-$0.05 |
| **AI cost как % от revenue** | **0.4-1.0%** | При $9.99/мес подписке |

**AI costs — не bottleneck.** При $9.99/мес подписке, AI стоит <1% от revenue. Это позволяет предлагать unlimited SOS — ключевой selling point.

**Источник:** [Market Research](../01-research/MARKET-RESEARCH.md), раздел 14.1

---

## 5. Дополнительные потоки revenue

### 5.1 B2B Corporate Wellness

| Параметр | Описание |
|----------|----------|
| **Что** | Корпоративные лицензии: компания оплачивает подписки для сотрудников |
| **Цена** | $5-8/employee/мес (volume discount) |
| **Timing** | v2.0 (после product-market fit в B2C) |
| **Обоснование** | Noom партнёрится с Highmark Health (2M members). Diabetes prevention = employer priority. Sugar reduction — прямой путь к снижению healthcare costs |
| **Потенциал** | $10M+ ARR при 500 компаний x 200 employees x $6/мес |

### 5.2 B2B Insurance / Health Plan Partnerships

| Параметр | Описание |
|----------|----------|
| **Что** | Insurance покрывает подписку для pre-diabetic пациентов |
| **Цена** | $8-12/member/мес (premium tier + outcomes data) |
| **Timing** | v2.0+ (требует clinical data) |
| **Обоснование** | Diabetes cost: $412.9B/год (ADA). Профилактика через app — в 100x дешевле лечения. CDC DPP certification — roadmap |
| **Потенциал** | Если 1% US pre-diabetic population (96M) → 960K members → $100M+ ARR |

### 5.3 Premium Coaching Tier

| Параметр | Описание |
|----------|----------|
| **Что** | Доступ к human nutritionist/coach + enhanced AI |
| **Цена** | $29.99-$49.99/мес |
| **Timing** | v1.5 |
| **Обоснование** | Reframe: coaching add-ons $9.99-$249.99/мес. Sunnyside Premium: $36/мес. Paul-персона — готов платить |

### 5.4 Что НЕ будем монетизировать

| Поток | Почему НЕТ |
|-------|-----------|
| **Реклама** | Конфликт интересов с health-миссией. FTC risk с health data. Разрушает trust |
| **Продажа данных** | FTC Health Breach Notification Rule. Прецеденты GoodRx/Premom — штрафы |
| **Affiliate / food brand partnerships** | Конфликт с рекомендациями "Eat This Instead". "Мы рекомендуем X потому что заплатили" → потеря доверия |
| **In-app gambling / loot boxes** | Не совместимо с health positioning. Regulatory risk |

---

## 6. Conversion Funnel

```
Download (100%) ──→ Complete Onboarding (60%) ──→ First SOS (40%)
                                                      ↓
                                            "Aha-moment" (тяга побеждена)
                                                      ↓
                                            Use 3 free SOS (25%)
                                                      ↓
                                            Hit paywall (20%)
                                                      ↓
                                         Start trial / Subscribe (8-10%)
                                                      ↓
                                            Month 2 retained (85%)
                                                      ↓
                                            Month 6 retained (50%)
                                                      ↓
                                            Month 12 retained (30%)
```

### Ключевые conversion levers

| Lever | Механизм | Ожидаемый эффект |
|-------|----------|------------------|
| **Первый бесплатный SOS** | "Aha-moment" до paywall | +30% conversion vs immediate paywall |
| **Streak loss aversion** | "Если upgrade, streak freeze доступен" | +10-15% conversion |
| **Community FOMO** | "127 людей обсуждают Day 7 withdrawal — upgrade чтобы ответить" | +5-10% conversion |
| **Annual discount framing** | "Сэкономь 33% с годовым планом ($6.67/мес vs $9.99/мес)" | 40%+ выбирают annual |
| **Health framing** | "$80/год vs $10,000+/год лечение диабета" | Конверсия Paul-персоны |

---

*Данный документ основан на ценовых бенчмарках из [Competitors](../01-research/COMPETITORS.md) и рыночных данных из [Market Research](../01-research/MARKET-RESEARCH.md). Unit economics — прогнозные, подлежат валидации на beta.*
