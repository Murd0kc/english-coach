create table if not exists public.daily_activity (
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_date date not null default current_date,
  minutes integer not null default 0,
  lessons_completed integer not null default 0,
  exercises_answered integer not null default 0,
  primary key (user_id, activity_date)
);

alter table public.daily_activity enable row level security;
drop policy if exists "Users manage own daily activity" on public.daily_activity;
create policy "Users manage own daily activity" on public.daily_activity
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
