package com.catalogo_ms.Repository;

import com.catalogo_ms.Entity.PeliculaEnt;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PeliculaRepository extends CrudRepository<PeliculaEnt, String> {
    public PeliculaEnt findByNombre(String valor);

    public PeliculaEnt findByIdGenero(String valor);

    @Query(value = "SELECT * FROM PELICULA WHERE NOMBRE LIKE %:nombre%",
            nativeQuery = true)
    public List<PeliculaEnt> findByNombreParcial(@Param("nombre") String nombre);
}
