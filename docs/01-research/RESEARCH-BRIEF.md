# Research Brief: Sugar Quit

**Дата:** 13 апреля 2026  
**Статус:** Синтез research stage  
**Основа:** [DOMAIN-RESEARCH](./DOMAIN-RESEARCH.md), [MARKET-RESEARCH](./MARKET-RESEARCH.md), [COMPETITORS](./COMPETITORS.md), [USER-PERSONAS](./USER-PERSONAS.md), [PRODUCT-BRIEF](./PRODUCT-BRIEF.md), [SCORING-SUMMARY](./SCORING-SUMMARY.md)

> Примечание по источникам: в цифрах рынка есть расхождения между [MARKET-RESEARCH](./MARKET-RESEARCH.md) и [PRODUCT-BRIEF](./PRODUCT-BRIEF.md). Для этого brief базовой моделью считаю более свежий и консервативный [MARKET-RESEARCH](./MARKET-RESEARCH.md); более агрессивные оценки из [PRODUCT-BRIEF](./PRODUCT-BRIEF.md) трактую как upside. [SCORING-SUMMARY](./SCORING-SUMMARY.md) прочитан, но не содержит Sugar Quit и не использовался как количественная база для verdict.

---

## Elevator Pitch

**Sugar Quit — AI wellness-коуч для взрослых, который помогает заметить и пережить тягу к сладкому в моменте, снизить added sugar и вернуться в рутину без стыда.**

---

## Скоринг по 7 критериям

| Критерий | Оценка | Комментарий | Данные |
|---|---:|---|---|
| **1. Сила проблемы** | **9/10** | Проблема массовая и частая: `75%` американцев пытаются сократить или избегать сахар, а у всех 3 ключевых персон повторяется один и тот же JTBD — нужна помощь именно в момент тяги, а не постфактум. | [MR], [UP] |
| **2. Размер рынка** | **8/10** | Problem-side TAM очень большой (`200.2M` взрослых в США, которые уже хотят снизить сахар), но реалистичный monetizable SAM заметно уже — около `$406.6M` в North America paid diet/nutrition apps. Для нишевого B2C-продукта этого достаточно, но это не бездонный рынок. | [MR] |
| **3. Рост и тайминг** | **8/10** | Категория diet & nutrition apps растет с `13.4% CAGR`, paid behavior уже существует, а search intent по `sugar cravings` и `quit sugar` устойчив. При этом окно входа завязано на январский seasonality spike и не бесконечно. | [MR], [PB] |
| **4. Конкурентное окно** | **9/10** | Ниша открыта: прямые конкуренты маленькие, фрагментированные и страдают от слабых данных, hard paywall или отсутствия глубокой behavior-change логики. Явного category leader нет. | [CP] |
| **5. Дифференциация wedge** | **8/10** | Комбинация `SOS AI + predictive triggers + added-sugar intelligence + recovery loop` хорошо бьет в незакрытые боли. Но часть прямых игроков уже копирует отдельные элементы, поэтому выиграет не наличие фичи, а качество исполнения. | [CP], [UP], [PB] |
| **6. Монетизация** | **7/10** | Персоны показывают willingness to pay, а смежные приложения доказали subscription-модель. Но dedicated sugar-app willingness to pay пока не подтвержден на реальном paywall, а рынок уже показывает недоверие к weekly-first и paywall-first монетизации. | [UP], [CP], [MR] |
| **7. Исполнимость и risk profile** | **6/10** | Wellness positioning жизнеспособно, но execution сложный: accurate sugar data, moderation, privacy-by-design, AI guardrails и риск disordered eating делают проект не "простым health app", а дисциплинированным safety-first продуктом. | [DR], [CP], [PB] |

**Итоговый балл: 7.9/10.**

---

## Топ-5 инсайтов

