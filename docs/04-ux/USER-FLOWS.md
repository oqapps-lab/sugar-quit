# User Flows: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** UX Design (Stage 3)
**Источники:** [Features](../02-product/FEATURES.md), [Target Audience](../02-product/TARGET-AUDIENCE.md), [Practices Brief](../03-practices/PRACTICES-BRIEF.md), [Onboarding Research](../03-practices/ONBOARDING-RESEARCH.md), [Paywall Research](../03-practices/PAYWALL-RESEARCH.md)

---

## Flow 1: First Launch (Установка → Онбординг → Paywall → Home)

**Персона:** Stress Sarah, 32 года, нашла приложение через TikTok
**Цель:** Пройти онбординг за <5 минут, увидеть ценность, начать trial
**Связанные фичи:** F4 (Onboarding), F5 (Auth), F9 (Subscription)

### Happy Path

```
[App Store Install]
    ↓
[Welcome Screen] — "Победи тягу к сахару с AI-коучем" + "3 минуты → ваш план"
    ↓
[Quiz Block 1: Цели] — 3 экрана
    "Зачем сократить сахар?" → карточки (здоровье / энергия / вес / challenge)
    "Ваша цель?" → quit completely / reduce gradually
    "Что мотивирует больше всего?" → карточки
    ↓
[Мотивационный экран 1] — "127,000+ людей уже снизили сахар с Sugar Quit"
    ↓
[Quiz Block 2: Привычки] — 3 экрана
    "Когда тяга сильнее всего?" → time picker (утро / день 14-16 / вечер / ночь)
    "Что триггерит?" → мульти-выбор (стресс / скука / привычка / social / эмоции)
    "Сколько сладкого в день?" → визуальные карточки (мало / средне / много)
    ↓
[Мотивационный экран 2] — "75% американцев хотят сократить сахар. Вы не одиноки"
    ↓
[Quiz Block 3: Контекст] — 3 экрана
    "Пробовали раньше?" → никогда / 1-2 раза / много раз
    "Где обычно работаете?" → офис / удалённо / гибрид
    "Имя для персонализации" → текстовое поле (опционально)
    ↓
[Loading Screen] — "Создаём ваш персональный план..." (анимация 5-8 сек)
    ↓
[Result Screen] — "Ваш профиль: Stress Eater (3pm crash)"
    + план 90 дней + прогноз первой недели + кнопка "Начать"
    ↓
[Paywall] — персонализированный, 2 тира, 7-day trial, honest timeline
    ↓ [Start Trial] или [Maybe Later → ограниченный free]
[Auth Screen] — Sign in with Apple / Google (1 tap)
    ↓
[Push Permission] — "Включить предсказания тяги?" (в контексте)
    ↓
[Home Screen] — Day 1, streak = 0, SOS кнопка, первый урок curriculum
    ↓
[First SOS Demo] — tooltip: "Когда почувствуешь тягу — нажми SOS"
```

### Error States

| Состояние | Экран | Действие |
|-----------|-------|----------|
| Нет интернета при загрузке | Welcome | "Нет соединения. Подключитесь к интернету для настройки" + Retry |
| Auth failed (Apple/Google) | Auth | "Не удалось войти. Попробуйте другой способ" + альтернативные кнопки + Email fallback |
| Paywall не загрузился (Adapty) | Paywall | Fallback: статический paywall с локальными данными. Логирование ошибки |
| Push permission denied | Push запрос | Тихий skip. Через 3 дня: in-app banner "Включите уведомления, чтобы не пропустить тягу" |
| App Store purchase failed | Paywall | "Покупка не удалась. Проверьте Apple ID" + Retry + "Восстановить покупку" |

### Edge Cases

| Кейс | Поведение |
|------|-----------|
| Пользователь закрыл app на середине quiz | При возврате — продолжение с того же экрана (persist quiz state) |
| Пользователь нажал "Maybe Later" на paywall | → Home в free-режиме (3 SOS/мес, curriculum Day 1-3) |
| Пользователь уже имеет аккаунт (reinstall) | Auth → детект existing account → restore subscription → Home с данными |
| Quiz пройден, но app crash на Loading | При re-open → quiz данные сохранены → показать Result + Paywall |
| Пользователь не ввёл имя | Paywall без имени: "Ваш план готов!" (без "[Name]") |

---

## Flow 2: SOS Craving Conversation (Core Action)

