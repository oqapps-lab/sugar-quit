# Database Specification: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** Database Design (Stage 5)
**Источники:** [DATABASE-SCHEMA.md](./DATABASE-SCHEMA.md), [Features](../02-product/FEATURES.md), [Monetization](../02-product/MONETIZATION.md)

---

## 1. Storage Buckets

Supabase Storage бакеты для медиа-файлов.

| Bucket | Назначение | Доступ | Max Size | Типы файлов |
|--------|-----------|--------|----------|-------------|
| `avatars` | Аватары пользователей | Authenticated: read/write own | 2 MB | image/jpeg, image/png, image/webp |
| `share-cards` | Сгенерированные share-карточки для social media | Authenticated: read own, Public: read by URL | 1 MB | image/png |

### Политики Storage

```sql
-- avatars: пользователь загружает/читает только свой аватар
-- Путь: avatars/{user_id}/avatar.{ext}
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view own avatar"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- share-cards: пользователь создаёт свои, public читает по URL
-- Путь: share-cards/{user_id}/{card_id}.png
CREATE POLICY "Users can upload own share cards"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'share-cards'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Anyone can view share cards"
ON storage.objects FOR SELECT
USING (bucket_id = 'share-cards');
```

---

## 2. Edge Functions

Supabase Edge Functions (Deno) для серверной логики.

| Function | Trigger | Описание | Auth |
|----------|---------|----------|------|
| `adapty-webhook` | HTTP POST (Adapty) | Обработка webhook от Adapty: обновление `subscriptions` | Adapty webhook secret |
| `sos-chat` | HTTP POST (клиент) | Проксирование запросов к Claude API для SOS-разговоров | Authenticated |
| `send-push` | Cron / HTTP | Отправка push-уведомлений через Expo Push API | Service role |
| `check-streaks` | Cron (ежедневно) | Проверка пропущенных check-in, обновление streak | Service role |
| `weekly-summary` | Cron (еженедельно) | Генерация weekly summary stats для push/in-app | Service role |

### adapty-webhook

```
POST /functions/v1/adapty-webhook

Задачи:
1. Валидация webhook signature
2. Парсинг события (subscription_started, renewed, cancelled, expired, trial_started)
3. Маппинг adapty_profile_id → user_id
4. UPSERT в public.subscriptions (service_role, обходит RLS)
5. Логирование в raw_data (jsonb)

Безопасность:
- Проверка X-Adapty-Webhook-Secret header
- Использование SUPABASE_SERVICE_ROLE_KEY (не anon)
- Идемпотентность: повторные webhook не создают дубли (UPSERT по user_id)
```

### sos-chat

```
POST /functions/v1/sos-chat

Задачи:
1. Проверка auth (JWT token)
2. Проверка лимита free tier (get_monthly_sos_count)
3. Загрузка контекста пользователя (профиль, последние craving_logs, текущий streak)
4. Вызов Claude API (claude-haiku-4-5) с system prompt + контекстом
5. Streaming response → клиент
6. Сохранение сообщений в sos_messages
7. Обновление message_count в sos_sessions

Безопасность:
- Auth required
- Rate limit: 1 concurrent session per user
- Claude API key — в env переменных Edge Function
- System prompt: safety guardrails (no medical advice, no shaming, ED detection)
```

### send-push

```
Cron: ежечасно (для check-in reminder, curriculum reminder, streak risk)

Задачи:
1. Запрос пользователей с user_settings → enabled notifications
2. Проверка timezone пользователя → is it time?
3. Для check-in reminder: проверка check_ins за сегодня (уже есть?)
4. Для streak risk: проверка streaks.last_check_in_date
5. Отправка через Expo Push API (batch до 100)
6. Деактивация невалидных токенов (DeviceNotRegistered)
```

### check-streaks

```
Cron: ежедневно 00:30 UTC

Задачи:
1. Найти пользователей с last_check_in_date < yesterday
2. Для каждого:
   a. Если есть доступный freeze (free: 1/нед, premium: 3/нед) → auto-freeze? (нет — ждём user action)
   b. Если freeze не использован в течение 24h → сбросить streak
3. Сброс freezes_used_this_week в начале каждой недели
```

### weekly-summary

```
Cron: каждое воскресенье 10:00 UTC

Задачи:
1. Для каждого активного пользователя (check_in за последние 7 дней):
   a. Агрегация: cravings за неделю, success rate, streak days
   b. Определение тренда (лучше/хуже прошлой недели)
2. Push: "Ваш недельный отчёт готов!"
```

---

