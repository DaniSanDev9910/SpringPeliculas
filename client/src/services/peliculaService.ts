import axios from 'axios';
import { PeliculaDto } from '../dto/PeliculaDto';

//const API_URL = 'http://localhost:8081/API/v1/pelicula/';
const API_URL = '/API/v1/pelicula/';

export const obtenerPeliculas = async () => {
  const { data } = await axios.get(API_URL + "findAllPelicula");
  return data;
};

export const crearPelicula = async (PeliculaDto: PeliculaDto) => {
  const { data } = await axios.post(API_URL + "createPelicula", PeliculaDto);
  return data;
}