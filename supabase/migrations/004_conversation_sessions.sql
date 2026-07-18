create table if not exists public.conversation_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  scenario text not null,
  level_code text not null default 'A1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversation_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.conversation_sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  correction jsonb,
  created_at timestamptz not null default now()
);

create index if not exists conversation_sessions_user_idx on public.conversation_sessions (user_id, updated_at desc);
create index if not exists conversation_messages_session_idx on public.conversation_messages (session_id, created_at);

alter table public.conversation_sessions enable row level security;
alter table public.conversation_messages enable row level security;

drop policy if exists "Users manage own conversation sessions" on public.conversation_sessions;
create policy "Users manage own conversation sessions" on public.conversation_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users manage own conversation messages" on public.conversation_messages;
create policy "Users manage own conversation messages" on public.conversation_messages
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
