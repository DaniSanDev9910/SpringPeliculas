import React, { useEffect, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { MovieCard } from '../components/MovieCard';
import { Film } from 'lucide-react';
import { PeliculaDto } from '../dto/PeliculaDto';
import { obtenerPeliculas } from '../services/peliculaService';

export function Home() {
  const [movies, setMovies] = useState<PeliculaDto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Función para buscar películas
  const fetchMovies = async (search?: string) => {
    try {
      setLoading(true);
      setError('');
      const data = await obtenerPeliculas(search);
      setMovies(data || []); // Aseguramos que siempre sea un array
    } catch (err: any) {
      console.error('Error fetching movies:', err);
      setError(err?.response?.data?.message || err?.message || 'Error loading movies');
      setMovies([]); // Limpiamos las películas en caso de error
    } finally {
      setLoading(false);
    }
  };

  // Efecto inicial para cargar todas las películas
  useEffect(() => {
    fetchMovies();
  }, []);

  // Efecto para buscar películas cuando cambia el término de búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== undefined) {
        fetchMovies(searchTerm);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Manejador para el cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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

      <SearchBar value={searchTerm} onChange={handleSearchChange} />

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
          <button 
            onClick={() => fetchMovies(searchTerm)}
            className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : movies.length === 0 ? (
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
              {searchTerm ? `Search Results (${movies.length})` : 'Your Collection'}
            </h2>
            <span className="text-slate-400">
              {movies.length} movie{movies.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}