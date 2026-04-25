# Research Brief: Sugar Quit
**Дата:** 2026-04-25 (v2.0 — синтез всех research документов)  
**Статус:** Research Stage Complete → Ready for Product Definition  
**Companion:** [Market Research](./MARKET-RESEARCH.md) · [Competitors](./COMPETITORS.md) · [User Personas](./USER-PERSONAS.md) · [Domain Research](./DOMAIN-RESEARCH.md)

---

## 1. Elevator Pitch

**Sugar Quit — первый AI-коуч, который разговаривает с тобой прямо в момент тяги к сахару и предсказывает, когда она наступит, для 195 миллионов американцев, которые хотят снизить сахар, но обнаруживают, что ни одно из существующих приложений не помогает в 15:00, когда рука сама тянется к candy bowl.**

---

## 2. Скоринг по 7 критериям

| # | Критерий | Оценка | Комментарий | Данные |
|---|----------|:------:|-------------|--------|
| 1 | **Размер рынка** | **9/10** | TAM ~$20B по нашему расчёту (400M адресной аудитории × $50/год). Diet & Nutrition Apps: $5.95B в 2025, CAGR 16.64%. SAM (US+UK+CA+AU): ~$1.76B. SOM Year 3 при 500K платящих: $45M ARR. | [MARKET-RESEARCH §8](./MARKET-RESEARCH.md) · [Towards Healthcare](https://www.towardshealthcare.com/insights/diet-and-nutrition-apps-market-sizing) |
| 2 | **Рост рынка** | **9/10** | Diet apps CAGR 16.64%. AI Coaching apps CAGR 18.7%. Доля желающих снизить сахар: 66% (2024) → 75% (2025) — рост +9% за год. 116 стран ввели SSB tax. GLP-1 рынок: $19.6B → $104.9B к 2035 создаёт массовый метаболический дискурс. | [MARKET-RESEARCH §1.3, §18](./MARKET-RESEARCH.md) · [IFIC 2025](https://ific.org/media/americans-scrutinize-sugar-consumption/) |
| 3 | **Конкуренция** (10 = пусто) | **9/10** | Лидер категории Sugarfree: 812 iOS-отзывов, 50K+ загрузок Android. Суммарно 6 прямых конкурентов — < 300K загрузок все вместе. I Am Sober (generic): 11M+. Reframe (алкоголь): 3.2M. Нет ни одного venture-backed sugar-специфичного игрока. Market Saturation Score: 2/10. | [COMPETITORS.md](./COMPETITORS.md) · Sensor Tower данные |
| 4 | **Ясность проблемы** | **10/10** | Нейробиологически подтверждена: сахар активирует nucleus accumbens идентично наркотикам (Avena et al., 2007). 53% взрослых США потребляют избыточный сахар. 700M глобально с преддиабетом. r/sugarfree: 100K+ участников. Топ-жалоба во всех App Store отзывах: «ничто не помогает В МОМЕНТ тяги». | [DOMAIN-RESEARCH §2](./DOMAIN-RESEARCH.md) · [PMC2235907](https://pmc.ncbi.nlm.nih.gov/articles/PMC2235907/) |
| 5 | **Монетизация** | **8/10** | $9.99/мес подтверждено рынком (Reframe $8.33, Sunnyside $8.99, I Am Sober $9.99). Все 3 персоны подтвердили WTP ≥ $9.99. B2B ROI > 10:1 (диабет обходится работодателю $13.7K/год на человека). Риск: сахар воспринимается как «менее серьёзная» проблема, чем алкоголь или курение — willingness to pay не верифицирована live-тестом. | [MARKET-RESEARCH §7, §14](./MARKET-RESEARCH.md) · [USER-PERSONAS.md](./USER-PERSONAS.md) |
| 6 | **Техническая реализуемость** (10 = просто) | **7/10** | Стек proven: Expo + Supabase + Claude API. AI cost: $0.007/разговор = < 0.5% от revenue при prompt caching. Нетривиальные части: (a) food database accuracy — Sugarfree провалился именно здесь; (b) trigger prediction ML — нужны 7+ дней данных; (c) ED safety guardrails в AI; (d) community moderation. | [DOMAIN-RESEARCH §6.3](./DOMAIN-RESEARCH.md) · [MARKET-RESEARCH §11.5](./MARKET-RESEARCH.md) |
| 7 | **Уникальность** | **9/10** | Real-time AI craving coaching: нет ни у кого (Sugarfree Q&A — не coaching). Predictive trigger system: нет ни у кого (Noom имеет glucose forecasting, не behavioral triggers). «Eat This Instead» engine: нет ни у кого. Все три дифференциатора — в незанятом квадранте positioning map. | [COMPETITORS §Gap Analysis](./COMPETITORS.md) |

**Средний балл: 8.7 / 10**

---

## 3. Топ-5 инсайтов

### Инсайт 1: Момент тяги — единственный момент, который имеет значение

Все три персоны, все 6 прямых конкурентов, все App Store отзывы сходятся в одном: существующие инструменты работают **до** (общие советы) или **после** (логирование). Никто не помогает в 15:00, когда рука сама тянется к candy bowl. Тяга длится 15–20 минут — именно в это окно нужна интервенция.

> *«My body was like: if we're going to survive this crazy day, we're going to need some help from a chocolate bar. I had no answer to that.»* — Sara Clarke, Newsweek

SOS AI — не просто фича. Это **единственная причина существования продукта**. Без неё Sugar Quit — ещё один трекер.

→ *Источники: [USER-PERSONAS §Common Patterns](./USER-PERSONAS.md) · [COMPETITORS §Gap Analysis](./COMPETITORS.md) · App Store: «there is nothing about what you're going through in each stage» — BillKill02 on Sugarless*

---

### Инсайт 2: Категория в 2026-м — это quit-drinking в 2019-м

Reframe запустился в 2020-м в нише алкоголя. К 2022-му — $10M+ ARR, $12.5M финансирование. Рынок желающих снизить алкоголь — ~15% взрослых. Рынок желающих снизить сахар — **75%**, то есть в 5× больше. При этом суммарные загрузки всех sugar-приложений сегодня — < 300K, что соответствует состоянию quit-drinking ниши до появления Reframe. Волна новых игроков 2025–2026 (STOPPR, Sugarcut, No Sugar Challenge) сигнализирует: нишу «увидели», но никто её ещё не взял.

**Окно:** 12–18 месяцев до того, как появится venture-backed конкурент или Noom добавит sugar-модуль.

→ *Источники: [COMPETITORS §Reframe](./COMPETITORS.md) · [MARKET-RESEARCH §18](./MARKET-RESEARCH.md)*

---

### Инсайт 3: AI cost в 2026-м впервые делает модель финансово жизнеспособной

Claude Haiku: $0.007 за SOS-разговор. С prompt caching (90% hit rate): ~$0.001. 8 разговоров/мес на пользователя = $0.03/мес = **< 0.5% от revenue** ($9.99/мес подписка). Два года назад стоимость была бы в 10–50× выше, делая unlimited AI coaching экономически невозможным. Технологическое окно совпало с рыночным.

→ *Источники: [MARKET-RESEARCH §11.5](./MARKET-RESEARCH.md) · [DOMAIN-RESEARCH §3](./DOMAIN-RESEARCH.md)*

---

### Инсайт 4: Сахар ≠ алкоголь — уникальный продуктовый вызов

Можно отказаться от алкоголя полностью. **Нельзя отказаться от еды.** Сахар скрыт в 60+ названиях на этикетках, в «здоровых» продуктах (йогурт, гранола, соусы, хлеб), в семейных ужинах, в офисных ритуалах. MyFitnessPal до сих пор не умеет отличать added sugar от natural. «Что есть вместо прямо сейчас?» — самый частый неотвеченный вопрос на r/sugarfree.

Это делает Sugar Quit **сложнее Reframe** (нужен food scanner, «Eat This Instead» engine, семейный контекст) — но и **защищённее** (более глубокая персонализация = выше switching costs).

→ *Источники: [MARKET-RESEARCH §6.3](./MARKET-RESEARCH.md) · [USER-PERSONAS §Common Patterns](./USER-PERSONAS.md)*

---

### Инсайт 5: Primary persona — Stress Sarah, но деньги — у Paul

«Stress Sarah» (офисный 3pm craver, 32 года) — primary persona: наибольший сегмент (195M US), дешёвый CAC (TikTok), высокий viral coefficient. Но **Paul (преддиабетик, 45 лет) имеет LTV в 2× выше** ($120–180 vs $60–80) и становится главным при B2B/insurance стратегии. «Challenge Chloe» (26 лет, соцсети) — UGC-движок вирального роста, но высокий churn.

Одновременно обслуживать всех трёх с одним продуктом — возможно, потому что **боль одна**: помощь в момент тяги. Монетизация и marketing mix — разные.

→ *Источники: [USER-PERSONAS §Primary Persona](./USER-PERSONAS.md)*

---

## 4. Риски

### Риск 1: Вход крупного игрока — окно закрывается
- **Вероятность:** Средняя | **Severity:** Высокая
- **Детали:** Noom в ноябре 2025 запустил Diabetes Lifestyle Program + Predictive Glucose Forecasting. В апреле 2026 — партнёрство с b.well (Medicare). MyFitnessPal имеет 200M+ users и может добавить sugar-модуль. Apple Health HealthKit Nutritional Data API (iOS 18.3) уже выделяет сахар отдельной категорией.
- **Митигация:** Data moat: история тяги пользователя непереносима между приложениями. Community lock-in. Стать «THE sugar app» до того, как инкумбенты заметят нишу. Целевой запуск: **январь 2027** с использованием January spike (10× органических установок).

### Риск 2: Retention — структурная проблема health apps
- **Вероятность:** Высокая | **Severity:** Высокая
- **Детали:** Health apps churn 8–15%/мес. При 12% churn LTV = ~$45 при CAC = $25 → LTV:CAC = 1.8× — это на грани. Reframe достиг 3.2M загрузок потому, что алкоголизм — более «серьёзная» проблема с более высокой мотивацией оставаться.
- **Митигация:** Gamification (streaks, community challenges), AI personalization (чем дольше — тем точнее prediction → выше switching costs), stage-based 90-day structure даёт цель, Trigger prediction создаёт «wow moment» на Day 7+ — главный retention hook.

### Риск 3: Расстройства пищевого поведения — юридический и этический риск
- **Вероятность:** Средняя | **Severity:** Высокая
- **Детали:** Персона Chloe уже в binge-restrict цикле. Прецедент: NEDA Tessa чатбот дал вредные советы → остановлен. PMC 2021: диетические приложения «триггерят и усугубляют» симптомы ED.
- **Митигация:** AI guardrails в system prompt (никогда не стыдить, не поддерживать extreme restriction). ED indicator auto-detection. Professional referral при red flags. Clinical психолог в advisory board — **обязателен до launch**.

### Риск 4: Научная контроверсия — «сахарной зависимости не существует»
- **Вероятность:** Средняя | **Severity:** Средняя
- **Детали:** Сахарная зависимость не признана в DSM-5/ICD-11. Westwater et al. 2016: аддиктивный паттерн у животных только при прерывистом доступе + голодании.
- **Митигация:** Позиционирование: «behavior change for sugar habits, backed by neuroscience» — **никогда** «addiction treatment». Цитировать Qin 2025 (Brain & Behavior) и Johns Hopkins RCT 2025. Reframe успешно навигировал идентичный риск с алкоголем.

### Риск 5: Готовность платить — не верифицирована живым тестом
- **Вероятность:** Средняя | **Severity:** Средняя
- **Детали:** Все аналоги в «серьёзных» категориях (алкоголь, никотин, вес). Сахар воспринимается как личный выбор, а не болезнь — это снижает perceived urgency.
- **Митигация:** Landing page validation до начала разработки: > 5% email signup при указании $9.99/мес = зелёный свет. Фрейминг: «$80/год vs $10K+/год лечение диабета» для Paul. Убийственный free tier → SOS experience конвертирует Sarah.

---

## 5. Гипотезы для проверки

### H1: SOS AI конвертирует скептиков лучше, чем статичная panic button
- **Что проверяем:** Real-time conversational AI vs. breathing exercise / static tips в момент тяги
- **Метод:** A/B тест в beta (n ≥ 200 на группу). Метрика: craving defeated rate = % тяг, не приведших к потреблению
- **Порог GO:** SOS AI ≥ 60% craving defeated rate (ожидаемый baseline статичных методов: 20–30%)
- **Источник гипотезы:** [COMPETITORS §Gap Analysis](./COMPETITORS.md) — ни один конкурент не имеет живого AI-коучинга

### H2: Пользователи платят $9.99/мес за sugar-specific app
- **Что проверяем:** Willingness to pay без живого опыта продукта
- **Метод:** Landing page с явной ценой → email signup conversion
- **Порог GO:** ≥ 5% conversion rate (при < 5% — пересмотреть цену или messaging)
- **Источник гипотезы:** [USER-PERSONAS §WTP](./USER-PERSONAS.md) — все 3 персоны заявили готовность, но это self-reported

### H3: Trigger prediction повышает D30 retention
- **Что проверяем:** Персонализированные push-notifications перед предсказанной тягой vs. generic reminders
- **Метод:** Когортный тест. Prediction group (пользователи с 7+ днями данных) vs. control. Метрика: D30 retention
- **Порог GO:** D30 retention с prediction ≥ 35% (индустриальный top quartile: 15–20%)
- **Источник гипотезы:** [MARKET-RESEARCH §13.2](./MARKET-RESEARCH.md) — AI personalization +15–25% к D30

### H4: «Eat This Instead» — наиболее используемая фича после SOS
- **Что проверяем:** Является ли «что есть вместо» #1 неотвеченным вопросом на практике
- **Метод:** Feature usage tracking в beta + exit surveys
- **Порог GO:** ≥ 50% active users используют «Eat This Instead» еженедельно
- **Источник гипотезы:** r/sugarfree анализ + [USER-PERSONAS §Common Patterns](./USER-PERSONAS.md) — «what to eat instead» = самый частый вопрос

### H5: January launch даёт кратный органический буст
- **Что проверяем:** Реальный масштаб January spike для sugar-категории
- **Метод:** Сравнение organic installs январь vs. февраль–март (первый год)
- **Порог GO:** Январь ≥ 3× monthly average последующих месяцев
- **Источник гипотезы:** [MARKET-RESEARCH §2](./MARKET-RESEARCH.md) — `sugar detox`, `quit sugar` — пик в январе каждый год

---

## 6. Рекомендации для MVP

### 6.1 Делать (Build)

| Приоритет | Фича | Почему |
|-----------|------|--------|
| **P0** | SOS AI button — живой диалог | Единственный реальный дифференциатор. Вся причина скачивания |
| **P0** | Daily check-in + streak | Минимальный engagement loop. Кормит prediction engine данными |
| **P0** | 90-day curriculum (первые 14 дней) | Первые 2 недели = withdrawal period, максимальная потребность в поддержке. Retention hook |
| **P1** | «Eat This Instead» engine | #1 неотвеченный вопрос. Начать с curated списка по контексту (офис/дом/кафе), AI-персонализация — позже |
| **P1** | Progress dashboard | Cravings defeated + sugar avoided + days clean + money saved — мотивация через результат |
| **P1** | Community (read + post + challenges) | Retention driver. Можно начать как moderated форум |
| **P2** | Trigger predictor (Day 7+) | Killer feature, но требует 7 дней данных. Внедрить после первой недели онбординга |
| **P2** | Withdrawal timeline guide | «День 3: почему болит голова» — персоны Sarah и Chloe сдаются именно здесь |

### 6.2 Не делать (Don't Build for MVP)

| Что | Почему нет |
|-----|-----------|
| Food scanner с barcode | Sugarfree провалился именно здесь. Требует верифицированной food базы и QA pipeline. Лучше позже и хорошо, чем сейчас и плохо |
| Apple Watch / Wear OS integration | Малая аудитория в Day 1. Добавить в V2 |
| Social sharing / viral mechanics | Преждевременная оптимизация. Сначала — product retention |
| Human coaching tier | Операционно сложно. Только после product-market fit (Year 2) |
| CGM / health device integration | Слишком сложно для MVP. Стратегически важно для Paul — Year 2 |
| Gamification beyond streak | Overengineering. Streak + milestone достаточно для MVP |
| Multilingual / international | US-only для MVP. UK/CA/AU — после product validation |

### 6.3 Монетизация

**Рекомендуемая модель:**

| Tier | Цена | Что включает |
|------|------|-------------|
| **Free** | $0 | 3 SOS AI/мес, трекинг streak, Day 1–7 curriculum, read-only community |
| **Premium** | $9.99/мес или $79.99/год | Unlimited SOS AI, trigger prediction, «Eat This Instead», полный 90-day curriculum, community участие, progress dashboard |
| **Premium+** | $14.99/мес или $119.99/год | Всё выше + human coaching sessions (1×/мес), приоритетный AI, extended analytics |
| **Lifetime** | $149.99 | Для «Challenge Chloe» — конвертирует через FOMO + «я заплатила, значит буду использовать» |

**Почему такая структура:**
- Free tier создаёт wow-moment через SOS — конвертирует лучше любого paywall
- $9.99 подтверждено рынком: I Am Sober ($9.99), Sunnyside ($8.99), Reframe ($8.33)
- Годовой план ($79.99) — снижает churn: пользователь думает «я заплатил за год»
- Lifetime конвертирует Chloe-персону: циклические подписки → одна крупная оплата
- B2B (Year 2): $5–12/сотрудник/мес; ROI > 10:1 для корпоративных wellness программ

**Unit economics цели:**
- Blended CAC: < $25 (organic + TikTok + ASO)
- LTV: $60–120 (в зависимости от персоны)
- LTV:CAC: ≥ 2.5× (цель к Year 2)
- Payback period: < 6 месяцев

---

## 7. Вердикт

### ✅ GO — с обязательными условиями

**Не CAUTIOUS GO. GO.** Данные v2.0 (обновлённые конкуренты, более глубокие персоны, новые научные источники 2025–2026) усиливают уверенность по сравнению с первоначальной оценкой.

**Почему GO:**

| Аргумент | Данные |
|----------|--------|
| Рынок огромен и растёт | TAM $20B, Diet apps CAGR 16.64%, +9% желающих снизить сахар за один год |
| Категория пуста | 6 прямых конкурентов, суммарно < 300K загрузок. Saturation 2/10 |
| Playbook доказан аналогами | Reframe: $10M+ ARR на рынке в 5× меньше. Sunnyside: $23.7M revenue |
| Проблема нейробиологически подтверждена | Avena 2007, Qin 2025 (Brain & Behavior), Johns Hopkins RCT 2025 |
| AI cost жизнеспособен | < 0.5% от revenue. Впервые в истории unlimited AI coaching = реальная бизнес-модель |
| Уникальность высокая | Три дифференциатора (SOS AI + prediction + «Eat This Instead») — в незанятом квадранте |
| Все 3 персоны подтвердили WTP | Sarah, Paul, Chloe — все готовы платить ≥ $9.99/мес |

**Три условия (без них — PAUSE, не NO GO):**

| Условие | Дедлайн | Критерий |
|---------|---------|---------|
| **Landing page validation** | Май 2026 | ≥ 5% email signup при явной цене $9.99/мес |
| **Advisory board (мин. 2 человека)** | Июнь 2026 | Клинический психолог (eating behaviors) + нейроучёный/диетолог подтвердили участие |
| **Regulatory review** | Июнь 2026 | Health-tech attorney подтвердил: claims safe, disclaimers достаточны, ED liability покрыта |

**Почему именно сейчас, а не через год:**
1. Июнь 2026: вероятно появятся первые venture-backed конкуренты в нише
2. Январь 2027 = единственный оптимальный launch window (January sugar detox spike)
3. Noom Diabetes Program + Glucose Forecasting (ноябрь 2025) показывает: крупные игроки увидели аудиторию

**Если условия выполнены → полный GO на разработку. Target: запуск январь 2027.**

---

*Синтез на основе: [Market Research](./MARKET-RESEARCH.md) · [Competitors](./COMPETITORS.md) · [User Personas](./USER-PERSONAS.md) · [Domain Research](./DOMAIN-RESEARCH.md)*
