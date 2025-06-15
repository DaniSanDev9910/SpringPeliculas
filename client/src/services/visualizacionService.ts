import axios from 'axios';

interface VisualizacionRequest {
  id: string;
  idPelicula: string;
  numeroVisualizaciones: number;
}

const API_URL = '/API/v1/visualizaciones/';

export const crearVisualizacion = async (idPelicula: string): Promise<void> => {
  const visualizacion: VisualizacionRequest = {
    id: '',
    idPelicula,
    numeroVisualizaciones: 1
  };
  
  try {
    await axios.post(`${API_URL}createVisualizacion`, visualizacion);
  } catch (error) {
    console.error('Error al registrar visualización:', error);
  }
};
