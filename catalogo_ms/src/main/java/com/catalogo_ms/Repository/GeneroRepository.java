package com.catalogo_ms.Repository;

import com.catalogo_ms.Entity.GeneroEnt;
import com.catalogo_ms.Entity.PeliculaEnt;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeneroRepository extends CrudRepository<GeneroEnt, String> {
    public GeneroEnt findByNombre(String valor);

    @Query(value = "SELECT * FROM GENERO WHERE NOMBRE LIKE %:nombre%",
            nativeQuery = true)
    public List<GeneroEnt> findByNombreParcial(@Param("nombre") String nombre);

    @Query(value = "SELECT * FROM GENERO WHERE NOMBRE =:nombre AND ID_GENERO <> :id", nativeQuery = true)
    public List<GeneroEnt> findByNombreIdDifferent(@Param("nombre") String nombre, @Param("id") String id);
}
