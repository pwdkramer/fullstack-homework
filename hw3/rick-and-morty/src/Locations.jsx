import { useEffect, useState } from 'react';
import { fetchAllPages } from './api.js';

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadLocations = async function loadLocations() {
      const url = 'https://rickandmortyapi.com/api/location';

      try {
        const allLocations = await fetchAllPages(url, controller.signal);

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
    };

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
