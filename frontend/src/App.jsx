import { useState } from 'react';
import { AuthPanel } from './features/auth/components/AuthPanel';
import { useAuth } from './features/auth/hooks/useAuth';
import { LearningPath } from './features/learning/components/LearningPath';
import { LessonDetail } from './features/learning/components/LessonDetail';
import { ProgressSummary } from './features/progress/components/ProgressSummary';
import { AccountMenu } from './features/auth/components/AccountMenu';
import './App.css';

function App() {
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [progressVersion, setProgressVersion] = useState(0);
  const { user, isLoading } = useAuth();

  if (isLoading) return <main className="app-shell"><p>Cargando tu cuenta...</p></main>;
  if (!user) return <main className="app-shell"><AuthPanel /></main>;
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="English Coach inicio">
          <span className="brand-mark">EC</span>
          <span>English Coach</span>
        </a>
        <div className="topbar-actions"><div className="streak">🔥 <strong>4</strong> días</div><AccountMenu email={user.email} /></div>
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
