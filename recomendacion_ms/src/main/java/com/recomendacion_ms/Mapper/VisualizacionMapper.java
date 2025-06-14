package com.recomendacion_ms.Mapper;

import com.recomendacion_ms.Dto.VisualizacionDto;
import com.recomendacion_ms.Entity.VisualizacionEnt;

public class VisualizacionMapper {
    public static VisualizacionDto mapVisualizacionEntToDto(VisualizacionEnt visualizacionEnt){
        VisualizacionDto visualizacionDto = new VisualizacionDto();

        visualizacionDto.setId(visualizacionEnt.getId());
        visualizacionDto.setIdPelicula(visualizacionEnt.getIdPelicula());
        visualizacionDto.setNumeroVisualizaciones(visualizacionEnt.getNumeroVisualizaciones());

        return visualizacionDto;
    }

    public static VisualizacionEnt mapVisualizacionDtoToEnt(VisualizacionDto visualizacionDto){
        VisualizacionEnt visualizacionEnt = new VisualizacionEnt();

        visualizacionEnt.setId(visualizacionDto.getId());
        visualizacionEnt.setIdPelicula(visualizacionDto.getIdPelicula());
        visualizacionEnt.setNumeroVisualizaciones(visualizacionDto.getNumeroVisualizaciones());

        return visualizacionEnt;
    }
}
