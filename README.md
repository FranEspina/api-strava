# MUI Strava Backend

Backend para un [cliente de Strava](https://github.com/FranEspina/strava-client/blob/master/README.md).

## Descripción funcional 
El backend expone dos rutas, una para la gestión de usuario y otra para la gestión de autorizaciones de Strava.

### Controlador Usuarios
El backend está preparado para mantener y crear usuarios independientemente de que se den de alta en Strava. Se pueden crear usuarios y posteriormente si se usan datos de Strava incoporar al usuario los datos que sean necesarios.

Gestiona la creación tokens en el registro de usuarios y la validación de claves en el login. Además se controlan las rutas que requieren autorización. Los tokens devueltos se guardan en el cliente como cookies y se reciben como tal.

En la versión final del cliente, sólo se hace uso de la autorización de Strava para el login. Se deja de momento la funcionalidad por si se decide ampliar más adelante la lógica del cliente.

### Controlador Strava
El controlador tiene dos funciones: 

1. Recuperar del API de Strava los datos de acceso de un usuario que haya autorizado que consultemos sus datos de Strava. A partir de un código de autorización, recuperamos un token de acceso, de refresco y las fechas de caducidad de los mismos.
2. Recuperar un nuevo token de acceso, a partir de un token de refresco válido, cuando el token de acceso previo ha expirdado. Se conecta al API de Strava y si todo es correcto, almacena los datos en el usuario en servidor y devuelve los nuevos datos al cliente.

### Base de datos
El backend guarda sus datos en una base de datos MongoDb. El propio proyecto mantiene sus esquemas y la creación de los modelos y de la base de datos.

## Algunas consideraciones técnicas
A continuación se hace un pequeño repaso por los paquetes usados en el repositorio y su propósito.

- ``express``: para el API
- ``morgan``: para log de peticiones
- ``nodemon``: para el hot reload (dependencia de desarrollo)
- ``mongoose``: creación de esquemas para la base de datos MongoDb
- ``bcryptjs``: Encriptación de contraseñas
- ``jsonwebtoken``: Gestión del token de autorización
- ``cookie-parser``: middleware que permite leer una cookie desde un request header en una petición de la api
- ``dotenv``: para guardar variables de entorno durante el desarrollo
- ``axios``: para peticiones http al API de strava
- ``cors``: Permitir llamadas cruzadas en express (middleware)

## Pendiente 
- Pendiente usar algún inyector de dependencias como inversify para altenar la funcionalidad de dataService.js y la dataServiceMock.js. Actualmente, para esta prueba de concepto se usan variables de entorno para decidir si se usa el Mock de acceso a datos.
- Migrar a TypeScript

