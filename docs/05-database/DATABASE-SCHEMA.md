# Схема базы данных: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** Database Design (Stage 5)
**Источники:** [Features](../02-product/FEATURES.md), [Monetization](../02-product/MONETIZATION.md), [Screen Map](../04-ux/SCREEN-MAP.md), [User Flows](../04-ux/USER-FLOWS.md)

---

## Обзор

14 таблиц, покрывающих MVP-scope (F1–F9):

| Категория | Таблицы |
|-----------|---------|
| **Пользователь** | `profiles`, `user_settings`, `push_tokens` |
| **Подписка** | `subscriptions` |
| **SOS AI Coach** | `sos_sessions`, `sos_messages` |
| **Check-in / Streak** | `check_ins`, `streaks` |
| **Craving Logger** | `craving_logs` |
| **Curriculum** | `curriculum_lessons`, `user_lesson_progress` |
| **Достижения** | `milestones`, `user_milestones` |
| **Контент** | `daily_tips` |

Все таблицы в схеме `public`. RLS включена на всех без исключений.

---

## Таблица: profiles

**Назначение:** Расширение auth.users — профиль пользователя, данные онбординга, персонализация.
**Связана с:** auth.users (1:1)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | — | PK, FK → auth.users(id) ON DELETE CASCADE |
| display_name | text | NULL | NULL | Имя для персонализации (из онбординга) |
| avatar_url | text | NULL | NULL | URL аватара в Storage |
| goal | text | NULL | NULL | 'quit' / 'reduce' |
| motivation | text[] | NULL | NULL | Массив мотиваций: health, energy, weight, challenge |
| peak_craving_time | text | NULL | NULL | 'morning' / 'afternoon' / 'evening' / 'night' |
| triggers | text[] | NULL | NULL | Массив триггеров: stress, boredom, habit, social, emotional |
| consumption_level | text | NULL | NULL | 'low' / 'medium' / 'high' |
| past_attempts | text | NULL | NULL | 'never' / 'few' / 'many' |
| work_environment | text | NULL | NULL | 'office' / 'remote' / 'hybrid' |
| onboarding_completed | boolean | NOT NULL | false | Онбординг пройден |
| start_date | date | NULL | NULL | Дата начала программы (после онбординга) |
| timezone | text | NOT NULL | 'America/New_York' | Таймзона пользователя |
| created_at | timestamptz | NOT NULL | now() | |
| updated_at | timestamptz | NOT NULL | now() | |
| deleted_at | timestamptz | NULL | NULL | Мягкое удаление |

**Constraints:**
- `CHECK (goal IN ('quit', 'reduce'))` 
- `CHECK (peak_craving_time IN ('morning', 'afternoon', 'evening', 'night'))`
- `CHECK (consumption_level IN ('low', 'medium', 'high'))`
- `CHECK (past_attempts IN ('never', 'few', 'many'))`
- `CHECK (work_environment IN ('office', 'remote', 'hybrid'))`

**Индексы:**
- PK на `id`

**RLS:** Включена. Политики описаны в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: subscriptions

**Назначение:** Статус подписки, синхронизация с Adapty через webhook.
**Связана с:** auth.users

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NOT NULL | — | FK → auth.users(id) ON DELETE CASCADE |
| adapty_profile_id | text | NULL | NULL | ID профиля в Adapty |
| status | text | NOT NULL | 'free' | Статус подписки |
| plan | text | NOT NULL | 'free' | Текущий план |
| trial_start | timestamptz | NULL | NULL | Начало trial-периода |
| trial_end | timestamptz | NULL | NULL | Конец trial-периода |
| current_period_start | timestamptz | NULL | NULL | Начало текущего периода оплаты |
| current_period_end | timestamptz | NULL | NULL | Конец текущего периода оплаты |
| cancellation_date | timestamptz | NULL | NULL | Дата отмены |
| store | text | NULL | NULL | Источник покупки |
| raw_data | jsonb | NULL | NULL | Сырые данные webhook от Adapty |
| created_at | timestamptz | NOT NULL | now() | |
| updated_at | timestamptz | NOT NULL | now() | |

**Constraints:**
- `CHECK (status IN ('free', 'trial', 'active', 'expired', 'cancelled', 'grace_period'))`
- `CHECK (plan IN ('free', 'premium_monthly', 'premium_annual', 'lifetime'))`
- `CHECK (store IN ('app_store', 'play_store'))`
- `UNIQUE (user_id)` — один активный subscription per user

**Индексы:**
- `idx_subscriptions_user_id ON (user_id)`
- `idx_subscriptions_adapty_profile_id ON (adapty_profile_id)`
- `idx_subscriptions_status ON (status)` — для RLS-проверок premium-контента

