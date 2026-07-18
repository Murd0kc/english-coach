import { useLesson } from '../hooks/useLesson';
import { ExerciseCard } from './ExerciseCard';
import './LessonDetail.css';

export function LessonDetail({ lessonId, onBack }) {
  const { lesson, isLoading, error } = useLesson(lessonId);
  if (isLoading) return <section className="lesson-detail"><p>Cargando lección...</p></section>;
  if (error) return <section className="lesson-detail"><button className="text-button" onClick={onBack}>← Volver</button><p role="alert">{error}</p></section>;
  if (!lesson) return null;

  return (
    <section className="lesson-detail" aria-labelledby="lesson-title">
      <button className="text-button" type="button" onClick={onBack}>← Volver a la ruta</button>
      <p className="eyebrow">Lección · {lesson.duration_minutes} minutos</p>
      <h2 id="lesson-title">{lesson.title}</h2>
      <p className="lesson-description">{lesson.description}</p>
      <div className="lesson-blocks">
        {lesson.lesson_blocks.map((block) => (
          <article className="content-block" key={block.id}>
            <span className="block-type">{block.block_type}</span>
            {block.block_type === 'dialogue' && block.content.lines?.map((line, index) => <p key={`${block.id}-${index}`}><strong>{line.speaker}:</strong> {line.text}</p>)}
            {block.block_type === 'vocabulary' && block.content.items?.map((item) => <p key={item.english}><strong>{item.english}</strong> · {item.spanish}</p>)}
            {block.block_type !== 'dialogue' && block.block_type !== 'vocabulary' && <p>{block.content.explanation || block.content.tip || block.content.example}</p>}
          </article>
        ))}
      </div>
      <div className="exercise-list">
        <p className="eyebrow">Comprueba lo que aprendiste</p>
        {lesson.exercises.map((exercise) => <ExerciseCard exercise={exercise} key={exercise.id} />)}
      </div>
    </section>
  );
}
