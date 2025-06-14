import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { MoviesProvider } from './context/MoviesContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { AddMovie } from './pages/AddMovie';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

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
          </Route>
        </Routes>
      </Router>
    </MoviesProvider>
  );
}

export default App;