import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-movie" element={<AddMovie />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/:movieId" element={<MovieDetails />} />
    </Routes>
  );
}

export default App
