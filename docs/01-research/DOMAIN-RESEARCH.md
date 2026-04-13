# Domain Research — Sugar Quit

**Дата:** Апрель 2026  
**Категория:** Нейронаука · Поведенческая психология · Регуляторика · Цифровое здоровье  
**Companion:** [Market Research](./MARKET-RESEARCH.md) · [User Personas](./USER-PERSONAS.md) · [Competitors](./COMPETITORS.md)

---

## 1. Глоссарий

> 18 ключевых терминов, используемых в продукте, маркетинге и научных источниках.

| Термин | Определение | Применение в Sugar Quit |
|---|---|---|
| **Added Sugar / Добавленный сахар** | Сахара и сиропы, добавленные в продукты при переработке или приготовлении. Не включает сахара, содержащиеся в цельных фруктах, овощах и молоке. US DGA 2025–2030: «никакое количество не рекомендуется» | Основной объект трекинга. Отличается от натурального сахара — ключевая фича сканера |
| **Blood Glucose / Гликемия** | Концентрация глюкозы в крови (мг/дл). Норма натощак: 70–99 мг/дл. Преддиабет: 100–125 мг/дл. Диабет: ≥126 мг/дл | Основная метрика для персоны Paul. Прогнозирование изменений как retention hook |
| **Blood Sugar Crash / Сахарный crash** | Резкое падение гликемии после инсулинового спайка, вызванного потреблением быстрых углеводов. Сопровождается усталостью, раздражительностью, тягой к сладкому | Главный триггер 3pm craving у Сары. Объяснение в Day 1–3 curriculum |
| **Binge-Restrict Cycle** | Паттерн: жёсткое ограничение → физическая/психологическая депривация → неконтролируемое переедание → стыд → снова ограничение. Restriction биологически усиливает последующий binge | Центральная проблема Хлои. AI никогда не поддерживает extreme restriction |
| **CBT (Cognitive Behavioral Therapy)** | Психотерапевтический метод, направленный на изменение дисфункциональных мыслительных паттернов (когниций) и поведения. Gold standard для поведенческих изменений | Архитектурный фреймворк 90-дневного curriculum. AI-разговоры строятся на CBT-техниках |
| **COM-B Model** | Behavior Change Framework: Behaviour возникает при наличии Capability (способность) × Opportunity (возможность) × Motivation. Используется для дизайна вмешательств | Фреймворк для архитектуры 90-day program. Каждая фича закрывает один из компонентов |
| **Craving / Тяга** | Интенсивное желание употребить определённое вещество или пищу, обусловленное активацией дофаминергических цепей мозга. Длится в среднем 15–20 минут | Именно для этого момента создан AI SOS. «Surfing the urge» как техника |
| **Dopamine / Дофамин** | Нейромедиатор, связанный с системой вознаграждения, мотивацией и предвосхищением удовольствия. Сахар → дофаминовый всплеск в nucleus accumbens | Объяснение «почему сахар — это не просто привычка» в образовательном контенте |
| **Free Sugars** | Термин ВОЗ: все моносахариды и дисахариды, добавленные в продукты производителем/поваром/потребителем + сахара в мёде, сиропах, фруктовых соках и концентратах. Рекомендация ВОЗ: <10% калорий (сильная) или <5% (условная) | Используется в образовательном контенте. Важно для сканера — мёд и сок тоже считаются |
| **Habit Loop** | Трёхкомпонентная нейронная петля (Ч. Дахигг): Cue (триггер) → Routine (поведение) → Reward (вознаграждение). Привычки хранятся в базальных ганглиях и работают на автопилоте | Модель для объяснения «почему ты ешь сахар, не думая». Основа trigger prediction |
| **HbA1c (Гликированный гемоглобин)** | Процент гемоглобина, связанного с глюкозой — отражает средний уровень сахара в крови за 2–3 месяца. Преддиабет: 5.7–6.4%. Диабет: ≥6.5% | Ключевая метрика для Paul. Прогресс-дашборд: «при текущем темпе ваш A1C может снизиться с 5.9 до 5.6%» |
| **Implementation Intention** | Стратегия «если–то»: «Если [ситуация], то я [действие]». Meta-analysis: эффект d = 0.47–0.78. Снижает разрыв между намерением и действием | Ключевая техника в AI SOS. «Если тяга в 15:00 → достаю телефон и нажимаю SOS» |
| **Insulin Spike / Инсулиновый спайк** | Резкий выброс инсулина поджелудочной железой в ответ на гликемию. Инсулин переносит глюкозу в клетки → за спайком следует crash. При хроническом переедании сахара → инсулинорезистентность | Объяснение в Day 2–3 curriculum. «Почему тебя тянет к сахару через 2 часа после сладкого» |
| **Mindfulness / Осознанность** | Практика намеренного, безоценочного внимания к настоящему моменту. Meta-analysis 2025: снижает food craving (g = 0.43–0.63 в зависимости от дизайна) | «Surf the urge» в SOS. 5-минутные mindfulness-упражнения в момент тяги |
| **Nucleus Accumbens** | Структура limbic system — «центр вознаграждения» мозга. Высвобождает дофамин при удовольствии (еда, секс, наркотики). Сахар активирует те же цепи, что и кокаин (исследования на крысах, Avena et al. 2007) | Научная основа для claim «сахарная зависимость реальна». Используется в образовательном контенте |
| **Prediabetes / Преддиабет** | Состояние, при котором уровень сахара в крови выше нормы, но ещё не достиг порога диабета (A1C 5.7–6.4%). 635 млн взрослых в мире (IDF 2025). Обратимо при изменении образа жизни | Основная мотивация Paul. B2B: корпоративные программы профилактики диабета |
| **Sugar Withdrawal / Сахарная абстиненция** | Совокупность физических и психологических симптомов при резком снижении потребления сахара: головная боль, усталость, раздражительность, тяга, «туман в голове». Пик: День 3–7. Механизм: мозг перестраивает дофаминовую систему | Day-by-day withdrawal guide — критичная фича для первых 7 дней. Объясняет, что это нормально |
| **Urge Surfing** | Mindfulness-техника для работы с тягой: наблюдать за craving как за волной — не подавлять и не поддаваться, а «проехать» волну до её спада. Эффективность подтверждена для зависимостей | Ключевая техника в AI SOS. «Посмотри на тягу как на волну — она поднимется и опустится» |
| **Yale Food Addiction Scale (YFAS 2.0)** | 35-пунктный психометрический инструмент, маппящий симптомы пищевой зависимости на критерии DSM-5. Pooled alpha = 0.85 (мета-анализ 65 исследований). Распространённость food addiction: 8.2–22.2% общей популяции | Можно использовать как onboarding-опросник для персонализации. Не ставить диагноз — только уровень самооценки |

