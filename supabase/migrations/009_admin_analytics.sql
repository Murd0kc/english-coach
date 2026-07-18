create or replace function public.get_content_analytics()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  if not public.is_content_admin() then raise exception 'Not authorized'; end if;
  select jsonb_build_object(
    'started_lessons', (select count(*) from public.user_progress),
    'completed_lessons', (select count(*) from public.user_progress where status = 'completed'),
    'answers', (select count(*) from public.user_answers),
    'correct_answers', (select count(*) from public.user_answers where is_correct = true),
    'review_cards', (select count(*) from public.review_cards),
    'active_content', (select count(*) from public.lessons where is_published = true)
  ) into result;
  return result;
end;
$$;

grant execute on function public.get_content_analytics() to authenticated;
