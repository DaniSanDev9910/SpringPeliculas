package com.catalogo_ms.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catalogo_ms.Dto.GeneroDto;
import com.catalogo_ms.Dto.ResponseDto;
import com.catalogo_ms.Service.GeneroService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("API/v1/genero")
public class GeneroController {

    @Autowired
    private GeneroService generoService;

    @GetMapping("findAllGenero")
    public ResponseEntity<List<GeneroDto>> findAllGenero() {
        List<GeneroDto> listaGenero = generoService.findAllGenero();

        return new ResponseEntity<>(listaGenero, HttpStatus.OK);
    }

    @PostMapping("createGenero")
    public ResponseEntity<ResponseDto> createGenero(@Valid @RequestBody GeneroDto generoDto) {
        generoService.CreateGenero(generoDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto("201", "El genero ha sido creado correctamente!!"));
    }

    @PutMapping("updateGenero")
    public ResponseEntity<ResponseDto> UpdateGenero(@Valid @RequestBody GeneroDto generoDto) {
        generoService.UpdateGenero(generoDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto("201", "El genero ha sido actualizado correctamente!!"));
    }

    @DeleteMapping("deleteGenero")
    public ResponseEntity<ResponseDto> DeleteGenero(@Valid @RequestBody GeneroDto generoDto) {
        generoService.DeleteGenero(generoDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto("201", "El genero ha sido eliminado correctamente!!"));
    }
}
