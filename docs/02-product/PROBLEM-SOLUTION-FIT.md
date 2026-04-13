# Problem-Solution Fit: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** Product Definition (Stage 2)
**Источники:** [Research Brief](../01-research/RESEARCH-BRIEF.md), [Market Research](../01-research/MARKET-RESEARCH.md), [Competitors](../01-research/COMPETITORS.md), [Domain Research](../01-research/DOMAIN-RESEARCH.md)

---

## 1. Проблема

### 1.1 Какая боль?

**195 миллионов американцев хотят снизить потребление сахара — но в момент тяги у них нет инструмента, который помог бы не сорваться.**

Конкретно:
- Средний американец потребляет **71g добавленного сахара в день** — почти **3x нормы WHO** (25g) ([Market Research](../01-research/MARKET-RESEARCH.md), раздел 1.1)
- **75%** американцев (IFIC 2025) активно пытаются ограничить сахар — рост с 66% в 2024
- Сахар активирует **те же дофаминовые reward pathways**, что и наркотики ([Domain Research](../01-research/DOMAIN-RESEARCH.md), раздел 1.1). Это не "слабая воля" — это нейрохимия
- Тяга длится **15-20 минут**, но ощущается непреодолимой. Все существующие инструменты работают **ретроспективно** (после еды) или **превентивно** (общие советы)

### 1.2 Насколько она острая?

| Измерение | Данные |
|-----------|--------|
| **Frequency** | Ежедневно. Sarah — 3pm каждый день. Paul — каждый обед + каждый ужин. Chloe — еженедельные binge-циклы |
| **Severity** | Высокая. Преддиабет (A1C 5.8+), набор веса, emotional distress, цикл guilt-shame-binge |
| **Экономическая цена** | Диабет: $412.9B/год в США (ADA 2022). Ожирение: $1.4T/год (OMA). Per-person: $5,477/год для людей с ожирением vs $2,696 для нормального веса |
| **Emotional cost** | "I feel like a failure every single day" — типичная реакция на r/sugarfree |
| **Frequency x Severity Score** | **9/10** — ежедневная проблема с серьёзными долгосрочными последствиями для здоровья |

### 1.3 Как люди решают её сейчас?

| Текущее решение | Охват | Проблема |
|-----------------|-------|----------|
| **Willpower / "просто не ем"** | ~60% пытающихся | Не работает в момент тяги. Prefrontal cortex отключается при стрессе и low blood sugar |
| **MyFitnessPal** | ~100M users глобально | Показывает проблему (80g сахара), но не предлагает решение. Не различает added vs natural sugar |
| **Whole30 / keto / challenge** | ~15% пытающихся | All-or-nothing. Работает 10-30 дней → cliff edge → срыв → стыд |
| **I Am Sober** | 10M+ downloads | Generic — не создан для сахара. Craving tools = только медитация |
| **Reddit r/sugarfree** | 100K+ участников | Неструктурированно, нет персонализации, нет помощи в реальном времени |
| **Sugar-specific apps** | <200K загрузок суммарно | Лидер (Sugarfree): food database с ошибками, chatbot = Q&A, нет structured program |
| **Диетолог / врач** | ~5% обращаются | "Ешьте меньше сахара" — нет конкретного плана. $150-300/визит |

### 1.4 Почему текущие решения не работают?

**Ни одно существующее решение не помогает в МОМЕНТ тяги:**

```
Timeline проблемы:
                                                          
  [Превентивное]     [МОМЕНТ ТЯГИ]       [Ретроспективное]
       ↓                   ↓                     ↓
  Общие советы        ❌ ПУСТО ❌           Трекинг после еды
  Curriculum          Никого нет           "Вы съели 80g сахара"
  Meal planning       Willpower fails      Guilt + shame
                      ↓
                    СРЫВ
```

**Что не так с каждым подходом:**

