import { useEffect, useState } from 'react';

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadLocations() {
      let url = 'https://rickandmortyapi.com/api/location';

      try {
        const allLocations = [];

        while (url) {
          const response = await fetch(url, {
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const data = await response.json();
          allLocations.push(...data.results);
          url = data.info.next;
        }

        setLocations(allLocations);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(`Could not load ${url}: ${err.message}`);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLocations();
    return () => controller.abort();
  }, []);

  if (loading) {
    return <p>Loading locations...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  const counts = {};

  for (const location of locations) {
    const type = location.type?.trim() || 'Unknown';
    counts[type] = (counts[type] ?? 0) + 1;
  }

  return (
    <section>
      <h2>Locations by type</h2>
      <p>Total locations: {locations.length}</p>

      <ul>
        {Object.entries(counts)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([type, count]) => (
            <li key={type}>
              {type}: {count}
            </li>
          ))}
      </ul>
    </section>
  );
}