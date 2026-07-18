create table if not exists public.diagnostic_items (
  id uuid primary key default gen_random_uuid(),
  prompt text not null,
  skill text not null check (skill in ('grammar', 'vocabulary', 'reading', 'listening')),
  level_code text not null check (level_code in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  options jsonb not null,
  sort_order integer not null default 0,
  is_active boolean not null default true
);

create table if not exists public.learning_diagnostics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  overall_level text not null check (overall_level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  skill_scores jsonb not null default '{}'::jsonb,
  answers jsonb not null default '[]'::jsonb,
  completed_at timestamptz not null default now()
);

create index if not exists diagnostic_items_order_idx on public.diagnostic_items (sort_order);
create index if not exists learning_diagnostics_user_idx on public.learning_diagnostics (user_id, completed_at desc);

alter table public.diagnostic_items enable row level security;
alter table public.learning_diagnostics enable row level security;

drop policy if exists "Active diagnostic items are public" on public.diagnostic_items;
create policy "Active diagnostic items are public" on public.diagnostic_items
  for select using (is_active = true);

drop policy if exists "Users read own diagnostics" on public.learning_diagnostics;
create policy "Users read own diagnostics" on public.learning_diagnostics
  for select using (auth.uid() = user_id);

drop policy if exists "Users create own diagnostics" on public.learning_diagnostics;
create policy "Users create own diagnostics" on public.learning_diagnostics
  for insert with check (auth.uid() = user_id);

insert into public.diagnostic_items (prompt, skill, level_code, options, sort_order)
select * from (values
  ('Choose the correct sentence.', 'grammar', 'A1', '[{"text":"She is from Colombia.","correct":true},{"text":"She from is Colombia.","correct":false},{"text":"Is from she Colombia.","correct":false}]'::jsonb, 10),
  ('What does “I usually have breakfast at seven” mean?', 'vocabulary', 'A2', '[{"text":"Desayuno normalmente a las siete.","correct":true},{"text":"Estoy desayunando ahora.","correct":false},{"text":"Nunca desayuno a las siete.","correct":false}]'::jsonb, 20),
  ('Complete: I have lived here ___ 2022.', 'grammar', 'B1', '[{"text":"since","correct":true},{"text":"for","correct":false},{"text":"during","correct":false}]'::jsonb, 30),
  ('Read: “The meeting was postponed because the client needed more time.” Why was it postponed?', 'reading', 'B2', '[{"text":"The client needed more time.","correct":true},{"text":"The room was unavailable.","correct":false},{"text":"The team arrived early.","correct":false}]'::jsonb, 40),
  ('Choose the most natural formal option: “Could you clarify what you mean?”', 'vocabulary', 'C1', '[{"text":"It politely asks for an explanation.","correct":true},{"text":"It ends the conversation immediately.","correct":false},{"text":"It says the speaker agrees completely.","correct":false}]'::jsonb, 50)
) as items(prompt, skill, level_code, options, sort_order)
where not exists (select 1 from public.diagnostic_items existing where existing.sort_order = items.sort_order);
