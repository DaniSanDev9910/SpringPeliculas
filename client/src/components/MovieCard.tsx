import React, { useEffect, useState } from 'react';
import { User, Calendar, Star, Film, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PeliculaDto } from '../dto/PeliculaDto';
import { GeneroDto } from '../dto/GeneroDto';
import { obtenerGeneros } from '../services/generoService';
import { crearVisualizacion, obtenerVisualizaciones } from '../services/visualizacionService';

interface MovieCardProps {
  movie: PeliculaDto;
}

export function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const [generos, setGeneros] = useState<GeneroDto[]>([]);
  const [generoNombre, setGeneroNombre] = useState<string>('');
  const [visualizaciones, setVisualizaciones] = useState<number>(0);

  useEffect(() => {
    const cargarGeneros = async () => {
      try {
        const data = await obtenerGeneros();
        setGeneros(data);
      } catch (error) {
        console.error('Error al cargar géneros:', error);
      }
    };
    cargarGeneros();
  }, []);

  useEffect(() => {
    const cargarVisualizaciones = async () => {
      try {
        const data = await obtenerVisualizaciones();
        const visualizacion = data.find(v => v.idPelicula === movie.id);
        setVisualizaciones(visualizacion?.numeroVisualizaciones || 0);
      } catch (error) {
        console.error('Error al cargar visualizaciones:', error);
      }
    };
    cargarVisualizaciones();
  }, [movie.id]);

  useEffect(() => {
    if (generos.length > 0 && movie.idGenero) {
      const genero = generos.find(g => g.id === movie.idGenero);
      setGeneroNombre(genero?.nombre || '');
    }
  }, [generos, movie.idGenero]);

  const handleClick = async () => {
    try {
      await crearVisualizacion(movie.id);
      setVisualizaciones(prev => prev + 1); // Actualizamos localmente el contador
      navigate(`/movie/${movie.id}`);
    } catch (error) {
      console.error('Error al registrar visualización:', error);
      navigate(`/movie/${movie.id}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
    >
      <div className="aspect-w-16 aspect-h-9 bg-slate-700">
        {movie.imagen ? (
          <img
            src={movie.imagen}
            alt={movie.nombre}
            className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-100 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <span className="text-slate-400 text-lg font-medium">{movie.nombre}</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors duration-200">
            {movie.nombre}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-amber-500/20 rounded-lg px-2 py-1">
              <Star className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-amber-500 font-semibold">{movie.rating}</span>
            </div>
            <div className="flex items-center bg-blue-500/20 rounded-lg px-2 py-1">
              <Eye className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-blue-500 font-semibold">{visualizaciones}</span>
            </div>
          </div>
        </div>
        
        <p className="text-slate-300 text-sm mb-4 line-clamp-3">
          {movie.sinopsis}
        </p>
        
        <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{movie.director}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{movie.anio}</span>
          </div>
        </div>

        {generoNombre && (
          <div className="flex items-center space-x-1 text-sm">
            <Film className="h-4 w-4 text-amber-500" />
            <span className="text-amber-500">{generoNombre}</span>
          </div>
        )}
      </div>
    </div>
  );
}