---

## 2. Нейронаука: как сахар воздействует на мозг

### 2.1 Механизм reward loop

Сахар активирует те же нейронные цепи вознаграждения, что и аддиктивные вещества. Цикл:

```
Потребление сахара
       ↓
Глюкоза → кровоток → мозг
       ↓
Nucleus accumbens: дофаминовый всплеск + эндорфины
       ↓
Ощущение удовольствия и облегчения
       ↓
Инсулиновый спайк → crash гликемии
       ↓
Усталость + раздражительность + тяга
       ↓
Снова к сахару (или: стресс → кортизол → тяга)
       ↓  ← хроническое воздействие: толерантность
Снижение D2-рецепторов дофамина → нужно больше сахара для того же эффекта
```

**Ключевые структуры мозга:**

| Структура | Роль |
|---|---|
| Nucleus accumbens | Центр вознаграждения: дофамин + опиоиды при потреблении сахара |
| Префронтальная кора | Принятие решений, контроль импульсов — ослабевает при хроническом переедании |
| Амигдала | Эмоциональная память: связь «стресс → тяга к сахару» |
| Гипоталамус | Регуляция аппетита и энергетического гомеостаза |
| Базальные ганглии | Хранилище привычек (habit loop) — автопилот candy bowl |

### 2.2 Цикл стресс–кортизол–сахар

```
Стресс (работа, дедлайн, конфликт)
       ↓
Кортизол ↑ (HPA-ось активирована)
       ↓
Аппетит к высококалорийной, сладкой еде ↑
(биологически: мозг ищет быстрые калории для «борьбы или бегства»)
       ↓
Потребление сахара → дофамин ↑ (временное облегчение)
       ↓
Crash → усталость → ещё больше стресса
       ↓
При хроническом стрессе: дисрегуляция HPA-оси →
постоянно повышенный базальный кортизол → инсулинорезистентность → метаболический синдром
```

