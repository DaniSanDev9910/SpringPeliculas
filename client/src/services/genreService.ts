import axios from 'axios';
import { GeneroDto } from '../types';

//const API_URL = 'http://localhost:8081/API/v1/genero/';
const API_URL = '/API/v1/genero/';

export const getGenres = async () => {
  const { data } = await axios.get(API_URL + "findAllGenero");
  return data;
};

export const updateGenre = async (generoDto: GeneroDto) => {
  const { data } = await axios.put(API_URL + "updateGenero", generoDto);
  return data;
}

export const createGenre = async (generoDto: GeneroDto) => {
  const { data } = await axios.post(API_URL + "createGenero", generoDto);
  return data;
}

export const deleteGenre = async (generoDto: GeneroDto) => {
  const { data } = await axios.delete(API_URL + "deleteGenero", { data: generoDto });
  return data;
}