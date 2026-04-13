# Исследование: Онбординг мобильных приложений

**Дата:** 13 апреля 2026
**Категория:** Health & Fitness / Lifestyle
**Контекст:** Sugar Quit — AI-коуч для отказа от сахара, $9.99/мес подписка

---

## 1. Бенчмарки

### 1.1 Конверсия онбординга по категориям

| Метрика | Значение | Источник |
|---------|----------|----------|
| Глобальный уровень завершения онбординга (Q2 2025) | 8.4% после 30 дня | [Business of Apps](https://www.businessofapps.com/data/app-onboarding-rates/) |
| Средний completion rate чеклиста онбординга | 19.2% (медиана 10.1%) | [Userpilot](https://userpilot.com/blog/onboarding-checklist-completion-rate-benchmarks/) |
| 90%+ пользователей НЕ завершают все шаги онбординга | >90% | [Business of Apps](https://www.businessofapps.com/data/app-onboarding-rates/) |
| Health & Fitness — install-to-trial конверсия (top 10%) | 12.1% | [RevenueCat State of Subscription Apps 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/) |
| Health & Fitness — trial-to-paid медиана | 35.0–39.9% | [Adapty State of In-App Subscriptions 2026](https://adapty.io/state-of-in-app-subscriptions/) / [RevenueCat 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/) |
| Health & Fitness — trial-to-paid (top 10%) | 68.3% | [RevenueCat State of Subscription Apps 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/) |
| Health & Fitness — install LTV (самый высокий среди категорий) | $1.20 | [Adapty State of In-App Subscriptions 2026](https://adapty.io/state-of-in-app-subscriptions/) |
| Глобальный install-to-trial | 10.9% | [Adapty 2026](https://adapty.io/state-of-in-app-subscriptions/) |
| Глобальный trial-to-paid | 25.6% | [Adapty 2026](https://adapty.io/state-of-in-app-subscriptions/) |

### 1.2 Когда начинаются триалы

| Метрика | Значение | Источник |
|---------|----------|----------|
| Триал-старты в день 0 (день установки) | 82–89.4% | [RevenueCat 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/) / [Adapty 2026](https://adapty.io/state-of-in-app-subscriptions/) |
| 80% free trials конвертируются в день 1 | 80% | [DEV Community — Subscription Onboarding Patterns](https://dev.to/paywallpro/subscription-onboarding-15-patterns-you-must-know-4n4f) |
| Hard paywall — 78% начинают триал в первую неделю | 78% | [Airbridge](https://www.airbridge.io/en/blog/hard-vs-soft-paywalls) |

**Вывод:** Paywall должен быть в конце онбординга — 82–89% всех триалов начинаются в день установки. Откладывание paywall = потеря основного окна конверсии.

### 1.3 Оптимальное количество шагов

| Данные | Источник |
|--------|----------|
| Типичный онбординг: 3–5 экранов (для стандартных приложений) | [NN/g](https://www.nngroup.com/articles/mobile-app-onboarding/) / [Chameleon](https://www.chameleon.io/blog/mobile-user-onboarding) |
| 72% пользователей считают, что онбординг должен занимать ≤60 секунд | [Clutch survey, via Chameleon](https://www.chameleon.io/blog/mobile-user-onboarding) |
| Каждый дополнительный шаг теряет ~20% пользователей | [Gabor Cselle, Medium](https://medium.com/gabor/every-step-costs-you-20-of-users-b613a804c329) |
| НО: Noom имеет 80–96+ экранов и $750M+ ARR | [Retention Blog](https://www.retention.blog/p/the-longest-onboarding-ever) |
| Flo имеет до 400 экранов (с ветвлением) | [Flo Health Engineering](https://learnings.aleixmorgadas.dev/p/mobile-onboarding-evolution-at-flo) |

**Вывод:** Для health/wellness quiz-based онбординг ДЛИННЫЙ = хорошо, если каждый шаг увеличивает perceived value. Правило "3–5 шагов" не применимо к quiz-based health-приложениям. ([Retention Blog](https://www.retention.blog/p/the-longest-onboarding-ever))

### 1.4 Drop-off по шагам воронки

| Этап | Drop-off | Источник |
|------|----------|----------|
| Stage 1 → Stage 2 | 38% | [Amra and Elma](https://www.amraandelma.com/funnel-drop-off-rate-statistics/) |
| Stage 2 → Stage 3 | 29% | [Amra and Elma](https://www.amraandelma.com/funnel-drop-off-rate-statistics/) |
| Stage 3 → Stage 4 | 27.3% | [Amra and Elma](https://www.amraandelma.com/funnel-drop-off-rate-statistics/) |
| Day-1 retention (глобальный) | ~26% | [UXCam](https://uxcam.com/blog/mobile-app-retention-benchmarks/) |

**Вывод:** Самый большой drop-off — на первом переходе (38%). Первый экран критичен: должен зацепить сразу.

---

## 2. Что конвертирует (с примерами приложений)

### 2.1 Персонализация (quiz-based онбординг)

| Факт | Эффект | Источник |
|------|--------|----------|
| Персонализированный онбординг повышает retention | +82% | [Brandon Hall Group, via UserGuiding](https://userguiding.com/blog/user-onboarding-statistics) |
| Персонализированные пути повышают completion rate | +35% | [UserGuiding](https://userguiding.com/blog/user-onboarding-statistics) |
| Персонализированный онбординг повышает retention | +40% | [Plotline](https://www.plotline.so/blog/mobile-app-onboarding-checklist) |
| Персонализированные paywalls обходят стандартные | +15%+ | [Adapty](https://adapty.io/blog/how-to-design-a-paywall-for-a-mobile-app/) |
| Имя пользователя на paywall повышает конверсию | +17% | [Adapty](https://adapty.io/blog/how-to-design-a-paywall-for-a-mobile-app/) |
| Интерактивные туры повышают активацию | +50% | [Plotline](https://www.plotline.so/blog/mobile-app-onboarding-checklist) |
| Airtable: переработка онбординга подняла activation | +20% | [Lenny's Newsletter](https://www.lennysnewsletter.com/p/mastering-onboarding-lauryn-isford) |

**Примеры:** Noom (quiz определяет "психологический тип диеты"), Flo (ветвящийся опросник по целям здоровья), Headspace (персонализация медитаций), Headway (quiz + Story-формат).

### 2.2 Прогресс-бары

| Факт | Эффект | Источник |
|------|--------|----------|
| Прогресс-бары снижают drop-off | Да | [Plotline](https://www.plotline.so/blog/mobile-app-onboarding-checklist) |
| Указание времени прохождения снижает drop-off | до –40% | [Retention Blog — Headway analysis](https://www.retention.blog/p/headway-evolution-2024-2025) |
| Анимированный multi-step онбординг имеет выше completion | +22% | [UserGuiding](https://userguiding.com/blog/user-onboarding-statistics) |
| Чеклист с 1 пунктом уже отмеченным повышает конверсию | 3x | [Indie Hackers](https://www.indiehackers.com/post/onboarding-opportunities-that-most-of-us-will-miss-cd6069130a) |
| Noom: loading bars ("ваш план создается") | конверсия +10–20% | [Retention Blog](https://www.retention.blog/p/the-longest-onboarding-ever) |

### 2.3 Social proof во время онбординга

| Факт | Источник |
|------|----------|
| Calm включает social proof в середину онбординга — мотивирует завершить | [UXCam](https://uxcam.com/blog/10-apps-with-great-user-onboarding/) |
| Показывать людей, ПОХОЖИХ на пользователя, важнее общей статистики | [UXCam](https://uxcam.com/blog/10-apps-with-great-user-onboarding/) |
| Отзывы, логотипы СМИ, партнёрства повышают доверие | [DEV Community](https://dev.to/paywallpro/subscription-onboarding-15-patterns-you-must-know-4n4f) |
| Noom показывает партнёрские логотипы + testimonials → $750M+ ARR | [Retention Blog](https://www.retention.blog/p/the-longest-onboarding-ever) |
| Рекомендуемая последовательность: Problem → Outcome → How it works → Social proof → Offer | [DEV Community](https://dev.to/paywallpro/subscription-onboarding-15-patterns-you-must-know-4n4f) |

### 2.4 "Aha-moment" до paywall

| Факт | Источник |
|------|----------|
| Headspace даёт дыхательное упражнение ДО paywall — демо ценности | [DEV Community](https://dev.to/paywallpro/effective-paywall-examples-in-health-fitness-apps-2025-3op9) |
| 90% пользователей уходят без чёткой ценности в первую неделю | [Plotline](https://www.plotline.so/blog/mobile-app-onboarding-checklist) |
| Noom: behavioral quiz + прогноз потери веса ДО paywall → invested buy-in | [Retention Blog](https://www.retention.blog/p/the-longest-onboarding-ever) |
| Пользователь должен понять ценность в первую минуту | [Lenny's Newsletter](https://www.lennysnewsletter.com/p/mastering-onboarding-lauryn-isford) |
| Активационная метрика = самая ранняя точка, показывающая ценность | [Lenny's Newsletter](https://www.lennysnewsletter.com/p/how-to-determine-your-activation) |

### 2.5 Gratification / reward после каждого шага

| Факт | Источник |
|------|----------|
| Headway чередует вопросы и мотивационные экраны — баланс ask/give | [Retention Blog — Headway](https://www.retention.blog/p/headway-evolution-2024-2025) |
| Чеклист с отметкой выполненных пунктов даёт "дофаминовый удар" | [Indie Hackers](https://www.indiehackers.com/post/onboarding-opportunities-that-most-of-us-will-miss-cd6069130a) |
| Noom: позитивное подкрепление при вводе веса ("отличный первый шаг!") | [Retention Blog](https://www.retention.blog/p/the-longest-onboarding-ever) |

---

## 3. Best-in-class примеры

### 3.1 Noom (Weight Loss / Health)

- **Категория:** Здоровье, снижение веса
- **Количество экранов:** 80–96+ (рост с 26 в 2020 году)
- **Revenue:** $750M+ ARR
- **Что делает хорошо:**
  - Quiz определяет "психологический тип диеты" с ветвлением
  - Loading bars создают ощущение обработки данных (конверсия +10–20%)
  - Персонализированный прогноз потери веса ДО paywall
  - Таймер обратного отсчёта на paywall ("план сохранён 15 минут")
  - Цена в локальной валюте (повышает доверие)
  - Входная стоимость $0.50 (снижение барьера)
  - Aristotle framework: Logos + Ethos + Pathos
- **Источники:** [Retention Blog](https://www.retention.blog/p/the-longest-onboarding-ever), [Paddle/Noom](https://www.paddle.com/studios/shows/fix-that-funnel/noom)

### 3.2 Flo (Women's Health)

- **Категория:** Здоровье женщин
- **Количество экранов:** до 400 (с ветвлением), ~70 экранов в основном потоке (~7 минут)
- **Что делает хорошо:**
  - Онбординг = критический growth lever для PLG-компании
  - Каждый вопрос углубляет commitment пользователя
  - Повышает perceived value персонализации
  - Множественные ветки по целям и подцелям
  - Backend-driven архитектура для быстрых A/B тестов
- **Источники:** [Flo Health Medium](https://medium.com/flo-health/mobile-onboarding-evolution-part-1-cfc9702835ce), [Engineering Strategy](https://learnings.aleixmorgadas.dev/p/mobile-onboarding-evolution-at-flo)

### 3.3 Headway (Book Summaries / Education)

- **Категория:** Образование, книги
- **Пользователей:** 40+ млн
- **Что делает хорошо:**
  - Story-формат первого экрана (знакомый паттерн из соцсетей)
  - Указание времени прохождения (снижает drop-off до 40%)
  - Постоянное чередование вопросов и мотивационных экранов
  - Honesty + social proof + progress tracking + empathy + speed + personalization
  - Постепенное удлинение онбординга через тестирование
- **Источники:** [Retention Blog — Headway](https://www.retention.blog/p/headway-evolution-2024-2025), [Medium — Headway activation](https://medium.com/@rajputgrishma/8-user-activation-strategies-headway-used-to-onboard-40-million-users-01061e70aaa1)

### 3.4 Calm (Meditation / Sleep)

- **Категория:** Медитация, сон
- **Что делает хорошо:**
  - Social proof в середине онбординга
  - Иммерсивный paywall: настроение, звуки природы, celebrity narration
  - Эмоциональный дизайн
- **Источник:** [UXCam](https://uxcam.com/blog/10-apps-with-great-user-onboarding/)

### 3.5 Headspace (Meditation / Mindfulness)

- **Категория:** Медитация, mindfulness
- **Что делает хорошо:**
  - Клинический подход: иконки исследований, статистика снижения стресса
  - Демо продукта (дыхательное упражнение) ДО paywall
  - Personalization questionnaire
- **Источники:** [DEV Community](https://dev.to/paywallpro/effective-paywall-examples-in-health-fitness-apps-2025-3op9), [UXCam](https://uxcam.com/blog/10-apps-with-great-user-onboarding/)

### 3.6 Blinkist (Book Summaries)

- **Категория:** Образование
- **Что делает хорошо:**
  - "Honest Paywall": прозрачный таймлайн триала, напоминания, честные features
  - Конверсия +23%, жалобы –55%
- **Источник:** [DEV Community](https://dev.to/paywallpro/subscription-onboarding-15-patterns-you-must-know-4n4f)

### 3.7 Rootd (Anxiety / Panic)

- **Категория:** Ментальное здоровье
- **Что делает хорошо:**
  - Перенос paywall в начало онбординга → revenue x5
- **Источник:** [DEV Community](https://dev.to/paywallpro/subscription-onboarding-15-patterns-you-must-know-4n4f)

---

## 4. Антипаттерны (что НЕ работает)

### 4.1 Длинный онбординг БЕЗ ценности

Каждый шаг теряет ~20% пользователей, если не даёт ценности. НО длинный quiz-based онбординг работает, если каждый шаг повышает perceived value (Noom, Flo).

**Источник:** [Gabor Cselle, Medium](https://medium.com/gabor/every-step-costs-you-20-of-users-b613a804c329), [Retention Blog](https://www.retention.blog/p/the-longest-onboarding-ever)

### 4.2 Требование регистрации до демонстрации ценности

Требование sign-up отпугивает до 75% пользователей (Luke Wroblewski, Google). Лучше: "gradual engagement" — дать попробовать, потом просить аккаунт.

**Источник:** [Decode Agency](https://decode.agency/article/app-onboarding-mistakes/)

### 4.3 Запрос разрешений слишком рано

Пользователи нажимают "Не разрешать" быстрее, чем читают объяснение. После отказа изменить решение крайне сложно. Лучше: привязать запрос к контексту использования фичи. Пример: Fastic сначала показывает пользу, запрос нотификаций — в конце.

**Источники:** [Decode Agency](https://decode.agency/article/app-onboarding-mistakes/), [Appcues](https://www.appcues.com/blog/mobile-permission-priming)

### 4.4 Фокус на фичах вместо ценности

Пользователям не важно ЧТО делает приложение — важно ЧТО ОНО ДЕЛАЕТ ДЛЯ НИХ. Плохо: "функция рецептов". Хорошо: "никогда не переживайте, что приготовить".

**Источник:** [Decode Agency](https://decode.agency/article/app-onboarding-mistakes/)

### 4.5 Перегрузка информацией

Показ слишком многих деталей, избыточная информация, чрезмерная промо-активность. Решение: progressive disclosure — сначала самое важное, остальное позже.

**Источники:** [CleverTap](https://clevertap.com/blog/better-mobile-apps-onboarding-tips/), [Appcues](https://www.appcues.com/blog/mobile-onboarding-best-practices)

### 4.6 Отсутствие кнопки "Пропустить"

Нет кнопки "позже" или "пропустить" = пользователь уходит совсем. Лучше: кнопка "later" вместо жёсткого cancel.

**Источник:** [CleverTap](https://clevertap.com/blog/better-mobile-apps-onboarding-tips/)

### 4.7 Отсутствие поддержки после онбординга

66% retention на 30-й день, но только 35% на годовом уровне. Онбординг не заканчивается на paywall — нужен follow-up.

**Источники:** [Decode Agency](https://decode.agency/article/app-onboarding-mistakes/), [Retention Blog](https://www.retention.blog/p/onboarding-doesnt-end-at-the-paywall)

---

## 5. Рекомендации для Sugar Quit

### 5.1 Количество шагов

**Рекомендация: 15–25 экранов quiz-based онбординга** (3–5 минут)

Обоснование: health/wellness приложения с quiz-based онбордингом (Noom — 80+ экранов, Flo — 70+ экранов) показывают, что длинный персонализированный квиз повышает perceived value и conversion. Но Sugar Quit — первая версия, поэтому начинаем с 15–25 экранов и итерируем через A/B тесты. ([Retention Blog](https://www.retention.blog/p/the-longest-onboarding-ever))

### 5.2 Какие данные собирать

На основе паттернов Noom, Headspace и Flo:

1. **Цель** — "Зачем вы хотите сократить сахар?" (похудеть / здоровье / диабет / энергия / челлендж)
2. **Текущее потребление** — "Сколько сладкого вы едите в день?" (визуальные картинки)
3. **Триггеры** — "Когда вы больше всего тянетесь к сладкому?" (стресс / после обеда / вечер / скука)
4. **Прошлые попытки** — "Пробовали бросить раньше?" (никогда / пробовал / несколько раз)
5. **Образ жизни** — работа (офис/удалёнка), уровень стресса
6. **Мотивация** — "Что для вас будет лучшим результатом через 90 дней?"

### 5.3 Где показать ценность (Aha-moment)

**Рекомендация:** После quiz, ДО paywall — показать персонализированный результат:

- "Ваш профиль тяги: Stress Eater (3pm crash)"
- "Ваш план: 90-дневная программа, адаптированная под ваши триггеры"
- "Предсказание: ваш самый сложный момент — 15:00 в рабочие дни"
- Loading animation "Создаём ваш персональный план..." (как Noom — конверсия +10–20%, [Retention Blog](https://www.retention.blog/p/the-longest-onboarding-ever))

### 5.4 Предложенная структура онбординга

```
[Welcome] Приветствие + обещание ценности ("3 минуты → ваш персональный план")
     ↓
[Quiz блок 1: Цели] 3–4 экрана — зачем бросаете сахар
     ↓
[Мотивационный экран] Social proof ("127,000 пользователей уже сократили сахар")
     ↓
[Quiz блок 2: Привычки] 3–4 экрана — текущее потребление, триггеры
     ↓
[Мотивационный экран] "Вы не одиноки. 75% американцев хотят сократить сахар"
     ↓
[Quiz блок 3: Контекст] 3–4 экрана — образ жизни, прошлые попытки
     ↓
[Loading screen] "Создаём ваш персональный план..." (анимация 5–8 сек)
     ↓
[Результат] Персональный профиль: тип тяги + план + прогноз
     ↓
[PAYWALL] Trial 7 дней → $9.99/мес или $79.99/год
     ↓
[Пуш-запрос] В контексте: "Включить напоминания о предсказаниях тяги?"
     ↓
[Home] Первый день программы
```

### 5.5 Ключевые принципы

1. **Чередуйте вопросы и rewards** — после 3–4 вопросов показывайте мотивационный экран ([Retention Blog — Headway](https://www.retention.blog/p/headway-evolution-2024-2025))
2. **Прогресс-бар обязателен** — указание времени снижает drop-off до 40% ([Retention Blog](https://www.retention.blog/p/headway-evolution-2024-2025))
3. **Персонализация на paywall** — имя пользователя повышает конверсию +17% ([Adapty](https://adapty.io/blog/how-to-design-a-paywall-for-a-mobile-app/))
4. **Анимированный paywall** — 2.9x конверсия vs статический ([Adapty](https://adapty.io/blog/how-to-design-a-paywall-for-a-mobile-app/))
5. **Benefit-driven CTA** — "Начать мой план" вместо "Подписаться" ([DEV Community](https://dev.to/paywallpro/subscription-onboarding-15-patterns-you-must-know-4n4f))
6. **Мультиканальный онбординг** — +55% uplift 90-day retention за каждый дополнительный канал ([DEV Community / Braze data](https://dev.to/paywallpro/subscription-onboarding-15-patterns-you-must-know-4n4f))

---

*Данный документ основан на веб-исследовании открытых источников. Все факты подкреплены ссылками. Предпочтение отдано данным 2024–2026 годов.*
