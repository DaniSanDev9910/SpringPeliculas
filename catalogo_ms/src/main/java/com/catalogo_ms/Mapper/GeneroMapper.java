package com.catalogo_ms.Mapper;

import com.catalogo_ms.Dto.GeneroDto;
import com.catalogo_ms.Entity.GeneroEnt;

public class GeneroMapper {
    public static GeneroDto mapGeneroEntToDto(GeneroEnt genero){
        GeneroDto generoDto = new GeneroDto();

        generoDto.setId(genero.getId());
        generoDto.setNombre(genero.getNombre());


        return generoDto;
    }

    public static GeneroEnt mapGeneroDtoToEnt(GeneroDto genero){
        GeneroEnt generoEnt = new GeneroEnt();

        generoEnt.setId(genero.getId());
        generoEnt.setNombre(genero.getNombre());

        return generoEnt;
    }
}