**Вывод для продукта:** разрыв цикла требует работы со стрессом (кортизол) одновременно с поведением. Только трекинг граммов сахара не работает — нужен эмоциональный AI-компонент.

### 2.3 Таймлайн абстиненции

| Фаза | Дни | Что происходит | Симптомы | Что должно делать приложение |
|---|---|---|---|---|
| **Острая** | 1–3 | Дофаминовая система требует привычную дозу. Кортизол повышен | Сильная тяга, головная боль, усталость, раздражительность, «сахарный грипп» | AI SOS в любое время. «Это нормально, ты на Дне N» |
| **Адаптация** | 4–7 | Гликемия начинает стабилизироваться. Пик симптомов | Mood swings, тяга сохраняется, но физические симптомы снижаются | День-за-днём guide с прогнозом «завтра будет легче» |
| **Улучшение** | 8–21 | Вкусовые рецепторы «перекалибруются». Энергия растёт | Заметное улучшение энергии, фокуса, кожи, сна, вздутия | Celebrate milestones. Progress dashboard «7 дней — ты сделал это» |
| **Стабилизация** | 22–90 | Новый baseline. Тяга — эпизодическая, управляемая | Случайные тяги, особенно при стрессе. Эмоциональный слой | Predictive trigger alerts. Углублённый curriculum |

**Задокументированные улучшения здоровья по срокам:**

| Срок | Улучшение | Источник |
|---|---|---|
| 4–7 дней | Стабилизация гликемии | Healthline, AddictionHelp |
| 2 недели | Снижение калорийности ~25%; ↓ вздутие; начало нормализации давления | National Geographic |
| 30 дней | ↓ риск гипертонии и сердечно-сосудистых болезней; риск T2D снижается до 35% | National Geographic |
| 8 недель | Снижение de novo lipogenesis в печени на 10.5% | Clinical study (подростки) |
| 90 дней | Устойчивые улучшения: вес, воспалительные маркеры, энергия, HbA1c | Multiple sources |

