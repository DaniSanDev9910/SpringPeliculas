package com.recomendacion_ms.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class PeliculaConfiguration {
    @Bean("clienteRest")
    public RestTemplate registrarRestTemplate(){
        return new RestTemplate();
    }
}
