package com.recomendacion_ms.Controller;

import com.recomendacion_ms.Dto.ResponseDto;
import com.recomendacion_ms.Dto.VisualizacionDto;
import com.recomendacion_ms.Service.VisualizacionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("API/v1/visualizaciones")
public class VisualizacionController {
    @Autowired
    private VisualizacionService visualizacionService;

    @PostMapping("createVisualizacion")
    public ResponseEntity<ResponseDto> createVisualizacion(@Valid @RequestBody VisualizacionDto visualizacionDto){
        try{
            visualizacionService.createVisualizacion(visualizacionDto);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ResponseDto("201", "La visualizacion ha sido creado correctamente!!"));

        }catch(Exception e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto("500", e.getMessage()));
        }
    }

    @GetMapping("consultaRecomendacion")
    public ResponseEntity<List<VisualizacionDto>> consultaRecomendacion(@RequestParam(name = "numeroFilas") Long numeroFilas){

        List<VisualizacionDto> listaVisualizacion = visualizacionService.consultaRecomendacion(numeroFilas);

        return new ResponseEntity<>(listaVisualizacion, HttpStatus.OK);
    }
}
