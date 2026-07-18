import { getLearningPath } from './learningService';
import { getUserProgress } from '../../progress/services/progressService';

const skillLabels = { grammar: 'gramática', vocabulary: 'vocabulario', reading: 'lectura', listening: 'escucha' };

export async function getNextRecommendation(diagnostic) {
  const [units, progress] = await Promise.all([getLearningPath(), getUserProgress()]);
  const completed = new Set(progress.filter((item) => item.status === 'completed').map((item) => item.lesson_id));
  const nextLesson = units.flatMap((unit) => unit.lessons.map((lesson) => ({ ...lesson, unitTitle: unit.title, levelCode: unit.levels?.code }))).find((lesson) => !completed.has(lesson.id));
  const weakest = Object.entries(diagnostic?.skill_scores ?? {}).sort(([, a], [, b]) => (a.score / a.total) - (b.score / b.total))[0]?.[0];
  if (!nextLesson) return null;
  return { lesson: nextLesson, reason: weakest ? `Refuerza tu ${skillLabels[weakest] ?? weakest} mientras avanzas en tu ruta ${diagnostic?.overall_level ?? nextLesson.levelCode}.` : 'Es el siguiente paso disponible en tu ruta personalizada.' };
}
