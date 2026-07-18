import { useLearningPath } from '../hooks/useLearningPath';

export function LearningPath({ onSelectLesson, onStartAssessment }) {
  const { units, isLoading, error } = useLearningPath();

  if (isLoading) {
    return <p>Cargando tu ruta de aprendizaje...</p>;
  }

  if (error) {
    return <p role="alert">No se pudo cargar la ruta: {error}</p>;
  }

  if (!units.length) {
    return <p>Aún no hay unidades publicadas.</p>;
  }

  return (
    <section className="learning-path" id="ruta">
      <h2>Tu ruta de aprendizaje</h2>

      <div className="path-grid">
        {units.map((unit) => (
          <article className="unit-card" key={unit.id}>
            <small className="unit-level">
              {unit.levels?.code} · {unit.levels?.name}
            </small>
            <h3>{unit.title}</h3>
            <p>{unit.objective}</p>
            <button className="secondary-button unit-assessment-button" type="button" onClick={() => onStartAssessment(unit.id, unit.title)}>Evaluar unidad</button>
            <div className="lesson-list">
              {unit.lessons?.map((lesson, index) => (
                <button className="lesson-row" type="button" key={lesson.id} onClick={() => onSelectLesson(lesson.id)}>
                  <span className="lesson-number">{index + 1}</span>
                  <span className="lesson-details">
                    <strong>{lesson.title}</strong>
                    <small>{lesson.duration_minutes} min · {lesson.description}</small>
                  </span>
                  <span className="lesson-arrow">→</span>
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
