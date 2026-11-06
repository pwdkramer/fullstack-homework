import { useEffect, useState } from 'react';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCharacters() {
      try {
        const ids = Array.from(
          { length: 100 },
          (_, index) => index + 1
        );

        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${ids.join(',')}`
        );

        if (!response.ok) {
          throw new Error('Could not load the characters.');
        }

        const data = await response.json();
        setCharacters(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
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
        {characters.map((character) => (
          <article key={character.id}>
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
          </article>
        ))}
      </div>
    </section>
  );
}