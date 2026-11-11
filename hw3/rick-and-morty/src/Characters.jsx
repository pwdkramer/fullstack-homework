import { useEffect, useState } from 'react';
import { fetchJson } from './api.js';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadCharacters = async function loadCharacters() {
      try {
        const ids = Array.from(
          { length: 100 },
          (_, index) => index + 1,
        );

        const data = await fetchJson(
          `https://rickandmortyapi.com/api/character/${ids.join(',')}`,
          controller.signal,
        );
        if (!controller.signal.aborted) {
          setCharacters(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadCharacters();
    return () => controller.abort();
  }, []);

  if (loading) {
    return <p>Loading characters...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section>
      <h2>Characters ({characters.length})</h2>

      <div className="character-grid">
        {characters.map(({ id, image, name, species, status }) => (
          <article key={id}>
            <img
              src={image}
              alt={name}
              loading="lazy"
              width="300"
              height="300"
            />
            <h3>{name}</h3>
            <p>Species: {species}</p>
            <p>Status: {status}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
