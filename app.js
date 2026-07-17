const toast = document.querySelector('#toast');
const lessonModal = document.querySelector('#lessonModal');
let timeout;

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(timeout);
  timeout = setTimeout(() => toast.classList.remove('show'), 2600);
}

function openLesson() {
  lessonModal.classList.add('open');
  lessonModal.setAttribute('aria-hidden', 'false');
}

function closeLesson() {
  lessonModal.classList.remove('open');
  lessonModal.setAttribute('aria-hidden', 'true');
}

document.querySelector('#startLesson').addEventListener('click', () => {
  document.querySelector('#leccion').scrollIntoView({ behavior: 'smooth' });
  notify('Tu lección está lista para comenzar.');
});
document.querySelector('#playLesson').addEventListener('click', openLesson);
document.querySelectorAll('[data-close-lesson]').forEach((button) => button.addEventListener('click', closeLesson));
document.querySelector('#listenDialogue').addEventListener('click', () => notify('Audio de práctica preparado para la siguiente integración.'));
document.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => {
  const feedback = document.querySelector('#quizFeedback');
  const correct = button.dataset.answer === 'correct';
  feedback.textContent = correct ? '¡Correcto! A medium latte.' : 'Casi. Escucha de nuevo: pide un medium latte.';
  feedback.className = `quiz-feedback ${correct ? 'success' : 'error'}`;
}));
document.querySelector('#reviewWords').addEventListener('click', () => notify('Repaso iniciado: 5 expresiones seleccionadas para ti.'));