**Персона:** Stress Sarah, 3pm, офис, тяга к шоколаду
**Цель:** Победить тягу через AI-разговор за 2-5 минут
**Связанные фичи:** F1 (SOS AI Coach), F7 (Craving Logger)

### Happy Path

```
[Home Screen] — Sarah чувствует тягу к сладкому в 15:00
    ↓
[SOS Button tap] — floating button, always visible, haptic feedback
    ↓
[SOS Chat Screen] — полноэкранный чат, AI начинает за <3 сек
    ↓
AI: "Привет! Я чувствую, что тебе сейчас непросто. Расскажи, что происходит?"
    ↓
Sarah: "Сижу на работе, после встречи, хочу шоколад"
    ↓
AI: "Понимаю — стресс после встреч + 3pm энергетический спад. Это нейрохимия, не слабость."
    → AI спрашивает контекст (где, что чувствует, что хочет)
    → AI предлагает альтернативу: "Попробуй горсть орехов + тёмный шоколад 85% (1 квадратик)"
    → AI предлагает действие: "Встань, пройди 5 минут, выпей воды"
    ↓
[5-15 messages, 2-5 минут]
    ↓
AI: "Как ты себя чувствуешь? Тяга прошла?"
    ↓
[Post-SOS Screen] — "Тяга побеждена?" → Да ✅ / Нет, но стало легче 😌 / Сорвалась 😔
    ↓
[Craving Auto-Log] — время, интенсивность (auto), триггер (стресс), результат (побеждена)
    ↓
[Celebration] — анимация + "Тяга #12 побеждена! 🎯" + haptic
    ↓
[Home Screen] — обновлённый счётчик "Cravings Defeated: 12"
```

### Error States

| Состояние | Экран | Действие |
|-----------|-------|----------|
| Нет интернета | SOS Chat | "Нет соединения. Пока AI недоступен, попробуй: 1) Глубокий вдох 5 сек 2) Выпей стакан воды 3) Пройди 5 минут" — offline craving tips |
| AI timeout (>5 сек) | SOS Chat | Skeleton loader + "AI думает..." Через 10 сек: "Извини, загрузка. Пока попробуй дыхательное упражнение [4-7-8]" |
| AI error (API fail) | SOS Chat | "AI-коуч временно недоступен. Вот quick tips: [список из 3 альтернатив]" + Retry через 30 сек |
| Free лимит исчерпан | SOS Button tap | Modal: "Вы использовали 3 бесплатных SOS. Upgrade для unlimited" → Paywall |
| AI выдаёт неуместный ответ | SOS Chat | Кнопка "Это не помогает" → переключение стратегии AI / fallback на структурированные советы |

### Edge Cases

| Кейс | Поведение |
|------|-----------|
| Sarah закрыла чат на середине | Разговор сохраняется. При возврате: "Хочешь продолжить?" + история |
| Sarah нажимает SOS второй раз за час | Новый разговор с контекстом: "Ты недавно справилась с тягой. Что случилось?" |
| Sarah отмечает "Сорвалась" | AI: безосуждающий тон. "Это нормально. Каждый раз — информация. Что мы можем изменить?" |
| Первый SOS для нового пользователя | Чуть более структурированный разговор, AI объясняет, как работает процесс |
| SOS в 2am (нетипичное время) | AI адаптирует: "Поздно, и тяга сильная. Что не даёт тебе спать?" |

---

## Flow 3: Return Visit (Ежедневное возвращение)

**Персона:** Stress Sarah, Day 8, утро, открывает app по push-уведомлению
**Цель:** Daily check-in + curriculum + готовность к дню
**Связанные фичи:** F2 (Daily Check-in + Streak), F3 (Curriculum), F6 (Home Dashboard), F8 (Push)

### Happy Path

```
[Push Notification] — "Доброе утро! Как прошёл вчерашний день? 🌅" (настроенное время)
    ↓
[Tap Push] → App opens
    ↓
[Daily Check-in Card] — на Home screen, prominent
    "Как прошёл вчерашний день?"
    → Sugar-free ✅ / Had some 🍬 / Full relapse 🔄
    ↓
[Mood Check] — emoji picker (5 вариантов): 😊 😌 😐 😟 😤
    ↓
[Check-in Complete] — streak обновлён
    "Day 8! 🔥" + celebration animation + haptic
    ↓
[Home Dashboard] — обновлённый
    - Streak: 8 дней 🔥
    - Cravings defeated: 15 (на этой неделе: 6)
    - Today's lesson: "Day 8: Ваши taste buds начинают меняться"
    - Motivational quote дня
    - Quick stats: $24 сэкономлено, 480g сахара избежено
    ↓
[Tap "Today's Lesson"] → Curriculum screen
    ↓
[Curriculum: Day 8] — "Что происходит с вашими вкусовыми рецепторами"
    - 5-7 мин чтения
    - Нейронаука + практический совет
    - Мини-задание: "Попробуйте сегодня фрукт, который раньше казался 'не сладким'"
    ↓
[Lesson Complete] — progress bar "Day 8 из 90" + badge progress
    ↓
[Home Dashboard] — урок отмечен, SOS кнопка доступна на весь день
```

