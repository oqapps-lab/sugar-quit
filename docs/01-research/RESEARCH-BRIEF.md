# Research Brief: Sugar Quit

**Дата:** 13 апреля 2026
**Статус:** Синтез Research Stage
**Companion Documents:** [Market Research](./MARKET-RESEARCH.md), [Competitors](./COMPETITORS.md), [User Personas](./USER-PERSONAS.md), [Domain Research](./DOMAIN-RESEARCH.md)

---

## 1. Elevator Pitch

**Sugar Quit — первый AI-коуч, который разговаривает с вами в момент тяги к сахару и предсказывает, когда она наступит.** 195 миллионов американцев хотят снизить потребление сахара, но лучшее приложение в категории имеет 805 отзывов в App Store — рынок фактически пуст, а технология AI впервые делает real-time коучинг экономически жизнеспособным.

---

## 2. Scoring Table

| # | Критерий | Оценка | Обоснование |
|---|----------|--------|-------------|
| 1 | **Размер рынка** | 9/10 | TAM ~$20B, SAM ~$1.76B. 75% американцев (195M) активно пытаются снизить сахар. Diet & Nutrition Apps — $5.95B рынок с CAGR 16.64%. Sugar-free food & beverage — $67.48B |
| 2 | **Рост рынка** | 9/10 | Diet apps CAGR 16.64%. Sugar-free market CAGR 8.27%. Доля пытающихся снизить сахар: 66% (2024) → 75% (2025). TikTok "No Sugar Challenge" — вирусный рост. 116 стран ввели sugar tax |
| 3 | **Конкуренция** (10 = мало) | 9/10 | Лидер категории (Sugarfree) — 805 iOS-отзывов, ~81K загрузок. Суммарные загрузки всех sugar-apps <200K. Для сравнения: I Am Sober — 10M+, Reframe — 3.2M. Нет venture-funded игрока. Market Saturation Score: 2/10 |
| 4 | **Ясность проблемы** | 10/10 | Подтверждена нейронаукой (сахар активирует те же reward pathways, что и наркотики). 53% взрослых США потребляют избыточный сахар. r/sugarfree — 100K+ участников. Топ-жалоба: "Ничто не помогает в МОМЕНТ тяги" |
| 5 | **Монетизация** | 8/10 | $9.99/мес — validated аналогами (Reframe $14/мес, Sunnyside $12/мес, I Am Sober $9.99/мес). Все 3 персоны готовы платить $9.99+/мес. B2B wellness + insurance — дополнительные каналы. Риск: sugar воспринимается как "менее серьёзная" проблема, чем алкоголь |
| 6 | **Техническая сложность** (10 = просто) | 7/10 | Стек proven (React Native + Supabase + Claude API). AI cost $0.007/разговор — 1.8% от revenue. Но: prediction ML, food database, community moderation, health integrations — нетривиальный объём работы |
| 7 | **Уникальность** | 9/10 | Real-time AI craving coaching — нет ни у кого. Predictive triggers — нет ни у кого. "Eat This Instead" engine — нет ни у кого. Ближайший аналог Reframe Melody — для алкоголя, не сахара |

**Средний балл: 8.7/10**

---

## 3. Top-5 Insights

### Insight 1: Момент тяги — единственное, что имеет значение

Все 3 персоны, все конкуренты, все Reddit-темы сходятся в одном: существующие инструменты работают ретроспективно (трекинг после еды) или превентивно (общие советы). **Никто не помогает в 3pm, когда рука тянется к candy bowl.** SOS AI — не просто фича, это entire reason to exist.

> Источники: [User Personas](./USER-PERSONAS.md) — Common Patterns; [Market Research](./MARKET-RESEARCH.md) — Pain Point 1; App Store reviews: "Просто таймер, не реальная помощь" — самая частая жалоба

### Insight 2: Категория в зачаточном состоянии — окно 12-18 месяцев

Суммарные загрузки **всех** sugar-specific приложений — <200K. Reframe (алкоголь) имеет 3.2M. Sunnyside — 250K users при $23.7M revenue. Рынок сахара в 3-5x больше, чем рынок алкоголя (75% vs 15% хотят снизить). Но волна новых игроков (STOPPR, No Sugar Challenge, QuitSugar — все 2025-2026) сигнализирует, что окно сужается. Если Noom или MyFitnessPal добавят sugar-модуль — окно закроется.

> Источники: [Competitors](./COMPETITORS.md) — Market Saturation Score 2/10; [Market Research](./MARKET-RESEARCH.md) — Section 14.4

### Insight 3: AI стоимость впервые делает модель жизнеспособной

Claude Haiku 4.5 при $0.007 за SOS-разговор = 1.8% от revenue ($9.99/мес подписка). С prompt caching — ещё ниже (~$0.003). 2 года назад стоимость была бы 10-50x выше, делая unlimited AI conversations финансово невозможными. **Технологическое окно совпало с рыночным.**

