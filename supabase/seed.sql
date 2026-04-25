-- Sugar Quit — test data seed.
-- Assumes 3 auth users exist (created via /auth/v1/admin/users):
--   test+empty@sugarquit.app   ae999b38-8807-4ed1-aab0-3818367c7bbd
--   test+alex@sugarquit.app    2d43f774-a1ad-4ea4-b7a6-3494c2f70545
--   test+veteran@sugarquit.app 1293f597-795d-4de8-950f-3bff241743d2

-- ─── Alex: Day 1, premium, 3 cravings + 1 SOS ─────────────────────────
update profiles set
  onboarded                = true,
  first_name               = 'Alex',
  goal                     = 'quit',
  peak_hour                = '15:00',
  user_triggers            = '{social,meals}',
  motivations              = '{health,energy}',
  consumption              = 'moderate',
  past_attempts            = 'short',
  work_environment         = 'office',
  is_premium               = true,
  sos_disclaimer_accepted  = true
where user_id = '2d43f774-a1ad-4ea4-b7a6-3494c2f70545';

update streaks set
  streak_days                          = 1,
  best_streak                          = 1,
  last_check_in_date                   = current_date,
  streak_freezes_used_this_week        = 0,
  streak_freezes_available_this_week   = 3,
  sos_used_this_month                  = 1,
  sos_reset_month                      = to_char(current_date, 'YYYY-MM'),
  sos_free_limit                       = 9999,
  milestones_celebrated                = '{1}'
where user_id = '2d43f774-a1ad-4ea4-b7a6-3494c2f70545';

delete from cravings where user_id = '2d43f774-a1ad-4ea4-b7a6-3494c2f70545';
insert into cravings (user_id, ts, intensity, craving_triggers, outcome, notes) values
  ('2d43f774-a1ad-4ea4-b7a6-3494c2f70545', now() - interval '6 hours',  3, '{stress}',  'walked', 'walked through it'),
  ('2d43f774-a1ad-4ea4-b7a6-3494c2f70545', now() - interval '4 hours',  4, '{meals}',   'walked', 'right after lunch'),
  ('2d43f774-a1ad-4ea4-b7a6-3494c2f70545', now() - interval '2 hours',  2, '{boredom}', 'gave',   '');

delete from sos_log where user_id = '2d43f774-a1ad-4ea4-b7a6-3494c2f70545';
insert into sos_log (user_id, started_at, outcome) values
  ('2d43f774-a1ad-4ea4-b7a6-3494c2f70545', now() - interval '3 hours', 'walked');

-- ─── Maya / veteran: Day 47, premium, 12 cravings, 5 milestones ──────
update profiles set
  onboarded                = true,
  first_name               = 'Maya',
  goal                     = 'reduce',
  peak_hour                = '21:00',
  user_triggers            = '{stress,boredom,emotions}',
  motivations              = '{health,money}',
  consumption              = 'alot',
  past_attempts            = 'many',
  work_environment         = 'home',
  is_premium               = true,
  sos_disclaimer_accepted  = true
where user_id = '1293f597-795d-4de8-950f-3bff241743d2';

update streaks set
  streak_days                          = 47,
  best_streak                          = 47,
  last_check_in_date                   = current_date,
  streak_freezes_used_this_week        = 1,
  streak_freezes_available_this_week   = 3,
  sos_used_this_month                  = 4,
  sos_reset_month                      = to_char(current_date, 'YYYY-MM'),
  sos_free_limit                       = 9999,
  milestones_celebrated                = '{1,3,7,14,30}'
where user_id = '1293f597-795d-4de8-950f-3bff241743d2';

delete from cravings where user_id = '1293f597-795d-4de8-950f-3bff241743d2';
insert into cravings (user_id, ts, intensity, craving_triggers, outcome, notes)
select
  '1293f597-795d-4de8-950f-3bff241743d2',
  now() - (interval '1 hour' * (g * 90))::interval,
  ((g % 5) + 1)::smallint,
  case when g % 2 = 0 then array['stress'] else array['boredom','emotions'] end::text[],
  case when g % 4 = 0 then 'gave' else 'walked' end,
  ''
from generate_series(1, 12) g;

delete from sos_log where user_id = '1293f597-795d-4de8-950f-3bff241743d2';
insert into sos_log (user_id, started_at, outcome)
select
  '1293f597-795d-4de8-950f-3bff241743d2',
  now() - (interval '1 day' * g)::interval,
  case when g % 3 = 0 then 'gave' else 'walked' end
from generate_series(1, 4) g;

-- ─── Sanity ──────────────────────────────────────────────────────────
select
  p.email,
  p.first_name,
  p.is_premium,
  s.streak_days,
  s.streak_freezes_used_this_week,
  s.milestones_celebrated,
  (select count(*) from cravings c where c.user_id = p.user_id) as cravings_count,
  (select count(*) from sos_log sl where sl.user_id = p.user_id) as sos_count
from profiles p join streaks s using (user_id)
order by p.email;