| Подход | Failure Mode |
|--------|-------------|
| Трекеры (MFP, Sugarfree) | Документируют проблему, не решают. "I can see the 80g, now what?" |
| Challenges (Whole30, TikTok) | Мотивируют 30 дней → Day 31 = обрыв. Нет долгосрочной стратегии |
| Panic buttons (Sugarless, Sugarcut) | Static: показывают дыхательное упражнение. Не персонализированы, не знают контекст |
| Generic sobriety apps (I Am Sober) | Не sugar-specific: нет альтернатив еды, нет sugar education, нет food scanning |
| Willpower | Нейрохимия побеждает рацио. В 3pm при low blood sugar + cortisol → prefrontal cortex проигрывает |

---

## 2. Наше решение

### 2.1 Ключевое обещание

**Sugar Quit — первый AI-коуч, который разговаривает с вами в момент тяги к сахару и предсказывает, когда она наступит.**

### 2.2 Value Proposition

> **Для** офисных работников и людей, контролирующих здоровье, **у которых** ежедневная тяга к сахару побеждает силу воли, **наш** AI-powered sugar coach **позволяет** побеждать тягу в реальном времени через персонализированный разговор и предсказание триггеров, **в отличие от** трекеров (MyFitnessPal) и generic sobriety apps (I Am Sober), **потому что** мы единственные, кто сочетает real-time AI craving coaching + predictive triggers + sugar-specific food alternatives.

### 2.3 Три главных дифференциатора

| # | Дифференциатор | vs Конкуренты | Источник |
|---|---------------|---------------|---------|
| 1 | **SOS AI Craving Coach** — персонализированный разговор в момент тяги. AI знает ваши паттерны, предлагает конкретные альтернативы, даёт эмоциональную поддержку | Sugarless: static breathing exercise. I Am Sober: generic meditation. Reframe Melody: только алкоголь | [Competitors](../01-research/COMPETITORS.md), Gap Analysis #1 |
| 2 | **Predictive Trigger System** — ML-модель предсказывает тягу за 15-30 мин и отправляет preemptive nudge: "Через 30 минут у тебя обычно тяга. Вот твой план" | Ни один конкурент не имеет trigger prediction. Все работают реактивно | [Competitors](../01-research/COMPETITORS.md), Gap Analysis #2 |
| 3 | **"Eat This Instead" Engine** — персонализированные альтернативы еды с учётом контекста (что доступно, что работало раньше, что нравится). "Ты хочешь шоколад? Попробуй X" | MyFitnessPal: не различает added/natural sugar. Sugarfree: food database с ошибками. Никто не предлагает альтернативы в контексте | [Competitors](../01-research/COMPETITORS.md), Gap Analysis #3 |

### 2.4 "Aha-moment"

**Момент, когда пользователь понимает ценность Sugar Quit:**

> В 3:15pm у Sarah звонит push: "Я заметил, что по средам после team meeting у тебя обычно тяга. Она придёт через ~15 минут. У тебя есть миндаль на столе — попробуй горсть + 5 минут прогулки. Или нажми SOS, если нужна помощь."
>
> Sarah нажимает SOS. AI спрашивает: "Что ты сейчас чувствуешь?" → "Устала после meeting" → AI: "Понимаю. Энергетический спад после долгих встреч — это нормально, это не слабость. Давай попробуем X вместо candy bowl. В прошлый раз это сработало для тебя." → Тяга проходит.
>
> **"Holy shit, it actually knew I was going to crave sugar before I did."**

Этот момент наступает между **Day 7 и Day 14** — когда prediction engine накопил достаточно данных. Для Day 1-7 "aha-moment" — первый успешный SOS-разговор, который побеждает тягу.

---

## 3. Validation Checklist

### Проблема

- [x] **Проблема подтверждена данными** — 75% американцев хотят снизить сахар (IFIC 2025). 53% потребляют избыточный сахар (CDC/NHANES). r/sugarfree 100K+ участников. Сахар активирует reward pathways — Avena et al. 2007, Qin et al. 2025
- [x] **Проблема ежедневная и острая** — ежедневные тяги, долгосрочные последствия: диабет ($412.9B/год), ожирение ($1.4T/год), emotional distress
- [x] **Текущие решения неадекватны** — ни один инструмент не помогает в момент тяги. Лидер категории (Sugarfree) — 806 iOS-отзывов с жалобами на food database

