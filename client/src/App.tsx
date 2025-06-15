import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MoviesProvider } from './context/MoviesContext';
import { About } from './pages/About';
import { AddMovie } from './pages/AddMovie';
import { Contact } from './pages/Contact';
import { Genres } from './pages/Genres/GenresView';
import { Home } from './pages/Home';

function App() {
  return (
    <MoviesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add-movie" element={<AddMovie />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="Genres" element={<Genres />} />
          </Route>
        </Routes>
      </Router>
    </MoviesProvider>
  );
}

export default App;