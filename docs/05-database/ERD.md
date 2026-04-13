# Entity-Relationship Diagram: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** Database Design (Stage 5)
**Источник:** [DATABASE-SCHEMA.md](./DATABASE-SCHEMA.md)

---

## Полная диаграмма

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                      auth.users                                             │
│                                    (Supabase Auth)                                          │
│                                    ┌───────────┐                                            │
│                                    │  id (PK)  │                                            │
│                                    │  email    │                                            │
│                                    │  ...      │                                            │
│                                    └─────┬─────┘                                            │
│                                          │                                                  │
│           ┌──────────────────────────────┼──────────────────────────────────┐                │
│           │              │               │               │                 │                 │
│      1:1  │         1:1  │          1:1  │          1:1  │            1:N  │                 │
│           ▼              ▼               ▼               ▼                 ▼                 │
│   ┌──────────────┐ ┌───────────┐ ┌──────────────┐ ┌──────────┐ ┌──────────────┐            │
│   │   profiles   │ │user_      │ │subscriptions │ │ streaks  │ │ push_tokens  │            │
│   │──────────────│ │settings   │ │──────────────│ │──────────│ │──────────────│            │
│   │ id (PK/FK)   │ │───────────│ │ id (PK)      │ │ id (PK)  │ │ id (PK)      │            │
│   │ display_name │ │ id (PK)   │ │ user_id (FK) │ │ user_id  │ │ user_id (FK) │            │
│   │ avatar_url   │ │ user_id   │ │ adapty_id    │ │  (FK,UQ) │ │ token (UQ)   │            │
│   │ goal         │ │  (FK,UQ)  │ │ status       │ │ current_ │ │ platform     │            │
│   │ motivation[] │ │ checkin_  │ │ plan         │ │  streak  │ │ is_active    │            │
│   │ triggers[]   │ │  reminder │ │ trial_start  │ │ longest_ │ └──────────────┘            │
│   │ onboarding_  │ │  _enabled │ │ trial_end    │ │  streak  │                              │
│   │  completed   │ │ checkin_  │ │ period_start │ │ freezes_ │                              │
│   │ start_date   │ │  reminder │ │ period_end   │ │  used    │                              │
│   │ timezone     │ │  _time    │ │ store        │ └──────────┘                              │
│   │ deleted_at   │ │ ...       │ │ raw_data{}   │                                           │
│   └──────────────┘ └───────────┘ └──────────────┘                                           │
│                                                                                             │
│           ┌──────────────────────────────┼──────────────────────────┐                        │
│           │                              │                          │                        │
│      1:N  │                         1:N  │                     1:N  │                        │
│           ▼                              ▼                          ▼                        │
│   ┌──────────────┐              ┌──────────────┐           ┌──────────────┐                  │
│   │ sos_sessions │              │  check_ins   │           │ craving_logs │                  │
│   │──────────────│              │──────────────│           │──────────────│                  │
│   │ id (PK)      │              │ id (PK)      │           │ id (PK)      │                  │
│   │ user_id (FK) │              │ user_id (FK) │           │ user_id (FK) │                  │
│   │ status       │              │ check_in_date│           │ intensity    │                  │
│   │ outcome      │              │ sugar_status │           │ triggers[]   │                  │
│   │ started_at   │              │ mood         │           │ outcome      │                  │
│   │ ended_at     │              │ (UQ: user_id,│           │ note         │                  │
│   │ message_count│              │  check_in_   │           │ sos_session_ │◄─── 0:1          │
│   │ ai_model     │              │  date)       │           │  id (FK)     │     (от session) │
│   │ metadata{}   │              └──────────────┘           │ logged_at    │                  │
│   │ deleted_at   │                                         └──────────────┘                  │
│   └──────┬───────┘                                                                          │
│          │                                                                                  │
│     1:N  │                                                                                  │
│          ▼                                                                                  │
│   ┌──────────────┐                                                                          │
│   │ sos_messages │                                                                          │
│   │──────────────│                                                                          │
│   │ id (PK)      │                                                                          │
│   │ session_id   │                                                                          │
│   │  (FK)        │                                                                          │
│   │ user_id (FK) │                                                                          │
│   │ role         │                                                                          │
│   │ content      │                                                                          │
│   │ token_count  │                                                                          │
│   └──────────────┘                                                                          │
│                                                                                             │
│                                                                                             │
│      auth.users                                                                             │
│           │                                                                                 │
│      1:N  │              ┌──────────────────────────────────────────┐                        │
│           ▼              │          Справочные таблицы              │                        │
│   ┌─────────────────┐    │   (публичные, управляются admin)         │                        │
│   │ user_lesson_    │    │                                          │                        │
│   │  progress       │    │  ┌──────────────────┐  ┌─────────────┐  │                        │
│   │─────────────────│    │  │curriculum_lessons │  │ milestones  │  │                        │
│   │ id (PK)         │    │  │──────────────────│  │─────────────│  │                        │
│   │ user_id (FK)    │    │  │ id (PK)          │  │ id (PK)     │  │                        │
│   │ lesson_id (FK) ─┼────┼─►│ day_number (UQ)  │  │ type        │  │                        │
│   │ status          │    │  │ phase            │  │ title       │  │                        │
│   │ started_at      │    │  │ title            │  │ description │  │                        │
│   │ completed_at    │    │  │ content          │  │ trigger_    │  │                        │
│   │ (UQ: user_id,   │    │  │ is_free          │  │  value      │  │                        │
│   │  lesson_id)     │    │  │ is_published     │  │ badge_url   │  │                        │
│   └─────────────────┘    │  └──────────────────┘  └──────┬──────┘  │                        │
│                          │                               │         │                        │
│   ┌─────────────────┐    │                          ◄────┘         │                        │
│   │ user_milestones │    │                                         │                        │
│   │─────────────────│    │  ┌──────────────────┐                   │                        │
│   │ id (PK)         │    │  │   daily_tips     │                   │                        │
│   │ user_id (FK)    │    │  │──────────────────│                   │                        │
│   │ milestone_id    │────┼─►│ id (PK)          │                   │                        │
│   │  (FK)           │    │  │ content          │                   │                        │
│   │ earned_at       │    │  │ source           │                   │                        │
│   │ shared          │    │  │ category         │                   │                        │
│   │ (UQ: user_id,   │    │  │ is_active        │                   │                        │
│   │  milestone_id)  │    │  └──────────────────┘                   │                        │
│   └─────────────────┘    └──────────────────────────────────────────┘                        │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Связи

