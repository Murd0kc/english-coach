import { useReviewCards } from '../hooks/useReviewCards';
import './ReviewSummary.css';

export function ReviewSummary() {
  const { cards, isLoading, error } = useReviewCards();
  if (isLoading) return <section className="review-summary"><p>Cargando repasos...</p></section>;
  if (error) return <section className="review-summary"><p role="alert">{error}</p></section>;
  return (
    <section className="review-summary">
      <div className="review-icon">↻</div>
      <div><p className="eyebrow">Repaso inteligente</p><h3>{cards.length ? `${cards.length} expresiones están listas` : 'No tienes repasos pendientes'}</h3><p>{cards.length ? 'Repásalas ahora para recordarlas cuando las necesites.' : 'Sigue practicando para crear tu memoria de aprendizaje.'}</p></div>
      {cards.length > 0 && <button className="secondary-button" type="button">Repasar</button>}
    </section>
  );
}