**RLS:** Включена. Политики описаны в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: user_settings

**Назначение:** Настройки приложения — уведомления, предпочтения.
**Связана с:** auth.users

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NOT NULL | — | FK → auth.users(id) ON DELETE CASCADE, UNIQUE |
| checkin_reminder_enabled | boolean | NOT NULL | true | Утреннее напоминание о check-in |
| checkin_reminder_time | time | NOT NULL | '09:00' | Время напоминания |
| curriculum_reminder_enabled | boolean | NOT NULL | true | Напоминание об уроке дня |
| motivational_nudge_enabled | boolean | NOT NULL | true | Мотивационный nudge (1/день) |
| streak_risk_reminder_enabled | boolean | NOT NULL | true | "Не забудь отметиться!" |
| created_at | timestamptz | NOT NULL | now() | |
| updated_at | timestamptz | NOT NULL | now() | |

**Индексы:**
- `idx_user_settings_user_id UNIQUE ON (user_id)`

**RLS:** Включена. Политики описаны в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: push_tokens

**Назначение:** Хранение push-токенов устройств для Expo Notifications.
**Связана с:** auth.users

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NOT NULL | — | FK → auth.users(id) ON DELETE CASCADE |
| token | text | NOT NULL | — | Expo push token |
| platform | text | NOT NULL | — | Платформа устройства |
| is_active | boolean | NOT NULL | true | Токен активен |
| created_at | timestamptz | NOT NULL | now() | |
| updated_at | timestamptz | NOT NULL | now() | |

**Constraints:**
- `CHECK (platform IN ('ios', 'android'))`
- `UNIQUE (token)` — один токен = одно устройство

**Индексы:**
- `idx_push_tokens_user_id ON (user_id)`
- `idx_push_tokens_active ON (user_id, is_active) WHERE is_active = true`

**RLS:** Включена. Политики описаны в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: sos_sessions

**Назначение:** SOS AI-сессии — каждый SOS-разговор как отдельная сессия.
**Связана с:** auth.users, sos_messages (1:N), craving_logs (0:1)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NOT NULL | auth.uid() | FK → auth.users(id) ON DELETE CASCADE |
| status | text | NOT NULL | 'active' | Статус сессии |
| outcome | text | NULL | NULL | Результат: заполняется после сессии |
| started_at | timestamptz | NOT NULL | now() | Начало разговора |
| ended_at | timestamptz | NULL | NULL | Конец разговора |
| message_count | integer | NOT NULL | 0 | Количество сообщений |
| ai_model | text | NULL | NULL | Использованная AI-модель |
| metadata | jsonb | NULL | NULL | Доп. метаданные (latency, tokens, cost) |
| created_at | timestamptz | NOT NULL | now() | |
| updated_at | timestamptz | NOT NULL | now() | |
| deleted_at | timestamptz | NULL | NULL | Мягкое удаление |

**Constraints:**
- `CHECK (status IN ('active', 'completed', 'abandoned'))`
- `CHECK (outcome IN ('craving_defeated', 'felt_better', 'gave_in'))`

**Индексы:**
- `idx_sos_sessions_user_id ON (user_id)`
- `idx_sos_sessions_user_created ON (user_id, created_at DESC)` — для лимита free tier (3/мес)
- `idx_sos_sessions_status ON (user_id, status) WHERE status = 'active'` — поиск активной сессии

**RLS:** Включена. Политики описаны в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: sos_messages

**Назначение:** Сообщения внутри SOS-сессии (user + AI).
**Связана с:** sos_sessions (N:1), auth.users

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| session_id | uuid | NOT NULL | — | FK → sos_sessions(id) ON DELETE CASCADE |
| user_id | uuid | NOT NULL | — | FK → auth.users(id) ON DELETE CASCADE |
| role | text | NOT NULL | — | Роль отправителя |
| content | text | NOT NULL | — | Текст сообщения |
| token_count | integer | NULL | NULL | Количество токенов (для AI-сообщений) |
| created_at | timestamptz | NOT NULL | now() | |

**Constraints:**
- `CHECK (role IN ('user', 'assistant', 'system'))`

**Индексы:**
- `idx_sos_messages_session_id ON (session_id, created_at ASC)` — хронологический порядок сообщений
- `idx_sos_messages_user_id ON (user_id)`

**RLS:** Включена. Политики описаны в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: check_ins

**Назначение:** Ежедневные check-in записи (sugar status + mood).
**Связана с:** auth.users

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NOT NULL | auth.uid() | FK → auth.users(id) ON DELETE CASCADE |
| check_in_date | date | NOT NULL | CURRENT_DATE | Дата check-in (локальная дата пользователя) |
| sugar_status | text | NOT NULL | — | Статус за вчерашний день |
| mood | text | NOT NULL | — | Настроение |
| created_at | timestamptz | NOT NULL | now() | |

