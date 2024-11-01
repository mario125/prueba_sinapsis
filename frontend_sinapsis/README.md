# # Prueba técnica Fullstack Senior  - Frontend Angular

## Descripción

Este proyecto es un frontend desarrollado en Angular, diseñado para trabajar en conjunto con el backend Serverless. La aplicación permite el acceso a diferentes funcionalidades a través de una interfaz de usuario web.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v14.x o superior)
- [Angular CLI](https://angular.io/cli) (instalado globalmente)

## Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/mario125/prueba_sinapsis.git
   cd prueba_sinapsis\frontend_sinapsis
   ```

2. **Instalar las dependencias**

   ```bash
   npm install
   ```

## Comandos para el Desarrollo

Utiliza los siguientes comandos para trabajar con el proyecto:

- **Iniciar el servidor de desarrollo**

   ```bash
   npm run start
   ```

   Esto iniciará la aplicación Angular y la abrirá en `http://localhost:4200/login`.

- **Construir la aplicación para producción**

   ```bash
   npm run build
   ```

   Este comando construye la aplicación para producción en la carpeta `dist/`.

- **Ver cambios en tiempo real**

   ```bash
   npm run watch
   ```

   Este comando construye la aplicación y la recompila automáticamente cuando hay cambios en los archivos.

- **Ejecutar pruebas**

   ```bash
   npm run test
   ```

   Este comando ejecutará las pruebas definidas en el proyecto.

- **Servir la aplicación SSR (Server Side Rendering)**

   ```bash
    Local:  http://localhost:4200/login
   ```

   Este comando sirve la aplicación con Server Side Rendering (SSR) usando Node.js.

## Credenciales de Login

Para iniciar sesión en la aplicación, utiliza las siguientes credenciales:

- **Email:** `admin@ejemplo.com`
- **Contraseña:** `password123`

### Comprobación de Credenciales

Las credenciales se verifican de la siguiente manera en el código:

```javascript
email: admin@ejemplo.com
password: password123
```

## Notas Adicionales

- Asegúrate de tener las credenciales correctas de acceso y que el backend esté en funcionamiento si deseas probar la integración.
- Verifica que la versión de Angular CLI sea compatible con el proyecto.

## Autor

Mario Choquetaipe

## Licencia

Este proyecto está bajo la Licencia ISC.