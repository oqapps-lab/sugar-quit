# Исследование предметной области: Sugar Quit

**Дата:** 13 апреля 2026  
**Статус:** обновлено по первичным источникам  
**Companion Documents:** [PRODUCT-BRIEF](./PRODUCT-BRIEF.md), [USER-PERSONAS](./USER-PERSONAS.md), [COMPETITORS](./COMPETITORS.md)

---

## 1. Предметная область

Sugar Quit находится на стыке `nutrition`, `behavior change`, `digital health` и `consumer health privacy`.
Для MVP у проекта есть сильная база, если позиционировать его как **wellness-продукт для снижения added sugar и управления craving в моменте**, а не как лечение болезни.

### Что это за продукт на языке домена

- Не "лечение сахарной зависимости".
- Не "приложение для обратного разворота преддиабета".
- Не "AI-диетолог" и не "AI-терапевт".
- Да: `general wellness app`, который помогает взрослым:
  - отслеживать added sugar;
  - замечать триггеры и паттерны;
  - снижать потребление сладких напитков и снеков;
  - проходить craving без срыва;
  - возвращаться в рутину после lapse без shame.

### Главный вывод по науке

- Нет признанного клинического протокола уровня `CBT-I`, специально для "sugar addiction".
- Есть сильная база по:
  - снижению added/free sugars как public-health цели;
  - сокращению sugar-sweetened beverages;
  - digital behavior change через `goals/planning`, `feedback/monitoring`, `self-monitoring`, `social support`;
  - работе с craving, триггерами и окружением.
- Есть важное ограничение:
  - термин `sugar addiction` полезен как исследовательский и пользовательский shorthand, но слишком рискованный для маркетинговых claims и regulatory positioning.

### Глоссарий команды

| Термин | Что значит | Как использовать в проекте |
|---|---|---|
| **Sugar addiction** | Спорная исследовательская рамка про addictive-like паттерны вокруг сахара и highly palatable foods | Можно обсуждать в research и educational контенте с оговорками; не использовать как основной claim продукта |
| **Added sugars** | Сахара, добавленные при производстве или приготовлении продукта; именно они вынесены в Nutrition Facts Label в США | Базовая метрика MVP и основной язык продукта |
| **Free sugars** | Более широкая рамка WHO: added sugars плюс сахара в меде, сиропах, фруктовых соках и концентрированных соках | Нужна для scientific accuracy и международного контента |
| **Total sugars** | Все сахара в продукте: и естественные, и добавленные | Не путать с added sugars; для UX важнее показывать именно added sugars, если они известны |
| **SSB (sugar-sweetened beverages)** | Подслащенные напитки: soda, sweet tea, energy drinks, сладкий кофе, fruit drinks и т.д. | Самая сильная точка входа для MVP и контента, потому что по ним больше прямых исследований |
| **Craving** | Острое желание съесть или выпить что-то сладкое прямо сейчас | Ключевая единица UX: SOS, intensity rating, coping plan |
| **Trigger** | Ситуация, время, эмоция, место или рутина, которые запускают craving | Основа для prediction и personalized reminders |
| **Cue reactivity** | Усиленная реакция на cues: вид еды, запах, офисные сладости, реклама, привычный автомат с шоколадом | Важно для дизайна анти-триггерных советов и контента про окружение |
| **Habit loop** | Цикл `cue -> routine -> reward` | Нужен для curriculum и AI-коучинга, чтобы менять не только еду, но и рутину |
| **Lapse / slip** | Единичный эпизод отклонения от плана | Используем язык "lapse", а не "провал" |
| **Relapse** | Возврат к старому паттерну после периода изменений | Для продукта важнее recovery loop, чем наказание за relapse |
| **Disordered eating red flags** | Признаки потенциально небезопасного отношения к еде: extreme restriction, purging, binge-restrict cycle, obsessive tracking | Основа safety rules и escalation |
| **Self-monitoring** | Самонаблюдение: лог intake, cravings, триггеров, сна, настроения | Один из самых поддержанных цифровых механизмов изменения поведения |
| **Implementation intentions** | If-then планы: "Если потянет на сладкое в 15:00, я..." | Хорошая структура для AI-ответов и push/reminder UX |
| **CBT** | Cognitive Behavioral Therapy; работа с мыслями, интерпретациями и привычными реакциями | Подходит как inspiration для tone и exercises, но не надо называть продукт терапией |
| **Urge surfing** | Техника наблюдения за craving без немедленного действия | Подходит для SOS flows и short exercises |
| **Food environment** | Окружение, которое облегчает или затрудняет выбор: офисные снеки, домашние запасы, маршрут, доставка | Важнее силы воли; контент должен помогать менять среду |
| **Nutrition Facts Label / %DV** | Американская этикетка с данными о питательной ценности, включая added sugars и % Daily Value | База для label literacy и food education |
| **General wellness product** | Низкорисковый wellness-продукт, поддерживающий healthy lifestyle без claims про diagnosis/treatment | Это правильная regulatory рамка для MVP |
| **PHI** | Protected Health Information по HIPAA | Возникает в основном, если продукт работает от имени covered entity / business associate |
| **Special category health data** | "Sensitive" health data по GDPR | Если идем в EU/EEA, нужно проектировать продукт так, будто мы обрабатываем именно эту категорию данных |

