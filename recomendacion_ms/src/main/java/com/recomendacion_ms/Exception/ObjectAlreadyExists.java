package com.recomendacion_ms.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ObjectAlreadyExists extends RuntimeException {
    public ObjectAlreadyExists(String message){
        super(message);
    }
}