> Источники: [Product Brief](./PRODUCT-BRIEF.md) — AI Cost Analysis; [Market Research](./MARKET-RESEARCH.md) — Section 14.1

### Insight 4: "Что есть вместо?" — #1 неотвеченный вопрос

Сахар отличается от алкоголя и сигарет: нельзя избежать еды. Вопрос "What do I eat when I'm craving something sweet RIGHT NOW?" — самый частый на r/sugarfree. MyFitnessPal не может отличить added sugar от natural. **"Eat This Instead" engine — вторая по важности фича после SOS.**

> Источники: [User Personas](./USER-PERSONAS.md) — Common Pattern #2; [Market Research](./MARKET-RESEARCH.md) — Reddit Analysis; [Competitors](./COMPETITORS.md) — Gap Analysis

### Insight 5: Reframe — готовый playbook для копирования

Reframe (quit drinking): $10M+ ARR, 3.2M загрузок, $12.5M инвестиций. Их формула: 160-day neuroscience curriculum + AI chatbot (Melody) + Cravings Mode + community + gamification. Sunnyside: $23.7M revenue, $14.6M инвестиций. Оба обслуживают рынок в 3-5x меньший, чем sugar. **Плейбук доказан — нужно адаптировать, а не изобретать.**

> Источники: [Competitors](./COMPETITORS.md) — Reframe + Sunnyside profiles; [Market Research](./MARKET-RESEARCH.md) — Sections 7.2, 12.4

---

## 4. Key Risks

### Риск 1: Вход крупного игрока (Noom, MyFitnessPal, Apple)

- **Вероятность:** Средняя
- **Severity:** Высокая
- **Митигация:** Первые 12-18 месяцев — окно. Data moat: история тяги пользователя непереносима. Community lock-in. Стать "THE sugar app" до того, как инкумбенты заметят. Noom уже партнёрится с Highmark Health для diabetes prevention (2M members, 2026) — sugar-модуль логичен для них.

### Риск 2: Готовность платить ниже, чем за алкоголь

- **Вероятность:** Средняя
- **Severity:** Средняя
- **Митигация:** Sugar воспринимается как "менее серьёзная" проблема. Но: 3 персоны все подтвердили willingness to pay $9.99+/мес. Фреймить через здоровье: "$80/год vs $10K+/год лечение диабета". B2B/insurance subsidies для Pre-Diabetic Paul. Убийственный free tier → SOS experience конвертирует.

### Риск 3: Научная контроверсия ("сахарная зависимость не существует")

- **Вероятность:** Средняя
- **Severity:** Средняя
- **Митигация:** Сахарная зависимость НЕ признана в DSM-5/ICD-11. Но поведенческие паттерны (тяга, bingeing, withdrawal) задокументированы. Позиционирование: "behavior change for sugar habits, backed by neuroscience" — НИКОГДА "addiction treatment". Reframe успешно навигировал идентичный риск с алкоголем.

### Риск 4: Retention / высокий churn

- **Вероятность:** Высокая
- **Severity:** Высокая
- **Митигация:** Health apps churn 8-15%/мес. Ответ: gamification (streaks, community challenges), community lock-in, AI personalization (чем дольше пользуешься → тем точнее predictions → тем выше switching costs), stage-based curriculum (90-day journey даёт structure). Reframe retention: 91% пользователей снизили алкоголь за 3 месяца.

### Риск 5: Расстройства пищевого поведения (eating disorders)

- **Вероятность:** Средняя
- **Severity:** Высокая
- **Митигация:** Chloe-персона уже в binge-restrict цикле. AI **никогда** не должен стыдить, поддерживать extreme restriction, или reinforce all-or-nothing мышление. Anti-pattern detection в community. Автоматический referral к профессионалам при red flags. Advisory board включает клинического психолога. Reduction (не только abstinence) как option.

---

## 5. Hypotheses to Test

### H1: SOS AI конвертирует лучше, чем static panic button
- **Тест:** A/B тест в beta — SOS AI vs. breathing exercise. Метрика: craving defeated rate (% тяг, которые не привели к consumption)
- **Порог:** SOS AI > 60% craving defeated rate (vs estimated 20-30% для breathing exercise)

### H2: Пользователи готовы платить $9.99/мес за sugar-specific app
- **Тест:** Landing page с ценой → email signup conversion. Или: free tier с 3 SOS/мес → upgrade conversion rate
- **Порог:** Free → Paid conversion > 8% (benchmark для health apps: 5-10%)

### H3: Predictive triggers повышают retention
- **Тест:** Когорта с predictions vs. без. Метрика: D30 retention
- **Порог:** D30 retention с predictions > 35% (vs typical health app D30: 15-25%)

### H4: Community — ключевой retention driver
- **Тест:** Community participants vs. solo users. Метрика: D90 retention
- **Порог:** Community users D90 retention > 2x solo users

