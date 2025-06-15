package com.catalogo_ms.Mapper;

import com.catalogo_ms.Dto.PeliculaDto;
import com.catalogo_ms.Entity.PeliculaEnt;

public class PeliculaMapper {
    public static PeliculaDto mapPeliculaEntToDto(PeliculaEnt pelicula){
        PeliculaDto peliculaDto = new PeliculaDto();

        peliculaDto.setId(pelicula.getId());
        peliculaDto.setNombre(pelicula.getNombre());
        peliculaDto.setSinopsis(pelicula.getSinopsis());
        peliculaDto.setIdGenero(pelicula.getIdGenero());
        peliculaDto.setImagen(pelicula.getImagen());
        peliculaDto.setDirector(pelicula.getDirector());
        peliculaDto.setAnio(pelicula.getAnio());
        peliculaDto.setRating(pelicula.getRating());

        return peliculaDto;
    }

    public static PeliculaEnt mapPeliculaDtoToEnt(PeliculaDto pelicula){
        PeliculaEnt peliculaEnt = new PeliculaEnt();

        peliculaEnt.setId(pelicula.getId());
        peliculaEnt.setNombre(pelicula.getNombre());
        peliculaEnt.setSinopsis(pelicula.getSinopsis());
        peliculaEnt.setIdGenero(pelicula.getIdGenero());
        peliculaEnt.setImagen(pelicula.getImagen());
        peliculaEnt.setDirector(pelicula.getDirector());
        peliculaEnt.setAnio(pelicula.getAnio());
        peliculaEnt.setRating(pelicula.getRating());

        return peliculaEnt;
    }
}
