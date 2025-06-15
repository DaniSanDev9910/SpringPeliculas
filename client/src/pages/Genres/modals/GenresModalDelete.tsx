import axios from 'axios';
import { Genre } from '../../../types';

interface GenresModalDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    onDeleted: () => void;
    genre: Genre | null;
}

export function GenresModalDelete({ isOpen, onClose, onDeleted, genre }: GenresModalDeleteProps) {
    const handleDelete = async () => {
        if (!genre) return;

        try {
            await axios.delete('http://localhost:8090/API/v1/genero/deleteGenero', {
                data: {
                    id: genre.id,
                },
            });
            onDeleted();
            onClose();
        } catch (error) {
            console.error('Error al eliminar género:', error);
        }
    };

    if (!isOpen || !genre) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-xl shadow-xl w-full max-w-md text-white">
                <h2 className="text-xl font-bold mb-4">¿Eliminar género?</h2>
                <p>
                    ¿Estás seguro de que deseas eliminar el género <strong>{genre.nombre}</strong>?
                </p>
                <div className="flex justify-end mt-6 space-x-2">
                    <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white">
                        Cancelar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