---

## 2. Экспертные источники

### 5 ключевых источников

| Источник | Что подтверждает | Что это значит для Sugar Quit |
|---|---|---|
| **WHO. _Guideline: Sugars intake for adults and children_ (4 марта 2015)** | Сильная public-health рекомендация: снижать free sugars до `<10%` дневной энергии; `<5%` дает дополнительные преимущества | У продукта есть понятная внешняя норма и benchmark; контент можно строить вокруг снижения free/added sugar, а не вокруг "детокса" |
| **Avena, Rada, Hoebel. _Evidence for sugar addiction_ (2008)** | В animal models intermittent excessive sugar intake показывает bingeing, withdrawal, craving, cross-sensitization и изменения в reward pathways | Полезно для объяснения, почему craving ощущается как "не просто слабая воля", но этого недостаточно для medical claims |
| **Westwater, Fletcher, Ziauddeen. _Sugar addiction: the state of the science_ (2016)** | В людях доказательная база слабее; многие addiction-like эффекты у животных завязаны на intermittent access и high palatability | Продукту лучше говорить "sugar habits", "cravings", "behavior change", а не "лечим зависимость" |
| **Villinger et al. _The effectiveness of app-based mobile interventions on nutrition behaviours..._ (2019)** | Meta-analysis: app-based interventions дают небольшие, но значимые улучшения в nutrition behaviors и health outcomes; самые частые BCT-кластеры: `goals/planning`, `feedback/monitoring`, `shaping knowledge`, `social support` | Это прямое обоснование для daily check-ins, tracking, reminders, micro-learning и community |
| **Turner/Hedrick et al. _A digital behavioral intervention to reduce sugar-sweetened beverage consumption_ (2025)** | RCT: structured digital intervention + tracking + personalized action planning снизили SSB intake сильнее, чем static education, эффект сохранялся через 6 месяцев | Есть прямой evidence, что digital sugar-reduction intervention может работать, особенно если она не только educates, но и ведет через действия |

### Что подтверждено достаточно хорошо

- Снижение added/free sugars и особенно `SSB` полезно как общественная и клинически релевантная цель.
- Digital interventions реально могут менять nutrition behavior, если в них есть:
  - понятная цель;
  - self-monitoring;
  - action planning;
  - reminders;
  - feedback;
  - social support.
- SOS-механика логично опирается на craving-management и if-then planning.

### Что подтверждено слабее или требует осторожности

- Что у человека существует отдельная диагностическая сущность "sugar addiction" в клиническом смысле.
- Что one-size-fits-all "sugar detox" безопасен и эффективен для всех.
- Что искусственные подсластители автоматически решают проблему в долгую.

### Практический вывод для продукта

- Научная база у проекта есть.
- Но strongest case не в том, что "сахар равен наркотикам".
- Strongest case в том, что:
  - люди реально хотят снизить сахар;
  - WHO/CDC/NHS дают ясные ориентиры;
  - цифровые behavior-change механики работают;
  - самый сильный MVP-угол для нас: `craving management + trigger detection + SSB reduction + label literacy`.

---

## 3. Регуляторика и safety-рамки

> Ниже продуктовые выводы, а не юридическое заключение. Перед launch нужен health-tech counsel review.

### 3.1 Нужны ли лицензии

**Для direct-to-consumer wellness MVP обычно не нужна отдельная "медицинская лицензия", если продукт:**

- не заявляет diagnosis, cure, mitigation, prevention или treatment болезни;
- не интерпретирует медицинские данные как клиническое решение;
- не дает patient-specific treatment suggestions;
- не выдает AI за врача, терапевта или диетолога.

**Но лицензирование становится релевантным, если:**