| Связь | Тип | FK | Описание |
|-------|-----|-----|----------|
| auth.users → profiles | 1:1 | profiles.id → auth.users.id | Профиль создаётся автоматически |
| auth.users → user_settings | 1:1 | user_settings.user_id (UQ) → auth.users.id | Настройки создаются автоматически |
| auth.users → subscriptions | 1:1 | subscriptions.user_id (UQ) → auth.users.id | Free-подписка создаётся автоматически |
| auth.users → streaks | 1:1 | streaks.user_id (UQ) → auth.users.id | Streak создаётся автоматически |
| auth.users → push_tokens | 1:N | push_tokens.user_id → auth.users.id | Несколько устройств |
| auth.users → sos_sessions | 1:N | sos_sessions.user_id → auth.users.id | Множество SOS-сессий |
| sos_sessions → sos_messages | 1:N | sos_messages.session_id → sos_sessions.id | Сообщения в сессии |
| auth.users → check_ins | 1:N | check_ins.user_id → auth.users.id | Ежедневные check-in |
| auth.users → craving_logs | 1:N | craving_logs.user_id → auth.users.id | Логи тяги |
| sos_sessions → craving_logs | 0:1 | craving_logs.sos_session_id → sos_sessions.id | Авто-лог из SOS |
| curriculum_lessons → user_lesson_progress | 1:N | user_lesson_progress.lesson_id → curriculum_lessons.id | Прогресс по уроку |
| auth.users → user_lesson_progress | 1:N | user_lesson_progress.user_id → auth.users.id | Прогресс пользователя |
| milestones → user_milestones | 1:N | user_milestones.milestone_id → milestones.id | Полученные достижения |
| auth.users → user_milestones | 1:N | user_milestones.user_id → auth.users.id | Достижения пользователя |

---

## Группы таблиц

```
┌─────────────────────────────────────────────────────────────────┐
│                          USER LAYER                             │
│   profiles ─── user_settings ─── subscriptions ─── streaks      │
│                                                 ─── push_tokens │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┼─────────┐
                    ▼         ▼         ▼
┌──────────────┐ ┌────────┐ ┌──────────────┐
│  SOS LAYER   │ │CHECK-IN│ │CRAVING LAYER │
│  sessions    │ │ LAYER  │ │  logs        │
│  messages    │ │check_ins│ │              │
└──────┬───────┘ └────────┘ └──────────────┘
       │
       └──────────── (sos_session_id) ────────────►  craving_logs

┌─────────────────────────────────────────────────────────────────┐
│                       CONTENT LAYER                             │
│     curriculum_lessons ─── milestones ─── daily_tips            │
│            │                    │                                │
│            ▼                    ▼                                │
│   user_lesson_progress   user_milestones                        │
│                                                                 │
│           (Pivot tables: user × content)                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## CASCADE-цепочки при удалении auth.users

```
auth.users DELETE CASCADE →
  ├── profiles (CASCADE)
  ├── user_settings (CASCADE)
  ├── subscriptions (CASCADE)
  ├── streaks (CASCADE)
  ├── push_tokens (CASCADE)
  ├── sos_sessions (CASCADE) → sos_messages (CASCADE)
  ├── check_ins (CASCADE)
  ├── craving_logs (CASCADE, sos_session_id → SET NULL)
  ├── user_lesson_progress (CASCADE)
  └── user_milestones (CASCADE)
```

Справочные таблицы (`curriculum_lessons`, `milestones`, `daily_tips`) НЕ каскадируются от пользователя.

---

*Данная диаграмма соответствует [DATABASE-SCHEMA.md](./DATABASE-SCHEMA.md). Все связи реализованы через Foreign Keys в [MIGRATIONS.md](./MIGRATIONS.md).*
