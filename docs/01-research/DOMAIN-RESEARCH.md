# Исследование предметной области: Sugar Quit

**Дата:** 13 апреля 2026
**Категория:** Health / Behavior Change / Neuroscience
**Companion Documents:** [Market Research](./MARKET-RESEARCH.md), [Competitors](./COMPETITORS.md), [User Personas](./USER-PERSONAS.md)

---

## 1. Ключевые концепции

### 1.1 Как сахар воздействует на мозг

Сахар активирует те же нейронные reward pathways, что и наркотические вещества. Упрощённый цикл:

1. **Потребление сахара** → глюкоза поступает в кровоток
2. **Дофаминовый всплеск** → nucleus accumbens (центр вознаграждения) высвобождает дофамин, создавая ощущение удовольствия
3. **Инсулиновый спайк** → поджелудочная железа выбрасывает инсулин; инсулин также способствует прохождению триптофана через гематоэнцефалический барьер, повышая серотонин (настроение)
4. **Толерантность** → при хроническом потреблении мозг снижает количество дофаминовых рецепторов; требуется БОЛЬШЕ сахара для того же "кайфа"
5. **Crash** → уровень сахара в крови падает, дофамин падает, энергия падает, тяга растёт
6. **Цикл повторяется** → мозг ассоциирует сахар с облегчением, создавая самоподдерживающуюся петлю

**Ключевые структуры мозга:**

| Структура | Роль |
|-----------|------|
| Nucleus accumbens | Центр вознаграждения — высвобождение дофамина и эндорфинов |
| Префронтальная кора | Принятие решений, контроль импульсов |
| Амигдала | Эмоциональные реакции, связь "стресс → тяга" |
| Гипоталамус | Регуляция аппетита |

