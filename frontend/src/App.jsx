import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

function App() {
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLevels() {
      const { data, error } = await supabase
        .from('levels')
        .select('code, name, description')
        .order('sort_order');

      if (error) {
        setError(error.message);
        return;
      }

      setLevels(data);
    }

    loadLevels();
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <p>English Coach</p>
      <h1>Tu ruta de inglés</h1>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {levels.length === 0 && !error && <p>Cargando niveles...</p>}

      <section>
        {levels.map((level) => (
          <article key={level.code}>
            <h2>{level.code} · {level.name}</h2>
            <p>{level.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;