## 3. Realtime

Supabase Realtime подписки для мгновенного обновления UI.

| Таблица | Нужен Realtime | Причина |
|---------|---------------|---------|
| profiles | Нет | Редко меняется, клиент обновляет локально |
| subscriptions | **Да** | После покупки в Adapty → webhook → subscription update → UI разблокирует premium |
| streaks | Нет | Обновляется клиентом после check-in, не нужен server push |
| sos_messages | **Да** | Streaming AI-ответов в реальном времени (альтернатива: SSE через Edge Function) |
| все остальные | Нет | Нет потребности в realtime |

### Конфигурация

```sql
-- Включить Realtime для subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE public.subscriptions;

-- Опционально: для sos_messages (если не используем SSE)
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.sos_messages;
```

**Рекомендация:** Для SOS-чата предпочтительнее SSE (Server-Sent Events) через Edge Function `sos-chat`, а не Realtime на `sos_messages`. SSE даёт streaming с меньшей latency и не требует записи каждого chunk в БД.

---

## 4. Cron Jobs

Периодические задачи через pg_cron (Supabase Dashboard → Database → Extensions).

| Job | Schedule | Описание |
|-----|----------|----------|
| `check-streaks` | `30 0 * * *` (00:30 UTC daily) | Проверка пропущенных check-in, сброс streak |
| `reset-weekly-freezes` | `0 0 * * 1` (понедельник 00:00 UTC) | Сброс freezes_used_this_week = 0 |
| `weekly-summary` | `0 10 * * 0` (воскресенье 10:00 UTC) | Генерация weekly summary + push |
| `cleanup-abandoned-sessions` | `0 3 * * *` (03:00 UTC daily) | Закрытие SOS-сессий в 'active' старше 24h |
| `deactivate-expired-tokens` | `0 4 * * 0` (воскресенье 04:00 UTC) | Деактивация push-токенов с ошибками |

### SQL для cron jobs

```sql
-- Сброс weekly freezes каждый понедельник
SELECT cron.schedule(
  'reset-weekly-freezes',
  '0 0 * * 1',
  $$
    UPDATE public.streaks
    SET freezes_used_this_week = 0,
        freeze_week_start = CURRENT_DATE,
        updated_at = now()
    WHERE freezes_used_this_week > 0;
  $$
);

-- Закрытие abandoned SOS-сессий
SELECT cron.schedule(
  'cleanup-abandoned-sessions',
  '0 3 * * *',
  $$
    UPDATE public.sos_sessions
    SET status = 'abandoned',
        ended_at = now(),
        updated_at = now()
    WHERE status = 'active'
    AND started_at < now() - interval '24 hours';
  $$
);
```

---

## 5. Estimated Scale (Year 1)

Прогноз на основе [MONETIZATION.md](../02-product/MONETIZATION.md): 500K downloads, 100K MAU.

### Таблицы

| Таблица | Rows (Year 1) | Avg Row Size | Total Size |
|---------|---------------|-------------|------------|
| profiles | 500K | 500 B | ~250 MB |
| subscriptions | 500K | 300 B | ~150 MB |
| user_settings | 500K | 150 B | ~75 MB |
| push_tokens | 600K | 200 B | ~120 MB |
| sos_sessions | 3M | 300 B | ~900 MB |
| sos_messages | 30M | 500 B | ~15 GB |
| check_ins | 18M | 100 B | ~1.8 GB |
| streaks | 500K | 150 B | ~75 MB |
| craving_logs | 6M | 200 B | ~1.2 GB |
| curriculum_lessons | 90 | 5 KB | ~500 KB |
| user_lesson_progress | 2.5M | 150 B | ~375 MB |
| milestones | 20 | 500 B | ~10 KB |
| user_milestones | 1.5M | 100 B | ~150 MB |
| daily_tips | 500 | 300 B | ~150 KB |

### Итого

| Метрика | Значение |
|---------|----------|
| **Total rows** | ~62M |
| **Total data size** | ~20 GB |
| **Largest table** | sos_messages (~15 GB, 30M rows) |
| **Рост/месяц** | ~5M rows, ~1.7 GB |

### Supabase Plan

- **Year 1 start:** Pro Plan ($25/мес, 8 GB database, 250 GB bandwidth)
- **Year 1 mid:** Вероятно потребуется upgrade: database addon (+$25 за 16 GB)
- **Year 1 end:** ~20 GB data → Team Plan или Pro + addon

---

## 6. Backup Strategy

### Supabase Built-in

