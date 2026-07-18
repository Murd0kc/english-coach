import { useLearningPath } from '../hooks/useLearningPath';

export function LearningPath() {
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
          </article>
        ))}
      </div>
    </section>
  );
}