### Error States

| Состояние | Экран | Действие |
|-----------|-------|----------|
| Нет интернета | Home | Показать cached данные (streak, last check-in). Banner: "Офлайн. Данные синхронизируются при подключении" |
| Пользователь не отвечает на push 3 дня | Push | Escalation: "Твой streak в опасности! 🔥 Зайди, чтобы сохранить 8-дневный прогресс" |
| Server sync fail при check-in | Check-in | Сохранить локально, retry при восстановлении сети. Показать: "Сохранено! Синхронизируем позже" |

### Edge Cases

| Кейс | Поведение |
|------|-----------|
| Пропустил check-in вчера | Streak freeze (1 бесплатный/нед, 3 Premium). "Использовать Streak Freeze?" → Да / Нет (streak сброшен) |
| Открыл app без push (сам) | Home → check-in card сверху, если не выполнен сегодня |
| Check-in в 23:59 | Засчитывается за текущий день. Новый день в 00:00 local time |
| Пользователь отметил "Full relapse" | Безосуждающий ответ: "Это часть процесса. Streak начинается заново, но опыт остаётся. Хочешь поговорить?" → SOS |
| Curriculum урок уже прочитан | "Перечитать" доступно. Следующий урок разблокируется завтра |
| Первый день (нет данных) | Home: пустое состояние с onboarding tips, "Ваш первый день! Вот что будет происходить..." |

---

## Flow 4: Upgrade Flow (Free → Paywall → Оплата)

**Персона:** Stress Sarah, Day 5, free tier, использовала 3 SOS, хочет ещё
**Цель:** Конвертировать в paid subscriber через natural paywall trigger
**Связанные фичи:** F1 (SOS — лимит), F3 (Curriculum — locked), F9 (Subscription)

### Happy Path

```
[Home Screen] — Sarah чувствует тягу, Day 5
    ↓
[SOS Button tap] — 4-й SOS в месяце
    ↓
[Soft Paywall Modal] — "Ваши 3 бесплатных SOS использованы в этом месяце"
    "Вы победили тягу 2 из 3 раз — впечатляюще! 🎯"
    "Upgrade для unlimited SOS"
    ↓
[Full Paywall Screen] — персонализированный
    - "Sarah, ваш план Sugar Reset ждёт"
    - "Тип тяги: Stress Eater (3pm crash)"
    - Что включено: Unlimited SOS, полный curriculum, analytics
    - Social proof: "127,000+ пользователей"
    - 2 тира: $9.99/мес | $79.99/год (recommended, "Save 44%")
    - Value anchor: "$0.22/день — меньше, чем 1 candy bar"
    - Honest timeline: Day 1 → Day 5 reminder → Day 7 charge
    - CTA: "Начать 7-дневный план бесплатно"
    ↓
[Apple/Google Pay] — native purchase flow
    ↓
[Success Screen] — "Добро пожаловать в Premium! 🎉"
    "Вот что теперь доступно:" → checklist анимация
    - ✅ Unlimited SOS AI
    - ✅ 90-дневная программа
    - ✅ Предсказание тяги
    - ✅ Streak Freeze ×3/неделя
    ↓
[Home Screen] — Premium badge, все фичи разблокированы
    ↓
[SOS доступен] — "Нажми SOS когда нужно. Теперь без лимита!"
```

### Альтернативные точки входа в paywall

```
Точка 1: Curriculum Day 4 locked
[Curriculum Tab] → Day 4 → 🔒 → "Upgrade для продолжения программы"
    ↓ → [Full Paywall]

Точка 2: Community post attempt
[Community] → "Ответить" → 🔒 → "Premium участники могут публиковать"
    ↓ → [Full Paywall]

Точка 3: Settings / Profile
[Settings] → "Управление подпиской" → "Upgrade to Premium"
    ↓ → [Full Paywall]

Точка 4: После успешного SOS
[SOS Complete] → "Тяга побеждена!" → "Хотите неограниченный доступ к AI-коучу?"
    ↓ → [Full Paywall]
```