**Sources:**
- [AddictionHelp — Sugar Withdrawal Timeline](https://www.addictionhelp.com/sugar/withdrawal-symptoms/)
- [National Geographic — Health Benefits of Reducing Sugar](https://www.nationalgeographic.com/science/article/health-benefits-of-reducing-sugar)
- [Healthline — 30 Days No Sugar](https://www.healthline.com/nutrition/30-days-no-sugar)

---

## 3. Научные источники

> 5 ключевых публикаций с полными цитатами, данными и применением для продукта.

---

### Источник 1 — Фундаментальная работа по сахарной зависимости

**Avena, N. M., Rada, P., & Hoebel, B. G. (2008).** Evidence for sugar addiction: Behavioral and neurochemical effects of intermittent, excessive sugar intake. *Neuroscience & Biobehavioral Reviews, 32*(1), 20–39. https://doi.org/10.1016/j.neubiorev.2007.04.019

**Тип:** Обзор экспериментальных исследований  
**Аффилиация:** Princeton University, Department of Psychology  
**Цитирований:** 2,500+  

**Ключевые находки:**
- Крысы с intermittent access к сахару демонстрировали **bingeing, withdrawal, craving и sensitization** — четыре признака зависимости
- Абстиненция вызывала тревогу и депрессивно-подобное поведение, снятое налоксоном (опиоидный антагонист) → сахар активирует опиоидную систему
- **Перекрёстная сенсибилизация:** крысы с сахарной историей проявляли повышенную чувствительность к амфетамину
- Хроническое потребление → изменение экспрессии D1/D2 дофаминовых рецепторов в NAc

**Ограничения:** Данные на грызунах с прерывистым доступом + голоданием; прямая экстраполяция на людей проблематична.

**Применение:**  
Самое цитируемое исследование в области. Используется для обоснования нейронаучного позиционирования: «Sugar activates the same brain reward pathways as addictive substances.» Формулировка для маркетинга, а не медицинского заявления.

**Ссылка:** [PMC: PMC2235907](https://pmc.ncbi.nlm.nih.gov/articles/PMC2235907/)

---

### Источник 2 — Свежий обзор 2025 года

**Qin, D., Qi, J., Shi, F., Guo, Z., & Li, H. (2025).** About sugar addiction. *Brain and Behavior, 15*(7), e70338. https://doi.org/10.1002/brb3.70338

**Тип:** Narrative Review  
**Аффилиация:** China-Japan Union Hospital of Jilin University; Changchun University of Technology  
**Принята:** январь 2025; опубликована: июль 2025  

**Ключевые находки:**
- «Sugar addiction — реальное и измеримое состояние, отражающее паттерны мозга и поведения, наблюдаемые при наркозависимости»
- Хроническое потребление сахара **повреждает префронтальную кору и амигдалу**, снижая контроль импульсов
- Long-term: повышенный риск хронического ADHD и нейрокогнитивного дефицита
- **CBT и антагонисты дофамина** показывают перспективные результаты в лечении, но требуют дальнейшего изучения
- Профилактика через диетическое вмешательство остаётся наиболее эффективной стратегией

**Применение:**  
Самый актуальный (2025) научный обзор. Поддерживает claim «backed by neuroscience» и образовательный контент. Цитировать в /science page и App Store description. Формулировка: «A 2025 review in Brain and Behavior confirms that sugar habits activate the same brain reward pathways as addictive substances.»

**Ссылка:** [PMC: PMC12257121](https://pmc.ncbi.nlm.nih.gov/articles/PMC12257121/)

---

### Источник 3 — Mindfulness для пищевой тяги (мета-анализ 2025)

**Allameh, Z., Mokhtari, S., et al. (2025).** Effects of mindfulness-based interventions on food craving in adults: a systematic review and meta-analysis of controlled clinical trials. *BMC Psychology, 13*, 1022. https://doi.org/10.1186/s40359-025-03307-6

**Тип:** Systematic Review + Meta-analysis  
**Поиск по базам:** до июля 2024  

**Ключевые находки:**
- MBI (mindfulness-based interventions) значимо снижают food craving
- **Эффект по типу контрольной группы:**
  - Negative control group: **g = 0.63**, p < 0.001, n = 6 исследований
  - Neutral control group: **g = 0.43**, p < 0.001, n = 11 исследований
  - Positive control group: g = -0.04, p = 0.62, n = 14 (no significant effect)
- «Decentering» (метакогнитивная дистанция от мыслей/тяги) — ключевой механизм: позволяет воспринимать craving как временное психическое событие, а не неизбежное действие
- Remote MBI сравнимы по эффективности с in-person форматами
- Ограничение: низкая certainty evidence; нужны высококачественные RCT

**Применение:**  
Научное обоснование для «Urge Surfing» в AI SOS. «Surf the urge» — не просто слоган, это вмешательство с эффектом g = 0.43–0.63. Применение: 5-минутные mindfulness-упражнения во время tяги, guided через AI.

**Ссылка:** [BMC Psychology](https://bmcpsychology.biomedcentral.com/articles/10.1186/s40359-025-03307-6) · [PubMed: 40999532](https://pubmed.ncbi.nlm.nih.gov/40999532/)

---

### Источник 4 — RCT цифрового вмешательства для снижения сахара (2025)

**iSIPsmarter RCT (2025).** A digital behavioral intervention to reduce sugar-sweetened beverage consumption: a randomized, controlled trial. *Journal of the Academy of Nutrition and Dietetics.* https://doi.org/10.1016/j.jand.2025.xxx

**Тип:** Randomized Controlled Trial (Phase III)  
**N:** 249 участников (iSIPsmarter n=127, patient education control n=122)  
**Популяция:** Взрослые, rural Appalachian  
**Retention:** 91% на 9 нед., 86% на 6 мес. (iSIPsmarter); 94% и 92% (контроль)  

**Ключевые находки:**
- «iSIPsmarter — первое цифровое поведенческое вмешательство, сфокусированное на SSB-reduction как первичной стратегии»
- Small-medium effect на SSB-поведение vs. пациентская просветительская страница
- Потеря веса на 6 мес.: **effect size = 0.23, p = 0.046** — достоверно лучше контроля
- Высокая adherence: завершено в среднем 5.2 из 6 модулей (87%), 76% дневников SSB
- Компоненты: SSB self-monitoring, action planning, персонализированная обратная связь

**Применение:**  
Прямое доказательство того, что **цифровое вмешательство по снижению сахара работает и лучше, чем пассивное информирование.** Основа для claim «AI-powered behavior change delivers results.» Сравнение: Sugar Quit добавляет real-time AI coaching поверх этих компонентов.

**Ссылки:** [PMC: Mixed-methods evaluation](https://pmc.ncbi.nlm.nih.gov/articles/PMC12973715/) · [ScienceDirect (RCT)](https://www.sciencedirect.com/science/article/abs/pii/S0002916525003326)

---

### Источник 5 — Контраргумент (научная честность)

**Westwater, M. L., Fletcher, P. C., & Ziauddeen, H. (2016).** Sugar addiction: the state of the science. *European Journal of Nutrition, 55*(Suppl 2), 55–69. https://doi.org/10.1007/s00394-016-1229-6

**Тип:** Critical Review  
**Аффилиация:** University of Cambridge, Department of Psychiatry  

**Ключевые находки:**
- Мало доказательств для sugar addiction в клиническом смысле у людей
- Addiction-подобное поведение у крыс возникает только при intermittent access + голодании — при свободном доступе эффект исчезает
- Авторы предпочитают концепцию «eating addiction» (зависимость от поведения) вместо «sugar addiction» (зависимость от вещества)
- DSM-5 и ICD-11 не признают сахарную зависимость клинически

**Применение:**  
Цитировать для научной честности. Вывод для продукта: **позиционирование «behavior change», а не «addiction treatment»** — не только регуляторно безопаснее, но и научно обоснованнее. Продукт помогает изменить поведение вокруг сахара, независимо от споров о природе зависимости.

**Ссылка:** [Springer Link](https://link.springer.com/article/10.1007/s00394-016-1229-6)

---

## 4. Регуляторика и Disclaimers

### 4.1 FDA — Wellness App vs. Medical Device (январь 2026)

FDA выпустила обновлённые руководства 6 января 2026 года, существенно расширив зону «general wellness»:

**General Wellness Policy для низкорисковых устройств:**
- Software functions, предназначенные *исключительно* для поддержания здорового образа жизни и **не связанные с диагностикой, лечением или профилактикой болезней**, исключены из определения медицинского устройства
- Определение зависит от того, **как продукт позиционируется и рекламируется** — не от технических функций
- Новое: неинвазивные продукты, оценивающие физиологические параметры (включая давление), теперь могут квалифицироваться как wellness, если intent строго wellness-focused

**Sugar Quit безопасно попадает в wellness при соблюдении ограничений ниже.**

**Sources:**
- [Ropes & Gray — FDA Updated Guidance Jan 2026](https://www.ropesgray.com/en/insights/alerts/2026/01/fda-adapts-with-the-times-on-digital-health-updated-guidances-on-general-wellness-products)
- [Faegre Drinker — Key Updates FDA 2026](https://www.faegredrinker.com/en/insights/publications/2026/1/key-updates-in-fdas-2026-general-wellness-and-clinical-decision-support-software-guidance)
- [AHA News — FDA Guidance Jan 6 2026](https://www.aha.org/news/headline/2026-01-06-fda-issues-guidance-wellness-products-clinical-decision-support-software)

### 4.2 Что МОЖНО и НЕЛЬЗЯ говорить

| ✅ МОЖНО | ❌ НЕЛЬЗЯ |
|---|---|
| «Помогает снизить потребление добавленного сахара» | «Лечит сахарную зависимость» |
| «AI-коуч для изменения пищевых привычек» | «Излечивает или предотвращает диабет» |
| «Управляйте тягой к сладкому» | «Клинически доказано снижает A1C» |
| «Backed by neuroscience» | «Медицинское лечение» |
| «Поддерживает здоровый образ жизни» | «Диагностирует любое состояние» |
| «Здоровые отношения с сахаром» | «Излечение» / «cure» |
| «AI coach» | «AI therapist» / «AI doctor» |
| «Progress, not perfection» | Shaming language, guilt |
| «90-day behavior change program» | «90-day addiction treatment program» |

**Одна чрезмерная claim может переклассифицировать wellness-app в медицинское устройство.**

**Прецеденты нарушений:**
- **Lumosity (2015):** $2M штраф FTC за необоснованные claims о brain training (cognitive enhancement без RCT)
- **WHOOP (июль 2025):** FDA Warning Letter за маркетинг «Blood Pressure Insights» без 510(k) clearance
- **GoodRx, Premom:** FTC action за передачу health-данных рекламодателям без consent

### 4.3 FTC — Health App Marketing

- Все health-related claims требуют «appropriate scientific substantiation»
- Claims о профилактике/лечении болезней требуют «significant scientific agreement» (обычно = несколько RCT)
- **FTC Health Breach Notification Rule (обновлено июль 2024):**
  - Расширено на health apps и wellness-технологии
  - «Breach» = любая несанкционированная передача health-данных, включая рекламные трекеры
  - Уведомление: **60 календарных дней** при breach 500+ пользователей
  - Dark patterns не считаются «meaningful consent»

**Source:** [FTC Health Breach Notification Rule](https://www.ftc.gov/business-guidance/blog/2024/04/updated-ftc-health-breach-notification-rule-puts-new-provisions-place-protect-users-health-apps)

### 4.4 HIPAA

- Большинство wellness-apps **не подпадают под HIPAA** (применяется только при работе с covered entities / PHI)
- Sugar Quit без EHR-интеграции → HIPAA скорее всего не применяется
- **Best practice:** обрабатывать health-данные на уровне HIPAA-стандартов в любом случае
- **SOC 2 Type II** — необходим для B2B корпоративных продаж (корпоративные клиенты требуют как минимум)

### 4.5 GDPR (EU рынок — Stage 2)

- Health data = **«Special Category» данные, Статья 9 GDPR** → explicit consent (не стандартный checkbox)
- **European Health Data Space (EHDS)** в силе с 26 марта 2025:
  - General provisions: 26 марта 2027
  - Primary use rules: 26 марта 2029
  - Wellness app data включена в scope
- Шифрование, псевдонимизация, data minimization — обязательны
- **Стратегия:** Launch US only → EU с GDPR-ready архитектурой через 6–12 мес.

### 4.6 App Store Policies

**Apple App Store:**
- Health apps: accurate information, запрет misleading claims
- Health-related data: запрет использования для рекламы
- Health data: запрет хранения в iCloud
- 2025: новые требования AI transparency и age ratings

**Google Play:**
- App Store Accountability Acts (эффективны с 1 января 2026): data minimization, parental consent, возрастная верификация

### 4.7 Обязательные Disclaimers

Следующие disclaimers должны быть на каждом экране с AI-советами и в App Store description:

```
«Sugar Quit не является медицинским устройством и не предназначен 
для диагностики, лечения или профилактики заболеваний. Информация 
не заменяет консультацию квалифицированного медицинского специалиста. 
При наличии медицинских состояний (диабет, преддиабет, расстройства 
пищевого поведения) проконсультируйтесь с врачом перед началом 
использования приложения.»
```

```
«AI-коуч Sugar Quit предоставляет образовательную информацию и 
поддержку в области здорового образа жизни. Это не психотерапия 
и не медицинская консультация.»
```

---

## 5. Контентная стратегия

### 5.1 Как лидеры строят научную credibility

| Приложение | Стратегия | Результат |
|---|---|---|
| **Noom** | 50+ peer-reviewed публикаций. CDC DPP Full Plus Recognition (2024) — одна из 11 цифровых программ в США. RCT N=202: 64% completers потеряли >5% веса | Золотой стандарт. $400M revenue (2020). Единственный пример получения CDC recognition |
| **Reframe** | «Neuroscience-based». Партнёрство с Emory + Harvard. Научный совет. 91% пользователей снизили алкоголь за 3 мес. | $10M ARR при 3.2M загрузках. Self-reported данные, но бренд работает |
| **Headspace** | 25 peer-reviewed исследований. Chief Science Officer. Partnerships с университетами | Независимые проверки выявили inconsistent results, но это не остановило рост |

**Вывод:** Advisory board + /science page + in-curriculum citations достаточно для initial credibility. RCT — это Year 2 goal.

### 5.2 Plan доверия для Sugar Quit

| Элемент | Действие | Срок |
|---|---|---|
| **/science page** | Ссылки на 5 исследований выше, профили advisory board, methodology transparency | До launch |
| **Advisory board** | 3–5 экспертов: нутрициолог (обязательно), нейробиолог (желательно Dr. Nicole Avena или аналог), клинический психолог (ED risk) | До launch: 2 эксперта минимум |
| **In-app disclaimers** | На каждом AI-экране и в onboarding | До launch |
| **In-curriculum citations** | Каждый из 90 дней curriculum ссылается на источник. «Сегодня: дофамин и сахар — вот исследование» | До launch |
| **Пилотное исследование** | 500 beta-users, pre/post: sugar intake, cravings/week, energy (1–10), mood. Без control group, но publishable в JMIR формате | 6 мес. после launch |
| **App Store description** | «Backed by neuroscience research. Built with health experts.» + конкретные цифры | До launch |
| **Press page** | Ссылки на источники для журналистов | До launch |

### 5.3 Evidence-Based техники в продукте

| Техника | Эффект | Применение |
|---|---|---|
| **CBT** | Gold standard для behavior change. Средний эффект для lifestyle changes. Meta: CBT for eating disorders — значимая эффективность | Архитектура AI-разговоров. Curriculum. Cognitive reframing при тяге |
| **Mindfulness / Urge Surfing** | g = 0.43–0.63 для food craving (meta-analysis 2025) | AI SOS: 5-мин guided exercise при craving. Daily check-in. «Surf the urge» |
| **Habit Substitution** | Сильная доказательная база. Замена паттерна эффективнее подавления | «Eat This Instead» engine. Новые ритуалы в триггерные моменты |
| **Implementation Intentions** | d = 0.47–0.78 (meta-analysis) | AI строит if-then планы: «Если 3pm craving → ты делаешь X» |
| **Self-Monitoring** | Трекинг сам снижает target behavior на 15–30% | Daily check-ins, craving log, sugar intake dashboard |
| **Social Support** | 40% успешно бросивших курить кредитуют peer support (CDC) | Community, accountability partners, shared challenges |
| **Personalized Feedback** | Усиливает эффект self-monitoring | AI-summary: «на этой неделе ты избежал 180г сахара» |

### 5.4 Язык и тон

**Принципы:**
1. **Non-judgmental** — никогда не стыдить за срыв. «Прогресс, а не совершенство»
2. **Empathetic** — сначала спросить «как ты?», потом предложить совет
3. **Science-backed but accessible** — нейронаука без жаргона. «Вот что происходит в твоём мозге»
4. **Specific** — «съешь горсть миндаля», а не «выбирай здоровые альтернативы»
5. **Hopeful** — «большинство людей замечают улучшение к Дню 7»

### 5.5 Структура 90-дневного Curriculum

```
Weeks 1–2: FOUNDATION
├── Нейронаука сахара (days 1–3)
├── Withdrawal guide day-by-day (days 1–14)
├── Identify YOUR triggers (days 4–7)
├── Sugar in hiding — scanner basics (days 7–10)
└── First wins celebration (days 10–14)

Weeks 3–6: REWIRING
├── CBT: Challenge automatic thoughts (days 15–21)
├── Implementation intentions builder (days 22–28)
├── Stress management без сахара (days 29–35)
├── Social situations playbook (days 36–42)
└── Personalized alternative meal planning (days 43–45)

Weeks 7–13: MASTERY
├── Trigger prediction: understanding patterns (days 46–56)
├── Relapse prevention plan (days 57–63)
├── Long-term identity: «I'm someone who...» (days 64–77)
├── Community leadership + accountability (days 78–84)
└── Life after 90 days: maintenance mode (days 85–90)
```

---

## 6. Ограничения и риски

### 6.1 Eating Disorders — главный клинический риск

**Прецедент Tessa (NEDA, 2023):** Чатбот National Eating Disorders Association начал давать советы, поощряющие похудение и restrictive eating → приостановлен. **Прямое предупреждение для Sugar Quit.**

**Риск для наших персон:**
- Хлоя уже в binge-restrict цикле. AI не должен поддерживать extreme restriction
- «30-дневный sugar-free challenge» может усилить restrictive паттерн у уязвимых пользователей
- Rigid tracking как триггер для ED-susceptible

**Митигация:**

| Мера | Реализация |
|---|---|
| AI safety guardrails | System prompt: никогда не стыдить, не поддерживать extreme restriction, не рекламировать конкретные калорийные цели |
| ED red flag detection | Автовыявление паттернов: extreme restriction language, purging, «I binged and hate myself» |
| Professional referral | Автоматический redirect к специалисту при ED-indicators |
| Advisory board | Клинический психолог специализации eating behaviors — обязателен |
| Reduction framing | Поддерживать «gradual reduction», не только «cold turkey» |

**Sources:**
- [PMC — Effects of Diet Apps on Eating Disorders](https://pmc.ncbi.nlm.nih.gov/articles/PMC8485346/)
- [Harvard — AI and Eating Disorders](https://hsph.harvard.edu/news/artificial-intelligence-tools-offer-harmful-advice-on-eating-disorders/)

### 6.2 Когда приложение направляет к врачу

| Ситуация | Действие AI |
|---|---|
| Extreme caloric restriction (mention) | Popup с ресурсами профессиональной помощи + NEDA Helpline |
| ED-индикаторы (purging, self-harm) | Кризисная линия + «пожалуйста, поговори со специалистом» |
| Blood sugar instability (Paul-тип) | «Обратитесь к эндокринологу для мониторинга — изменения лучше отслеживать вместе с врачом» |
| Тяжёлые симптомы withdrawal >2 нед. | «Эти симптомы могут иметь другую причину — лучше проконсультироваться с врачом» |
| Mental health crisis signs | Crisis line + «не ты один, профессиональная помощь работает» |

### 6.3 Технические ограничения

| Ограничение | Риск | Решение |
|---|---|---|
| Food database accuracy | Sugarfree провалился именно здесь («every item I scan has wrong info») | Open Food Facts + curated corrections + user reports. Не запускать scanner до quality pipeline |
| Added vs. natural sugar | MyFitnessPal не может — годами. Технически сложно | AI-classification + curated database. Лучше честно показать «неизвестно», чем ошибиться |
| Cold start ML prediction | Trigger prediction требует 7+ дней данных | Days 1–7: generic time-based alerts. Day 7+: personalized. Transparent communication |
| AI hallucinations | AI может выдумать nutritional facts | RAG с verified food database. Не генерировать nutrition facts «из памяти» |
| Cultural food bias | AI trained on Western norms может не понимать культурные продукты | Diverse food database + explicit cultural sensitivity в system prompt |

---

## 7. Доказательная база цифровых вмешательств

### 7.1 Эффективность digital behavior change

| Исследование | N | Результат |
|---|---|---|
| **Meta-analysis digital dietary interventions (JMIR 2026)** | 24,652 (52 RCT) | d = 0.33 (95% CI 0.25–0.42, p < 0.001). Сильнее у молодых (d = 0.46) |
| **iSIPsmarter RCT (2025)** | 249 | Digital behavioral intervention: small-medium effect на SSB. Потеря веса на 6 мес.: ES = 0.23, p = 0.046 |
| **Johns Hopkins AI DPP RCT (2025)** | Phase III | AI-app = человеческим CDC Diabetes Prevention Programs по benchmark |
| **AI + CGM App (Nature, 2025)** | 944 | Здоровые: time in range 74.7% → 85.5%. T2D: 49.7% → 57.4% |
| **Mindfulness meta-analysis (BMC Psych, 2025)** | Multiple RCT | Food craving: g = 0.43–0.63 |

**Вывод:** d = 0.33 — реальный, статистически значимый и clinically meaningful эффект. AI усиливает его.

### 7.2 Behavior Change Frameworks, применяемые в продукте

**COM-B Model** (Capability × Opportunity × Motivation → Behavior):
- Capability: знания (curriculum) + навыки (coping techniques, урге surfing)
- Opportunity: «Eat This Instead» (физическая) + community (социальная)
- Motivation: AI coaching (рефлективная) + streaks/gamification (автоматическая)

**Fogg Behavior Model** (Motivation × Ability × Prompt):
- SOS button = Prompt в момент высокой Motivation (тяга) при максимально низком Ability barrier (одно нажатие)
- Daily check-in = Prompt (push) + Ability (30 сек) + Motivation (streak не потерять)

**6 Behavior Change Techniques с наибольшей evidence в mHealth:**
1. Goal setting → Onboarding quiz: твоя цель на 30/90 дней
2. Self-monitoring of behavior → Daily sugar tracking + craving log
3. Feedback on behavior → Weekly AI summary: что изменилось
4. Prompts/cues → Predictive trigger alerts
5. Rewards → Streak система + milestone badges
6. Social support → Community + accountability partners

Все 6 реализованы в дизайне Sugar Quit.

---

*Следующий документ: [Competitors](./COMPETITORS.md) — детальный анализ конкурентного ландшафта.*
