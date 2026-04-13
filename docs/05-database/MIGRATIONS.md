# Миграции: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** Database Design (Stage 5)
**Источник:** [DATABASE-SCHEMA.md](./DATABASE-SCHEMA.md), [RLS-POLICIES.md](./RLS-POLICIES.md)

---

## Порядок миграций

| # | Файл | Описание |
|---|------|----------|
| 001 | `001_create_profiles.sql` | profiles + auto-create trigger |
| 002 | `002_create_user_settings.sql` | user_settings + auto-create |
| 003 | `003_create_subscriptions.sql` | subscriptions |
| 004 | `004_create_sos_tables.sql` | sos_sessions + sos_messages |
| 005 | `005_create_checkins_streaks.sql` | check_ins + streaks |
| 006 | `006_create_craving_logs.sql` | craving_logs |
| 007 | `007_create_curriculum.sql` | curriculum_lessons + user_lesson_progress |
| 008 | `008_create_milestones.sql` | milestones + user_milestones |
| 009 | `009_create_content_tables.sql` | daily_tips + push_tokens |
| 010 | `010_create_indexes.sql` | Все индексы |
| 011 | `011_create_rls_policies.sql` | Все RLS-политики |
| 012 | `012_create_utility_functions.sql` | Триггер updated_at, helper-функции |
| 013 | `013_seed_curriculum.sql` | Seed: уроки Day 1–14, milestones, daily_tips |

---

## Миграция 001: Profiles

```sql
-- 001_create_profiles.sql
-- Профиль пользователя — расширение auth.users

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  goal text CHECK (goal IN ('quit', 'reduce')),
  motivation text[],
  peak_craving_time text CHECK (peak_craving_time IN ('morning', 'afternoon', 'evening', 'night')),
  triggers text[],
  consumption_level text CHECK (consumption_level IN ('low', 'medium', 'high')),
  past_attempts text CHECK (past_attempts IN ('never', 'few', 'many')),
  work_environment text CHECK (work_environment IN ('office', 'remote', 'hybrid')),
  onboarding_completed boolean NOT NULL DEFAULT false,
  start_date date,
  timezone text NOT NULL DEFAULT 'America/New_York',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Автоматическое создание профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## Миграция 002: User Settings

```sql
-- 002_create_user_settings.sql
-- Настройки приложения (уведомления)

CREATE TABLE IF NOT EXISTS public.user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  checkin_reminder_enabled boolean NOT NULL DEFAULT true,
  checkin_reminder_time time NOT NULL DEFAULT '09:00',
  curriculum_reminder_enabled boolean NOT NULL DEFAULT true,
  motivational_nudge_enabled boolean NOT NULL DEFAULT true,
  streak_risk_reminder_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Автоматическое создание настроек при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user_settings()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created_settings
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_settings();
```

---

## Миграция 003: Subscriptions

```sql
-- 003_create_subscriptions.sql
-- Подписки (синк с Adapty через webhook)

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  adapty_profile_id text,
  status text NOT NULL DEFAULT 'free'
    CHECK (status IN ('free', 'trial', 'active', 'expired', 'cancelled', 'grace_period')),
  plan text NOT NULL DEFAULT 'free'
    CHECK (plan IN ('free', 'premium_monthly', 'premium_annual', 'lifetime')),
  trial_start timestamptz,
  trial_end timestamptz,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancellation_date timestamptz,
  store text CHECK (store IN ('app_store', 'play_store')),
  raw_data jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Автоматическое создание free-подписки при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_subscription();
```

---

## Миграция 004: SOS Tables

```sql
-- 004_create_sos_tables.sql
-- SOS AI Coach: сессии и сообщения

CREATE TABLE IF NOT EXISTS public.sos_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'completed', 'abandoned')),
  outcome text CHECK (outcome IN ('craving_defeated', 'felt_better', 'gave_in')),
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  message_count integer NOT NULL DEFAULT 0,
  ai_model text,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

ALTER TABLE public.sos_sessions ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.sos_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sos_sessions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  token_count integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.sos_messages ENABLE ROW LEVEL SECURITY;
```

---

## Миграция 005: Check-ins & Streaks

```sql
-- 005_create_checkins_streaks.sql
-- Daily Check-in + Streak Counter

