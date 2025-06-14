package com.recomendacion_ms.Repository;

import com.recomendacion_ms.Entity.VisualizacionEnt;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisualizacionRepository extends CrudRepository<VisualizacionEnt, String> {
    public VisualizacionEnt findByIdPelicula(String valor);

    @Query(value = "SELECT * FROM VISUALIZACION ORDER BY NUMERO_VISUALIZACIONES DESC LIMIT :numero", nativeQuery = true)
    public List<VisualizacionEnt> findOrderByVisualizaciones(@Param("numero") Long numero);
}
