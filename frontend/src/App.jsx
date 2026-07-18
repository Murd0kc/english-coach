import { useState } from 'react';
import { AuthPanel } from './features/auth/components/AuthPanel';
import { useAuth } from './features/auth/hooks/useAuth';
import { LearningPath } from './features/learning/components/LearningPath';
import { LessonDetail } from './features/learning/components/LessonDetail';
import { ProgressSummary } from './features/progress/components/ProgressSummary';
import { AccountMenu } from './features/auth/components/AccountMenu';
import { ReviewSummary } from './features/review/components/ReviewSummary';
import { useDiagnostic } from './features/assessment/hooks/useDiagnostic';
import { DiagnosticPanel } from './features/assessment/components/DiagnosticPanel';
import { ContentAdminPanel } from './features/content/components/ContentAdminPanel';
import { ConversationCoach } from './features/conversation/components/ConversationCoach';
import { PronunciationCoach } from './features/pronunciation/components/PronunciationCoach';
import { ConsistencyBadge } from './features/motivation/components/ConsistencyBadge';
import './App.css';

function App() {
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [progressVersion, setProgressVersion] = useState(0);
  const { user, isLoading } = useAuth();
  const { diagnostic, isLoading: diagnosticLoading, error: diagnosticError, setDiagnostic } = useDiagnostic(user?.id);

  if (isLoading) return <main className="app-shell"><p>Cargando tu cuenta...</p></main>;
  if (!user) return <main className="app-shell"><AuthPanel /></main>;
  if (diagnosticLoading) return <main className="app-shell"><p>Cargando tu ruta personalizada...</p></main>;
  if (!diagnostic && !diagnosticError) return <main className="app-shell"><DiagnosticPanel userId={user.id} onCompleted={setDiagnostic} /></main>;
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="English Coach inicio">
          <span className="brand-mark">EC</span>
          <span>English Coach</span>
        </a>
        <div className="topbar-actions"><ConsistencyBadge userId={user.id} /><AccountMenu email={user.email} /></div>
      </header>

      <section className="hero-panel">
        <div>
          <p className="eyebrow">Tu práctica de hoy</p>
          <h1>Habla inglés con más confianza.</h1>
          <p className="hero-copy">
            Lecciones cortas, situaciones reales y repasos diseñados para hispanohablantes.
          </p>
          <button className="primary-button" type="button">Continuar lección <span>→</span></button>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span>hello</span><span>hola</span><span>ready?</span>
        </div>
      </section>

      <section className="progress-card">
        <ProgressSummary key={progressVersion} />
      </section>

      <ReviewSummary />
      <ConversationCoach levelCode={diagnostic?.overall_level ?? 'A1'} />
      <PronunciationCoach />
      <ContentAdminPanel userId={user.id} />

      {selectedLessonId ? <LessonDetail lessonId={selectedLessonId} onBack={() => setSelectedLessonId(null)} onCompleted={() => setProgressVersion((value) => value + 1)} /> : <LearningPath onSelectLesson={setSelectedLessonId} />}

      <nav className="bottom-nav" aria-label="Navegación principal">
        <a className="active" href="#inicio">⌂<span>Inicio</span></a>
        <a href="#ruta">▣<span>Aprender</span></a>
        <a href="#progreso">◔<span>Progreso</span></a>
        <a href="#perfil">○<span>Perfil</span></a>
      </nav>
    </main>
  );
}

export default App;
