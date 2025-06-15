import axios from 'axios';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GeneroDto } from '../../types';
import { GenresModalDelete } from './modals/GenresModalDelete';
import { GenresModalForm } from './modals/GenresModalForm';

export function Genres() {
  const [genres, setGenres] = useState<GeneroDto[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<GeneroDto | null>(null);

  const loadGenres = () => {
    axios
      .get('http://localhost:8090/API/v1/genero/findAllGenero')
      .then((res) => setGenres(res.data))
      .catch((err) =>  err);
  };

  useEffect(() => {
    loadGenres();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Genres of Films</h1>
        <button
          onClick={() => {
            setSelectedGenre(null); // Modo crear
            setOpenForm(true);
          }}
          className="flex items-center bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4 mr-2" /> New Genre
        </button>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 shadow">
        <table className="min-w-full text-left text-slate-300">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400 uppercase text-sm">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                <td className="py-2 px-4">{genre.nombre}</td>
                <td className="py-2 px-4 flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setSelectedGenre(genre); // Modo editar
                      setOpenForm(true);
                    }}
                    className="hover:text-amber-500"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGenre(genre);
                      setOpenDelete(true);
                    }}
                    className="hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {genres.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center py-6 text-slate-500">
                  is not genres results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODALES */}
      <GenresModalForm
        isOpen={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedGenre(null);
        }}
        onSaved={loadGenres}
        genre={selectedGenre}
      />

      <GenresModalDelete
        isOpen={openDelete}
        onClose={() => {
          setOpenDelete(false);
          setSelectedGenre(null);
        }}
        onDeleted={loadGenres}
        genre={selectedGenre}
      />
    </div>
  );
}
