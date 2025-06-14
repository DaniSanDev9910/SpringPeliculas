package com.catalogo_ms.Dto;

import lombok.Data;

@Data
public class PeliculaDto {
    private String id;
    private String nombre;
    private String sinopsis;
    private String idGenero;
    private String imagen;
    private String director;
}