1. **Ключевая ценность живет в окне 3-5 минут, когда craving уже начался.** Все источники сходятся в том, что существующие решения в основном retrospective: логирование, советы, челленджи, но не помощь в критический момент. Это делает `SOS AI` не nice-to-have, а core wedge. Опора: [UP], [CP], [PB].
2. **Самый сильный научный и продуктовый угол — не "лечить зависимость", а `craving management + trigger detection + SSB reduction + added sugar literacy`.** Именно в этой рамке у продукта сильная evidence base и меньше regulatory риска. Опора: [DR], [MR].
3. **Рынок открыт не потому, что спроса нет, а потому что текущие продукты плохо заслуживают доверие.** У конкурентов повторяются одни и те же проблемы: неточный sugar data layer, ранний paywall, слабая персонализация и узкие community-модели. Опора: [CP].
4. **Primary wedge для MVP — Stress Sarah, а не сразу "все, кто боится сахара".** Sarah чаще сталкивается с проблемой, понятнее монетизируется и лучше совпадает с realtime/SOS promise; Paul — хороший annual-plan expansion сегмент; Chloe — сильный acquisition segment, но и safety/churn risk. Опора: [UP].
5. **Нужно сознательно держать две модели рынка в голове: conservative base case и upside.** Conservative case из [MR] уже достаточен для `CAUTIOUS GO`, а агрессивные цифры из [PB] полезны только как upside-сценарий после доказанного retention и conversion. Опора: [MR], [PB].

---

## Основные риски

1. **Retention и willingness to pay могут оказаться слабее ожиданий.** Люди хотят "меньше сахара", но это еще не доказывает готовность платить за отдельное приложение годами. Главный вопрос не в спросе на идею, а в том, станет ли Sugar Quit устойчивой привычкой. Опора: [MR], [UP].
2. **Риск disordered eating — core product risk, а не edge case.** Особенно для аудитории типа Chloe AI может усилить shame, restriction или binge-restrict loop, если язык, streak-механики и community будут спроектированы неаккуратно. Опора: [DR], [UP].
3. **Claims, privacy и consumer health data требуют дисциплины с первого дня.** Продукту нельзя скатываться в "лечим зависимость", "разворачиваем prediabetes" или скрытый сбор sensitive data без clear consent и delete/export flows. Опора: [DR].
4. **Инкумбенты могут быстро зайти в категорию.** Noom, MyFitnessPal или другой крупный nutrition player могут добавить sugar layer, если увидят traction. Поэтому позиционирование и data moat важнее, чем просто "успеть сделать фичу". Опора: [CP], [PB].
5. **Trust gap по food/sugar data легко убьет продукт.** Конкуренты уже показали, что broken scanner и неточный added sugar tracking быстро уничтожают доверие и ценность подписки. Опора: [CP].

---

## Гипотезы для проверки

| Гипотеза | Почему это важно | Как проверить | Опора |
|---|---|---|---|
| **1. SOS AI побеждает static coping tools** | Если realtime-коучинг не помогает лучше, чем breathing/timer flow, то главный wedge не работает. | A/B: `SOS AI` vs. простой panic flow; метрика — craving defeated rate и повторное использование. | [UP], [CP], [PB] |
| **2. Predictive nudges повышают D30 retention** | Предсказание тяги — потенциальный moat, но только если реально меняет поведение и возвращаемость. | Cohort test: пользователи с trigger reminders vs. без них; метрики — D7/D30 retention, SOS opens. | [UP], [PB] |
| **3. SSB-first onboarding конвертирует лучше, чем "quit all sugar"** | SSB reduction и sweet coffee — самый доказуемый и понятный entry point, особенно для MVP. | Тест 2 onboarding flows и 2 landing pages; сравнить activation, first-week completion, paywall conversion. | [DR], [MR], [UP] |
| **4. Прозрачный free layer + annual-first pricing выигрывают у hard paywall** | Конкуренты сами показывают, что ранний paywall и weekly pricing разрушают trust. | Тест paywall: limited free SOS + annual plan vs. quiz-first / weekly-first. | [CP], [MR] |
| **5. Recovery loop после lapse снижает churn сильнее, чем streak-only подход** | Для этой категории важно не только "держаться", но и быстро возвращаться после срыва. | Сравнить churn и week-4 retention у пользователей с anti-shame recovery flow vs. обычным streak flow. | [UP], [DR], [CP] |

