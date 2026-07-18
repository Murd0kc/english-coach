do $$
declare
  a1_id uuid;
  a2_id uuid;
  unit_id uuid;
  lesson_id uuid;
  exercise_id uuid;
begin
  select id into a1_id from public.levels where code = 'A1' limit 1;
  select id into a2_id from public.levels where code = 'A2' limit 1;
  if a1_id is null or a2_id is null then
    raise exception 'A1 and A2 levels must exist before loading MVP content';
  end if;

  select u.id into unit_id from public.units u where u.level_id = a1_id and u.title = 'Mi día en inglés' limit 1;
  if unit_id is null then
    insert into public.units (id, level_id, title, objective, theme, sort_order)
    values (gen_random_uuid(), a1_id, 'Mi día en inglés', 'Hablar de tu rutina, tus horarios y lo que haces cada día.', 'Rutinas y tiempo', 20)
    returning id into unit_id;
  end if;

  select l.id into lesson_id from public.lessons l where l.unit_id = unit_id and l.title = 'Hablar de tu rutina' limit 1;
  if lesson_id is null then
    insert into public.lessons (id, unit_id, title, description, duration_minutes, sort_order, is_published)
    values (gen_random_uuid(), unit_id, 'Hablar de tu rutina', 'Describe una mañana normal usando el presente simple.', 10, 1, true)
    returning id into lesson_id;
  end if;
  insert into public.lesson_blocks (lesson_id, block_type, content, sort_order) values
    (lesson_id, 'dialogue', '{"lines":[{"speaker":"Maya","text":"What time do you get up?"},{"speaker":"Luis","text":"I get up at seven. Then I have coffee."},{"speaker":"Maya","text":"Do you work from home?"},{"speaker":"Luis","text":"Yes, I do. I start work at eight."}]}'::jsonb, 1),
    (lesson_id, 'vocabulary', '{"items":[{"english":"get up","spanish":"levantarse"},{"english":"have coffee","spanish":"tomar café"},{"english":"start work","spanish":"empezar a trabajar"},{"english":"from home","spanish":"desde casa"}]}'::jsonb, 2),
    (lesson_id, 'grammar', '{"explanation":"Use do/does for present-simple questions. With he, she and it, the verb takes -s: She works. With I, you, we and they, use the base form: They work.","example":"What time do you start? / What time does she start?"}'::jsonb, 3),
    (lesson_id, 'pronunciation', '{"tip":"Do not add a Spanish vowel before a consonant cluster. Say start, not es-tart. Keep the final /t/ light but audible.","example":"I start work at eight."}'::jsonb, 4),
    (lesson_id, 'reading', '{"text":"Luis works from home. He starts at eight and finishes at five. At lunch, he usually cooks rice and vegetables.","task":"Find the time Luis starts and finishes work."}'::jsonb, 5),
    (lesson_id, 'writing', '{"prompt":"Write three sentences about your weekday routine. Use get up, start and finish."}'::jsonb, 6)
  on conflict do nothing;
  insert into public.exercises (id, lesson_id, exercise_type, prompt, explanation, correct_answer, difficulty, sort_order)
  values (gen_random_uuid(), lesson_id, 'multiple_choice', 'Choose the correct question.', 'Use do with you.', 'What time do you get up?', 1, 1) returning id into exercise_id;
  insert into public.exercise_options (exercise_id, option_text, is_correct, sort_order) values
    (exercise_id, 'What time do you get up?', true, 1), (exercise_id, 'What time does you get up?', false, 2), (exercise_id, 'What time you do get up?', false, 3);

  select u.id into unit_id from public.units u where u.level_id = a1_id and u.title = 'Moverte por la ciudad' limit 1;
  if unit_id is null then
    insert into public.units (id, level_id, title, objective, theme, sort_order)
    values (gen_random_uuid(), a1_id, 'Moverte por la ciudad', 'Pedir y entender indicaciones sencillas en inglés.', 'Ciudad y transporte', 30)
    returning id into unit_id;
  end if;
  select l.id into lesson_id from public.lessons l where l.unit_id = unit_id and l.title = 'Pedir indicaciones' limit 1;
  if lesson_id is null then
    insert into public.lessons (id, unit_id, title, description, duration_minutes, sort_order, is_published)
    values (gen_random_uuid(), unit_id, 'Pedir indicaciones', 'Pregunta cómo llegar a un lugar y confirma la información.', 10, 1, true)
    returning id into lesson_id;
  end if;
  insert into public.lesson_blocks (lesson_id, block_type, content, sort_order) values
    (lesson_id, 'dialogue', '{"lines":[{"speaker":"Visitor","text":"Excuse me, where is the train station?"},{"speaker":"Local","text":"Go straight and turn left at the bank."},{"speaker":"Visitor","text":"Is it far?"},{"speaker":"Local","text":"No, it is about five minutes on foot."}]}'::jsonb, 1),
    (lesson_id, 'vocabulary', '{"items":[{"english":"go straight","spanish":"seguir derecho"},{"english":"turn left","spanish":"girar a la izquierda"},{"english":"on foot","spanish":"a pie"},{"english":"about five minutes","spanish":"aproximadamente cinco minutos"}]}'::jsonb, 2),
    (lesson_id, 'grammar', '{"explanation":"Use where is/are to ask for a place. Use at + a landmark: at the bank. Use on foot for walking.","example":"Where is the station? / It is at the corner."}'::jsonb, 3),
    (lesson_id, 'pronunciation', '{"tip":"In excuse me, connect the words smoothly: ex-CUSE-me. Keep the /w/ in where rounded, not like Spanish güe.","example":"Excuse me, where is the station?"}'::jsonb, 4),
    (lesson_id, 'reading', '{"text":"The library is next to the park. The bus stop is across from the bank. The station is five minutes from the park.","task":"Where is the bus stop?"}'::jsonb, 5),
    (lesson_id, 'writing', '{"prompt":"Write a two-line message telling a visitor how to get to a place near you."}'::jsonb, 6)
  on conflict do nothing;
  insert into public.exercises (id, lesson_id, exercise_type, prompt, explanation, correct_answer, difficulty, sort_order)
  values (gen_random_uuid(), lesson_id, 'multiple_choice', 'Complete: Go ___ and turn left.', 'Go straight is the natural phrase for following the same road.', 'straight', 1, 1) returning id into exercise_id;
  insert into public.exercise_options (exercise_id, option_text, is_correct, sort_order) values
    (exercise_id, 'straight', true, 1), (exercise_id, 'direct', false, 2), (exercise_id, 'rightly', false, 3);

  select u.id into unit_id from public.units u where u.level_id = a2_id and u.title = 'Inglés para viajar' limit 1;
  if unit_id is null then
    insert into public.units (id, level_id, title, objective, theme, sort_order)
    values (gen_random_uuid(), a2_id, 'Inglés para viajar', 'Resolver situaciones habituales en un hotel y durante un viaje.', 'Viajes', 10)
    returning id into unit_id;
  end if;
  select l.id into lesson_id from public.lessons l where l.unit_id = unit_id and l.title = 'Registrarte en un hotel' limit 1;
  if lesson_id is null then
    insert into public.lessons (id, unit_id, title, description, duration_minutes, sort_order, is_published)
    values (gen_random_uuid(), unit_id, 'Registrarte en un hotel', 'Haz check-in, confirma una reserva y pide información útil.', 12, 1, true)
    returning id into lesson_id;
  end if;
  insert into public.lesson_blocks (lesson_id, block_type, content, sort_order) values
    (lesson_id, 'dialogue', '{"lines":[{"speaker":"Receptionist","text":"Welcome. Do you have a reservation?"},{"speaker":"Guest","text":"Yes, I booked a room for two nights."},{"speaker":"Receptionist","text":"Could I see your passport, please?"},{"speaker":"Guest","text":"Sure. Is breakfast included?"}]}'::jsonb, 1),
    (lesson_id, 'vocabulary', '{"items":[{"english":"reservation","spanish":"reserva"},{"english":"book a room","spanish":"reservar una habitación"},{"english":"for two nights","spanish":"por dos noches"},{"english":"included","spanish":"incluido"}]}'::jsonb, 2),
    (lesson_id, 'grammar', '{"explanation":"Use the past simple booked for a completed reservation. Use could I...? for a polite request.","example":"I booked a room. / Could I see your passport?"}'::jsonb, 3),
    (lesson_id, 'pronunciation', '{"tip":"The -ed in booked is /t/, not a separate syllable. Say bookt, with one beat.","example":"I booked a room for two nights."}'::jsonb, 4),
    (lesson_id, 'reading', '{"text":"Breakfast is included from seven to ten in the dining room. Checkout is at eleven. Guests can ask reception for a taxi.","task":"What time is checkout?"}'::jsonb, 5),
    (lesson_id, 'writing', '{"prompt":"Write a short hotel message asking about breakfast and checkout."}'::jsonb, 6)
  on conflict do nothing;
  insert into public.exercises (id, lesson_id, exercise_type, prompt, explanation, correct_answer, difficulty, sort_order)
  values (gen_random_uuid(), lesson_id, 'multiple_choice', 'Choose the polite request.', 'Could I...? is a useful polite structure for travel.', 'Could I see your passport, please?', 2, 1) returning id into exercise_id;
  insert into public.exercise_options (exercise_id, option_text, is_correct, sort_order) values
    (exercise_id, 'Could I see your passport, please?', true, 1), (exercise_id, 'I see passport now.', false, 2), (exercise_id, 'Give me passport.', false, 3);
end $$;