CREATE TABLE IF NOT EXISTS public.check_ins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  check_in_date date NOT NULL DEFAULT CURRENT_DATE,
  sugar_status text NOT NULL
    CHECK (sugar_status IN ('sugar_free', 'had_some', 'full_relapse')),
  mood text NOT NULL
    CHECK (mood IN ('happy', 'calm', 'neutral', 'worried', 'stressed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, check_in_date)
);

ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  current_streak integer NOT NULL DEFAULT 0,
  longest_streak integer NOT NULL DEFAULT 0,
  streak_start_date date,
  last_check_in_date date,
  freezes_used_this_week integer NOT NULL DEFAULT 0,
  freeze_week_start date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;

-- Автоматическое создание streak-записи при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user_streak()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.streaks (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created_streak
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_streak();
```

---

## Миграция 006: Craving Logs

```sql
-- 006_create_craving_logs.sql
-- Craving Logger

CREATE TABLE IF NOT EXISTS public.craving_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  intensity integer NOT NULL CHECK (intensity BETWEEN 1 AND 5),
  triggers text[] NOT NULL DEFAULT '{}',
  outcome text NOT NULL CHECK (outcome IN ('resisted', 'gave_in')),
  note text,
  sos_session_id uuid REFERENCES public.sos_sessions(id) ON DELETE SET NULL,
  logged_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.craving_logs ENABLE ROW LEVEL SECURITY;
```

---

## Миграция 007: Curriculum

```sql
-- 007_create_curriculum.sql
-- 90-Day Curriculum: уроки + прогресс пользователя

CREATE TABLE IF NOT EXISTS public.curriculum_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_number integer NOT NULL UNIQUE,
  phase text NOT NULL
    CHECK (phase IN ('acute', 'adaptation', 'improvement', 'stabilization', 'deepening', 'mastery')),
  title text NOT NULL,
  subtitle text,
  content text NOT NULL,
  science_source text,
  task_description text,
  reading_time_minutes integer NOT NULL DEFAULT 5 CHECK (reading_time_minutes > 0),
  is_free boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.curriculum_lessons ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES public.curriculum_lessons(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'locked'
    CHECK (status IN ('locked', 'unlocked', 'in_progress', 'completed')),
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);

ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
```

---

## Миграция 008: Milestones

```sql
-- 008_create_milestones.sql
-- Достижения и badges

CREATE TABLE IF NOT EXISTS public.milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL
    CHECK (type IN ('streak_days', 'cravings_defeated', 'days_in_program', 'lessons_completed')),
  title text NOT NULL,
  description text NOT NULL,
  trigger_value integer NOT NULL,
  badge_image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (type, trigger_value)
);

ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.user_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  milestone_id uuid NOT NULL REFERENCES public.milestones(id) ON DELETE CASCADE,
  earned_at timestamptz NOT NULL DEFAULT now(),
  shared boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, milestone_id)
);

ALTER TABLE public.user_milestones ENABLE ROW LEVEL SECURITY;
```

---

## Миграция 009: Content & Push Tokens

```sql
-- 009_create_content_tables.sql
-- Daily tips (справочник) + Push tokens

