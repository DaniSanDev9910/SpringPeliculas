import axios from 'axios';
import { PeliculaDto } from '../dto/types';

//const API_URL = 'http://localhost:8081/API/v1/pelicula/';
const API_URL = '/API/v1/pelicula/';

export const obtenerPeliculas = async (nombreParcial: string = '') => {
  const { data } = await axios.get(`${API_URL}findAllPelicula?nombreParcial=${nombreParcial}`);
  return data;
};

export const createMovie = async (PeliculaDto: PeliculaDto) => {
  const { data } = await axios.post(API_URL + "createPelicula", PeliculaDto);
  return data;
}