**Constraints:**
- `CHECK (sugar_status IN ('sugar_free', 'had_some', 'full_relapse'))`
- `CHECK (mood IN ('happy', 'calm', 'neutral', 'worried', 'stressed'))`
- `UNIQUE (user_id, check_in_date)` — один check-in в день

**Индексы:**
- `idx_check_ins_user_date ON (user_id, check_in_date DESC)` — последний check-in пользователя
- `idx_check_ins_date ON (check_in_date)` — для cron-агрегации

**RLS:** Включена. Политики описаны в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: streaks

**Назначение:** Трекинг streak пользователя (текущий, максимальный, freeze).
**Связана с:** auth.users (1:1)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NOT NULL | — | FK → auth.users(id) ON DELETE CASCADE, UNIQUE |
| current_streak | integer | NOT NULL | 0 | Текущий streak (дни) |
| longest_streak | integer | NOT NULL | 0 | Максимальный streak за всё время |
| streak_start_date | date | NULL | NULL | Дата начала текущего streak |
| last_check_in_date | date | NULL | NULL | Дата последнего check-in |
| freezes_used_this_week | integer | NOT NULL | 0 | Использовано freeze на этой неделе |
| freeze_week_start | date | NULL | NULL | Начало текущей недели для подсчёта freeze |
| created_at | timestamptz | NOT NULL | now() | |
| updated_at | timestamptz | NOT NULL | now() | |

**Индексы:**
- `idx_streaks_user_id UNIQUE ON (user_id)`

**RLS:** Включена. Политики описаны в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: craving_logs

**Назначение:** Логи тяги — вручную или автоматически после SOS-сессии.
**Связана с:** auth.users, sos_sessions (0:1)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NOT NULL | auth.uid() | FK → auth.users(id) ON DELETE CASCADE |
| intensity | integer | NOT NULL | — | Интенсивность тяги (1–5) |
| triggers | text[] | NOT NULL | '{}' | Массив триггеров |
| outcome | text | NOT NULL | — | Результат |
| note | text | NULL | NULL | Опциональная заметка |
| sos_session_id | uuid | NULL | NULL | FK → sos_sessions(id), если авто-лог из SOS |
| logged_at | timestamptz | NOT NULL | now() | Время тяги |
| created_at | timestamptz | NOT NULL | now() | |

**Constraints:**
- `CHECK (intensity BETWEEN 1 AND 5)`
- `CHECK (outcome IN ('resisted', 'gave_in'))`

**Индексы:**
- `idx_craving_logs_user_id ON (user_id, logged_at DESC)` — список тяг пользователя
- `idx_craving_logs_user_week ON (user_id, logged_at)` — для weekly summary
- `idx_craving_logs_sos ON (sos_session_id) WHERE sos_session_id IS NOT NULL`

**RLS:** Включена. Политики описаны в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: curriculum_lessons

**Назначение:** Справочник уроков 90-дневной программы (публичный контент).
**Связана с:** user_lesson_progress (1:N)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| day_number | integer | NOT NULL | — | Номер дня (1–90), UNIQUE |
| phase | text | NOT NULL | — | Фаза программы |
| title | text | NOT NULL | — | Заголовок урока |
| subtitle | text | NULL | NULL | Подзаголовок |
| content | text | NOT NULL | — | Содержание (markdown) |
| science_source | text | NULL | NULL | Ссылка на научный источник |
| task_description | text | NULL | NULL | Описание мини-задания |
| reading_time_minutes | integer | NOT NULL | 5 | Время чтения (минуты) |
| is_free | boolean | NOT NULL | false | Доступен на free tier (Day 1–3) |
| is_published | boolean | NOT NULL | false | Опубликован |
| sort_order | integer | NOT NULL | 0 | Порядок сортировки |
| created_at | timestamptz | NOT NULL | now() | |
| updated_at | timestamptz | NOT NULL | now() | |

**Constraints:**
- `UNIQUE (day_number)`
- `CHECK (phase IN ('acute', 'adaptation', 'improvement', 'stabilization', 'deepening', 'mastery'))`
- `CHECK (reading_time_minutes > 0)`

**Индексы:**
- `idx_curriculum_lessons_day ON (day_number)`
- `idx_curriculum_lessons_published ON (is_published, day_number) WHERE is_published = true`

**RLS:** Включена. Публичный контент для чтения. Подробности в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: user_lesson_progress