- вы добавляете живых dietitians и они дают `medical nutrition therapy`;
- вы продаете сервис клиникам, страховщикам, employer health plans;
- вы вводите human therapy/coaching с терапевтическими обещаниями;
- вы делаете disease-specific workflows для diabetes/prediabetes/eating disorders.

**Отдельный нюанс по экспертам:**

- Commission on Dietetic Registration прямо рекомендует nutrition professionals иметь нужную state licensure/certification в тех штатах, где находятся клиенты.
- Иными словами: advisory review контента можно делать без live patient care, а вот live expert coaching уже требует отдельной юрпроверки.

### 3.2 Нужен ли FDA clearance

По состоянию на **6 января 2026 года** FDA обновила guidance по `General Wellness: Policy for Low Risk Devices`.

Для Sugar Quit MVP базовая рамка такая:

- **Скорее нет**, если мы остаемся в `general wellness`.
- **Риск растет**, если мы делаем claims вроде:
  - "лечит сахарную зависимость";
  - "предотвращает диабет";
  - "снижает A1C";
  - "дает персонализированное лечение";
  - "клинически заменяет специалиста".

### 3.3 Что можно и нельзя заявлять

| Можно | Нельзя |
|---|---|
| "Помогает отслеживать added sugar" | "Лечит сахарную зависимость" |
| "Помогает замечать триггеры и cravings" | "Предотвращает или лечит диабет" |
| "Поддерживает healthier habits around sugar" | "Нормализует глюкозу" |
| "Educational coaching backed by nutrition guidance and behavior science" | "Клинически доказано лечит" без соответствующей доказательной базы |
| "Помогает сократить sugary drinks и сладкие перекусы" | "Обращает вспять prediabetes" |
| "Not medical advice" + честное описание функций | Дисклеймер, который противоречит основному обещанию, например: "лечит acne" + "for entertainment only" |

**Ключевой FTC-принцип:** health-related claims должны быть правдивыми, не misleading и заранее подкреплены `competent and reliable scientific evidence`. Дисклеймер сам по себе не чинит ложный claim.

### 3.4 Disclaimers, которые нужны MVP

Минимальный набор:

1. **General wellness disclaimer**
   - "Sugar Quit is a general wellness tool for education, self-monitoring, and habit support."

2. **No medical advice / no treatment disclaimer**
   - "Sugar Quit is not intended to diagnose, treat, cure, or prevent any disease and is not a substitute for professional medical advice."

3. **Emergency disclaimer**
   - "Do not use this app in an emergency. If you are experiencing severe symptoms or a crisis, contact local emergency services."

4. **High-risk user disclaimer**
   - "If you have diabetes, prediabetes, an eating disorder, are pregnant, or have another medical condition, consult a qualified clinician before making major dietary changes."

5. **AI limitation disclaimer**
   - "AI responses are educational and supportive, may be incomplete, and should not be relied on for diagnosis or treatment decisions."

6. **Community disclaimer**
   - "Community content reflects user experiences and is not medical advice."

### 3.5 HIPAA, FTC, GDPR, COPPA

| Тема | Что это значит для Sugar Quit MVP |
|---|---|
| **HIPAA** | Direct-to-consumer app **обычно не подпадает под HIPAA**, если работает напрямую с пользователем, а не от имени covered entity. HHS OCR формулирует это еще точнее: если вы offering services directly to consumers, а не on behalf of provider/plan/clearinghouse, вы `not likely` subject to HIPAA. |
| **FTC Health Breach Notification Rule** | Если HIPAA не применяется, это не значит "никаких правил". После изменений, объявленных FTC **26 апреля 2024 года** и вступивших в силу **29 июля 2024 года**, rule прямо подчеркивает применимость к большинству health apps и similar technologies. |
| **GDPR / special category data** | Если идем в EU/EEA, health-related data становится special category data. Практически это значит: explicit consent, purpose limitation, minimization, deletion/export flows, прозрачная privacy notice и отдельная осторожность с profiling/prediction. |
| **COPPA** | Если продукт направлен на детей до 13 лет или у вас есть actual knowledge, что ими пользуются дети до 13, нужны parental notice/consent и COPPA compliance. Проще и безопаснее для MVP: `18+` или как минимум строгий age gate и отсутствие child-directed marketing. |
| **State consumer health privacy laws** | Даже вне HIPAA direct-to-consumer health data уже отдельно регулируется на уровне штатов. Самый важный watchlist-пример: Washington `My Health My Data Act`, который требует privacy policy, consent, deletion rights и ограничивает сбор/шаринг consumer health data. |

