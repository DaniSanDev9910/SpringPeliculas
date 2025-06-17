# Spring Películas - Sistema de Microservicios

Este proyecto es una aplicación de gestión de películas construida con microservicios Spring Boot y un frontend en React/TypeScript.

## Arquitectura del Sistema

El sistema está compuesto por los siguientes microservicios:

- **Eureka Server**: Servidor de descubrimiento de servicios
- **Config Server**: Servidor de configuración centralizada
- **Gateway Service**: API Gateway para enrutar las peticiones
- **Catálogo MS**: Microservicio para gestión de películas y géneros
- **Recomendación MS**: Microservicio para gestión de visualizaciones y recomendaciones
- **Client**: Frontend en React/TypeScript

## Prerrequisitos

- Java 17 o superior
- Maven 3.6+
- Node.js 16+ y npm
- Docker y Docker Compose

## Configuración de la Base de Datos

### 1. Crear la base de datos con Docker

```bash
# Ejecutar el contenedor de MySQL
docker-compose up -d mysql
```

Esto creará una instancia de MySQL con las siguientes credenciales:
- **Host**: localhost:3306
- **Base de datos**: db_pelicula
- **Usuario**: userDasc
- **Contraseña**: Dani2025*.

## Orden de Ejecución de los Microservicios

**IMPORTANTE**: Es crucial seguir este orden específico para que la aplicación funcione correctamente:

### 1. Primero: Config Server
```bash
cd config-server
mvn spring-boot:run
```

### 2. Segundo: Eureka Server
```bash
cd eureka-server
mvn spring-boot:run
```

### 3. Tercero: Gateway Service
```bash
cd gateway-service
mvn spring-boot:run
```

### 4. Cuarto: Microservicio de Recomendaciones
```bash
cd recomendacion_ms
mvn spring-boot:run
```

**¿Por qué en este orden?** El microservicio de recomendaciones crea la tabla `visualizacion` en la base de datos. Esta tabla es referenciada por el script de datos del microservicio de catálogo.

### 5. Quinto: Microservicio de Catálogo
```bash
cd catalogo_ms
mvn spring-boot:run
```

**¿Por qué en este orden?** El microservicio de catálogo contiene el script `data.sql` que inserta datos de prueba, incluyendo registros en la tabla `visualizacion` que debe existir previamente.

### 6. Sexto: Frontend
```bash
cd client
npm install
npm run dev
```

## Estructura de Datos

El sistema incluye datos de prueba que se insertan automáticamente:

- **Géneros**: Acción, Terror, Drama, Comedia, Aventura, Suspenso, Infantil, Ciencia ficción
- **Películas**: Superman, Elio, How to Train Your Dragon, Ballerina, Final Destination: Bloodlines
- **Visualizaciones**: Datos de visualización para cada película

## Funcionalidades

- Gestión de películas (CRUD)
- Gestión de géneros (CRUD)
- Sistema de visualizaciones
- Recomendaciones basadas en visualizaciones
- Interfaz web moderna y responsiva

## Tecnologías Utilizadas

### Backend
- Spring Boot
- Spring Cloud (Eureka, Config Server, Gateway)
- Spring Data JPA
- MySQL
- Maven

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- Axios

## Solución de Problemas

### Error de tabla no encontrada
Si encuentras errores relacionados con la tabla `visualizacion` no encontrada, asegúrate de:
1. Haber ejecutado primero el microservicio de recomendaciones
2. Que la base de datos esté corriendo correctamente
3. Que las credenciales de conexión sean correctas
