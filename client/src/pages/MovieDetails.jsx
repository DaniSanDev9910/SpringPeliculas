import { useParams } from 'react-router';

const MovieDetails = () => {
  const { movieId } = useParams();
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl font-bold text-red-600">Movie Details</h1>
      <p className="mt-4 text-gray-700">Detalles de la película ID: {movieId}</p>
    </div>
  );
};

export default MovieDetails; 