import { useState } from 'react';
import { recordAnswer } from '../services/learningService';
import './ExerciseCard.css';

export function ExerciseCard({ exercise }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [saveError, setSaveError] = useState('');

  async function handleSelect(option) {
    setSelectedOption(option);
    setSaveError('');
    try {
      await recordAnswer(exercise.id, option, option.is_correct);
    } catch (error) {
      setSaveError(error.message);
    }
  }

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
          <button className={className} type="button" key={option.id} onClick={() => handleSelect(option)}>
            {option.option_text}
          </button>
        );
      })}
      {selectedOption && (
        <p className={selectedOption.is_correct ? 'exercise-feedback success' : 'exercise-feedback error'}>
          {selectedOption.is_correct ? '¡Correcto! Muy bien.' : 'Casi. Revisa el diálogo e inténtalo de nuevo.'}
        </p>
      )}
      {saveError && <p className="exercise-feedback error">{saveError}</p>}
    </article>
  );
}
