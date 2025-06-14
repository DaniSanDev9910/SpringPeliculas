package com.catalogo_ms.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "genero")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GeneroEnt {
    @Id
    @Column(name = "idGenero")
    private String id;
    @Column(name = "nombre")
    private String nombre;
}
