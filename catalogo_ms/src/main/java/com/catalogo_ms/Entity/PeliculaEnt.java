package com.catalogo_ms.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "pelicula")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PeliculaEnt {
    @Id
    @Column(name = "idPelicula")
    private String id;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "Sinopsis")
    private String sinopsis;
    @Column(name = "idGenero")
    private String idGenero;
    @Column(name = "imagen")
    private String imagen;
    @Column(name = "director")
    private String director;
}
