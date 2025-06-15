export type GeneroDto = {
    id: string,
    nombre: string
  };

  export type PeliculaDto = {
    id: string,
    nombre: string,
    sinopsis: string,
    imagen: string,
    idGenero: string,
    director: string,
    anio: number,
    rating: number
  };

  export type VisualizacionDto = {
    id: string;
    idPelicula: string;
    numeroVisualizaciones: number;
  };
  