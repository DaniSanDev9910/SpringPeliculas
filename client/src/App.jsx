import { Routes, Route, useParams } from "react-router-dom";

const Home = () => <h1>Home</h1>;

const AddMovie = () => <h1>Add Movie</h1>;

const About = () => <h1>About</h1>;

const Contact = () => <h1>Contact</h1>;

const MovieDetails = () => {
  const { movieId } = useParams();
  return <h1>Movie Details for ID: {movieId}</h1>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddMovie />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/:movieId" element={<MovieDetails />} />
    </Routes>
  );
}

export default App
