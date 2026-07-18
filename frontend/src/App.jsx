import { LearningPath } from './features/learning/components/LearningPath';
import './App.css';

function App() {
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

      <LearningPath />

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
