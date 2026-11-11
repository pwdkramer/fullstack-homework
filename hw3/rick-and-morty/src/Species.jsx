import { useEffect, useState } from 'react';
import { fetchAllPages } from './api.js';

export default function Species() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadCharacters = async function loadCharacters() {
      const url = 'https://rickandmortyapi.com/api/character';
      setLoading(true);
      setError('');

      try {
        const allCharacters = await fetchAllPages(url, controller.signal);

        setCharacters(allCharacters);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error('Species request failed:', url, err);
          setError(`Could not load ${url}: ${err.message}`);
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
    return <p>Loading species...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  const groups = {};

  for (const character of characters) {
    const species = character.species?.trim() || 'Unknown';

    if (!groups[species]) {
      groups[species] = [];
    }

    groups[species].push(character);
  }

  return (
    <section>
      <h2>Species</h2>

      {Object.entries(groups)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([species, members]) => (
          <article key={species}>
            <h3>
              {species} ({members.length})
            </h3>

            <ul>
              {members.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </article>
        ))}
    </section>
  );
}
