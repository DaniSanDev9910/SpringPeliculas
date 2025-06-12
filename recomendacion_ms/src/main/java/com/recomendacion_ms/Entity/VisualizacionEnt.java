package com.recomendacion_ms.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "visualizacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VisualizacionEnt {
    @Id
    @Column(name = "idVisualizacion")
    private String id;
    @Column(name = "idPelicula")
    private String idPelicula;
    @Column(name = "numeroVisualizaciones")
    private Long numeroVisualizaciones;
}
