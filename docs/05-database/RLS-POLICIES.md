# RLS-политики: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** Database Design (Stage 5)
**Источник:** [DATABASE-SCHEMA.md](./DATABASE-SCHEMA.md)

---

## Принципы

1. **RLS включена на ВСЕХ таблицах** — без исключений
2. **Пользователь видит только свои данные** — `auth.uid() = user_id`
3. **Справочные таблицы** — публичное чтение, запись только через миграции/admin
4. **Premium-контент** — проверка подписки через `subscriptions`
5. **Мягкое удаление** — WHERE `deleted_at IS NULL` в SELECT-политиках
6. **Webhook-таблицы** — INSERT/UPDATE через `service_role` (минуя RLS)

---

## Таблица: profiles

### SELECT
Пользователь видит только свой профиль (исключая мягко удалённые).

```sql
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (
  auth.uid() = id
  AND deleted_at IS NULL
);
```

### INSERT
Вставка только через триггер `handle_new_user()` (SECURITY DEFINER).
Пользователь не создаёт профиль напрямую.

```sql
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);
```

### UPDATE
Пользователь обновляет только свой профиль.

```sql
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id AND deleted_at IS NULL)
WITH CHECK (auth.uid() = id);
```

### DELETE
Физическое удаление запрещено. Soft delete через UPDATE `deleted_at`.

---

## Таблица: subscriptions

### SELECT
Пользователь видит только свою подписку.

```sql
CREATE POLICY "Users can view own subscription"
ON public.subscriptions FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT
Только через Adapty webhook (service_role). Клиент НЕ создаёт подписки напрямую.

```sql
-- Нет INSERT-политики для пользователей.
-- Adapty webhook использует service_role (обходит RLS).
```

### UPDATE
Только через Adapty webhook (service_role).

```sql
-- Нет UPDATE-политики для пользователей.
-- Adapty webhook использует service_role (обходит RLS).
```

### DELETE
Запрещено.

---

## Таблица: user_settings

### SELECT

```sql
CREATE POLICY "Users can view own settings"
ON public.user_settings FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT

```sql
CREATE POLICY "Users can insert own settings"
ON public.user_settings FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### UPDATE

```sql
CREATE POLICY "Users can update own settings"
ON public.user_settings FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### DELETE
Запрещено (удаляется каскадно с auth.users).

---

## Таблица: push_tokens

### SELECT

```sql
CREATE POLICY "Users can view own push tokens"
ON public.push_tokens FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT

```sql
CREATE POLICY "Users can insert own push tokens"
ON public.push_tokens FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### UPDATE

```sql
CREATE POLICY "Users can update own push tokens"
ON public.push_tokens FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### DELETE

```sql
CREATE POLICY "Users can delete own push tokens"
ON public.push_tokens FOR DELETE
USING (auth.uid() = user_id);
```

---

## Таблица: sos_sessions

### SELECT
Пользователь видит свои сессии (кроме мягко удалённых).

```sql
CREATE POLICY "Users can view own SOS sessions"
ON public.sos_sessions FOR SELECT
USING (
  auth.uid() = user_id
  AND deleted_at IS NULL
);
```

### INSERT

```sql
CREATE POLICY "Users can create own SOS sessions"
ON public.sos_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### UPDATE
Пользователь может обновить свою сессию (outcome, status, ended_at).

```sql
CREATE POLICY "Users can update own SOS sessions"
ON public.sos_sessions FOR UPDATE
USING (auth.uid() = user_id AND deleted_at IS NULL)
WITH CHECK (auth.uid() = user_id);
```

### DELETE
Физическое удаление запрещено. Soft delete через UPDATE `deleted_at`.

---

## Таблица: sos_messages

### SELECT
Пользователь видит сообщения только своих сессий.

```sql
CREATE POLICY "Users can view own SOS messages"
ON public.sos_messages FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT

```sql
CREATE POLICY "Users can insert own SOS messages"
ON public.sos_messages FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### UPDATE / DELETE
Запрещено. Сообщения иммутабельны.

---

## Таблица: check_ins

### SELECT

