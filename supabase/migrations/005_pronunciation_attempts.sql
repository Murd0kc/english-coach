create table if not exists public.pronunciation_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  target_text text not null,
  transcript text not null,
  word_score numeric(5,2) not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists pronunciation_attempts_user_idx on public.pronunciation_attempts (user_id, created_at desc);
alter table public.pronunciation_attempts enable row level security;
drop policy if exists "Users manage own pronunciation attempts" on public.pronunciation_attempts;
create policy "Users manage own pronunciation attempts" on public.pronunciation_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
