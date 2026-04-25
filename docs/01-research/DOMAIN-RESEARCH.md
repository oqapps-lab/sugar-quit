# Исследование предметной области: Sugar Quit
**Дата:** 2026-04-25 (обновление v2.0)  
**Категория:** Health / Behavior Change / Neuroscience  
**Companion:** [Market Research](./MARKET-RESEARCH.md) · [Competitors](./COMPETITORS.md) · [User Personas](./USER-PERSONAS.md)

---

## Содержание

1. [Глоссарий](#1-глоссарий)
2. [Нейробиология сахара](#2-нейробиология-сахара)
3. [Научные источники](#3-научные-источники)
4. [Регуляторика и disclaimers](#4-регуляторика-и-disclaimers)
5. [Контентная стратегия](#5-контентная-стратегия)
6. [Клинические риски](#6-клинические-риски)
7. [Доказательная база digital health](#7-доказательная-база-digital-health)

---

## 1. Глоссарий

*18 ключевых терминов, которые используются в продукте, контенте и коммуникациях.*

---

### Добавленный сахар (Added Sugar)
Сахар, искусственно добавленный при производстве или приготовлении еды. **Не включает** природный сахар в цельных фруктах, овощах и молочных продуктах. Именно добавленный сахар является мишенью регуляторов (AHA, WHO, US DGA 2025–2030). Норма AHA: ≤25 г/день для женщин, ≤36 г/день для мужчин. Средний американец потребляет 71 г/день.

*Источник: [AHA](https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sugar/added-sugars)*

---

### Свободные сахара (Free Sugars)
Термин ВОЗ, более широкий, чем «добавленный сахар». Включает все моно- и дисахариды, добавленные производителем, плюс сахара в мёде, сиропах, фруктовых соках и концентратах. **Не включает** сахара в цельных фруктах и овощах. Рекомендация ВОЗ: < 10% от суточных калорий, в идеале < 5% (~25 г).

*Источник: [WHO Sugar Guideline](https://www.who.int/publications/i/item/9789241549028)*

---

### Гликемический индекс / ГИ (Glycemic Index)
Показатель того, насколько быстро продукт повышает уровень глюкозы в крови по сравнению с чистой глюкозой (ГИ=100). Высокий ГИ (>70) → быстрый скачок → быстрый crash → усиление тяги. Белый хлеб: ГИ 75. Яблоко: ГИ 36. В приложении используется для объяснения, почему «один печенье» вызывает тягу к ещё одному.

---

### Гликемическая нагрузка / ГН (Glycemic Load)
Уточнённый вариант ГИ, учитывающий **реальное количество углеводов** в порции. ГН = (ГИ × г углеводов) / 100. Арбуз имеет высокий ГИ (72), но низкую ГН (4) из-за малого содержания углеводов. Более практичный показатель для пользователей, чем ГИ.

---

### Инсулиновый спайк (Insulin Spike)
Резкий выброс инсулина поджелудочной железой в ответ на быстрый рост глюкозы в крови. После спайка уровень глюкозы резко падает — «сахарный crash», вызывающий усталость, раздражительность и усиление тяги. Хронические спайки → инсулинорезистентность → преддиабет → диабет 2 типа.

---

### Преддиабет (Prediabetes)
Состояние, при котором уровень сахара в крови выше нормы, но ещё не достигает диабетического порога. A1C 5.7–6.4% или глюкоза натощак 100–125 мг/дл. Затрагивает ~700 млн человек глобально (2024). При изменении образа жизни обратимо в 58% случаев (CDC DPP data). Персона «Pre-Diabetic Paul» — этот сегмент.

*Источник: [ADA 2024](https://diabetesjournals.org/care/article/48/11/e142/163407/)*

---

### A1C / HbA1c (Гликированный гемоглобин)
Показатель среднего уровня глюкозы в крови за последние 2–3 месяца. Норма: < 5.7%. Преддиабет: 5.7–6.4%. Диабет: ≥ 6.5%. Ключевой маркер здоровья для персоны Paul — снижение A1C через изменение сахарных привычек является его главной мотивацией.

---

### Дофамин (Dopamine)
Нейромедиатор, ключевой для системы вознаграждения мозга. Сахар вызывает выброс дофамина в nucleus accumbens — тот же механизм, что и у наркотических веществ. При хроническом потреблении количество дофаминовых рецепторов снижается (downregulation) → требуется больше сахара для прежнего ощущения удовольствия. Это основа «толерантности».

*Источник: [Avena et al., 2007, PMC2235907](https://pmc.ncbi.nlm.nih.gov/articles/PMC2235907/)*

---

### Nucleus Accumbens (Прилежащее ядро)
Ключевая структура «центра вознаграждения» мозга. Именно здесь происходит выброс дофамина при потреблении сахара, наркотиков, алкоголя. Binge-паттерны сахара изменяют экспрессию Delta FosB в nucleus accumbens — тот же молекулярный маркер, что и при наркотической зависимости.

---

### Кортизол (Cortisol)
Гормон стресса, вырабатываемый надпочечниками. При стрессе кортизол повышает аппетит и усиливает тягу к высококалорийной, сладкой еде как к «comfort food». Хронический стресс → хронически высокий кортизол → постоянная тяга к сахару. Ось HPA (гипоталамус–гипофиз–надпочечники) — механизм петли «стресс → сахар → стресс».

---

### Тяга / Крейвинг (Craving)
Интенсивное, краткосрочное желание потребить конкретный продукт. Длится обычно 15–20 минут. Вызвана внешними триггерами (вид, запах, время суток, стресс) или внутренними (нейрохимический дефицит дофамина). Ключевой момент вмешательства для SOS AI в Sugar Quit — прерывание крейвинга в течение этих 15–20 минут.

---

### Синдром отмены сахара (Sugar Withdrawal)
Физические и эмоциональные симптомы при резком сокращении потребления сахара. Острая фаза: дни 1–3 (головная боль, усталость, раздражительность, «sugar flu»). Адаптация: дни 4–7. Улучшение: недели 2–4. Большинство пользователей сдаётся именно в дни 1–5 — максимальная точка поддержки в продукте.

---

### Цикл ограничение–переедание (Binge-Restrict Cycle)
Паттерн: жёсткое ограничение сахара → нарастающая депривация → срыв (binge) → вина и стыд → ещё более жёсткое ограничение. **Само ограничение вызывает переедание** — это не слабость воли, а нейробиологический ответ. Ключевой паттерн персоны «Challenge Chloe». Продукт должен поддерживать harm reduction, а не перфекционизм.

---

### Ультраобработанная еда / УПП (Ultra-Processed Food, UPF)
По классификации NOVA (группа 4): промышленные продукты с множеством ингредиентов, которых нет на домашней кухне — высокофруктозный кукурузный сироп, гидрогенизированные масла, модифицированный крахмал, изоляты белков. УПП составляют ~57% калорий среднего американца. Мета-анализ 2025: употребление УПП связано с +15% риском смертности от всех причин.

*Источник: [Johns Hopkins SPH, 2025](https://publichealth.jhu.edu/2025/what-are-ultra-processed-foods)*

---

### Когнитивно-поведенческая терапия / КПТ (CBT)
Доказательный метод психотерапии, работающий с связью мыслей → эмоций → поведения. В контексте сахарных привычек: выявление когнитивных искажений («я уже сорвался, значит всё равно»), замена дисфункциональных паттернов, планирование if-then ответов. Золотой стандарт для behavior change apps. Core framework 90-day curriculum в Sugar Quit.

---

### Имплементационное намерение (Implementation Intention)
Техника «если–то» планирования: «Если [триггерная ситуация], то я [конкретное действие]». Например: «Если в 15:00 захочется сладкого → открою SOS AI и съем горсть орехов». Доказано значимо улучшает adherence по сравнению с простой постановкой целей (Gollwitzer, 1999). Одна из базовых техник в AI-диалогах Sugar Quit.

---

### Снижение вреда (Harm Reduction)
Подход, направленный на снижение потребления без требования полного отказа. Применительно к сахару: постепенное сокращение добавленного сахара вместо «cold turkey». Особенно важен для персон Paul (семейный контекст) и Chloe (binge-restrict риск). Аналог модели Sunnyside для алкоголя.

---

### Шкала Йельской пищевой зависимости (YFAS 2.0)
35-пунктный исследовательский инструмент, маппирующий симптомы пищевого поведения на критерии DSM-5 для расстройств, связанных с употреблением веществ. **Не является клиническим диагнозом.** Распространённость в общей популяции: 8.2–22.2%. Может использоваться в образовательном контенте приложения с явным дисклеймером.

*Источник: [Wiley Meta-analysis 2025](https://onlinelibrary.wiley.com/doi/10.1111/obr.13881)*

---

### Налог на сладкие напитки (Sugar-Sweetened Beverage Tax / SSB Tax)
Акцизный налог на напитки с добавленным сахаром. 118 стран внедрили SSB tax по состоянию на 2025 год (ВОЗ). UK Sugar Tax (SDIL) привёл к снижению содержания сахара в напитках на 46%. Налоги создают государственный нарратив, поддерживающий органический рост продуктов типа Sugar Quit.

*Источник: [WHO SSB Tax Report, 2025](https://www.who.int/publications/i/item/9789240118942)*

---

## 2. Нейробиология сахара

### 2.1 Механизм воздействия на мозг

Сахар активирует те же нейронные reward pathways, что и наркотические вещества:

```
Потребление сахара
       ↓
Глюкоза в кровотоке → поджелудочная выбрасывает инсулин
       ↓
Nucleus accumbens: выброс дофамина → ощущение удовольствия
       ↓
Инсулиновый crash → глюкоза падает → энергия падает → тяга растёт
       ↓
При хроническом потреблении: downregulation дофаминовых рецепторов
       ↓
Требуется БОЛЬШЕ сахара для прежнего «кайфа» → толерантность
       ↓
Цикл повторяется (самоподдерживающаяся петля)
```

**Ключевые структуры мозга:**

| Структура | Роль |
|-----------|------|
| Nucleus accumbens | Центр вознаграждения — выброс дофамина и эндорфинов |
| Префронтальная кора | Принятие решений, контроль импульсов (снижается при стрессе) |
| Амигдала | Эмоциональные реакции, связь «стресс → тяга» |
| Гипоталамус | Регуляция аппетита и метаболизма |

### 2.2 Петля стресс–сахар (кортизол–дофамин–инсулин)

```
Стресс → Кортизол ↑ → Аппетит к сладкому ↑
        → Сахар → Дофамин ↑ (временное облегчение)
        → Инсулин ↑ → Crash → Усталость + Тяга → ЕЩЁ САХАР

При хроническом стрессе:
Дисрегуляция HPA-оси → Базальный кортизол ↑ → Инсулинорезистентность
        → Постоянная тяга → Больше сахара → Петля затягивается
```

**Практический вывод для продукта:** Разрыв цикла требует работы одновременно со стрессом (кортизол), вознаграждением (дофамин) и стабильностью глюкозы (инсулин). Только трекинг граммов не работает — нужен эмоциональный коучинг.

### 2.3 Таймлайн отмены сахара

| Фаза | Дни | Что происходит | Продуктовая поддержка |
|------|-----|----------------|----------------------|
| **Острая** | 1–3 | Пик симптомов. Тяга максимальна. «Sugar flu» | SOS AI, день-за-днём гид, проактивные уведомления |
| **Адаптация** | 4–7 | Симптомы стихают. Mood swings сохраняются | Ежедневный чек-ин, milestone на День 7 |
| **Улучшение** | 8–30 | Вкусовые рецепторы перекалибруются. Энергия растёт | Прогресс-дашборд, «Eat This Instead» |
| **Стабилизация** | 31–90 | Новый baseline. Тяга эпизодическая | Community, trigger prediction, 90-day completion |

**Задокументированные улучшения:**

| Срок | Эффект | Источник |
|------|--------|---------|
| Дни 4–7 | Стабилизация глюкозы, исчезновение afternoon crash | Healthline |
| 2 недели | −25% калорийность, снижение вздутия | National Geographic |
| 30 дней | Снижение риска гипертонии; риск T2D снижается до 35% | National Geographic |
| 90 дней | Устойчивые улучшения: вес, энергия, кожа, воспаление | Multiple RCTs |

**Вывод:** 90-дневная программа точно совпадает с клиническим таймлайном. Первые 7 дней — максимальная точка поддержки.

---

## 3. Научные источники

### 3.1 Первичные исследования (обязательные для цитирования)

**[1] Avena, Rada & Hoebel (2007)**  
*«Evidence for sugar addiction: Behavioral and neurochemical effects of intermittent, excessive sugar intake»*  
Neuroscience & Biobehavioral Reviews. PMC2235907  
→ Самое цитируемое исследование в области. Доказывает bingeing, withdrawal и cravings у крыс при прерывистом доступе к сахару — паттерны, идентичные наркозависимости. Основа scientific positioning Sugar Quit.  
[PubMed](https://pmc.ncbi.nlm.nih.gov/articles/PMC2235907/)

---

**[2] Qin et al. (2025)**  
*«Sugar Addiction: Neural Mechanisms and Health Implications»*  
Brain and Behavior (Wiley)  
→ Самый свежий обзор. Вывод: «сахарная зависимость — реальное и измеримое состояние, отражающее паттерны мозга и поведения, наблюдаемые при наркозависимости». Ideal для App Store / landing page цитирования.  
[Wiley](https://onlinelibrary.wiley.com/doi/full/10.1002/brb3.70338)

---

**[3] JMIR Meta-analysis (2026)**  
*«Digital Interventions for Dietary Behavior Change»*  
Journal of Medical Internet Research. 52 статьи, N=24,652  
→ Цифровые вмешательства для изменения пищевого поведения дают статистически значимый эффект d=0.33 (95% CI 0.25–0.42, P<.001). Сильнее у молодых взрослых (d=0.46). **Прямая валидация концепции Sugar Quit.**  
[JMIR](https://www.jmir.org/2026/1/e80821)

---

**[4] Johns Hopkins AI DPP RCT (2025)**  
*«AI-Powered Diabetes Prevention Program»*  
Phase III RCT, Hopkins Medicine  
→ AI-приложение для профилактики диабета соответствует эффективности человеческих программ (CDC benchmarks). **Прямой прецедент для Sugar Quit как AI-коуча для преддиабетиков (персона Paul).**  
[Hopkins Medicine](https://www.hopkinsmedicine.org/news/newsroom/news-releases/2025/10/ai-powered-diabetes-prevention-program-shows-similar-benefits-to-those-led-by-people)

---

**[5] Westwater, Fletcher & Ziauddeen (2016)**  
*«Sugar addiction: the state of the science»*  
European Journal of Nutrition  
→ **Контраргумент.** Аддиктивноподобное поведение у животных появляется только при прерывистом доступе + голодании. Цитировать для научной честности. Помогает избежать чрезмерных claims.  
[Springer](https://link.springer.com/article/10.1007/s00394-016-1229-6)

---

**[5-дополнение] Hough et al. (2026)**  
*«The Addicted Brain: How Processed Foods Hijack Reward Pathways»*  
ScienceDirect  
→ Новейший обзор 2026 года. UPF активируют reward pathways аналогично субстанциям зависимости. Жир + сахар одновременно создают синергию дофаминового выброса.  
[ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1043661826000125)

### 3.2 Организации-стандарты

| Организация | Что использовать |
|-------------|-----------------|
| **AHA** | Нормы добавленного сахара (25–36 г/день) |
| **WHO** | Глобальная рекомендация < 10% калорий; SSB tax data |
| **ADA** | Standards of Care 2026; преддиабет definition и reversal rates |
| **CDC** | Статистика потребления сахара; Diabetes Prevention Program |
| **USDA/HHS** | Dietary Guidelines 2025–2030 |

### 3.3 Ключевые эксперты (кандидаты в advisory board)

| Эксперт | Аффилиация | Почему важен |
|---------|-----------|-------------|
| **Dr. Nicole Avena** | Icahn School of Medicine at Mount Sinai | Автор основополагающей работы 2007. Книга *Sugarless* (2023). Идеальный advisory board member |
| **Dr. Robert Lustig** | UCSF Professor Emeritus | «Sugar: The Bitter Truth» — 5M+ YouTube просмотров. Влиятельный, спорный, известный |
| **Dr. Jeff Grimm** | Western Washington University | Открыл «инкубацию тяги» к сахару: тяга РАСТЁТ с абстиненцией — как у кокаина |
| **Kay Tye** | MIT, Picower Institute | Компульсивное seeking поведение — как мозг отличает нормальное питание от компульсивного |

---

## 4. Регуляторика и Disclaimers

### 4.1 FDA: Wellness App vs. Medical Device

**Обновление января 2026:** FDA опубликовала обновлённое руководство по General Wellness Policy:

- Продукт квалифицируется как **wellness (не medical device)**, если:
  - Не заявляет о лечении, диагностике или профилактике конкретных заболеваний
  - Не идентифицирует клинические пороговые значения как «нормальные/ненормальные»
  - Не даёт постоянных alerts для управления болезнью
- Неинвазивные wearables и wellness apps с health-adjacent данными — **exempt** при wellness-позиционировании

**Sugar Quit безопасно попадает в wellness-категорию при соблюдении правил ниже.**

*Источники: [FDA Guidance](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/general-wellness-policy-low-risk-devices) · [Ropes & Gray, Jan 2026](https://www.ropesgray.com/en/insights/alerts/2026/01/fda-issues-updated-guidance-loosening-regulatory-approach-to-certain-digital-health-tools) · [AHA News](https://www.aha.org/news/headline/2026-01-06-fda-issues-guidance-wellness-products-clinical-decision-support-software)*

### 4.2 Правила claims: что можно и нельзя

| ✅ МОЖНО говорить | ❌ НЕЛЬЗЯ говорить |
|------------------|-------------------|
| «Отслеживайте потребление сахара» | «Лечит сахарную зависимость» |
| «Формируйте здоровые привычки питания» | «Излечивает диабет / предотвращает диабет» |
| «Управляйте тягой к сладкому» | «Клинически доказано снижает сахар в крови» |
| «Поддерживает ваши wellness-цели» | «Диагностирует» любое состояние |
| «AI-коуч для изменения пищевых привычек» | «Лечение зависимости» / «addiction treatment» |
| «Backed by neuroscience» | «Medically proven» без завершённого RCT |
| «Снизить потребление добавленного сахара» | «Предотвращает болезни сердца» |
| «Healthier relationship with sugar» | «Cure» / «излечение» / абсолютные обещания |

**Правило:** Одна чрезмерная claim может переклассифицировать wellness-приложение в медицинское устройство.

**Прецеденты:**
- **Lumosity (2015):** $2M штраф FTC за необоснованные claims о brain training
- **WHOOP (июль 2025):** FDA Warning Letter за маркетинг Blood Pressure Insights без clearance
- **GoodRx / Premom:** FTC за передачу health-данных рекламодателям без consent

### 4.3 Обязательные disclaimers

**На каждом экране с AI-советами:**
> *«Sugar Quit не является медицинским приложением. Информация носит образовательный характер и не заменяет консультацию врача. Если у вас есть медицинские вопросы — обратитесь к специалисту здравоохранения.»*

**При упоминании научных фактов:**
> *«Основано на научных исследованиях в области нейронауки и поведенческого здоровья. Сахарная зависимость не является официальным медицинским диагнозом по DSM-5 или ICD-11.»*

**При упоминании YFAS-подобного контента:**
> *«Это образовательный инструмент, не клиническая диагностика.»*

**При работе с персонами, у которых есть медицинские условия (Paul):**
> *«Если вы управляете преддиабетом или диабетом, проконсультируйтесь с вашим врачом перед изменением диеты.»*

### 4.4 FTC: Требования к маркетингу

- Все health-related claims требуют «appropriate substantiation» — научного подтверждения
- **FTC Health Breach Notification Rule (обновлено июль 2024):**
  - Расширено на health apps и wellness-технологии
  - «Breach» = передача health-данных без авторизации (не только кибератаки)
  - Dark patterns не считаются «meaningful consent»
  - Уведомление при breach 500+ пользователей: **60 календарных дней**

### 4.5 HIPAA

- Большинство wellness-приложений **не подпадают под HIPAA**, если не интегрированы с EHR-системами healthcare providers
- Sugar Quit (B2C) — вне HIPAA при отсутствии интеграции с медицинскими системами
- **Best practice:** обращаться с данными на уровне HIPAA-стандартов
- **SOC 2 compliance** — рекомендуется для B2B / корпоративного wellness (Year 2+)

### 4.6 GDPR (для EU-запуска)

- Health data = **«special category» по Статье 9 GDPR** → explicit consent (не стандартный checkbox)
- **European Health Data Space (EHDS):** вступил в силу 26 марта 2025
- Wellness app data включена в scope EHDS с 2027
- **Стратегия:** US-only запуск, EU — после получения legal advice по GDPR

### 4.7 App Store Policies

**Apple:**
- Запрет misleading health claims
- Health-related data: запрещено использовать для рекламы или хранить в iCloud
- AI transparency требования (2025)

**Google Play:**
- Аналогичные требования к accuracy health claims
- App Store Accountability Acts (эффективно с 1 января 2026): возрастная верификация, data minimization

---

## 5. Контентная стратегия

### 5.1 Как ведущие приложения строят научный авторитет

| Приложение | Стратегия | Результат |
|-----------|-----------|-----------|
| **Noom** | 50+ peer-reviewed публикаций, CDC DPP certification (2017, Full Plus 2024), 10+ academic partnerships | Золотой стандарт кредибильности в категории |
| **Reframe** | «Neuroscience-based», партнёрство с Emory и Harvard, advisory board | Self-reported 91% reduction rate — без независимых RCT, но high-trust brand |
| **Headspace** | 25 peer-reviewed studies, Chief Science Officer | Доступный научный авторитет без чрезмерных claims |

### 5.2 Фреймворк Transparency for Trust (T4T)

Четыре принципа, повышающих доверие к health apps (JMIR, 2019):

1. **Privacy & Data Security** — прозрачная политика, шифрование, user control
2. **Development Practices** — кто создал, какие эксперты, какой процесс
3. **Feasibility** — реалистичность обещаний, honest messaging
4. **Health Benefits** — evidence видно на точке скачивания (App Store, landing page)

*Источник: [JMIR T4T Principles](https://www.jmir.org/2019/5/e12390/)*

### 5.3 Конкретный план для Sugar Quit

| Элемент | Действие | Срок |
|---------|----------|------|
| **/science page** | Страница с исследованиями, advisory board профилями, методологией | До launch |
| **Advisory board** | Минимум 3 эксперта: нейроучёный + диетолог + клинический психолог | До launch |
| **In-app citations** | Каждый урок 90-day curriculum ссылается на конкретное исследование | До launch |
| **Disclaimers** | На всех AI-экранах, в onboarding, в App Store описании | До launch |
| **App Store description** | «Backed by neuroscience. Built with experts.» + конкретные данные | До launch |
| **Pilot study** | 500 beta-users, pre/post метрики (sugar intake, cravings/week, energy). Публикуемо в JMIR | 6 мес после launch |
| **Blog / SEO** | «Sugar withdrawal symptoms day by day», «how to stop sugar cravings at work» — 2 статьи/нед с Month 3 | 3+ мес после launch |

### 5.4 Язык и тон

| ✅ Использовать | ❌ Избегать |
|----------------|------------|
| «Sugar habits» | «Sugar addiction» в заголовках и claims |
| «Cravings» / «тяга» | «Dependence» / «зависимость» в рекламе |
| «Behavior change» | «Treatment» / «лечение» |
| «Backed by neuroscience» | «Clinically proven» без завершённого RCT |
| «Healthier relationship with sugar» | «Cure» / «eliminate forever» |
| «AI coach» | «AI therapist» / «AI doctor» |
| «Progress, not perfection» | Shaming language, guilt-tripping |
| «Reduce» / «снизить» | Абсолютные обещания |

### 5.5 Контент 90-day curriculum — структура

| Блок | Дни | Тема | Научная база |
|------|-----|------|-------------|
| Foundation | 1–7 | Нейробиология сахара, withdrawal guide, survival toolkit | Avena 2007, Qin 2025 |
| Reset | 8–30 | CBT техники, trigger identification, «Eat This Instead» | CBT meta-analysis |
| Rebuild | 31–60 | Habit formation, implementation intentions, stress management | Fogg Model, Gollwitzer |
| Thrive | 61–90 | Long-term identity shift, relapse prevention, community | Self-determination theory |

---

## 6. Клинические риски

### 6.1 Расстройства пищевого поведения (ED) — главный риск

Диетические приложения могут «триггерить и усугублять симптомы расстройств пищевого поведения» (PMC, 2021).

**Прецедент NEDA Tessa:** AI-чатбот начал давать советы по диете и поощрять похудение → был остановлен. Прямое предупреждение для Sugar Quit.

**Конкретные риски по персонам:**
- **Chloe:** binge-restrict цикл. AI не должен поддерживать extreme restriction
- 30-дневный «cold turkey challenge» может усилить binge-паттерн
- Жёсткий food tracking — триггер для susceptible populations

**Митигация:**

| Мера | Реализация |
|------|-----------|
| AI safety guardrails | Запрет стыда, запрет extreme restriction, «progress not perfection» |
| ED indicator detection | Auto-flag: extreme restriction language, purging references, «I binged and hate myself» |
| Professional referral | Auto-redirect к ресурсам при red flags |
| Advisory board | Клинический психолог по eating behaviors — обязателен |
| Harm reduction mode | Поддержка «gradual reduction», не только «cold turkey» |

*Источники: [PMC: Diet Apps and ED](https://pmc.ncbi.nlm.nih.gov/articles/PMC8485346/) · [Harvard: AI and Eating Disorders](https://hsph.harvard.edu/news/artificial-intelligence-tools-offer-harmful-advice-on-eating-disorders/)*

### 6.2 Когда Sugar Quit должен направить к врачу

| Ситуация | Действие |
|----------|---------|
| Extreme caloric restriction language | Popup + ресурсы NEDA / BEAT |
| Signs of disordered eating | «Похоже, тебе может помочь специалист» + ссылки |
| Blood sugar instability у преддиабетиков | «Обратись к эндокринологу для мониторинга A1C» |
| Mental health crisis indicators | Кризисная линия + предложение психолога |
| Persistent severe withdrawal > 2 недель | «Проконсультируйся с врачом — это может быть не связано с сахаром» |

### 6.3 Технические ограничения продукта

| Ограничение | Риск | Решение |
|-------------|------|---------|
| Food database accuracy | Sugarfree провалился именно здесь | Open Food Facts + curated pipeline. Показывать «неизвестно», не гадать |
| Added vs. natural sugar | MyFitnessPal не решил годами | AI-классификация + верифицированная база |
| On-device ML prediction | Нужны 7+ дней данных | Days 1–7: generic alerts. Days 7+: personalized |
| AI hallucinations | Выдуманные nutritional facts | RAG поверх верифицированной базы, не генерация «из головы» |

---

## 7. Доказательная база digital health

### 7.1 Эффективность цифровых вмешательств

| Исследование | Дизайн | Результат |
|-------------|--------|-----------|
| **JMIR Meta-analysis 2026** (52 статьи, N=24,652) | Digital interventions для изменения пищевого поведения | **d=0.33** (95% CI 0.25–0.42, P<.001). Молодые взрослые: d=0.46 |
| **Johns Hopkins AI DPP RCT 2025** | Phase III: AI-приложение vs. human DPP | AI ≈ human-led программе по CDC benchmarks |
| **Noom DPP RCT** (N=202) | Mobile DPP vs. usual care | 64% completers потеряли >5% веса за 24 нед |
| **AI + CGM Study** (N=944) | AI-рекомендации + CGM | Time in range: 74.7% → 85.5% (здоровые) |

### 7.2 Evidence-based техники в Sugar Quit

| Техника | Доказательность | Применение |
|---------|----------------|-----------|
| **CBT** | Сильная (gold standard) | Core 90-day curriculum и AI-диалоги |
| **Mindfulness** | Сильная (g=−0.39 для sweet craving) | «Surf the urge» в SOS-сессии |
| **Habit Substitution** | Сильная | «Eat This Instead» engine |
| **Implementation Intentions** | Сильная | if-then планы через AI |
| **Self-Monitoring** | Сильная (+15–30% снижение) | Daily check-ins, craving log |
| **Social Support** | Средне-сильная | Community, accountability partners |

### 7.3 Behavior Change Frameworks

**COM-B Model** (Capability × Opportunity × Motivation → Behavior):
- Capability: знания (curriculum) + навыки (coping techniques)
- Opportunity: «Eat This Instead» (physical) + community (social)
- Motivation: AI coaching (reflective) + streaks (automatic)

**Fogg Behavior Model** (Motivation × Ability × Prompt):
- SOS button = Prompt в момент, когда Motivation высока (тяга), Ability максимальна (одно нажатие)
- Daily check-in = Prompt (push) + Ability (30 сек) + Motivation (streak)

**Все 6 BCT-техник с наивысшей engagement-ассоциацией в mHealth присутствуют в Sugar Quit:**
goal setting · self-monitoring · feedback · prompts/cues · rewards · social support

---

## Источники

- [Avena, Rada & Hoebel, 2007 (PMC2235907)](https://pmc.ncbi.nlm.nih.gov/articles/PMC2235907/)
- [Qin et al., 2025 — Brain and Behavior](https://onlinelibrary.wiley.com/doi/full/10.1002/brb3.70338)
- [Hough et al., 2026 — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1043661826000125)
- [Westwater et al., 2016 — European Journal of Nutrition](https://link.springer.com/article/10.1007/s00394-016-1229-6)
- [JMIR Meta-analysis 2026](https://www.jmir.org/2026/1/e80821)
- [Johns Hopkins AI DPP RCT, 2025](https://www.hopkinsmedicine.org/news/newsroom/news-releases/2025/10/ai-powered-diabetes-prevention-program-shows-similar-benefits-to-those-led-by-people)
- [YFAS 2.0 Meta-analysis, Wiley 2025](https://onlinelibrary.wiley.com/doi/10.1111/obr.13881)
- [FDA General Wellness Guidance, Jan 2026](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/general-wellness-policy-low-risk-devices)
- [Ropes & Gray — FDA Digital Health Update](https://www.ropesgray.com/en/insights/alerts/2026/01/fda-issues-updated-guidance-loosening-regulatory-approach-to-certain-digital-health-tools)
- [FTC Health Breach Notification Rule](https://www.ftc.gov/business-guidance/blog/2024/04/updated-ftc-health-breach-notification-rule-puts-new-provisions-place-protect-users-health-apps)
- [WHO SSB Tax Report, 2025](https://www.who.int/publications/i/item/9789240118942)
- [AHA Added Sugars](https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sugar/added-sugars)
- [WHO Sugar Guideline](https://www.who.int/publications/i/item/9789241549028)
- [ADA Prediabetes Prevalence 2024](https://diabetesjournals.org/care/article/48/11/e142/163407/)
- [Johns Hopkins SPH — Ultra-Processed Foods, 2025](https://publichealth.jhu.edu/2025/what-are-ultra-processed-foods)
- [JMIR T4T Framework](https://www.jmir.org/2019/5/e12390/)
- [PMC — Diet Apps and Eating Disorders](https://pmc.ncbi.nlm.nih.gov/articles/PMC8485346/)
- [Harvard SPH — AI and Eating Disorders](https://hsph.harvard.edu/news/artificial-intelligence-tools-offer-harmful-advice-on-eating-disorders/)
