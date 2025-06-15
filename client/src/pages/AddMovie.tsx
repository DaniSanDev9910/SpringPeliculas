import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Star } from 'lucide-react';
import { getGenres } from '../services/genreService';
import { createMovie } from '../services/movieService';
import { PeliculaDto, GeneroDto } from '../types';
import { useForm } from '../hooks/useForm';
import { ConfirmationModal } from '../components/ConfirmationModal';

export function AddMovie() {
  const navigate = useNavigate();
  
  type MovieForm = {
    nombre: string;
    director: string;
    anio: string;
    idGenero: string;
    rating: string;
    imagen: string;
    sinopsis: string;
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm<MovieForm>({
    initialValues: {
      nombre: '',
      director: '',
      anio: '',
      idGenero: '',
      rating: '',
      imagen: '',
      sinopsis: '',
    },
    validate: (vals) => {
      const newErrors: Partial<Record<keyof MovieForm, string>> = {};

      if (!vals.nombre.trim()) newErrors.nombre = 'Nombre is required';
      if (!vals.director.trim()) newErrors.director = 'Director is required';
      if (!vals.anio) newErrors.anio = 'Año is required';
      if (!vals.idGenero) newErrors.idGenero = 'Genero is required';
      if (!vals.rating) newErrors.rating = 'Rating is required';
      if (!vals.sinopsis.trim()) newErrors.sinopsis = 'Sinopsis is required';

      const yearNum = parseInt(vals.anio);
      if (!isNaN(yearNum) && (yearNum < 1800 || yearNum > new Date().getFullYear() + 5)) {
        newErrors.anio = 'Please enter a valid year';
      }

      const ratingNum = parseFloat(vals.rating);
      if (!isNaN(ratingNum) && (ratingNum < 0 || ratingNum > 10)) {
        newErrors.rating = 'Rating must be between 0 and 10';
      }

      return newErrors;
    },
    onSubmit: async (vals) => {
      // Prepare DTO for backend
      const dto: PeliculaDto = {
        id: '',
        nombre: vals.nombre.trim(),
        sinopsis: vals.sinopsis.trim(),
        imagen: vals.imagen.trim(),
        idGenero: vals.idGenero,
        director: vals.director.trim(),
        anio: parseInt(vals.anio),
        rating: parseFloat(vals.rating),
      };

      try {
        await createMovie(dto);
        setModal({ type: 'success', title: 'Success', message: 'Movie created successfully!' });
      } catch (err) {
        console.error('Failed to save movie', err);
        setModal({ type: 'error', title: 'Error', message: 'There was a problem creating the movie.' });
      }
    },
  });

  const [genres, setGenres] = useState<GeneroDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modal, setModal] = useState<null | { type: 'success' | 'error'; title: string; message: string }>(null);

  const closeModal = () => {
    if (modal?.type === 'success') {
      navigate('/');
    }
    setModal(null);
  };

  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Add New Movie</h1>
        <p className="text-slate-400">Share your favorite films with the world</p>
      </div>

      {loading ? (
        <p className="text-center text-slate-300">Loading genres...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : (
      <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl p-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-2">
              Movie Title *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.nombre ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'
              }`}
              placeholder="Enter movie title"
            />
            {errors.nombre && <p className="mt-1 text-sm text-red-400">{errors.nombre}</p>}
          </div>

          <div>
            <label htmlFor="director" className="block text-sm font-medium text-slate-300 mb-2">
              Director *
            </label>
            <input
              type="text"
              id="director"
              name="director"
              value={values.director}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.director ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'
              }`}
              placeholder="Enter director name"
            />
            {errors.director && <p className="mt-1 text-sm text-red-400">{errors.director}</p>}
          </div>

          <div>
            <label htmlFor="anio" className="block text-sm font-medium text-slate-300 mb-2">
              Release Year *
            </label>
            <input
              type="number"
              id="anio"
              name="anio"
              value={values.anio}
              onChange={handleChange}
              min="1800"
              max={new Date().getFullYear() + 5}
              className={`appearance-none w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.anio ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'
              }`}
              placeholder="2024"
            />
            {errors.anio && <p className="mt-1 text-sm text-red-400">{errors.anio}</p>}
          </div>

          <div>
            <label htmlFor="idGenero" className="block text-sm font-medium text-slate-300 mb-2">
              Genre *
            </label>
            <select
              id="idGenero"
              name="idGenero"
              value={values.idGenero}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.idGenero ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'
              }`}
            >
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.nombre}</option>
              ))}
            </select>
            {errors.idGenero && <p className="mt-1 text-sm text-red-400">{errors.idGenero}</p>}
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-slate-300 mb-2">
              Rating (0-10) *
            </label>
            <div className="relative">
              <input
                type="number"
                id="rating"
                name="rating"
                value={values.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                className={`appearance-none w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 pr-10 ${
                  errors.rating ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'
                }`}
                placeholder="8.5"
              />
              <Star className="absolute right-3 top-3.5 h-5 w-5 text-amber-500" />
            </div>
            {errors.rating && <p className="mt-1 text-sm text-red-400">{errors.rating}</p>}
          </div>

          <div>
            <label htmlFor="imagen" className="block text-sm font-medium text-slate-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              id="imagen"
              name="imagen"
              value={values.imagen}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
              placeholder="https://example.com/poster.jpg"
            />
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="sinopsis" className="block text-sm font-medium text-slate-300 mb-2">
            Sinopsis *
          </label>
          <textarea
            id="sinopsis"
            name="sinopsis"
            value={values.sinopsis}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.sinopsis ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'
            }`}
            placeholder="Write a brief description of the movie..."
          />
          {errors.sinopsis && <p className="mt-1 text-sm text-red-400">{errors.sinopsis}</p>}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Movie</span>
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
      )}

      <ConfirmationModal
        isOpen={modal !== null}
        onClose={closeModal}
        title={modal?.title ?? ''}
        message={modal?.message ?? ''}
        type={modal?.type ?? 'success'}
      />
    </div>
  );
}