```sql
CREATE POLICY "Users can view own check-ins"
ON public.check_ins FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT

```sql
CREATE POLICY "Users can create own check-ins"
ON public.check_ins FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### UPDATE / DELETE
Запрещено. Check-in не редактируется после создания.

---

## Таблица: streaks

### SELECT

```sql
CREATE POLICY "Users can view own streak"
ON public.streaks FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT

```sql
CREATE POLICY "Users can insert own streak"
ON public.streaks FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### UPDATE

```sql
CREATE POLICY "Users can update own streak"
ON public.streaks FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### DELETE
Запрещено (удаляется каскадно с auth.users).

---

## Таблица: craving_logs

### SELECT

```sql
CREATE POLICY "Users can view own craving logs"
ON public.craving_logs FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT

```sql
CREATE POLICY "Users can create own craving logs"
ON public.craving_logs FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### UPDATE / DELETE
Запрещено. Логи иммутабельны.

---

## Таблица: curriculum_lessons

### SELECT
Публичные опубликованные уроки видны всем аутентифицированным пользователям.
Free-уроки (Day 1–3) — всем. Premium-уроки (Day 4+) — только подписчикам.

```sql
CREATE POLICY "Anyone can read free published lessons"
ON public.curriculum_lessons FOR SELECT
USING (
  is_published = true
  AND is_free = true
);

CREATE POLICY "Premium users can read all published lessons"
ON public.curriculum_lessons FOR SELECT
USING (
  is_published = true
  AND EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE user_id = auth.uid()
    AND status IN ('active', 'trial')
  )
);
```

### INSERT / UPDATE / DELETE
Запрещено для пользователей. Управление контентом — через миграции или admin-панель (service_role).

---

## Таблица: user_lesson_progress

### SELECT

```sql
CREATE POLICY "Users can view own lesson progress"
ON public.user_lesson_progress FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT

```sql
CREATE POLICY "Users can create own lesson progress"
ON public.user_lesson_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### UPDATE

```sql
CREATE POLICY "Users can update own lesson progress"
ON public.user_lesson_progress FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### DELETE
Запрещено.

---

## Таблица: milestones

### SELECT
Публичный справочник — доступен всем аутентифицированным.

```sql
CREATE POLICY "Authenticated users can view milestones"
ON public.milestones FOR SELECT
USING (auth.role() = 'authenticated');
```

### INSERT / UPDATE / DELETE
Запрещено. Управление — через миграции (service_role).

---

## Таблица: user_milestones

### SELECT

```sql
CREATE POLICY "Users can view own milestones"
ON public.user_milestones FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT

```sql
CREATE POLICY "Users can earn own milestones"
ON public.user_milestones FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### UPDATE

```sql
CREATE POLICY "Users can update own milestones"
ON public.user_milestones FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### DELETE
Запрещено.

---

## Таблица: daily_tips

### SELECT
Публичный справочник — доступен всем аутентифицированным.

```sql
CREATE POLICY "Authenticated users can view active tips"
ON public.daily_tips FOR SELECT
USING (
  auth.role() = 'authenticated'
  AND is_active = true
);
```

### INSERT / UPDATE / DELETE
Запрещено. Управление — через миграции (service_role).

---

## Сводка политик

| Таблица | SELECT | INSERT | UPDATE | DELETE |
|---------|--------|--------|--------|--------|
| profiles | own (no deleted) | own | own | — |
| subscriptions | own | service_role | service_role | — |
| user_settings | own | own | own | — |
| push_tokens | own | own | own | own |
| sos_sessions | own (no deleted) | own | own | — |
| sos_messages | own | own | — | — |
| check_ins | own | own | — | — |
| streaks | own | own | own | — |
| craving_logs | own | own | — | — |
| curriculum_lessons | free: all / premium: subscribers | — | — | — |
| user_lesson_progress | own | own | own | — |
| milestones | authenticated | — | — | — |
| user_milestones | own | own | own | — |
| daily_tips | authenticated (active) | — | — | — |

---

*Все политики применяются после `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`. SQL-код миграции политик — в [MIGRATIONS.md](./MIGRATIONS.md), миграция 006.*
