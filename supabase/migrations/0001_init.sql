-- Sugar Quit — initial schema
-- Tables: profiles, streaks, cravings, sos_log
-- All RLS owner-only (auth.uid() = user_id).
-- New auth.users get auto-created profile + streaks rows via trigger.

set search_path = public;

-- ─── profiles: 1 row per user ────────────────────────────────────────────
create table if not exists public.profiles (
  user_id                  uuid        primary key references auth.users(id) on delete cascade,
  email                    text,
  onboarded                boolean     not null default false,
  first_name               text,
  goal                     text,        -- 'quit' | 'reduce' | 'mindful'
  peak_hour                text,        -- '15:00'
  user_triggers            text[]      not null default '{}',
  motivations              text[]      not null default '{}',
  consumption              text,        -- 'low' | 'medium' | 'high'
  past_attempts            text,
  work_environment         text,
  is_premium               boolean     not null default false,
  push_permission_denied   boolean     not null default false,
  push_denied_at           timestamptz,
  sos_disclaimer_accepted  boolean     not null default false,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- ─── streaks: 1 row per user (running counters) ──────────────────────────
create table if not exists public.streaks (
  user_id                              uuid        primary key references auth.users(id) on delete cascade,
  streak_days                          integer     not null default 0,
  best_streak                          integer     not null default 0,
  last_check_in_date                   date,
  streak_freezes_used_this_week        integer     not null default 0,
  streak_freezes_available_this_week   integer     not null default 1,
  sos_used_this_month                  integer     not null default 0,
  sos_reset_month                      text,        -- 'YYYY-MM'
  sos_free_limit                       integer     not null default 3,
  milestones_celebrated                integer[]   not null default '{}',
  updated_at                           timestamptz not null default now()
);

-- ─── cravings: many rows per user ────────────────────────────────────────
create table if not exists public.cravings (
  id                uuid        primary key default gen_random_uuid(),
  user_id           uuid        not null references auth.users(id) on delete cascade,
  ts                timestamptz not null default now(),
  intensity         smallint    not null check (intensity between 1 and 5),
  craving_triggers  text[]      not null default '{}',
  outcome           text        not null check (outcome in ('walked','gave')),
  notes             text        not null default '',
  created_at        timestamptz not null default now()
);
create index if not exists cravings_user_ts_idx on public.cravings (user_id, ts desc);

-- ─── sos_log: many rows per user ─────────────────────────────────────────
create table if not exists public.sos_log (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users(id) on delete cascade,
  started_at  timestamptz not null default now(),
  outcome     text        check (outcome in ('walked','softer','gave')),
  created_at  timestamptz not null default now()
);
create index if not exists sos_log_user_started_idx on public.sos_log (user_id, started_at desc);

-- ─── updated_at trigger ──────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists set_updated_at_profiles on public.profiles;
create trigger set_updated_at_profiles before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_streaks on public.streaks;
create trigger set_updated_at_streaks before update on public.streaks
  for each row execute function public.set_updated_at();

-- ─── Row-Level Security ──────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.streaks  enable row level security;
alter table public.cravings enable row level security;
alter table public.sos_log  enable row level security;

drop policy if exists "profiles_owner_all" on public.profiles;
create policy "profiles_owner_all" on public.profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "streaks_owner_all" on public.streaks;
create policy "streaks_owner_all" on public.streaks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "cravings_owner_all" on public.cravings;
create policy "cravings_owner_all" on public.cravings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "sos_log_owner_all" on public.sos_log;
create policy "sos_log_owner_all" on public.sos_log
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── Auto-create profile + streaks on auth.users insert ─────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (user_id, email) values (new.id, new.email)
    on conflict (user_id) do nothing;
  insert into public.streaks (user_id) values (new.id)
    on conflict (user_id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
