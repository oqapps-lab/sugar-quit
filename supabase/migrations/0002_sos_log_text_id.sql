-- Sugar Quit — sos_log id type change
-- Local Zustand store generates string ids like `sos_<ts>_<rand>`. The RN
-- sync layer currently can't insert them (uuid column rejects with 22P02)
-- and outcome updates can't be keyed since DB-assigned UUIDs aren't back-
-- filled into the store. Switching id to text matches store semantics
-- and lets pushSosOutcome work without an id-mapping layer.
--
-- Same for cravings table — pushCraving currently omits id and lets DB
-- assign UUID, which is fine because cravings are insert-only with no
-- subsequent updates. Keeping cravings.id as uuid.

alter table public.sos_log
  alter column id drop default,
  alter column id type text using id::text;

-- No data migration needed — IDs stay valid (UUIDs cast to text losslessly).