**Назначение:** Прогресс пользователя по урокам curriculum.
**Связана с:** auth.users, curriculum_lessons

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NOT NULL | auth.uid() | FK → auth.users(id) ON DELETE CASCADE |
| lesson_id | uuid | NOT NULL | — | FK → curriculum_lessons(id) ON DELETE CASCADE |
| status | text | NOT NULL | 'locked' | Статус урока для пользователя |
| started_at | timestamptz | NULL | NULL | Начало чтения |
| completed_at | timestamptz | NULL | NULL | Завершение |
| created_at | timestamptz | NOT NULL | now() | |
| updated_at | timestamptz | NOT NULL | now() | |

**Constraints:**
- `CHECK (status IN ('locked', 'unlocked', 'in_progress', 'completed'))`
- `UNIQUE (user_id, lesson_id)` — один прогресс per user per lesson

**Индексы:**
- `idx_user_lesson_progress_user ON (user_id, status)`
- `idx_user_lesson_progress_pair UNIQUE ON (user_id, lesson_id)`

**RLS:** Включена. Политики описаны в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: milestones

**Назначение:** Справочник достижений и milestone (Day 1, 3, 7, 14, 30...).
**Связана с:** user_milestones (1:N)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| type | text | NOT NULL | — | Тип достижения |
| title | text | NOT NULL | — | Название ("7 дней без сахара!") |
| description | text | NOT NULL | — | Описание |
| trigger_value | integer | NOT NULL | — | Значение для срабатывания (7 для "7 дней") |
| badge_image_url | text | NULL | NULL | URL изображения badge |
| sort_order | integer | NOT NULL | 0 | Порядок отображения |
| created_at | timestamptz | NOT NULL | now() | |

**Constraints:**
- `CHECK (type IN ('streak_days', 'cravings_defeated', 'days_in_program', 'lessons_completed'))`
- `UNIQUE (type, trigger_value)` — одно достижение per type+value

**Индексы:**
- `idx_milestones_type ON (type, trigger_value)`

**RLS:** Включена. Публичный контент для чтения. Подробности в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: user_milestones

**Назначение:** Полученные пользователем достижения.
**Связана с:** auth.users, milestones

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NOT NULL | auth.uid() | FK → auth.users(id) ON DELETE CASCADE |
| milestone_id | uuid | NOT NULL | — | FK → milestones(id) ON DELETE CASCADE |
| earned_at | timestamptz | NOT NULL | now() | Когда заработано |
| shared | boolean | NOT NULL | false | Было ли расшарено в social |
| created_at | timestamptz | NOT NULL | now() | |

**Constraints:**
- `UNIQUE (user_id, milestone_id)` — одно достижение не зарабатывается дважды

**Индексы:**
- `idx_user_milestones_user ON (user_id, earned_at DESC)`
- `idx_user_milestones_pair UNIQUE ON (user_id, milestone_id)`

**RLS:** Включена. Политики описаны в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Таблица: daily_tips

**Назначение:** Справочник мотивационных цитат и фактов дня.
**Связана с:** — (публичный контент)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| content | text | NOT NULL | — | Текст цитаты/факта |
| source | text | NULL | NULL | Источник (автор, исследование) |
| category | text | NOT NULL | — | Категория |
| is_active | boolean | NOT NULL | true | Активна для показа |
| created_at | timestamptz | NOT NULL | now() | |

**Constraints:**
- `CHECK (category IN ('motivation', 'science_fact', 'alternative_tip'))`

**Индексы:**
- `idx_daily_tips_active ON (is_active, category) WHERE is_active = true`

**RLS:** Включена. Публичный контент для чтения. Подробности в [RLS-POLICIES.md](./RLS-POLICIES.md).

---

## Сводная таблица

| Таблица | Тип | Rows (Year 1) | Soft Delete |
|---------|-----|---------------|-------------|
| profiles | user, 1:1 | ~500K | да |
| subscriptions | user, 1:1 | ~500K | нет |
| user_settings | user, 1:1 | ~500K | нет |
| push_tokens | user, 1:N | ~600K | нет |
| sos_sessions | user, 1:N | ~3M | да |
| sos_messages | session, N:1 | ~30M | нет (каскад) |
| check_ins | user, 1:N | ~18M | нет |
| streaks | user, 1:1 | ~500K | нет |
| craving_logs | user, 1:N | ~6M | нет |
| curriculum_lessons | reference | ~90 | нет |
| user_lesson_progress | user×lesson | ~2.5M | нет |
| milestones | reference | ~20 | нет |
| user_milestones | user×milestone | ~1.5M | нет |
| daily_tips | reference | ~500 | нет |

---

*Данный документ определяет полную схему БД Sugar Quit для MVP (F1–F9). RLS-политики — в [RLS-POLICIES.md](./RLS-POLICIES.md), миграции — в [MIGRATIONS.md](./MIGRATIONS.md).*
