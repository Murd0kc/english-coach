import { useState } from 'react';
import './ExerciseCard.css';

export function ExerciseCard({ exercise }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <article className="content-block exercise-card">
      <h3>{exercise.prompt}</h3>
      {exercise.exercise_options?.map((option) => {
        const isSelected = selectedOption?.id === option.id;
        const className = [
          'answer-option',
          isSelected && (option.is_correct ? 'correct' : 'incorrect'),
        ].filter(Boolean).join(' ');

        return (
          <button className={className} type="button" key={option.id} onClick={() => setSelectedOption(option)}>
            {option.option_text}
          </button>
        );
      })}
      {selectedOption && (
        <p className={selectedOption.is_correct ? 'exercise-feedback success' : 'exercise-feedback error'}>
          {selectedOption.is_correct ? '¡Correcto! Muy bien.' : 'Casi. Revisa el diálogo e inténtalo de nuevo.'}
        </p>
      )}
    </article>
  );
}
