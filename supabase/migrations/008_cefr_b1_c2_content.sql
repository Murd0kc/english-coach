do $$
<<cefr_content>>
declare
  level_row record;
  unit_id uuid;
  lesson_id uuid;
  exercise_id uuid;
  code text;
  unit_title text;
  objective text;
  lesson_title text;
  lesson_description text;
begin
  foreach code in array array['B1','B2','C1','C2'] loop
    select * into level_row from public.levels where levels.code = cefr_content.code limit 1;
    if level_row.id is null then continue; end if;
    unit_title := case code
      when 'B1' then 'Opiniones y experiencias'
      when 'B2' then 'Comunicación profesional'
      when 'C1' then 'Argumentar con precisión'
      else 'Matices y dominio'
    end;
    objective := case code
      when 'B1' then 'Expresar opiniones, explicar experiencias y mantener una conversación independiente.'
      when 'B2' then 'Participar en reuniones, proponer soluciones y justificar decisiones.'
      when 'C1' then 'Construir argumentos claros, matizados y adecuados al registro.'
      else 'Interpretar matices, ironía y lenguaje idiomático en contextos exigentes.'
    end;
    lesson_title := case code
      when 'B1' then 'Contar una experiencia que te cambió'
      when 'B2' then 'Proponer una solución en una reunión'
      when 'C1' then 'Defender una postura con matices'
      else 'Leer entre líneas'
    end;
    lesson_description := case code
      when 'B1' then 'Organiza una historia breve y expresa lo que aprendiste.'
      when 'B2' then 'Presenta un problema, una alternativa y sus consecuencias.'
      when 'C1' then 'Usa concesión, énfasis y lenguaje preciso para argumentar.'
      else 'Reconoce intención, subtexto y expresiones idiomáticas.'
    end;
    select u.id into unit_id from public.units u where u.level_id = level_row.id and u.title = unit_title limit 1;
    if unit_id is null then insert into public.units (level_id, title, objective, theme, sort_order) values (level_row.id, unit_title, objective, 'Comunicación real', 10) returning id into unit_id; end if;
    select l.id into lesson_id from public.lessons l where l.unit_id = cefr_content.unit_id and l.title = lesson_title limit 1;
    if lesson_id is null then insert into public.lessons (unit_id, title, description, duration_minutes, sort_order, is_published) values (unit_id, lesson_title, lesson_description, 15, 1, true) returning id into lesson_id; end if;
    if not exists (select 1 from public.lesson_blocks b where b.lesson_id = cefr_content.lesson_id) then
      insert into public.lesson_blocks (lesson_id, block_type, content, sort_order) values
        (lesson_id, 'dialogue', jsonb_build_object('lines', jsonb_build_array(jsonb_build_object('speaker','Coach','text', case code when 'B1' then 'What experience taught you the most?' when 'B2' then 'What solution would you recommend?' when 'C1' then 'What is your position on this issue?' else 'What do you think the speaker implies?' end), jsonb_build_object('speaker','Learner','text', case code when 'B1' then 'I learned that preparation makes a real difference.' when 'B2' then 'I would recommend a phased approach because it reduces risk.' when 'C1' then 'Although the proposal is attractive, its long-term cost deserves attention.' else 'The wording suggests that the speaker is not fully convinced.' end))), 1),
        (lesson_id, 'vocabulary', jsonb_build_object('items', jsonb_build_array(jsonb_build_object('english','in my view','spanish','en mi opinión'), jsonb_build_object('english','as a result','spanish','como resultado'), jsonb_build_object('english','to some extent','spanish','hasta cierto punto'))), 2),
        (lesson_id, 'grammar', jsonb_build_object('explanation', case code when 'B1' then 'Use narrative tenses to connect events and reflections.' when 'B2' then 'Use conditionals and modal verbs to discuss consequences.' else 'Use concession and hedging to express nuanced arguments.' end, 'example', case code when 'B1' then 'It was the first time I had worked abroad.' when 'B2' then 'We could reduce costs if we phased the launch.' else 'While the idea is promising, it may prove difficult to scale.' end), 3),
        (lesson_id, 'writing', jsonb_build_object('prompt', 'Write a response of 80–120 words using the target expressions.'), 4);
    end if;
    if not exists (select 1 from public.exercises e where e.lesson_id = cefr_content.lesson_id) then
      insert into public.exercises (lesson_id, exercise_type, prompt, explanation, correct_answer, difficulty, sort_order) values (lesson_id, 'multiple_choice', 'Choose the most appropriate connector: The plan is ambitious; ___, it is achievable.', 'However introduces a contrast between two ideas.', 'however', 3, 1) returning id into exercise_id;
      insert into public.exercise_options (exercise_id, option_text, is_correct, sort_order) values (exercise_id, 'however', true, 1), (exercise_id, 'because', false, 2), (exercise_id, 'unless', false, 3);
    end if;
  end loop;
end $$;
