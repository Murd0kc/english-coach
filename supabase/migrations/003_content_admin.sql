create table if not exists public.content_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.content_admins enable row level security;

drop policy if exists "Admins can see their membership" on public.content_admins;
create policy "Admins can see their membership" on public.content_admins
  for select using (auth.uid() = user_id);

create or replace function public.is_content_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.content_admins where user_id = auth.uid());
$$;

grant execute on function public.is_content_admin() to authenticated;

drop policy if exists "Content admins can create units" on public.units;
create policy "Content admins can create units" on public.units
  for insert with check (public.is_content_admin());

drop policy if exists "Content admins can update units" on public.units;
create policy "Content admins can update units" on public.units
  for update using (public.is_content_admin()) with check (public.is_content_admin());

drop policy if exists "Content admins can create lessons" on public.lessons;
create policy "Content admins can create lessons" on public.lessons
  for insert with check (public.is_content_admin());

drop policy if exists "Content admins can update lessons" on public.lessons;
create policy "Content admins can update lessons" on public.lessons
  for update using (public.is_content_admin()) with check (public.is_content_admin());

drop policy if exists "Content admins can create lesson blocks" on public.lesson_blocks;
create policy "Content admins can create lesson blocks" on public.lesson_blocks
  for insert with check (public.is_content_admin());

drop policy if exists "Content admins can update lesson blocks" on public.lesson_blocks;
create policy "Content admins can update lesson blocks" on public.lesson_blocks
  for update using (public.is_content_admin()) with check (public.is_content_admin());

drop policy if exists "Content admins can create exercises" on public.exercises;
create policy "Content admins can create exercises" on public.exercises
  for insert with check (public.is_content_admin());

drop policy if exists "Content admins can update exercises" on public.exercises;
create policy "Content admins can update exercises" on public.exercises
  for update using (public.is_content_admin()) with check (public.is_content_admin());

drop policy if exists "Content admins can create exercise options" on public.exercise_options;
create policy "Content admins can create exercise options" on public.exercise_options
  for insert with check (public.is_content_admin());
