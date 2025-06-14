package com.catalogo_ms.Service;

import com.catalogo_ms.Dto.GeneroDto;
import com.catalogo_ms.Entity.GeneroEnt;
import com.catalogo_ms.Exception.GeneroAlreadyExists;
import com.catalogo_ms.Mapper.GeneroMapper;
import com.catalogo_ms.Repository.GeneroRepository;
import com.catalogo_ms.Repository.PeliculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GeneroService {
    @Autowired
    GeneroRepository generoRepository;

    @Autowired
    PeliculaRepository peliculaRepository;

    public List<GeneroDto> findAllGenero(){
        List<GeneroDto> listaGeneroDto = new ArrayList<>();
        var listaGeneroEnt = generoRepository.findAll();

        for(GeneroEnt genero : listaGeneroEnt){
            GeneroDto generoDto = new GeneroDto();
            generoDto = GeneroMapper.mapGeneroEntToDto(genero);

            listaGeneroDto.add(generoDto);
        }

        return  listaGeneroDto;
    }

    public GeneroDto CreateGenero(GeneroDto genero){
        var existingGenero = generoRepository.findByNombre(genero.getNombre());
        if(!Objects.isNull(existingGenero)){
            throw new GeneroAlreadyExists("El genero " + genero.getNombre() + " ya está registrado");
        }

        genero.setId(UUID.randomUUID().toString());
        GeneroEnt generoEnt = GeneroMapper.mapGeneroDtoToEnt(genero);
        GeneroEnt newGeneroEnt = generoRepository.save(generoEnt);

        return GeneroMapper.mapGeneroEntToDto(newGeneroEnt);
    }

    public GeneroDto UpdateGenero(GeneroDto genero){
        var existingGenero = generoRepository.findById(genero.getId());

        if(!existingGenero.isPresent()){
            throw new GeneroAlreadyExists("El genero " + genero.getNombre() + " no existe para ser actualizado");
        }

        var resultGenero = generoRepository.findByNombreIdDifferent(genero.getNombre(), genero.getId());

        if(!resultGenero.isEmpty()){
            throw new GeneroAlreadyExists("El genero " + genero.getNombre() + " ya existe y no se puede duplicar");
        }

        var newGeneroEnt = GeneroMapper.mapGeneroDtoToEnt(genero);

        return GeneroMapper.mapGeneroEntToDto(generoRepository.save(newGeneroEnt));
    }

    public Boolean DeleteGenero(GeneroDto genero){
        var existingGenero = generoRepository.findById(genero.getId());

        if(!existingGenero.isPresent()){
            throw new GeneroAlreadyExists("El genero " + genero.getNombre() + " no existe para ser borrado");
        }

        var existingPelicula = peliculaRepository.findByIdGenero(genero.getId());

        if(!Objects.isNull(existingPelicula)){
            throw new GeneroAlreadyExists("El genero " + genero.getNombre() + " esta asociado a una pelicula, no puede ser eliminado");
        }

        generoRepository.delete(GeneroMapper.mapGeneroDtoToEnt(genero));

        return true;
    }
}