---

## Рекомендации для MVP

### Делать

- **Фокус на взрослых `18+` и на primary persona Stress Sarah.** Это самый чистый и частый use case для realtime craving support. Опора: [UP].
- **Строить MVP вокруг `SOS AI`, daily check-ins, trigger logging и recovery loop.** Это минимальный пакет, который соответствует ключевой боли и не превращает продукт в очередной tracker. Опора: [UP], [CP], [PB].
- **Заходить через SSB reduction, sweet coffee, office snacks и added sugar literacy.** Это и доказуемо с научной точки зрения, и понятно пользователю с первого дня. Опора: [DR], [MR].
- **Сразу заложить safety и privacy baseline:** explicit consent, delete/export, anti-ED guardrails, moderation rules, disclaimers. Опора: [DR].

### Не делать

- **Не позиционировать продукт как лечение "sugar addiction", prediabetes или любой болезни.** Это и научно, и регуляторно слабое место. Опора: [DR].
- **Не строить core UX вокруг calories, weight loss, shame и all-or-nothing detox framing.** Это повышает ED risk и ломает tone of voice. Опора: [DR], [UP].
- **Не выпускать сырой scanner или database-driven продукт, если нет trust-grade качества данных.** В этой категории broken data быстро обнуляет доверие. Опора: [CP].
- **Не ставить hard paywall до первого wow-moment.** У конкурентов это уже повторяющаяся причина раздражения и отказа от покупки. Опора: [CP].

### Монетизация

- **Базовая модель:** annual-first subscription около `$79.99/год` как baseline, плюс monthly tier `$9.99-14.99/мес`. Это лучше совпадает и с персонами, и с market sizing из [MR]. Опора: [MR], [UP].
- **Free layer должен доказывать value до оплаты:** ограниченные SOS-сессии, daily check-in, первые уроки, базовый progress loop. Опора: [CP], [PB].
- **B2B/insurance — не стартовый костыль, а stage-2 expansion.** Сначала нужно доказать consumer retention и claim-safe positioning. Опора: [MR], [DR], [PB].

---

## Verdict

**CAUTIOUS GO**

**Почему не NO GO:** проблема массовая, market timing хороший, категория фрагментирована, а wedge `SOS AI + trigger prediction + sugar-specific behavior change` действительно отличается от текущего рынка. У проекта есть и научная, и рыночная база, если держаться рамки `general wellness + behavior change`. Опора: [DR], [MR], [CP].

**Почему не full GO:** monetizable pool меньше, чем кажется по broad TAM narrative; willingness to pay за standalone sugar app еще не доказан; а safety/claims/privacy риски достаточно серьезны, чтобы плохой scope быстро сломал и продукт, и GTM. Опора: [MR], [DR], [UP].

**Рекомендация:** идти в разработку как narrow wedge MVP, если команда готова валидировать до масштабирования четыре вещи:

1. `Free -> Paid conversion >= 5-8%`
2. `D30 retention >= 30%`
3. `SOS` становится реальным привычным поведением, а не novelty feature
4. Safety baseline выдерживает реальный пользовательский язык без вредных сценариев

Если эти условия подтверждаются на beta, проект можно повышать из `CAUTIOUS GO` в `GO`. Если нет, правильнее не масштабировать broad subscription thesis, а сузить продукт до более легкого coaching/content wedge.

---

## Ссылки на источники

[MR]: ./MARKET-RESEARCH.md  
[DR]: ./DOMAIN-RESEARCH.md  
[CP]: ./COMPETITORS.md  
[UP]: ./USER-PERSONAS.md  
[PB]: ./PRODUCT-BRIEF.md  
[SS]: ./SCORING-SUMMARY.md
