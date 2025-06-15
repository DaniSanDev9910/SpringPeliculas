import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { Genre } from '../../../types';

interface GenresModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
    genre: Genre | null;
}

export function GenresModalForm({ isOpen, onClose, onSaved, genre }: GenresModalFormProps) {
    const [nombre, setNombre] = useState('');
    const isEdit = !!genre;

    useEffect(() => {
        if (isEdit && genre) {
            setNombre(genre.nombre);
        } else {
            setNombre('');
        }
    }, [genre, isEdit]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (isEdit && genre) {
                await axios.put('http://localhost:8090/API/v1/genero/updateGenero', {
                    id: genre.id,
                    nombre,
                });
            } else {
                await axios.post('http://localhost:8090/API/v1/genero/createGenero', {
                    nombre,
                });
            }

            onSaved();
            onClose();
        } catch (error) {
            console.error('Error to save genre:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold text-white mb-4">
                    {isEdit ? 'Edit Genre' : 'New Genre'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2 rounded bg-slate-700 text-white"
                        placeholder="Nombre del género"
                        required
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-400 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