### Аудитория

- [x] **Аудитория достаточно большая** — TAM ~$20B. SAM ~$1.76B (US/UK/Canada/Australia). 195M американцев хотят снизить сахар ([Market Research](../01-research/MARKET-RESEARCH.md), раздел 9)
- [x] **Аудитория готова платить** — Все 3 персоны подтвердили WTP $9.99+/мес. Benchmark: Reframe $14/мес (3.2M downloads), Sunnyside $12/мес ($23.7M revenue), I Am Sober $9.99/мес (10M+ downloads)
- [x] **Каналы привлечения ясны** — TikTok/Instagram для Sarah/Chloe, Google Search/Doctor referral для Paul. January launch = 10x organic installs

### Конкуренция

- [x] **Конкурентов можно обойти** — Market Saturation Score: 2/10. Все sugar-specific apps суммарно <200K загрузок. Нет venture-funded игрока. AI SOS + Prediction + "Eat This Instead" — ни у кого из конкурентов ([Competitors](../01-research/COMPETITORS.md), раздел 7)
- [x] **Playbook доказан** — Reframe (alcohol): $10M+ ARR, 3.2M downloads, $12.5M funding. Sunnyside: $23.7M revenue, $14.6M funding. Формула: curriculum + AI + community + gamification

### Техническая реализация

- [x] **Стек proven** — React Native + Supabase + Claude API. Технологии зрелые, проверенные в production ([Domain Research](../01-research/DOMAIN-RESEARCH.md))
- [x] **AI costs жизнеспособны** — Claude Haiku 4.5: $0.007/разговор = 1.8% от revenue при $9.99/мес подписке. С prompt caching — $0.003 ([Market Research](../01-research/MARKET-RESEARCH.md), раздел 14.1)
- [x] **Evidence-based techniques** — CBT (gold standard), mindfulness (снижение сладкого g=-0.39), habit substitution, self-monitoring (снижение target behavior на 15-30%) — все с сильной доказательной базой ([Domain Research](../01-research/DOMAIN-RESEARCH.md), раздел 6.2)
- [ ] **Prediction ML требует данных** — 7+ дней данных для начала. Решение: Day 1-7 generic timing alerts, Day 7+ personalized predictions

### Риски (manageable)

- [ ] **Willingness to pay не проверена в production** — сахар воспринимается как "менее серьёзная" проблема, чем алкоголь. Тест: landing page с ценой → email signup conversion >5%
- [ ] **Eating disorder liability** — Chloe-персона в binge-restrict цикле. AI guardrails + advisory board + professional referral — обязательны до launch
- [ ] **Retention** — Health apps churn 8-15%/мес. Митигация: gamification + community + AI personalization + stage-based curriculum

---

## 4. Problem-Solution Mapping

| Проблема | Решение Sugar Quit | Как это лучше существующего |
|----------|-------------------|---------------------------|
| Тяга побеждает в реальном времени | SOS AI — разговор в момент тяги | Статичные panic buttons → динамический AI-разговор |
| "Что есть вместо?" | "Eat This Instead" engine | Generic "выпей воды" → персонализированные альтернативы |
| Тяга непредсказуема | Predictive triggers — push за 15-30 мин | Реактивный подход → проактивный |
| Withdrawal без поддержки (Day 1-7) | 90-day curriculum с day-by-day гайдом | "Удачи!" → "Вот что ожидать сегодня" |
| Одиночество в борьбе | Moderated sugar-specific community | r/sugarfree (хаос) → структурированная поддержка |
| Стыд после срыва | AI с эмпатичным тоном, "progress not perfection" | Shaming trackers → поддерживающий коуч |
| Информационный шум | Одна структурированная 90-дневная программа | 1000 статей в Google → один план |

---

*Данный документ основан на данных Research Stage. Каждый факт имеет прямую ссылку на источник в docs/01-research/.*
