create table if not exists public.unit_assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  unit_id uuid not null references public.units(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  answers jsonb not null default '[]'::jsonb,
  passed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists unit_assessment_user_idx on public.unit_assessment_attempts (user_id, unit_id, created_at desc);
alter table public.unit_assessment_attempts enable row level security;
drop policy if exists "Users manage own unit assessments" on public.unit_assessment_attempts;
create policy "Users manage own unit assessments" on public.unit_assessment_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
