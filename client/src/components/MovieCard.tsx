import React from 'react';
import { Star, Calendar, User } from 'lucide-react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <div className="aspect-w-16 aspect-h-9 bg-slate-700">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <span className="text-slate-400 text-lg font-medium">{movie.title}</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors duration-200">
          {movie.title}
        </h3>
        
        <p className="text-slate-300 text-sm mb-4 line-clamp-3">
          {movie.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{movie.director}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{movie.year}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium">
            {movie.genre}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-amber-500 fill-current" />
            <span className="text-white font-medium">{movie.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}