package com.catalogo_ms.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class GeneroAlreadyExists extends RuntimeException {
    public GeneroAlreadyExists(String message){
        super(message);
    }
}
