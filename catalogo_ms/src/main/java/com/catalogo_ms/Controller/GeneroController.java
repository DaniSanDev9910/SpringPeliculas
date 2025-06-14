package com.catalogo_ms.Controller;

import com.catalogo_ms.Dto.GeneroDto;
import com.catalogo_ms.Dto.ResponseDto;
import com.catalogo_ms.Service.GeneroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("API/v1/genero")
@CrossOrigin("*")
public class GeneroController {

    @Autowired
    private GeneroService generoService;

    @GetMapping("findAllGenero")
    public ResponseEntity<List<GeneroDto>> findAllGenero(){
        List<GeneroDto> listaGenero = generoService.findAllGenero();

        return new ResponseEntity<>(listaGenero, HttpStatus.OK);
    }

    @PostMapping("createGenero")
    public ResponseEntity<ResponseDto> createGenero(@Valid @RequestBody GeneroDto generoDto){
        generoService.CreateGenero(generoDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto("201", "El genero ha sido creado correctamente!!"));
    }

    @PutMapping("UpdateGenero")
    public ResponseEntity<ResponseDto> UpdateGenero(@Valid @RequestBody GeneroDto generoDto){
        generoService.UpdateGenero(generoDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto("201", "El genero ha sido actualizado correctamente!!"));
    }

    @DeleteMapping("DeleteGenero")
    public ResponseEntity<ResponseDto> DeleteGenero(@Valid @RequestBody GeneroDto generoDto){
        generoService.DeleteGenero(generoDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto("201", "El genero ha sido eliminado correctamente!!"));
    }
}
