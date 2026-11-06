import { Link, Navigate, Route, Routes } from 'react-router';
import './App.css';
import Characters from './Characters.jsx';
import Species from './Species.jsx';
import Locations from './Locations.jsx';

export default function App() {
  return (
    <>
      <h1>Rick and Morty Explorer</h1>

      <nav>
        <Link to="/home">Home</Link>{' | '}
        <Link to="/characters">Characters</Link>{' | '}
        <Link to="/species">Species</Link>{' | '}
        <Link to="/locations">Locations</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={<p>Explore the Rick and Morty universe!</p>}
          />
          <Route path="/characters" element={<Characters />} />
          <Route path="/species" element={<Species />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </main>
    </>
  );
}