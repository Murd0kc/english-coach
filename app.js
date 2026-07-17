const toast = document.querySelector('#toast');
let timeout;

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(timeout);
  timeout = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelector('#startLesson').addEventListener('click', () => {
  document.querySelector('#leccion').scrollIntoView({ behavior: 'smooth' });
  notify('Tu lección está lista para comenzar.');
});

document.querySelector('#playLesson').addEventListener('click', () => notify('La práctica conversacional estará disponible en el siguiente paso.'));
document.querySelector('#reviewWords').addEventListener('click', () => notify('Repaso iniciado: 5 expresiones seleccionadas para ti.'));
