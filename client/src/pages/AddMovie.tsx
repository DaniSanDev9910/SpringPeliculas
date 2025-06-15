import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Star } from 'lucide-react';
import { obtenerGeneros } from '../services/generoService';

export function AddMovie() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    genre: '',
    rating: '',
    poster: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  /*const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Western'
  ];*/

  const [genres, setGenres] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerGeneros()
      .then(setGenres)
      .catch(setError)
      .finally(() => setCargando(false));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.director.trim()) newErrors.director = 'Director is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.genre) newErrors.genre = 'Genre is required';
    if (!formData.rating) newErrors.rating = 'Rating is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    const year = parseInt(formData.year);
    if (year < 1800 || year > new Date().getFullYear() + 5) {
      newErrors.year = 'Please enter a valid year';
    }
    
    const rating = parseFloat(formData.rating);
    if (rating < 0 || rating > 10) {
      newErrors.rating = 'Rating must be between 0 and 10';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // addMovie({
      //   title: formData.title.trim(),
      //   director: formData.director.trim(),
      //   year: parseInt(formData.year),
      //   genre: formData.genre,
      //   rating: parseFloat(formData.rating),
      //   poster: formData.poster.trim() || undefined,
      //   description: formData.description.trim()
      // });
      
      // navigate('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Add New Movie</h1>
        <p className="text-slate-400">Share your favorite films with the world</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl p-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
              Movie Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.title ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'
              }`}
              placeholder="Enter movie title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="director" className="block text-sm font-medium text-slate-300 mb-2">
              Director *
            </label>
            <input
              type="text"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.director ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'
              }`}
              placeholder="Enter director name"
            />
            {errors.director && <p className="mt-1 text-sm text-red-400">{errors.director}</p>}
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-slate-300 mb-2">
              Release Year *
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1800"
              max={new Date().getFullYear() + 5}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.year ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'
              }`}
              placeholder="2024"
            />
            {errors.year && <p className="mt-1 text-sm text-red-400">{errors.year}</p>}
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-slate-300 mb-2">
              Genre *
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.genre ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'
              }`}
            >
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.nombre}>{genre.nombre}</option>
              ))}
            </select>
            {errors.genre && <p className="mt-1 text-sm text-red-400">{errors.genre}</p>}
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
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 pr-10 ${
                  errors.rating ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'
                }`}
                placeholder="8.5"
              />
              <Star className="absolute right-3 top-3.5 h-5 w-5 text-amber-500" />
            </div>
            {errors.rating && <p className="mt-1 text-sm text-red-400">{errors.rating}</p>}
          </div>

          <div>
            <label htmlFor="poster" className="block text-sm font-medium text-slate-300 mb-2">
              Poster URL
            </label>
            <input
              type="url"
              id="poster"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
              placeholder="https://example.com/poster.jpg"
            />
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.description ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'
            }`}
            placeholder="Write a brief description of the movie..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
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
    </div>
  );
}