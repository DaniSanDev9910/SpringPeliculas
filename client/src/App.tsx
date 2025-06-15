import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Movie } from './pages/Movie';
import { AddMovie } from './pages/AddMovie';
import { Genres } from './pages/Genres/GenresView';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movie/:id" element={<Movie />} />
            <Route path="add-movie" element={<AddMovie />} />
            <Route path="genres" element={<Genres />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;