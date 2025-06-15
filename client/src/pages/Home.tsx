import { useEffect, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { MovieCard } from '../components/MovieCard';
import { Film } from 'lucide-react';
import { PeliculaDto } from '../types';
import { getMovies } from '../services/movieService';

export function Home() {
  const [movies, setMovies] = useState<PeliculaDto[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<PeliculaDto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.sinopsis.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredMovies(movies);
    }
  }, [searchTerm, movies]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await getMovies();
      setMovies(data);
      setFilteredMovies(data);
      setError('');
    } catch (err) {
      setError('Error loading movies');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

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

      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto"></div>
          <p className="text-slate-400 mt-4">Loading movies...</p>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <Film className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-red-400 mb-2">Error</h3>
          <p className="text-slate-500">{error}</p>
        </div>
      ) : filteredMovies.length === 0 ? (
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