CREATE TABLE IF NOT EXISTS public.daily_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  source text,
  category text NOT NULL
    CHECK (category IN ('motivation', 'science_fact', 'alternative_tip')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.daily_tips ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.push_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  platform text NOT NULL CHECK (platform IN ('ios', 'android')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.push_tokens ENABLE ROW LEVEL SECURITY;
```

---

## Миграция 010: Indexes

```sql
-- 010_create_indexes.sql
-- Все индексы для оптимизации запросов

-- subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id
  ON public.subscriptions (user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_adapty_profile_id
  ON public.subscriptions (adapty_profile_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status
  ON public.subscriptions (status);

-- push_tokens
CREATE INDEX IF NOT EXISTS idx_push_tokens_user_id
  ON public.push_tokens (user_id);
CREATE INDEX IF NOT EXISTS idx_push_tokens_active
  ON public.push_tokens (user_id, is_active) WHERE is_active = true;

-- sos_sessions
CREATE INDEX IF NOT EXISTS idx_sos_sessions_user_id
  ON public.sos_sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_sos_sessions_user_created
  ON public.sos_sessions (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sos_sessions_active
  ON public.sos_sessions (user_id, status) WHERE status = 'active';

-- sos_messages
CREATE INDEX IF NOT EXISTS idx_sos_messages_session_id
  ON public.sos_messages (session_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_sos_messages_user_id
  ON public.sos_messages (user_id);

-- check_ins
CREATE INDEX IF NOT EXISTS idx_check_ins_user_date
  ON public.check_ins (user_id, check_in_date DESC);
CREATE INDEX IF NOT EXISTS idx_check_ins_date
  ON public.check_ins (check_in_date);

-- craving_logs
CREATE INDEX IF NOT EXISTS idx_craving_logs_user_logged
  ON public.craving_logs (user_id, logged_at DESC);
CREATE INDEX IF NOT EXISTS idx_craving_logs_user_week
  ON public.craving_logs (user_id, logged_at);
CREATE INDEX IF NOT EXISTS idx_craving_logs_sos
  ON public.craving_logs (sos_session_id) WHERE sos_session_id IS NOT NULL;

-- curriculum_lessons
CREATE INDEX IF NOT EXISTS idx_curriculum_lessons_day
  ON public.curriculum_lessons (day_number);
CREATE INDEX IF NOT EXISTS idx_curriculum_lessons_published
  ON public.curriculum_lessons (is_published, day_number) WHERE is_published = true;

-- user_lesson_progress
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_user
  ON public.user_lesson_progress (user_id, status);

-- milestones
CREATE INDEX IF NOT EXISTS idx_milestones_type
  ON public.milestones (type, trigger_value);

-- user_milestones
CREATE INDEX IF NOT EXISTS idx_user_milestones_user
  ON public.user_milestones (user_id, earned_at DESC);

-- daily_tips
CREATE INDEX IF NOT EXISTS idx_daily_tips_active
  ON public.daily_tips (is_active, category) WHERE is_active = true;
```

---

## Миграция 011: RLS Policies

```sql
-- 011_create_rls_policies.sql
-- Row Level Security политики для всех таблиц

-- ==========================================
-- profiles
-- ==========================================
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id AND deleted_at IS NULL);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = id);

-- ==========================================
-- subscriptions
-- ==========================================
CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);
-- INSERT/UPDATE — только через service_role (Adapty webhook)

-- ==========================================
-- user_settings
-- ==========================================
CREATE POLICY "Users can view own settings"
  ON public.user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON public.user_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON public.user_settings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- push_tokens
-- ==========================================
CREATE POLICY "Users can view own push tokens"
  ON public.push_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own push tokens"
  ON public.push_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own push tokens"
  ON public.push_tokens FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own push tokens"
  ON public.push_tokens FOR DELETE
  USING (auth.uid() = user_id);

-- ==========================================
-- sos_sessions
-- ==========================================
CREATE POLICY "Users can view own SOS sessions"
  ON public.sos_sessions FOR SELECT
  USING (auth.uid() = user_id AND deleted_at IS NULL);

CREATE POLICY "Users can create own SOS sessions"
  ON public.sos_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own SOS sessions"
  ON public.sos_sessions FOR UPDATE
  USING (auth.uid() = user_id AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- sos_messages
-- ==========================================
CREATE POLICY "Users can view own SOS messages"
  ON public.sos_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own SOS messages"
  ON public.sos_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- check_ins
-- ==========================================
CREATE POLICY "Users can view own check-ins"
  ON public.check_ins FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own check-ins"
  ON public.check_ins FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- streaks
-- ==========================================
CREATE POLICY "Users can view own streak"
  ON public.streaks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streak"
  ON public.streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streak"
  ON public.streaks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- craving_logs
-- ==========================================
CREATE POLICY "Users can view own craving logs"
  ON public.craving_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own craving logs"
  ON public.craving_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- curriculum_lessons
-- ==========================================
CREATE POLICY "Anyone can read free published lessons"
  ON public.curriculum_lessons FOR SELECT
  USING (is_published = true AND is_free = true);

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

-- ==========================================
-- user_lesson_progress
-- ==========================================
CREATE POLICY "Users can view own lesson progress"
  ON public.user_lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own lesson progress"
  ON public.user_lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress"
  ON public.user_lesson_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- milestones
-- ==========================================
CREATE POLICY "Authenticated users can view milestones"
  ON public.milestones FOR SELECT
  USING (auth.role() = 'authenticated');

-- ==========================================
-- user_milestones
-- ==========================================
CREATE POLICY "Users can view own milestones"
  ON public.user_milestones FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can earn own milestones"
  ON public.user_milestones FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own milestones"
  ON public.user_milestones FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- daily_tips
-- ==========================================
CREATE POLICY "Authenticated users can view active tips"
  ON public.daily_tips FOR SELECT
  USING (auth.role() = 'authenticated' AND is_active = true);
```

---

## Миграция 012: Utility Functions

```sql
-- 012_create_utility_functions.sql
-- Утилитарные триггеры и функции

-- Универсальный триггер updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Применяем ко всем таблицам с updated_at
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.push_tokens
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.sos_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.streaks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.curriculum_lessons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.user_lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Функция подсчёта SOS-сессий за текущий месяц (для free tier лимита)
CREATE OR REPLACE FUNCTION public.get_monthly_sos_count(p_user_id uuid)
RETURNS integer AS $$
  SELECT count(*)::integer
  FROM public.sos_sessions
  WHERE user_id = p_user_id
    AND created_at >= date_trunc('month', now())
    AND deleted_at IS NULL;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Функция проверки premium-статуса
CREATE OR REPLACE FUNCTION public.is_premium(p_user_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE user_id = p_user_id
    AND status IN ('active', 'trial')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;
```

---

## Миграция 013: Seed Data

```sql
-- 013_seed_curriculum.sql
-- Seed: curriculum lessons (Day 1–14), milestones, daily_tips

-- ==========================================
-- Milestones
-- ==========================================
INSERT INTO public.milestones (type, title, description, trigger_value, sort_order) VALUES
  ('streak_days', '1 день без сахара', 'Вы начали свой путь! Первый день — самый важный.', 1, 1),
  ('streak_days', '3 дня без сахара', 'Первые 72 часа позади! Острая фаза withdrawal пройдена.', 3, 2),
  ('streak_days', '7 дней без сахара', 'Неделя! Ваши taste buds начинают перестраиваться.', 7, 3),
  ('streak_days', '14 дней без сахара', '2 недели! Энергия стабилизируется, тяга ослабевает.', 14, 4),
  ('streak_days', '30 дней без сахара', 'Месяц! Глюкоза стабильна, кожа улучшается.', 30, 5),
  ('streak_days', '60 дней без сахара', '2 месяца! Новые нейронные пути формируются.', 60, 6),
  ('streak_days', '90 дней без сахара', 'ПРОГРАММА ЗАВЕРШЕНА! Нейропластичность закрепила новые привычки.', 90, 7),
  ('cravings_defeated', 'Первая победа', 'Вы впервые победили тягу с помощью AI-коуча!', 1, 10),
  ('cravings_defeated', '10 тяг побеждено', 'Вы становитесь сильнее. 10 раз вы выбрали здоровье!', 10, 11),
  ('cravings_defeated', '50 тяг побеждено', 'Полсотни побед! Ваш мозг учится новым паттернам.', 50, 12),
  ('cravings_defeated', '100 тяг побеждено', 'Вы эксперт по управлению тягой. 100 побед!', 100, 13),
  ('lessons_completed', 'Первый урок', 'Вы начали 90-дневную программу!', 1, 20),
  ('lessons_completed', '7 уроков пройдено', 'Неделя знаний! Вы понимаете нейронауку тяги.', 7, 21),
  ('lessons_completed', '14 уроков пройдено', 'Фаза 1 завершена! Вы прошли самый сложный период.', 14, 22)
ON CONFLICT (type, trigger_value) DO NOTHING;

-- ==========================================
-- Curriculum Lessons (Day 1–14, MVP)
-- ==========================================
-- Placeholder-контент — будет заменён реальным контентом от content lead
INSERT INTO public.curriculum_lessons (day_number, phase, title, subtitle, content, science_source, task_description, reading_time_minutes, is_free, is_published, sort_order) VALUES
  (1, 'acute', 'Добро пожаловать в Sugar Reset', 'Что происходит, когда вы отказываетесь от сахара', 'Placeholder: контент урока Day 1', 'DiNicolantonio JJ et al. (2018) Sugar addiction', 'Уберите один источник added sugar из вашего дня', 7, true, true, 1),
  (2, 'acute', 'Нейронаука тяги к сахару', 'Как сахар захватывает reward-систему мозга', 'Placeholder: контент урока Day 2', 'Avena NM et al. (2008) Evidence for sugar addiction', 'Запишите 3 ситуации, когда тяга сильнее всего', 8, true, true, 2),
  (3, 'acute', 'Первые 72 часа: чего ожидать', 'Withdrawal timeline и почему это нормально', 'Placeholder: контент урока Day 3', 'Wiss DA et al. (2018) Sugar Addiction in Humans', 'При следующей тяге используйте SOS вместо привычного решения', 7, true, true, 3),
  (4, 'adaptation', 'Скрытый сахар: где он прячется', 'Added sugar vs natural sugar: научимся различать', 'Placeholder: контент урока Day 4', 'AHA Sugar Recommendation Guidelines (2024)', 'Прочитайте этикетки 3 продуктов из вашего холодильника', 8, false, true, 4),
  (5, 'adaptation', 'Стресс и сахар: порочный круг', 'Как кортизол усиливает тягу', 'Placeholder: контент урока Day 5', 'Epel E et al. (2001) Stress and cortisol', 'Попробуйте 5-минутное дыхательное упражнение при стрессе вместо сладкого', 7, false, true, 5),
  (6, 'adaptation', 'Скука, эмоции и сахар', 'Эмоциональное eating: почему мы заедаем', 'Placeholder: контент урока Day 6', 'van Strien T (2018) Emotional eating research', 'Составьте список из 5 не-еда действий для скуки', 6, false, true, 6),
  (7, 'adaptation', 'Неделя 1: что изменилось?', 'Ваше тело уже адаптируется', 'Placeholder: контент урока Day 7', 'Lustig RH (2013) Fructose metabolism review', 'Сравните вашу энергию сегодня и в Day 1', 7, false, true, 7),
  (8, 'improvement', 'Ваши taste buds перестраиваются', 'Почему фрукты начинают казаться слаще', 'Placeholder: контент урока Day 8', 'Wise PM et al. (2016) Taste bud adaptation', 'Попробуйте фрукт, который раньше казался «не сладким»', 6, false, true, 8),
  (9, 'improvement', 'Социальное давление: офис и друзья', 'Как отказаться от treats без неловкости', 'Placeholder: контент урока Day 9', 'Higgs S (2015) Social influences on eating', 'Подготовьте фразу для отказа на следующем social event', 7, false, true, 9),
  (10, 'improvement', 'Альтернативы: наука замены', 'Почему «просто не ешь» не работает', 'Placeholder: контент урока Day 10', 'Adriaanse MA et al. (2011) Implementation intentions', 'Найдите одну альтернативу вашему #1 sugar craving', 8, false, true, 10),
  (11, 'improvement', 'Сон и сахар: неожиданная связь', 'Как недосып увеличивает тягу на 45%', 'Placeholder: контент урока Day 11', 'Greer SM et al. (2013) Sleep deprivation and food desire', 'Ложитесь спать на 30 минут раньше сегодня', 6, false, true, 11),
  (12, 'improvement', 'Движение вместо сахара', 'Как 10 минут ходьбы заменяют шоколадку', 'Placeholder: контент урока Day 12', 'Ledochowski L et al. (2015) Walking and sugar cravings', 'При следующей тяге пройдитесь 10 минут вместо перекуса', 6, false, true, 12),
  (13, 'improvement', 'Gut-brain connection', 'Как кишечник влияет на тягу к сахару', 'Placeholder: контент урока Day 13', 'Alcock J et al. (2014) Gut microbiome and eating behavior', 'Добавьте один fermented food в рацион сегодня', 8, false, true, 13),
  (14, 'improvement', '2 недели: ваш прогресс', 'Фаза 1 завершена! Что дальше?', 'Placeholder: контент урока Day 14', 'Wiss DA et al. (2018) Recovery timeline', 'Напишите письмо себе из Day 1 — что изменилось?', 7, false, true, 14)
ON CONFLICT (day_number) DO NOTHING;

-- ==========================================
-- Daily Tips (sample)
-- ==========================================
INSERT INTO public.daily_tips (content, source, category) VALUES
  ('Тяга к сахару длится в среднем 15-20 минут. Если вы продержитесь — она пройдёт.', 'Naqvi NH et al. (2007)', 'science_fact'),
  ('Стакан воды + 5 глубоких вдохов — самая простая стратегия против тяги.', NULL, 'alternative_tip'),
  ('Каждый день без избыточного сахара — это инвестиция в здоровье вашего мозга.', NULL, 'motivation'),
  ('Горсть орехов (миндаль, грецкий) стабилизирует сахар в крови на 2-3 часа.', NULL, 'alternative_tip'),
  ('Вы не слабовольный человек. Сахар активирует те же reward-центры, что и наркотики.', 'DiNicolantonio JJ (2018)', 'science_fact'),
  ('Прогресс — это не идеальность. Это когда вы встаёте после падения быстрее, чем вчера.', NULL, 'motivation'),
  ('85% тёмный шоколад (1-2 квадратика) удовлетворяет тягу с минимумом сахара.', NULL, 'alternative_tip'),
  ('После 7 дней без added sugar ваши taste buds начинают перестраиваться.', 'Wise PM et al. (2016)', 'science_fact'),
  ('Вы уже здесь. Это значит, вы сильнее, чем думаете.', NULL, 'motivation'),
  ('Замороженные ягоды — отличная альтернатива мороженому. Попробуйте с греческим йогуртом.', NULL, 'alternative_tip')
ON CONFLICT DO NOTHING;
```

---

*Миграции выполняются в порядке нумерации (001 → 013). Каждая миграция идемпотентна (IF NOT EXISTS, ON CONFLICT DO NOTHING). SQL валиден для Supabase PostgreSQL.*
