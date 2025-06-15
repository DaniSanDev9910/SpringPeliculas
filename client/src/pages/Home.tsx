import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { MovieCard } from '../components/MovieCard';
import { useMovies } from '../context/MoviesContext';
import { Film } from 'lucide-react';

export function Home() {
  const { filteredMovies, searchTerm } = useMovies();

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome to <span className="text-amber-500">MovieVault</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Discover, collect, and organize your favorite movies in one beautiful place
        </p>
      </div>

      <SearchBar />

      {filteredMovies.length === 0 ? (
        <div className="text-center py-16">
          <Film className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-400 mb-2">
            {searchTerm ? 'No movies found' : 'No movies yet'}
          </h3>
          <p className="text-slate-500">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Start by adding your first movie to the collection'}
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              {searchTerm ? `Search Results (${filteredMovies.length})` : 'Your Collection'}
            </h2>
            <span className="text-slate-400">
              {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}