| Фича | Pro Plan | Описание |
|------|----------|----------|
| **Daily Backups** | ✅ (7 days retention) | Автоматические ежедневные бэкапы |
| **Point-in-Time Recovery** | ✅ (до 7 дней) | Восстановление на любую секунду за 7 дней |

### Дополнительные меры

| Мера | Частота | Описание |
|------|---------|----------|
| **pg_dump export** | Еженедельно | Полный дамп в S3/GCS для независимого хранения |
| **Migration versioning** | При каждом изменении | Все миграции в Git — возможность воссоздать схему с нуля |
| **Seed data backup** | При изменении контента | curriculum_lessons, milestones, daily_tips в Git как SQL |

### Disaster Recovery Plan

```
RPO (Recovery Point Objective): 1 минута (PITR)
RTO (Recovery Time Objective): < 1 час

Сценарий 1: Случайный DELETE → PITR до момента перед DELETE
Сценарий 2: Полная потеря → Restore daily backup + replay WAL
Сценарий 3: Суpabase outage → Ожидание (нет self-hosted backup в MVP)
```

---

## 7. Архитектурные решения

### 7.1 Почему отдельные таблицы, а не JSONB

| Данные | Решение | Причина |
|--------|---------|---------|
| Onboarding ответы | Колонки в `profiles` | Фиксированная структура (5-7 вопросов), нужны для queries и персонализации |
| AI metadata | JSONB в `sos_sessions.metadata` | Произвольная структура (latency, tokens, cost), не фильтруется |
| Adapty raw data | JSONB в `subscriptions.raw_data` | Debug/audit, не фильтруется |
| Триггеры тяги | text[] в `craving_logs.triggers` | Мульти-выбор из фиксированного набора, удобнее массива |

### 7.2 Streak tracking: отдельная таблица vs вычисление

**Решение:** Отдельная таблица `streaks` (materialized state).

**Альтернатива:** Вычислять streak из `check_ins` при каждом запросе.

**Почему materialized:**
- Home screen загружается при каждом открытии → streak нужен мгновенно
- Вычисление из check_ins O(n) по количеству check-in (до 365/год)
- Streak freeze logic требует state (freezes_used_this_week)
- Trade-off: дублирование данных vs скорость чтения → скорость критичнее

### 7.3 SOS free tier limit

**Решение:** Подсчёт через `get_monthly_sos_count()` function.

**Альтернатива:** Counter-колонка в `profiles` или `subscriptions`.

**Почему function:**
- Не нужен дополнительный state (counter может рассинхронизироваться)
- count(*) с индексом на (user_id, created_at) — быстрый запрос
- При ~15 SOS/мес per user — запрос работает по индексу, <1ms

### 7.4 Cascade strategy

Все FK → auth.users используют `ON DELETE CASCADE`.

**Обоснование:** При удалении аккаунта (GDPR Right to Erasure) все данные пользователя удаляются каскадно. Мягкое удаление `deleted_at` в `profiles` — для grace period до фактического удаления из auth.users.

**Процесс Delete Account:**
1. Пользователь нажимает "Delete Account" в Settings
2. Клиент → `profiles.deleted_at = now()` (soft delete, grace period 30 дней)
3. Cron job через 30 дней → `DELETE FROM auth.users WHERE id = ...` → CASCADE всех данных
4. Или: пользователь отменяет → `profiles.deleted_at = NULL`

---

## 8. Ограничения MVP

Что НЕ включено в текущую схему (добавится позже):

| Фича | Таблицы (будут добавлены) | Версия |
|------|--------------------------|--------|
| F10: "Eat This Instead" | `alternatives`, `alternative_categories`, `user_alternative_ratings` | v1.0 |
| F11: Community | `posts`, `comments`, `likes`, `reports` | v1.0 |
| F12: Progress Dashboard (full) | Views/materialized views для агрегации | v1.0 |
| F13: Curriculum Day 15-90 | Seed data в `curriculum_lessons` | v1.0 |
| F14: Craving Predictor | `prediction_models`, `predictions` | v1.5 |
| F15: Food Scanner | `scans`, `scan_results`, `food_database` | v2.0 |
| F17: Accountability Partners | `partnerships`, `partner_invites` | v2.0 |
| F18: Challenges | `challenges`, `challenge_participants`, `leaderboards` | v2.0 |

---

*Данный документ дополняет техническую спецификацию БД Sugar Quit. Схема — в [DATABASE-SCHEMA.md](./DATABASE-SCHEMA.md), миграции — в [MIGRATIONS.md](./MIGRATIONS.md).*
