import { useState } from 'react';
import { reviewCard } from '../services/reviewService';

export function ReviewSession({ cards, onClose }) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState('');
  const card = cards[index];

  async function finishCard(quality) {
    try {
      await reviewCard(card.id, quality);
      if (index === cards.length - 1) onClose();
      else { setIndex(index + 1); setShowAnswer(false); }
    } catch (err) { setError(err.message); }
  }

  return <section className="review-session">
    <button className="text-button" type="button" onClick={onClose}>← Cerrar repaso</button>
    <p className="eyebrow">Repaso {index + 1} de {cards.length}</p>
    <h2>{card.front_content.prompt || 'Recuerda esta expresión'}</h2>
    {showAnswer ? <p className="review-answer">{card.back_content.explanation}</p> : <button className="primary-button" type="button" onClick={() => setShowAnswer(true)}>Mostrar respuesta</button>}
    {showAnswer && <div className="review-rating"><button type="button" onClick={() => finishCard(2)}>Necesito practicar</button><button type="button" onClick={() => finishCard(4)}>Lo recuerdo</button></div>}
    {error && <p role="alert">{error}</p>}
  </section>;
}
