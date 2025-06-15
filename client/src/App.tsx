import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Movie } from './pages/Movie';
import { AddMovie } from './pages/AddMovie';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Genres } from './pages/Genres/GenresView';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movie/:id" element={<Movie />} />
            <Route path="add-movie" element={<AddMovie />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="Genres" element={<Genres />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;