### H5: "Eat This Instead" — top requested feature
- **Тест:** Beta user surveys + feature usage tracking
- **Порог:** >50% активных пользователей используют feature еженедельно

---

## 6. Recommendations для Product Stage

### 6.1 Приоритеты MVP

| Приоритет | Фича | Обоснование |
|-----------|------|-------------|
| P0 (must-have) | SOS AI button | Единственный дифференциатор. Core conversion mechanic. Всё начинается здесь |
| P0 | Daily check-in + streak | Минимальный engagement loop. Кормит prediction engine |
| P0 | 90-day curriculum (первые 14 дней) | Hook. Первые 2 недели — withdrawal period, максимальная потребность в support |
| P1 (should-have) | "Eat This Instead" engine | #1 unmet need. Но можно начать с curated list, AI позже |
| P1 | Community (read + post) | Retention driver. Но можно запустить как r/sugarfree-style форум |
| P1 | Progress dashboard | Money saved + cravings defeated + streak — мотивация |
| P2 (nice-to-have) | Craving predictor | Killer feature, но требует 7+ дней данных. Не для Day 1 |
| P2 | Food scanner | Не core loop. Sugarfree провалился с quality. Лучше сделать позже и хорошо |
| P2 | Apple Watch integration | Дифференциатор, но малая аудитория |

### 6.2 Target Timeline

- **Запуск: Январь 2027** — non-negotiable. January spike = 10x органических установок
- **Beta: Октябрь-Ноябрь 2026** — 500-1000 beta-тестеров из r/sugarfree
- **Content production: Май-Сентябрь 2026** — 90-day curriculum должен быть готов до beta
- **Advisory board: Май 2026** — 3-5 экспертов для научной кредибильности

### 6.3 Позиционирование

**"Reframe for sugar"** — the first AI-powered sugar reduction coach.

- **Язык:** "sugar habits", "cravings", "behavior change", "backed by neuroscience"
- **Не использовать:** "addiction treatment", "cure", "clinical intervention", "medical"
- **Tone:** Эмпатичный коуч, не калькулятор. Поддержка, не стыд. Прогресс, не perfection.

### 6.4 Команда для следующего этапа

| Роль | Приоритет | Обоснование |
|------|-----------|-------------|
| Content Lead | Критично | 90-day curriculum — главный production bottleneck |
| Advisory Board (3-5 экспертов) | Критично | Нейроучёный, диетолог, психолог, эндокринолог — кредибильность |
| Health-tech regulatory attorney | Важно | Проверить claims, disclaimers, FDA guidance compliance |
| Community moderator (1-2) | Для beta | Eating disorder detection, content moderation |

### 6.5 Метрики успеха для Product Stage

| Метрика | Target |
|---------|--------|
| Beta user NPS | >50 |
| SOS craving defeated rate | >60% |
| Free → Paid conversion | >8% |
| D7 retention | >45% |
| D30 retention | >30% |
| Average SOS conversations/user/week | >3 |

---

## 7. Verdict

### CAUTIOUS GO

**Рекомендация: GO с условиями.**

Все 7 критериев scoring table показывают сильные оценки (средний балл 8.7/10). Рынок огромен (TAM $20B), категория практически пуста (saturation 2/10), playbook доказан (Reframe/Sunnyside), AI costs жизнеспособны (1.8% от revenue), уникальность высока (real-time AI craving coaching не существует).

**Почему CAUTIOUS GO, а не безусловный GO:**

1. **Готовность платить не проверена.** Все аналоги — в "серьёзных" категориях (алкоголь, курение). Sugar — "мягкая" проблема для большинства. H2 (willingness to pay) — критическая гипотеза
2. **Retention — главный риск.** Health apps churn 8-15%/мес. Без exceptional retention все projections рассыпаются
3. **Eating disorder liability.** Binge-restrict персона (Chloe) — реальный риск. AI, работающий с food behavior, может навредить. Требуется clinical advisory

**Условия перехода к разработке:**

| Условие | Дедлайн | Критерий выполнения |
|---------|---------|---------------------|
| Landing page validation | Май 2026 | >5% email signup conversion при указании цены $9.99/мес |
| Advisory board (минимум 2 эксперта) | Июнь 2026 | Нейроучёный/психолог + диетолог подтвердили участие |
| Regulatory review | Июнь 2026 | Health-tech attorney подтвердил: позиционирование safe, disclaimers достаточны |
| Content plan для curriculum | Июль 2026 | Первые 14 дней curriculum — draft ready, reviewed by advisory |
| Seed funding plan | Июль 2026 | $2-3M seed roadmap (angels, VC, bootstrapping — определён путь) |

**При выполнении всех условий → полный GO на разработку с target запуска Январь 2027.**

---

*Данный документ является синтезом [Market Research](./MARKET-RESEARCH.md), [Competitors](./COMPETITORS.md), [User Personas](./USER-PERSONAS.md) и [Domain Research](./DOMAIN-RESEARCH.md). Каждый companion document содержит детальные данные и источники.*
