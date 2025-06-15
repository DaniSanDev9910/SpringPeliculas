package com.catalogo_ms.Service;

import com.catalogo_ms.Dto.PeliculaDto;
import com.catalogo_ms.Entity.GeneroEnt;
import com.catalogo_ms.Entity.PeliculaEnt;
import com.catalogo_ms.Exception.GeneroAlreadyExists;
import com.catalogo_ms.Mapper.PeliculaMapper;
import com.catalogo_ms.Repository.GeneroRepository;
import com.catalogo_ms.Repository.PeliculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PeliculaService {
    @Autowired
    PeliculaRepository peliculaRepository;

    @Autowired
    GeneroRepository generoRepository;

    public List<PeliculaDto> findAllPelicula(String nombreParcial){
        List<PeliculaDto> listaDto = new ArrayList<>();
        Iterable<PeliculaEnt> listaEnt = new ArrayList<>();

        if(nombreParcial.isEmpty()){
            listaEnt = peliculaRepository.findAll();
        }
        else{
            listaEnt = peliculaRepository.findByNombreParcial(nombreParcial);
        }

        for(PeliculaEnt pelicula : listaEnt){
            PeliculaDto peliculaDto = new PeliculaDto();
            peliculaDto = PeliculaMapper.mapPeliculaEntToDto(pelicula);

            listaDto.add(peliculaDto);
        }

        return listaDto;
    }

    public PeliculaDto findPeliculaById(String idPelicula){
        var existingPelicula = peliculaRepository.findById(idPelicula);

        if(existingPelicula.isPresent()){
            return PeliculaMapper.mapPeliculaEntToDto(existingPelicula.get());
        }

        return null;
    }

    public boolean createPelicula(PeliculaDto peliculaDto){
        Optional<GeneroEnt> existingGenero = generoRepository.findById(peliculaDto.getIdGenero());

        if(!existingGenero.isPresent()){
            throw new GeneroAlreadyExists("El genero no existe, la pelicula no puede ser creada.");
        }

        var existingPelicula = peliculaRepository.findByNombre(peliculaDto.getNombre());

        if(!Objects.isNull(existingPelicula)){
            throw new GeneroAlreadyExists("La pelicula " + peliculaDto.getNombre() + " ya existe, la pelicula no puede ser creada.");
        }

        peliculaDto.setId(UUID.randomUUID().toString());
        PeliculaEnt peliculaEnt = PeliculaMapper.mapPeliculaDtoToEnt(peliculaDto);
        peliculaRepository.save(peliculaEnt);

        return true;
    }
}
