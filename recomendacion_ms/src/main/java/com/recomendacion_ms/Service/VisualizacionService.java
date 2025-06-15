package com.recomendacion_ms.Service;

import com.recomendacion_ms.Dto.PeliculaDto;
import com.recomendacion_ms.Dto.VisualizacionDto;
import com.recomendacion_ms.Entity.VisualizacionEnt;
import com.recomendacion_ms.Exception.ObjectAlreadyExists;
import com.recomendacion_ms.Mapper.VisualizacionMapper;
import com.recomendacion_ms.Repository.VisualizacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class VisualizacionService {
    @Autowired
    VisualizacionRepository visualizacionRepository;

    @Autowired
    RestTemplate clienteRest;

    public Boolean createVisualizacion(VisualizacionDto visualizacionDto){

        PeliculaDto peliculaDto = clienteRest.getForObject("http://localhost:9091/API/v1/pelicula/findPeliculaById?iPelicula=" + visualizacionDto.getIdPelicula(), PeliculaDto.class);

        if(Objects.isNull(peliculaDto)){
            throw new ObjectAlreadyExists("La pelicula no existe!!!");
        }

        VisualizacionEnt visualizacionEnt = visualizacionRepository.findByIdPelicula(visualizacionDto.getIdPelicula());

        if(Objects.isNull(visualizacionEnt)){

            visualizacionEnt = new VisualizacionEnt();
            visualizacionEnt.setId(UUID.randomUUID().toString());
            visualizacionEnt.setIdPelicula(visualizacionDto.getIdPelicula());
            visualizacionEnt.setNumeroVisualizaciones(Long.parseLong("1"));

            visualizacionRepository.save(visualizacionEnt);
            return true;
        }else{
            Long visualizaciones = visualizacionEnt.getNumeroVisualizaciones();
            visualizaciones += 1;

            visualizacionEnt.setNumeroVisualizaciones(visualizaciones);

            visualizacionRepository.save(visualizacionEnt);
            return true;
        }
    }

    public List<VisualizacionDto> consultaRecomendacion(Long cantidadRegistros){
        List<VisualizacionDto> listaDto = new ArrayList<>();
        var listaEnt = visualizacionRepository.findOrderByVisualizaciones(cantidadRegistros);

        if(listaEnt.isEmpty()){
            return listaDto;
        }else{
            for(VisualizacionEnt visualizacionEnt: listaEnt){
                VisualizacionDto visualizacionDto = new VisualizacionDto();
                visualizacionDto = VisualizacionMapper.mapVisualizacionEntToDto(visualizacionEnt);

                listaDto.add(visualizacionDto);
            }

            return listaDto;
        }
    }
}
