import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie } from '../types/Movie';

interface MoviesContextType {
  movies: Movie[];
  addMovie: (movie: Omit<Movie, 'id'>) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredMovies: Movie[];
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

const sampleMovies: Movie[] = [
  {
    id: '1',
    title: 'Blade Runner 2049',
    director: 'Denis Villeneuve',
    year: 2017,
    genre: 'Sci-Fi',
    rating: 8.0,
    description: 'A young blade runner discovers a long-buried secret that leads him to track down former blade runner Rick Deckard.',
    poster: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    title: 'The Grand Budapest Hotel',
    director: 'Wes Anderson',
    year: 2014,
    genre: 'Comedy',
    rating: 8.1,
    description: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    title: 'Parasite',
    director: 'Bong Joon-ho',
    year: 2019,
    genre: 'Thriller',
    rating: 8.6,
    description: 'A poor family schemes to become employed by a wealthy family and infiltrate their household.',
    poster: 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>(sampleMovies);
  const [searchTerm, setSearchTerm] = useState('');

  const addMovie = (movieData: Omit<Movie, 'id'>) => {
    const newMovie: Movie = {
      ...movieData,
      id: Date.now().toString(),
    };
    setMovies(prev => [newMovie, ...prev]);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MoviesContext.Provider value={{
      movies,
      addMovie,
      searchTerm,
      setSearchTerm,
      filteredMovies
    }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
}