### 3.6 Минимальные product requirements по данным

Для MVP стоит считать обязательными:

- явные opt-in для чувствительных интеграций:
  - HealthKit / Google Fit;
  - location;
  - calendar;
  - push reminders по health-related profiling;
- раздельные цели обработки:
  - account;
  - analytics;
  - personalization;
  - marketing;
- data minimization:
  - не собирать GPS и биометрию "на всякий случай";
- retention policy:
  - хранить только пока данные реально нужны;
- export/delete flows:
  - сразу закладывать в архитектуру;
- red-team на тему:
  - sharing with ad platforms;
  - training AI на user logs без явного согласия;
  - hidden secondary use.

### 3.7 Главный safety-риск: disordered eating

Это не edge case, а core product risk.

Исследования по diet/fitness tracking apps показывают связь с disordered eating behaviors у части пользователей, особенно в уязвимых группах.

Что это значит для Sugar Quit:

- не делать weight-loss app "под капотом";
- не делать shame-based streak language;
- не вознаграждать extreme restriction;
- не строить продукт вокруг calories-first UX;
- вводить escalation rules для:
  - binge-restrict language;
  - purging;
  - extreme fasting;
  - self-harm / crisis;
  - medical instability.

---

## 4. Контентная стратегия

### 4.1 На каких данных строим контент

Контент должен строиться по иерархии:

1. **Официальные рекомендации**
   - WHO
   - CDC
   - NHS
   - FDA label guidance

2. **Systematic reviews / meta-analyses / RCTs**
   - app-based nutrition interventions
   - sugar reduction
   - SSB reduction
   - disordered-eating safety

3. **Экспертная редактура**
   - RD/RDN
   - clinical psychologist / eating-behavior specialist

4. **User research**
   - как люди формулируют craving;
   - какие триггеры реально повторяются;
   - какие swaps они действительно принимают.

**Не строим контент на:**

- TikTok detox claims;
- "clean eating" moralization;
- неподтвержденных обещаниях про inflammation/hormones/"brain reset";
- blanket claims, что diet soda или sweeteners автоматически решают проблему.

### 4.2 Контентные pillars для MVP

| Pillar | На чем стоит | Что можно выпускать |
|---|---|---|
| **Added sugar literacy** | FDA label guidance, CDC, NHS | Как читать label, difference between total vs added sugars, hidden sugar patterns |
| **SSB reduction** | WHO guidance, 2025 RCT | 7-дневные мини-программы по sweet coffee, soda, energy drinks |
| **Cravings and triggers** | behavior science, craving-management, habit loop | SOS scripts, trigger maps, urge surfing, if-then plans |
| **Environment design** | habit change + cue reduction | Офис, дом, доставка, grocery swaps, snack defaults |
| **Recovery after lapse** | relapse-prevention lens, anti-shame framing | "Что делать после срыва", "как не превратить один cookie в плохую неделю" |
| **Sleep / stress / routine links** | косвенно сильная behavior-change база | Контент про связь poor sleep, stress, energy dips и sweet cravings без disease claims |

### 4.3 Нужны ли эксперты

**Да. Для launch не нужен большой advisory board, но нужны минимум 2 реальные роли.**

Минимум до публичного запуска:

- **1 RD/RDN**
  - проверяет sugar-related content, swaps, label literacy, safety формулировок;
- **1 clinical psychologist / therapist с опытом eating behaviors**
  - проверяет anti-shame tone, relapse handling, ED risk, AI safety prompts.

Желательно до scale/B2B:

- **1 endocrinologist или PCP**
  - ревью claims и границ продукта для prediabetes audience;
- **privacy/regulatory counsel**
  - claims review, consent flows, privacy design, state-law watchlist.

### 4.4 Редакционная система

Контенту нужен простой workflow:

1. Черновик от product/content team.
2. Проверка фактов по primary sources.
3. Safety review.
4. Expert review.
5. Tagging по evidence level:
   - `Guideline-backed`
   - `Systematic review / RCT-backed`
   - `Expert consensus`
   - `User insight`
6. Дата последнего review.

### 4.5 Tone of voice

Правильный тон:

- supportive;
- non-judgmental;
- concrete;
- anti-shame;
- progress-oriented.

Неправильный тон:

- moralizing;
- "cheat day" / "bad food" language;
- punishment for lapse;
- all-or-nothing challenge framing as default;
- aggressive biohacking promises.

### 4.6 Чего не должно быть в MVP-контенте

