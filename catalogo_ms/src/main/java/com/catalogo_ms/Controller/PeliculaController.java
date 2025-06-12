package com.catalogo_ms.Controller;

import com.catalogo_ms.Dto.GeneroDto;
import com.catalogo_ms.Dto.PeliculaDto;
import com.catalogo_ms.Dto.ResponseDto;
import com.catalogo_ms.Service.GeneroService;
import com.catalogo_ms.Service.PeliculaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("API/v1/pelicula")
public class PeliculaController {
    @Autowired
    private PeliculaService peliculaService;

    @GetMapping("findAllPelicula")
    public ResponseEntity<List<PeliculaDto>> findAllPelicula(){
        List<PeliculaDto> listaPelicula = peliculaService.findAllPelicula();

        return new ResponseEntity<>(listaPelicula, HttpStatus.OK);
    }

    @GetMapping("findPeliculaById")
    public ResponseEntity<PeliculaDto> findPeliculaById(@RequestParam(name = "iPelicula") String idPelicula){
        return new ResponseEntity<>(peliculaService.findPeliculaById(idPelicula), HttpStatus.OK);
    }

    @PostMapping("createPelicula")
    public ResponseEntity<ResponseDto> createPelicula(@Valid @RequestBody PeliculaDto peliculaDto){
        try{
            peliculaService.createPelicula(peliculaDto);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ResponseDto("201", "El pelicula ha sido creada correctamente!!"));
        } catch(Exception e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto("500", e.getMessage()));
        }
    }
}