**Источники:** [Lone Star Neurology](https://lonestarneurology.net/others/how-sugar-spikes-and-crashes-influence-brain-chemistry/), [Nutri.it](https://nutri.it.com/how-does-sugar-impact-your-brain-the-surprising-truth)

### 1.2 Цикл дофамин-инсулин-кортизол (порочный круг стресс-еды)

Это не "проблема силы воли" — это нейрохимическая петля:

```
Стресс → Кортизол ↑ → Аппетит к сладкому ↑ → Сахар → Дофамин ↑ (удовольствие) +
Инсулин ↑ → Crash сахара в крови → Усталость + Тяга → ЕЩЁ САХАР → ...

При хроническом потреблении:
Дисрегуляция HPA-оси → Базальный кортизол ↑ → Инсулинорезистентность →
Больше тяги → Больше сахара → Петля затягивается
```

**Практический вывод для приложения:** Разрыв цикла требует работы одновременно со стрессом (кортизол), вознаграждением (дофамин) И стабильностью сахара в крови (инсулин). Только трекинг граммов не работает.

**Источники:** [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0149763418308613), [Nourishing Meals](https://nourishingmeals.com/2025/05/blood-sugar-cortisol-and-brain-healing-sugar-addiction-cycle)

### 1.3 Сахарная зависимость: что говорит наука

#### Доказательства ЗА

| Исследование | Год | Ключевой вывод |
|-------------|-----|----------------|
| Avena, Rada & Hoebel | 2007 | Прерывистый доступ к сахару вызывает bingeing, withdrawal, cravings — паттерны, идентичные наркозависимости. Одно из самых цитируемых исследований в области |
| Hoebel et al. | 2008 | Ежедневные сахарные запои повторно высвобождают дофамин в nucleus accumbens shell — эффект, аналогичный классическим субстанциям зависимости |
| Qin et al. | 2025 | Обзор в *Brain and Behavior*: сахарная зависимость — "реальное и измеримое состояние, отражающее паттерны мозга и поведения, наблюдаемые при наркозависимости" |
| Gut-Brain Pathway | 2024 | Жир + сахар одновременно создают синергию — значительно больше дофамина, чем каждый по отдельности, что объясняет неодолимую привлекательность junk food |

- Перекрёстная сенсибилизация: крысы с историей сахарных запоев показывают повышенную чувствительность к амфетамину и кокаину
- Хроническое потребление сахара изменяет экспрессию дофаминовых и опиоидных рецепторов
- Изменение Delta FosB в nucleus accumbens — молекулярный маркер зависимости

**Источники:** [PubMed: Avena et al. 2007](https://pubmed.ncbi.nlm.nih.gov/17617461/), [Brain and Behavior: Qin 2025](https://onlinelibrary.wiley.com/doi/full/10.1002/brb3.70338), [ScienceDaily: Gut-Brain 2024](https://www.sciencedaily.com/releases/2024/01/240118122107.htm)

#### Доказательства ПРОТИВ / Контроверсия

- **Не признана в DSM-5 или ICD-11.** ICD-11 добавила "поведенческие зависимости" (гемблинг, гейминг), но НЕ пищевую/сахарную зависимость
- Westwater, Fletcher & Ziauddeen (2016, *European Journal of Nutrition*): аддиктивноподобное поведение у грызунов появляется только при прерывистом доступе + голодании — при свободном доступе эффект исчезает
- Дебат: зависимость от молекулы сахара vs. поведенческий паттерн вокруг гиперпалатабельной еды?
- Некоторые исследователи предпочитают термин "food addiction" или "eating addiction" вместо "sugar addiction"

**Источники:** [Springer: Westwater et al. 2016](https://link.springer.com/article/10.1007/s00394-016-1229-6)

#### Практический вывод

Наука поддерживает концепцию **даже при отсутствии формального диагноза.** Поведенческие паттерны (тяга, bingeing, withdrawal, relapse) реальны и задокументированы. Это именно то, на чём строится приложение — behaviour change, не "лечение зависимости."

### 1.4 Таймлайн отмены сахара

| Фаза | Сроки | Что происходит | Симптомы |
|------|-------|----------------|----------|
| **Острая** | Дни 1-3 | Пик интенсивности. Организм "требует" привычную дозу дофамина | Сильная тяга, головные боли, усталость, раздражительность, "sugar flu" |
| **Адаптация** | Дни 4-7 | Организм начинает перестраиваться. Уровень сахара в крови стабилизируется | Часть симптомов стихает. Mood swings и тяга сохраняются |
| **Улучшение** | Недели 2-4 | Худшие симптомы уходят. Вкусовые рецепторы начинают "перекалибровку" — натуральная еда кажется слаще | Энергия и фокус заметно улучшаются. Снижение вздутия, улучшение кожи |
| **Стабилизация** | Месяцы 1-3 | Новый baseline. Тяга эпизодическая, не постоянная | Случайные тяги, эмоциональные колебания уменьшаются |

**Задокументированные улучшения здоровья:**

| Срок | Улучшение | Источник |
|------|-----------|---------|
| Дни 4-7 | Стабилизация уровня глюкозы в крови | Healthline |
| 2 недели | Снижение калорийности рациона на ~25%; уменьшение вздутия; начало улучшения давления и холестерина | National Geographic |
| 30 дней | Снижение риска гипертонии и болезней сердца; риск T2 диабета снижается до 35% | National Geographic |
| 8 недель | Снижение печёночного de novo lipogenesis на 10.5% (исследование на подростках) | Clinical study |
| 90 дней | Устойчивые улучшения: вес, энергия, кожа, воспалительные маркеры | Multiple sources |

**Вывод для продукта:** 90-дневная программа идеально совпадает с клиническим таймлайном. Первые 7 дней — критический период, где поддержка важнее всего.

**Источники:** [AddictionHelp](https://www.addictionhelp.com/sugar/withdrawal-symptoms/), [National Geographic](https://www.nationalgeographic.com/science/article/health-benefits-of-reducing-sugar), [Healthline](https://www.healthline.com/nutrition/30-days-no-sugar)

### 1.5 Нормы потребления сахара

| Организация | Рекомендация | Детали |
|-------------|-------------|--------|
| **AHA** | Мужчины: ≤36g/день (9 ч.л.). Женщины: ≤25g/день (6 ч.л.) | Дети и подростки: <6 ч.л./день + ≤8 oz сладких напитков/нед |
| **WHO** | Сильная рекомендация: <10% калорий. Условная: <5% (~25g/день) | "Свободные сахара" = все добавленные + мёд, сиропы, фруктовые соки |
| **US DGA 2025-2030** | ≤10g добавленного сахара на приём пищи | Дети до 10 лет: избегать добавленного сахара. До 4 лет: полностью исключить |

**Реальность:** Средний американец потребляет 71g/день — почти **тройная** норма WHO.

**Источники:** [AHA](https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sugar/how-much-sugar-is-too-much), [WHO Guideline](https://www.who.int/publications/i/item/9789241549028), [Harvard Nutrition Source](https://nutritionsource.hsph.harvard.edu/2026/01/09/dietary-guidelines-for-americans-2025-2030/)

### 1.6 Шкала Yale Food Addiction Scale (YFAS 2.0)

**YFAS 2.0** — 35-пунктный инструмент, маппящий симптомы пищевой зависимости на критерии DSM-5 для расстройств, связанных с употреблением веществ.

- **Надёжность:** Pooled alpha = 0.85 (мета-анализ 65 исследований, медианный n=451)
- **Распространённость пищевой зависимости по YFAS 2.0:**
  - Общая популяция: 8.2%-22.2%
  - Пре-бариатрические пациенты: 47.4%
  - Тяжёлая форма (6+ симптомов): 6.6%

Это не диагноз, но исследовательский инструмент, который можно использовать в образовательном контенте.

**Источники:** [Wiley: YFAS Meta-analysis 2025](https://onlinelibrary.wiley.com/doi/10.1111/obr.13881), [PubMed: Prevalence](https://pubmed.ncbi.nlm.nih.gov/34953001/)

---

## 2. Экспертные источники

### 2.1 Ключевые исследователи

| Эксперт | Аффилиация | Область | Значимость |
|---------|-----------|---------|------------|
| **Dr. Nicole Avena** | Icahn School of Medicine at Mount Sinai; Princeton University | Нейронаука пищевой зависимости | 100+ публикаций. Соавтор основополагающей работы 2007 года. Автор книги *Sugarless* (2023). Идеальный кандидат в advisory board |
| **Dr. Robert Lustig** | UCSF, Professor Emeritus | Детская эндокринология, метаболизм фруктозы | "Sugar: The Bitter Truth" — 5M+ просмотров на YouTube. Тезис "фруктоза = токсин" спорный, но влиятельный. Президент Institute for Responsible Nutrition |
| **Bart Hoebel** | Princeton (скончался) | Пионер гипотезы сахарной зависимости | Вместе с Avena и Rada доказал, что сахарные запои высвобождают дофамин по паттерну наркозависимости |
| **Kay Tye** | MIT, Picower Institute | Компульсивное seeking поведение | Идентифицировала, как мозг кодирует компульсивный поиск сахара — отдельно от нормального питания |
| **Jeff Grimm** | (USA) | Инкубация тяги | 5,000+ цитирований, ~$2M грантов NIH. Обнаружил, что тяга к сахару РАСТЁТ с абстиненцией — как у кокаина/героина |

### 2.2 Ключевые публикации для цитирования

| # | Публикация | Зачем использовать |
|---|-----------|-------------------|
| 1 | Avena, Rada & Hoebel (2007) — "Evidence for sugar addiction" | Основополагающая работа. Самая цитируемая в области |
| 2 | Qin et al. (2025) — "Sugar Addiction: Neural Mechanisms" | Самый свежий обзор. Подтверждает реальность феномена |
| 3 | Westwater et al. (2016) — "Sugar addiction: state of the science" | Контраргумент. Цитировать для научной честности |
| 4 | YFAS 2.0 Meta-analysis (2025) | Распространённость пищевой зависимости — конкретные цифры |
| 5 | Johns Hopkins AI DPP RCT (2025) | AI-приложение ≈ человеческой программе — validation для Sugar Quit |

### 2.3 Организации-стандарты

| Организация | Что использовать | Ссылка |
|-------------|-----------------|--------|
| American Heart Association (AHA) | Нормы добавленного сахара (25-36g/день) | [heart.org](https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sugar/added-sugars) |
| WHO | Глобальная рекомендация <10% калорий | [who.int](https://www.who.int/publications/i/item/9789241549028) |
| American Diabetes Association (ADA) | Standards of Care 2026. Рекомендует воду вместо сладких напитков, средиземноморский стиль питания | [diabetes.org](https://professional.diabetes.org/standards-of-care) |
| CDC | Статистика потребления сахара, программа Diabetes Prevention | [cdc.gov](https://www.cdc.gov/nutrition/php/data-research/added-sugars.html) |
| USDA/HHS | Dietary Guidelines 2025-2030 | [dietaryguidelines.gov](https://nutritionsource.hsph.harvard.edu/2026/01/09/dietary-guidelines-for-americans-2025-2030/) |

---

## 3. Регуляторика

### 3.1 FDA: Wellness App vs. Medical Device

**Ключевое обновление — январь 2026:** FDA выпустила обновлённые руководства:

1. **General Wellness Policy for Low-Risk Devices:** Статус продукта определяется тем, **как он рекламируется и продвигается**, а не тем, предоставляет ли он данные, "ассоциированные" с заболеваниями
2. Неинвазивные wearables, измеряющие активность, сон, пульс, fitness-метрики — квалифицируются как low-risk wellness products **при условии, что claims избегают ссылок на болезни**

**Sugar Quit безопасно попадает в wellness-категорию при соблюдении правил ниже.**

**Источники:** [AHA News](https://www.aha.org/news/headline/2026-01-06-fda-issues-guidance-wellness-products-clinical-decision-support-software), [Ropes & Gray](https://www.ropesgray.com/en/insights/alerts/2026/01/fda-adapts-with-the-times-on-digital-health-updated-guidances-on-general-wellness-products), [FDA Guidance](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/general-wellness-policy-low-risk-devices)

### 3.2 Что МОЖНО и НЕЛЬЗЯ заявлять

| ✅ МОЖНО | ❌ НЕЛЬЗЯ |
|----------|----------|
| "Отслеживайте потребление сахара" | "Лечит сахарную зависимость" |
| "Формируйте здоровые привычки питания" | "Излечивает диабет" |
| "Управляйте тягой к сладкому" | "Клинически доказано снижает сахар в крови" |
| "Поддерживает ваши wellness-цели" | "Диагностирует" любое состояние |
| "AI-коуч для изменения пищевых привычек" | "Лечение зависимости" |
| "Backed by neuroscience" | "Медицинское вмешательство" |
| "Помогает снизить потребление добавленного сахара" | "Предотвращает болезни сердца" |

**Правило:** Одна чрезмерная claim может переклассифицировать wellness-приложение в медицинское устройство.

**Прецеденты:**
- **Lumosity (2015):** $2M штраф FTC за необоснованные claims о brain training
- **WHOOP (июль 2025):** FDA Warning Letter за маркетинг "Blood Pressure Insights" без clearance
- **AcneApp / Acne Pwner:** FTC action за claims о "лечении" акне

### 3.3 FTC: Требования к маркетингу health apps

- Все health-related claims должны иметь "appropriate substantiation" — научное подтверждение
- Claims о профилактике/лечении болезней требуют "significant scientific agreement" — обычно RCT
- **FTC Health Breach Notification Rule (обновлено июль 2024):** Расширено на health apps и wellness-технологии
  - "Breach" включает передачу health-данных без авторизации — НЕ только кибератаки
  - Dark patterns не считаются "meaningful choice" для consent
  - Передача health-данных рекламодателям вопреки privacy policy = breach
  - Уведомление: **60 календарных дней** при breach 500+ пользователей
- **Прецеденты:** FTC преследовала GoodRx и Premom за передачу health-данных рекламодателям

**Источники:** [FTC Health Claims](https://www.ftc.gov/business-guidance/advertising-marketing/health-claims), [FTC HBNR](https://www.ftc.gov/business-guidance/blog/2024/04/updated-ftc-health-breach-notification-rule-puts-new-provisions-place-protect-users-health-apps)

### 3.4 HIPAA

- **Большинство wellness-приложений НЕ подпадают под HIPAA.** HIPAA применяется только когда приложение разработано для/предоставлено covered entity (healthcare provider, health plan) или обрабатывает PHI от их имени
- Если Sugar Quit НЕ интегрируется с EHR-системами — HIPAA скорее всего не применяется
- **Но:** Best practice — обращаться с health-данными на уровне HIPAA даже без юридического обязательства
- SOC 2 compliance roadmap рекомендуется для B2B wellness продаж (корпоративные клиенты требуют)

**Источники:** [HHS Resources for Mobile Health Apps](https://www.hhs.gov/hipaa/for-professionals/special-topics/health-apps/index.html)

### 3.5 GDPR / Европейские данные о здоровье

- Health data = **"special category" данные по Статье 9 GDPR** — требуется **explicit consent** (не стандартное согласие)
- Consent должен быть: свободно данным, специфичным, информированным, однозначным, задокументированным, отзываемым
- **European Health Data Space (EHDS)** принят 11 февраля 2025, вступил в силу 26 марта 2025
  - Общие положения: 26 марта 2027
  - Primary use rules: 26 марта 2029
  - Wellness app data включена в scope EHDS
- Статья 32 GDPR: шифрование, псевдонимизация, сетевая безопасность, бэкапы

**Для Sugar Quit на EU-рынке:** Explicit consent на обработку health-данных + encryption + data minimization. При launch — US only, EU позже.

**Источники:** [Taylor Wessing](https://www.taylorwessing.com/en/global-data-hub/2025/eu-digital-laws-and-gdpr/gdh---european-health-data-space-and-the-gdpr)

### 3.6 App Store Policies

**Apple App Store:**
- Health apps: **accurate information**, запрет misleading claims
- Medical apps: **усиленная проверка**
- Health-related data: **запрещено** использовать для рекламы
- Health data: **запрещено** хранить в iCloud
- 2025: Новые правила AI transparency и возрастных рейтингов

**Google Play:**
- Аналогичные требования к accuracy health claims
- 2026: App Store Accountability Acts — safeguards для возрастной верификации, parental consent, data minimization (эффективно с 1 января 2026)

**Источники:** [Dash Solutions](https://blog.dashsdk.com/app-store-requirements-for-health-apps/), [FKKS](https://technologylaw.fkks.com/post/102lxsp/countdown-to-jan-1-2026-mobile-developers-must-adopt-apple-google-apis-to-com)

### 3.7 Sugar Taxes (глобальный контекст)

- **118 налогов на SSB глобально:** 105 национальных, 13 субнациональных (World Bank)
- **17 европейских стран** взимают налог на сладкие напитки
- Tiered taxes (ставка зависит от содержания сахара): 53%. Единая ставка: 47%
- WHO 2025: многие sugar taxes "слишком низки и не учитывают инфляцию"
- **UK Sugar Tax (SDIL):** привёл к снижению содержания сахара в напитках на 46%
- Тренд усиливается: Mexico, Latvia, France, UAE, Thailand обновили ставки; Jamaica вводит sugar tax в мае 2026

**Источники:** [WHO Global SSB Tax Report 2025](https://www.who.int/publications/i/item/9789240118942), [World Bank SSB Tax Database](https://ssbtax.worldbank.org/)

---

## 4. Контент-стратегия: построение доверия

### 4.1 Как лидеры строят научную кредибильность

| Приложение | Стратегия доверия | Результат |
|-----------|-------------------|-----------|
| **Noom** | 50+ peer-reviewed публикаций, 10+ academic collaborations. Первое мобильное приложение с CDC Diabetes Prevention Program certification (2017). CDC Full Plus Recognition (2024) — одна из 11 цифровых программ в США | Золотой стандарт кредибильности. RCT (N=202): 64% completers потеряли >5% веса |
| **Reframe** | "Neuroscience-based." Партнёрство с Emory и Harvard University. Научный совет, программа с участием "сотен экспертов". 91% пользователей снизили алкоголь за 3 месяца | Self-reported данные (нет независимых RCT), но бренд-кредибильность высока |
| **Headspace** | 25 peer-reviewed исследований. Цитирует Chief Strategy and Science Officer | Исследователи University of Washington нашли inconsistent results в 8 проверенных исследованиях — но это не остановило рост |

**Источники:** [Noom Research](https://www.noom.com/research/), [Reframe About](https://www.joinreframeapp.com/about), [Advisory.com](https://www.advisory.com/daily-briefing/2020/08/14/mindfulness-app)

### 4.2 Фреймворк Transparency for Trust (T4T)

Четыре принципа, повышающих доверие к health apps:

1. **Privacy & Data Security** — прозрачная политика, шифрование, контроль пользователя
2. **Development Practices** — кто создал, какие эксперты вовлечены, какой процесс
3. **Feasibility** — реалистичность обещаний, honest messaging
4. **Health Benefits** — evidence видим at the point of download (App Store описание, landing page)

**Источники:** [JMIR: T4T Principles](https://www.jmir.org/2019/5/e12390/)

### 4.3 Конкретный план для Sugar Quit

| Элемент | Действие | Приоритет |
|---------|----------|-----------|
| **/science page** | Страница на сайте с ссылками на исследования, профилями advisory board | До launch |
| **Advisory board** | 3-5 экспертов (см. раздел 2.1). Их имена на /science page = 10x ROI от компенсации | До launch |
| **Disclaimers** | "Не является медицинским советом. Не заменяет консультацию врача" — на всех экранах с AI-советами | До launch |
| **In-app citations** | Каждый урок 90-day curriculum ссылается на конкретное исследование | До launch |
| **Pilot study** | 500 beta-users, pre/post метрики (sugar intake, cravings/week, energy level). Даже без control group — publishable в JMIR формате | 6 мес после launch |
| **App Store description** | "Backed by neuroscience. Built with experts." + конкретные цифры (75% Americans want to reduce sugar) | До launch |

### 4.4 Язык и тон

| ✅ Использовать | ❌ Избегать |
|----------------|------------|
| "Sugar habits" | "Sugar addiction" (в claims) |
| "Cravings" / "тяга" | "Dependence" / "зависимость" (в claims) |
| "Behavior change" | "Treatment" / "лечение" |
| "Backed by neuroscience" | "Clinically proven" (без RCT) |
| "Healthier relationship with sugar" | "Cure" / "излечение" |
| "AI coach" | "AI therapist" / "AI doctor" |
| "Progress, not perfection" | Shaming language, guilt |
| "Reduce" / "снизить" (также "quit" — допустимо) | "Eliminate forever" / абсолютные обещания |

---

## 5. Ограничения и риски

### 5.1 Eating Disorders — Главный клинический риск

**Проблема:** Диетические и фитнес-приложения "триггерят и усугубляют симптомы расстройств пищевого поведения, фокусируясь на квантификации, стимулируя чрезмерное использование, и предоставляя определённые типы обратной связи" (PMC 2021).

**Прецедент Tessa (NEDA):** Терапевтический чатбот NEDA (National Eating Disorders Association) имел генеративный AI-компонент, который erroneously начал давать советы по диете и поощрять похудение → был приостановлен. **Прямое предупреждение для Sugar Quit.**

**Конкретные риски для наших персон:**
- **Chloe (binge-restrict):** Уже в цикле. AI НЕ ДОЛЖЕН поддерживать extreme restriction. "30-дневный sugar-free challenge" может усилить binge-restrict паттерн
- Использование weight loss как proxy для здоровья увеличивает риск
- Rigid food tracking / калорий-counting — триггер для susceptible populations

**Митигация:**

| Мера | Реализация |
|------|-----------|
| AI safety guardrails | Никогда не стыдить. Никогда не поддерживать extreme restriction. "Reduction, not perfection" |
| Anti-pattern detection | Автоматическое выявление ED-индикаторов в тексте (extreme restriction language, purging, "I binged and feel awful") |
| Professional referral | Автоматический redirect к профессиональной помощи при red flags |
| Advisory board | Клинический психолог, специализирующийся на eating behaviors — обязателен |
| Content review | Все AI system prompts и curriculum — review на ED risk перед launch |
| Moderation option | Поддержка "gradual reduction", не только "cold turkey" |

**Источники:** [PMC: Effects of Diet Apps on ED](https://pmc.ncbi.nlm.nih.gov/articles/PMC8485346/), [Harvard: AI and Eating Disorders](https://hsph.harvard.edu/news/artificial-intelligence-tools-offer-harmful-advice-on-eating-disorders/), [Within Health: AI Bias](https://withinhealth.com/explore-articles/uncovering-the-bias-problem-ai-and-disordered-eating)

### 5.2 AI Nutritional Advice — Юридические и этические риски

- AI-модели, обученные на интернет-тексте, отражают вредные социальные biases о весе, диете, body image
- AI предлагал диеты с 700 калориями меньше, чем диетологи для подростков — потенциально опасно
- AI nutrition advice может influence harmful behaviors (рвота после еды, слабительные)

**Митигация:**
- AI system prompt с жёсткими guardrails
- Никогда не давать конкретных медицинских рекомендаций
- "Eat This Instead" предлагает альтернативы, не медицинские диеты
- Escalation triggers: self-harm language, ED indicators, medical emergency signs
- Disclaimer на каждом AI-экране

**Источники:** [Nutrition Insight](https://www.nutritioninsight.com/news/ai-teen-nutrition-risk-eating-disorders.html)

### 5.3 Когда приложение ДОЛЖНО направить к врачу

| Ситуация | Действие |
|----------|----------|
| Упоминание extreme caloric restriction | Popup: ресурсы профессиональной помощи |
| Signs of disordered eating | Предложить связаться со специалистом + ресурсы |
| Blood sugar instability (для пре-диабетиков) | "Обратитесь к вашему эндокринологу для мониторинга" |
| Mental health crisis indicators | Кризисная линия + предложение обратиться к психологу |
| Persistent severe symptoms (>2 weeks withdrawal) | "Проконсультируйтесь с врачом — это может быть не связано с сахаром" |

### 5.4 Культурная чувствительность

- Еда имеет глубокое культурное, социальное, эмоциональное значение
- AI, обученный на Western dietary norms, может не отражать diverse food traditions
- Нельзя подразумевать, что культурно значимые продукты "inherently unhealthy"
- "Семейный десерт" Пола — не "проблема", а контекст, с которым нужно работать
- Фреймить: "выбор альтернатив", а не "отказ от традиций"

### 5.5 Технические ограничения

| Ограничение | Влияние | Решение |
|-------------|---------|---------|
| Food database accuracy | Sugarfree провалился именно здесь ("every item I scan has wrong information") | Open Food Facts + curated corrections + user reports. Не launch scanner до готовности quality pipeline |
| Added vs. natural sugar distinction | MyFitnessPal не может — годами. Технически сложно | AI-based classification + curated database. Лучше честно показать "неизвестно", чем ошибиться |
| On-device ML prediction | Требует 7+ дней данных для начала работы | Day 1-7: generic timing alerts. Day 7+: personalized predictions. Transparent communication |
| AI hallucinations | AI может выдумать nutritional facts | Retrieval-augmented generation (RAG) + verified food database. Не генерировать nutrition facts "из головы" |

---

## 6. Доказательная база: что работает в digital health

### 6.1 Эффективность цифровых вмешательств

| Исследование | Дизайн | Результат |
|-------------|--------|-----------|
| **Meta-analysis 2026** (52 статьи, N=24,652) | Цифровые вмешательства для изменения пищевого поведения | Малый, но статистически значимый эффект: **d=0.33** (95% CI 0.25-0.42, P<.001). Сильнее у молодых взрослых (d=0.46) |
| **Johns Hopkins AI DPP RCT (2025)** | Phase III RCT: AI-приложение vs. человеческие программы diabetes prevention | AI-приложение соответствует CDC benchmarks **на уровне, сравнимом с human-led программами** |
| **SSB Reduction RCT** | Digital behavioral intervention для снижения сладких напитков | Эффективно снижает SSB consumption. Через 6 мес — значимое снижение веса vs control |
| **Noom DPP RCT (N=202)** | Мобильный DPP vs. usual care | 56% начавших и 64% completers потеряли >5% веса за 24 недели |
| **AI + CGM App (944 users)** | AI-рекомендации + continuous glucose monitoring | Здоровые: time in range 74.7% → 85.5%. T2 diabetes: 49.7% → 57.4% |

**Вывод:** d=0.33 — реальный и publishable эффект. Johns Hopkins RCT — прямая validation для AI-powered behavior change apps.

**Источники:** [JMIR 2026](https://www.jmir.org/2026/1/e80821), [Johns Hopkins](https://www.hopkinsmedicine.org/news/newsroom/news-releases/2025/10/ai-powered-diabetes-prevention-program-shows-similar-benefits-to-those-led-by-people), [Nature](https://www.nature.com/articles/s41746-025-01430-7)

### 6.2 Evidence-Based техники для Sugar Quit

| Техника | Уровень доказательности | Применение в Sugar Quit | Источник |
|---------|------------------------|------------------------|---------|
| **CBT** | Сильный — gold standard для behavior change. Средний значимый эффект для lifestyle changes | Core framework для curriculum и AI conversations. Идентификация мыслительных паттернов, challenge cognitive distortions | [Nature 2023](https://www.nature.com/articles/s41598-023-40141-5) |
| **Mindfulness** | Сильный — meta-analysis: снижение сладкого g=-0.39 (p<.001). Craving intensity: g=0.28 | "Surf the urge" техника в SOS. Guided mindfulness при тяге. Daily mindfulness check-ins | [PMC 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11791380/) |
| **Habit Substitution** | Сильный — замена поведения эффективнее устранения | "Eat This Instead" engine. Новые рутины в триггерные моменты | Evidence-based framework |
| **Implementation Intentions** | Сильный — "if-then" планирование значительно улучшает adherence | "Если тяга в 3pm → алминдаль + 5 мин прогулка". AI помогает строить if-then планы | Gollwitzer (1999) |
| **Self-Monitoring** | Сильный — трекинг сам по себе снижает target behavior на 15-30% | Daily check-ins, craving logs, sugar intake tracking, progress dashboard | Meta-analytic evidence |
| **Social Support** | Средне-Сильный — 40% успешно бросивших курить кредитуют peer support (CDC) | Community, accountability partners, shared challenges | CDC data |

### 6.3 Behavior Change Frameworks

**COM-B Model** (Capability, Opportunity, Motivation → Behavior):
- Для общей архитектуры 90-day программы
- Capability: знания (curriculum) + навыки (coping techniques)
- Opportunity: "Eat This Instead" (physical), community (social)
- Motivation: AI coaching (reflective), streaks/gamification (automatic)

**Fogg Behavior Model** (Motivation × Ability × Prompt → Behavior):
- Для дизайна отдельных фич
- SOS button = Prompt в момент, когда Motivation высока (тяга), и Ability сделана лёгкой (одно нажатие)
- Daily check-in = Prompt (push notification) + Ability (30 секунд) + Motivation (streak не потерять)

**6 техник наиболее ассоциированных с engagement в mHealth:**
1. Goal setting
2. Self-monitoring of behavior
3. Feedback on behavior
4. Prompts/cues
5. Rewards
6. Social support

**Все 6 присутствуют в дизайне Sugar Quit.**

**Источники:** [The Decision Lab: COM-B](https://thedecisionlab.com/reference-guide/organizational-behavior/the-com-b-model-for-behavior-change), [PMC: BCTs and Engagement](https://pmc.ncbi.nlm.nih.gov/articles/PMC10545861/)

---

*Данный документ следует читать совместно с [Market Research](./MARKET-RESEARCH.md) для рыночных данных, [Competitors](./COMPETITORS.md) для конкурентного ландшафта, и [User Personas](./USER-PERSONAS.md) для понимания целевой аудитории.*