### Error States

| Состояние | Экран | Действие |
|-----------|-------|----------|
| Purchase failed | Paywall | "Покупка не удалась. Проверьте платёжные данные в App Store" + Retry |
| Already subscribed (другое устройство) | Paywall | "Подписка найдена!" → Restore purchases → Home Premium |
| Нет интернета | Paywall | "Нет соединения. Подключитесь для оформления подписки" |
| Adapty SDK error | Paywall | Fallback: "Подписка временно недоступна. Попробуйте позже" + кнопка Settings |

### Edge Cases

| Кейс | Поведение |
|------|-----------|
| Пользователь закрыл paywall 3 раза | Уменьшить частоту показов. Следующий показ — через 3 дня или при следующем natural trigger |
| Trial закончился, не отменил | Auto-charge. Push за 1 день: "Ваш trial заканчивается завтра. Вы можете отменить в Settings" |
| Пользователь отменил trial в Day 2 | Доступ до Day 7. Push в Day 6: "Последний день trial! Вот чего вы достигли: [stats]" |
| Family Sharing | Поддержка через Apple/Google native. Adapty разруливает |

---

## Flow 5: Share Progress (Результат → Шеринг)

**Персона:** Challenge Chloe, Day 30, хочет поделиться в Instagram
**Цель:** Создать shareable card и опубликовать в Stories
**Связанные фичи:** F2 (Streak), F12 (Progress Dashboard — v1.0), F6 (Home)

### Happy Path

```
[Home Screen] — Chloe на Day 30
    ↓
[Milestone Celebration] — автоматически при открытии
    "🎉 30 ДНЕЙ БЕЗ САХАРА! 🎉"
    Confetti animation + haptic
    "Вот ваши достижения за месяц:"
    - 30 дней streak 🔥
    - 42 тяги побеждены
    - $72 сэкономлено
    - 1,800g сахара не съедено
    ↓
[Share Card Preview] — красивая карточка для social media
    ┌──────────────────────────┐
    │     SUGAR QUIT           │
    │     Day 30 ✓             │
    │                          │
    │  🔥 30 days sugar-free   │
    │  💪 42 cravings defeated │
    │  💰 $72 saved            │
    │                          │
    │  sugarquit.app           │
    └──────────────────────────┘
    ↓
[Share Button] → native iOS share sheet
    → Instagram Stories / TikTok / iMessage / Copy link
    ↓
[Share Complete] — "Поделились! 💜 Ваш прогресс вдохновляет других"
    ↓
[Home Screen]
```

### Альтернативные точки шеринга

```
Точка 1: Weekly summary (каждое воскресенье)
[Push] → "Ваш недельный отчёт готов!" → [Weekly Summary] → [Share]

Точка 2: Milestone badges
[Badge Earned] → "7 дней! 🏅" → [Share Badge Card]

Точка 3: Craving defeated
[SOS Complete] → "Тяга #50 побеждена!" → [Share Mini-Card]

Точка 4: Profile → Progress
[Profile] → [Progress Section] → [Share Card]
```

### Error States

| Состояние | Экран | Действие |
|-----------|-------|----------|
| Share sheet не открывается | Share Card | "Не удалось открыть шеринг. Карточка сохранена в галерею" → auto-save to Photos |
| Нет доступа к Photos | Share | Запросить доступ. При отказе: "Карточку можно скопировать через буфер обмена" |

### Edge Cases

| Кейс | Поведение |
|------|-----------|
| Milestone на Day 30, но streak = 25 (был сброс) | Показать: "30 дней в программе! Текущий streak: 25 дней" — честность |
| Пользователь на free tier | Share доступен, но без premium stats (predictions, detailed analytics) |
| Первый milestone (Day 1) | "Первый день — самый важный! 💪" → Share card с другим дизайном |
| Нет achievements для шеринга | Кнопка Share неактивна / "Завтра будет чем поделиться!" |

---

*Данный документ определяет ключевые пользовательские сценарии Sugar Quit. Каждый flow основан на фичах из [Features](../02-product/FEATURES.md) и best practices из [Practices Brief](../03-practices/PRACTICES-BRIEF.md).*
