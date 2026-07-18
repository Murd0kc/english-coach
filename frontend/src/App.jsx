import { useState } from 'react';
import { AuthPanel } from './features/auth/components/AuthPanel';
import { useAuth } from './features/auth/hooks/useAuth';
import { LearningPath } from './features/learning/components/LearningPath';
import { LessonDetail } from './features/learning/components/LessonDetail';
import './App.css';

function App() {
  const [selectedLessonId, setSelectedLessonId] = useState(null);
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
        <div className="streak">🔥 <strong>4</strong> días</div>
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
        <div className="section-heading">
          <div><p className="eyebrow">Esta semana</p><h2>Tu progreso</h2></div>
          <strong className="progress-value">32%</strong>
        </div>
        <div className="progress-track"><span style={{ width: '32%' }} /></div>
        <div className="progress-meta"><span>2 de 6 sesiones</span><span>10 min restantes</span></div>
      </section>

      {selectedLessonId ? <LessonDetail lessonId={selectedLessonId} onBack={() => setSelectedLessonId(null)} /> : <LearningPath onSelectLesson={setSelectedLessonId} />}

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
