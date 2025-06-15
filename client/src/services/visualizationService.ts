import axios from 'axios';
import { VisualizacionDto } from '../types';

interface VisualizacionRequest {
  id: string;
  idPelicula: string;
  numeroVisualizaciones: number;
}

const API_URL = '/API/v1/visualizaciones/';

export const createVisualization = async (idPelicula: string): Promise<void> => {
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

export const getVisualizations = async (numeroFilas: number = 20): Promise<VisualizacionDto[]> => {
  try {
    const { data } = await axios.get<VisualizacionDto[]>(`${API_URL}consultaRecomendacion`, {
      params: { numeroFilas }
    });
    return data;
  } catch (error) {
    console.error('Error al obtener visualizaciones:', error);
    return [];
  }
};
