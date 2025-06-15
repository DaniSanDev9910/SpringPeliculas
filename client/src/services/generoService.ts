import axios from 'axios';

//const API_URL = 'http://localhost:8081/API/v1/genero/';
const API_URL = '/API/v1/genero/';

export const obtenerGeneros = async () => {
  const { data } = await axios.get(API_URL + "findAllGenero");
  return data;
};