create table if not exists public.weekly_goals (
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  target_minutes integer not null default 60,
  target_lessons integer not null default 3,
  primary key (user_id, week_start)
);

alter table public.weekly_goals enable row level security;
drop policy if exists "Users manage own weekly goals" on public.weekly_goals;
create policy "Users manage own weekly goals" on public.weekly_goals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