- "90-day sugar detox cures inflammation"
- "Quit sugar and reverse prediabetes"
- "AI meal plans for medical conditions"
- "Fast for 24 hours after a binge"
- автоматический совет всем перейти на artificial sweeteners как основную стратегию

---

## 5. Выводы для продукта и ограничения MVP

### Главные инсайты

- У Sugar Quit есть хорошая evidence base, если продукт продается как `general wellness + behavior change`.
- Самая сильная исследовательская опора не в теме "addiction treatment", а в теме:
  - `added sugar reduction`
  - `SSB reduction`
  - `self-monitoring`
  - `planning`
  - `trigger detection`
  - `support in the moment`
- Лучший язык продукта:
  - "reduce sugar"
  - "manage cravings"
  - "spot triggers"
  - "build healthier habits around sugar"

### Ограничения для MVP

- Не делать disease claims.
- Не делать child-focused продукт.
- Не добавлять live therapeutic or clinical coaching без отдельной legal review.
- Не строить core UX вокруг calories, weight и restriction.
- Не обещать персонализированные medical outcomes.

### Что стоит делать в MVP

- Фокус на взрослых.
- Сильный SOS flow.
- Daily check-ins и trigger logging.
- Label literacy и SSB reduction как самые понятные и доказуемые контентные вертикали.
- Жесткие AI safety rules вокруг eating disorders и medical advice.
- Privacy-by-design с явными consent flows и delete/export support.

### Одной фразой

**Sugar Quit стоит строить как AI-supported wellness coach для снижения added sugar и прохождения cravings, а не как продукт, который "лечит зависимость" или дает клиническое питание/терапию.**

---

## Основные источники

- [WHO: Guideline: sugars intake for adults and children (2015)](https://www.who.int/publications/i/item/9789241549028/)
- [WHO: Healthy diet fact sheet](https://www.who.int/en/news-room/fact-sheets/detail/healthy-diet)
- [WHO: non-sugar sweeteners guideline update (15 May 2023)](https://www.who.int/news/item/15-05-2023-who-advises-not-to-use-non-sugar-sweeteners-for-weight-control-in-newly-released-guideline)
- [CDC: Get the Facts - Added Sugars](https://www.cdc.gov/nutrition/php/data-research/added-sugars.html)
- [NHS: Sugar - the facts](https://www.nhs.uk/live-well/eat-well/how-does-sugar-in-our-diet-affect-our-health/)
- [FDA: General Wellness: Policy for Low Risk Devices (January 2026)](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/general-wellness-policy-low-risk-devices)
- [FDA: Added Sugars on the Nutrition Facts Label](https://www.fda.gov/food/nutrition-facts-label/added-sugars-nutrition-facts-label)
- [FTC: Health Products Compliance Guidance](https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance)
- [FTC: Health Breach Notification Rule - The Basics for Business](https://www.ftc.gov/business-guidance/resources/health-breach-notification-rule-basics-business)
- [FTC: Mobile Health App Interactive Tool](https://www.ftc.gov/business-guidance/resources/mobile-health-apps-interactive-tool)
- [HHS OCR: Health App Use Scenarios & HIPAA (February 2016)](https://www.hhs.gov/sites/default/files/ocr-health-app-developer-scenarios-2-2016.pdf)
- [EDPB: Process personal data lawfully](https://www.edpb.europa.eu/sme-data-protection-guide/process-personal-data-lawfully_en)
- [EDPB: Guidelines 05/2020 on consent under Regulation 2016/679](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en)
- [Washington AG: My Health My Data Act overview](https://www.atg.wa.gov/protecting-washingtonians-personal-health-data-and-privacy)
- [Avena, Rada, Hoebel (2008): Evidence for sugar addiction](https://pubmed.ncbi.nlm.nih.gov/17617461/)
- [Westwater, Fletcher, Ziauddeen (2016): Sugar addiction - the state of the science](https://pubmed.ncbi.nlm.nih.gov/27372453/)
- [Villinger et al. (2019): app-based mobile nutrition interventions meta-analysis](https://pubmed.ncbi.nlm.nih.gov/31353783/)
- [Turner/Hedrick et al. (2025): digital intervention to reduce sugar-sweetened beverage consumption](https://pubmed.ncbi.nlm.nih.gov/40513952/)
- [Hahn et al. (2022): self-monitoring apps and disordered eating behaviors](https://pubmed.ncbi.nlm.nih.gov/35065981/)
- [Commission on Dietetic Registration: State Licensure](https://www.cdrnet.org/LicensureMap)
